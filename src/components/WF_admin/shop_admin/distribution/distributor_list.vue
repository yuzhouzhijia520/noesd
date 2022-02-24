<template>
    <div class="wf-distributor_list">
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
        
        <el-tabs id="el-tabs" v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane style="font-size:16px!importnat;" label="全部" name="first"></el-tab-pane>
            <el-tab-pane style="font-size:16px!importnat;" label="待审核" name="second"></el-tab-pane>
            <el-tab-pane style="font-size:16px!importnat;" label="已审核" name="third"></el-tab-pane>
        </el-tabs>
        <my-table class="my-table" :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "shop_distribution_distributor_list",
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
            activeName: 'first',
            tab_index: 0,
            totalPage:0,
            currentPage:1,
            tableData: [],
            columns: [
                {   label: "微信",
                    width: "200",
                    render: function(h, param) {
                        let img='';
                        if(param.row.avatarUrl!=""&&param.row.avatarUrl!=null&&param.row.avatarUrl!=undefined){
                            img = [
                                h('img', {
                                    attrs: {
                                        src: param.row.avatarUrl,
                                        style: 'width:44px;height:44px;vertical-align:middle;margin-right:15px;'
                                    }
                                }),
                                h('span', {} , param.row.nickName)
                            ];
                        }else{
                            img = [
                                h('img', {
                                    attrs: {
                                        src: "http://cdn0.19mini.com/2018-11-20%2Fadafb2ea64fbdf0651e32af183ddab36.png",
                                        style: 'width:44px;height:44px;vertical-align:middle;margin-right:15px;'
                                    }
                                }),
                                h('span', {} , param.row.nickName)
                            ];
                        }
                        return h('div', img);
                    }
                },
                { label: "手机号", align: "center", prop: "phone" },
                {
                    prop: "dis_state",
                    label: "状态",
                    width: "120",
                    align: "center",
                    render: function(h, param) {
                        let stateText='';
                        if(param.row.dis_state===3){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#E36F6B;"
                                }
                            }, "待审核")];
                        }else if(param.row.dis_state===1){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#719FF8;"
                                }
                            }, "已审核")];
                        }
                        return h('div', stateText);
                    }
                },
                { 
                    label: "上级",
                    align: "center",
                    render:function(h,param){
                        let a = "",b = ""
                        if(param.row.invite_name!=""&&param.row.invite_name!=null&&param.row.invite_name!=undefined){
                            a = param.row.invite_name
                        }
                        if(param.row.invite_phone!=""&&param.row.invite_phone!=null&&param.row.invite_phone!=undefined){
                            b = "（" + param.row.invite_phone + "）"
                        }
                        return [h('span', a+b)];
                    }
                },
                { prop: "application_time", label: "申请时间",align: "center" },
                {
                    label: "操作",
                    align: "center",
                    render: (h, param) => {
                        let a = ""
                        if(param.row.dis_state===3){
                            a = [h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8"
                                    },
                                    on: {
                                        click: () => {
                                            this.review(param.row.id,1)
                                        }
                                    }
                                }, '通过'),
                                h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#E36F6B"
                                    },
                                    on: {
                                        click: () => {
                                            this.review(param.row.id,0)
                                        }
                                    }
                                }, '拒绝')]
                        }else if(param.row.dis_state===1){
                            a = [h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({path:"/wf/admin/shop/markting/disMenu/distributor_detail",query:{id:param.row.id}})
                                    }
                                }
                            }, '查看详情')]
                        }
                        return h('div', a);
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
        handleTabClick(tab){
            this.tab_index = tab.index
            this.getTableData(1,this.ruleForm.searchPhone,this.ruleForm.searchName)
        },
        getTableData: function(currentPage,phone,name) {
            let that = this
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            this.currentPage = currentPage
            let data = ""
            if(phone&&phone!=null&&phone!=""&&phone!=undefined||name&&name!=null&&name!=""&&name!=undefined){
                data = {
                    secret: localStorage.getItem('secretId'),
                    token: localStorage.getItem('userId'),
                    status: this.tab_index,
                    page: currentPage,
                    phone: phone,
                    nickName: name
                }
            }else{
                data = {
                    secret: localStorage.getItem('secretId'),
                    token: localStorage.getItem('userId'),
                    status: this.tab_index,
                    page: currentPage
                }
            }
            this.$axios.post(this.url+'distributionhome/Distributionlist/list',data
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
        review(id,e){
            this.$confirm('是否确认执行此次操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                let data = {
                    secret: localStorage.getItem('secretId'),
                    token: localStorage.getItem('userId'),
                    id: id,
                    status: e
                }
                this.$axios.post(this.url+'distributionhome/Distributionlist/verify',data
                ).then(res=>{
                    if(res.data.code===200){
                        that.getTableData(that.currentPage)
                        that.$message.success("操作成功");
                    }else{
                        that.$message.error('系统出错，请联系管理员！');
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
.wf-distributor_list{
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
        margin: 20px 0;
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