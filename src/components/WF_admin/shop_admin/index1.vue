<template>
    <div id="shop_index">
        <el-container style="min-width: 1220px;" :style="{height: myHeight}">
            <el-header>
                <span class="header_left">欢迎您，{{pro_name}}</span>
                <span class="header_right" v-if="showRole" >
                    <span style="cursor:pointer" @click="quite">退出登录</span>
                </span>
                <span class="header_right" v-else>
                    <span style="cursor:pointer" @click="quites">切换店铺</span>
                    |
                    <span style="cursor:pointer" @click="quite">退出登录</span>
                </span>
            </el-header>
            <el-container>
                <div class="small_box">
                    <img class="user_img" :src="imageUrl" alt="">
                    <p class="app_name">{{pro_name}}</p>
                    <span class="fabu_status">{{status}}</span>
                    <span class="app_status">微商城</span>
                </div>
                <el-aside id="aside" width="230px" style="margin-top: 116px;">
                    <el-row class="tac" style="height: 100%;background: #fff;">
                        <el-col :span="24">
                            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
                                <template v-for="(item,index) in menuList">
                                    <el-menu-item :index="item.path" :key="index" v-if="item.children.length==0">
                                        <img style="width:1rem;height:1rem;" :src="item.icon" alt="">
                                        <span class="item_name" slot="title">{{item.mall_name}}</span>
                                    </el-menu-item>
                                    <el-submenu  v-else :index="index+''" :key="index">
                                        <template slot="title">
                                            <img style="width:1rem;height:1rem;" :src="item.icon" alt="">
                                            <span class="item_name" slot="title">{{item.mall_name}}</span>
                                        </template>
                                        <el-menu-item-group id="son_item">
                                            <el-menu-item :index="list.path" v-for="(list,i) in item.children" :key="i">{{list.mall_name}}</el-menu-item>
                                        </el-menu-item-group>
                                    </el-submenu>
                                </template>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main id="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Lodash from 'lodash'
export default {
    name: 'shop_index',
    data() {
        return {
            myHeight: window.innerHeight + 'px'||document.documentElement.clientHeight + 'px', // 获取浏览器高度
            menuList:[], 
            pro_name: '', // 用户名称
            imageUrl: '', // 用户头像
            id: '', // pro_id
            status: '',// 发布状态
            showRole:true
       }
    },
    created(){
        this.getMenu() // 获取用户信息
        this.getUser()
    },
    methods: {
        quite(){
            let that=this;
            if(localStorage.getItem('is_agent')==2){
                that.$router.push({path:'/wf/admin/shop/shop_login',query:{pro_token:localStorage.getItem('secretId')}});
            }else{
                this.$router.push({path:'/wf/index/login',name:'index',query:{pro_token:localStorage.getItem('secretId')}});
            }
            localStorage.removeItem('secretId');//应用ID
            localStorage.removeItem('userId');//token
            localStorage.removeItem('userPhone');//手机号码
            localStorage.removeItem('is_agent');//设置显示普通用户登录页
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
                        that.imageUrl = '../../../assets/admin_img/shop_admin_img/user.jpg'
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
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
            })
        },
        getMenu(){ // 获取左侧导航栏菜单
            var that=this;
            if(localStorage.getItem('is_agent')==2){
                var userUrl='token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')+'&type=1';
            this.showRole=true;
            }else{
                 var userUrl='token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId');
            this.showRole=false;
            }

            this.$axios.post(this.url+'shopapi/auth_role/roleCatalog',userUrl
            ).then(function (res) {
                if(res.data.code==1){
                    that.menuList=res.data.data;
                }
            })
            .catch(function (error) {

            });
        }
    },
    mounted: function () {
      const that = this
      // _.debounce 是一个通过 lodash 限制操作频率的函数。
      window.onresize = _.debounce(() => {
        that.myHeight = document.body.clientHeight + 'px'
      }, 400)
    }
}
</script>

<style lang="scss">
body{
    background: #F6F6F6;
    font-size: 14px;
}
#shop_index{
    .el-header{
    width: 100%;
    color: #666;
    height: 40px!important;
    text-align: center;
    line-height: 40px;
    clear: both;
    background: #fff;
    margin-bottom: 13px;
  }
  .header_left{
      float: left;
  }
  .header_right{
      float: right;
  }
  .header_right span{
      margin: 0 30px;
  }
  .small_box{
      padding: 30px 10px;
      background: #fff;
      position: absolute;
      width: 230px;
      box-sizing: border-box;
      z-index: 999;
  }
  .el-menu{
      border: none;
  }
  .user_img{
      width: 46px;
      height: 46px;
      border-radius: 50%;
      margin-right: 15px;
      float: left;
  }
  .fabu_status,.app_status{
      font-size: 12px;
      border: 1px solid;
      padding: 2px 4px;
      cursor: pointer;
      border-radius: 4px;
      margin-right: 6px;
  }
  .app_name{
      margin-bottom: 6px;
      font-weight: 600;
      color: #333;
      letter-spacing: 1px;
  }
  .fabu_status{
      background: #DADBDD;
      color: #fff;
  }
  .app_status{
      border-color: #3291FF;
      color: #3F98FF;
  }
  .el-main {
    padding: 0 1.875rem 20px 1.875rem;
    background: none;
  }
  #main{
      min-width: 1226px;
  }
  .el-submenu__title,.el-menu-item{
      color: #999;
      padding-left: 60px!important;
  }
  .item_name{
      padding-left: 10px;
      font-size:16px;
  }
  #son_item .el-menu-item{
      padding-left: 90px!important;
  }
}

</style>