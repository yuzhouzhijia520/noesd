<template>
    <div class="wf_index_register">
        <indexHearder></indexHearder>
        <el-tabs v-model="activeNameReg" :class="this.$store.state.oemFlag?'wf-oem wf-login':'wf-login'" @tab-click="handleClick">
            <el-tab-pane label="用户注册" name="first">
                <div class="form wf-register-pane">
                    <div class="clear">
                        <div>手机号</div>
                        <el-select v-model="value" placeholder="请选择" class="select-list">
                            <el-option
                            v-for="item in options"
                            :key="item.res"
                            :label="item.res"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <div>
                            <input type="text" placeholder="请输入手机号码" v-model.number="userPhone" @blur="phoneBlur" style="width:200px;margin-left:0;">
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
                        <div>验证码</div>
                        <div class="input_get">
                            <input type="text" placeholder="请输入您的验证码" v-model.number="userYz">
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
                    <div class="clear">
                        <div>密码</div>
                        <div>
                            <input type="password" placeholder="6-20个字符，不包括特殊字符" v-model="userPassword"  @blur="passBlur" @keyup.enter="register">
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
                    <div class="lose" style="display:none">
                        <el-checkbox></el-checkbox>我同意《服务条款》及《法律声明》
                    </div>
                    <div class="login hover_bg" @click="register" >注册</div>
                    <div class="register" @click="login(0)"> <span style="color:#667790">已有账户？</span>直接登录</div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="代理商注册" name="second"  v-if="!this.$store.state.oemFlag">
                <div class="cooperate-form intention_to_join_bg" ref="cooperateForm">
                    <div class="bg_center">
                        <div class="cooperate-form-center center">
                            <div class="blue_rect"></div>
                            <div class="form wf-register-pane">
                                <div class="clear">
                                        <div>手机号</div>
                                        <div>
                                            <input type="text" placeholder="请输入手机号码" v-model.number="userPhone" @blur="phoneBlurProxy">
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
                                        <div class="img" v-show="phoneProxy">
                                            <img src="../../assets/index_img/error.png" alt="">
                                            <span>手机号已经成为代理</span>
                                        </div>
                                        <div class="img" v-show="phoneCorrect">
                                            <img src="../../assets/index_img/correct.png" alt="">
                                        </div>
                                    </div>
                                    <div class="clear">
                                        <div>验证码</div>
                                        <div class="input_get">
                                            <input type="text" placeholder="请输入您的验证码" v-model.number="userYz">
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
                                    <div class="clear">
                                        <div>密码</div>
                                        <div>
                                            <input type="password" placeholder="6-20个字符，不包括特殊字符" v-model="userPassword"  @blur="passBlur" @keyup.enter="userRegister">
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
                                    <div class="lose" style="display:none">
                                        <el-checkbox></el-checkbox>我同意《服务条款》及《法律声明》
                                    </div>
                                    <div class="login hover_bg" @click="userRegister" >立即申请</div>
                                    <div class="register"  @click="login(1)"><span style="color:#667790">已有账户？</span>直接登录</div>
                                </div>
                            </div>
                    </div>
                    <div class="img">
                        <div style="width:100%;">
                            <!-- <img src="../../assets/index_img/bglist.png" alt=""> -->
                        </div>
                    </div>    
                </div>
            </el-tab-pane>
        </el-tabs>
       
        <!-- <indexFooter></indexFooter> -->
        <!-- <div class="copy_box">
            <div class="copy">
                &copy;2018 版权所有 万帆集团旗下,拾久商城 杭州万帆集团 浙ICP备16031604号-4
            </div>
        </div> -->
        <el-footer v-if="this.$store.state.oemFlag">  {{this.$store.state.serverList.data.copyright}}</el-footer>
        <el-footer v-else> &copy;2016 — 2019 版权所有 万帆集团旗下,拾久商城 杭州万帆集团 浙ICP备16031604号-4</el-footer>
    </div>
</template>

