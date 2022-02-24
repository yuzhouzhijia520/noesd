<template>
   <div class="wf-goodsdata">
        <el-row class="wf-goodsdata-one">
            <el-col class="wf-goods-col">
                <el-row>
                    待发货订单
                </el-row>
                <el-row class="wf-font-account">
                    {{showData.send}}
                </el-row>
            </el-col>
            <el-col class="wf-goods-col">
                <el-row>
                    待付款订单
                </el-row>
                <el-row class="wf-font-account">
                     {{showData.obligation_number }}
                </el-row>
            </el-col>
            <el-col class="wf-goods-col">
                <el-row>
                    申请退款
                </el-row>
                <el-row class="wf-font-account">
                     {{showData.refund }}
                </el-row>
            </el-col >
            <el-col class="wf-goods-col">
                <!-- <router-link to="/wf/admin/shop/newshop_list"> -->
                    <el-row>
                        已售罄商品
                    </el-row>
                    <el-row class="wf-font-account wf-font-account-blue">
                        {{showData.sell_out_good }}
                    </el-row>
                <!-- </router-link> -->
            </el-col>
            <el-col class="wf-goods-col">
                <el-row>
                    商品总数
                </el-row>
                <el-row class="wf-font-account">
                    {{showData.goods_num }}
                </el-row>
            </el-col>
            <el-col class="wf-goods-col">
                <el-row>
                    成交运费总价(元)
                </el-row>
                <el-row class="wf-font-account">
                    {{showData.freight }}
                </el-row>
            </el-col>
            <el-col class="wf-goods-col-end">
                <el-row>
                    客单价(元)
                </el-row>
                <el-row class="wf-font-account">
                    {{showData.customer_unit_price }}
                </el-row>
            </el-col>
        </el-row>
        <el-row class="big_data" type="flex"  justify="space-between" v-show="!unfold">
            <el-col class="number_box" :span="6" >
                <el-card :body-style="{ padding: '0px' }" class="wf-card-one">
                    <el-row class="wf-card-PA">
                        <el-col :span="12" class="wf-card-A wf-card">订单金额(元)</el-col>
                        <el-col :span="12" class="wf-card-B wf-card">今日(元)：{{showData.today_amount   }}</el-col>
                    </el-row>
                    <el-row class="wf-card-PB">
                        <el-col :span="12" class="wf-account wf-card-C wf-card">{{showData.amount }}</el-col>
                        <el-col :span="12" class="wf-card-D wf-card">昨日(元)：{{showData.yesterday_amount }}</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col class="number_box" :span="6" >
                <el-card :body-style="{ padding: '0px' }" class="wf-card-one">
                    <el-row class="wf-card-PA">
                        <el-col :span="12" class="wf-card-A wf-card">订单总数(条)</el-col>
                        <el-col :span="12" class="wf-card-B wf-card">今日(条)：{{showData.today_order_number   }}</el-col>
                    </el-row>
                    <el-row class="wf-card-PB">
                        <el-col :span="12" class="wf-account wf-card-C wf-card">{{showData.order_number }}</el-col>
                        <el-col :span="12" class="wf-card-D wf-card">昨日(条)：{{showData.yesterday_order_number  }}</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col class="number_box" :span="6" >
                <el-card :body-style="{ padding: '0px' }" class="wf-card-one">
                    <el-row class="wf-card-PA">
                        <el-col :span="12" class="wf-card-A wf-card">访客数(人)</el-col>
                        <el-col :span="12" class="wf-card-B wf-card">今日(人)：{{showData.today_visitor_number   }}</el-col>
                    </el-row>
                    <el-row class="wf-card-PB">
                        <el-col :span="12" class="wf-account wf-card-C wf-card">{{showData.visitor_number  }}</el-col>
                        <el-col :span="12" class="wf-card-D wf-card">昨日(人)：{{showData.yesterday_visitor_number  }}</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col class="number_box" :span="6" >
                <el-card :body-style="{ padding: '0px' }" class="wf-card-one">
                    <el-row class="wf-card-PA">
                        <el-col :span="12" class="wf-card-A wf-card">浏览量(人)</el-col>
                        <el-col :span="12" class="wf-card-B wf-card">今日(人)：{{showData.today_browse_number   }}</el-col>
                    </el-row>
                    <el-row class="wf-card-PB">
                        <el-col :span="12" class="wf-account wf-card-C wf-card">{{showData.browse_number  }}</el-col>
                        <el-col :span="12" class="wf-card-D wf-card">昨日(人)：{{showData.yesterday_browse_number  }}</el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="wf-fold">
            <el-col v-if="unfold" >
                <div @click="handlefold" class="wf-fold-icon">
                    <el-button type="text" >展开更多</el-button>
                    <icon name="wf-icon-fold" ></icon> 
                </div>
            </el-col>
            <el-col v-if="!unfold" >
                <div @click="handleunfold" class="wf-fold-icon">
                    <el-button type="text" >收起更多</el-button>
                    <icon name="wf-icon-unfold" ></icon> 
                </div>
            </el-col>
        </el-row>
   </div>
</template>

<script>

export default {
    name: 'shop_overview',
    props:{
        showData:Object
    },
    data() {
        return {
            otherData:true,
            unfold:true, //默认收起
        }
    },
    created(){
        
    },
    methods: {
        handlefold(){
            this.unfold=false;
        },
        handleunfold(){
            this.unfold=true;
        }
    }
}
</script>

<style lang="scss">
    .wf-goodsdata{
        background-color: #fff;
        padding: 20px;
        margin-top: 20px;
        .wf-fold{
            margin-left: 60px;
            margin-top: 10px;
            button{
                color: black;
            }
        }
        .wf-fold-icon{
            cursor: pointer;
            width: 100px;
        }
        .wf-goods-col{
            width: 15%;
        }
        .wf-goods-col-end{
            width:10%;
        }
        .wf-goodsdata-one{
            padding-left: 60px;
        }
        .big_data{
            margin-left: 15px;
            margin-top: 20px;
        }
        .wf-font-account{
            color:#F46666;
            font-size:28px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
        }
        // .wf-font-account-blue{
        //     color: #719FF8;
        // }
        .wf-card-one{
            background:rgba(239,239,239,1);
            border-radius:4px;
            margin: 15px;
            box-shadow: none !important;
            padding: 20px 20px 20px 20px;
            .wf-account{
                color:#F46666;
                font-size:28px;
                font-family:MicrosoftYaHei-Bold;
                font-weight:bold;
            }
            .wf-card{
                line-height: 40px;
            }
        }
    }
</style>
