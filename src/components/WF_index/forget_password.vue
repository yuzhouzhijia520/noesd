<template>
    <div>
        <nav></nav>
        <div class="login_data">
            <span class="interval">注册用户 <span class="big_font">16,670,498</span>+</span>
            <span class="interval">安全运行 <span class="big_font">2882天</span>+</span>
            <span class="interval">覆盖行业 <span class="big_font">100</span>+</span>
        </div>

        <div class="form">
            <p>找回密码</p>
            <label class="clear" for="">
                <input type="text" placeholder="拾久商城密码/邮箱/手机号码">
                <span class="input_type">账号</span>
                <span class="input_warn">
                    <div class="overflow"></div>
                    此账号不存在
                </span>
            </label>
            <label class="clear" for="">
                <button class="get_verification">获取验证码</button>
                <input class="verification" type="text" placeholder="请输入您的验证码">
                <span class="input_type">验证码</span>
            </label>
            <label class="clear" for="">
                <input type="text" placeholder="请输入您的新密码">
                <span class="input_type">新密码</span>
                <span class="input_warn">
                    <div class="overflow"></div>
                    密码由6-20个字符组成，区分大小写
                </span>
            </label>
            <label class="clear" for="">
                <input type="text" placeholder="请确认您的新密码">
                <span class="input_type">确认新密码</span>
                <span class="input_warn">
                    <div class="overflow"></div>
                    密码和确认密码不一致
                </span>
            </label>
            <label class="clear" for="">
                <router-link to="/reset_successful">
                    <input type="button" class="register" value="重置">
                </router-link>
            </label>
        </div>
    </div>
</template>

<script>

export default {
    name: 'forget_password',
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss">
nav{
    width: 100%;
    height: 72px;
}
input{ 
    outline: none;
    border-bottom: 2px solid #DFDFDF!important;
}
a{
    text-decoration: none;
}
body{
    font-size: 14px;
}
.form p{
    margin-left: 40px;
}
.login_data{
    width: 532px;
    margin: 0 auto;
    color: #BDBDBD;
    font-size: 14px;
    margin-bottom: 45px;
}
.login_data .big_font{
    font-size: 20px;
}
.login_data .interval{
    margin-right: 60px;
}

.form{
    width: 830px;
    margin: 0 auto;
    border-top: 2px solid #0878F9;
    padding-top: 30px;
    padding-bottom: 40px;
    box-shadow: 1px 1px 8px 0 #949494;
}
.form .clear{
    display: block;
    width: 500px;
    color: #5B5B5B;
    line-height: 32px;
    margin-left: 40px;
}
.form .clear .input_box{
    width: 300px;
}
.form .clear .input_type{
    float: right;
    line-height: 80px;
}
.form .clear input{
    float: right;
}
.form input{
    width: 70%;
    height: 50px;
    padding-left: 20px;
    margin: 10px 0 10px 24px;
    border: 0;
    border-bottom: 2px solid #DFDFDF;
}
.form input:focus{
    border: 0;
}
.form input
.form input:-moz-placeholder,
.form input::-moz-placeholder,
.form input:-ms-input-placeholder,
.form input::-webkit-input-placeholder{
    color: #DFDFDF;
}
.form .clear .input_warn{
    float: left;
    color: #FA5B5B;
    font-size: 14px;
    line-height: 106px;
    position: absolute;
    left: 58%;
}
.form .clear .input_warn .overflow{
    float: left;
    width: 19px;
    height: 19px;
    overflow: hidden;
    margin: 43px 14px 43px 14px;
    background: url("../../assets/index_img/warn_icon.png") no-repeat;
    background-position: 0 0;
}
.form .clear .input_warn .true{
    background-position: 0 -147px;
}
.form .clear .verification{
    width: 48%;
}
.form .clear .get_verification{
    float: right;
    width: 100px;
    height: 36px;
    border: 1px solid #0878F9!important;
    color: #0878F9;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    margin-top: 30px;
    margin-left: 10px;
}
.form .clear .register{
    padding: 0;
    color: #fff;
    background: #0878F9;
    border: 0!important;
    width: 74%;
    margin: 28px 0 15px 0;
    cursor: pointer;
    font-size: 20px;
}
</style>