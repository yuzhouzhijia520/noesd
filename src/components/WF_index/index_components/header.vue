<template>
<nav>
  <!-- <nav class="clear" style="margin:0 auto;"> -->
    <!-- <div class="clear nav_left" @click="jumpIndex">
        <img src="../../../assets/index_img/WF_Logo.png">
    </div> -->
    <!-- <div class="nav_center clear">
        <div :key="index"  @click="addActive(index)" v-for="(list, index) in lists">
            <div class="nav_text" :style="{color:index==navActive?'#0076FE':''}">{{list.message}}</div>
            <div class="nav_bg" :style="{background:index==navActive?'#0076FE':'',borderRadius:index==navActive?'2px':''}"></div>
        </div>
    </div> -->
    <!-- <div class="nav_right">
        <div class="clear" v-if="loginShow">
            <div class="nav_register hover_bg" @click="register">注册</div>
            <div class="nav_login hover" @click="login">登录</div>
        </div>
        <div class="clear" v-if="!loginShow">
            <div class="nav_register hover_bg" @click="loginUser">进入后台</div>
            <div class="nav_login hover" @click="quit">退出</div>
        </div>
    </div> -->
    <b-navbar toggleable="md" type="light" class="wf_nav">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#"><b-img slot="aside" :src='backimg_wf_logo' fluid alt="拾久应用" @click="jumpIndex"/></b-navbar-brand>
        
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
            <b-navbar-brand href="#" :key="index"  @click="addActive(index)" v-for="(list, index) in lists" :style="{color:index==navActive?'#0076FE':''}">
                <div class="nav_bg_title"><span>{{list.message}}</span></div>
                <div class="nav_bg" :style="{background:index==navActive?'#0076FE':'',borderRadius:index==navActive?'2px':'',border:index==navActive?'2px solid':''}"></div>
            </b-navbar-brand>
            <!-- <b-nav-item href="#">合作共赢1</b-nav-item>
            <b-nav-item href="#">联系我们1</b-nav-item> -->
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                    <div class="nav_right">
                        <div class="clear" v-if="loginShow">
                            <div class="nav_register hover_bg" @click="register">注册</div>
                            <div class="nav_login hover" @click="login">登录</div>
                        </div>
                        <div class="clear" v-if="!loginShow">
                            <div class="nav_register hover_bg" @click="loginUser">进入后台</div>
                            <div class="nav_login hover" @click="quit">退出</div>
                        </div>
                    </div>
                    <!-- Using button-content slot -->
                    <!-- <template slot="button-content">
                    <em>User</em>
                    </template>
                    <div class="clear" v-if="loginShow">
                        <b-dropdown-item href="#" @click="register">注册</b-dropdown-item>
                        <b-dropdown-item href="#" @click="quit">登录</b-dropdown-item>
                    </div>
                    <div class="clear" v-if="!loginShow">
                        <b-dropdown-item href="#" @click="loginUser">进入后台</b-dropdown-item>
                        <b-dropdown-item href="#" @click="quit">退出</b-dropdown-item>
                    </div> -->
                </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </nav>
  
</template>
<script >
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  data() {
    return { 
        lists: [
            {
                message: '首页'
            },
            {
                message: '合作共赢'
            },
            // {
            //     message: '产品'
            // },
            // {
            //     message: '免费制作'
            // },
            // {
            //     message: '案例'
            // },
            {
                message: '联系我们',
                url:'/w_index/contact',
                name:'contact'
            }
        ],
        backimg_wf_logo:require("../../../assets/index_img/WF_Logo.png"),
        navActive:0,
        bg:{
            background:'#0076FE',
            borderRadius:'2px',
            border: '2px solid'
        },
        activeIndex: '1',
        activeIndex2: '1',
        labelPosition: 'left',
        loginShow:true
    }
  },
  created(){
      if(this.$route.query.id){
          this.navActive=this.$route.query.id;
      }
      if(localStorage.getItem('userId')){
          this.loginShow=false;
      }else{
          this.loginShow=true;
      }
  },
  methods: {
    handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      jumpIndex(){
        //   this.$router.push({path:'/',name:'index'})
        window.open(this.locUrl);
      },
      addActive(e){
          if(e!=this.navActive){
              this.navActive=e
              
              if(e==0){
                  this.$router.push({path:'/',name:'index'})
              }
              if(e==1){
                  this.$router.push({path:'/wf/index/cooperate',name:'cooperate',query:{id:e}})
              }
              if(e==2){
                  this.$router.push({path:'/wf/index/contact',name:'contact',query:{id:e}})
              }
          }
        //   console.log(e)      
      },
      login(){    
        this.$router.push({path:'/wf/index/login',name:'index'})
      },
      register(){
          this.$router.push({path:'/wf/index/register',name:'register'})
      },
      loginUser(){
          this.$router.push({path:'/wf/user/management',name:'user_management'}) 
      },
      quit(){
          localStorage.removeItem('userId');
          localStorage.removeItem('userPhone');
          this.$router.push({path:'/',name:'index'});
          this.loginShow=true;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .nav_register,.nav_login{
      width:82px;
      height:36px;
      border-radius:18px;
      font-size:14px;
      text-align:center;
      line-height:36px;
      cursor:pointer;
  }
  .nav_register{
      background:#0076FE;
      border-radius:18px;
      color:#fff;
  }
  nav div .nav_login{
      border:1px solid rgba(227,227,227,1);
      float:right;
  }
  nav{
      width:1220px;
      height:72px;
      margin:0 auto;
  }
  nav .nav_conter div{
      cursor:pointer;
  }
  nav .nav_center> div:first-child{
      margin-left:240px;
  }
   nav .nav_center>div{
      margin-left:80px;
  }
  nav .nav_left{
      padding-top:15px;
  }
  nav .nav_left img{
      width:182px;
      display:block;
      cursor:pointer;
  }
  nav .nav_center{
      width:54%;
  }
  nav .nav_center{
      width:856px;
      height:72px;
  }
  nav .nav_center .nav_text{
      height:68px;
      line-height:68px;
  }
  nav .nav_center .nav_bg{
      height:4px;
      background:#fff;
  }
  nav .nav_center>div{
      width:68px;
      text-align:center;
      color:#000;
      font-size:14px;
      height:72px;
      cursor:pointer;
  }
  nav .nav_right{
      width:182px;
  }

  .navbar-brand a{
      color:black !important;
  }
  .img-fluid{
        width: 182px;
        height: 42px;
        display: block;
        cursor: pointer;
  }
  .wf_nav{
    .navbar-nav{
            margin-left: 10rem;
            .navbar-brand{
                margin-right: 4rem;
                font-size: 1rem;
                padding-top: 0.3125rem;
                padding-bottom: 0;
                .nav_bg_title{
                    padding-bottom: 1rem;
                    margin-top: 1.5rem;
                }
            }
    }
  }
  
</style>
