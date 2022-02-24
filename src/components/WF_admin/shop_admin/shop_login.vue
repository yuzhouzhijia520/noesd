<template>
    <el-form label-width="80px">
        <h1 style="margin-bottom: 20px;margin-left: 50px;">电商后台登录页面</h1>
        <el-form-item label="账号">
            <el-input v-model="name"></el-input>
            <span class="error" v-show="number_error">账号输入错误</span>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="psd" type="password"  @keyup.enter.native="onSubmit()"></el-input>
            <span class="error" v-show="psd_error">密码输入错误</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        </el-form>
</template>

<script>
	export default {
        name: 'shop_login',
	    data(){
			return {
                name: '',
                psd: '',
                number_error: false,
                psd_error: false,
			}
		},
        methods: {
            onSubmit() {
                let that=this;
                localStorage.setItem('invite_code',this.$route.query.pro_token);
                if(window.location.href.split('?')[1]){
                    this.$axios.post(this.url+'shopapi/user/login','name='+this.name+'&pass='+this.psd+'&'+unescape(window.location.href.split('?')[1]))
                    .then(function (res) {
                        if(res.data.code==200){
                            localStorage.setItem('secretId',res.data.data.secret);//应用ID
                            localStorage.setItem('userId',res.data.data.token);//token
                            localStorage.setItem('userPhone',that.name);//手机号码
                            localStorage.setItem('proId',res.data.data.pro_id);//token
                            localStorage.setItem('is_agent',-1);//设置显示普通用户登录页
                            that.$router.push({path:'/wf/admin/newshop'});
                        }else{
                            that.number_error = true
                            that.psd_error = true
                        }
                    }).catch(err=>{
                        that.$message.error('网络错误!600B0019');
                    })
                }else{
                    that.$message.error('该路径不正确！');
                }
            }
        }
	}
</script>

<style scoped>
.el-form{
    text-align: center;
    width: 400px;
    padding-top: 160px;
    margin: 0 auto;
}
.el-form .el-button{
    width: 100%;
}
.error{
    color: rgba(247, 49, 49, 0.774);
}
</style>