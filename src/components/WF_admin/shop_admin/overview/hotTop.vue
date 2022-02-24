<template>
    <div class="wf-hotTop" v-if="topTen.length>0">
        <p class="tit">用户购买力推荐TOP10</p>
        <div class="wf-card-box">
            <div class="wf-card" v-for="(item,index) in topTen" :key="index">
                <div v-if="index===0||index===1||index===2" :class="'wf-top wf-top'+index">{{index===0?"NO.1":index===1?"NO.2":index===2?"NO.3":""}}</div>
                <img v-if="item.avatarUrl" :src="item.avatarUrl" class="wf-img">
                <div v-else class="wf-img"></div>
                <div class="wf-text">{{item.nickName}}</div>
                <div class="wf-text" v-if="item.total_price">￥{{item.total_price}}</div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
import { hotTopImg } from '@/server/hotTop.js'
export default {
    name: "hotTop",
    data() {
        return {
            topTen: []
        }
    },
    mounted(){
        this.getImg()
    },
    methods: {
        getImg(){
            let that = this
            let data={
                token: localStorage.getItem('userId'),
                pro_id: localStorage.getItem('proId')
            }
            hotTopImg(data).then((res)=>{
                if(res.data.code==200){
                    that.topTen = res.data.data
                }else{
                   that.$message.error(res.data.data+"600A00179");
                }
            }).catch((err)=>{
                that.$message.error('网络错误!600B00180');
            }); 
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-hotTop{
    padding: 20px;
    background: #fff;
    margin-top: 20px;
    box-sizing: border-box;
    margin: 20px 16px 0 16px;
    .tit{
        padding: 10px 0 10px 30px;
        font-size:20px;
        color:rgba(51,51,51,1);
    }
    .wf-card-box{
        padding: 10px;
        .wf-card{
            float: left;
            margin-right: 33px;
            margin-top: 10px;
            .wf-img{
                width: 90px;
                height: 90px;
                border-radius: 4px;
                vertical-align: middle;
                background-color: #E7E7E7;
            }
            .wf-top{
                position: absolute;
                width: 50px;
                height: 18px;
                border-radius: 2px;
                color: #fff;
                font-size: 12px;
                text-align: center;
                line-height: 18px;
            }
            .wf-top0{
                background: #FCE772;
            }
            .wf-top1{
                background: #D1D1D1;
            }
            .wf-top2{
                background: #E9C694;
            }
            .wf-text{
                padding: 0 2px;
                margin-top: 10px;
                height: 15px;
            }
        }
    }
    .clear{
        clear: both;
    }
}
</style>
