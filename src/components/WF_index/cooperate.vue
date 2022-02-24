<template>
    <div class="wf_index_a cooperate">
        <div id="nav_fixed">
            <indexHearder></indexHearder>
        </div>
        <div class="wf_cooperate_m">
            <div class="WF_banner">
                <div class="banner_center">
                    <b-img :src='backimg.backimg_qq_font' alt="" class="qq_font"/>
                    <b-img :src='backimg.backimg_qq'  alt="" class="qq"/>
                    <b-img :src='backimg.backimg_qq_3' alt="" class="qq_3"/>
                    <div class="cooperate-button"> <el-button @click="join" type="primary">立即加盟</el-button></div>
                    <span class="cooperate-tel">电话:0571-88731107</span>
                   
                </div>
            </div>

        <!--加盟优势 -->
            <div  class="vuebootsrtap-card">
                <div >
                    <h2 class="WF_h2">加盟优势</h2>
                    <div class="blue_rect blue_rect2"></div>
                     <b-card-group deck>
                        <b-card title="回报高"
                                :img-src="backimg.backimg_card_1"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 20rem;max-height: 24rem;"
                                class="mb-2">
                            <p class="card-text">
                            让利于伙伴，巨大利润空间
                            </p>
                        </b-card>
                        <b-card title="门槛低"
                                :img-src="backimg.backimg_card_2"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 20rem;max-height: 24rem;"
                                class="mb-2">
                            <p class="card-text">
                            团队要求少无需任何技术投入
                            </p>
                        </b-card>
                        <b-card title="技术强"
                                :img-src="backimg.backimg_card_3"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 20rem;max-height: 24rem;"
                                class="mb-2">
                            <p class="card-text">
                            BAT级产品研发团队
                            </p>
                        </b-card>
                    </b-card-group>
                     <b-card-group deck>
                        <b-card title="回报高"
                                :img-src="backimg.backimg_card_4"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 20rem;max-height: 24rem;"
                                class="mb-2">
                            <p class="card-text">
                            零代理费，渔村有保障
                            </p>
                        </b-card>
                        <b-card title="代运营"
                                :img-src="backimg.backimg_card_5"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 20rem;max-height: 24rem;"
                                class="mb-2">
                            <p class="card-text">
                            阿里项目媒体运营团队专业支持
                            </p>
                        </b-card>
                        <b-card title="增值广"
                                :img-src="backimg.backimg_card_6"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 20rem;max-height: 24rem;"
                                class="mb-2">
                            <p class="card-text">
                            高端定制多想增值服务提供
                            </p>
                        </b-card>
                    </b-card-group>
                </div>
            </div>

            <!-- 合作加盟支持 -->
            <div class="business_case">
                <h2 class="WF_h2">合作加盟支持</h2>
                <div class="blue_rect blue_rect3"></div>
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col>
                            <b-media tag="li">
                                <b-img slot="aside" :src="backimg.backimg_cooperate_1" alt="营销支持" />
                                <h5 class="mt-0 mb-1">营销支持</h5>
                                <p class="business_case_font">提供专属市场营销方案、区域活动策划方案、团队销售激励方案、大客户协助开发等多项业务支持</p>
                            </b-media>
                        </b-col>
                        <b-col>
                            <b-media tag="li">
                                <b-img slot="aside" :src="backimg.backimg_cooperate_2" alt="技术支持" />
                                <h5 class="mt-0 mb-1">技术支持</h5>
                                <p class="business_case_font">7*24提供技术服务，私人定制技术支持，行业区域特定功能开发支持</p>
                            </b-media>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-media tag="li">
                                <b-img slot="aside" :src="backimg.backimg_cooperate_3" alt="活动支持" />
                                <h5 class="mt-0 mb-1">活动支持</h5>
                                <p class="business_case_font">会展活动人员物料支持，方案策划执行，现场销售支持</p>
                            </b-media>
                        </b-col>
                        <b-col>
                            <b-media tag="li">
                                <b-img slot="aside" :src="backimg.backimg_cooperate_4" alt="物料支持" />
                                <h5 class="mt-0 mb-1">物料支持</h5>
                                <p class="business_case_font">提供合作授铭牌、产品服务宣传册、商户陈列宣传材料等多项物料支持</p>
                            </b-media>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-media tag="li">
                                <b-img slot="aside" :src="backimg.backimg_cooperate_5" alt="培训支持" />
                                <h5 class="mt-0 mb-1">培训支持</h5>
                                <p class="business_case_font">合作伙伴完整培训方案，定期培训活动会务，线上远程培训内容输出</p>
                            </b-media>
                        </b-col>
                        <b-col>
                            <b-media tag="li">
                                <b-img slot="aside" :src="backimg.backimg_cooperate_6" alt="团队支持" />
                                <h5 class="mt-0 mb-1">团队支持</h5>
                                <p class="business_case_font">团队技术、销售人员输出，人事招聘、管理培训务商提供人才支持。</p>
                            </b-media>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
            <!--加盟流程 -->
            <div class="access_process_box">
                    
                    <b-card overlay
                            :img-src="backimg.backimg_flow_bg"
                            img-alt="Card Image"
                            text-variant="white">
                        <b-container class="bv-example-row">
                            <h2 class="WF_h2">加盟流程</h2>
                            <div class="blue_rect"></div>
                            <b-row class="flow-row">
                                <b-col>
                                    <b-img :src="backimg.backimg_flow_1"  alt="申请加盟"></b-img>
                                    <b-row>
                                        <b-col >01</b-col>
                                        <b-col cols="8">申请加盟</b-col>
                                    </b-row>
                                </b-col>
                                <b-col>
                                    <b-img :src="backimg.backimg_flow_2"  alt="签订协议"></b-img>
                                    <b-row>
                                        <b-col >02</b-col>
                                        <b-col cols="8">签订协议</b-col>
                                    </b-row>
                                </b-col>
                                <b-col>
                                    <b-img :src="backimg.backimg_flow_3"  alt="业务培训"></b-img>
                                    <b-row>
                                        <b-col >03</b-col>
                                        <b-col cols="8">业务培训</b-col>
                                    </b-row>
                                </b-col>
                                <b-col>
                                    <b-img :src="backimg.backimg_flow_4"  alt="开始赚钱"></b-img>
                                    <b-row>
                                        <b-col >04</b-col>
                                        <b-col cols="8">开始赚钱</b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-card>
            </div>

            <!--Intention to join 意向加盟 -->
            <div class="cooperate-form intention_to_join_bg" ref="cooperateForm">
                <div class="bg_center">
                    <div class="cooperate-form-center center">
                        <h2 class="WF_Join">申请成为代理商</h2>
                        <div class="blue_rect"></div>
                        <div class="form">
                                <div class="clear">
                                    <div>昵称</div>
                                    <div>
                                        <input type="text" placeholder="请输入你的昵称，不包括特殊字符且1-20位" v-model="userName"  @blur="nameBlur">
                                    </div>
                                    <div class="img"  v-show="nameError">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>昵称错误，请输入正确的昵称</span>
                                    </div>
                                    <div class="img"  v-show="nameNull">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>昵称未填写</span>
                                    </div>
                                    <div class="img" v-show="nameCorrect">
                                        <img src="../../assets/index_img/correct.png" alt="">
                                    </div>
                                </div>
                                <div class="clear">
                                    <div>手机号</div>
                                    <div>
                                        <input type="text" placeholder="请输入手机号码" v-model.number="userPhone" @blur="phoneBlur">
                                    </div>
                                    <div class="img" v-show="phoneError">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>手机号错误，请输入正确的手机号</span>
                                    </div>
                                    <div class="img" v-show="phoneNull">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>手机号未填写</span>
                                    </div>
                                    <div class="img" v-show="phoneLogin">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>手机号已注册，请直接登录</span>
                                    </div>
                                    <div class="img" v-show="phoneCorrect">
                                        <img src="../../assets/index_img/correct.png" alt="">
                                    </div>
                                </div>
                                <div class="clear">
                                    <div>密码</div>
                                    <div>
                                        <input type="password" placeholder="6-20个字符，不包括特殊字符" v-model="userPassword"  @blur="passBlur">
                                    </div>
                                    <div class="img"  v-show="passError">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>密码错误，请输入正确的密码</span>
                                    </div>
                                    <div class="img" v-show="passNull">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>密码未填写</span>
                                    </div>
                                    <div class="img" v-show="passCorrect">
                                        <img src="../../assets/index_img/correct.png" alt="">
                                    </div>
                                </div>
                                <div class="clear">
                                    <div>验证码</div>
                                    <div class="input_get">
                                        <input type="text" placeholder="请输入您的验证码" v-model.number="userYz"  @blur="yzBlur">
                                    </div>
                                    <div class="get" @click="getYz" v-show="yzShow">获取验证码</div>
                                    <div class="gets"  v-show="!yzShow">已发送（{{yzNumber}}s）</div>
                                    <div class="img"  v-show="yzError">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>请输入正确的手机号</span>
                                    </div>
                                    <div class="img" v-show="yzCorrect">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>验证码错误，请输入正确的验证码</span>
                                    </div>
                                    <div class="img" v-show="yzNull">
                                        <img src="../../assets/index_img/error.png" alt="">
                                        <span>验证码未填写</span>
                                    </div>
                                </div>
                            
                                <div class="lose" style="display:none">
                                    <el-checkbox></el-checkbox>我同意《服务条款》及《法律声明》
                                </div>
                                <div class="login hover_bg" @click="userRegister">立即申请</div>
                            </div>
                        </div>
                </div>
                <div class="img">
                    <div style="width:100%;">
                        <img src="../../assets/index_img/bglist.png" alt="">
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
      backimg:{
        backimg_qq_font: require('../../assets/index_img/bannerCooperate_font.png'),
        backimg_qq:require('../../assets/index_img/bannerCooperate_icon.png'),
        backimg_qq_3:require('../../assets/index_img/bannerCooperate_3.png'),
        backimg_card_1:require('../../assets/index_img/card/card_1.png'),
        backimg_card_2:require('../../assets/index_img/card/card_2.png'),
        backimg_card_3:require('../../assets/index_img/card/card_3.png'),
        backimg_card_4:require('../../assets/index_img/card/card_4.png'),
        backimg_card_5:require('../../assets/index_img/card/card_5.png'),
        backimg_card_6:require('../../assets/index_img/card/card_6.png'),
        backimg_cooperate_1:require('../../assets/index_img/cooperate/cooperate_1.png'),
        backimg_cooperate_2:require('../../assets/index_img/cooperate/cooperate_2.png'),
        backimg_cooperate_3:require('../../assets/index_img/cooperate/cooperate_3.png'),
        backimg_cooperate_4:require('../../assets/index_img/cooperate/cooperate_4.png'),
        backimg_cooperate_5:require('../../assets/index_img/cooperate/cooperate_5.png'),
        backimg_cooperate_6:require('../../assets/index_img/cooperate/cooperate_6.png'),
        backimg_flow_bg:require('../../assets/index_img/flow/flow_bg.png'),
        backimg_flow_1:require('../../assets/index_img/flow/flow_1.png'),
        backimg_flow_2:require('../../assets/index_img/flow/flow_2.png'),
        backimg_flow_3:require('../../assets/index_img/flow/flow_3.png'),
        backimg_flow_4:require('../../assets/index_img/flow/flow_4.png'),
      },
      labelPosition: 'left',
      nameError: false,
      contactNull: false,
      contactError: false,
      //申请为代理商
      userPhone:'',
            userPassword:'',
            userYz:'',
            userName:'',
            phoneError:false,
            phoneCorrect:false,
            passError:false,
            passCorrect:false,
            yzError:false,
            yzCorrect:false,
            nameError:false,
            nameCorrect:false,
            yzNumber:60,
            yzShow:true,
            phoneLogin:false,
            phoneNull: false,
            passNull: false,
            nameNull: false,
            yzNull: false,
            is_agent:1
    }
  },
  created: function () {
      
  },
  mounted(){
      this.join1();
        
     
  },
  methods:{
        join1(){
            this.$nextTick(() => {
                if(this.$route.query.is_register===0){
                    this.$refs.cooperateForm.scrollIntoView();
                }
            })
        },
        join(){
            this.$refs.cooperateForm.scrollIntoView();
        },
        index(){
            this.$router.push({path:'/',name:'index'})
        },
        userRegister(){   //注册
            var that=this;
         if(that.userPhone === ''){
           that.phoneNull = true
           that.phoneError = false
           that.phoneLogin = false
           that.phoneCorrect = false
         }else{
           if(that.userPassword === ''){
             that.passNull = true
             that.passError = false
             that.passCorrect = false
           }else{
             if(that.userYz === ''){
               that.yzError = false
               that.yzCorrect = false
               that.yzNull = true
             }else{
               if(that.userName === ''){
                    that.nameNull = true
                    that.nameError = false
                    that.nameCorrect = false
               }else{
                    this.$axios({
                        methods: 'post',
                        url: this.url + 'platform/UserProfile/register',
                        params: {
                            useProName: that.userName,
                            useProPhone: that.userPhone,
                            verify: that.userYz,
                            useProPassword: that.userPassword,
                            is_agent:that.is_agent
                        }
                }).then(function (res) {
                    if(res.data.code==1){
                        that.$notify.success({
                            title: 'success',
                            message: '注册成功，您现在可以登录了！',
                            duration: 2000
                        });
                        //设置跳转代理商用户页面
                        localStorage.setItem('activeName','second');
                        that.$router.push({path:'/wf/index/login',name:'login'})
                    }else{
                        if( res.data.msg === '验证码错误'){
                            that.yzNull = false
                            that.yzCorrect = true
                        }
                    }
                }).catch(function (error) {
                    that.$notify.error({
                        title: 'error',
                        message: error,
                        duration: 2000
                    });
                });
               }
             }
           }


         }
        },
        login(){
            this.$router.push({path:'/wf/index/login',name:'index'})
        },
        phoneBlur(){
            this.yzError=false;
            var that=this;
            if(that.userPhone==''){
                that.phoneError = false;
                that.phoneCorrect=false;
                that.phoneLogin=false;
                that.phoneNull = true
            }else if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.userPhone))){
              that.phoneError=true;
              that.phoneCorrect=false;
              that.phoneLogin=false;
              that.phoneNull = false
            } else{
                this.$axios.post(this.url+'platform/UserProfile/agent','useProPhone='+this.userPhone).then(function (res) {
                    if(res.data.code==1){
                        that.phoneLogin=true;
                        that.phoneCorrect=false;
                        that.phoneError=false;
                        that.phoneNull = false
                    }else{
                     that.phoneCorrect=true;
                     that.phoneError=false;
                     that.phoneLogin=false;
                     that.phoneNull = false
                    }
                    // console.log(res);
                })
                .catch(function (error) {
                    // console.log(error);
                });
            }
            // console.log(this.userPhone)
        },
        passBlur(){
            // console.log(this.userPassword)
            if(this.userPassword==''){
                this.passError=false;
                this.passCorrect=false;
                this.passNull = true;
            }else if(!(/^[A-Za-z0-9]{6,20}$/.test(this.userPassword))){ 
                this.passError=true;
                this.passNull = false;
                this.passCorrect=false;
            } else{
                this.passCorrect=true;
                this.passNull = false;
                this.passError=false;
            }
        },
        yzBlur(){
        },
        nameBlur(){
            if(this.userName==''){
                this.nameCorrect=false;
                this.nameError=false;
                this.nameNull = true
            }else if(!(/^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/.test(this.userName))){ 
                this.nameError=true;
                this.nameNull = false
                this.nameCorrect=false;
            } else{
                this.nameCorrect=true;
                this.nameError=false;
                this.nameNull = false
            }
            // console.log(this.userName)
        },
        getYz(){   //获取验证码
            if(this.phoneCorrect==true){
                var that=this;
                let data= {
                        useProPhone: this.userPhone
                    };
                this.$axios.post(this.url + 'platform/UserProfile/sms',data).then(function (res) {
                    if(res.data.code==1){
                        that.yzShow=false;
                        var timer = null;
                        function test(){
                            that.yzNumber--;
                            if(that.yzNumber<=0){
                                clearInterval(timer);
                                that.yzNumber=60;
                                that.yzShow=true;    //是否可点击
                            }
                        }
                        timer = setInterval(test, 1000);
                    }
                })
            }
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/styles/components/css_WF_index/cooperate.scss'
</style>
