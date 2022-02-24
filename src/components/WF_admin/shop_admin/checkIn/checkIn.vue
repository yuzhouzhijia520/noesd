<template>
    <div class="wf-checkIn">
        <div class="wf-gray-box">
            签到功能
            <el-switch
            v-model="checkOpen"
            :active-text="openText"
            @change="openChange"
            active-color="#719FF8"
            size="mini">
            </el-switch>
            <div class="clear"></div>
        </div>
        <p class="wf-padding">注意：请勿频繁修改“签到”的设置；正确设置后再开启“签到”功能。</p>
        <div class="wf-gray-box">签到说明</div>
        <el-form label-position="right" label-width="90px">
            <el-form-item label="签到说明" >
                <el-input
                type="textarea"
                v-model="explain"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请填写活动说明"
                size="mini"
                maxlength="500">
                </el-input>
            </el-form-item>
        </el-form>
        <div class="wf-gray-box">连续签到设置</div>
        <el-form v-for="(item,index) in list" :key="index" class="wf-setting-box" label-position="right" label-width="90px">
            <el-form-item label="连续签到" >
                <el-input-number
                v-model="item.day"
                :controls="false"
                :precision="0"
                :min="1"
                :max="31"
                size="mini"
                :disabled="item.id?true:false"
                @blur="dayBlur"
                @focus="dayFocus(index)">
                </el-input-number>
                天
            </el-form-item>
            <el-form-item label="送积分" >
                <el-input-number
                :disabled="item.id?true:false"
                v-model="item.integral"
                :controls="false"
                :precision="0"
                :min="0"
                size="mini">
                </el-input-number>
                个
            </el-form-item>
            <el-form-item label="送优惠券" >
                <el-button :disabled="item.id?true:false" @click="cuponShow(index)" type="text">{{item.coupon_id!==0?"修改":"选择"}}优惠券</el-button>
                <el-tag :disabled="item.id?true:false" size="small" @close="closeTag(index)" v-if="item.coupon_id!==0" :closable="item.id?false:true">已选择1张优惠券</el-tag>
                <el-button v-if="list.length>1" @click="deleteSetting(index)" class="wf-red-text" type="text">删除</el-button>
                <div class="clear"></div>
            </el-form-item>
            <el-dialog
            title="选择优惠券"
            :visible.sync="cuponDialog"
            width="1000px"
            :close-on-click-modal="false"
            center>
                <div style="margin-bottom:10px;">
                    <span style="float:left">
                        <el-button size="mini" class="wf-button-primary" icon="el-icon-plus" type="primary" @click="addCupon">新建</el-button>
                        <el-button :loading="refreshLoading" @click="getCupon(1,2)" icon="el-icon-refresh" size="mini" class="wf-button-default">刷新</el-button>
                    </span>
                    <span style="float:right">
                        <el-input style="width:300px;" v-model="cupon_search" placeholder="输入优惠券名称" size="mini"></el-input>
                        <el-button :loading="searchLoading" @click="getCupon(1,1)" size="mini" class="wf-button-primary" type="primary" icon="el-icon-search">搜索</el-button>
                    </span>
                    <div class="clear"></div>
                </div>
                <my-table
                :tableData="tableData"
                ref="table"
                :columns="columns"
                :totalPage="totalPage"
                :pageSize="5"
                :currentPage="currentPage"
                @currentChange="getCupon">
                </my-table>
            </el-dialog>
        </el-form>
        <el-button @click="add" class="wf-add" type="text">增加一条</el-button>
        <div class="wf-footer">
            <el-button @click="save" :loading="saveLoading" type="primary" size="mini">保存</el-button>
        </div>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { getCuponList, checkSave, checkEditInfo } from '@/server/checkIn.js'
