<template>
    <!-- class="wf-" -->
    <div class="wf-question-previewQuestion">
        <el-steps :active="3" class="wf-steps" simple>
            <el-step title="创建表单" class="one"><div class="icon-active" slot="icon">1</div></el-step>
            <el-step title="设置表单内容" class="two"><div class="icon-active " slot="icon">2</div></el-step>
            <el-step title="编辑分析报告及推荐商品" class="three"><div class="icon-active three" slot="icon">3</div></el-step>
            <el-step title="完成" class="four"><div class="icon-active four" slot="icon">4</div></el-step>
        </el-steps>
        <el-row class="wf-public-center">
            问卷设置完成
        </el-row>
        <el-row class="wf-public-center">
            <canvas id="canvas"></canvas>
        </el-row>
        <el-row class="wf-public-center">
            扫一扫立即参与作答
        </el-row>
        <el-row class="wf-public-center wf-help">
            (请用微信扫一扫)
        </el-row>
        <el-row  class="wf-public-center wf-button">
            <el-button @click="handleUpdate" v-if="$route.query.state==0" size="mini">上一步</el-button>
            <el-button  type="info" v-else-if="$route.query.state==1" disabled size="mini">上一步</el-button>
            <el-button type="primary" v-if="$route.query.state==0" @click="handlePublish" size="mini" :loading="loadingBtnPub">发布</el-button>
            <el-button type="info" v-else-if="$route.query.state==1" size="mini" disabled >发布</el-button>
            <el-button type="primary" @click="handleBack" size="mini">返回</el-button>
        </el-row>
    </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
    name: '',
    data() {
        return {
            loadingBtnPub:false
        }
    },
    components: {
        QRCode
    },
    created(){

    },
    mounted(){
        this.useqrcode();
    },
    methods: {
        handleUpdate(){
            this.$router.push({path:'/wf/admin/shop/markting/question/editReport',query:{param:'edit',id:this.$route.query.id,state:this.$route.query.state}});
        },
        handlePublish(){
            let that=this;  
            let data={
                id:this.$route.query.id,
                secret:localStorage.getItem('secretId')
            }      
            this.loadingBtnPub=true;    
            this.$axios.post(this.url+'shopapi/Question/questionRelease',data).then(res=>{
                that.loadingBtnPub=false;
                if(res.data){
                    if(res.data.code==200){
                        that.$message.success(res.data.msg);
                        this.$router.push({path:'/wf/admin/shop/markting/question/previewQuestion',name:'previewQuestion',query:{id:this.$route.query.id,state:1}});
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }else{
                    that.$message.error('网络错误！');
                }
            }).catch(err=>{
                that.loadingBtn=false;
                that.$message.error('网络错误！');
            });
        },
        handleBack(){
            this.$router.push({path:'/wf/admin/shop/markting/question',name:'question'});
        },
        useqrcode(){
            let that=this;
            let url='';
            if(location.hostname.includes('www.19mini.com')||window.location.hostname.includes('www.19mini.com')){
                url='https://h5.19mini.com/activity/questionnaire/index.html?id='+this.$route.query.id;
            }else{
                url='https://dev.h5.19mini.com/activity/questionnaire/index.html?id='+this.$route.query.id;
            }
            let canvas = document.getElementById('canvas')
            QRCode.toCanvas(canvas, url, function (error) {
                if (error) { 
                    this.$message({
                        type: 'info',
                        message: error
                    }); 
                } 
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-question-previewQuestion{
    background-color: #fff;
    padding: 20px;
    .wf-help{
        color: #a7a7a7;
        font-size: 12px;
    }
    .wf-button{
        margin-top: 20px;
    }
    /deep/ .wf-steps{
        @media screen and (max-width: 1365px)  {
            padding: 0;
        }
        @media screen and (min-width: 1366px)  {
            padding: 0;
        }
        @media screen and (min-width: 1600px)  {
            padding: 0 200px;
        }
        background: #fff;
        margin-bottom:50px;
        .el-step__icon.is-text {
                border-radius: 4px;
                background:rgba(243,243,243,1);
                color: #999999;
                border: none;
                width: 24px;
                height: 24px;
                font-size: 14px;
        }
        .is-process {
            .el-step__icon.is-text {
                background-color: #719FF8;
                color: #fff;
            }
        }
        .is-finish{
            .el-step__icon.is-text {
                background-color: #719FF8;
                color: #fff;
            }
        }
        .el-step__main{
            .el-step__arrow{
                &:before{
                    height: 2px;
                    top: 11px;
                    right: 20px;
                    transform: none;
                    background-color: #c0c4cc;
                    width: auto;
                }
                &:after{
                    display: none;
                }
            }
        }
        .one{
            .el-step__main{
                .el-step__arrow{
                    &:before{
                         left: 80px;
                    }
                }
            }
        }
        .two{
            .el-step__main{
                .el-step__arrow{
                    &:before{
                         left: 110px;
                    }
                }
            }
        }
        .three{
            .el-step__main{
                .el-step__arrow{
                    &:before{
                         left: 190px;
                    }
                }
            }
        }
    }
}
</style>