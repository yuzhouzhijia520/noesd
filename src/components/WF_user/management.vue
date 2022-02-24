<template>
    <div id="management">
      <userHearder></userHearder>
      <div class="management_title">
        <!-- <div class="management_create" @click="chooseModul">+创建小程序</div> -->
        <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="chooseModul">创建小程序</el-button>
      </div>
      <div class="management_text" v-if="showText">还没有创建小程序，点击左上角立即创建</div>
      <ul class="clear management_list">
        <li class="management_list_l left" v-for="item in list" :key="item.id">
          <div class="management_list_l_left left" v-if="item.proImg==''&&$store.state.oemFlag">
            <img :src="$store.state.serverList.data.logo" alt="">
          </div>
          <div class="management_list_l_left left" v-else-if="item.proImg==''">
            <img src="../../assets/user_img/mr.png" alt="">
          </div>
          <div class="management_list_l_left left" v-else>
            <img :src="item.proImg" alt="">
          </div>
          <div class="management_list_l_content left">
            <div class="management_list_l_content_t">
              <div class="management_list_l_content_t_t left">{{item.proName}}</div>
              <div class="management_list_l_content_t_s left" :style="{background:item.proStatus==0?'#aaa':item.proStatus==1?'#f79b5d':item.proStatus==2?'#ce3d3a':item.proStatus==3?'#0076fe':'#aaa'}">{{item.proStatus==0?'未发布':item.proStatus==1?'审核中':item.proStatus==2?'未通过':item.proStatus==3?'已上线':item.proStatus==4?'未上线':item.proStatus==7?'待审核':'平台拒绝'}}</div>
              <div class="management_list_l_content_t_w left">{{item.typeName}}</div>
              <div class="left management_list_l_content_t_tpi" v-if="item.proStatus==2">
                <img src="../../assets/user_img/pass.png" alt=""  @mouseenter="toTip(item)" @mouseleave="leaveTip">
                <div class="black_tip" v-if="item.expire!=0&&i==item.id">
                  <div class="black_tip_title">小程序审核未通过</div>
                  <div class="black_tip_content">{{item.review_result}}</div>
                </div>
              </div>
              <div class="left management_list_l_content_t_tpi" v-if="item.expire==0">
                <img src="../../assets/user_img/pass.png" alt=""  @mouseenter="toTip(item)" @mouseleave="leaveTip">
                <div class="black_tip" v-if="i==item.id" :style="{top:item.expire==0?'-27px':''}">
                  <div class="black_tip_title">应用已过期</div>
                  <div class="black_tip_content">请联系客服。</div>
                </div>
              </div>
            </div>
            <div class="management_list_l_content_c">
              <div class="management_list_l_content_c_status left" v-if="item.online!=3">小程序二维码</div>
              <div class="management_list_l_content_c_statuse left" v-else  @click="ewmShow(item)" style="cursor:pointer;">小程序二维码</div>
              <div class="management_list_l_content_c_time left">有效期至 {{item.expireTime.substr(0,4)}}年{{item.expireTime.substr(5,2)}}月{{item.expireTime.substr(8,2)}}日</div>
            </div>
            <div class="management_list_l_content_b">
                <!-- <div class="management_list_l_content_b_edits left" v-if="item.expire==1" style="cursor:pointer;" @click="userAdmin(item)">
                  <img src="../../assets/user_img/edit.png" alt="" style="float:left;">
                  <div class="management_list_l_content_b_edits_txt">编辑</div>
                </div> -->
                <el-button type="primary" icon="el-icon-edit" size="small"  v-if="item.expire==1"  @click="userAdmin(item)">编辑</el-button>
                <!-- <div class="management_list_l_content_b_edit left" v-if="item.expire==0">
                  <img src="../../assets/user_img/edit.png" alt="" style="float:left;">
                  <div class="management_list_l_content_b_edit_txt">编辑</div>
                </div> -->
                 <el-button type="primary" icon="el-icon-edit" size="small"  v-if="item.expire==0"  disabled>编辑</el-button>
              <!-- <div class="management_list_l_content_b_del left"  v-if="item.proStatus==1 || item.proStatus==3">

                <img src="../../assets/user_img/del1.png" alt="" style="float:left;">
                <div class="management_list_l_content_b_del_txt">删除</div>
              </div> -->
              <el-button type="danger" icon="el-icon-delete" size="small"  v-if="item.proStatus==1 || item.proStatus==3 " disabled>删除</el-button>
              <!-- 效果删除 -->
              <!-- <div class="management_list_l_content_b_dels left clear" v-if="item.proStatus==0 || item.proStatus==2" style="cursor:pointer;" @click="deletes(item)">
               
                <div>
                   <img src="../../assets/user_img/del.png" alt="">
                </div>
                <div class="management_list_l_content_b_dels_txt">删除</div>
              </div> -->
              <el-button type="danger" icon="el-icon-delete" size="small"   v-if="item.proStatus==0 || item.proStatus==2" @click="deletes(item)">删除</el-button>
            </div>
          </div>
          <div class="management_list_l_right right" @click="srpHandle">
            <img src="../../assets/user_img/line.png" alt="">
            <div class="management_list_l_right_txt">数据</div>
          </div>
        </li>
      </ul>
      <userFooter></userFooter> 
    </div>
