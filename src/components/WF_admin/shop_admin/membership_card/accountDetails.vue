<template>
    <div class="wf-accountDetails">
        <div class="wf-gray-box">
            <span style="margin-right:40px;">手机号：{{phone}}</span>
            <span>昵称：{{nickName}}</span>
        </div>
        <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" @currentChange="getData"></my-table>
        <el-button type="primary" @click="back">返回</el-button>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "accountDetails",
    data() {
        return {
            nickName: this.$route.query.nickName,
            phone: this.$route.query.phone,
            currentPage: 1, // 优惠券当前页
            totalPage: 0, // 优惠券总条数
            tableData: [], // 优惠券表格数据
            columns: [
                {   label: "账目明细说明",
                    align: "center",
                    prop: "remarks"
                },
                {
                    label: "余额变动",
                    align: "center",
                    render: (h, param)=>{
                        let a
                        if(param.row.change<0){
                            a = [h('span', {
                                attrs: {
                                    style: "color:#E36F6B"
                                }
                            }, param.row.change)];
                        }else{
                            a = [h('span', {
                                attrs: {
                                    style: "color:#719FF8"
                                }
                            }, "+" + param.row.change)];
                        }
                        return a
                    }
                },
                { 
                    label: "总余额",
                    align: "center",
                    prop: "balance"
                },
                {
                    label: "变动日期",
                    align: "center",
                    prop: "create_time"
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
                page: currentPage,
                user_id: this.$route.query.id,
                phone: this.$route.query.phone
            }
            this.$axios.post(this.url+'shopapi/member_card/account',data
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
        back(){
            this.$router.push({path:"/wf/admin/shop/userList"})
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-accountDetails{
    background: #fff;
    padding: 20px;
    .el-button{
        width: 80px;
        padding: 8px 20px;
        display: block;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .el-button--primary{
        background: #719FF8;
    }
    .wf-gray-box{
        width: 100%;
        height:60px;
        background: #F8F8F8;
        border-radius:4px;
        line-height: 60px;
        box-sizing: border-box;
        padding: 0 20px;
        margin-bottom: 30px;
    }
    /deep/ .wf_pagination{
        text-align: center;
        margin: 30px 0;
    }
}
</style>