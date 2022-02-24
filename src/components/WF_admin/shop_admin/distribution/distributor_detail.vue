<template>
    <div class="wf-distributor_detail">
        <div class="wf-distributor_detail-box">
            <el-row class="wf-line-heigh">
                <el-col :span="3" class="wf-black">上级</el-col>
                <el-col :span="12">{{details.last_nickName}}</el-col>
            </el-row>
            <el-row class="wf-line-heigh">
                <el-col :span="3" class="wf-black">用户</el-col>
                <el-col :span="12">{{details.nickName}}</el-col>
            </el-row>
            <el-row class="wf-line-heigh">
                <el-col :span="3" class="wf-black">申请时间</el-col>
                <el-col :span="12">{{details.application_time}}</el-col>
            </el-row>
            <el-row class="wf-line-heigh">
                <el-col :span="3" class="wf-black">已提现佣金</el-col>
                <el-col :span="12" class="wf-red">￥{{details.accumulated_commission}}</el-col>
            </el-row>
            <el-row class="wf-line-heigh">
                <el-col :span="3" class="wf-black">冻结佣金</el-col>
                <el-col :span="12" class="wf-red">￥{{details.wait_commission}}</el-col>
            </el-row>
            <el-row class="wf-line-heigh">
                <el-col :span="3" class="wf-black">可提现佣金</el-col>
                <el-col :span="12" class="wf-red">￥{{details.put_commission}}</el-col>
            </el-row>
            <el-row class="wf-line-heigh">
                <el-col :span="3" class="wf-black" style="line-height:40px;">状态</el-col>
                <el-col :span="12">
                    <el-select style="width:140px;" v-model="value" placeholder="请选择" @change="changeState">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="wf-line-heigh">
                <el-col class="wf-black">下级</el-col>
                <el-col>
                    <my-table :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
                </el-col>
            </el-row>
            <el-row class="wf-btn-box">
                <el-button class="wf-btn" size="mini" @click="save">确认</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "shop_distribution_distributor_detail",
    data() {
        return {
            totalPage: 0,
            currentPage: 1,
            value: 1,
            id: this.$route.query.id,
            details: {},
            options: [
                {
                    value: 1,
                    label: '有效'
                },
                {
                    value: 0,
                    label: '无效'
                }
            ],
            tableData: [],
            columns: [
                {   label: "头像",
                    width: "200",
                    render: function(h, param) {
                        let img='';
                        if(param.row.avatarUrl!=""&&param.row.avatarUrl!=null&&param.row.avatarUrl!=undefined){
                            img = [
                                h('img', {
                                    attrs: {
                                        src: param.row.avatarUrl,
                                        style: 'width:44px;height:44px;vertical-align:middle;margin-right:15px;'
                                    }
                                }),
                                h('span', {} , param.row.nickName)
                            ];
                        }else{
                            img = [
                                h('img', {
                                    attrs: {
                                        src: "http://cdn0.19mini.com/2018-11-20%2Fadafb2ea64fbdf0651e32af183ddab36.png",
                                        style: 'width:44px;height:44px;vertical-align:middle;margin-right:15px;'
                                    }
                                }),
                                h('span', {} , param.row.nickName)
                            ];
                        }
                        return h('div', img);
                    }
                },
                { 
                    label: "用户",
                    align: "center",
                    render:function(h,param){
                        let a = param.row.nickName + "（" + param.row.phone + "）"
                        return h('span', a);
                    }
                },
                { prop: "application_time", label: "审核时间", align: "center" }
            ],
        }
    },
    components: {
        MyTable
    },
    mounted(){
        this.getTableData(this.currentPage);
    },
    methods: {
        changeState(e){
            this.value = e
        },
        getTableData(currentPage){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                token: localStorage.getItem('userId'),
                id: this.id,
                page: currentPage
            }
            this.$axios.post(this.url+'distributionhome/Distributionlist/disDetail',data
            ).then(res=>{
                if(res.data.code===200){
                    this.details = res.data.data.common_user
                    this.value = res.data.data.common_user.dis_status
                    this.tableData = res.data.data.lower.data
                    this.currentPage = res.data.data.lower.currentPage
                    this.totalPage = res.data.data.lower.total
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        save(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                token: localStorage.getItem('userId'),
                id: this.id,
                status: this.value
            }
            this.$axios.post(this.url+'distributionhome/Distributionlist/saveStatus',data
            ).then(res=>{
                if(res.data.code===200){
                    this.getTableData(this.currentPage)
                    that.$message.success('保存成功');
                    this.$router.push({path:"/wf/admin/shop/markting/disMenu"})
                }else{
                    that.$message.error('系统出错，请联系管理员！');
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-distributor_detail{
    background: #fff;
    padding: 20px;
    color: #666;
    .wf-line-heigh{
        padding: 10px 0;
        .wf-black{
            color: #333;
            font-size: 16px;
        }
        .wf-red{
            color: #E36F6B;
        }
    }
    .wf-btn-box{
        text-align: center;
        .wf-btn{
            width: 140px;
            height: 46px;
            background: #719FF8;
            color: #fff; 
            font-size: 16px;
        }
        .wf-btn:hover{
            background: #95b6f6;
        }
    }
    /deep/ .el-pagination{
        text-align: center;
        margin: 20px 0;
    }
}
</style>
