<template>
    <div class="wf-changeLevelRecord">
        <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" @currentChange="getData"></my-table>
        <el-button class="wf-margin-auto" type="primary" size="mini" @click="back">返回</el-button>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "changeLevelRecord",
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
                    label: "改前等级 / 累计积分",
                    align: "center",
                    render: (h, param)=>{
                        let a = param.row.last_rank_name+"/"+param.row.last_points
                        return [h('span', a)];
                    }
                },
                {
                    label: "改后等级/ 累计积分",
                    align: "center",
                    render: (h, param)=>{
                        let a = param.row.rank_name+"/"+param.row.points
                        return [h('span', a)];
                    }
                },
                { 
                    label: "类型",
                    align: "center",
                    render: (h, param)=>{
                        if(param.row.state===0){
                            return [h('span', "降级")];
                        }else{
                            return [h('span', "升级")];
                        }
                    }
                },
                {
                    label: "原因",
                    align: "center",
                    prop: "reason"
                },
                {
                    label: "操作者",
                    align: "center",
                    render: (h, param)=>{
                        let a = param.row.name+"，"+param.row.phone
                        return [h('span', a)];
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
            this.$axios.post(this.url+'shopapi/member_card/rankRecord',data
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.totalPage = res.data.data.total
                    that.currentPage = res.data.data.current_page
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        back(){
            this.$router.push({path:"/wf/admin/shop/userList/memberInformation",query:{id:this.$route.query.id}})
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-changeLevelRecord{
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