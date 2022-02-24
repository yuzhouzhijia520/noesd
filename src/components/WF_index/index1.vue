<template>
     <div class="wf_index_a">
        <div id="nav_fixed">
            <indexHearder></indexHearder>
        </div>
      <div>
        <!-- banner轮播图 -->
        <div class="WF_banner">
            <div class="banner_center">
                <img src="../../assets/index_img/banner.png" width="100%" alt="">
                <div class="banner_fix" @click="register">立即注册</div>
                <img src="../../assets/index_img/qq.png" width="100%" alt="" class="qq">
            </div>
        </div>
        <div class="WF_width ShiJiu_text">
            <span>拾久——万帆集团旗下平台，专注企业服务
                <span class="blue_num">3</span>年，累计注册用户
                <span class="blue_num">2000</span>万
            </span>
        </div>

        <!-- Our advantage我们的优势 -->
        <div class="advantage_box">
            <div class="WF_width">
                <h2 class="WF_h2">我们的优势</h2>
                <div class="blue_rect"></div>
                <div class="advantage_card_box">
                    <div class="advantage_card">
                        <img src="../../assets/index_img/second_advantage_technology.png" alt="">
                    </div>
                    <div class="advantage_card">
                        <img src="../../assets/index_img/second_advantage_team.png" alt="">
                    </div>
                    <div class="advantage_card">
                        <img src="../../assets/index_img/second_advantage_module.png" alt="">
                    </div>
                    <div class="advantage_card">
                        <img src="../../assets/index_img/second_advantage_marketing.png" alt="">
                    </div>
                </div>
            </div>
        </div>

        <!-- icon图标跳转 -->
        <div class="icon_box">
            <h2 class="WF_h2">让每个人都有驾驭互联网的能力</h2>
            <div class="blue_rect blue_rect1"></div>
            <div class="icons clear">
                <div class="icon">
                    <img src="../../assets/index_img/third_icon_business.png" alt="">
                    <div>电商</div>
                </div>
                <div class="icon">
                    <img src="../../assets/index_img/third_icon_game.png" alt="">
                    <div>小游戏</div>
                </div>
                <div class="icon">
                    <img src="../../assets/index_img/third_icon_information.png" alt="">
                    <div>信息门户</div>
                </div>
                <div class="icon">
                    <img src="../../assets/index_img/third_icon_platform.png" alt="">
                    <div>多商户平台</div>
                </div>
            </div>
            <div class="icons clear">
                <div class="icon">
                    <img src="../../assets/index_img/third_icon_catering.png" alt="">
                    <div>餐饮门店</div>
                </div>
                <div class="icon">
                    <img src="../../assets/index_img/third_icon_makeup.png" alt="">
                    <div>美业</div>
                </div>
                <div class="icon">
                    <img src="../../assets/index_img/third_icon_data.png" alt="">
                    <div>大数据</div>
                </div>
                <div class="icon">
                    <img src="../../assets/index_img/third_icon_intelligent.png" alt="">
                    <div>智能互联</div>
                </div>
            </div>
        </div>

        <!-- Marketing tool营销工具 -->
        <div class="marketing_tool_bg">
            <div class="marketing_tool">
                <h2 class="WF_h2">营销工具</h2>
                <div class="blue_rect blue_rect2"></div>
                <div class="tool_icon_box clear">
                    <div class="tool_icon">
                        <h3>优惠券</h3>
                        <p>最简单直接的方式给你带来满满的粉丝</p>
                    </div>
                    <div class="tool_icon">
                        <h3>分销</h3>
                        <p>提供货源 全民代言人人代销</p>
                    </div>
                    <div class="tool_icon">
                        <h3>秒杀</h3>
                        <p>最简单直接的方式将优惠装进客户的口袋</p>
                    </div>
                </div>
                <div class="tool_icon_box clear">
                    <div class="tool_icon1">
                        <h3>砍价</h3>
                        <p>邀请好友砍价得优惠赢得更多优惠</p>
                    </div>
                    <div class="tool_icon1">
                        <h3>团购</h3>
                        <p>拇指团购将优惠装进客户的口袋</p>
                    </div>
                    <div class="tool_icon1">
                        <h3>会员卡</h3>
                        <p>微时代的会员管理工具</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Business case商家案例 -->
        <div class="business_case">
            <h2 class="WF_h2">商家案例</h2>
            <div class="blue_rect blue_rect3"></div>
            <div class="business_case_box clear">
                <div class="business_case_img">
                    <img src="../../assets/index_img/fifth_case_car.jpg" alt="">
                </div>
                <div class="business_case_img">
                    <img src="../../assets/index_img/fifth_case_education.jpg" alt="">
                </div>
                <div class="business_case_img">
                    <img src="../../assets/index_img/fifth_case_wedding.jpg" alt="">
                </div>
                <div class="business_case_img">
                    <img src="../../assets/index_img/fifth_case_house.jpg" alt="">
                </div>
            </div>
            <div class="business_case_box clear" style="margin-top:30px;">
                <div class="business_case_img">
                    <img src="../../assets/index_img/fifth_case_financial.jpg" alt="">
                </div>
                <div class="business_case_img">
                    <img src="../../assets/index_img/fifth_case_jewelry.jpg" alt="">
                </div>
                <div class="business_case_img">
                    <img src="../../assets/index_img/fifth_case_tourism.jpg" alt="">
                </div>
                <div class="business_case_img">
                    <img src="../../assets/index_img/fifth_case_home.jpg" alt="">
                </div>
            </div>

            <!-- Access process接入流程 -->
            <div class="access_process_box">
                <h2 class="WF_h2">接入流程</h2>
                <div class="blue_rect"></div>
                <div class="access_process_img">
                    <img src="../../assets/index_img/sixth_tutorial_section.png" alt="">
                </div>
            </div>
        </div>

        <!--Intention to join 意向加盟 -->
        <div class="intention_to_join_bg">
            <div class="bg_center">
                <div class="center">
                    <h2 class="WF_Join">选择拾久微信小程序，让每一位客户满意</h2>
                    <div class="clear">
                        <div>姓名</div>
                        <div>
                            <input type="text" placeholder="请输入你的姓名，不包括特殊字符且1-20位" v-model="userName" @blur="inputName">
                        </div>
                    </div>
                    <div class="ts">
                        <div v-show="nameNull">请填写姓名</div>
                        <div v-show="nameError">姓名不能包含特殊字符且1-20位</div>
                    </div>
                    <div class="clear">
                        <div>联系方式</div>
                        <div>
                            <input type="text" placeholder="请输入你的手机号" v-model="userPhone" @blur="inputPhone">
                        </div>
                    </div>
                    <div class="ts">
                        <div v-show="contactNull">请填写手机号</div>
                        <div v-show="contactError">手机号错误</div>
                    </div>
                    <div @click="submit" class="submit">提交</div>
                </div>
            </div>
            <div class="img">
                <div style="width:100%;">
                    <img src="../../assets/index_img/bglist.png" alt="">
                </div>
            </div>    
                
          
        </div>

        <!-- about us关于我们 -->
        <div class="about_us">
            <h2 class="WF_h2">关于我们</h2>
            <div class="blue_rect blue_rect3"></div>
            <div class="about_us_container clear">
                <div class="about_us_container_left">
                    <img src="../../assets/index_img/seventh_about us_photos.jpg" alt="">
                </div>
                <div class="about_us_container_right">
                    <p>杭州万帆网络科技有限公司成立于2016年7月14日，注册资金1亿，位于浙江省杭州市余杭区，
                        另设分部位于山西侯马、山西曲沃等地。公司通过自主研发的网络技术，独创的新型商业模
                        式，为客户量身定制新思维、新理念、新方式，助力客户快速实现线上线下一体化的营销模式。
                    </p>
                    <p>
                        万帆科技致力于为个人及企事业单位建立自己独立的线上交易平台。公司拥有高端服务器，
                        为客户提供人工服务、国际顶级域名注册、企业邮箱、网站建设、手机APP、微信分销商场、
                        微信小程序、智慧餐厅等、其他微信相关服务程序开发；及网站推广的一站式服务。
                    </p>
                </div>
            </div>
        </div>
      </div>
      <indexFooter></indexFooter>
      <service></service>
    </div>
