<template>
   <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>

require('echarts/theme/macarons') // echarts theme
import {echartcount} from "@/server/overview";
import { debounce } from '@/untils/common'
import {dateFormat} from "@/untils/common.js";

export default {
  props: {
     className: {
      type: String,
      default: 'echartCount'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    timeArr:Array
  },
  data() {
    return {
      chart: null,
      lineChartData:{
        data:[],
        time:[],
        count:[]
      }
    }
  },
  mounted() {
    this.initChartData();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleGetData(){
            let that = this
            let data={
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId')
            }
            if(this.timeArr.length!=2){
                data.state=0;
                data.days=30;
            }else{
                data.state=1;
                data.start_time=dateFormat(this.timeArr[0],"{y}-{m}-{d}");
                data.end_time=dateFormat(this.timeArr[1],"{y}-{m}-{d}");
            }
            echartcount(data).then((res)=>{
                if(res.data.code!=200){
                    that.$message.error("网络错误!600A0058");
                }else{
                    that.lineChartData.data=res.data.data;
                    that.lineChartData.time=res.data.time;
                    that.lineChartData.count=res.data.count;
                    that.setOptions(that.lineChartData);
                }
            }).catch((err)=>{
                that.$message.error('网络错误!600B0057');
            });  
        },
    initChartData(){
      let that=this;
      let p = new Promise(function (resolve, reject) {
            that.initChart();
            if (that.autoResize) {
              that.__resizeHandler = debounce(() => {
                if (that.chart) {
                  that.chart.resize()
                }
              }, 100)
            }
            let timer = setTimeout(function () {
                resolve();
            }, 100);
        });
        p.then( ()=> {
            that.handleGetData();
        })
    },
    setOptions({ data, time ,count } = {}) {
        /**chart 初始化完成执行 */
        if(this.chart){
          this.chart.setOption({
            title : {
                // text: '订单销售',
                padding: [20,51],                // 标题内边距，单位px，默认各方向内边距为5，
                textStyle: {
                    fontSize:20,
                    color: '#333333',          // 主标题文字颜色
                    fontWeight:400,
                    fontFamily:'"Microsoft Yahei",sans-serif'
                },
            },
            grid: {
                left: '8%',
                right: '10%',
                bottom: '25%',
                containLabel: true
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                x: 'center',
                y: 'bottom',
                padding:[0,0,10,0],
                formatter:  function(name){
                    var arr =name
                    return arr;
                },
                textStyle: {
                    fontSize: 18,
                    fontWeight: '100'
                }
            },
            toolbox: {
                show : true,
                padding:[0,80,0,0],
                feature : {
                    magicType : {show: true, type: ['bar','line']}
                }
            },
            calculable : true,
            // dataZoom : {
            //     show : true,
            //     width:'80%',
            //     realtime : true,
            //     start : 0,
            //     end :100,
            //     bottom:70,
            //     dataBackgroundColor: 'rgba(2, 169, 255,0.5)',
            //     fillerColor:'rgba(234, 230, 242,0.5)',
            //     handleColor:'rgb(0, 138, 205)',
            // },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : time
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'销售额(￥)',
                    type:'line',
                    data:data,
                    smooth:true,
                    itemStyle : {  
                        normal : {  
                            color:'rgb(2, 154, 254)',
                            lineStyle:{  
                                color:'rgb(2, 154, 254)'  
                            }  
                        }  
                    }
                },
                {
                    name:'订单数(条)',
                    type:'line',
                    data:count,
                    smooth:true,
                    itemStyle : {  
                        normal : {  
                            color:'rgb(244, 102, 102)',
                            lineStyle:{  
                                color:'rgb(244, 102, 102)'  
                            }  
                        }  
                    }
                }
            ]
          })
        }else{
          /**chart 初始化未完成 重新进入初始化方法*/
          this.initChartData();
        }
        
    },
    initChart() {
      let that=this;
      let echarts=require('echarts');
      this.$nextTick(()=>{
        that.chart = echarts.init(that.$el, 'default')
      })
    }
  },
   watch:{
        timeArr:{
            immediate:true,
            handler(val,oldVal){
                this.initChartData();
            },
            deep:true
        }
    }
}
</script>
