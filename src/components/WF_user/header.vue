<template>
    <div id="user_header">
        <nav class="clear">
            <div>
                <img  v-if="this.$store.state.oemFlag" :src="this.$store.state.serverList.data.word_logo" class="imggg" @click="jumpIndex">
                <img  v-else :src="backimg_wf_logo" class="imggg" @click="jumpIndex">
            </div>
            <!-- <div class="right"  @mouseover="over" @mouseout="out">
                <div>
                    <div class="clear user_phone">
                        <div>
                            <img src="../../assets/user_img/user.png" alt="">
                        </div>
                        <div>{{userPhone}}</div>
                        <div>
                            <img src="../../assets/user_img/user3.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="is_show" v-if="show">
                    <div @click="admin" v-show="isShow">进入后台</div>
                    <div @click="quit">退出</div>
                </div>
            </div> -->
            <div class="right-menu">
                <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                    <div class="avatar-wrapper">
                        <div class="wf-userImg">
                            <img src="../../assets/user_img/user.png" class="user-avatar">
                        </div>
                        <div class="wf-moblie">{{userPhone}}</div>
                        <i class="el-icon-caret-bottom" />
                    </div>
                    <el-dropdown-menu slot="dropdown" class="wf-logout">
                        <router-link to="/wf/user/management" v-show="isShow">
                            <el-dropdown-item>进入后台</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item divided > 
                            <span style="display:block;" @click="quit">退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
        if(this.$store.state.oemFlag){
            this.$store.dispatch('loadData');
        }else{
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = 'favicon.ico';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        if(window.location.href.split('/')[window.location.href.split('/').length-1]=="management"){
            this.isShow=false;
        }
        if(localStorage.getItem('userPhone')){
            this.userPhone=localStorage.getItem('userPhone')
        }
    },
    mounted(){
    },
    methods: {
        jumpIndex(){
            window.open(this.locUrl);
        },
        quit(){
            //s_name清除token
            //如果是代理商登录页面退出，清除代理商相关登录缓存信息

            if(localStorage.getItem('userId')){
                localStorage.removeItem('secretId');//应用ID
                localStorage.removeItem('userId');//token
                localStorage.removeItem('userPhone');//手机号码
                localStorage.setItem('activeName','first');//设置显示普通用户登录页
            }
            this.$router.push({path:'/wf/index/login',name:'login'});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wf-logout{
    padding: 0;
    margin: 0;
    top: 70px !important;
    margin-top: 5px !important;
    margin-left: 12px;
}
    #user_header{
        position:fixed;
        top:0;
        width:100%;
        box-shadow: 0 3px 4px rgba(0,0,0,0.1);
        background:#fff;
        z-index:100;
        height:70px;
        nav{
            height:70px;
            width:1220px;
            margin:0 auto;
            .imggg{
                margin-top: 20px;
                display:inline-block;
                display: block;
                cursor: pointer;
                max-height: 33px;
                max-width: 182px;
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
                    color:#DB5444;
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
                    width: 160px;
                    background:#fff;
                    z-index:100;
                    div{
                        font-size:16px;
                        color:#666;
                        padding-top:15px;
                        padding-bottom:15px;
                        text-align:center;
                        cursor:pointer;
                    }
                }
            }
            
        }
        .right-menu {
            float: right;
            line-height: 50px;
            max-height: 70px;
            position: relative;
            background: #fff;
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            padding: 0 15px;
            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;
                }
            }
        }
        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 15px;
                position: relative;
                display: inline-block;
                vertical-align: text-bottom;
                .wf-userImg{
                    display: inline-block;
                    vertical-align: text-bottom;
                }
                .wf-moblie{
                    font-size: 16px;
                    display: inline-block;
                    color: rgb(219, 84, 68);
                    vertical-align: text-bottom;
                }
                .user-avatar {
                    cursor: pointer;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 15px;
                    font-size: 12px;
                }
            }
        }
    }
</style>
