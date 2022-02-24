<template>
    <div class="wf-pointsMall">
        <div class="wf-gray-tit clear wf-margin-bottom">
            积分商城
            <div class="tit-right">
                <img @click="advice" src="../../../../assets/admin_img/shop_admin_img/运营建议.png" alt="">
                <span @click="advice">运营建议</span>
            </div>
            <el-dialog
            title="运营建议"
            :visible.sync="dialogVisible"
            width="50%">
                <p>1、在做积分兑换的时候，利用积分排序功能，大致了解会员积分的分布，再去设置积分兑换商品会比较合理。</p>
                <div class="clear margin_top">
                    <div>步骤：</div>
                    <div class="small_font">
                        <p>1）先判断成本预算及兑换商品价值</p>
                        <p>2）判断会员积分分布</p>
                        <p>3）根据会员积分分布情况，设计奖品的兑换等级</p>
                    </div>
                </div>
                <div class="clear margin_top">
                    <div>核心点：</div>
                    <div class="small_font">
                        <p>1）考虑“积分等级”与“商品价值”两者关系</p>
                        <p>2）预告兑换数量，根据积分分布来做，一般正常情况，预估会比实际情况要高</p>
                        <p>3）一定要做预告，做兑换的限量，每个月可以固定一个兑换日。</p>
                        <p>4）可以结合店铺活动做会员福利兑换，如每周上新日的时候，做积分兑换活动，兑换率会更高。</p>
                    </div>
                </div>
                <p class="tit_top">2、兑换礼品选品技巧</p>
                <p class="margin_top small_font">1）大促活动，选择用积分兑换礼品的时候，需根据自己的用户群体特征来选，若你的用户是追求生活品质的年轻女性，那可能赠送一些自拍杆，保温杯等。
                <p class="small_font">2）常规活动，选择用一些口碑不错，复购率相对比较高的商品。也可以找些赠品、纪念款等来兑换。</p>
                <p class="margin_top tit_red small_font">原则：结合用户本身特征来选，客户感知比较大，礼品类的一定要让他们觉得是有价值。</p>
            </el-dialog>
        </div>
        <div class="wf-rule wf-margin-bottom">
            开启后，用户可以使用在您店铺累积的积分兑换指定商品，您需要从商品库中挑选可以被兑换的商品，并进行积分价格、
            可兑换数量、有效期、限兑数量的设置。根据商品情况，需要或不需要支付运费，积分兑换所产生的订单将作为“积分订单”出现在您的订单列表中。
            <p>特别说明：＊暂时只支持有运费订单退款，且只退运费部分，不自动退积分。</p>
        </div>
        <div class="wf-gray-tit wf-margin-bottom">商品列表</div>
            <div class="clear wf-margin-bottom">
                <el-button size="mini" @click="addJump(0,-1)">新增</el-button>
                <div class="search_box_right">
                商品名称
                <el-input v-model="goods_name" size="mini" style="margin-right:30px;margin-left:15px;"></el-input>
                兑换积分
                <el-input-number v-model="min_points" size="mini" :controls="false" style="margin-left:15px;"></el-input-number>
                -
                <el-input-number v-model="max_points" size="mini" :controls="false" style="margin-right:30px;"></el-input-number>
                上下架
                <el-select size="mini" v-model="select_val" style="margin-right:30px;margin-left:15px;">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button size="mini" type="primary" @click="getData(1)">搜索</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="getData(1)">
            <el-tab-pane label="全部积分商品" name="0"></el-tab-pane>
            <el-tab-pane label="未开始" name="1"></el-tab-pane>
            <el-tab-pane label="进行中" name="2"></el-tab-pane>
            <el-tab-pane label="已结束" name="3"></el-tab-pane>
        </el-tabs>
        <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" @currentChange="getData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "pointsMall",
    data() {
        return {
            dialogVisible: false,
            switch_val: true,
            select_val: 2,
            activeName: "0",
            options: [
                {
                    value: 2,
                    label: "全部"
                },
                {
                    value: 0,
                    label: "上架"
                },
                {
                    value: 1,
                    label: "下架"
                }
            ],
            goods_name: "",
            min_points: undefined,
            max_points: undefined,
            totalPage: 0,
            currentPage: 1,
            tableData: [],
            columns: [
                {
                    label: "商品名称",
                    align: "center",
                    prop: "name"
                },
                {
                    label: "兑换积分",
                    align: "center",
                    prop: "integral"
                },
                {   label: "商品图片",
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
                    label: "领取数量/已兑数量",
                    align: "center",
                    render: (h, param)=>{
                        let a = param.row.receive_num + "/" + param.row.exchange_num
                        return [h('span', a)];
                    }
                },
                {
                    label: "发放总量",
                    align: "center",
                    prop: "stock"
                },
                { 
                    label: "是否上架",
                    align: "center",
                    render: (h, param)=>{
                        let a
                        if(param.row.state===1){
                            a = [h('span', {}, "下架")];
                        }else{
                            a = [h('span', {
                                attrs: {
                                    style: "color:#719FF8"
                                }
                            }, "上架")];
                        }
                        return a
                    }
                },
                {
                    label: "活动时间",
                    align: "center",
                    width: "340",
                    render: (h, param)=>{
                        let a = param.row.start_time + " - " + param.row.end_time
                        return [h('span', a)];
                    }
                },
                {
                    label: "操作",
                    align: "center",
                    width: "260",
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
                                        this.addJump(1,param.row.id,param.row.type)
                                    }
                                }
                            }, "编辑"),
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8;margin-right:10px;"
                                },
                                on: {
                                    click: () => {
                                        this.shelf(param.row.id,param.row.state)
                                    }
                                }
                            }, param.row.state===0?"下架":"上架"),
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
                                            this.deleteGoods(param.row.id)
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
            let that = this
            this.currentPage = currentPage
            let data = {
                secret: localStorage.getItem('secretId'),
                page: currentPage,
                state: this.select_val,
                start_integral: this.min_points,
                end_integral: this.max_points,
                name: this.goods_name,
                status: parseInt(this.activeName)
            }
            if(data.start_integral===undefined){
                data.start_integral = ""
            }
            if(data.end_integral===undefined){
                data.end_integral = ""
            }
            this.$axios.post(this.url+'shopapi/exchange_good/index',data
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data;
                    that.totalPage = res.data.count
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        advice(){
            this.dialogVisible = true
        },
        addJump(type,id,shopType){
            this.$router.push({path:"/wf/admin/shop/markting/pointsMall/addRedeemGoods",query:{type:type,id:id,shopType:shopType}})
        },
        shelf(id,state){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id,
                state: state
            }
            this.$axios.post(this.url+'shopapi/exchange_good/show',data
            ).then(res=>{
                if(res.data.code===200){
                    that.$message.success("操作成功")
                    that.getData(that.currentPage)
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        deleteGoods(id){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id
            }
            this.$axios.post(this.url+'shopapi/exchange_good/destroy',data
            ).then(res=>{
                if(res.data.code===200){
                    that.$message.success("删除成功")
                    that.getData(that.currentPage)
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-pointsMall{
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    .wf-margin-bottom{
        margin-bottom: 20px;
    }
    .wf-gray-tit{
        padding: 20px 50px 20px 20px;
        background: #F8F8F8;
        border-radius: 4px;
        .tit-right{
            float:right;
            color:#E36F6B;
            img{
                width: 20px;
                height: 16px;
                vertical-align: middle;
                margin-right: 6px;
            }
            img,span{
                cursor: pointer;
            }
        }
    }
    .el-input{
        width: 120px;
    }
    .el-button{
        width: 80px;
    }
    .el-button--default{
        border-color: #719FF8;
        color: #719FF8;
    }
    .el-button--primary{
        background: #719FF8;
    }
    .el-select{
        width: 140px;
    }
    /deep/ .el-dialog{
        color: #333;
        .el-dialog__header{
            padding: 20px 20px 20px;
            border-bottom: 1px solid #F0F0F0;
            .el-dialog__title{
                font-size: 16px;
            }
        }
        .el-dialog__body{
            padding: 18px 20px 40px 20px;
            font-size: 16px;
        }
        .margin_top{
            margin-top: 15px;
        }
        .tit_top{
            margin-top: 18px;
        }
        .tit_red{
            color: #E36F6B;
        }
        .small_font{
            font-size: 14px;
        }
    }
    .wf-rule{
        width: 1200px;
        line-height: 22px;
        font-size: 14px;
        p{
            color: #E36F6B;
        }
    }
    .search_box_right{
        float: right;
    }
    /deep/ .el-tabs{
        .el-tabs__header{
            margin: 0 0 40px;
            background: #F8F8F8;
            border-radius: 4px;
            padding-left: 25px;
            .el-tabs__item{
                height: 60px;
                line-height: 60px;
                &:hover{
                    color: #719FF8;
                }
            }
            .el-tabs__item.is-active{
                color: #719FF8;
            }
            .el-tabs__active-bar{
                background-color: #719FF8;
                height: 4px;
            }
            .el-tabs__nav-wrap::after{
                display: none;
            }
        }
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
    /deep/ .wf_pagination{
        text-align: center;
        margin-top: 30px;
    }
}
</style>