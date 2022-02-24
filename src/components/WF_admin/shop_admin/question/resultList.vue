<template>
    <!-- class="wf-markting-seckill" -->
    <div class="wf-question-resultList" >
        <my-table :tableData="tableDataApp" :columns="columnsApp" :totalPage="totalPageApp"  :currentPage="currentPage" @currentChange="getResultList"></my-table>
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
                    prop: "nickName", 
                    label: "呢称",
                    align: "center"
                },
                { 
                    prop: "phone", 
                    label: "手机号",
                    align: "center"
                },
                { 
                    prop: "user_score", 
                    label: "分值",
                    align: "center"
                },
                { 
                    prop: "user_conclusion", 
                    label: "结论",
                    align: "center"
                },
                {
                    prop: "create_time", 
                    label: "提交日期",
                    align: "center"
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
        this.getResultList(this.currentPage);
       
    },
    methods: {
        initPage(){
            if(!localStorage.userId){
                //设置跳转服务商页面
                localStorage.setItem('activeName','first');
                this.$router.push({path:'/wf/index/login',name:'index'})
            }
        },
        getResultList(currentPage){
            let that=this;  
            let data={
                page:currentPage,
                secret:localStorage.getItem('secretId'),
                id:this.$route.query.id
            }          
            this.$axios.post(this.url+'shopapi/Question/questionUser',data).then(res=>{
                if(res.data){
                    if(res.data.code===200){
                        that.tableDataApp=res.data.data.data;
                        that.currentPage=res.data.data.current_page;
                        that.totalPageApp=res.data.data.total;
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
                        that.$message.error('网络错误！');
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
                        this.getResultList(1);
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