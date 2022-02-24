<template>
   <div >
       <div class="wf-overview-last">
            <div class="product">
                <div class="product-title">常用营销工具</div>
                <div class="product-list left" v-for="(item,index) in list" :key="index" @click="toList(item.url)">
                    <img :src='item.img' alt="" class="product-list-img left">
                    <div class="product-list-txt left">{{item.name}}</div>
                </div>
            </div>
       </div>
      
   </div>
</template>

<script>
export default {
    name: 'shop_overview',
    data() {
        return {
           list:[
               {
                   img: 'https://cdn0.19mini.com/2019-05-28%2F5ffaddb27126b54788ed1e2c25283437.png',
                   name:'优惠券',
                   url:'/wf/admin/shop/markting/coupon'
               },
               {
                   img: 'https://cdn1.19mini.com/2019-05-28%2F37d2b40822ddc9c37e1daba8b83bf513.png',
                   name:'拼团',
                   url:'/wf/admin/shop/markting/group'
               },
               {
                   img: 'https://cdn3.19mini.com/2019-05-28%2Febed75a7f819708b63521d6f8182389c.png',
                   name:'秒杀',
                   url:'/wf/admin/shop/markting/seckill'
               },
               {
                   img: 'https://cdn1.19mini.com/2019-05-28%2F4676366e9c02aec31d7b838435ca01f1.png',
                   name:'砍价',
                   url:'/wf/admin/shop/markting/bargainMenu'
               },
               {
                   img: 'https://cdn1.19mini.com/2019-05-28%2Fe416ed9c8ed26dd0de0674ac81d322c6.png',
                   name:'分销',
                   url:'/wf/admin/shop/markting/disMenu/distributor_list'
               },
               {
                   img: 'https://cdn2.19mini.com/2019-05-28%2Fd6dd1c21639e751b6c4c4f6b1d8b7cce.png',
                   name:'更多',
                   url:'/wf/admin/shop/markting'
               },
           ]
        }
    },
    components:{
    },
    created(){
       
    },
    methods: {
         toList(e){
             this.$router.push({path:e})
            //  if(this.$store.state.proVersion==='电商专业版'){
            //     if(e !== ''){
            //         this.$router.push({path:e})
            //     }else{
            //         this.$alert('功能开发中，敬请期待~', '提示', {
            //             confirmButtonText: '确定',
            //         });
            //     }
            // }else{  //电商基础版
            //     if(e =='/wf/admin/shop/markting/coupon'){
            //         this.$router.push({path:'/wf/admin/shop/markting/coupon'})
            //     }else{
            //         this.$alert('电商专业版专属，暂无体验权限', '提示', {
            //             confirmButtonText: '确定',
            //         });
            //     }
            // }
         }
    }
}
</script>

<style lang="scss">
@import "src/styles/mixin.scss";
.wf-overview-last{
    
    .clear{
        clear: both;
    }

    .product{
        // height: 402px;
        background: #fff;
        padding-bottom: 36px;
        margin-top: 20px;
        float: left;
        width: 100%;
        position: relative;
        .product-title{
            height:75px;
            font-size:20px;
            line-height: 90px;
            color:rgba(51,51,51,1);
            background: #fff;
            padding: 0 0 0 50px;
        }
        .product-list{
            padding: 0 0 0 30px;
            cursor: pointer;
            width: 25%;
            height: 55px;
            // background:rgba(246,246,246,1);
            border-radius:4px;
            // padding:9px 4%;
            margin:0 7px;
            margin-top: 20px;

            .product-list-img{
                width: 40px;
                height: 40px;
                margin-left: 3%;
            }
            .product-list-txt{
                height:44px;
                font-size:16px;
                font-family:MicrosoftYaHei;
                color:rgba(51,51,51,1);
                line-height: 44px;
                margin-left: 5%;
                // width: 100px;
            }
        }
        // .product-list{
        //     box-shadow: 0px 3px 1px -6px rgba(0,0,0,0.2), 0px 2px 2px -1px rgba(0,0,0,0.14), 0px 1px 2px 0px rgba(0,0,0,0.12);
        //     transition: box-shadow 0.3s ease-in-out;
        //     &:hover{
        //         box-shadow: 0px 3px 7px -10px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
        //     }
        // }
    }
    
}
</style>
