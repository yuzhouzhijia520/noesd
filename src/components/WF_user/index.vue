<template>
    <div id="user_index">
        <userHearder></userHearder>
         <div class="chios_show">
        <div class="choose center">请选择一个小程序类型</div>
        <div class="style center">不同的类型具有不同的功能与使用场景</div>
        <div class="chios_show_li">
          <ul class="clear">
            <li class="chios_show_list left" v-bind:class="type==index?'addBg':''" ref="typeBtn" @click="clickBtn(index)" v-for="(item,index) in list" :key="index" @mouseover="hoverBtn(index)" @mouseout="afterBtn(index)">
              <img :src="item.type_icon_hover" alt="" class="chios_show_list_img left" v-if="type==index">
              <img :src="item.hover==false?item.type_icon:item.type_icon_hover" alt="" class="chios_show_list_img left" v-else> 
              <div class="chios_show_list_txt left"  ref="typeColor">{{item.type_name}}</div>
            </li>
          </ul>
        </div>
      </div>
        <div>

        </div>
        <div class="img center">
            <el-col v-if="type==0" :span="12" v-for="(item,index) in first_list" :key="index" >
              <div class="box">
                <!-- <img :src="phoneCreate" alt=""> -->
                <img v-lazy="item.image" :key="item.image.src" alt="" class="wf-user_index-img">
                <div class="wf-black">
                  <div class="wf-white">
                    <h1 class="title">{{item.title}}</h1>
                    <ul>
                      <li v-for="(it,i) in item.li" :key="i">{{it}}</li>
                    </ul>
                    <p>售价：<span class="wf-red">￥{{item.price}}</span></p>
                  </div>
                  <div class="wf-button" @click="jumpShop(index)">立即使用</div>
                </div>
              </div>
            </el-col>

            <el-col v-if="type==1" :span="24" v-for="(item,index) in  second_list" :key="index">
              <div class="box">
                <img  v-lazy="item.image" :key="item.image.src" alt="" class="wf-user_index-img">
                <div class="wf-black">
                  <div class="wf-white">
                    <h1 class="title">{{item.title}}</h1>
                    <ul>
                      <li v-for="(it,i) in item.li" :key="i">{{it}}</li>
                    </ul>
                    <p>售价：<span class="wf-red">￥{{item.price}}</span></p>
                  </div>
                  <div class="wf-button" @click="jumpFood(index)">立即使用</div>
                </div>
              </div>
            </el-col>

            <el-col v-if="type==2" :span="24" v-for="(item,index) in  third_list" :key="index">
              <div class="box">
                <img  v-lazy="item.image" :key="item.image.src" alt="" class="wf-user_index-img">
                <div class="wf-black">
                  <div class="wf-white">
                    <h1 class="title">{{item.title}}</h1>
                    <ul>
                      <li v-for="(it,i) in item.li" :key="i">{{it}}</li>
                    </ul>
                    <p>售价：<span class="wf-red">￥{{item.price}}</span></p>
                  </div>
                  <div class="wf-button" @click="jumpZhanshi(index)">立即使用</div>
                </div>
              </div>
            </el-col>
            <el-col v-if="type==3" :span="24" v-for="(item,index) in  four_list" :key="index">
              <div class="box">
                <img  v-lazy="item.image" :key="item.image.src" alt="" class="wf-user_index-img">
                <div class="wf-black">
                  <div class="wf-white">
                    <h1 class="title">{{item.title}}</h1>
                    <ul>
                      <li v-for="(it,i) in item.li" :key="i">{{it}}</li>
                    </ul>
                    <p>售价：<span class="wf-red">￥{{item.price}}</span></p>
                  </div>
                  <div class="wf-button" @click="jumpguoji(index)">立即使用</div>
                </div>
              </div>
            </el-col>
        </div>
        <div class="gray">你可以任意修改模版内容、风格，但是不同类型之间无法切换。</div>
        <userFooter></userFooter> 
    </div>
</template>


