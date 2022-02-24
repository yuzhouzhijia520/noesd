<template>
    <div id="user_Login">
      <userHearder></userHearder>
      <div class="user_Login_create">
        <img src="../../assets/user_img/qb.png" class="user_Login_create_img left">
        <div class="user_Login_create_txt left" >创建小程序</div>
      </div>
      <div class="user_Login_create_name">
        <div class="user_Login_create_name_n">名称</div>
        <div class="clear">
          <div>
              <input type="text" class="user_Login_create_name_input" v-model="userName" placeholder="请输入名称">
          </div>
          <div v-if="show" class="is_ts">{{tishi}}</div>
        </div>
      </div>
      <div class="line-o">
        <div class="sublimet" @click="toPreservation" >保存</div>
      </div>
      <userFooter></userFooter> 
    </div>
</template>

<script>
import userHearder from './header';
import userFooter from './footer';
    export default {
        name: "user_Login",
        components:{
        userHearder,
        userFooter
        
      },
      data(){
          return{
            img:'',
            userName:'',
            show:false,
            tishi:'',
            flagClick:true
          }
      },
      methods:{
        toPreservation(){
          var that=this;
          if(this.flagClick===true){
            if(this.userName==''){
              this.show=true;
              this.tishi='名称不能为空'
            }else{
                if(/^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{1,30}$/.test(this.userName)){
                  this.flagClick=false;
                  const loading = this.$loading({
                    lock: true,
                    text: '正在初始化小程序数据...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                  this.$axios.post(this.url+'platform/establish/add_program','token='+localStorage.getItem('userId')+'&proName='+this.userName+'&temId='+this.$route.query.temId+'&typeId='+this.$route.query.id+"&proImg="+this.$store.state.serverList.data.logo).then(function (res) {
                      loading.close()
                      that.flagClick=true;
                      if(res.data.code==1){
                        that.$router.push({path:'/wf/user/management',name:'user_management'})
                      }else{
                        that.$message.error(res.data.msg)
                      }
                    })
                    .catch(function (error) {
                     loading.close()
                      that.flagClick=true;
                        // console.log(error);
                    });
                }else{
                  this.show=true;
                  this.tishi='名称不能包含特殊字符且,汉字在1-15个,英文在1-30个'
                }
              
            }
          }
          

        }
      }
    }
</script>

<style lang="scss">
  #user_Login{
    padding-top:72px;
    .WF_logo{
      width: 1220px;
      margin: 0 auto;height: 62px;
    }
    .user_Login_create{
      margin:0 auto;
      width: 1220px;
      height: 25px;
      padding: 25px 0 27px 0;
      border-bottom: 1px solid #ccc;
      .user_Login_create_img{
        width:20px;
        height:20px;
        display: inline-block;
        margin-top: 3px;
      }
      .user_Login_create_txt{
        width:120px;
        height:25px;
        font-size:24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(86,86,86,1);
        line-height: 25px;
        margin-left: 10px;
      }
    }
    .user_Login_create_name{
      padding-top: 24px;
      width: 1220px;
      margin: 0 auto;
      .user_Login_create_name_n{
        width: 100%;
        height:18px;
        font-size:18px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(83,83,83,1);
        line-height: 18px;
      }
      .is_ts{
        height:44px;
        margin-top: 16px;
        padding-left: 20px;
        color:#ff7477;
        color:16px;
        line-height:44px;
      }
      .user_Login_create_name_input{
        width:272px;
        height:44px;
        border:1px solid rgba(166,166,166,1);
        border-radius:4px;
        padding-left: 10px;
        margin-top: 16px;
        color: #A6A6A6;
      }
    }
    .user_Login_create_imgs{
      padding-top: 24px;
      width: 1220px;
      margin: 0 auto;
      margin-bottom: 40px;
      .user_Login_create_imgs_n{
        height:18px;
        font-size:18px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(83,83,83,1);
        line-height: 18px;
      }
      .user_Login_create_img_chios{
        height: 58px;
        width: 100%;
        margin-top: 16px;
        .user_Login_create_img_chios_img{
          width: 58px;
          height: 58px;
          background:rgba(238,237,237,1);
          border-radius:50%;
          border:none;
        }
        .user_Login_create_img_chios_txt{
          width:64px;
          height:17px;
          margin-top: 40px;
          margin-left: 17px;
          input{
            width:64px;
            height:17px;
            opacity: 0;
            display:block;
            z-index:100;
            position:relative;
            top:0px;
            cursor:pointer;
          }
          div{
            width:64px;
            height:17px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(120,183,255,1);
            line-height: 17px;
            position:relative;
            top:-17px;
          }
        }
        .user_Login_create_img_chios_txt_t{
          width:150px;
          height:13px;
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(83,83,83,1);
          line-height: 13px;margin-top: 43px;
          margin-left: 6px;
        }
      }
    }
    .line-o{
      width: 1220px;
      margin: 0 auto;
      margin-top: 40px;
      .sublimet{
        cursor:pointer;
        width:72px;
        height:36px;
        background:rgba(247,155,93,1);
        border-radius:4px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        text-align: center;
      }
      .sublimet:hover{
        background:#f6a874;
      }
    }

  }
</style>