<script>
import indexHearder from './index_components/icon_header';
import indexFooter from './index_components/footer';
export default {
    name: 'register',
    components:{
        indexHearder,
        indexFooter
        
      },
    data () {
        return {
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
            phoneProxy:false,
            activeNameReg: 'first',
            options:[],
            value:'+86中国'
        }
    },
    mounted(){
        this.initPage();
        this.getcounrlist()
    },
    methods: {
        selectlits(e){
            console.log(e)
        },
        getcounrlist(){
             this.$axios.post(this.url+'shopsmall/Verification/areaCode').then(res=> {
                console.log(res.data)
                if(res.data.code===200){
                console.log(res.data.data)
                    this.options = res.data.data
                
                }else{
                    //系统异常
                    that.$message.error(res.data.msg);
                }
            })
    
        },
        initPage(){
            let activeNameReg=localStorage.getItem('activeNameReg');
            if(this.$route.query.nameReg&&!this.$route.query.invite_code){
                //优先地址栏
                activeNameReg=this.$route.query.nameReg;
            }
            if(activeNameReg){
                this.activeNameReg=activeNameReg;
            }
        },
        index(){
            this.$router.push({path:'/',name:'index'})
        },
        register(){   //普通用户注册
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
                        
                            this.nameCorrect=true;
                            this.nameError=false;
                            this.nameNull = false
                            let data={};
                            let phone = that.userPhone
                            let phone_type = 0
                            for(var i = 0;i<this.options.length;i++){
                                if(this.value == 1){
                                    phone=this.userPhone
                                    
                                }else{
                                    if(this.options[i].id == this.value){
                                        phone=String(this.options[i].code) +  this.userPhone
                                       
                                    }
                                }
                            }
                            if(this.$store.state.oemFlag){
                                data={
                                    username: that.userName,
                                    phone: phone,
                                    code: that.userYz,
                                    password: that.userPassword,
                                    is_agent:0,
                                   
                                    domain:this.$store.state.domain
                                };
                            }else{
                                if(that.$route.query.invite_code){
                                    data={
                                        username: that.userName,
                                        phone: phone,
                                        code: that.userYz,
                                        
                                        password: that.userPassword,
                                        is_agent:0,
                                        invite_code:that.$route.query.invite_code
                                    };
                                }else{
                                    data={
                                        username: that.userName,
                                        phone: phone,
                                        code: that.userYz,
                                        
                                        password: that.userPassword,
                                        is_agent:0
                                    };
                                }
                            }
                            this.$axios.post(this.url + 'user/platform_user/register',data).then(function (res) {
                                if(res.data.code===200){
                                    that.$message.success('注册成功，您现在可以登录了！');
                                    //设置跳转普通用户页面
                                    localStorage.setItem('activeName','first');
                                    that.$router.push({path:'/wf/index/login',name:'login'})
                                }else{
                                    if( res.data.msg === '验证码错误'){
                                        that.yzNull = false
                                        that.yzCorrect = true
                                    }else{
                                        that.$message.error(res.data.msg)
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
        userRegister(){   //服务商申请
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
                        url: this.url + 'user/platform_user/register',
                        params: {
                            username: that.userName,
                            phone: that.userPhone,
                            code: that.userYz,
                            password: that.userPassword,
                            is_agent:1
                        }
                }).then(function (res) {
                    if(res.data.code===200){
                         that.$message.success('注册成功，您现在可以登录了！');
                        //设置跳转代理商用户页面
                        localStorage.setItem('activeName','second');
                        that.$router.push({path:'/wf/index/login',name:'login'})
                    }else{
                        if( res.data.msg === '验证码错误'){
                            that.yzNull = false
                            that.yzCorrect = true
                        }else{
                            that.$message.error(res.data.msg)
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
        login(e){
            if(e===0){
                //设置跳转普通用户登录页面
                localStorage.setItem('activeName','first');
            }else if(e===1){
                //设置跳转代理商登录页面
                localStorage.setItem('activeName','second');
            }
             this.$router.push({path:'/wf/index/login',name:'login'})
        },
        phoneBlur(){
            this.yzError=false;
            var that=this;
            if(that.userPhone==''){
                that.phoneError = false;
                that.phoneCorrect=false;
                that.phoneLogin=false;
                that.phoneNull = true;
            }else if(typeof(that.userPhone) !=='number'){
              that.phoneError=true;
              that.phoneCorrect=false;
              that.phoneLogin=false;
              that.phoneNull = false;
            } else{
                that.phoneCorrect=true;
                that.phoneError=false;
                that.phoneLogin=false;
                that.phoneNull = false;
            }
        },
        phoneBlurProxy(){
            this.yzError=false;
            var that=this;
            if(that.userPhone==''){
                that.phoneError = false;
                that.phoneCorrect=false;
                that.phoneLogin=false;
                that.phoneNull = true;
            }else if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.userPhone))){
              that.phoneError=true;
              that.phoneCorrect=false;
              that.phoneLogin=false;
              that.phoneNull = false;
            }else{
                //  let data={
                //     useProPhone:this.userPhone
                // }
                // this.$axios.post(this.url+'platform/UserProfile/agent',data).then(function (res) {
                //     if(res.data.code==0){
                        // that.phoneLogin=true;
                        // that.phoneCorrect=false;
                        // that.phoneError=false;
                        // that.phoneNull = false;
                //     }else if(res.data.code==1){
                        // that.phoneProxy=true;
                        // that.phoneCorrect=false;
                        // that.phoneError=false;
                        // that.phoneLogin=false;
                        // that.phoneNull = false;
                //     }else{
                        that.phoneCorrect=true;
                        that.phoneError=false;
                        that.phoneLogin=false;
                        that.phoneNull = false;
                //     }
                // }).catch(function (error) {
                //     that.$notify.error({
                //         title: 'error',
                //         message: error,
                //         duration: 2000
                //     });
                // });
            } 
        },
        passBlur(){
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
        },
        getYz(){   //获取验证码
            if(this.phoneCorrect==true){
                var that=this;
                let useProPhone = this.userPhone
                let phone_type = 0
                for(var i = 0;i<this.options.length;i++){
                    if(this.value == 1){
                        useProPhone=this.userPhone
                        phone_type=0
                    }else{
                        if(this.options[i].id == this.value){
                        console.log(this.options[i].code)
                        useProPhone=String(this.options[i].code) +  this.userPhone
                        phone_type=1
                    }
                    }
                }
                let data= {
                        useProPhone: useProPhone,
                        type:phone_type
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
        },
        handleClick(tab, event){
            this.activeName=tab.name;
            localStorage.setItem('activeNameReg',tab.name);
        }
    }
}
</script>

<style lang="scss">

.wf_index_register{
    padding-top:75px;
    // background: url(http://yanshi.sucaihuo.com/modals/35/3552/demo/images/bg.jpg);
    background:#fff;

    background-size: 100% 100%;
    .select-list{
        width: 120px;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
        border-bottom: none;
        border-right: 1px solid #eee;
        /deep/.el-input__inner{
           width: 110px!important;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;border-bottom: none;
        }
    }
    .el-tabs__nav-wrap.is-top{
        margin: 0 auto;
        width: 169px;
    }
    .el-footer{
        height: 20px !important;
        text-align: center;
        color: #a5a5a5;
        // position: absolute;
        width: 100%;
        bottom: 0;
    }
    .wf-oem{
        .el-tabs__nav-wrap.is-top{
            margin: 0 auto;
            width: 56px;
        }
    }
}
// 中间aa


    
.wf_index_register .form{
    width: 830px;
    margin: 0 auto;
    border-top: 2px solid #0878F9;
    padding-top: 50px;
    padding-bottom: 50px;
    margin-bottom: 70px;
    box-shadow: 0 2px 1px 1px rgba(40, 120, 255, 0.1), 0 2px 3px -1px rgba(0, 0, 0, 0.03);
    transition: box-shadow 0.3s ease-in-out;
    &:hover{
        box-shadow: 0 6px 20px 0px rgba(40, 120, 255, 0.1), 0 2px 3px -1px rgba(0, 0, 0, 0.03);
    }
}
.wf_index_register .form .clear>div:first-child{
    width:250px;
    text-align:right;
    height: 36px;
    line-height: 36px;
    font-weight:400;
    font-size: 14px;
    color: #738299;
}
.wf_index_register .form .clear input{
    // margin-left:160px;
    height: 36px;
    line-height: 36px;
    border: 0;
    border-radius: 0;
    outline: 0;
    padding: 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    padding-left: 10px;
    margin-left: 16px;
    width: 300px;
}
.wf_index_register .form .clear{
    margin-bottom:45px;
}
// .wf_index_register .form .clear .img{
//     height:36px;
//     padding-left: 15px;
// }
.wf_index_register .form .clear img{
    width:16px;
    height:16px;
    display:inline-block;
    // margin-top:10px;
}
.wf_index_register .form .clear .img span{
    margin-top:10px;
    height:16px;
    line-height:16px;
    font-size:12px;
    color:#fa5b5b;
    display:inline-block;
    position: relative;
    // top: -3px;
}
.wf_index_register .lose{
    font-size: 12px;
    color: #4c6083;
    width:280px;
    margin: 0 auto;
    text-align:right;
    cursor:pointer;
}
.wf_index_register .form .clear .input_get input{
    width:180px;
}
.wf_index_register .get{
    text-align: center;
    width: 102px;
    height: 28px;
    line-height: 26px;
    border: 1px solid #a7cfff;
    background-color: #fff;
    color: #4e9fff;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 15px;
}
.wf_index_register .get:hover{
    background-color: #2288fe;
    color: #fff;
    border: 1px solid #2288fe;
}
.wf_index_register .gets{
    text-align: center;
    width: 102px;
    height: 28px;
    line-height: 26px;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #ddd;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 15px;
}
.wf_index_register .login{
    width:280px;
    height: 50px;
    line-height: 50px;
    background-color: #0075ff;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    outline: 0;
    border: 0;
    cursor: pointer;
    margin: 30px auto;
    margin-bottom: 20px;
    
}
.wf_index_register .login:hover{
    background:#2288fe;
}
.wf_index_register .register{
    color: #0075ff;
    // display: inline-block;
    height: 17px;
    // border-bottom: 1px solid #0075ff;
    text-decoration: none;
     width:280px;
    margin: 0 auto;
    text-align:right;
    cursor:pointer;
    display: inline-block;
    margin-left: 410px;
}

.wf_index_register .register:hover{
    color:#56a4ff;
}
.copy_box{
        width: 100%;
        background: #232323;
        margin-top: 10px;
        color: #fff;
        text-align: center;
    }
    .wf-register-pane{
        background: #fff;
    }
    
</style>
