<template>
    <div id="bkmanagement">
        <bkuserHearder></bkuserHearder>
        <div class="wf-bkmanagement-detail">
           <el-tabs v-model="activeNameDetail">
                <el-tab-pane label="代理详情" name="one">
                    <el-form ref="formAddGroupData" :model="formAddGroupData">
                        <el-row class="wf-addgroup-formRow">
                            <el-col :span="4">
                                <span class="wf-addgroup-col">代理分组:</span><span>{{formAddGroupData.group_name}}</span>
                            </el-col>
                            <el-col :span="4">
                                <span class="wf-addgroup-col">折扣:</span><span>{{formAddGroupData.discount}}</span><span>折</span>
                            </el-col>
                            <el-col :span="4">
                                <span class="wf-addgroup-col">余额:</span><span>{{formAddGroupData.balance}}</span>
                            </el-col>
                            <el-col :span="4">
                                <span class="wf-addgroup-col">截止日期:</span><span>{{formAddGroupData.term_of_validity}}</span>
                            </el-col>
                        </el-row>
                        <br>
                         <el-row class="wf-addgroup-formRow" v-if="!this.$store.state.oemFlag">
                            <el-col :span="16" v-model="formAddGroupData.invite_url">
                                <span class="wf-addgroup-col">邀请客户注册:</span><span>{{formAddGroupData.invite_url}}</span>
                                <span v-if="formAddGroupData.invite_url">
                                    <el-button size="mini"
                                    v-clipboard:copy="formAddGroupData.invite_url"
                                    v-clipboard:success="onCopy"
                                    v-clipboard:error="onError" type="success">点击复制</el-button>
                                </span>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
           </el-tabs>
        </div>

        <div class="wf-intentionalAgent">
            <el-tabs v-model="activeNamebk" @tab-click="handleClick">
                <el-row :gutter="3" style="margin: 10px 0;">
                    <el-col :span="5">
                        <el-input size="mini" v-model="searchTableParams" @change="handleSearchTable" placeholder="请输入手机号码" suffix-icon="el-icon-search" >
                        </el-input>
                    </el-col>
                </el-row>
                <el-tab-pane label="小程序列表" name="first">
                    <my-table :tableData="tableDataApp" :columns="columnsApp" :totalPage="totalPageApp" :currentPage="currentPage" @currentChange="getTableDataApp"></my-table>
                </el-tab-pane>
                <el-tab-pane label="客户管理" name="second">
                    <my-table :tableData="tableDataManager" :columns="columnsManager" :totalPage="totalPageManager" @currentChange="getTableDataAppManager"></my-table>
                </el-tab-pane>
            </el-tabs>
        </div>
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

        <userFooter></userFooter> 
    </div>
</template>
<script>
// import mockdata from "@/mock/index.js";

/* @author ps
   @date 2018-10-16
   @application 基于elementui二次封装的table插件，组件化、高复用类型组件；
*/
import MyTable from "@/commonComponents/table/table.vue";
import bkuserHearder from './bkheader';
import userFooter from './footer';
import {dateFormat} from '@/untils/common.js';

