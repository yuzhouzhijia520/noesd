<template>
    <div>
        <div class="wf-mainLayout-header">
            <span class="header_left">欢迎您，{{pro_name}}</span>
            <span class="header_right" v-if="this.$store.state.showRole" >
                <span style="cursor:pointer" @click="quite">退出登录</span>
            </span>
            <span class="header_right" v-else>
                <span style="cursor:pointer" @click="quites">切换店铺</span>
                |
                <span style="cursor:pointer" @click="quite">退出登录</span>
            </span>
            
        </div>
    </div>
</template>

<script>
import {staffCode} from '@/server/employee';
export default {
    data(){
        return {
             pro_name: '', // 用户名称
        }
    },
    components:{
    },
    created(){

    },
    mounted(){
        this.getUser()
    },
    methods:{
        quite(){
            let that=this;
            if(localStorage.getItem('is_agent')==-1){
                localStorage.removeItem('is_agent');//设置显示普通用户登录页
                localStorage.removeItem('userId');
                localStorage.removeItem('proId');
                localStorage.removeItem('secretId');//应用ID
                localStorage.removeItem('userPhone');//手机号码
                that.$router.push({path:'/wf/admin/shop/shop_login',query:{pro_token:localStorage.getItem('invite_code')}});
            }else{
                localStorage.removeItem('userId');//token
                localStorage.removeItem('is_agent');//设置显示普通用户登录页
                localStorage.removeItem('secretId');//应用ID
                localStorage.removeItem('userPhone');//手机号码
                this.$router.push({path:'/wf/index/login'});
                // window.open('/wf/index/login');
            }
            localStorage.removeItem('invite_code');//手机号码
        },
        quites(){
            this.$router.push({path:'/wf/user/management',name:'user_management'});
        },
        getUser(){ // 获取用户信息
            let that = this
            this.$axios.post(this.url+'shopapi/Program/show',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            )
            .then(function(res){
                if(res.data.code==1){
                    that.pro_name = res.data.data.proName
                    if(res.data.data.proImg&&res.data.data.proImg!=null&&res.data.data.proImg!=''&&res.data.data.proImg!=undefined){
                        that.imageUrl = res.data.data.proImg
                    }else{
                        that.imageUrl = 'http://cdn1.19mini.com/2018-10-27%2Fe6577dbd533f86258c449c6a9206fffa.jpg'
                    }
                    that.id = res.data.data.id
                    let status = res.data.data.proStatus
                    if(status==0){
                        status = '未发布'
                    }else if(status==1){
                        status = '审核中'
                    }else if(status==2){
                        status = '未通过'
                    }else if(status==3){
                        status = '已上线'
                    }else if(status==4){
                        status = '未上线'
                    }else{

                    }
                    that.status = status
                }else{
                }
            })
            .catch(function (error) {
                that.$message.error("网络错误")
            })
        }
    }
}
</script>

<style lang="scss">
.header_left{
    float: left;
}
</style>

