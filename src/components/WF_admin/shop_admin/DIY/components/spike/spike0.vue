<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-spike0"  v-if="flagShow">
        <el-row v-for="(item,index) in list" :key="index" class="wf-goods-row" v-model="list" >
            <el-col :span="8" class="wf-pic">
                  <img :src="item.master_graph" v-if="item.master_graph" class="wf-goods-row-img"/>
            </el-col>
            <el-col :span="16" class="wf-goods-row-right">
                <el-row>
                    <div class="wf-goods-name" >
                        {{item.good_name}}
                    </div>
                </el-row>
                <el-row class="wf-time">
                    <countdown
                    v-on:start_callback="countDownS_cb" 
                    v-on:end_callback="countDownE_cb" 
                    v-on:not_start_callback="countDownNot_cb"
                    :currentTime="currentTime"
                    :endTime="parseInt(item.strtotime_end_time)"  
                    :startTime="parseInt(item.strtotime_start_time)"
                    :endText="endText"
                    :dayTxt="'天'" 
                    :hourTxt="'小时'" 
                    :minutesTxt="'分钟'" 
                    :secondsTxt="'秒'"
                    :keyi="index">
                    </countdown>
                </el-row> 
                <el-row class="wf-progress">
                    <wfprocess 
                    :text-inside="true" 
                    :stroke-width="14" 
                    :percentage="item.percentage||0" 
                    status="exception"
                    :showTextSetFlag="true"
                    :showTextContent="item.showTextContent||'已抢0件'"
                    ></wfprocess>
                </el-row>
                <el-row>
                    <div class="wf-goods-price" >
                        <el-row>
                            <el-col :span="8" class="wf-newPrice">
                                ￥{{item.price||0}}
                            </el-col>
                            <el-col :span="10" class="wf-price">
                                原价:{{item.original_price||0}}
                            </el-col>
                            <el-col :span="6" ref="spike"  
                            class="wf-bargain">
                                马上抢
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
            </el-col>
        </el-row>
        <el-row v-if="list.length===0" class="wf-goods-tip">暂未添加活动，请在右侧面板添加活动</el-row>
    </div>
</template>

<script>
import wfprocess from "@/commonComponents/wfprocess/wfprocess.vue";
import countdown from '@/commonComponents/countdown/countdown.vue';
export default {
    name: '',
    props:{
        comProps:Array,
    },
    data() {
        return {
            list:[],
            currentTime:( new Date() ).getTime(),
            endText:'已结束',
            flagShow:true
        }
    },
    components: {
        wfprocess,
        countdown
    },
    created(){
        
    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.comProps[0].item.forEach(element => {
                if(element.selectShow){
                    that.list=JSON.parse(JSON.stringify(element.props));
                }
            });
        });
    },
    methods: {
        countDownNot_cb(state,key){
            if(this.list[key]){
                this.list[key].showTextContent="已抢0件";
                this.list[key].percentage=0;
            }
        },
        countDownS_cb: function (state,key) {
            if(this.list[key]){
                this.list[key].showTextContent="已抢"+(this.list[key].original_stock-this.list[key].stock)+'件'
                this.list[key].percentage=parseInt((this.list[key].original_stock-this.list[key].stock)/this.list[key].original_stock);
            }
        },
        countDownE_cb: function (state,key) {
            if(this.list[key]){
                this.list[key].showTextContent="已结束"
                this.list[key].percentage=100;
            }
            
        },
    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                let that=this;
                this.comProps[0].item.forEach(element => {
                    if(element.selectShow){
                        that.list=JSON.parse(JSON.stringify(element.props));
                    }
                });
                this.flagShow=false;
                this.$nextTick(()=>{
                    that.flagShow=true;
                });
            },
            deep:true
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-spike0{
    .wf-pic{
        width: 95px;
    }
    .wf-goods-tip{
        color: #ccc;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background-color: #f5f5f5;
    }
    .wf-time{
        font-size: 12px;
        color:#ccc;
        margin-left: 16px;
        text-align: left;
    }
    .wf-progress{
        font-size:12px;
        margin-left: 16px;
        margin-top: 2px;
    }
    .wf-goods-row-right {
        margin-top:2px;
    }
    .wf-goods-row{
        border-bottom:1px solid #f3f3f3;
        padding: 5px 0 5px 5px;
        text-align: center;
        background-color: #fff;
        .wf-goods-row-img{
            width: 95px;
            height: 95px;
            border-radius: 4px;
            margin-top: 5px;
        }
        .wf-goods-name{
            text-align: left;
            padding:0 15px 3px 15px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
            height: 42px;
        }
        .wf-goods-price{
            margin-top: 5px;
            font-size: 12px;
            margin-left: 14px;
            text-align: left;
            .wf-newPrice{
                color:rgb(233, 71, 60);
                font-size: 12px;
            }
            .wf-price{
                text-decoration:line-through;
                color:rgb(184, 184, 184);
                font-size: 12px;
                margin-top: 2px;
                padding-right: 3px;
                width: 78px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .wf-bargain{
                background-color: rgb(233, 71, 60);
                border-radius: 25px;
                color: rgb(249, 209, 207);
                padding: 1px;
                cursor: pointer;
                font-size: 12px;
                text-align: center;
            }
        }
    }
}
</style>