</template>

<script >
import indexHearder from './index_components/header';
import indexFooter from './index_components/footer';
import service from './index_components/service';
export default {
  name: 'index',
  components:{
        indexHearder,
        indexFooter,
        service
      },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      labelPosition: 'left',
      userName:'',
      userPhone:'',
      nameNull: false,
      nameError: false,
      contactNull: false,
      contactError: false
    }
  },
  created: function () {
  },
  methods:{
    handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    },
    submit() {
        let that = this
        // console.log(11111)
        if(this.userName==''){
            // console.log(222)
            this.nameNull=true;
        }
        if(this.userPhone==''){
            this.contactNull=true;
        }
        if(this.userName!=''&&this.userPhone!=''){
            // console.log(11)
            if(!(/^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/.test(this.userName))){
                    this.nameNull = false
                    this.nameError = true
            }else{
                this.nameNull = false
                this.nameError = false
            }
           if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.userPhone))){
                    this.contactNull = false
                    this.contactError = true
            }else{
                this.contactNull = false
                this.contactError = false
            }
            if(/^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/.test(this.userName)&&/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.userPhone)){
               this.$axios.get(this.url+'platform/UserProfile/abnormal?useProName='+this.userName+'&useProPhone='+this.userPhone).then(function (res) {
                    that.$message({
                    showClose: true,
                    message: '恭喜你，提交成功',
                    type: 'success'
                    });
                    
                    that.userName='';
                    that.userPhone='';
                    that.nameNull=false;
                    that.nameError=false;
                    that.contactNull=false;
                    that.contactError=false;
                    // alert('已提交')
                })
                .catch(function (error) {
                    // console.log(error);
                });
            }
        }
            
        
    },
    inputName(){
        if(!(/^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/.test(this.userName))){
            // this.nameError = true
            if(this.userName==''){
                this.nameNull =false
            this.nameError = false
            }else{
                this.nameNull = false
                this.nameError = true
            }
        }else{
            this.nameNull = false
            this.nameError = false
        }
    },
    inputPhone(){
        if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.userPhone))){
            if(this.userPhone==''){
                this.contactNull = false
                this.contactError = false
            }else{
                this.contactNull = false
                this.contactError = true
            }
        }else{
            this.contactNull = false
            this.contactError = false
        }
    },
    register(){
        this.$router.push({path:'/wf/index/register',name:'register'})
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    .el-aside {
      color: #333;
    }
  }