export default {
    data() {
      return {
        name: "user_bkmanagement",
        searchAPPList:'',//搜索小程序列表
        searchUserList:'',//搜索客户管理列表
        activeNameDetail:"one",
        //表格页名称绑定
        activeNamebk: 'first',
        //搜索条件内容
        searchTableParams:'',
        dialogVisible:false,
        countContent:'',
        formAddGroupData:{
            group_name:'',
            discount:'',
            balance:'',
            term_of_validity:'',
            invite_url:''
        },
        formLabelWidth: '50px',
        tableDataApp:[],
        totalPageApp:0,
        currentPage:1,
        currentChange:0,
        columnsApp: [
                    { prop: "pro_id", 
                      label: "编号",
                      width: "50",
                      align: "center",
                    },
                    { prop: "user_name", 
                      label: "用户名",
                      align: "center"
                    },
                    { prop: "user_phone", 
                      label: "手机号",
                      align: "center"
                    },
                    { prop: "pro_name", 
                      label: "应用名称",
                      align: "center"
                    },
                    { prop: "type_name", 
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
                                                        style: 'color:#b9b9b9;font-size:16px;margin-left:10px;'}, '')
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
                    { prop: "create_time", label: "创建时间",align: "center",
                      render:(h, param) => {
                          return [h('div', {}, dateFormat(param.row.create_time))];
                      }
                    },
                    {
                        prop: "",
                        label: "操作",
                        align: "center",
                        render: (h, param) => {
                            let toAdmin=h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "default"
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
                                    type: "default"
                                },
                                on: {
                                    click: () => {
                                      this.dialogVisible = true;
                                        let that=this;
                                        let data={
                                            pro_id:param.row.pro_id
                                        };
                                       this.$confirm('是否确认提交审核?', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            that.getAmount(data);
                                        });
                                       
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
            tableDataManager:[],
            totalPageManager:0,
            currentPageManager:1,
            currentChangeManager:0,
            columnsManager: [
                    { prop: "user_id", 
                      label: "编号",
                      width: "50",
                      align: "center",
                    },
                    { prop: "user_name", 
                      label: "用户名",
                      align: "center"
                    },
                    { prop: "user_phone", 
                      label: "手机号",
                      align: "center"
                    },
                    { prop: "create_time", label: "创建时间",align: "center" }
            ]
      }
    },
    components: {
        MyTable,
        bkuserHearder,
        userFooter
    },
    mounted(){
        //初始化页面判断是否已登录
        this.initPage();
        //获取代理商详情信息
        this.getAgentDetail();
        //获取小程序列表信息
        this.getTableDataApp(this.currentPage);
        //获取客户列表
        this.getTableDataAppManager(this.currentPageManager);
    },
    methods: {
        initPage(){
            if(!localStorage.agentId||!localStorage.agentPhone){
                //设置跳转服务商页面
                localStorage.setItem('activeName','second');
                this.$router.push({path:'/wf/index/login',name:'index'})
            }
        },
        onCopy(){
            // this.$notify.success({
            //     title: 'success',
            //     message: '已复制到剪切板！',
            //     duration: 2000
            // });
            this.$message({
                    type: 'success',
                    message: '已复制到剪切板！'
                });
        },
        onError(){
            // this.$notify.error({
            //     title: 'error',
            //     message: '复制失败！',
            //     duration: 2000
            // });
             this.$message({
                    type: 'error',
                    message: '复制失败！'
                });
        },
        getSubmissionData(data) {
             const loading = this.$loading({
                    lock: true,
                    text: '正在拼命处理中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
            let that=this;
            this.$axios.post(this.url+'agent_api/account/submission', data)
            .then(res=> {
                if(res.data.code!=200){
                    loading.close();
                    that.countContent=res.data.msg;
                    return '';
                }else{
                    return res.data.pro_id;
                }
            }).catch(err=>{
                loading.close();
                this.dialogVisible = false;
                // that.$message.error({
                //     title: 'error',
                //     message: '系统出错，请联系管理员！',
                //     duration: 2000
                // });
                 this.$message({
                    type: 'info',
                    message: '网络错误！'
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
                // that.$notify.error({
                //     title: 'error',
                //     message: '系统出错，请联系管理员！',
                //     duration: 2000
                // });
                this.$message({
                    type: 'info',
                    message: '网络错误！'
                });
            });        
        },
        async getAmount(data){
            const pro_id_1 = await this.getSubmissionData(data); 
            if(pro_id_1){
                const handle = await this.getAmountData(pro_id_1); 
            }        
        },
        handleDialogClose(){
            //关闭弹出
            this.dialogVisible=false;
            //清除弹出类容
            this.countContent='';
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        getAgentDetail:function(){
            let that=this;
            let data={};
            this.$axios.post(this.url+'agent_api/account/info',data).then(res=>{
                if(res.data.code===200){
                    that.formAddGroupData=res.data.data;
                    that.formAddGroupData.term_of_validity=dateFormat(that.formAddGroupData.term_of_validity);
                }else{
                    that.$notify.error({
                        title: 'error',
                        message: res.data.msg,
                        duration: 2000
                    });
                }
               
            }).catch(err=>{
                this.$message({
                    type: 'info',
                    message: '网络错误！'
                });
            });
        },
        getTableDataAppManager:function(currentPage,params){
            let that=this;
            this.currentPageManager=currentPage;
            let data='';
            //判断用户是否有输入搜索条件
            if(params&&params!=null&&params!=undefined&&params!=''){
                data={
                    page:currentPage,
                    user_phone:params
                };
            }else{
                data={
                    page:currentPage
                };
            }
            this.$axios.post(this.url+'agent_api/account/customerList',data).then(res=>{
                this.tableDataManager = res.data.data.data;
                this.totalPageManager = res.data.data.total;
                that.currentChange = res.data.data.current_page;
            }).catch(err=>{
                
                // that.$notify.error({
                //     title: 'error',
                //     message: '系统出错，请联系管理员！',
                //     duration: 2000
                // });
                this.$message({
                    type: 'info',
                    message: '网络错误！'
                });
            });
        },
        getTableDataApp: function(currentPage,params) {
            let that=this;
            this.currentPage=currentPage;
            let data='';
            //判断用户是否有输入搜索条件
            if(params&&params!=null&&params!=undefined){
                data={
                    page:currentPage,
                    user_phone:params
                };
            }else{
                data={
                    page:currentPage
                };
            }
            //本地调试采用mock
            // this.$axios.get('/api/mockjs/agentList').then(res=>{
            this.$axios.post(this.url+'agent_api/account/appList',data).then(res=>{
                this.tableDataApp = res.data.data.data;
                this.totalPageApp = res.data.data.total;
                that.currentChange = res.data.data.current_page;
            }).catch(err=>{
                // this.$notify.error({
                //     title: 'error',
                //     message: '系统出错，请联系管理员！',
                //     duration: 2000
                // });
                this.$message({
                    type: 'info',
                    message: '网络错误！'
                });
            });
        },
        handleClick(tab, event){
            //将标签名称赋值给activeNamebk，以便其他地方使用
            this.activeNamebk=tab.name;
            //清空搜索内容
            this.searchTableParams='';
        },
        handleSearchTable(){
            if(this.activeNamebk==='first'){
                this.getTableDataApp(1,this.searchTableParams);
            }else if(this.activeNamebk==='second'){
                this.getTableDataAppManager(1,this.searchTableParams);
            }
        }
    }
}
</script>
<style lang='scss'>
#bkmanagement{
    .wf-bkmanagement-detail{
        padding: 72px 70px 0 70px;
        .wf-addgroup-formRow{
            .wf-addgroup-col{
                font-size: 17px;
                margin-right: 10px;
            }
        }
    }
    .wf-intentionalAgent {
        padding: 20px 70px 70px 70px;
        .wf-intentionalAgent-add {
            margin-bottom: 15px;
        }
        .el-table td{
            padding: 4px 0;
        }
    }
    
}
.el-loading-mask{
    z-index: 2005 !important;
}
    
</style>

