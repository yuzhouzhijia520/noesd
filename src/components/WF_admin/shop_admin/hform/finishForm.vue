<template>
    <!-- class="wf-" -->
    <div class="finishForm">
        <el-steps :active="2" class="wf-steps" simple>
            <el-step title="创建表单" class="one"><div class="icon-active" slot="icon">1</div></el-step>
            <el-step title="设置表单内容" class="two"><div class="icon-active " slot="icon">2</div></el-step>
            <el-step title="完成" class="four"><div class="icon-active four" slot="icon">3</div></el-step>
        </el-steps>
        <el-row class="wf-public-center top">
            表单设置完成
        </el-row>
        <el-row class="wf-public-center">
            <canvas id="canvas"></canvas>
        </el-row>
        <el-row class="wf-public-center bottom">
            扫一扫立即参与作答
        </el-row>
         <div class="wf-submit"> 
            <el-button type="primary"  @click="submit" size="mini" :disabled="publish">发布</el-button>
            <router-link to="/wf/admin/shop/markting/hform"> 
                <el-button type="primary" size="mini">返回</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode';
import {updateState } from '@/server/hform';
export default {
    name: '',
    data() {
        return {
            publish:false
        }
    },
    components: {

    },
    created(){

    },
    mounted(){
        this.hfqrcode();
    },
    methods: {
        submit(){
            let that=this;
            this.$confirm('此操作将发布该表单, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = { 
                    pro_id: parseInt(localStorage.getItem('proId')),
                    token:localStorage.getItem('userId'),
                    id:this.$route.query.id,
                    state:1
                }
                updateState(data).then((res)=>{
                    if(res.data.code===200){
                        that.$message.success("已发布");
                        that.publish=true;
                    }else{
                        that.$message.error(res.data.msg+'600A00231');
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误!'+'600B00232');
                }) 
            }).catch(() => {
                this.$message.info("发布错误");          
            });
        },
        hfqrcode(){
            let that=this;
            let url='http://172.16.0.198:5500/#/';
            // if(location.hostname.includes('www.19mini.com')||window.location.hostname.includes('www.19mini.com')){
            //     url='https://h5.19mini.com/activity/hform/index.html?id='+this.$route.query.id;
            // }else{
            //     url='https://dev.h5.19mini.com/activity/hform/index.html?id='+this.$route.query.id;
            // }
            let canvas = document.getElementById('canvas');
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
    .finishForm{
        background-color: #fff;
        padding: 20px;
        .top{
            margin-top: 100px;
        }
        .bottom{
            margin-bottom: 100px;
        }
        .wf-submit{
            text-align: center;
        }
    }

</style>