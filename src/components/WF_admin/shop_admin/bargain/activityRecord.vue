<template>
    <div class="wf-activityRecord">
        <el-button size="mini" @click="addBargain">新增砍价</el-button>
        <my-table class="my-table" :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "activityRecord",
    data() {
        return {
            totalPage:0,
            currentPage:1,
            tableData: [],
            columns: [
                {
                    label: "发起者",
                    prop: "phone"
                },
                {   label: "活动商品",
                    align: "center",
                    width: "200",
                    render: function(h, param) {
                        let img = [
                                h('img', {
                                    attrs: {
                                        src: param.row.master_graph,
                                        style: 'width:44px;height:44px;'
                                    }
                                })
                            ];
                        return h('div', img);
                    }
                },
                {
                    label: "状态",
                    align: "center",
                    render: function(h, param) {
                        let state;
                        if(param.row.state==="进行中"){
                            state = [h('span', {
                                attrs: {
                                    style: "color:#719FF8;"
                                }
                            }, "进行中")];
                        }else if(param.row.state==="已完成"){
                            state = [h('span', {
                                attrs: {
                                    style: "color:#666;"
                                }
                            }, "已完成")];
                        }
                        return h('div', state);
                    }
                },
                {   
                    label: "当前价格",
                    align: "center",
                    render: function(h, param) {
                        let a = "￥" + param.row.price
                        return h('div', {
                            attrs: {
                                style: "color:#E36F6B;"
                            }
                        }, a);
                    }
                },
                {   
                    label: "底价",
                    align: "center",
                    render: function(h, param) {
                        let a = "￥" + param.row.floor_price
                        return h('div', {
                            attrs: {
                                style: "color:#E36F6B;"
                            }
                        }, a);
                    }
                },
                {   
                    label: "已砍人数",
                    align: "center",
                    prop: "cut_number"
                },
                {   
                    label: "创建时间",
                    align: "center",
                    width: "240",
                    prop: "create_time"
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
            this.$axios.post(this.url+'shopapi/bargain_list/index',data
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
        addBargain(){
            this.$router.push({path: '/wf/admin/shop/markting/bargainMenu/addBargain',query:{param: 0}})
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-activityRecord{
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
