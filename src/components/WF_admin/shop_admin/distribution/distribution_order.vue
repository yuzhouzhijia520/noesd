<template>
    <div class="wf-distribution_order">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <el-form-item>
                <el-col class="search-input-space" :span="5">
                    <el-form-item  prop="searchPhone">
                        <el-input
                            size="mini"
                            class="search-input"
                            v-model="ruleForm.searchPhone"
                            placeholder="输入手机号码进行搜索"
                            @keyup.enter.native="searchTable">
                            </el-input>
                     </el-form-item>
                </el-col>
                <el-col class="line search-input-space" :span="5" style="width:300px;margin-right:20px;"> 
                    <el-input
                    size="mini"
                    class="search-input"
                    v-model="ruleForm.searchOrder"
                    placeholder="输入订单号进行搜索"
                    @keyup.enter.native="searchTable">
                    </el-input>
                </el-col>
                <el-col :span="5">
                    <el-button class="search-btn" size="mini" @click="searchTable">搜索</el-button>
                </el-col>
          </el-form-item>
        </el-form>

        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="全部" name="first"></el-tab-pane>
            <el-tab-pane label="待结算" name="second"></el-tab-pane>
            <el-tab-pane label="已结算" name="third"></el-tab-pane>
            <el-tab-pane label="已取消" name="fourth"></el-tab-pane>
        </el-tabs>
        <my-table class="my-table" :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "shop_distribution_distribution_order",
    data() {
        var checkPhone = (rule, value, callback) => {
             if(!value){
                   callback();
             }else{
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'));
                }
             }
          
        };
        return {
            searchPhone: undefined,
            searchOrder: "",
            activeName: 'first',
            tab_index: 0,
            totalPage:0,
            currentPage:1,
            tableData: [],
            columns: [
                { prop: "trade_no", label: "订单号", align: "center" },
                { prop: "nickName", label: "分销用户", align: "center" },
                { 
                    label: "佣金",
                    align: "center" ,
                    render: function(h,param) {
                        let a = [
                            h('span',{
                                attrs: {
                                    style: "color:#E36F6B;"
                                }
                            },"￥" + param.row.commisstion)
                        ]
                        return a
                    }
                },
                { prop: "type", label: "类型",align: "center" },
                {
                    prop: "state",
                    label: "状态",
                    width: "120",
                    align: "center",
                    render: function(h, param) {
                        let stateText='';
                        if(param.row.state==="待结算"){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#E36F6B;"
                                }
                            }, param.row.state)];
                        }else if(param.row.state==="已结算"){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#719FF8;"
                                }
                            }, param.row.state)];
                        }else if(param.row.state==="已取消"){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#666"
                                }
                            }, param.row.state)];
                        }
                        return h('div', stateText);
                    }
                },
                { prop: "create_time", label: "创建时间",align: "center" }
            ],
            ruleForm: {
                searchPhone: '',
                searchOrder:''
            },
            rules: {
                searchPhone: [
                    {validator: checkPhone, trigger: 'blur'}
                ]
            }
        }
    },
    components: {
        MyTable
    },
    mounted(){
        this.getTableData(1);
    },
    methods: {
        handleTabClick(tab){
            this.tab_index = tab.index
            this.getTableData(1,this.ruleForm.searchPhone,this.ruleForm.searchOrder)
        },
        getTableData: function(currentPage,phone,order) {
            let that = this
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            this.currentPage = currentPage
            let data = ""
            if(phone&&phone!=null&&phone!=""&&phone!=undefined||order&&order!=null&&order!=""&&order!=undefined){
                data = {
                    secret: localStorage.getItem('secretId'),
                    token: localStorage.getItem('userId'),
                    page: currentPage,
                    status: this.tab_index,
                    phone: phone,
                    trade_no: order
                }
            }else{
                data = {
                    secret: localStorage.getItem('secretId'),
                    token: localStorage.getItem('userId'),
                    status: this.tab_index,
                    page: currentPage
                }
            }
            this.$axios.post(this.url+'distributionhome/Distributionlist/orderList',data
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data;
                    that.currentChange = res.data.data.current_page;
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        searchTable(){
            this.getTableData(1,this.ruleForm.searchPhone,this.ruleForm.searchOrder)
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-distribution_order{
    padding-top: 20px;
    .search-input-space{
        width:300px;
        margin-right:20px;
    }
    .el-form{
        /deep/ .el-form-item{
            margin-bottom: 0;
        }
    }
    .search-input{
        width: 300px;
        margin-bottom: 20px;
        margin-right: 20px;
    }
    .search-btn{
        background: #719FF8;
        color: #fff;
        border-radius: 4px;
    }
    .search-btn:hover{
        background: #95b6f6;
    }
    .el-tabs{
        margin-bottom: 20px;
        background: #fff;
        padding-left: 20px;
        border-radius: 4px;
        /deep/ .el-tabs__item{
            font-size: 16px;
            font-weight: 400;
        }
        /deep/ .is-active{
            font-weight: bold;
        }
        /deep/ .el-tabs__header{
            margin: 0;
        }
        /deep/ .el-tabs__nav{
            padding: 10px 0;
        }
        /deep/ .el-tabs__nav-wrap::after{
            display: none;
        }
        /deep/ .el-tabs__item.is-active {
            color: #719FF8;
        }
        /deep/ el-tabs__item:hover {
            color: #719FF8;
            cursor: pointer;
        }
        /deep/ .el-tabs__active-bar{
            background-color: #719FF8;
            height: 4px;
        }
    }
    
    .my-table,.my-table .el-table{
        background: #fff;
        border-radius: 4px;
        padding: 0 10px;
        padding-bottom: 20px;
        /deep/ .el-table{
            margin-bottom: 20px;
        }
        /deep/ .el-table::before{
            display: none;
        }
        /deep/ thead th{
            padding: 20px 0;
        }
        /deep/ .el-table td, .el-table th{
            padding: 8px 0;
        }
        /deep/ .el-table th>.cell{
            color: #333;
            font-size:16px;
            font-weight: 400;
        }
        /deep/ .wf_pagination{
            text-align: center;
        }
    }
    /deep/ .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus,
    .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
        border-color: #dcdfe6;
    }
    /deep/ .el-input__suffix{
        display: none;
    }
    /deep/ .el-form-item__error{
        top: 38px;
    }
}
</style>
