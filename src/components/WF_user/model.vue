<template>
    <div id="chios_qs">
      <div class="WF_logo">
        <img src="../../assets/index_img/WF_Logo.png" alt="">
      </div>
      <div class="chios_qs_title">餐饮门店</div>
      <div class="chios_qs_content">只有您想不到，没有我们做不到</div>
      <div class="chios_qs_list">
        <ul class="clear">
          <li class="chios_qs_list_l left" @click="toManagement">
            <img src="../../assets/user_img/img.png" alt="">
          </li>
          <li class="chios_qs_list_l left">
            <img src="../../assets/user_img/img.png" alt="">
          </li>
          <li class="chios_qs_list_l left">
            <img src="../../assets/user_img/img.png" alt="">
          </li>
          <li class="chios_qs_list_l left">
            <img src="../../assets/user_img/img.png" alt="">
          </li>
          <li class="chios_qs_list_l left">
            <img src="../../assets/user_img/img.png" alt="">
          </li>
          <li class="chios_qs_list_l left">
            <img src="../../assets/user_img/img.png" alt="">
          </li>
          <li class="chios_qs_list_l left">
            <img src="../../assets/user_img/img.png" alt="">
          </li>
          <li class="chios_qs_list_l left">
            <img src="../../assets/user_img/img.png" alt="">
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
    data(){
      return{
        imglist:[

        ]
      }
    },
    methods:{
      toManagement(){
        this.$router.push({path:"/wd/user/management",name:'user_management'})
      }
    }
}
</script>


<style lang="scss">
  #chios_qs{
    min-width: 1220px;
    //padding-top: 78px;
    padding-bottom: 112px;
    .WF_logo{
      width: 1220px;
      margin: 0 auto; height: 62px;
    }
    .chios_qs_title{
      min-width: 1220px;
      height:25px;
      font-size:24px;
      line-height: 25px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(0,0,0,1);
      text-align: center;
    }
    .chios_qs_content{
      height:14px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(130,130,130,1);
      text-align: center;
      margin-top: 36px;
      min-width: 1220px;
      margin-bottom: 44px;
    }
    ul{
      width: 1220px;

    }
    .chios_qs_list{
      width: 1220px;
      margin:  0 auto;
      .chios_qs_list_l{
        width: 220px;
        height: 390px;
        img{
          width: 100%;
          height: 100%;
          display: block;
          float: left;
        }
      }
      :first-child{
        margin: 0 35px 0 35px;
      }
      :nth-child(2){
        margin: 0 30px;
      }
      :nth-child(3){
        margin: 0 30px;
      }
      :nth-child(4){
        margin: 0 0 0 30px;
      }
      :nth-child(5){
        margin: 67px 35px 0 35px ;
      }
      :nth-child(6){
        margin: 67px 30px 0 30px;
      }
      :nth-child(7){
        margin: 67px 30px 0 30px;
      }
      :nth-child(8){
        margin: 67px 0 0 30px;
      }
    }
  }
</style>

