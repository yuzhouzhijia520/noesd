<template>
   <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/untils/common'
import {goodRank} from "@/server/overview";
export default {
  props: {
     className: {
      type: String,
      default: 'likeness'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '390px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      lineChartData:{
        good_name:[],
        good_num:[]
      }
    }
  },
  mounted() {
    this.initChartData();
    this.setOptions(this.lineChartData);
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
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
        p.then(function () {
            that.getLineChartData();
        }).catch(function (error) {

            that.$message.error("系统错误，请联系管理员！");
        });
    },
     getLineChartData(){   
        let that = this
        let data={
            token:localStorage.getItem('userId'),
            pro_id: parseInt(localStorage.getItem('proId'))
        }
        goodRank(data).then((res)=>{
            if(res.data.code!=200){
              that.$message.error("网络错误!600A00174");
            }else{
              that.lineChartData.good_name=Array.from(res.data.data,x=>x.good_name?x.good_name:'');
              that.lineChartData.good_num=Array.from(res.data.data,x=>x.good_num?parseInt(x.good_num):'');
              that.setOptions(that.lineChartData);
            }
        }).catch((err)=>{
            that.$message.error('网络错误!600B00173');
        }); 
    },
    setOptions({ good_name, good_num } = {}) {
        debugger
        /**chart 初始化完成执行 */
        if(this.chart){
          this.chart.setOption({
            title : {
                text: '热销商品TOP10',
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
                bottom: '10%',
                containLabel: true
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['销售量'],
                x: 'center',
                y: 'bottom',
                padding:[0,0,10,0],
                textStyle: {
                    fontSize: 20,
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    data : good_name,
                    axisLabel:{
                        interval:0,
                        rotate:45,
                        formatter: function(value) {
                            if (value.length > 4) {
                                return value.substring(0, 4) + "...";
                              } else {
                                return value;
                              }
                        }
                    },
                    triggerEvent: true
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'销售量',
                    type:'bar',
                    smooth:true,
                    barWidth :25,
                    itemStyle: {
                        normal: {
                            color:'rgb(2, 154, 254)',
                            areaStyle: {type: 'default'}
                        }
                    },
                    hoverAnimation: true,
                    data:good_num,
                }
            ]
          })
        }else{
          /**chart 初始化未完成 重新进入初始化方法*/
          this.initChartData();
        }
    },
    initChart() {
      let echarts=require('echarts');
      this.chart = echarts.init(this.$el, 'default');
        
    }
  }
}
</script>
