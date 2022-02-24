<template>
   <div class="wf-realdata">
       <div class="tit" style="margin-top:0;">实时概况</div>
           <el-row class="big_data" type="flex"  justify="space-between">
               <el-col class="number_box" :span="8" >
                    <el-card :body-style="{ padding: '0px' }" class="wf-card-one">
                        <el-row class="wf-card-PA">
                            <el-col :span="12" class="wf-card-A wf-card">入账金额 (元)</el-col>
                            <el-col :span="12" class="wf-card-B wf-card">今日(元)：{{showData.today_accounting_amount }}</el-col>
                        </el-row>
                        <el-row class="wf-card-PB">
                            <el-col :span="12" class="wf-account wf-card-C wf-card">{{showData.accounting_amount}}</el-col>
                            <el-col :span="12" class="wf-card-D wf-card">昨日(元)：{{showData.yesterday_accounting_amount}}</el-col>
                        </el-row>
                    </el-card>
               </el-col>
               <el-col class="number_box" :span="8" >
                    <el-card :body-style="{ padding: '0px' }" class="wf-card-one">
                        <el-row class="wf-card-PA">
                            <el-col :span="12" class="wf-card-A wf-card">成交订单(条)</el-col>
                            <el-col :span="12" class="wf-card-B wf-card">今日(条)：{{showData.today_volume  }}</el-col>
                        </el-row>
                        <el-row class="wf-card-PB">
                            <el-col :span="12" class="wf-account wf-card-C wf-card">{{showData.volume}}</el-col>
                            <el-col :span="12" class="wf-card-D wf-card">昨日(条)：{{showData.yesterday_volume }}</el-col>
                        </el-row>
                    </el-card>
               </el-col>
               <el-col class="number_box" :span="8" >
                  <el-card :body-style="{ padding: '0px' }" class="wf-card-one">
                        <el-row class="wf-card-PA">
                            <el-col :span="12" class="wf-card-A wf-card">用户总数(人)</el-col>
                            <el-col :span="12" class="wf-card-B wf-card">今日(人)：{{showData.today_user  }}</el-col>
                        </el-row>
                        <el-row class="wf-card-PB">
                            <el-col :span="12" class="wf-account wf-card-C wf-card">{{showData.total_user }}</el-col>
                            <el-col :span="12" class="wf-card-D wf-card">昨日(人)：{{showData.yesterday_user }}</el-col>
                        </el-row>
                    </el-card>
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

        }
    },
    created(){
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
    .wf-realdata{
        background-color: #fff;
        padding: 20px;
        .tit{
            font-size: 20px;
            margin-left: 30px;
        }
        .big_data{
            margin-left: 15px;
        }
        .wf-card-one{
            background:rgba(239,239,239,1);
            border-radius:4px;
            margin: 15px;
            box-shadow: none !important;;
            padding: 20px 20px 20px 90px;
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
