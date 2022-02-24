<template>
    <div id="contact">
      <div class="wf_index_a">
        <div id="nav_fixed">
            <indexHearder></indexHearder>
        </div>
      </div>
      <div class="contact_img">
          <img src="../../assets/index_img/tel/tel.jpg" alt="">
      </div>
      <div class="contact_address clear">
        <div class="contact_address_map left">
          <img src="../../assets/index_img/map.jpg" alt="">
        </div>
        <div class="contact_address_content">
          <div class="contact_address_content_title">公司信息</div>
          <div class="contact_address_content_con">
            <ul class="clear">
              <li class="contact_address_content_con_li left">杭州公司</li>
              <li class="contact_address_content_con_li left">邮编：310000</li>
              <li class="contact_address_content_con_li left">地址：杭州市余杭区富力天贸广场26幢708</li>
              <li class="contact_address_content_con_li left">电话：01245678922</li>
              <li class="contact_address_content_con_li left">客服：400-130-2546</li>
            </ul>
          </div>
        </div>
      </div>
      <index-footer></index-footer>
    </div>
</template>

<script>
import indexHearder from './index_components/header';
import indexFooter from './index_components/footer';
    export default {
      components:{
        indexHearder,
        indexFooter
      },
        name: "contact",
        methods:{
          
        }
    }
</script>

<style lang="scss">
  #contact{
    .contact_img{
      height: 500px;
      // background: url("../../assets/index_img/us_bg.png") no-repeat;
      // background-size:100% 100%;
      margin-bottom: 76px;
      margin-top:72px;
      img{
        height: 500px;
        width:100%;
      }
    }
    .contact_address{
      width: 1220px;
      margin: 0 auto;
      .contact_address_map{
        width: 750px;
        height: 460px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .contact_address_content{
        float: right;
        width: 360px;
        padding:30px 0 75px 0;
        .contact_address_content_title{
          margin-bottom: 88px;
          height:47px;
          font-size:48px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(0,118,254,1);
          line-height: 47px;
        }
        .contact_address_content_con_li{
          width: 100%;
          height:18px;
          font-size:18px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(47,47,47,1);
          line-height: 18px;
          margin: 18px 0 22px 0 ;
        }
      }
    }
  }
</style>
