<template>
   <div id="overview">
        <realdata :showData="showData"></realdata>
        <goodsdata :showData="showData"></goodsdata>
        <div class="eacher right">
            <!-- <line-echart /> -->
            <el-row :gutter="32">
                <el-col :xs="24" :sm="24" :lg="12">
                    <el-col>
                        <p class="title">订单销售</p>
                        <el-date-picker
                            v-model="time"
                            style="margin-left:12px;"
                            type="daterange"
                            align="right"
                            size="mini"
                            range-separator="至"
                            start-placeholder="选择日期时间"
                            end-placeholder="选择日期时间"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-col>
                    <div class="chart-wrapper sale-chart">
                        <line-echart :timeArr="timeArr"/>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="12">
                    <div class="chart-wrapper">
                        <likeNess/>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="32" class="clearFix">
            <hotTop></hotTop>
        </el-row>
        <el-row :gutter="32" class="clearFix">
            <el-col :xs="24" :sm="24" :lg="12">
                <div class="chart-wrapper">
                    <functionlist/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="12">
                <div class="chart-wrapper">
                    <last/>
                </div>
            </el-col>
        </el-row>
        <experience></experience>
   </div>
</template>

<script>
import realdata from './realdata';
import goodsdata from './goodsdata';
import functionlist from './functionlist';
import last from './last';
import hotTop from './hotTop'
import experience from './experience';



import lineEchart from './echartCount'; //订单销售
import likeNess from './likeness'; //热销商品TOP10
import {count} from "@/server/overview";
export default {
    name: 'shop_overview',
    data() {
        return {
            showData:{},
            time:'',
            timeArr:[],
            pickerOptions: {
                // disabledDate: (time) => {
                //     return time.getTime() > new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);//减去一天的时间代表可以选择同一天;
                // },
                onPick: ({ maxDate, minDate }) => {
                    this.pickerMinDate = minDate.getTime();
                    if (maxDate) {
                        this.pickerMinDate = ''
                    }
                    if(maxDate&&minDate){
                        this.setTimeDate(minDate,maxDate);
                    }
                },
                disabledDate: (time) => {
                    if (this.pickerMinDate!='') {
                        let tow = 30 * 24 * 3600 * 1000 //重点是在这里计算相差几天
                        let minTime = this.pickerMinDate - tow
                        let maxTime = this.pickerMinDate + tow
                        return time.getTime() < minTime || time.getTime() > maxTime
                    }
                },
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    created(){
       this.getData()
    },
    components:{
        realdata,
        functionlist,
        last,
        lineEchart,
        experience,
        goodsdata,
        likeNess,
        hotTop
    },
    methods: {
        getData(){ // 获取概览页数据
            let that = this
            let data={
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId')
            }
            count(data).then((res)=>{
                if(res.data.code==200){
                    that.showData = res.data.data;
                }else{
                   that.$message.error('网络错误!600A0059');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!600B0060');
            }); 
        },
        setTimeDate(minDate,maxDate){
            let arrT=[];
            arrT.push(minDate.getTime());
            arrT.push(maxDate.getTime());
            this.timeArr=arrT;
        }
    }
}
</script>


<style lang="scss" scoped>
#overview{
    min-width: 1200px;
    .chart-wrapper {
        background: #fff;
    }
    .clearFix{
        clear: both;
    }
    .sale-chart{
        padding-top: 90px;
    }
    .title{
        margin-top: 17px;
        margin-left: 36px;
        font-size: 20px;
    }
    /deep/ .el-range-editor--mini{
        margin-left: 85px !important;
        margin-top: 15px;
    }
}
    .eacher{
        width: 100%;
        height: 330px;
        margin: 20px 0 60px 10px;
    }
</style>
