<template>
    <!-- class="wf-markting-seckill" -->
    <div class="wf-question-list">
        <el-button type="primary" size="mini" @click="addQuestion">新增问卷调查</el-button>
        <my-table :tableData="tableDataApp" :columns="columnsApp" :totalPage="totalPageApp"  :currentPage="currentPage" @currentChange="getQuestionList"></my-table>
    </div>
</template>

<script>
//本地测试使用
// import  "@/mockjs/index.js";
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: 'seckill',
    data() {
        return {
            tableDataApp:[],
            totalPageApp:0,
            currentPage:1,
            columnsApp: [
                { 
                    prop: "id", 
                    label: "序号",
                    width: "50",
                    align: "center",
                },
                { 
                    prop: "question_title", 
                    label: "表单名称",
                    align: "center"
                },
                { 
                    prop: "count", 
                    label: "数据",
                    width: "100",
                    align: "center"
                },
                {
                    prop: "status", 
                    label: "状态",
                    width: "100",
                    align: "center",
                    render:(h, param) => {
                        if(param.row.state===1){
                            return [h('div', {
                               class: "wf-publish"
                            }, param.row.status)];
                        }else{
                            return [h('div', {}, param.row.status)];
                        }
                    }
                },
                {
                    label: "操作",
                    align: "left",
                    width: "450",
                    render:(h, param) => {
                        let editg=h('el-button', {
                            class:'gray',
                            attrs:{
                                style:"font-size:14px;padding-left: 50px;"
                            },
                            props: {
                                size: "mini",
                                type: "text",
                            },
                        }, '编辑');
                        let edit=h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(131, 171, 249);font-size:14px;padding-left: 50px;"
                            },
                            on:{
                                click:()=>{
                                    this.$router.push({path:'/wf/admin/shop/markting/question/addQuestion',query:{param:'edit',id:param.row.id,state:param.row.state}});   
                                }
                            }
                            
                        }, '编辑');
                        let publishg=h('el-button', {
                            class:'gray',
                            props: {
                                size: "mini",
                                type: "text",
                            },
                        }, '发布');
                        let publish=h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(131, 171, 249);font-size:14px"
                            },
                            on:{
                                click:()=>{
                                    this.$confirm('你要发布'+param.row.question_title+'吗?', '温馨提示', {
                                        confirmButtonText: '发布',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        this.questionRelease(param.row.id);
                                    }).catch(() => {
                                        this.$message({
                                            type: 'info',
                                            message: '已取消发布'
                                        });          
                                    });
                                }
                            }
                        }, '发布');
                        let uesr=h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(131, 171, 249);font-size:14px"
                            },
                            on:{
                                click:()=>{
                                     this.$router.push({path:'/wf/admin/shop/markting/question/resultList',query:{id:param.row.id}});   
                                }
                            }
                            
                        }, '用户作答结果');
                        let deleteBtn=h('el-button', {

                            props: {
                                size: "mini",
                                type: "text",
                            
                            },
                            attrs:{
                                style:"color:rgb(230, 126, 122);font-size:14px"
                            },
                            on:{
                                click:()=>{
                                        this.$confirm('你要删除'+param.row.question_title+'吗?', '温馨提示', {
                                            confirmButtonText: '删除',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            this.deleteQuestion(param.row.id,0);
                                        }).catch(() => {
                                            this.$message({
                                                type: 'info',
                                                message: '已取消删除'
                                            });          
                                        });
                                    
                                }
                            }
                        }, '删除');
                        if(param.row.state===1){
                             return [editg,publishg,uesr,deleteBtn];
                        }else{
                            return [edit,publish,uesr,deleteBtn];
                        }
                        
                    }
                }
            ]
        }
    },
    components: {
        MyTable
    },
    created(){

    },
    mounted(){
        //初始化页面判断是否已登录
        this.initPage();
        //获取小程序列表信息
        this.getQuestionList(this.currentPage);
       
    },
    methods: {
        initPage(){
            if(!localStorage.userId){
                //设置跳转服务商页面
                localStorage.setItem('activeName','first');
                this.$router.push({path:'/wf/index/login',name:'index'})
            }
        },
        getQuestionList(currentPage){
            let that=this;  
            let data={
                page:currentPage,
                secret:localStorage.getItem('secretId')
            }          
            this.$axios.post(this.url+'shopapi/Question/index',data).then(res=>{
                if(res.data){
                    if(res.data.code==200){
                        that.tableDataApp=res.data.data.data;
                        that.currentPage=res.data.data.current_page;
                        that.totalPageApp=res.data.data.total;
                    }else{
                        that.$message.error('网络错误！');
                    }
                }else{
                    that.tableDataApp=null;
                }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        addQuestion:function(){
            this.$router.push({path:'/wf/admin/shop/markting/question/addQuestion',name:'addQuestion'});
        },
        questionRelease(id){
            let that=this;  
            let data={
                id:id,
                secret:localStorage.getItem('secretId')
            }          
            this.$axios.post(this.url+'shopapi/Question/questionRelease',data).then(res=>{
                if(res.data){
                    if(res.data.code==200){
                        that.$message.success(res.data.msg);
                        this.getQuestionList(1);
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }else{
                    that.tableDataApp=null;
                }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        deleteQuestion:function(id,type){
            let that=this;  
            let data={
                id:id,
                type:type,
                secret:localStorage.getItem('secretId')
            }          
            this.$axios.post(this.url+'shopapi/Question/questionDel',data).then(res=>{
                if(res.data){
                    if(res.data.code==200){
                        that.$message.success(res.data.msg);
                        this.getQuestionList(1);
                    }else{
                        that.$message.error('网络错误！');
                    }
                }else{
                    that.tableDataApp=null;
                }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-question-list{
    background-color: #fff;
    padding: 20px 10px;
    /deep/ .gray{
        color: #ccc;
        cursor: auto;
    }
    .el-button{
        margin-left: 10px;
    }
    /deep/ .cell{
        img{
            max-width: 40px;
            max-height: 40px;
        }
    }
    /deep/ .wf-publish{
        color: rgb(131, 171, 249);
    }
}
</style>