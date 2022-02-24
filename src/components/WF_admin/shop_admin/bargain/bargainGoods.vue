<template>
    <div class="wf-bargainGoods">
        <el-button size="mini" @click="addBargain">新增砍价</el-button>
        <my-table class="my-table" :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "bargainGoods",
    data() {
        return {
            totalPage:0,
            currentPage:1,
            tableData: [],
            columns: [
                {
                    label: "编号",
                    prop: "id",
                    width: "60"
                },
                {   label: "砍价商品",
                    align: "center",
                    render: function(h, param) {
                        let img = [
                                h('img', {
                                    attrs: {
                                        src: param.row.master_graph,
                                        preview: param.row.id,
                                        style: 'width:44px;height:44px;'
                                    }
                                })
                            ];
                        return h('div', img);
                    }
                },
                {   
                    label: "名称",
                    align: "center",
                    prop: "name"
                },
                {   
                    label: "结束时间",
                    align: "center",
                    prop: "end_time",
                    width: "200"
                },
                {
                    label: "状态",
                    align: "center",
                    prop: "is_show"
                },
                {   
                    label: "排序",
                    align: "center",
                    prop: "order_by"
                },
                {   
                    label: "创建时间",
                    align: "center",
                    prop: "create_time",
                    width: "200"
                },
                {
                    label: "操作",
                    align: "left",
                    width: "300",
                    render: (h, param) => {
                        let a = [h('el-button', {
                            props: {
                                type: "text"
                            },
                            attrs: {
                                style: "color:#719FF8;margin-right:20px;margin-left:70px;"
                            },
                            on: {
                                click: () => {
                                    this.$router.push({path: '/wf/admin/shop/markting/bargainMenu/addBargain',query:{id: param.row.id}})
                                }
                            }
                        }, '编辑'),
                        h('el-button', {
                            props: {
                                type: "text"
                            },
                            attrs: {
                                style: "color:#E36F6B;margin-right:20px;"
                            },
                            on: {
                                click: () => {
                                    this.$confirm('是否确定删除此活动?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        this.delete(param.row.id)
                                    }).catch(() => {
                                        this.$message.info("已取消删除");
                                    });
                                }
                            }
                        }, '删除')]
                        let b
                        if(param.row.is_show==="进行中"||param.row.is_show==="未开始"||param.row.is_show==="无效"){
                            b = h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#E36F6B"
                                },
                                on: {
                                    click: () => {
                                        this.$confirm('是否确定终止此活动?', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            this.stop(param.row.id)
                                        }).catch(() => {
                                            this.$message.info("已取消删除");
                                        });
                                    }
                                }
                            }, '终止')
                        }else{
                            b = ""
                        }
                        a.push(b)
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
            let that = this
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            this.currentPage = currentPage
            let data = {
                secret: localStorage.getItem('secretId'),
                page: currentPage
            }
            this.$axios.post(this.url+'shopapi/bargain_good/index',data
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
        delete(id){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id
            }
            this.$axios.post(this.url+'shopapi/bargain_good/destroy',data
            ).then(res=>{
                if(res.data.code===200){
                    this.getTableData()
                    this.$message.success('删除成功!');
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        stop(id){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id
            }
            this.$axios.post(this.url+'shopapi/bargain_good/stop',data
            ).then(res=>{
                if(res.data.code===200){
                    this.getTableData()
                    this.$message.success('终止成功!');
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        addBargain(){
            this.$router.push({path: '/wf/admin/shop/markting/bargainMenu/addBargain'})
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-bargainGoods{
    margin-top: 20px;
    padding: 21px 21px 0 21px;
    background: #fff;
    color: #666;
    border-radius: 4px;
    .el-button{
        margin-bottom: 10px;
        background:#719FF8;
        color: #fff;
        border: none;
        &:hover{
            background: #95b6f6;
        }
    }
    .my-table{
        /deep/ .el-table{
            thead{
                color: #333;
                font-size: 16px;
                tr{
                    th{
                        padding-bottom: 30px;
                        font-weight:400;
                    }
                    th:first-of-type{
                        text-align: left!important;
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
        /deep/ .el-pagination{
            text-align: center;
            margin: 40px 0;
        }
    }
}
</style>
