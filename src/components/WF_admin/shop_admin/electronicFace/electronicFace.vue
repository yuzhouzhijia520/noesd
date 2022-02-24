<template>
    <div class="wf-electronicFace">
        <el-row>
            <el-col v-for="(item,index) in cardList" :key="index" class="wf-courier-box" :span="5" :offset="1">
                <div class="wf-img-box">
                    <img :src="item.img" alt="">
                </div>
                <el-row class="wf-btn-box">
                    <!-- 暂缺查看模板功能，只显示去使用按钮
                    <el-col :span="12">
                        <el-button class="wf-btn-default" type="text">查看模板</el-button>
                    </el-col>
                    <el-col :span="2">
                        <div class="wf-vertical-line"></div>
                    </el-col>
                    <el-col :span="10">
                        <el-button type="text" @click="goToUse">去使用</el-button>
                    </el-col> -->
                    <el-col :span="24">
                        <el-button type="text" @click="goToUse">去使用</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { electronicFaceIndex, electronicModularSwitch } from "@/server/electronicFace.js"
export default {
    name: "electronicFace",
    data() {
        return {
            cardList: []
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId"),
            }
            electronicFaceIndex(data).then((res)=>{
                if(res.data.code===200){
                    that.cardList = res.data.data
                }else{
                    that.$message.error(res.data.msg+"600A00125");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00126');
            })
        },
        goToUse(){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId"),
                modular_id: 40
            }
            electronicModularSwitch(data).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===true){
                        window.open(this.$router.resolve({path:'/wf/admin/shop/waybillManagement',query:{type:2}}).href);
                    }else{
                        that.$router.push({path:'/wf/admin/shop/markting/watchtooldetail',query:{id:40}})
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00133");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00134');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-electronicFace{
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    .el-button--text{
        color: #719FF8;
    }
    .wf-courier-box{
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 20px;
        .wf-img-box{
            box-sizing: border-box;
            img{
                width: 100%;
                height: 166px;
                display: block;
            }
        }
        .wf-btn-box{
            border-top: 1px solid #ccc;
            text-align: center;
        }
    }
    .wf-vertical-line{
        width: 1px;
        height: 24px;
        background: #E1E1E1;
        margin-top: 10px;
    }
    .wf-btn-default{
        color: #333;
    }
}
</style>
