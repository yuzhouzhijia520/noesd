<template>
    <div class="wf-group">
        <el-button type="primary" @click="addGroup" size="mini" class="wf-coupon-add">新增团购</el-button>
        <my-table :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: 'group',
    data() {
        return {
            tableData: [],
            totalPage:1,
            currentPage:1,
            dialogVisible: false,
            columns: [
                {   label: "图片",
                    align: "center",
                    width: "120",
                    render: function(h, param) {
                        let img='';
                        img = [h('img', {
                            attrs: {
                                src: param.row.master_graph,
                                preview: param.row.id,
                                style: 'width:44px;height:44px;'
                            }
                        })];
                        return h('div', img);
                    }
                },
                {   prop: "good_name", 
                    label: "名称",
                    align: "center"
                },
                { 
                    label: "活动时间",
                    align: "center",
                    render:function(h,param){
                        let time=  param.row.start_time.replace(/-/g,"/") + " 至 " + param.row.end_time.replace(/-/g,"/");
                        return [h('span', time)];
                    }
                },
                {   prop: "member_number",
                    label: "参团人数",
                    width: "120",
                    align: "center"
                },
                {
                    prop: "state",
                    label: "状态",
                    width: "120",
                    align: "center",
                    render: function(h, param) {
                        let stateText='';
                        debugger
                        if(param.row.state==='进行中'){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: "success"
                                }
                            }, param.row.state)];
                        }else if(param.row.state==='未开始'){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: ""
                                }
                            }, param.row.state)];
                        }else if(param.row.state==='已结束'){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: "info"
                                }
                            }, param.row.state)];
                        }
                        return h('div', stateText);
                    }
                },
                { prop: "orderby", label: "排序",width: "120",align: "center" },
                { prop: "create_time", label: "创建时间",align: "center" },
                {
                    prop: "",
                    label: "操作",
                    align: "center",
                    render: (h, param) => {
                        let a = [
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "primary"
                                },
                                on: {
                                    click: () => { // 点击新建时传参param的值为edite
                                        this.$router.push({path:'/wf/admin/shop/markting/group/addGroup',name:'addGroup',query:{param:'edite',group_id:param.row.id,state:param.row.state}})
                                    }
                                }
                            }, '编辑'),
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "danger"
                                },
                                on: {
                                    click: () => {
                                        this.deleteData(param.row.id)
                                    }
                                }
                            }, '删除')];
                        return h('div', a);
                    }
                }
            ]
        }
    },
    components: {
        MyTable
    },
    mounted(){
        this.getTableData(this.currentPage);
    },
    methods: {
        getTableData: function(currentPage) {
            let that=this;
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            that.currentPage=currentPage;
            //本地调试采用mock
            // this.$axios.get('/api/mockjs/agentAddGroup').then(res=>{
            let data={
                page:currentPage
            };
            this.$axios.post(this.url+'shopapi/Group_good/showList',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')+
            '&page='+data.page
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data;
                    that.currentChange = res.data.data.current_page;
                    that.totalPage = res.data.data.total
                }else{
                    this.$notify.error({
                        title: 'error',
                        message: '系统出错，请联系管理员！',
                        duration: 2000
                    });
                }
            }).catch(err=>{
                that.$notify.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                    duration: 2000
                });
            });
        },
        addGroup:function(){ // 点击新建时传参param的值为add
            this.$router.push({path:'/wf/admin/shop/markting/group/addGroup',name:'addGroup',query:{param:'add'}})
        },
        deleteData(id){ // 删除表格当前行数据
            let that = this
            this.$confirm('删除活动不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.url+'shopapi/group_good/delGroup',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&id='+id
                ).then(res=>{
                    if(res.data.code===1){
                        that.getTableData()
                        that.$message.success('删除成功');
                    }else{
                        that.$notify.error({
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
.wf-group{
    background-color: #fff;
    padding: 20px;
    font-size: 16px;
    .wf-coupon-add{
        margin-bottom: 15px;
    }
    .wf_pagination.el-row{
        margin-top: 40px;
        text-align: center;
    }
    .el-pager .number{
        margin: 0 10px;
    }
}
</style>