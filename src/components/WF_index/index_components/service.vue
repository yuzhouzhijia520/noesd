<template>
    <div id="service">
      <ul class="clear">
        <li class="service_list left"  @mouseover="addClass" @mouseout="addClasss">
          <img src="../../../assets/index_img/xiao1.png" alt="" v-if="list">
          <img src="../../../assets/index_img/xiao.png" alt="" v-if="lists">
          <div class="zixun" v-if="zixun"></div>
        </li>

        <!-- <li class="service_list left"  @mouseover="addClass1" @mouseout="addClasss11">
          <img src="../../../assets/index_img/pan.png" alt="" v-if="list1">
          <img src="../../../assets/index_img/pan2.png" alt="" v-if="list11">
          <div class="pan_tip" v-if="pan_tip">我们渴望您宝贵的意见</div>
        </li> -->

        <li class="service_list left" @mouseover="addClass2"  @mouseout="addClass22"><img src="../../../assets/index_img/er.png" alt=""  v-if="list2">
          <img src="../../../assets/index_img/er2.png" alt=""  v-if="list22">
          <div class="ewm" v-if="ewm">
            <img class="ewm_img" src="../../../assets/index_img/srp.png" alt="">
          </div>
        </li>
        

        <li class="service_list left" v-if="isshow" @click="toTop"><img src="../../../assets/index_img/top.png" alt="" > </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "service",
      data(){
          return{
            isshow:false,
            list:true,
            lists:false,
            list1:true,
            list11:false,
            list2:true,
            list22:false,
            pan_tip:false,
            ewm:false,
            zixun:false

          }
      },
      mounted () {
        window.addEventListener('scroll', this.handleScroll)
      },
      methods:{
        handleScroll () {
          let that = this
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          // console.log(scrollTop)
          //console.log(scrollTop)
          if(scrollTop >= 500 ){
              that.isshow = true
          }else{
            that.isshow = false
          }
        },
        toTop(){
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

          // setTimeout(function(){
            
            // window.scroll(0, 200);
            // console.log(scrollTop)
          // },2000)
          var timer = null;
          if(scrollTop<1000){
            var i=100;
          }else if(scrollTop<1500){
            var i=200;
          }else if(scrollTop<2000){
            var i=300;
          }else if(scrollTop<2500){
            var i=400;
          }else{
            var i=500;
          }
          
          var j=1;
          var y=scrollTop/i
          // console.log(y)
          function test(){     
            if(i>j){
              // console.log(scrollTop-j*y,i)
              window.scroll(0,scrollTop-j*y)
              j++;
              
            }else{
              window.scroll(0,0 )
              clearInterval(timer);
            }
          }
          timer = setInterval(test, 1);
        },
        addClass(){
         let that = this
          if( that.list == true){
            that.list = false
            that.lists = true
            that.zixun = !that.zixun
          }
        },
        addClasss(){
          let that = this
          that.lists = false
          that.list = true
          that.zixun = !that.zixun
        },
        addClass1(){
          let that = this
          that.list1 = !that.list1
          that.list11 = !that.list11
          that.pan_tip = !that.pan_tip
        },
        addClasss11(){
          let that = this
          that.list1 = !that.list1
          that.list11 = !that.list11
          that.pan_tip = !that.pan_tip
        },
        addClass2(){
          let that = this
          that.list2=!that.list2
          that.list22=!that.list22
          that.ewm = !that.ewm
        },
        addClass22(){
          let that = this
          that.list2=!that.list2
          that.list22=!that.list22
          that.ewm = !that.ewm
        }
      }
    }
</script>

<style lang="scss">
  #service{
    position: fixed;
    z-index: 9999;
    right: 15px;
    top: 200px;
    width: 50px;
    .service_list{
      width: 48px;
      height: 48px;
      border-radius: 4px;
      margin-bottom: 10px;
      position: relative;
      background: #fff;
      border:1px solid #e8e8e8;
      img{
        width: 20px;
        height: 20px;
        position: absolute;
        top:15px;
        left: 15px;
      }
      &:hover{
        background:#0076FE;
        border: 1px solid #0076FE;
      }
    }
    .pan_tip{
      width: 254px;
      height: 53px;
      position: absolute;
      top: -2px;
      right: 50px;
      background: url("../../../assets/index_img/bglist.png");
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(56,56,56,1);
      line-height:53px;
      text-align: center;
    }
    .zixun{
      width: 230px;
      height: 114px;
      position: absolute;
      top: -31px;
      right: 60px;
      background: url("../../../assets/index_img/zixun.png");
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(56,56,56,1);
      line-height:53px;
      text-align: center;
    }
    .ewm{
      width: 250px;
      height: 286px;
      position: absolute;
      top: -2px;
      right: 50px;
      background: url("../../../assets/index_img/ewm.png");
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(56,56,56,1);
      line-height:53px;
      text-align: center;
    }
    .ewm_img{
      width: 124px!important;
      height: 124px!important;
      top: 38px!important;
      left: 54px!important;
    }
    .service_list:last-child{
      margin-bottom: 0px
    }
    .bluecolor{
      background: #0076FE;
      width: 48px;
      height: 48px;
      display:table-cell;
      text-align:center;
      vertical-align:middle;
      border: 1px solid  #555555;
      margin-bottom: 10px;
      img{
        width: 21px;
        height: 21px;
        margin-top: 13px;
      }
    }
  }
</style>
