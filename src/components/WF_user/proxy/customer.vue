<template>
    <div class="wf-proxy-customer">
        <el-input
        class="search-input"
        size="mini"
        v-model="searchTableParams"
        placeholder="输入手机号码进行搜索"
        @keyup.enter.native="searchTable">
        </el-input>
        <el-button type="primary" size="mini" @click="searchTable">搜索</el-button>
        <my-table :tableData="tableDataManager" :columns="columnsManager"  :totalPage="totalPageManager" :currentPage="currentPageManager" @currentChange="getTableDataAppManager"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from '@/untils/common.js';
export default {
    name: "proxy_customer",
    data() {
        return {
            tableDataManager:[],
            totalPageManager:0,
            currentPageManager:1,
            currentChangeManager:0,
            //搜索条件内容
            searchTableParams:'',
            //搜索后翻页内容
            searchTableParamsAfter:'',
            columnsManager: [
                { 
                    prop: "user_id", 
                    label: "编号",
                    width: "50",
                    align: "center",
                },
                { 
                    prop: "user_name", 
                    label: "用户名",
                    align: "center"
                },
                { 
                    prop: "user_phone", 
                    label: "手机号",
                    align: "center"
                },
                { prop: "create_time", label: "创建时间",align: "center" }
            ]
        }
    },
    components: {
        MyTable
    },
    created(){
        //获取客户列表
        this.getTableDataAppManager(this.currentPageManager);
    },
    methods: {
        getTableDataAppManager:function(currentPage,params){
            let that=this;
            if(currentPage!=null){
                this.currentPageManager=currentPage;
            }
            
            let data='';
            //默认页设置为1
            this.defaultCurrentPage=this.currentPageManager;

            //判断用户是否有输入搜索条件
            if(params&&params!=null&&params!=undefined&&params!=''&&currentPage!=null){
                data={
                    page:currentPage,
                    user_phone:params
                };
            }else if(this.searchTableParamsAfter&&this.searchTableParamsAfter!=null&&this.searchTableParamsAfter!=undefined){
                if(currentPage){
                    data={
                        page:currentPage,
                        user_phone:this.searchTableParamsAfter
                    }
                }else{
                    data={
                        user_phone:this.searchTableParamsAfter
                    };
                }
            }else{
                if(currentPage!=null){
                    data={
                        page:currentPage
                    };
                }else{
                     data={
                        page:1
                    };
                }
            }
            this.$axios.post(this.url+'agent_api/account/customerList',data).then(res=>{
                this.tableDataManager = res.data.data.data;
                this.totalPageManager = res.data.data.total;
                that.currentPageManager = res.data.data.current_page;
            }).catch(err=>{
                that.$notify.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                    duration: 2000
                });
            });
        },
        searchTable(){
            this.searchTableParamsAfter=this.searchTableParams;
            this.getTableDataAppManager(null,this.searchTableParamsAfter);
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-proxy-customer{
    background: #fff;
    padding: 40px;
    .search-input{
        width: 330px;
        margin-bottom: 30px;
        margin-right: 20px;
        input{
            height: 32px;
        }
    }
    .el-table td, .el-table th{
        padding: 7px 0;
    }
    .el-button--primary{
        background: #5A7BE3;
        border-color: #5A7BE3;
    }
    .el-button--primary:hover{
        background: #7e95e0;
        border-color: #7e95e0;
    }
    .wf_pagination{
        margin-top: 30px;
        text-align: center;
    }
}
</style>
