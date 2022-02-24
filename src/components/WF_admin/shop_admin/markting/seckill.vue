<template>
    <!-- class="wf-markting-seckill" -->
    <div class="wf-markting-seckill" id="seckillList">
        <el-button type="primary" size="mini" @click="addSeckill">新增秒杀</el-button>
        <my-table :tableData="tableDataApp" :columns="columnsApp" :totalPage="totalPageApp"  :currentPage="currentPage" @currentChange="getMarktingSeckill"></my-table>
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
                    prop: "master_graph", 
                    label: "商品",
                    width: "80",
                    align: "center",
                    render:(h, param) => {
                        return [h('img', {
                            // props:{
                                
                            // },
                            attrs: {
                                preview:param.row.id,
                                src: param.row.master_graph
                            }
                        })];
                    }
                },
                { 
                    prop: "good_name", 
                    label: "名称",
                    align: "center"
                },
                {
                    prop: "state", 
                    label: "状态",
                    align: "center"
                },
                {
                    prop: "orderby", 
                    label: "排序",
                    width: "80",
                    align: "center"
                },
                {
                    label: "活动时间",
                    align: "center",
                    width: "340",
                    render:(h, param) => {
                        return [h('div', {}, param.row.start_time+" 至 "+param.row.end_time)];
                    }
                },
                {
                    prop: "create_time", 
                    label: "创建时间",
                    align: "center"
                },
                {
                    label: "操作",
                    width: "200",
                    align: "center",
                    render:(h, param) => {
                        return [h('el-button', {
                            props: {
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(131, 171, 249);font-size:14px"
                            },
                            on:{
                                click:()=>{
                                    // if(param.row.state=='有效'){
                                    //     this.$message.error("秒杀已经开始无法编辑");
                                    // }else{
                                        this.$router.push({path:'/wf/admin/shop/markting/seckill/seckillEdit',query:{param:'edit',good_id:param.row.id}});
                                    // }
                                    
                                }
                            }
                            
                        }, '编辑'),h('el-button', {

                            props: {
                                type: "text"
                            },
                            attrs:{
                                style:"color:rgb(230, 126, 122);font-size:14px"
                            },
                            on:{
                                click:()=>{
                                    if(param.row.state==='终止'){
                                        this.$message({
                                                type: 'info',
                                                message: '此条记录已经终止，不可再次终止'
                                            });
                                    }else{
                                         this.$confirm('此操作将永久终止该条记录, 是否继续?', '温馨提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            this.deleteSeckill(param.row.id,param.row.state);
                                        }).catch(() => {
                                            this.$message({
                                                type: 'info',
                                                message: '已取消终止'
                                            });          
                                        });
                                    }
                                    
                                }
                            }
                        }, '终止'),h('el-button', {
                            props: {
                                type: "text"
                            },
                            attrs:{
                                style:"color:rgb(230, 126, 122);font-size:14px"
                            },
                            on:{
                                click:()=>{
                                    this.$confirm('此操作将永久删除该条记录, 是否继续?', '温馨提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        this.deleteKill(param.row.id,param.row.state);
                                    }).catch(() => {
                                        this.$message.info("已取消删除");          
                                    });
                                }
                            }
                        }, '删除')];
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
        this.getMarktingSeckill(this.currentPage);
       
    },
    methods: {
        initPage(){
            if(!localStorage.userId){
                //设置跳转服务商页面
                localStorage.setItem('activeName','first');
                this.$router.push({path:'/wf/index/login',name:'index'})
            }
        },
        getMarktingSeckill(currentPage){
            let that=this;  
            let data={
                page:currentPage,
                secret:localStorage.getItem('secretId')
            }          
            this.$axios.post(this.url+'shopapi/kill_good/showList',data).then(res=>{
                if(res.data){
                    if(res.data.code===200){
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
        addSeckill:function(){
            this.$router.push({path:'/wf/admin/shop/markting/seckill/addSeckill',name:'addSeckill'});
        },
        deleteSeckill:function(id,state){
            let that=this;  
            let data={
                id:id,
                state:state
            }          
            this.$axios.post(this.url+'shopapi/kill_good/delKill',data).then(res=>{
                if(res.data){
                    if(res.data.code===200){
                        that.$message.success(res.data.msg);
                        that.getMarktingSeckill(1);
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
        deleteKill(id,state){
            let that=this;  
            let data={
                id:id,
                state:state
            }          
            this.$axios.post(this.url+'shopapi/kill_good/del',data).then(res=>{
                if(res.data){
                    if(res.data.code===200){
                        that.$message.success(res.data.msg);
                        that.getMarktingSeckill(1);
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
.wf-markting-seckill{
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
}
</style>