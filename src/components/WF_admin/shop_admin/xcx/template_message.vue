<template>
    <div class="wf-template_message">
        <my-table :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "shop_template_message",
    data() {
        return {
            totalPage:1,
            currentPage:1,
            tableData: [],
            columns: [
                { prop: "title_id", label: "模板编号", align: "center" },
                { prop: "title", label: "标题", align: "center" },
                {
                    prop: "status",
                    label: "状态",
                    width: "120",
                    align: "center",
                    render: function(h, param) {
                        let stateText='';
                        if(param.row.status===0){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#E36F6B;"
                                }
                            }, "关闭")];
                        }else if(param.row.status===1){
                            stateText = [h('span', {
                                attrs: {
                                    style: "color:#719FF8;"
                                }
                            }, "开启")];
                        }
                        return h('div', stateText);
                    }
                },
                {
                    label: "操作",
                    align: "center",
                    render: (h, param) => {
                        let a = ""
                        if(param.row.status===0){
                            a = [
                                h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8"
                                    },
                                    on: {
                                        click: () => {
                                            this.tempalteSwitch(param.row.id,1)
                                        }
                                    }
                                }, '启用')
                            ]
                        }else if(param.row.status===1){
                            a = [
                                h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#E36F6B"
                                    },
                                    on: {
                                        click: () => {
                                            this.tempalteSwitch(param.row.id,0)
                                        }
                                    }
                                }, '关闭')
                            ]
                        }
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
        getTableData(currentPage){
            let that = this
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            this.currentPage = currentPage
            let data = {
                secret: localStorage.getItem('secretId'),
                token: localStorage.getItem('userId'),
                page: currentPage
            }
            this.$axios.post(this.url+'common_api/Templet/getAllSmallTemplet',data
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
        tempalteSwitch(id,e){
            this.$confirm('是否确认修改模板状态', '提示', {
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
                this.$axios.post(this.url+'common_api/Templet/saveTempletStatus',data
                ).then(res=>{
                    if(res.data.code===200){
                        this.getTableData()
                        that.$message.success('操作成功');
                    }else{
                        that.$message.error(res.data.msg);
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

<style lang="scss">
.wf-template_message{
    background: #fff;
    padding: 20px;
    .el-pagination{
        margin-top: 20px;
        text-align: center;
    }
}
</style>