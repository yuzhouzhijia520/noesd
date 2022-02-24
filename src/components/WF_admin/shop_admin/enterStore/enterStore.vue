<template>
    <div class="wf-enterStore">
        <div>
            活动名称
            <el-input v-model="title" @keyup.enter.native="getData(1,1)" class="wf-input-width" size="mini"></el-input>
            状态
            <el-select v-model="state" class="wf-input-width" size="mini">
                <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            活动时间
            <el-date-picker
            class="wf-date-width"
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
            <el-button @click="getList(1,1)" :loading="searchLoading" size="mini" type="primary" icon="el-icon-search">搜索</el-button>
            <el-button @click="addGift" size="mini" icon="el-icon-plus">新增进店有礼</el-button>
        </div>
        <my-table :tableData="tableData" ref="table" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getList"></my-table>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { enterStoreList, enterStoreDel, enterStoreStop, enterStoreSuspend } from "@/server/enterStore.js"
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: "enterStore",
    data() {
        return {
            showVersion: false, // 控制版本提示
            searchLoading: false,
            title: "",
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
                    prop: "title"
                },
                {
                    label: "状态",
                    align: "center",
                    render: (h,param)=>{
                        let state = param.row.status===0?"未开始":param.row.status===1?"进行中":param.row.status===2?"已结束":param.row.status===3?"已暂停":""
                        let color = param.row.status===0?"#FB6664":param.row.status===1?"#9bcc95":param.row.status===2?"#719ff8":param.row.status===3?"#333":""
                        return h('span', {
                            attrs: {
                                style: "color:"+color
                            }
                        }, state);
                    }
                },
                {   
                    label: "活动时间",
                    align: "center",
                    width: "340",
                    render: (h,param)=>{
                        return h('span', param.row.start_time+"至"+param.row.end_time);
                    }
                },
                {
                    label: "领取数/已使用",
                    align: "center",
                    render: (h,param)=>{
                        return h('span', param.row.get_num+"/"+param.row.use_num);
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
                                            this.$router.push({path:"/wf/admin/shop/markting/enterStore/editEnterStore",query:{id:param.row.id,type:1}})
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
                                            this.$router.push({path:"/wf/admin/shop/markting/enterStore/editEnterStore",query:{id:param.row.id,type:2}})
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
                                            this.$confirm('你确定要暂停《'+param.row.title+'》活动吗？', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }).then(() => {
                                                this.enterStoreStop(param.row.id,1)
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
                                            this.$confirm('你确定要终止《'+param.row.title+'》活动吗？', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }).then(() => {
                                                this.enterStoreSuspend(param.row.id)
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
                                            this.$confirm('你确定要开启《'+param.row.title+'》活动使用吗？', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }).then(() => {
                                                this.enterStoreStop(param.row.id,0)
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
                                            this.$confirm('你确定要删除《'+param.row.title+'》活动吗？', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning'
                                            }).then(() => {
                                                this.enterStoreDel(param.row.id)
                                            }).catch(() => {
                                                this.$message.info("已取消删除");          
                                            });
                                        }
                                    }
                                }, "删除")
                        return [
                            param.row.status===0||param.row.status===3?a:"",
                            param.row.status===1||param.row.status===2?b:"",
                            param.row.status===1?c:"",
                            param.row.status===0||param.row.status===1?d:"",
                            param.row.status===3?e:"",
                            param.row.status===2||param.row.status===3?f:""
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
            this.showVersion = false;
        },
        getList(currentPage,type){
            this.currentPage = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                title: this.title!==""?this.title:undefined,
                state: this.state!==-1?this.state:undefined,
                start_time: this.printTime!==null&&this.printTime[0]?this.printTime[0]:undefined,
                end_time: this.printTime!==null&&this.printTime[1]?this.printTime[1]:undefined,
                page: this.currentPage
            }
            if(type===1){
                this.searchLoading = true
            }
            enterStoreList(data).then((res)=>{
                that.searchLoading = false
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg+"600A00165");
                }
            }).catch((err)=>{
                that.searchLoading = false
                that.$message.error('网络错误600B00166');
            })
        },
        addGift(){
            let that = this
            getAuditApplicationList(30).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data){
                        that.$router.push({path:"/wf/admin/shop/markting/enterStore/editEnterStore"})
                    }else{
                        that.showVersion = true;
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00181");
                }
            }).catch((item)=>{
                that.$message.error(res.data.msg+"600B00182");
            })
        },
        enterStoreDel(id){
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                id: id
            }
            enterStoreDel(data).then((res)=>{
                if(res.data.code===200){
                    that.getList(that.currentPage)
                    that.$message.success("删除成功")
                }else{
                    that.$message.error(res.data.msg+"600A00167");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00168');
            })
        },
        enterStoreSuspend(id){
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                id: id
            }
            enterStoreSuspend(data).then((res)=>{
                if(res.data.code===200){
                    that.getList(that.currentPage)
                    that.$message.success("终止成功")
                }else{
                    that.$message.error(res.data.msg+"600A00171");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00172');
            })
        },
        enterStoreStop(id,state){
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                id: id,
                state: state
            }
            enterStoreStop(data).then((res)=>{
                if(res.data.code===200){
                    that.getList(that.currentPage)
                    let msg = state===1?"开启成功":"暂停成功"
                    that.$message.success(msg)
                }else{
                    that.$message.error(res.data.msg+"600A00169");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00170');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-enterStore{
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
        margin: 0 10px;
    }
    .el-button--primary{
        background: #719FF8;
        border-color: #719FF8;
    }
    .wf-date-width{
        margin: 0 40px 0 10px;
    }
}
</style>