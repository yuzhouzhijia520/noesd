<template>
    <div class="wf-proxy-app-list">
        <el-input
        class="search-input"
        size="mini"
        v-model="searchTableParams"
        placeholder="输入手机号码进行搜索"
        @keyup.enter.native="searchTable">
        </el-input>
        <el-button type="primary" size="mini" @click="searchTable">搜索</el-button>
        <my-table :tableData="tableDataApp" :columns="columnsApp" :totalPage="totalPageApp"  :currentPage="currentPage" @currentChange="getTableDataApp"></my-table>
         <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            center>
            <span>{{countContent}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size='mini' @click="handleDialogClose">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from '@/untils/common.js';
export default {
    name: "proxy_app_list",
    data() {
        return {
            tableDataApp:[],
            totalPageApp:0,
            currentPage:1,
            currentChange:0,
            //搜索条件内容
            searchTableParams:'',
            //搜索后翻页内容
            searchTableParamsAfter:'',
            dialogVisible:false,
            countContent:'',
            //设置默认页 type number
            columnsApp: [
                { 
                    prop: "pro_id", 
                    label: "编号",
                    width: "70",
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
                { 
                    prop: "pro_name", 
                    label: "应用名称",
                    align: "center"
                },
                { 
                    prop: "type_name", 
                    label: "应用类型",
                    align: "center"
                },
                {
                    prop: "agent_state",
                    label: "状态",
                    width: "100",
                    align: "left",
                    render: function(h, param) {
                        let stateText='';
                        if(param.row.pro_status===0){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: "info"
                                }
                            }, '未发布')];
                        }else if(param.row.pro_status===1){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: "warning"
                                }
                            }, '审核中')];
                        }else if(param.row.pro_status===2){
                            stateText= [h('el-tag', {
                                                props: {
                                                    size: "mini",
                                                    type: "danger"
                                                }
                                            }, '未通过'),
                                            h('el-popover', {
                                                props: {placement: 'left',
                                                        title: '原因：', width: '250',
                                                        trigger: 'hover',
                                                        content: param.row.review_result
                                                        }
                                            }, [
                                                h('i', {
                                                    slot: 'reference', 
                                                    class: 'el-icon-question', 
                                                    style: 'color:#949494b0;font-size:16px;margin-left:10px;'}, '')
                                            ])
                                        ];
                            return h('div', stateText);
                        }else if(param.row.pro_status===3){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: "success"
                                }
                            }, '已上线')];
                        }else if(param.row.pro_status===4){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: "info"
                                }
                            }, '未上线')];
                        }
                        return h('div', stateText);
                    }
                },
                { 
                    width: "200",
                    prop: "create_time", label: "创建时间",align: "center",
                    render:(h, param) => {
                        return [h('div', {}, dateFormat(param.row.create_time))];
                    }
                },
                {
                    prop: "",
                    label: "操作",
                    align: "center",
                    width: "300",
                    render: (h, param) => {
                        let toAdmin=h('el-button', {
                            props: {
                                size: "mini",
                                type: "danger"
                            },
                            on: {
                                click: () => {
                                    // localStorage.setItem('secretId',param.row.token);
                                    localStorage.setItem('userId',param.row.token);
                                    localStorage.setItem('userPhone',param.row.user_phone);
                                    //pro
                                    // window.open(this.url + "wf/user/management");

                                    //本地
                                    window.open(location.origin + "/wf/user/management");
                                    // window.open("http://localhost:8081" + "/wf/user/management");
                                }
                            }
                        }, '进入后台');
                        let a = [h('el-button', {
                            props: {
                                size: "mini",
                                type: "primary"
                            },
                            on: {
                                click: () => {
                                this.dialogVisible = true;
                                    let that=this;
                                    let data={
                                        pro_id:param.row.pro_id
                                    };
                                
                                this.getAmount(data);
                                }
                            }
                        }, '提交审核'),toAdmin];
                        let b = [h('el-button', {
                            props: {
                                size: "mini",
                                type: "info",
                                disabled:"disabled",
                            
                            },
                            attrs:{
                                style:"width: 80px"
                            }
                            
                        }, '审核中'),toAdmin];
                        let c = [h('el-button', {
                            props: {
                                size: "mini",
                                type: "default"
                            },
                            on: {
                                click: () => {
                                this.dialogVisible = true;
                                    let that=this;
                                    let data={
                                        pro_id:param.row.pro_id
                                    };
                                
                                this.getAmount(data);
                                }
                            }
                        }, '重新审核'),toAdmin];
                        let d= [h('el-button', {
                            props: {
                                size: "mini",
                                type: "info",
                                disabled:"disabled",
                            
                            },
                            attrs:{
                                style:"width: 80px"
                            }
                        }, '已经发布'),toAdmin];

                        let e= [h('el-button', {
                            props: {
                                size: "mini",
                                type: "default"
                            },
                            on: {
                                click: () => {
                                this.dialogVisible = true;
                                    let that=this;
                                    let data={
                                        pro_id:param.row.pro_id
                                    };
                                
                                this.getAmount(data);
                                }
                            }
                        }, '立即发布'),toAdmin];
                        
                        //未发布 —— 提交审核
                        if(param.row.pro_status===0){
                            return h('div', a);

                        //审核中 —— 等待审核，同时按钮置灰不可操作
                        }else if(param.row.pro_status===1){
                            return h('div', b);

                        //未通过 —— 重新审核
                        }else if(param.row.pro_status===2){
                            return h('div', c);
                        
                        //已上线 —— 已经发布，同时按钮置灰不可操作
                        }else if(param.row.pro_status===3){
                            return h('div', d);
                        
                        //未上线 —— 立即发布
                        }else if(param.row.pro_status===4){
                            return h('div', e);
                        }
                        
                    }
                }
            ],
            pro_id:''
        }
    },
    components: {
        MyTable
    },
     mounted(){
        //初始化页面判断是否已登录
        this.initPage();
        //获取小程序列表信息
        this.getTableDataApp(this.currentPage);
    },
    methods: {
        initPage(){
            if(!localStorage.agentId||!localStorage.agentPhone){
                //设置跳转服务商页面
                localStorage.setItem('activeName','second');
                this.$router.push({path:'/wf/index/login',name:'index'})
            }
        },
        handleDialogClose(){
            //关闭弹出
            this.dialogVisible=false;
            //清除弹出类容
            this.countContent='';
            //重置列表
            if(this.currentPage){
                this.getTableDataApp(this.currentPage);
            }else{
                this.getTableDataApp(1);
            }
            
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                //清除弹出类容
                this.countContent='';
                //重置列表
                if(this.currentPage){
                    this.getTableDataApp(this.currentPage);
                }else{
                    this.getTableDataApp(1);
                }
                done();
            })
            .catch(_ => {});
        },
        getSubmissionData:async function(data) {
             const loading = this.$loading({
                    lock: true,
                    text: '正在拼命处理中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
            let that=this;
            await this.$axios.post(this.url+'agent_api/account/submission', data)
            .then(res=> {
                if(res.data.code!=200){
                    loading.close();
                    that.countContent=res.data.msg;
                    return '';
                }else{
                    if(res.data.data.pro_id){
                        that.pro_id=res.data.data.pro_id;
                        loading.close();
                        return res.data.data.pro_id;
                    }else{
                        loading.close();
                        that.countContent=res.data.msg;
                        return '';
                    }
                    
                }
            }).catch(err=>{
                loading.close();
                this.dialogVisible = false;
                that.$notify.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                    duration: 2000
                });
            });      
        },
        getAmountData(pro_id) {
             const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            let that=this;
            let data={
                pro_id:pro_id
            };
            this.$axios.post(this.url+'agent_api/account/getAmount', data).then(res=> {
                loading.close();
                if(res.data.code!=200){
                    that.countContent='本次提交审核上线将扣除金额'+res.data.data;
                }else{
                    that.countContent=res.data.msg;   
                }
            }).catch(err=>{
                loading.close();
                this.dialogVisible = false;
                that.$notify.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                    duration: 2000
                });
            });        
        },
        async getAmount(data){
            await this.getSubmissionData(data);
            if(this.pro_id){
                await this.getAmountData(this.pro_id); 
                //清零
                this.pro_id='';
            }        
        },
        getTableDataApp: function(currentPage,params) {
            let that=this;
            if(currentPage!=null){
                this.currentPage=currentPage;
            }
            let data='';
            //判断用户是否有输入搜索条件
            if(params&&params!=null&&params!=undefined&&currentPage!=null){
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
            if(data){
                //本地调试采用mock
                // this.$axios.get('/api/mockjs/agentList').then(res=>{
                this.$axios.post(this.url+'agent_api/account/appList',data).then(res=>{
                    this.tableDataApp = res.data.data.data;
                    this.totalPageApp = res.data.data.total;
                    that.currentPage = res.data.data.current_page;
                }).catch(err=>{
                    this.$notify.error({
                        title: 'error',
                        message: '系统出错，请联系管理员！',
                        duration: 2000
                    });
                });
            }
            
        },
        handleClick(tab, event){
            //将标签名称赋值给activeNamebk，以便其他地方使用
            this.activeNamebk = tab.name;
            //清空搜索内容
            this.searchTableParams='';
        },
        searchTable(){
            this.searchTableParamsAfter=this.searchTableParams;
            this.getTableDataApp(null,this.searchTableParamsAfter);
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-proxy-app-list{
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
    .el-button--danger{
        background: #F68985;
        border-color: #F68985;
    }
    .el-button--danger:hover{
        background: #ee9996;
        border-color: #ee9996;
    }
    .wf_pagination{
        margin-top: 30px;
        text-align: center;
    }
}
</style>