</template>

<script>
import userHearder from './header';
import userFooter from './footer';
    export default {
        name: "management",
        components:{
        userHearder,
        userFooter
        
      },
      data(){
          return{
            i:-1,
            mask:false,
            list:[],
            showText:false
          }
      },
      created(){
        var that=this;
        this.$axios.post(this.url+'platform/establish/show_program',{}).then(function (res) {
            if(res.data.code==1){
              that.list=res.data.data
              if(res.data.data.length>0){
                that.showText=false;
              }else{
                that.showText=true;
              }
            }
        })
        .catch(function (error) {
            // console.log(error);
        });
      },
      methods:{
        toTip(e){
          this.i=e.id
        },
        leaveTip(){
          this.i=-1;
        },
        ewmShow(e){
          // console.log(e)
          var that=this;
          // if(e.proStatus==2||e.proStatus==3){
            this.$axios.post(this.url+'common_api/wechat_api/formalQr','pro_id='+e.id).then(function (res) {
                if(res.statusText=='OK'){
                  that.$alert(`<div style="font-size:18px;color:#333;">小程序二维码</div><div style="margin-top:20px;height:190px;"><img src="data:`+res.data.data+`" alt="" style="width:190px;height:190px;"></div><div style="margin-top:20px;font-size:12px;color:#666;">使用微信扫一扫查看</div>`, {
                    dangerouslyUseHTMLString: true,
                    showConfirmButton: false,
                    center:true
                  }).catch(() => {
                  });
                }
            })
            .catch(function (error) {
                // console.log(error);
            });
          // }else{
          //   this.$axios.post(this.url+'supper/Application/get_qr','shop_id='+e.id).then(function (res) {
          //       console.log(res);
          //       if(res.statusText=='OK'){
          //         console.log(111111)
          //         that.$alert('<div style="font-size:18px;color:#333;">小程序二维码</div><div style="margin-top:20px;height:190px;"><img src="data:'+res.data+'" alt="" style="width:190px;height:190px;"></div><div style="margin-top:20px;font-size:12px;color:#666;">使用微信扫一扫查看</div>', {
          //           dangerouslyUseHTMLString: true,
          //           showConfirmButton: false,
          //           center:true
          //         }).catch(() => {
          //         });
          //       }
          //   })
          //   .catch(function (error) {
          //       console.log(error);
          //   });
          // }
          
        },
        close(){
          let that = this
          that.mask = !that.mask
        },
        userAdmin(e){
          var that=this;
          this.$axios.post(this.url+'company/Encrypt/index','pro_id='+e.id).then(res=> {
              if(e.typeId==3||e.typeId==6||e.typeId==7){
                  localStorage.setItem('secretId',res.data);
                  localStorage.setItem("proId",e.id);
                  that.$router.push({path:'/wf/admin/newshop',name:'newshop'});
              }else{
                  window.location.href=e.jump_path+'?token='+localStorage.getItem('userId')+'&secret='+res.data;
              }
          })
          .catch(function (error) {
               that.$message.error('网络错误!600B0008');
          });
        },
        chooseModul(){
          localStorage.setItem('activeName','first');
          this.$router.push({path:'/wf/user/index',name:'user_index'})
        },
        srpHandle(){
          this.$alert('<div style="font-size:18px;color:#333;">小程序数据助手</div><div style="margin-top:20px;height:190px;" ><img src="http://uploads.sxlcdn.com/static/marketing/wmp-data-qrcode.jpg" alt="" style="width:190px;height:190px;"></div><div style="margin-top:20px;font-size:12px;color:#666;">使用小程序管理员扫码查看</div>', {
            dangerouslyUseHTMLString: true,
            showConfirmButton: false,
            center:true
          }).catch(() => {
          });
        },
        deletes(e){
          var that=this;
          // console.log(e)
          this.$confirm('删除不可恢复，是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!'
            // });
            that.$axios.post(this.url+'platform/establish/del_program','id='+e.id).then(function (res) {
              // console.log(res);
              if(res.data.code==1){
                // alert('删除成功')
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                that.$axios.post(that.url+'platform/establish/show_program',{}).then(function (res) {
                    // console.log(res);
                    if(res.data.code==1){
                      that.list=res.data.data
                      if(res.data.code==1){
                        that.list=res.data.data
                        if(res.data.data.length>0){
                          that.showText=false;
                        }else{
                          that.showText=true;
                        }
                      }
                    }
                })
                .catch(function (error) {
                    // console.log(error);
                    that.$message.error('错了哦，删除失败');
                });
              }
          })
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
          // this.$axios.post(this.url+'platform/establish/del_program','userid='+localStorage.getItem('userId')+'&id='+e.id).then(function (res) {
          //     console.log(res);
          //     if(res.data.code==1){
          //       alert('删除成功')
          //       that.$axios.post(that.url+'platform/establish/show_program','userid='+localStorage.getItem('userId')).then(function (res) {
          //           console.log(res);
          //           if(res.data.code==1){
          //             that.list=res.data.data
          //           }
          //       })
          //       .catch(function (error) {
          //           console.log(error);
          //       });
          //     }
          // })
        }
      }
    }
</script>

<style lang="scss" scoped>
  #management{
    min-width: 1220px;
    margin: 0 auto;
    padding-top:72px;
    background-color: #fff;
    .WF_logo{
      width: 1220px;
      margin: 0 auto;height: 62px;
    }
    .management_text{
      color:#666;
      width:1220px;
      text-align:center;
      margin:0 auto;
      margin-top:200px;
    }
    .management_title{
      width: 1220px;
      margin: 0 auto;
      padding: 20px 0;
      border-bottom: 1px solid #E6E6E6;
      .management_create{
        cursor:pointer;
        width: 132px;
        height: 44px;
        background: #F79B5D;
        font-size:16px;
        line-height: 44px;
        text-align: center;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        border-radius: 2px;
      }
      .management_create:hover{
        background: #f6a874;
      }
    }
    .management_list{
      width: 1220px;
      margin: 0 auto;
      padding-bottom:160px;
      .management_list_l{
        width: 1220px;
        padding: 20px 0 20px 0;
        border-bottom: 1px solid #E6E6E6;
        .management_list_l_left{
          height: 80px;
          width: 80px;
          border-radius:50%;
          img{
            height: 80px;
            width: 80px;
            border-radius: 50%;
            border: 1px solid #e7e7e7;
          }
          // background: red;
        }
        .management_list_l_content{
          margin-left: 40px;
          .management_list_l_content_t{
            width: 100%;
            height:26px;
            .management_list_l_content_t_t{
              // width:130px;
              height:26px;
              font-size:26px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              line-height: 26px;
              color:rgba(22,22,22,1);
            }
            .management_list_l_content_t_s{
              width:54px;
              height:24px;
              background:rgba(170,170,170,1);
              border-radius:4px;
              font-size:12px;
              line-height: 24px;
              font-family:MicrosoftYaHei;
              text-align: center;
              margin-left: 25px;
              margin-top: 3px;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
            .management_list_l_content_t_w{
              padding: 0 5px;
              margin-left: 18px;
              height:24px;
              border:1px solid rgba(0,118,254,1);
              border-radius:4px;
              font-size:12px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(0,118,254,1);
              line-height: 22px;
              text-align: center;
              margin-top: 2px;
            }
            .management_list_l_content_t_tpi{
              height:24px;
              margin-left: 13px;
              position: relative;
             img{
               margin-top: 6px;
             }
              .black_tip{
                width: 292px;
                // height: 120px;
                background: url("../../assets/user_img/nlack1.png") no-repeat;
                background-size:100% 100%;
                position: absolute;
                left: 30px;
                top: -38px;
                padding:14px 0 0 17px;
                .black_tip_title{
                  width:200px;
                  font-size:18px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  color:rgba(255,255,255,1);
                  margin-left: 10px;
                }
                .black_tip_content{
                  width:240px;;
                  font-size:14px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  color:rgba(206,206,206,1);
                  line-height:20px;
                  margin-left: 10px;
                  margin-top: 12px;
                  margin-bottom: 15px;
                }
              }
            }
          }
          .management_list_l_content_c{
            height: 17px;
            width: 100%;
            margin: 15px 0 15px 0;
            .management_list_l_content_c_statuse,
            .management_list_l_content_c_status{
              width:130px;
              height:16px;
              font-size:16px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              line-height: 16px;
              color:rgba(144,143,143,1);
            }
            .management_list_l_content_c_statuse{
              color:#0076fe;
            }
            .management_list_l_content_c_statuse:hover{
              color:#56a4ff;
            }
            .management_list_l_content_c_time{
              height:17px;
              font-size:16px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(144,143,143,1);
              line-height: 17px;
              margin-left: 30px;
            }
          }
          .management_list_l_content_b{
            width: 100%;
            height: 40px;
            .management_list_l_content_b_edit{
              width:60px;
              height:20px;
              background: #DADBDD;
              padding: 12px 15px;
              border-radius:4px;
              img{
                height: 20px;
                width: 20px;
                display: inline-block;
                
              }
              .management_list_l_content_b_edit_txt{
                width:32px;
                height:16px;
                font-size:16px;
                line-height: 16px;
                font-weight:400;
                color:rgba(246,246,246,1);
                float: left;
                margin-left: 6px;
              }
            }
            .management_list_l_content_b_edits{
              border-radius:4px;
              // width:60px;
              // height:20px;
              background: #F79B5D;
              padding:12px 15px;
              img{
                height: 20px;
                width: 20px;
                display: inline-block;
                // float: left;
              }
              .management_list_l_content_b_edits_txt{
                 width:32px;
                height:16px;
                font-size:16px;
                line-height: 16px;
                font-weight:400;
                color:rgba(255,255,255,1);;
                float: right;
                margin-left: 6px;
              }
            }
            .management_list_l_content_b_edits:hover{
              background: #F79B5D;
              opacity: .8
            }
            .management_list_l_content_b_del{
              // width:60px;
              // height:20px;
              background:rgba(218,219,221,1);
              margin-left: 25px;
              border-radius:4px;
              padding:12px 15px;
              img{
                height: 20px;
                width: 20px;
                display: inline-block;
              }
              .management_list_l_content_b_del_txt{
                width:32px;
                height:16px;
                font-size:16px;
                font-weight:400;
                color:rgba(246,246,246,1);
                float: left;
                margin-left: 6px;
              }
            }
            .management_list_l_content_b_dels{
              // width:60px;
              // height:20px;
              margin-left: 25px;
              background:#fff;
              border-radius:4px;
              padding:12px 15px;
              border:1px solid #E7E7E7;
              img{
                height: 20px;
                width: 20px;
                display: inline-block;
                // float: left;
                // background: url("../../assets/user_img/del.png") no-repeat;
              }
              .management_list_l_content_b_dels_txt{
                width:32px;
                height:20px;
                font-size:16px;
                font-weight:400;
                color:rgba(142,142,142,1);
                float: left;
                margin-left: 6px;
                line-height:20px;
              }
            }
            .management_list_l_content_b_dels:hover{
                background: #f6f6f6;
                border: 1px solid #e8e8e8;
            }

          }
        }
        .management_list_l_right{
          height: 100px;
          width: 100px;
          padding-top: 20px;
          text-align: center;display: table-cell;
          cursor: pointer;
          box-shadow: 0 0px 20px 0px rgba(2, 63, 167, 0.1), 0 2px 3px -1px rgba(226, 226, 226, 0.03);
          transition: box-shadow 0.3s ease-in-out;
          border-radius: 2px;
          &:hover{
              box-shadow: 0px 0px 20px 0px rgba(40, 120, 255, 0.1), 0 8px 9px 1px rgba(0, 0, 0, 0.13);
          }
          .management_list_l_right_txt{
            width: 100%;
            height: 20px;
            text-align: center;
            line-height: 20px;
            margin-top: 20px;
            color: #ccc;
          }
        }
      }
    }
    .mask{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      bottom:0;
      right: 0;
      background: rgba(0,0,0,.3);
      .mask_box{
        padding-top: 42px;
        width: 420px;
        height: 280px;
        background: #fff;
        left: 40%;
        position: absolute;
        top:40%;
        .close{
          position: absolute;
          right: 26px;
          top: 26px;
        }
        .maxk_box_title{
          width: 100%;
          height:18px;
          font-size:18px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(37,37,37,1);
          line-height: 18px;
          text-align: center;
          margin-bottom: 29px;
        }
        .maxk_box_img{
          width:169px;
          height:155px;
          margin: 0 auto;
          background: red;

        }
        .maxk_box_content{
          width: 100%;
          height:11px;
          line-height: 11px;
          text-align: center;
          font-size:10px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(58,58,58,1);
          margin-top: 26px;
        }
      }
    }
  }
</style>