.WF_banner{
    width: 100%;
    background: url(../../assets/index_img/bannerbg.png) no-repeat;
    // padding: 83px 0;
    // padding-top:46px;
    // padding-bottom:96px;
    height:500px;
    margin-top:72px;
    .banner_center{
        display: block;
        width: 1220px;
        // height: 541px;
        margin:0 auto;
        position:relative;
        top: 76px;
        .banner_fix{
            position:absolute;
            bottom:5px;
            z-index:50;
            width:114px;
            height:44px;
            border-radius:22px;
            background:#fff;
            font-size:18px;
            text-align:center;
            line-height:44px;
            color:#0076fe;
            cursor:pointer;
        }
        .banner_fix:hover{
            color:#56a4ff;
        }
        .qq{
            position:absolute;
            z-index:50;
            bottom: -100px;
            right: -130px;
            height:234px;
            width:524px;
        }
    }

}
.ShiJiu_text{
  width: 1220px;
  margin: 0 auto;
    color: #5B5B5B;
    font-size: 20px;
    padding: 40px 0;
    font-size: 18px;
    padding: 24px 0;
}
.ShiJiu_text .blue_num{
    color: #0076FE;
    font-size: 24px;
}
.el-form-item__label{
  font-size: 24px;
  width: 150px !important;
}
/* Our advantage我们的优势 */
.advantage_box{
    width: 100%;
    background: #F8F8F8;
    padding: 79px 0 108px 0;
    padding: 80px 0 50px 0;
}
.WF_h2{
    color: #2B2B2B;
    font-size: 40px;
    font-size: 32px;
    text-align: center;
    font-weight: 500;
}
.blue_rect{
    width: 120px;
    width: 100px;
    height: 4px;
    background: #0076FE;
    border-radius: 2px;
    margin: 0 auto;
    margin-top: 35px;
    margin-top: 20px;
}
.advantage_card_box{
    margin: 0 auto;
    height: 400px;
    width: 1220px;
    margin-top: 41px;
    margin-top: 81px;
}
.advantage_card{
    width: 280px;
    // height: 100%;
    height: 350px;
    float: left;
}
.advantage_card_box>div:first{
  margin-left:10px;
}
.advantage_card_box>div:first-child~div{
  margin-left:30px;
}
.advantage_card img{
    width: 100%;
    height: 100%;
}
/* // icon图标跳转 */
.icon_box{
    width: 1220px;
    padding: 101px 0 142px 0;
    padding: 80px 0 25px 0;
    margin: 0 auto;
}
// .icons{
    // width: 1278px;
    // margin: 0 auto;
