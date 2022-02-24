<template>
   <div >
       <div class="features_box ">
           <div class="features left">
               <div class="tit">热点功能</div>
               <el-row class="features_cart" type="flex"  justify="space-between">
                   <el-col  class="list" :span="5" >
                       <router-link to="/wf/admin/shop/order">
                        <img src="https://cdn2.19mini.com/2019-05-28%2F01b6d23f8e11333255da88c77adb03e1.png" alt="" class="list-img">
                        <div class="list-txt-to ">
                            普通订单
                        </div>
                        </router-link>
                       
                   </el-col>
                   <el-col  class="list" :span="5" >
                       <router-link to="/wf/admin/shop/grouporder">
                        <img src="https://cdn1.19mini.com/2019-05-28%2Fc917e748339ff0cbb7be414496c4eeae.png" alt="" class="list-img">
                        <div class="list-txt-to ">
                            团购订单
                        </div>
                        </router-link>
                       
                   </el-col>
                   <el-col  class="list" :span="5" >
                       <router-link to="/wf/admin/shop/newshop_list">
                        <img src="https://cdn3.19mini.com/2019-05-28%2Fb98641d884608e714610714e621afba4.png" alt="" class="list-img">
                        <div class="list-txt-to ">
                            发布商品
                        </div>
                        </router-link>
                       
                   </el-col>
                   <el-col  class="list" :span="5" >
                       <router-link to="/wf/admin/shop/diy">
                        <img src="https://cdn1.19mini.com/2019-05-28%2Fc0247a9924b0a62dac69d595b761f319.png" alt="" class="list-img">
                        <div class="list-txt-to ">
                            店铺装修
                        </div>
                        </router-link>
                       
                   </el-col>
               </el-row>
            </div>
       </div>
       
       
   </div>
</template>

<script>
export default {
    name: 'shop_overview',
    data() {
        return {
           
        }
    },
    created(){
       
    },
    methods: {
       
    }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
#overview{
   
    .clear{
        clear: both;
    }
    .tit{
        padding: 0 0 0 50px;
        background: #fff;
        font-size:20px;
        color:rgba(51,51,51,1);
        height: 84px;
        line-height: 84px;

    }
    a{
        text-decoration:none
    }
    a:hover{
            text-decoration:none
    }
    .list{
        width: 99px;
        height: 100%;
        .list-img{
            width: 99px;
            height: 99px;
            margin-bottom:20px;
        }
        
        .list-txt-to{
            width: 100%;
            text-align: center;
            font-size:16px;
            color:rgba(51,51,51,1);
        }
        
    }
    .features_box{
        margin-top: 20px;

    }
    .features_box .features{
        // width: 1221px;
        height: 100%;
        float: left;
        width: 100%;
    }
    .features_cart{
        background: #fff;
        padding: 0.3rem 6% 1.3rem 6%;
        line-height: 32px;
        // border-radius: 0px;
    }
    .features_cart img{
        float: left;
        margin-right: 23px;
    }
    .features_cart div:first-child img{
        margin-left: 0;
    }
    
}
</style>
