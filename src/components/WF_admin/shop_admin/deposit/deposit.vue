<template>
    <div class="wf-deposit">
        <div>
            <el-form ref="form" label-position="right" label-width="100px">
                <el-form-item label="商品名称">
                    <el-input v-model="good_name" @keyup.enter.native="getList(1,1)" class="wf-input-width wf-input-margin" size="mini"></el-input>
                    活动名称
                    <el-input v-model="name" @keyup.enter.native="getList(1,1)" class="wf-input-width wf-input-margin" size="mini"></el-input>
                    状态
                    <el-select v-model="state" class="wf-input-margin" size="mini">
                        <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button @click="getList(1,1)" :loading="searchLoading" size="mini" type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button @click="addDeposit" size="mini" icon="el-icon-plus">新增定金膨胀</el-button>
                </el-form-item>
                <el-form-item label="定金支付时间">
                    <el-date-picker
                    class="wf-input-margin"
                    v-model="printTime"
                    type="daterange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    size="mini"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <my-table :tableData="tableData" ref="table" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getList"></my-table>
        <versionCom v-if="showVersion" @closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { getDepositList, depositFrontEdit } from "@/server/deposit.js"
import { dateFormat } from '@/untils/common.js';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: "deposit",
    data() {
        return {
            otheruuid: require('uuid/v1')(),
            showVersion: false, // 控制版本提示
            searchLoading: false,
            name: "",
            good_name: "",
            state: -1,
            stateOptions: [
                {
                    value: -1,
                    label: "全部"
                },
                {
                    value: 0,
                    label: "未开始"
                },
                {
                    value: 1,
                    label: "进行中"
                },
                {
                    value: 2,
                    label: "已结束"
                },
                {
                    value: 3,
                    label: "已暂停"
                }
            ],
            printTime: [], // 打印时间
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            currentPage: 1,
            totalPage: 0,
            tableData: [],
            columns: [
                {   
                    label: "活动名称",
                    align: "center",
                    prop: "name"
                },
                {   
                    label: "商品名称",
                    align: "center",
                    render: (h,param)=>{
                        return h('span',{
                            attrs: {
                                style: "color:#719ff8;cursor:pointer;"
                            },
                            on: {
                                click: () => {
                                    this.$router.push({path:"/wf/admin/shop/shop_list/newadd_goods",name:'newadd_goods',query:{param:'edit',id:param.row.good_id,otheruuid: this.otheruuid}})
                                }
                            }
                        }, param.row.good_name);
                    }
                },
                {   
                    label: "定金金额（元）",
                    align: "center",
                    prop: "front_money"
                },
                {
                    label: "定金支付人数/尾款支付人数",
                    align: "center",
                    render: (h,param)=>{
                        return h('span', param.row.earnest_num+"/"+param.row.tail_num);
                    }
                },
                {   
                    label: "定金付款时间",
                    align: "center",
                    width: "340",
                    render: (h,param)=>{
                        let start_time
                        if(param.row.start_time!==null){
                            start_time = dateFormat(param.row.start_time)+"至"
                        }else{
                            start_time = ""
                        }
                        let end_time
                        if(param.row.end_time!=null){
                            end_time = dateFormat(param.row.end_time)
                        }else{
                            end_time = ""
                        }
                        return h('span', start_time+end_time);
                    }
                },
                {
                    label: "状态",
                    align: "center",
                    render: (h,param)=>{
                        let state = param.row.state===0?"未开始":param.row.state===1?"进行中":param.row.state===2?"已暂停":param.row.state===3?"已结束":""
                        let color = param.row.state===0?"#FB6664":param.row.state===1?"#9bcc95":param.row.state===2?"#333":param.row.state===3?"#719ff8":""
                        return h('span', {
                            attrs: {
                                style: "color:"+color
                            }
                        }, state);
                    }
                },
                {
                    label: "操作",
                    align: "left",
                    render: (h,param)=>{
                        let a = h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8;"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({path:"/wf/admin/shop/markting/depositAdd",query:{id:param.row.id,param:'edit'}})
                                        }
                                    }
                                }, "编辑")
                        let b = h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8;"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({path:"/wf/admin/shop/markting/depositAdd",query:{id:param.row.id,param:'views'}})
                                        }
                                    }
                                }, "查看")
                        let c = h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8;"
                                    },
                                    on: {
                                        click: () => {
                                            this.$confirm('你确定要暂停《'+param.row.name+'》活动吗？', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }).then(() => {
                                                this.frontEdit(param.row.id,2)
                                            }).catch(() => {
                                                this.$message.info("已取消暂停");          
                                            });
                                        }
                                    }
                                }, "暂停")
                        let d = h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#FB6664;"
                                    },
                                    on: {
                                        click: () => {
                                            this.$confirm('你确定要终止《'+param.row.name+'》活动吗？', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }).then(() => {
                                                this.frontEdit(param.row.id,3)
                                            }).catch(() => {
                                                this.$message.info("已取消终止");          
                                            });
                                        }
                                    }
                                }, "终止")
                        let e = h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8;"
                                    },
                                    on: {
                                        click: () => {
                                            this.$confirm('你确定要开启《'+param.row.name+'》活动使用吗？', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }).then(() => {
                                                this.frontEdit(param.row.id,1)
                                            }).catch(() => {
                                                this.$message.info("已取消开启");          
                                            });
                                        }
                                    }
                                }, "开启使用")
                        let f = h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#FB6664;"
                                    },
                                    on: {
                                        click: () => {
                                            this.$confirm('你确定要删除《'+param.row.name+'》活动吗？', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }).then(() => {
                                                this.frontEdit(param.row.id,4)
                                            }).catch(() => {
                                                this.$message.info("已取消删除");          
                                            });
                                        }
                                    }
                                }, "删除")
                        return [
                            param.row.state===0||param.row.state===2?a:"",
                            param.row.state===1||param.row.state===3?b:"",
                            param.row.state===1?c:"",
                            param.row.state===0||param.row.state===1?d:"",
                            param.row.state===2?e:"",
                            param.row.state===3||param.row.state===2?f:""
                        ]
                    }
                }
            ]
        }
    },
    components: {
        MyTable,
        versionCom
    },
    mounted(){
        this.getList(1)
    },
    methods: {
        handleCloseVersion(){
            this.showVersion = false
        },
        getList(currentPage){
            this.currentPage = currentPage
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                state: this.state,
                page: this.currentPage,
                name: this.name!==""?this.name:undefined,
                good_name: this.good_name!==""?this.good_name:undefined,
                start_time: this.printTime!==null&&this.printTime.length>0?this.printTime[0]:undefined,
                end_time: this.printTime!==null&&this.printTime.length>0?this.printTime[1]:undefined
            }
            getDepositList(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg+"600A00191");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00192');
            })
        },
        addDeposit(){
            let that = this
            getAuditApplicationList(37).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data){
                        this.$router.push({path:"/wf/admin/shop/markting/depositAdd"})
                    }else{
                        that.showVersion = true;
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00225");
                }
            }).catch((item)=>{
                that.$message.error(res.data.msg+"600B00226");
            })
            
        },
        frontEdit(id,type){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                id: id,
                state: type
            }
            depositFrontEdit(data).then((res)=>{
                if(res.data.code===200){
                    that.getList(that.currentPage)
                    that.$message.success("操作成功")
                }else{
                    that.$message.error(res.data.msg+"600A00201");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00202');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-deposit{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    .el-button--text{
        padding: 0;
        color: #719FF8;
    }
    /deep/ .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
    .wf-input-width{
        width: 200px;
    }
    .el-button--primary{
        background: #719FF8;
        border-color: #719FF8;
    }
    .wf-input-margin{
        margin: 0 20px;
    }
}
</style>