// }
.blue_rect1{
    margin-bottom: 115px;
    margin-bottom: 80px;
}
.icon{
    text-align: center;
    margin-right: 278px;
}
.icon:last-child{
    margin-right: 0;
}
.icons{
    padding-bottom: 75px;
}
/* Marketing tool营销工具 */
/* .marketing_tool_bg{} */
.marketing_tool_bg{
    width: 100%;
    height: 965px;
    height: 860px;
    background-color: #F8F8F8;
    padding-bottom: 20px;
}
.marketing_tool{
    width: 1220px;
    margin: 0 auto;
    height: 200px;
    padding-top: 80px;
}
.blue_rect2{
    margin-bottom: 75px;
    margin-bottom: 80px;
}
.tool_icon_box{
    width: 1220px;
    width: 930px;
    margin: 0 auto;
    margin-bottom: 23px;
    margin-bottom: 30px;
}
.tool_icon,.tool_icon1{
    width: 380px;
    height: 360px;
    width: 290px;
    height: 268px;
    background: #fff;
    float: left;
    margin-right: 30px;
    text-align: center;
}
.tool_icon h3{
    font-size: 30px;
    margin-top: 210px;
    font-size: 26px;
    margin-top: 130px;
    margin-bottom: 22px;
    font-weight: 500;
}
.tool_icon1 h3{
   font-size: 30px;
   margin-top: 188px;
   font-size: 26px;
   margin-top: 130px;
   margin-bottom: 22px;
   font-weight: 500;
 }
.tool_icon p,.tool_icon1 p{
    margin: 0 auto;
    color: #474747;
    color: #666;
    width: 162px;
    font-size: 18px;
    font-size: 16px;
}
.tool_icon,.tool_icon1{
    background-position: -48px -50px!important;
    box-shadow: 0 0 0 0 rgba(40, 120, 255, 0.1), 0 2px 3px -1px rgba(0, 0, 0, 0.03);
    transition: box-shadow 0.3s ease-in-out;
}
.tool_icon:hover,.tool_icon1:hover{
    box-shadow: 0 6px 20px 0px rgba(40, 120, 255, 0.1), 0 2px 3px -1px rgba(0, 0, 0, 0.03);
}
    
.tool_icon:nth-child(1){
    background: url(../../assets/index_img/fourth_tools_coupons.png) no-repeat;
}
.tool_icon:nth-child(2){
    background: url(../../assets/index_img/fourth_tools_distribution.png) no-repeat;
}
.tool_icon:nth-child(3){
    background: url(../../assets/index_img/fourth_tools_kill.png) no-repeat;
}
.tool_icon1:nth-child(1){
  background: url(../../assets/index_img/fourth_tools_bargain.png) no-repeat;
}
.tool_icon1:nth-child(2){
  background: url(../../assets/index_img/fourth_tools_buy.png) no-repeat;
}
.tool_icon1:nth-child(3){
  background: url(../../assets/index_img/fourth_tools_member.png) no-repeat;
}
.tool_icon:last-child,.tool_icon1:last-child{
    margin-right: 0;
}

/* Business case商家案例 */
.business_case{
    width: 1220px;
    margin: 0 auto;
    padding: 110px 0 187px 0;
    padding: 80px 0 100px 0;
}
.blue_rect3{
    margin-bottom: 97px;
    margin-bottom: 80px;
}
// .business_case_box{
//     width: 1391px;
//     margin: 0 auto;
//     margin-bottom: 11px;
// }
.business_case_img{
    float: left;
    width: 280px;
    height: 280px;
}
.business_case_img img{
    width: 100%;
    height: 100%;
}
.business_case_box .business_case_img:nth-child(1){
    margin-right: 30px;
    margin-left: 5px;
}
.business_case_box .business_case_img:nth-child(2){
    margin-right: 30px;
}
.business_case_box .business_case_img:nth-child(3){
    margin-right: 30px;
}
.business_case_box
    .case_bottom{
    margin-bottom:30px;
    }
