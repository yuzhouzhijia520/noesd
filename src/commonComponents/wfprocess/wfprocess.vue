<template>
  <div
    class="el-progress wfprocess"
    :class="[
      'el-progress--' + type,
      status ? 'is-' + status : '',
      {
        'el-progress--without-text': !showText,
        'el-progress--text-inside': textInside,
      }
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="el-progress-bar" v-if="type === 'line'">
      <div class="el-progress-bar__outer" :style="{height: strokeWidth + 'px'}">
        <el-row style="z-index:1;">
            <el-col  v-if="showTextSetFlag" :span="18" style="text-align:left">
                <span class="el-progress-bar__innerText" >{{showTextContent}}</span>
            </el-col>
            <el-col v-if="showText && textInside" :span="6" style="text-align:right">
                <span class="el-progress-bar__innerText" style="margin: 0 5px 3px 0;color:#f56c6c;font-family: fantasy;">{{percentage}}%</span>
            </el-col>
        </el-row>
        <div class="el-progress-bar__inner" :style="barStyle">
            
        </div>
        
      </div>
    </div>
    <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
      <svg viewBox="0 0 100 100">
        <path class="el-progress-circle__track" :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path class="el-progress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
      </svg>
    </div>
    <div
      class="el-progress__text"
      v-if="showText && !textInside"
      :style="{fontSize: progressTextSize + 'px'}"
    >
      <template v-if="!status">{{percentage}}%</template>
      <i v-else :class="iconClass"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ElProgress',
    props: {
      type: {
        type: String,
        default: 'line',
        validator: val => ['line', 'circle'].indexOf(val) > -1
      },
      percentage: {
        type: Number,
        default: 0,
        required: true,
        validator: val => val >= 0 && val <= 100
      },
      status: {
        type: String
      },
      strokeWidth: {
        type: Number,
        default: 6
      },
      textInside: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 126
      },
      showText: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: ''
      },
      showTextSetFlag:{
          type:Boolean,
          default:false
      },
      showTextContent:{
          type:String,
          default:''
      }
    },
    computed: {
      barStyle() {
        const style = {};
        style.width = this.percentage + '%';
        style.backgroundColor = this.color;
        return style;
      },
      relativeStrokeWidth() {
        return (this.strokeWidth / this.width * 100).toFixed(1);
      },
      trackPath() {
        const radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);

        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
      },
      perimeter() {
        const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
        return 2 * Math.PI * radius;
      },
      circlePathStyle() {
        const perimeter = this.perimeter;
        return {
          strokeDasharray: `${perimeter}px,${perimeter}px`,
          strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
          transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        };
      },
      stroke() {
        let ret;
        if (this.color) {
          ret = this.color;
        } else {
          switch (this.status) {
            case 'success':
              ret = '#13ce66';
              break;
            case 'exception':
              ret = '#ff4949';
              break;
            default:
              ret = '#20a0ff';
          }
        }
        return ret;
      },
      iconClass() {
        if (this.type === 'line') {
          return this.status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-close';
        } else {
          return this.status === 'success' ? 'el-icon-check' : 'el-icon-close';
        }
      },
      progressTextSize() {
        return this.type === 'line'
          ? 12 + this.strokeWidth * 0.4
          : this.width * 0.111111 + 2 ;
      }
    }
  };
</script>
<style lang="scss" scoped>
.wfprocess{
  .el-progress-bar__outer{
    background-size:30px 30px;
    background-color: #ffeceb;
    background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, #ffd7d4), 
    color-stop(.25, transparent), color-stop(.5, transparent), 
    color-stop(.5, #ffd7d4), 
    color-stop(.75, #ffd7d4), 
    color-stop(.75, transparent), 
    to(transparent));
  }
}
</style>