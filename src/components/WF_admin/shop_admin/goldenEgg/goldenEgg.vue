<template>
    <div class="wf-goldenEgg">
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
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            size="mini"
            :default-time="['00:00:00','23:59:59']"
            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            <el-button @click="getList(1,1)" :loading="searchLoading" size="mini" type="primary" icon="el-icon-search">搜索</el-button>
            <el-button @click="addEgg" size="mini" icon="el-icon-plus">新增砸金蛋</el-button>
        </div>
        <my-table
        :tableData="tableData"
        ref="table"
        :columns="columns"
        :totalPage="totalPage"
        :currentPage="currentPage"
        @currentChange="getList">
        </my-table>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { goldenEggList, goldenEggDelete } from "@/server/goldenEgg.js"
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: "goldenEgg",
    data() {
        return {
            showVersion: false, // 控制版本提示
            searchLoading: false,
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
                        let state = param.row.state===0?"未开始":param.row.state===1?"进行中":param.row.state===2?"已结束":param.row.state===3?"已暂停":""
                        let color = param.row.state===0?"#FB6664":param.row.state===1?"#9bcc95":param.row.state===2?"#719ff8":param.row.state===3?"#333":""
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
                    label: "提交量/浏览量",
                    align: "center",
                    render: (h,param)=>{
                        return h('span', param.row.submission_quantity+"/"+param.row.browse_volume);
                    }
                },
                {
                    label: "操作",
                    align: "left",
                    width: "240",
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
                                            this.$router.push({path:"/wf/admin/shop/markting/goldenEgg/editGoldenEgg",query:{id:param.row.id,type:1}})
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
                                            this.$router.push({path:"/wf/admin/shop/markting/goldenEgg/editGoldenEgg",query:{id:param.row.id,type:2}})
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
                                                this.goldenEggDelete(param.row.id,3)
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
                                                this.goldenEggDelete(param.row.id,2)
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
                                                this.goldenEggDelete(param.row.id,1)
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
                                                this.goldenEggDelete(param.row.id,0)
                                            }).catch(() => {
                                                this.$message.info("已取消删除");          
                                            });
                                        }
                                    }
                                }, "删除")
                        return [
                            param.row.state===0||param.row.state===3?a:"",
                            param.row.state===1||param.row.state===2?b:"",
                            param.row.state===1?c:"",
                            param.row.state===0||param.row.state===1?d:"",
                            param.row.state===3?e:"",
                            param.row.state===2||param.row.state===3?f:""
                        ]
                    }
                }
            ],
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
            }
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
                token: localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId"),
                page: this.currentPage,
                state: this.state,
                title: this.title!==""?this.title:undefined,
                start_time: this.printTime!==null&&this.printTime[0]?this.printTime[0]:"",
                end_time: this.printTime!==null&&this.printTime[1]?this.printTime[1]:""
            }
            if(type===1){
                this.searchLoading = true
            }
            goldenEggList(data).then((res)=>{
                that.searchLoading = false
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg+"600A00151");
                }
            }).catch((err)=>{
                that.searchLoading = false
                that.$message.error('网络错误600B00152');
            })
        },
        addEgg(){
            let that = this
            getAuditApplicationList(29).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data){
                        that.$router.push({path:"/wf/admin/shop/markting/goldenEgg/editGoldenEgg"})
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
        goldenEggDelete(id,type){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId"),
                id: id,
                state: type
            }
            goldenEggDelete(data).then((res)=>{
                if(res.data.code===200){
                    that.getList(that.currentPage)
                    let msg = type===0?"删除成功":type===1?"开启成功":type===2?"终止成功":type===3?"暂停成功":res.data.msg
                    that.$message.success(msg)
                }else{
                    that.$message.error(res.data.msg+"600A00153");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00154');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-goldenEgg{
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
    .wf-date-width{
        margin: 0 40px 0 10px;
    }
    .el-button--primary{
        background: #719FF8;
        border-color: #719FF8;
    }
}
</style>