import { select } from '@/server/mymarkting.js'
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: "checkIn",
    data() {
        return {
            sid: -1,
            showVersion: false, // 控制版本提示
            focusIndex: -1,
            listIndex: -1, // 保存当前行索引
            saveLoading: false,
            searchLoading: false,
            refreshLoading: false,
            cupon_search: "",
            currentPage: 1,
            totalPage: 0,
            tableData: [],
            columns: [
                {   
                    label: "优惠券名称",
                    align: "center",
                    prop: "coupon_name"
                },
                {
                    label: "有效期",
                    align: "center",
                    width: "340",
                    render: (h,param)=>{
                        let a
                        if(param.row.expire_type===0){
                            a = param.row.start_time + " — " + param.row.end_time
                        }else{
                            a = param.row.expire_time + "天"
                        }
                        return h('div', a);
                    }
                },
                {
                    label: "适用商品",
                    align: "center",
                    prop: "classify"
                },
                { 
                    label: "优惠内容",
                    align: "center",
                    render:function(h,param){
                        let a = "满" + param.row.subtraction_price + "减" + param.row.coupon_price
                        return [h('span', a)];
                    }
                },
                {
                    label: "库存",
                    align: "center",
                    prop: "coupon_num",
                    width: "80"
                },
                {
                    label: "操作",
                    align: "center",
                    render: (h,param)=>{
                        return h('el-button', {
                            props: {
                                type: "text"
                            },
                            attrs: {
                                style: "color:#719FF8;"
                            },
                            on: {
                                click: () => {
                                    this.choose(param.row)
                                }
                            }
                        }, "选择");
                    }
                }
            ],
            cuponDialog: false, // 优惠券弹框
            checkOpen: false, // 开关值
            openText: "关闭",
            explain: "",
            list: [ // 签到设置数据
                {
                    day: undefined,
                    integral: undefined,
                    coupon_id: 0, // 所有选中的数据包含跨页数据
                }
            ]
        }
    },
    components: {
        MyTable,
        versionCom
    },
    mounted(){
        this.getEdit()
    },
    methods: {
        handleCloseVersion(){
            this.showVersion = false;
        },
        getEdit(){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId")
            }
            checkEditInfo(data).then((res)=>{
                if(res.data.code===200){
                    that.explain = res.data.data.explain
                    that.sid = res.data.data.sid
                    if(res.data.data.sign_infos.length<1){
                        that.list = [
                            {
                                day: undefined,
                                integral: undefined,
                                coupon_id: 0
                            }
                        ]
                    }else{
                        that.list = res.data.data.sign_infos
                    }
                    that.checkOpen = res.data.data.state===0?false:true
                    if(that.checkOpen){
                        that.openText = "开启"
                    }else{
                        that.openText = "关闭"
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00149");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00150');
            })
        },
        dayFocus(index){
            this.focusIndex = index
        },
        dayBlur(val){
            let that = this
            this.$nextTick(()=>{
                let arr = this.list.map((item,index)=>{
                    if(item.day === parseInt(val.currentTarget.value)&&index!==that.focusIndex){
                        that.$message.warning("连续签到天数不能重复")
                        that.list[that.focusIndex].day = undefined
                        return item
                    }
                })
            })
        },
        closeTag(index){
            this.list[index].coupon_id = 0
        },
        choose(row){
            this.list[this.listIndex].coupon_id = row.id
            this.cuponDialog = false
        },
        addCupon(){
            window.open(this.$router.resolve({path:'/wf/admin/shop/markting/coupon/addCoupon'}).href);
        },
        getCupon(currentPage,type){
            this.currentPage = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: this.currentPage,
                coupon_name: this.cupon_search!==""?this.cupon_search:undefined,
                type: 7
            }
            if(type===1){
                this.searchLoading = true
            }else if(type===2){
                this.refreshLoading = true
            }
            getCuponList(data).then((res)=>{
                that.searchLoading = false
                that.refreshLoading = false
                if(res.data.code===200){
                    that.tableData = res.data.data
                    that.totalPage = res.data.count
                    that.cuponDialog = true
                }else{
                    that.$message.error(res.data.msg+"600A00139");
                }
            }).catch((err)=>{
                that.searchLoading = false
                that.refreshLoading = false
                that.$message.error('网络错误600B00140');
            })
        },
        cuponShow(index){
            this.listIndex = index
            this.getCupon(1)
        },
        openChange(val){
            let that = this
            getAuditApplicationList(28).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data){
                        let data = {
                            pro_id: parseInt(localStorage.getItem('proId')),
                            state: val?1:0,
                            sid: parseInt(this.sid)
                        }
                        select(data).then((res)=>{
                            if(res.data.code===200){
                                that.$message.success(val?"开启成功":"关闭成功")
                            }else{
                                that.checkOpen = !val
                                that.$message.error(res.data.msg+"600A00145");
                            }
                        }).catch((err)=>{
                            that.checkOpen = !val
                            that.$message.error('网络错误600B00146');
                        })
                    }else{
                        that.checkOpen = !val
                        that.showVersion = true;
                    }
                }else{
                    that.checkOpen = !val
                    that.$message.error(res.data.msg+"600A00185");
                }
            }).catch((item)=>{
                that.checkOpen = !val
                that.$message.error(res.data.msg+"600B00186");
            })
            if(this.checkOpen){
                this.openText = "开启"
            }else{
                this.openText = "关闭"
            }
        },
        add(){
            // if(this.list.length>=31){
            //     this.$message.warning("最多设置31条数据")
            // }else{
                this.list.push({
                    day: undefined,
                    integral: undefined,
                    coupon_id: 0
                })
            // }
        },
        deleteSetting(index){
            this.list.splice(index,1)
            this.list.map((item,i)=>{
                return item
            })
        },
        save(){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                explain: this.explain,
                sign_info: this.list
            }
            // data.sign_info = this.list.map(item=>{
            //     delete item.disabled
            //     return item
            // })
            this.saveLoading = true
            checkSave(data).then((res)=>{
                that.saveLoading = false
                if(res.data.code===200){
                    that.getEdit()
                    that.$message.success("保存成功")
                }else{
                    that.$message.error(res.data.msg+"");
                }
            }).catch((err)=>{
                that.saveLoading = false
                that.$message.error('网络错误');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-checkIn{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    .el-button--primary{
        background: #719FF8;
        border-color: #719FF8;
    }
    .wf-gray-box{
        border-radius: 4px;
        padding: 20px;
        background: #F8F8F8;
        margin-bottom: 20px;
    }
    .el-switch{
        float: right;
    }
    .clear{
        clear: both;
    }
    .wf-padding{
        padding: 0 20px;
        margin-bottom: 20px;
    }
    /deep/ .el-input-number{
        .el-input__inner{
            text-align: left;
        }
    }
    .el-button--text{
        padding: 0;
        color: #719FF8;
    }
    .wf-red-text{
        color: #FB6664;
        float: right;
    }
    .wf-setting-box{
        padding-left: 20px;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
    }
    .wf-add{
        margin-left: 20px;
    }
    .wf-footer{
        text-align: center;
    }
    /deep/ .el-dialog{
        .el-dialog__header{
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        .el-pagination{
            text-align: center;
            margin-top: 20px;
        }
    }
    /deep/ .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
        color: #C0C4CC;
    }
}
</style>
