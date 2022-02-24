<template>
    <div id="user_header">
        <nav class="clear">
            <div>
                <img :src="backimg_wf_logo" class="imggg" @click="jumpIndex">
            </div>
            <div class="right">
                <div>
                    <div class="clear user_phone" @mouseover="over" @mouseout="out">
                        <div>
                            <img src="../../assets/user_img/user.png" alt="">
                        </div>
                        <div>{{userPhone}}</div>
                        <div>
                            <img src="../../assets/user_img/user3.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="is_show" v-if="show" @mouseover="over" @mouseout="out">
                    <div @click="admin" v-show="isShow">进入后台</div>
                    <div @click="quit">退出</div>
                </div>
            </div>
        </nav>
     </div>
</template>
<script >
export default {
  data() {
    return { 
        show:false,
        userPhone:'',
        isShow:true,
        backimg_wf_logo:require('../../assets/index_img/WF_Logo.png')
    }
  },
  created(){
    //   console.log(window.location.href.split('/')[window.location.href.split('/').length-1]=="management")
        
        
        if(window.location.href.split('/')[window.location.href.split('/').length-1]=="bkmanagement"){
          this.isShow=false;
        }

        if(location.href.includes('bkmanagement')){
            this.userPhone=localStorage.getItem('agentPhone')
        }
  },
  methods: {
        jumpIndex(){
             this.$router.push({path:'/',name:'index'})
        },
        over(){
            this.show=true;
        },
        out(){
            this.show=false;
        },
        quit(){
            //s_name清除token
            //如果是代理商登录页面退出，清除代理商相关登录缓存信息
            
            if(localStorage.getItem('agentId')){
                localStorage.removeItem('is_agent');//代理商标识
                localStorage.removeItem('agentId');//tokense
                localStorage.removeItem('agentPhone');//手机号码
                localStorage.setItem('activeName','second');//设置显示代理商登录页
            }
           
            this.$router.push({path:'/wf/index/login',name:'index'});
        },
        admin(){
            this.$router.push({path:'/wf/user/management',name:'user_management'}) 
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    #user_header{
        position:fixed;
        top:0;
        width:100%;
        box-shadow: 0 3px 4px rgba(0,0,0,0.1);
        background:#fff;
        z-index:100;
        height:72px;
        nav{
            height:72px;
            width:1220px;
            margin:0 auto;
            .imggg{
                margin-top: 20px;
                display:inline-block;
                width: 182px;
                display: block;
                cursor: pointer;
                // width:182px;
                // height:46px;
            }
            .right{
                position:relative;
                .user_phone>div:nth-child(1){
                    width:24px;
                    height:72px;
                    img{
                        display:inline-block;
                        padding-top:19px;
                    }
                }
                .user_phone>div:nth-child(2){
                    font-size:16px;
                    height:72px;
                    line-height:72px;
                    padding-left: 15px;
                    padding-right: 10px;
                    color:#666;
                }
                .user_phone>div:nth-child(3){
                    width:14px;
                    height:72px;
                    img{
                        display:inline-block;
                        padding-top:32px;
                    }
                }
                .is_show{
                    position: absolute;
                    top: 60px;
                    border:1px solid #e8e8e8;
                    // left: 42px;
                    width: 160px;
                    background:#fff;
                    z-index:100;
                    // padding:15px 0;
                    div{
                        font-size:16px;
                        color:#666;
                        padding-top:15px;
                        padding-bottom:15px;
                        text-align:center;
                        cursor:pointer;
                    }
                    div:hover{
                        color:#0076fe;
                        background:#f6f6f6;
                    }
                }
            }
            
        }
    }
</style>
