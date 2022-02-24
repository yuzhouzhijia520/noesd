<template>
    <div class="wf-shopAddress">
        <el-button type="primary" size="mini" @click="addShopAddress">新增地址</el-button>
        <my-table :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getList"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { shopAddressGetData, shopAddressDelete } from "@/server/shopAddress.js"
export default {
    name: "shopAddress",
    data() {
        return {
            totalPage: 0,
            currentPage: 1,
            tableData: [],
            columns: [
                { 
                    prop: "contacts", 
                    label: "联系人",
                    align: "center",
                    width: "200"
                },
                { 
                    prop: "phone", 
                    label: "联系方式",
                    align: "center",
                    width: "180"
                },
                { 
                    prop: "code", 
                    label: "地址",
                    align: "left",
                    render: (h, param)=> {
                        return h('div',{
                            attrs: {
                                style: "margin:0 auto;width:80%;"
                            }
                        },param.row.code.split(",").join("")+param.row.address)
                    }
                },
                { 
                    label: "地址类型",
                    align: "left",
                    width: "240",
                    render: (h, param)=> {
                        let a
                        if(param.row.state===0){
                            a = h('span',{
                                attrs: {
                                    style: "padding-left:50px;"
                                }
                            },param.row.status===1?"退货地址":param.row.status===2?"发货地址":"退货/发货地址")
                        }else{
                            a = [h('span',{
                                attrs: {
                                    style: "padding-left:50px;"
                                }
                            },param.row.status===1?"退货地址":param.row.status===2?"发货地址":"退货/发货地址"),
                            h('span',{
                                attrs:{
                                    style:"margin-left:10px;color:#719FF8"
                                }
                            },"默认")]
                        }
                        return a;
                    }
                },
                {
                    label: "操作",
                    align: "center",
                    width: "180",
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
                                        this.$router.push({path: "/wf/admin/shop/shopAddress/editShopAddress",query:{type:2,id:param.row.id}})
                                    }
                                }
                            }, "编辑"),
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    disabled: param.row.state===1?true:false,
                                    style: "color:#E36F6B;"
                                },
                                on: {
                                    click: () => {
                                        this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
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
    mounted(){
        this.getList(this.currentPage)
    },
    methods: {
        delete(id){
            let that = this
            let data = {
                pro_id: localStorage.getItem("proId"),
                id: id,
                token: localStorage.getItem("userId")
            }
            shopAddressDelete(data).then((res)=>{
                if(res.data.code===200){
                    that.getList()
                    that.$message.success("删除成功")
                }else{
                    that.$message.error(res.data.msg+"600A0041");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0042');
            })
        },
        getList(currentPage){
            this.currentPage = currentPage
            let that = this
            let data = {
                pro_id: localStorage.getItem('proId'),
                page: this.currentPage
            }
            shopAddressGetData(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg+"600A0032");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0033');
            })
        },
        addShopAddress(){
            this.$router.push({path: "/wf/admin/shop/shopAddress/editShopAddress",query:{type:1}})
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-shopAddress{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    /deep/ .el-pagination{
        margin-top: 20px;
        text-align: center;
    }
    .el-button--primary{
        background: #719FF8;
    }
    /deep/ .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
        color: #c0c4cc!important;
    }
}
</style>
