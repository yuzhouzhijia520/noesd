<template>
    <div class="wf-crossBorderPurchase">
        <div class="wf-gray-box">
            跨境购功能
            <el-switch
            v-model="open"
            :active-text="openText"
            active-color="#719FF8"
            @change="openSwitch">
            </el-switch>
        </div>
        <p class="wf-red-title">注意：用户下单可以上传实名信息，方便海关清关</p>
        <div class="wf-margin-left-20 wf-margin-top-20">
            上传身份证正反面图片
            <el-switch
            v-model="idCard"
            :active-text="cardText"
            active-color="#719FF8"
            @change="cardSwitch">
            </el-switch>
        </div>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
import { modularsUpdate, modularsIndex } from '@/server/crossBorderPurchase.js';
export default {
    name: "crossBorderPurchase",
    data() {
        return {
            showVersion: false,//控制版本提示
            idCard: true,
            cardText: "未开启",
            open: false,
            openText: "未开启"
        }
    },
    components: {
        versionCom
    },
    mounted(){
        this.getData()
        this.getModularsIndex()
    },
    methods: {
        getModularsIndex(){
            let that = this
            let data = {
                token: localStorage.getItem('userId'),
                pro_id: localStorage.getItem("proId"),
                modular_id: 30
            }
            modularsIndex(data).then((res)=>{
                if(res.data.code===200){
                    if(res.data.msg.child_state===1){
                        that.idCard = true
                        that.cardText = "已开启"
                    }else{
                        that.idCard = false
                        that.cardText = "未开启"
                    }
                }else{
                    that.$message.error(res.data.msg+'600A00213');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!600B00214');
            })
        },
        handleCloseVersion(){ // 关闭版本更新提示弹框
            this.showVersion = false;
        },
        cardSwitch(val){
            let that = this
            if(!this.open){
                this.idCard = false
                this.$message.warning("请先开启跨境购")
                return
            }else{
                getAuditApplicationList(35).then((res)=>{
                    if(res.data.code===200){
                        if(res.data.data===false){
                            that.showVersion = true;
                            that.idCard = !that.idCard
                        }else{
                            let data = {
                                token: localStorage.getItem('userId'),
                                pro_id: localStorage.getItem("proId"),
                                modular_id: 30,
                                type: 0
                            }
                            modularsUpdate(data).then((res)=>{
                                if(res.data.code===200){
                                    if(val){
                                        that.cardText = "已开启"
                                    }else{
                                        that.cardText = "未开启"
                                    }
                                    that.getData()
                                    that.getModularsIndex()
                                    that.$message.success("操作成功")
                                }else{
                                    that.idCard = !that.idCard
                                    that.$message.error(res.data.msg+'600A00211');
                                }
                            }).catch((err)=>{
                                that.idCard = !that.idCard
                                that.$message.error('网络错误!600B00212');
                            })
                        }
                    }else{
                        that.idCard = !that.idCard
                        that.$message.error(res.data.msg+'600A00209');
                    }
                }).catch((err)=>{
                    that.idCard = !that.idCard
                    that.$message.error('网络错误!600B00210');
                })
            }
            
        },
        getData(){
            let that = this;
            let data = {
                secret: localStorage.getItem('secretId')
            }
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            this.$axios.post(this.url+'shopapi/program/compile',data
            ).then(function (res) {
                loading.close()
                if(res.data.code===200){
                    for(let i=0;i<res.data.data.length;i++){
                        if(res.data.data[i].modular_id===30){
                            if(res.data.data[i].state===0){
                                that.open = false
                                that.idCard = false
                            }else{
                                that.open = true
                            }
                        }
                    }
                }else{
                    that.$message.error('请求数据失败');
                }
            })
            .catch(function (error) {
                loading.close()
                that.$message.error('网络错误');
            });
        },
        openSwitch(val){
            let that = this;
            let data = {
                secret: localStorage.getItem('secretId'),
                modular_id: 30
            }
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            this.$axios.post(this.url+'shopapi/function_switch/masterSwitch',data
            ).then(function (res) {
                loading.close()
                if(res.data.code===200){
                    if(!val){
                        that.idCard = false
                    }
                    that.$message.success("修改成功")
                    that.getData()
                    that.getModularsIndex()
                }else{
                    that.open = !that.open
                    that.$message.error('请求数据失败');
                }
            })
            .catch(function (error) {
                loading.close()
                that.open = !that.open
                that.$message.error('网络错误');
            });
        }
    },
    watch: {
        open(val,oldVal){
            if(val===true){
                this.openText = "已开启"
            }else{
                this.openText = "未开启"
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-crossBorderPurchase{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    .wf-gray-box{
        height:60px;
        border-radius:4px;
        line-height: 60px;
        background: #F8F8F8;
        padding-left: 20px;
    }
    /deep/ .el-switch{
        margin-left: 50px;
        .el-switch__label{
            color: #999;
        }
        .el-switch__label.is-active{
            color: #719FF8;
        }
    }
    .wf-red-title{
        color: #E36F6B;
        font-size: 14px;
        margin: 20px 0 0 20px;
    }
    .wf-margin-left-20{
        margin-left: 20px;
    }
    .wf-margin-top-20{
        margin-top: 20px;
    }
}
</style>