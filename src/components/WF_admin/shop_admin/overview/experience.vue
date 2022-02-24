<template>
   <div>
       <div class="features_box ">
           <div class="features">
               <div class="tit">二维码体验</div>
               <el-row class="features_cart" type="flex"  justify="space-around">
                   <el-col class="list" :span="5">
                        <img src="https://cdn0.19mini.com/2019-05-28%2F8b536801de4ebfac3c8eac6a4ca5ce56.jpg" alt="" class="list-img"/>
                        <div class="list-txt-to ">
                            云商户平台
                        </div>
                        <div class="list-txt-tol ">
                            使用商户小程序管理订单、商品、版本
                        </div>
                   </el-col>
                   <el-col class="list" :span="5">
                        <img v-if="this.$store.state.oemFlag"  :src="tiyaner?tiyaner:this.$store.state.serverList.data.load_logo" alt="" class="list-img"/>
                        <img v-else :src="tiyaner?tiyaner:re" alt="" class="list-img"/>
                        <div class="list-txt-to ">
                            店铺预览
                        </div>
                        <div class="list-txt-tol ">
                            成功绑定小程序后可查看
                        </div>
                   </el-col>
                   <el-col class="list" :span="5">
                        <img v-if="this.$store.state.oemFlag" :src="zer?zer:this.$store.state.serverList.data.load_logo" alt="" class="list-img"/>
                        <img v-else :src="zer?zer:re" alt="" class="list-img"/>
                        <div class="list-txt-to ">
                            上线二维码
                        </div>
                        <div class="list-txt-tol ">
                            成功绑定小程序后可查看
                        </div>
                   </el-col>
                   <el-col class="list" :span="5">
                        <img src="../../../../assets/proxy_img/shuju.jpg" alt="" class="list-img"/>
                        <div class="list-txt-to ">
                            数据助手
                        </div>
                        <div class="list-txt-tol ">
                            用管理员身份微信扫描查看数据
                        </div>
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
            re:require('../../../../assets/admin_img/shop_admin_img/gray.png'),
            tiyaner:'',
            zer:''
        }
    },
    created(){
       this.getData()
       this.getDatal()
    },
    methods: {
       getData(){ // 获取体验二维码数据
            let that = this
            this.$axios.post(this.url + 'common_api/wechat_api/experienceQr',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            )
            .then(function(res){
                if(res.data.code===1){
                    that.tiyaner = 'data:' + res.data.data
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
         getDatal(){ // 获取上线二维码
            let that = this
            this.$axios.post(this.url + 'common_api/wechat_api/formalQr',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            )
            .then(function(res){
                if(res.data.code===1){
                    that.zer = 'data:' + res.data.data
                    // that.count = res.data.data.count
                    // that.refund = res.data.data.refund
                    // that.send = res.data.data.send
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
        }
    }
}
</script>

<style lang="scss" scoped>

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
        display: table-cell;
        text-align: center;
        .list-img{
            width: 99px;
            height: 99px;
            min-height: 99px;
        }
        
        .list-txt-to{
            width: 100%;
            text-align: center;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
        }
        .list-txt-tol{
            font-size:12px;
            font-family:MicrosoftYaHeiLight;
            font-weight:300;
            color:rgba(51,51,51,1);
            line-height: 20px;
        }
    }
    .features_box .features{
        height: 100%;
        float: left;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .features_cart{
        background: #fff;
        padding: 0.3rem 6% 1.5rem 6%;
        line-height: 32px;
        border-radius: 4px;
    }
}
</style>
