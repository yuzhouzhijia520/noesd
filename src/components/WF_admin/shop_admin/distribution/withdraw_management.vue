<template>
    <div class="wf-withdraw_management">
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
                <el-col class="line search-input-space" :span="5"> 
                    <el-input
                    size="mini"
                    class="search-input"
                    v-model="ruleForm.searchName"
                    placeholder="输入昵称进行搜索"
                    @keyup.enter.native="searchTable">
                    </el-input>
                </el-col>
                <el-col :span="5">
                    <el-button class="search-btn" size="mini" @click="searchTable">搜索</el-button>
                </el-col>
          </el-form-item>
        </el-form>

        <my-table class="my-table" :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "shop_distribution_withdraw_management",
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
            searchName: "",
            totalPage:0,
            currentPage:1,
            tableData: [],
            columns: [
                {   
                    prop: "dis_name",
                    label: "分销",
                    align: "center"
                },
                { 
                    label: "账号",
                    align: "center",
                    render:function(h,param){
                        
                        let a =param.row.full_name + "（" + param.row.wechat_number + "）"
                        return h('span', a);
                    }
                },
                {
                    prop: "state",
                    label: "状态",
                    width: "120",
                    align: "center",
                    render: function(h, param) {
                        let stateText='';
                        if(param.row.state==="待打款"){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#E36F6B;"
                                }
                            }, "待打款")];
                        }else if(param.row.state==="已打款"){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#719FF8;"
                                }
                            }, "已打款")];
                        }else if(param.row.state==="已拒绝"){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#666;"
                                }
                            }, "已拒绝")];
                        }
                        return h('div', stateText);
                    }
                },
                { label: "打款方式", align: "center", prop: "pay_state" },
                {
                    label: "金额",
                    align: "center" ,
                    render: function(h,param) {
                        let a = [
                            h('span',{
                                attrs: {
                                    style: "color:#E36F6B;"
                                }
                            },"￥" + param.row.put_amount)
                        ]
                        return a
                    }
                },
                { prop: "create_time", label: "申请时间",align: "center" },
                {
                    label: "操作",
                    align: "center",
                    width: "300",
                    render: (h, param) => {
                        if(param.row.state==="待打款"){
                            let a = [
                                h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8"
                                    },
                                    on: {
                                        click: () => {
                                            this.operating(param.row.id,1)
                                        }
                                    }
                                }, '微信打款'),
                                h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8"
                                    },
                                    on: {
                                        click: () => {
                                            this.operating(param.row.id,2)
                                        }
                                    }
                                }, '线下转账'),
                                h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#E36F6B"
                                    },
                                    on: {
                                        click: () => {
                                            this.operating(param.row.id,3)
                                        }
                                    }
                                }, '审核拒绝')
                            ]
                            return h('div', a);
                        }
                    }
                }
            ],
            ruleForm: {
                searchPhone: '',
                searchName:''
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
        getTableData(currentPage,phone,name){
            let that = this
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            this.currentPage = currentPage
            let data = ""
            if(phone&&phone!=null&&phone!=""&&phone!=undefined||name&&name!=null&&name!=""&&name!=undefined){
                data = {
                    secret: localStorage.getItem('secretId'),
                    page: this.currentPage,
                    phone: phone,
                    full_name: name
                }
            }else{
                data={
                    secret: localStorage.getItem('secretId'),
                    page: 1
                 };
                
            }
            this.$axios.post(this.url+'distributionhome/Distributionlist/cash',data
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
            this.getTableData(1,this.ruleForm.searchPhone,this.ruleForm.searchName)
        },
        operating(id,type){
            this.$confirm('是否确认微信打款', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                let data = {
                    secret: localStorage.getItem('secretId'),
                    token: localStorage.getItem('userId'),
                    id: id,
                    type: type
                }
                this.$axios.post(this.url+'distributionhome/Distributionlist/Transfer',data
                ).then(res=>{
                    if(res.data.code===200){
                        if(type===1){
                            this.$message.success("打款成功");
                        }else if(type===2){
                            this.$message.success("确认成功");
                        }else if(type===3){
                            this.$message.success("拒绝成功");
                        }
                    }else{
                        this.$message.error("打款失败，请确保商户号提现到微信可用");
                    }
                }).catch(err=>{
                    that.$message.error('系统出错，请联系管理员！');
                });
                
            }).catch(() => {
                this.$message.info("已取消操作");          
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-withdraw_management{
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
    .el-input-number{
        input{
            text-align: left;
        }
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
        /deep/ .el-tabs__item:hover {
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
}
</style>