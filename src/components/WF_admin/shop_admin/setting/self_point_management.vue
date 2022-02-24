<template>
    <div class="wf-self_point_management">
        <div class="clear">
            <el-button type="primary" size="mini" @click="addJump(-1)">新增自提点</el-button>
        </div>
        <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" @currentChange="getData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "self_point_management",
    data() {
        return {
            currentPage: 1,
            totalPage: 0,
            tableData: [],
            columns: [
                {   label: "自提点名称",
                    align: "center",
                    prop: "name"
                },
                {   label: "自提地址",
                    align: "center",
                    render: (h, param)=> {
                        let a = param.row.province+param.row.city+param.row.area+param.row.address
                        return h('span', a);
                    }
                },
                {
                    label: "联系电话",
                    align: "center",
                    prop: "phone"
                },
                {
                    label: "操作",
                    align: "center",
                    render: (h, param)=> {
                        let a = [h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8;margin-right:10px;"
                                },
                                on: {
                                    click: () => {
                                        this.addJump(param.row.id)
                                    }
                                }
                            }, "编辑"),
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#E36F6B;"
                                },
                                on: {
                                    click: () => {
                                        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            this.deletePlace(param.row.id)
                                        }).catch(() => {
                                            this.$message.info("已取消删除");          
                                        });
                                    }
                                }
                            }, "删除")]
                        return h('div', a);
                    }
                }
            ]
        }
    },
    components: {
        MyTable
    },
    mounted() {
        this.getData(this.currentPage)
    },
    methods: {
        getData(currentPage){
            this.currentPage = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: this.currentPage
            }
            this.$axios.post(this.url+'shopapi/address/index',data
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data;
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        addJump(id){
            this.$router.push({path:"/wf/admin/shop/self_point_management/add_self_point",query:{id:id}})
        },
        deletePlace(id){
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                id: id
            }
            this.$axios.post(this.url+'shopapi/address/destroy',data
            ).then(res=>{
                if(res.data.code===200){
                    that.getData(that.currentPage)
                    that.$message.success("删除成功")
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-self_point_management{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    .el-button--primary{
        background: #719FF8;
    }
    /deep/ .wf_pagination{
        text-align: center;
        margin-top: 20px;
    }
    /deep/ .el-table{
        thead{
            color: #333;
            font-size: 16px;
            tr{
                th{
                    padding-bottom: 30px;
                    font-weight:400;
                }
            }
        }
        tbody{
            tr{
                td{
                    padding: 6px 0;
                }
            }
        }
    }
}
</style>
