<template>
    <div class="wf_index_register">
        <indexHearder></indexHearder> 
        <div class="login_data">
            <!-- <span class="interval">注册用户 <span class="big_font">16,670,498</span>+</span>
            <span class="interval">安全运行 <span class="big_font">2882天</span>+</span>
            <span class="interval">覆盖行业 <span class="big_font">100</span>+</span> -->
        </div>

        <div class="form">
            <div v-show="show">
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
                        <span>手机号未注册，请输入正确的手机号</span>
                    </div>
                    <div class="img" v-show="phoneErrors">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>手机号格式不正确</span>
                    </div>
                    <div class="img" v-show="phoneLogin">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>手机号不能为空</span>
                    </div>
                    <div class="img" v-show="phoneCorrect">
                        <img src="../../assets/index_img/correct.png" alt="">
                    </div>
                </div>
                <div class="clear">
                    <div>验证码</div>
                    <div class="input_get">
                        <input type="text" placeholder="请输入您的验证码" v-model.number="userYz"  @blur="yzBlur">
                    </div>
                    <div class="get" @click="getYz" v-show="yzShow">获取验证码</div>
                    <div class="gets" v-show="!yzShow">已发送（{{yzNumber}}s）</div>
                    <!-- <div class="img"  v-show="yzError">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>请输入正确的手机号</span>
                    </div> -->
                    <div class="img" v-show="yzCorrect">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>验证码错误，请输入正确的验证码</span>
                    </div>
                    <div class="img" v-show="yzNull">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>不能为空</span>
                    </div>
                </div>
                <div class="clear">
                    <div>新密码</div>
                    <div>
                        <input type="password" placeholder="6-20个字符，不包括特殊字符" @blur="userPass" v-model="userPword">
                    </div>
                    <div class="img" v-show="pwordError">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>两次密码不一样</span>
                    </div>
                    <div class="img" v-show="pwordNull">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>不能为空</span>
                    </div>
                    <div class="img" v-show="pwordChongfu">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>6-20个字符，不包括特殊字符</span>
                    </div>
                     <div class="img" v-show="pwordCorrect">
                        <img src="../../assets/index_img/correct.png" alt="">
                    </div>
                </div>
                <div class="clear">
                    <div>确认密码</div>
                    <div>
                        <input type="password" placeholder="6-20个字符，不包括特殊字符" @blur="newUserPass" v-model="newUserPword">
                    </div>
                    <div class="img" v-show="nPwordError">
                        <img src="../../assets/index_img/error.png" alt="">
                        <span>不能为空</span>
                    </div>
                    <div class="img" v-show="nPwordCorrect">
                        <img src="../../assets/index_img/correct.png" alt="">
                    </div>
                </div>
                <div class="login" @click="reset_end">重置</div>
            </div>
            <div class="reset_success" v-show="!show">
                <div>
                    <img src="../../assets/index_img/gou.png" alt=""> 
                    <span>你的密码已经重置成功</span>
                </div>
                <div>你的昵称：{{user_name}}</div>
                <div>你的账号：{{userPhone}}</div>
                <div @click="login">{{login_number}}s后自动  <span>登录</span> </div>
            </div>
        </div>
        <el-footer v-if="this.$store.state.oemFlag"> <hr> {{this.$store.state.serverList.data.copyright}}</el-footer>
        <el-footer v-else> <hr>&copy;2016 — 2019 版权所有 万帆集团旗下,拾久商城 杭州万帆集团 浙ICP备16031604号-4</el-footer>
        <!-- <indexFooter></indexFooter> -->
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
            show:true,
            userPhone:'',
            userYz:'',
            phoneError:false,
            phoneCorrect:false,
            phoneLogin:false,
            phoneErrors:false,
            yzError:false,
            yzCorrect:false,
            yzNumber:60,
            login_number: 5,
            user_name: '',
            yzShow:true,
            yzNull:false,
            userPword:'',
            newUserPword:'',
            pwordCorrect:false,
            pwordError:false,
            pwordNull: false,
            pwordChongfu:false,
            nPwordCorrect:false,
            nPwordError:false,
            nPwordNull: false,
             options:[],
            value:'+86中国'
        }
    },
     mounted(){
       
        this.getcounrlist()
        console.log(this.value)
    },
    methods: {
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
        checkedChange: function(){
            if(this.checked == 'checked'){
                this.checked = ''
            }else{
                this.checked = 'checked';
            }
        },
        index(){
            this.$router.push({path:'/',name:'index'})
        },
        reset_end(){
            console.log(11)
            if(this.userPhone==''){
                this.phoneError=false;
                this.phoneLogin=true;
            }
            // console.log(this.userYz)
            if(this.userYz+''==''){
                this.yzNull=true;
                this.yzCorrect=false;
            }
            if(this.userPword==''){

                this.pwordCorrect=false;
                this.pwordError=false;
                this.pwordNull= true;
                this.pwordChongfu=false;

            }
            if(this.newUserPword==''){
                this.nPwordError=true;
                this.nPwordCorrect=false;
                
            }
            if(this.userPhone!=''&&this.userYz!=''&&this.userPword!=''&&this.newUserPword!=''){
                if(this.newUserPword==this.userPword&&(/^[A-Za-z0-9]{6,20}$/.test(this.userPword))){
                    let that=this;
                    let data={};
                    let  phone=this.userPhone
                    let type = 0//判断是否为国外
                    for(var i = 0;i<this.options.length;i++){
                        if(this.value == 1){
                            phone=this.userPhone
                            type=0
                        }else{
                            if(this.options[i].id == this.value){
                            console.log(this.options[i].code)
                            phone=String(this.options[i].code) +  this.userPhone
                            type=1
                        }
                        }
                    }
                    if(this.$store.state.oemFlag){
                        data={
                            phone: phone,
                            code: that.userYz,
                            password: that.userPword,
                            re_password: that.newUserPword,
                            domain:this.$store.state.domain,
                        }
                    }else{
                        data={
                            phone: phone,
                            code: that.userYz,
                            password: that.userPword,
                            re_password: that.newUserPword,
                        }
                    }
                    this.$axios.post(this.url + 'user/platform_user/changePassword',data).then(res=>{
                        if(res.data.code===200){
                            that.user_name = res.data.name
                            that.show=false;
                            var timer = null;
                            function tests(){
                                that.login_number--;
                                if(that.login_number<=0){
                                    clearInterval(timer);
                                    that.$router.push({path:'/wf/index/login',name:'login'})
                                }
                            }
                            timer = setInterval(tests, 1000);
                        }else{
                            that.$message.error(res.data.msg);
                        }
                        // if(res.data.msg=="验证码错误"){
                        //     that.yzNull=false;
                        //     that.yzCorrect=true;
                        // }
                        // if(res.data.msg=="很抱歉,新密码不能与旧密码相同!"){
                        //     that.$message({
                        //     showClose: true,
                        //     message:'很抱歉,新密码不能与旧密码相同!',
                        //     type: 'error'
                        //     });
                        // }
                    })
                }
            }
            
        },
        login(){
            // console.log(this.userPhone)
            this.$router.push({path:'/wf/index/login',name:'login'})
        },
        phoneBlur(){
            var that=this;
            this.yzError=false;
            if(that.userPhone==''){
                that.phoneError=false;
                that.phoneLogin=false;
                that.phoneErrors=false;
            }else{
                // if((/^1[345789]\d{9}$/.test(this.userPhone))){
                //     // this.$axios.post(this.url+'platform/UserProfile/test','useProPhone='+this.userPhone).then(function (res) {
                //     //     if(res.data.code==0){
                //             that.phoneCorrect=true;
                //             that.phoneError=false;
                //             that.phoneLogin=false;
                //             that.phoneErrors=false;
                //     //     }else{
                //             // that.phoneCorrect=false;
                //             // that.phoneError=true;
                //             // that.phoneLogin=false;
                //             // that.phoneErrors=false;
                //     //     }
                //     // }).catch(function (error) {
                //     // });
                // }else{
                //     that.phoneCorrect = false;
                //     that.phoneError=false;
                //     that.phoneLogin=false;
                //     that.phoneErrors=true;
                // }
                that.phoneCorrect=true;
                that.phoneError=false;
                that.phoneLogin=false;
                that.phoneErrors=false;
            }
        },
        yzBlur(){
            if(this.userYz+''==''){
                this.yzNull=false;
                this.yzCorrect=false;
            }
        },
        getYz(){   //获取验证码
            let  useProPhone=this.userPhone
            let phone_type = 0
            for(var i = 0;i<this.options.length;i++){
                if(this.value == 1){
                    useProPhone=this.userPhone,
                    phone_type=0
                }else{
                    if(this.options[i].id == this.value){
                    console.log(this.options[i].code)
                    useProPhone=String(this.options[i].code) +  this.userPhone
                    phone_type=1
                }
                }
            }
            if(this.phoneCorrect==true){
                // console.log(this.phoneCorrect)
                var that=this;
                this.$axios({
                    methods: 'post',
                    url: this.url + 'platform/UserProfile/sms',
                    params: {
                        useProPhone: useProPhone,
                        type:phone_type
                    }
                }).then(function (res) {
                    if(res.data.code==1){
                        that.yzShow=false;
                        var timer = null;
                        function test(){
                            that.yzNumber--;
                            // console.log(that.yzNumber)
                            if(that.yzNumber<=0){
                                clearInterval(timer);
                                that.yzNumber=60;
                                that.yzShow=true;    //是否可点击
                            }
                        }
                        timer = setInterval(test, 1000);
                    }
                    // console.log(res);
                })
            }else{
                this.phoneBlur()
            }
        },
        userPass(){
            // console.log(this.userPword)
            if(this.userPword==''){

                this.pwordCorrect=false;
                this.pwordError=false;
                this.pwordNull= false;
                this.pwordChongfu=false;

            }else{ 
                if(!(/^[A-Za-z0-9]{6,20}$/.test(this.userPword))){
                    // console.log(11111)
                    this.pwordCorrect=false;
                        this.pwordError=false;
                        this.pwordNull= false;
                        this.pwordChongfu=true;

                }else{
                    if(this.newUserPword==''){
                        this.pwordCorrect=true;
                        this.pwordError=false;
                        this.pwordNull= false;
                        this.pwordChongfu=false;
                    }else{
                         if(this.newUserPword!=this.userPword){
                            this.pwordCorrect=false;
                            this.pwordError=true;
                            this.pwordNull= false;
                            this.pwordChongfu=false;
                            this.nPwordError=false;
                            this.nPwordCorrect=false;
                        }else{
                            this.pwordCorrect=true;
                            this.pwordError=false;
                            this.pwordNull= false;
                            this.pwordChongfu=false;
                            this.nPwordError=false;
                            this.nPwordCorrect=true;
                        }
                    }
                    // console.log(2222)
                    
                    
                    
                }
            }
        },
        newUserPass(){
            // console.log(this.newUserPword)
            if(this.newUserPword==''){
                this.nPwordError=false;
                this.nPwordCorrect=false;
                
            }else{
                if(!(/^[A-Za-z0-9]{6,20}$/.test(this.newUserPword))){
                        this.pwordCorrect=false;
                        this.pwordError=false;
                        this.pwordNull= false;
                        this.pwordChongfu=true;
                        this.nPwordError=false;
                        this.nPwordCorrect=false;
                }else{
                    if(this.newUserPword!=this.userPword){
                        this.pwordCorrect=false;
                        this.pwordError=true;
                        this.pwordNull= false;
                        this.pwordChongfu=false;
                        this.nPwordError=false;
                        this.nPwordCorrect=false;
                //         this.nPwordError=true;
                //         this.nPwordCorrect=false;
                    }else{
                        this.pwordCorrect=true;
                        this.pwordError=false;
                        this.pwordNull= false;
                        this.pwordChongfu=false;
                        this.nPwordError=false;
                        this.nPwordCorrect=true;
                    }
                }  
                
            }
        }
    }
}
</script>

