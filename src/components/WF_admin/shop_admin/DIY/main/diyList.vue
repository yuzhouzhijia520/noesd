<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-diyList">
         <el-button type="primary" size="mini" @click="addSeckill">新增模板</el-button>
         <!-- <el-button type="primary" size="mini"  style="float:right;"  @click="selectSeckill">搜索</el-button>
         <el-input v-model="selectvalue" placeholder="页面名称" size="mini" style="float:right;"></el-input> -->
         <my-table :tableData="tableDataApp" :columns="columnsApp" :totalPage="totalPageApp"  :currentPage="currentPage" @currentChange="getMarktingSeckill"></my-table>
         <selectl  v-if="openModal === true" v-on:dialogVisible="handleDialogVisible"></selectl>
    </div>
    
</template>

 <script>
import   "@/mockjs/index.js";
import MyTable from "@/commonComponents/table/table.vue";
import selectl from "../components/select/select.vue";


export default {
    name: 'seckill',
    data() {
        return {
            otheruuid:require('uuid/v1')(),
            tableDataApp:[],
            totalPageApp:0,
            currentPage:1,
            openModal:false,
            swich:false,
            selectvalue:'',//搜索的内容
            columnsApp: [
                {
                    prop: "id", 
                    label: "页面ID",
                    width: "150",
                    align: "center"
                },
                { 
                    prop: "page_name", 
                    label: "页面名称",
                    width: "150",
                    align: "center",
                },
                { 
                    prop: "good_num", 
                    label: "商品数",
                    align: "center"
                },
                { 
                    prop: "create_time", 
                    label: "创建时间",
                    align: "center"
                },
                {
                    prop: "update_time", 
                    label: "最后编辑时间",
                    align: "center"
                },
                {
                    label: "设置主页",
                    width: "150",
                    align: "center",
                    render:(h, param) => {
                        let swich = false
                        if(param.row.homepage === 1){
                            swich = true
                        }else{
                            swich = false
                        }
                        return h('div',[h('el-switch', {
                            props: {
                                 value:swich
                            },
                            attrs:{
                               //{param.row.homepage === 1?true:false}
                            },
                            on:{
                                change:()=>{
                                     this.setPageSeckill(param.row);
                                }
                            }
                        })]);
                    }
                },
                {
                    prop: "agentMoney", 
                    label: "操作",
                    align: "left",
                    render:(h, param) => {
                        return [h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(131, 171, 249);font-size:14px;padding: 0;margin-left: 80px;"
                            },
                            on:{
                                click:()=>{
                                     this.$router.push({path:'/wf/admin/shop/diy/addDiy',name:'addDiy',query:{param:'edit',id:param.row.id,otheruuid:this.otheruuid}})
                                }
                            }
                        }, '编辑'),h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            
                            },
                            attrs:{
                                style:"color:rgb(131, 171, 249);font-size:14px;padding: 0;"
                            },
                            on:{
                                click:()=>{
                                    this.codeSeckill(param.row.id);
                                }
                            }
                        }, '复制'),h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            
                            },
                            attrs:{
                                style:"color:rgb(230, 126, 122);font-size:14px;padding: 0;"
                            },
                            on:{
                                click:()=>{
                                    this.$confirm('此操作将永久删除该条记录, 是否继续?', '温馨提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            this.deleteSeckill(param.row.id);
                                        }).catch(() => {
                                            this.$message({
                                                type: 'info',
                                                message: '已取消删除'
                                            });          
                                        });
                                }
                            }
                        }, param.row.homepage === 1?'':'删除')];
                    }
                }
            ]
        }
    },
    components: {
        MyTable,
        selectl
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
        handleDialogVisible(dialogVisible){
            this.openModal=dialogVisible;
        },
        initPage(){
            if(!localStorage.userId){
                //设置跳转服务商页面
                localStorage.setItem('activeName','first');
                this.$router.push({path:'/wf/index/login',name:'index'})
            }
        },
        getMarktingSeckill(currentPage){
            let that=this;  
            // let data={
            //     page:currentPage,
            //     secret:localStorage.getItem('secretId')
            // }          
            // this.$axios.post(this.url+'shopapi/kill_good/showList',data).then(res=>{
            //     if(res.data){
            //         if(res.data.code===200){
            //             that.tableDataApp=res.data.data.data;
            //             that.currentPage=res.data.data.current_page;
            //             that.totalPageApp=res.data.data.total;
            //         }else{
            //             that.$message.error('网络错误！');
            //         }
            //     }else{
            //         that.tableDataApp=null;
            //     }
            // }).catch(err=>{
            //     that.$message.error('网络错误！');
            // });
            this.currentPage=currentPage;
            //请求列表数据    
            let data={
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                page:this.currentPage,
                num:10
            }
            this.$axios.post(this.url +'shopapi/decoration/list',data).then(res=>{
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
            this.openModal = true
        },
        selectSeckill(){//搜索 按钮
            let that = this
            let data={
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                page:this.currentPage,
                page_name:this.selectvalue,
                num:10
            }
            this.$axios.post(this.url +'shopapi/decoration/list',data).then(res=>{
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
        deleteSeckill:function(id){
            let that=this;  
            let data={
                id:id,
                 token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId')
            }          
            this.$axios.post(this.url+'shopapi/decoration/del',data).then(res=>{
                if(res.data){
                    if(res.data.code===200){
                        that.$message.success("删除成功!");
                        that.getMarktingSeckill(1);
                    }else{
                        that.$message.error('网络错误!');
                    }
                }else{
                    that.tableDataApp=null;
                }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        setPageSeckill(id){//设为主页
            console.log(id)
            let that=this;  
            if(id.homepage === 1){
                    that.$message.success('已设置!');
            }else{
                let data={
                    id:id.id,
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId')
                }          
                this.$axios.post(this.url+'shopapi/decoration/saveStatus',data).then(res=>{
                    console.log(res)
                    if(res.data){
                        if(res.data.code===200){
                            that.$message.success('设置成功!');
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
            
        },
        codeSeckill(id){//复制按钮
            let that=this;  
            let data={
                id:id,
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId')
            }          
            this.$axios.post(this.url+'shopapi/decoration/copy',data).then(res=>{
                if(res.data){
                    if(res.data.code===200){
                        that.$message(
                            {
                            message: '复制成功',
                            type: 'success'
                            }
                        );
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
    .el-input{
        width: 200px;
    }
</style>
