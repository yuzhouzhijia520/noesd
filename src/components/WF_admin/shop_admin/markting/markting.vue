<template>
    <div class="markting-list clear">
        <div class="markting" v-for="(item,index) in list" :key="index">
            <div class="name">{{item.name}} </div>
            <div class="markting-list" v-for="(items,index) in item.children" :key="index" @click="toList(items)">
                <img :src='items.image' class="markting-list-img">
                <div class="markting-list-content">
                    <div class="markting-list-content-title clear">{{items.name}} <img src="@/assets/admin_img/shop_admin_img/white.png" class="markting-list-imgs right" v-if="items.state == 0">  <img src="@/assets/admin_img/shop_admin_img/black.png" alt="" v-if="items.state == 1" class="markting-list-imgs right">  </div>
                    <div class="markting-list-content-txt">{{items.introduce}}</div>
                </div>
                <div class="mosk clear"  v-if="items.state!==2">
                    <img src='@/assets/admin_img/shop_admin_img/noquanxian.png' alt="" class="mosk-img left" v-if="items.state==1">
                    <div class="mosk-text left" v-if="items.state==1">立即开通</div>
                    <img src="@/assets/admin_img/shop_admin_img/noshangxian.png" alt="" class="mosk-img left" v-if="items.state==0">
                    <div class="mosk-text left" v-if="items.state==0">该功能暂未上线</div>
                </div>
            </div>
            
        </div>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
    
</template>

<script>
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getmastinglist } from '@/server/markting.js'
import { getAuditApplicationList } from '@/server/common';
export default {
    data(){
        return {
            //列表
            showdel:"",
            list:[],
            showVersion:false,//控制版本提示
        }
    },
    components: {
        versionCom
    },
    created(){
        // this.getUser()
        
        this.getmastinglists()
    },
    methods: {
        handleCloseVersion(){
            this.showVersion=false;
        },
        getmastinglists(){
            let that = this
            const loading = this.$loading({
                lock: true,
                text: '拼命加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let data = {pro_id: parseInt(localStorage.getItem('proId'))}
             getmastinglist(data).then(function (res) {
                 if(res.data.code ==200){
                     that.list = res.data.data
                     loading.close()
                     
                 }
             })
        },
        toList(e){
            /**
             * 39 好物圈
             */
            let that=this;
            if(e.id===39){
                getAuditApplicationList(25).then((res)=>{
                    if(res.data.code==200){
                        if(res.data.data){
                            if(e.state == 2){//免费
                                that.$router.push({path:e.path})
                            }else if(e.state == 1){//功能开发完的
                                that.$router.push({path:'/wf/admin/shop/markting/watchtooldetail',query:{id:e.id}})
                            }else{
                                that.$message({
                                    title: '提示',
                                    message: '敬请期待',
                                    type: 'warning'
                                });
                            }
                        }else{
                            that.showVersion=true;
                        }
                    }else{
                        that.$message.error(res.data.msg+"600A00135");
                    }
                }).catch((item)=>{
                    that.$message.error(res.data.msg+"600B00136");
                })
            }else if(e.state == 2){//免费
                that.$router.push({path:e.path,query:{id:e.id}})
            }else if(e.state == 1){//功能开发完的
                that.$router.push({path:'/wf/admin/shop/markting/watchtooldetail',query:{id:e.id}})
            }else{
                that.$message({
                    title: '提示',
                    message: '敬请期待',
                    type: 'warning'
                });
            }
        }
    }
};
</script>
<style lang="scss">
@import "src/styles/mixin.scss";
.clear{
    clear: both;
}
.markting-list{
    margin-top: -20px;
        .markting{
        // padding:21px 0;
        float: left;
        
        
        .name{
            height:60px;
            width: 100%;
            padding-left:16px;
            font-size:24px;
            color:rgba(0,0,0,1);
            line-height: 60px;

        }
        .markting-list{
            position: relative;
            // width: 384px;
            cursor: pointer;
            height:95px;
            background: #fff;
            border-radius: 2px;
            box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.06);
            // padding: 22px 0;
            padding-left:20px;
            float: left;
            margin: 0 40px 35px 14px;
            &:hover{
                    .mosk{
                        display: block;
                    }
                }
            .mosk{
                position: absolute;
                width: 182px;
                height: 29px;
                padding: 33px 91px 33px 83px;
                top:0;
                display: none;
                bottom:0;
                left: 0;
                right: 0;
                background:rgba(76,76,76,1);
                box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.06);
                border-radius:4px;
                .mosk-img{
                    width: 28xp;
                    height: 30px;
                }
                .mosk-text{
                    font-size:20px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    margin-left: 14px;
                    text-align: center;
                    width: 140px;
                }
            }
            .markting-list-img{
                width: 60px;
                height: 60px;
                box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.06);
                border-radius:8px;
                // background: red;
                display: block;
                float: left;
                margin-top: 15px;
            }
            .markting-list-content{
                float: left;
                margin-left:20px;
                // width: 256px;
                // height: 120px;
                padding:10px 0;
                // width: 60%;
                .markting-list-content-title{
                    width: 100%;
                    font-size:22px;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    height: 40px;
                    line-height: 40px;
                    text-align: left;
                    .markting-list-imgs{
                        margin-right: 22px;
                        margin-top: 5px;
                        width: 21px;
                        height:22px;
                        // background: red;
                    }
                }
                .markting-list-content-txt{
                    // height: 50px;
                    width: 256px;
                    font-size:15px;
                    color:rgba(102,102,102,1);
                    text-align: left;
                    line-height: 30px;
                }
            }
           
        }
        .markting-list{
             @include floatHover
        }
    }
}
    
</style>