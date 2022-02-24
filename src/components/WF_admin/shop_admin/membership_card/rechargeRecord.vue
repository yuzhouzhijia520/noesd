<template>
    <div class="wf-rechargeRecord">
        <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" @currentChange="getData"></my-table>
        <el-button class="wf-margin-auto" type="primary" size="mini" @click="back">返回</el-button>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { rechargeRecordList } from "@/server/userList.js"
export default {
    name: "rechargeRecord",
    data() {
        return {
            currentPage: 1, // 当前页
            totalPage: 0, // 总条数
            tableData: [], // 表格数据
            columns: [
                {   label: "时间",
                    align: "center",
                    prop: "create_time"
                },
                {
                    label: "变动值",
                    align: "center",
                    render: (h, param)=>{
                        let a
                        if(param.row.change>=0){
                            a = [
                                h('span', {
                                    attrs: {
                                        style: "color:#719FF8"
                                    },
                                },param.row.change)
                            ];
                        }else{
                            a = [
                                h('span', {
                                    attrs: {
                                        style: "color:#E36F6B"
                                    },
                                },param.row.change)
                            ];
                        }
                        return h('div', a);
                    }
                },
                {
                    label: "变动说明",
                    align: "center",
                    prop: "change_explain"
                },
                { 
                    label: "备注说明",
                    align: "center",
                    prop: "remarks"
                },
                {
                    label: "操作者",
                    align: "center",
                    render: (h, param)=> {
                        let a
                        if(param.row.name!=null&&param.row.phone!=null){
                            a = param.row.name+"，"+param.row.phone
                        }else if(param.row.name!=null){
                            a = param.row.name
                        }else if(param.row.phone!=null){
                            a = param.row.phone
                        }
                        return h('span', a);
                    }
                }
            ]
        }
    },
    mounted() {
        this.getData()
    },
    components: {
        MyTable
    },
    methods: {
        getData(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: this.$route.query.id
            }
            rechargeRecordList(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.totalPage = res.data.data.total
                    that.currentPage = res.data.data.current_page
                }else{
                    that.$message.error(res.data.msg+"600A0067");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0068');
            })
        },
        back(){
            this.$router.push({path:"/wf/admin/shop/userList/memberInformation",query:{id:this.$route.query.id}})
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-rechargeRecord{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    /deep/ .el-pagination{
        text-align: center;
        margin: 20px 0;
    }
    .el-button--primary{
        background: #719FF8;
    }
    .wf-margin-auto{
        margin: 0 auto;
        display: block;
    }
}
</style>