<style lang="scss">
.wf_index_register{
    padding-top:72px;
     .select-list{
        width: 120px;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
        border-bottom: none;
        border-right: 1px solid #eee;
        /deep/.el-input__inner{
           width: 110px!important;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;border-bottom: none;
        }
    }
    .el-footer{
        height: 20px !important;
        text-align: center;
        color: #a5a5a5;
        // position: absolute;
        width: 100%;
        bottom: 0;
    }
}
// 中间
.wf_index_register .form{
    min-height: 625px;
    width: 830px;
    margin: 0 auto;
    border-top: 2px solid #0878F9;
    padding-top: 80px;
    padding-bottom: 50px;
    box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
    margin-bottom: 70px;
    
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
.wf_index_register .form .clear .img{
    height:36px;
    padding-left: 15px;
}
.wf_index_register .form .clear img{
    width:16px;
    height:16px;
    display:inline-block;
    margin-top:10px;
}
.wf_index_register .form .clear .img span{
    margin-top:10px;
    height:16px;
    line-height:16px;
    font-size:12px;
    color:#fa5b5b;
    display:inline-block;
    position: relative;
    top: -3px;
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

//重置成功页面
.wf_index_register .reset_success img{
    width:16px;
    height:16px;
}
.wf_index_register .reset_success{
    font-size:14px;
}
.wf_index_register .reset_success{
    text-align:center;
}
.wf_index_register .reset_success>div:first-child span{
    display:inline-block;
    position:relative;
    top:-3px;
}
.wf_index_register .reset_success>div:first-child{
    margin-bottom:60px;
}
.wf_index_register .reset_success>div:nth-child(2){
    margin-bottom:10px;
}
.wf_index_register .reset_success>div:nth-child(3){
    margin-bottom:100px;
}
</style>