<script>
import userHearder from './header';
import userFooter from './footer';
export default {
    name:'',
     components:{
        userHearder,
        userFooter
        
      },
    data(){
        return{
          type: 0,
          phoneCreate:require('../../assets/user_img/phoneCreate.png'),
          list:[
            {
              type_name: '电商',
              type_icon: require('../../assets/user_img/shop.png'),
              hover: false,
              type_icon_hover: require('../../assets/user_img/shop_hover.png')
            },
            {
              type_name: '餐饮',
              type_icon: require('../../assets/user_img/shiwu.png'),
              hover: false,
              type_icon_hover: require('../../assets/user_img/shiwu_hover.png')
            },
            {
              type_name: '展示',
              type_icon: require('../../assets/user_img/zhanshi.png'),
              hover: false,
              type_icon_hover: require('../../assets/user_img/zhanshi_hover.png')
            },
            {
              type_name: '国际电商',
              type_icon: require('../../assets/user_img/guojihua.png'),
              hover: false,
              type_icon_hover: require('../../assets/user_img/guojihuas.png')
            }
          ],
          first_list: [
            {
              image:{
                  preLoad:1,
                  src: require("@/assets/user_img/电商.png"),
                  error: require("@/assets/user_img/电商.png"),
                  loading: require("@/assets/user_img/small.png")
              },
              title: '电商专业版',
              li: ['1.小程序下单','2.优惠券功能','3.拼团、秒杀，可持续更新高级功能'],
              price: '12800',
              type_id: 3,
              tem_id: 90
            },
            {
              image:{
                  preLoad:1,
                  src:require("../../assets/user_img/HY闺蜜家.png"),
                  error:require("../../assets/user_img/HY闺蜜家.png"),
                  loading: require("@/assets/user_img/small.png")
              },
              title: '电商基础版',
              li: ['1.小程序下单','2.优惠券功能','3.不可升级高级功能'],
              price: '5000',
              type_id: 6,
              tem_id: 90
            }
          ],
          second_list: [
            {
              image:{
                  preLoad:1,
                  src: require("@/assets/user_img/餐饮.png"),
                  error: require("@/assets/user_img/餐饮.png"),
                  loading: require("@/assets/user_img/small.png")
              },
              title: '餐饮',
              li: ['1.店内点餐、叫号','2.导航到店','3.多规格点餐'],
              price: '3999',
              type_id: 2,
              tem_id: 42
            }
          ],
          third_list: [
            {
              image:{
                  preLoad:1,
                  src: require("@/assets/user_img/展示.png"),
                  error: require("@/assets/user_img/展示.png"),
                  loading: require("@/assets/user_img/small.png")
              },
              title: '展示',
              li: ['1.新闻动态','2.公司简介、导航、联系我们','3.预约咨询'],
              price: '999',
              type_id: 4,
              tem_id: 44
            }
          ],
          four_list:[
            {
              image:{
                  preLoad:1,
                  src: require("@/assets/user_img/s.png"),
                  error: require("@/assets/user_img/s.png"),
                  loading: require("@/assets/user_img/small.png")
              },
              title: '国际电商版',
              li: ['1.查看实时汇率','2.商品支持展示外币价格','3.即将支持跨境支付，物流等','4.跨境海关收集买家身份证信息'],
              price: '19800',
              type_id: 7,
              tem_id: 90
            },
            
          ]
        }
    },
    created(){
    },
    methods:{
      hoverBtn(index){
        this.list[index].hover = true
      },
      afterBtn(index){
        this.list[index].hover = false
      },
      clickBtn(index){
        if(this.type!=index)
        this.type = index
      },
      jumpShop(index){
        let type_id = this.first_list[index].type_id
        let tem_id = this.first_list[index].tem_id
        this.$router.push({path:'/wf/user/login',name:'user_Login',query:{id:type_id,temId:tem_id}})
      },
      jumpFood(index){
        let type_id = this.second_list[index].type_id
        let tem_id = this.second_list[index].tem_id
        this.$router.push({path:'/wf/user/login',name:'user_Login',query:{id:type_id,temId:tem_id}})
      },
      jumpZhanshi(index){
        let type_id = this.third_list[index].type_id
        let tem_id = this.third_list[index].tem_id
        this.$router.push({path:'/wf/user/login',name:'user_Login',query:{id:type_id,temId:tem_id}})
      },
      jumpguoji(index){
        let type_id = this.four_list[index].type_id
        let tem_id = this.four_list[index].tem_id
        this.$router.push({path:'/wf/user/login',name:'user_Login',query:{id:type_id,temId:tem_id}})
      }
    }
}
</script>


