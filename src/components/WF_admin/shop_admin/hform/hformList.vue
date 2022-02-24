<template>
    <div class="wf-hform">
        <el-form label-width="100px" >
            <el-row>
                <el-col :span="3">
                    <el-button  @click="addHform" type="primary" size="mini" icon="el-icon-plus">新增高级表单</el-button>
                </el-col>
                <el-col :span="6" class="wf-hform-activename">
                    <el-form-item label="表单主题" size="mini">
                        <el-input v-model="title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="发布时间" size="mini">
                        <el-date-picker
                        v-model="activeTime"
                        type="daterange"
                        align="right"
                        size="mini"
                        range-separator="至"
                        start-placeholder="选择日期时间"
                        end-placeholder="选择日期时间"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button size="mini" type="primary" @click="search" icon="el-icon-search" :loading="searchLoading">搜索</el-button>
                </el-col>
            </el-row>
        </el-form>
        <my-table class="wf-hform-table" :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
        <modelView v-if="openModal === true" v-on:dialogVisible="handleDialogVisible"/>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {hformlist ,updateState } from '@/server/hform';
import {dateFormat} from '@/untils/common.js';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import modelView from './modelView';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: 'hform',
    data() {
        return {
            showVersion: false, // 控制版本提示
            tableData: [],
            totalPage:1,
            currentPage:1,
            dialogVisible: false,
            openModal:false,
            searchLoading:false,
            title:"",
            columns: [
                {   prop: "id", 
                    label: "序号",
                    width: "50",
                    align: "center"
                },
                { 
                    prop: "title", 
                    label: "表单主题",
                    align: "center",
                },
                { 
                    prop:"submit_number",
                    label: "提交量",
                    align: "center",
                    width: "120",
                },
                {   
                    label: "进行状态",
                    align: "center" ,
                    width: "150",
                    render:(h,param)=>{
                        let stateText="";
                        if(param.row.state===0){
                            stateText="-";
                        }else if(param.row.state===1){
                            stateText="进行中";
                        }else if(param.row.state===2){
                            stateText="已暂停";
                        }
                        return [h('span', stateText)];
                    }
                },
                {   
                    label: "状态",
                    align: "center" ,
                    width: "150",
                    render:(h,param)=>{
                        let stateText="";
                        if(param.row.state===0){
                            stateText="未发布";
                        }else if(param.row.state===1){
                            stateText="已发布";
                        }else if(param.row.state===2){
                            stateText="已发布";
                        }
                        return [h('span', stateText)];
                    }
                },
                 {   
                    label: "发布时间",
                    align: "center" ,
                    render:(h,param)=>{
                        if(param.row.state===1||param.row.state===2){
                            let time = dateFormat(param.row.release_time,'{y}/{m}/{d}');
                            return [h('span', time)];
                        }else{
                            return [h('span', '暂未发布')];
                        }
                        
                    }
                },
                {
                    label: "操作",
                    align: "left",
                    render: (h, param) => {
                        let that=this;
                        let  look= [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    
                                }
                            }
                        }, '预览')]
                        let  close = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    this.$confirm('此操作将暂停该表单, 是否继续?', '温馨提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        let data = { 
                                            pro_id: parseInt(localStorage.getItem('proId')),
                                            token:localStorage.getItem('userId'),
                                            id:param.row.id,
                                            state:2
                                        }
                                        updateState(data).then((res)=>{
                                            if(res.data.code===200){
                                                that.$message.success("已暂停");
                                                that.getTableData(that.currentPage);
                                            }else{
                                                that.$message.error(res.data.msg+'600A00233');
                                            }
                                        }).catch((err)=>{
                                            that.$message.error('网络错误!'+'600B00234');
                                        }) 
                                    }).catch(() => {
                                        this.$message.info("已取消删除");          
                                    });
                                }
                            }
                        }, '暂停')]

                        let  ansList= [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    localStorage.setItem('hftitle',param.row.title);
                                    that.$router.push({path:'/wf/admin/shop/markting/hform/answerList',name:'answerList',query:{id:param.row.id}});
                                }
                            }
                        }, '作答列表')]

                        let publishText="";
                        if(param.row.state===0){
                            publishText="发布";
                        }else{
                            publishText="开始";
                        }
                        let publish = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    let that=this;
                                    this.$confirm('此操作将发布该表单, 是否继续?', '温馨提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        let data = { 
                                            pro_id: parseInt(localStorage.getItem('proId')),
                                            token:localStorage.getItem('userId'),
                                            id:param.row.id,
                                            state:1
                                        }
                                        updateState(data).then((res)=>{
                                            if(res.data.code===200){
                                                that.$message.success("已发布");
                                                that.getTableData(that.currentPage);
                                            }else{
                                                that.$message.error(res.data.msg+'600A00231');
                                            }
                                        }).catch((err)=>{
                                            that.$message.error('网络错误!'+'600B00232');
                                        }) 
                                    }).catch(() => {
                                        this.$message.info("已取消删除");          
                                    });
                                }
                            }
                        },publishText)]
                        let  edit = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    that.$router.push({path:'/wf/admin/shop/markting/hform/addHForm',name:'addHForm',query:{param:'edit',id:param.row.id,type:param.row.type}});
                                }
                            }
                        }, '编辑')]
                        let  deletes = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            class:"wf-delete",
                            on: {
                                click: () => {
                                    this.$confirm('此操作将删除该表单, 是否继续?', '温馨提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        let data = { 
                                            pro_id: parseInt(localStorage.getItem('proId')),
                                            token:localStorage.getItem('userId'),
                                            id:param.row.id,
                                            state:0
                                        }
                                        updateState(data).then((res)=>{
                                            if(res.data.code===200){
                                                that.$message.success("已删除");
                                                that.getTableData(that.currentPage);
                                            }else{
                                                that.$message.error(res.data.msg+'600A00229');
                                            }
                                        }).catch((err)=>{
                                            that.$message.error('网络错误!'+'600B00230');
                                        }) 
                                    }).catch(() => {
                                        this.$message.info("已取消删除");          
                                    });
                                }
                            }
                        }, '删除')]
                        if(param.row.state===0){
                            return h('div', [publish,edit,deletes]);
                        }else if(param.row.state===1){
                            return h('div', [close,ansList,deletes]);
                        }else if(param.row.state===2){
                            return h('div', [publish,ansList,deletes]);
                        }
                        
                    }
                }
            ],
            activeTime:[],
            pickerOptions: {
                shortcuts: [
                {
                    text: '最近一天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    components: {
        MyTable,
        versionCom,
        modelView
    },
    mounted(){
        this.getTableData(this.currentPage);
    },
    methods: {
        handleDialogVisible(dialogVisible){
            this.openModal=dialogVisible;
        },
        handleCloseVersion(){
            this.showVersion = false;
        },
        search(){
            this.getTableData(this.currentPage)
        },
        getTableData: function(currentPage) {
            let that=this;
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            this.currentPage=currentPage;
            //本地调试采用mock
            // this.$axios.get('/api/mockjs/agentAddGroup').then(res=>{
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                title:this.title,
                page:currentPage
            }
            if(this.activeTime){
                if(this.activeTime.length===2){
                    data.start_time=this.activeTime[0];
                    data.end_time=this.activeTime[1];
                }
            }
            hformlist(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData=res.data.data.data;
                    that.totalPage=res.data.data.total;
                }else{
                    that.$message.error(res.data.msg+'600A00221');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!'+'600B00222');
            })

            // let data={
            //     page:currentPage
            // };
            // this.$axios.post(this.url+'shopapi/coupon/couponIndex',
            // 'token='+localStorage.getItem('userId')+
            // '&secret='+localStorage.getItem('secretId')+
            // '&page='+data.page
            // ).then(res=>{
            //     if(res.data.code===200){
            //         that.tableData = res.data.data.data;
            //         that.currentChange = res.data.data.current_page;
            //         that.totalPage = res.data.data.total
            //     }else{
            //         this.$notify.error({
            //             title: 'error',
            //             message: '系统出错，请联系管理员！',
            //             duration: 2000
            //         });
            //     }
            // }).catch(err=>{
            //     that.$notify.error({
            //         title: 'error',
            //         message: '系统出错，请联系管理员！',
            //         duration: 2000
            //     });
            // });
        },
        addHform:function(){
            let that = this
            getAuditApplicationList(31).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data){
                        that.openModal=true;
                    }else{
                        that.showVersion = true;
                    }
                }else{
                    that.$message.error(res.data.msg+"");
                }
            }).catch((item)=>{
                that.$message.error(res.data.msg+"");
            })
        },
        deleteData(id){ // 刪除表格当前行数据
            this.$confirm('删除活动不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.url+'shopapi/coupon/couponDel',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&id='+id
                ).then(res=>{
                    if(res.data.code===200){
                        this.getTableData()
                        this.$message.success('删除成功');
                    }else{
                        this.$notify.error({
                            title: 'error',
                            message: '系统出错，请联系管理员！',
                            duration: 2000
                        });
                    }
                }).catch(err=>{
                    this.$notify.error({
                        title: 'error',
                        message: '系统出错，请联系管理员！',
                        duration: 2000
                    });
                });
            }).catch(() => {
                this.$message.info('已取消删除');          
            });
        }
    }
}
</script>

<style lang="scss">
.wf-hform{
    background-color: #fff;
    padding: 20px;
    font-size: 16px;
    /deep/ .wf-delete{
        color: #e67e7a;
    }
    .wf-hform-table{
        /deep/ .is-left{
            padding-left: 70px;
            .wf-delete{
                color: rgb(230, 126, 122);
            }
        }
    }
    .wf-hform-activename{
        margin-left: 20px;
    }
    .wf-hform-add{
        margin-bottom: 15px;
    }
    .wf_pagination.el-row{
        margin-top: 40px;
        margin-right: 12.5rem;
        text-align: center;
    }
    .el-pager .number{
        margin: 0 10px;
    }
}
</style>