/* Access process接入流程 */
.access_process_box{
    width: 100%;
    padding-top: 145px;
    padding-top: 100px;
}
.access_process_img{
    width: 1191px;
    width: 1158px;
    margin: 0 auto;
    margin-top: 105px;
}
.access_process_img img{
    width: 100%;
    height: 100%;
}

/* 意向加盟 */
.intention_to_join_bg{
    width: 100%;
    background: #0076FE;
    // padding: 95px 0 79px 0;
    height: 550px;
    color: #fff;
    position: relative;;
  .bg_center{
        position: absolute;
        top:0;
        width: 100%;
        z-index:50;
        .center{
            width:1220px;
            margin:0 auto;
            .WF_Join{
                font-size: 32px;
                font-weight: 500;
                text-align: center;
                margin-bottom:96px;
                margin-top:96px;
                margin-bottom:80px;
                margin-top:80px;
            }
            .clear{
                height:66px;
                height:60px;
                margin-left:310px;
                div:first-child{
                     font-size:20px;
                     height:46px;
                     width:135px;
                     line-height:46px;  
                     color:#fff; 
                }
                input{
                        font-size: 16px;
                        height: 44px;
                        width: 430px;
                        line-height: 44px;
                        color: #fff;
                        padding-left: 30px;
                        border-radius: 4px;
                        background: rgba(0, 0, 0, 0);
                        border: 1px solid #fff;
                        margin: auto;
                }
                input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                    color:    #fff;
                    opacity: .6;
                }
                input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color:    #fff;
                    opacity: .6;
                    // opacity:  1;/
                }
                input::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color:    #fff;
                    opacity: .6;
                }
                input:-ms-input-placeholder { /* Internet Explorer 10-11 */
                    color:    #fff;
                    opacity: .6;
                }
            }
        }
        .submit:hover{
            color:#2288fe;
        }
        .submit{
            height:56px;
            width:660px;
            background:#fff;
            color:rgba(0,118,254,.7);
            font-size:30px;
            font-size:24px;
            text-align:center;
            line-height:56px;
            // margin:0 atuo;
            margin-left:280px;
            border-radius:4px;
            cursor:pointer;
        }
        .ts{
            height:40px;
            margin-left:246px;
            padding-left:200px;
            div{
                color:#ff7477;
            }
        }
    // height:1220px;
    // margin:0 auto;
  }
  .img{
        width: 100%;
        height: 200px;
        position: absolute;
        bottom:0;
        overflow:hidden;

        
  }
}
.intention_to_join{
    width: 1400px;
    margin: 0 auto;
}
.WF_Join{
    font-size: 40px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 85px;
}
.el-input{
  width: 400px;
  height: 66px;
}
.el-form-item__label{
  width: 150px;
}
.WF_Form{
  margin: auto;
  width: 700px;
}
.WF_Form input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #fff;
}
.WF_Form input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #fff;
   opacity:  1;
}
.WF_Form input::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    #fff;
   opacity:  1;
}
.WF_Form input:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    #fff;
}
.WF_Form input{
    color: #fff;
    border-color: #fff;
    background-color: rgba(0, 0, 0, 0);
}
.el-form-item.is-required{
    margin-bottom: 50px;
}
.WF_Form input:hover,.WF_Form input:focus{
    border-color: #fff;
    background-color: rgba(0, 0, 0, 0);
}
.WF_Form label{
    color: #fff;
}
.WF_Submit{
  width: 100%;
  border: 0;
  color: #0076FE;
}

/* about us关于我们 */
.about_us{
    width: 1220px;
    margin: 0 auto;
    padding: 105px 0 101px 0;
    padding: 80px 0 100px 0;
}
.about_us_container{
    width: 100%;
}
.about_us_container_left img{
    width: 100%;
    height: 100%;
}
.about_us_container_right{
    float: right!important;
    margin-top: 50px;
}
.about_us_container_right p{
    width: 655px;
    text-indent: 2em;
    line-height: 34px;
}
</style>