<style lang="scss">

  #user_index{
    padding-top:72px;
    .wf-user_index-img{
        padding: 20px;
    }
  }
  #user_index   .found{
      width: 1220px;
      padding:28px 0;
      margin: 0 auto;

    }
  #user_index   .center_found{
        width:132px;
        height:44px;
        background:rgba(247,155,93,1);
        border-radius:6px;
        text-align:center;
        line-height:44px;
        color:#fff;
        font-size:16px;
        font-weight:400;
        cursor:pointer;
    }
    #user_index  .hr{
        width:100%;
        height:1px;
        background:rgba(230,230,230,1);
    }
  #user_index   .center{
        width: 800px;
        margin:0 auto;
        text-align:center;
        overflow: hidden;
    }
  #user_index   .fond_text{
        height:44px;
        font-size:16px;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:44px;
        padding-right:26px;
    }
  #user_index   .choose{
        height:100px;
        line-height:100px;
        font-size:24px;
        font-weight:400;
        color:rgba(35,35,35,1);
    }
  #user_index   .style{
        height:14px;
        line-height:14px;
        font-size:14px;
        font-weight:400;
        color:rgba(130,130,130,1);
    }
  #user_index   .img{
        margin-bottom:20px;
        .box{
          width: 321px;
          height: 522px;
          margin: 0 auto;
          img{
              width: 66%;
          }
          .wf-black{
            display: none;
          }
          &:hover{
            .wf-black{
                display: block;
                width: 50%;
                position: relative;
                top: -70.5%;
                background: rgba(0, 0, 0, 0.5);
                padding-top: 5px;
                padding-bottom: 10px;
                margin-left: 80px;
                border-radius: 2px;
              .wf-white{
                background: #F9F7FA;
                width: 142px;
                margin: 0 auto;
                color: #666;
                padding: 15px  0;
                text-align: center;
                border-radius:4px;
                .title{
                  color: #333;
                  font-size: 16px!important;
                }
                ul{
                  padding: 0;
                  text-align: left;
                  margin-top: 18px;
                  padding: 0 16px 0 20px;
                  font-size: 12px;
                  li{
                    line-height: 20px;
                  }
                }
                p{
                  text-align: right;
                  padding-right: 10px;
                  .wf-red{
                    color: #DB5444;
                    font-size: 18px;
                  }
                }
              }
              .wf-button{
                width: 100px;
                height: 36px;
                background: #DB5444;
                color: #fff;
                border-radius: 18px;
                margin: 0 auto;
                margin-top: 23px;
                cursor: pointer;
                line-height: 36px;
              }
            }
          }
        }
    }
  #user_index   .bottom{
        height:14px;
        font-size:14px;
        line-height:14px;
        font-weight:400;
        color:rgba(180,179,179,1);
    }
 #user_index    .chios_show_li{
      width: 470px;
      margin: 0 auto;
      margin-top: 40px;
      color:#DB5444;
       .addBg{
          background: #DB5444;
          color:#fff;
        }
      .chios_show_list{
        padding: 14px 31px;
        
        line-height: 12px;
        border:1px solid #DB5444;
        border-radius:100px;
        margin-bottom: 17px;
        margin-right: 30px;
        cursor: pointer;
        .chios_show_list_img{
          width: 16px;
          height: 14px;
          margin-top: 3px;
        }
       
        .chios_show_list_txt{
          height: 20px;
          line-height: 20px;
          margin-left: 10px;
        }
        &:hover{
          background: #DB5444;
          .chios_show_list_txt{
            color: #fff;
          }
        }
      }
      :nth-child(4){
        margin-right: 0;
      }
      :nth-child(8){
        margin-right: 0;
      }
    }
  #user_index .gray{
    text-align: center;
    color: #B4B3B3;
    font-size: 14px;
  }
</style>


