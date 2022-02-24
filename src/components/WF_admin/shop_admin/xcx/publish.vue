<template>
    <!-- class="wf-xcx-publish" -->
    <div class="wf-xcx-publish"  v-if="hidePage">
        <el-row class="wf-panel">
            <el-form label-width="80px" label-position="right">
                <el-col :span="18" :offset="1">
                    <el-form-item label="线上版本" class="wf-header" >
                       <el-tag size="mini" v-if="params.online_version.is_exist===1">已上线</el-tag>
                    </el-form-item>
                     <el-form-item label="版本号" class="wf-small" v-if="params.online_version.is_exist===1">
                        <label >{{params.online_version.version_num}}</label>
                    </el-form-item>
                     <el-form-item label="提交时间" class="wf-small" v-if="params.online_version.is_exist===1">
                        <label >{{params.online_version.version_time}}</label>
                    </el-form-item>
                     <el-form-item label="描述" class="wf-small" v-if="params.online_version.is_exist===1">
                        <label >{{params.online_version.describe}}</label>
                    </el-form-item>
                </el-col>
                <el-col class="wf-fisrt-label">
                    <label v-if="params.online_version.is_exist===0">暂无从拾久云发布的线上版本</label>
                </el-col>
            </el-form>
        </el-row>
        <el-row class="wf-panel">
            <el-form label-width="80px" label-position="right">
                <el-col :span="18" :offset="1">
                    <el-form-item label="审核版本" class="wf-header" >
                        <el-tag size="mini" v-if="review_statusCh!=''&&(params.review_version.review_status===1||params.review_version.review_status===7)">{{review_statusCh}}</el-tag>
                        <el-tag size="mini" type="danger" v-if="review_statusCh!=''&&(params.review_version.review_status===2||params.review_version.review_status===8)">{{review_statusCh}}</el-tag>
                        <el-popover
                            v-if="params.review_version.review_result!=''&&(params.review_version.review_status===2||params.review_version.review_status===8)"
                            placement="top-start"
                            title="错误信息"
                            width="200"
                            trigger="hover"
                            :content="params.review_version.review_result">
                            <span slot="reference" class="el-icon-question"></span>
                        </el-popover>
                        
                    </el-form-item>
                    <el-form-item label="版本号" class="wf-small" v-if="params.review_version.is_exist===1">
                        <label v-if="params.review_version">{{params.review_version.version_num}}</label>
                    </el-form-item>
                    <el-form-item label="提交时间" class="wf-small" v-if="params.review_version.is_exist===1">
                        <label v-if="params.review_version">{{params.review_version.version_time}}</label>
                    </el-form-item>
                    <el-form-item label="描述" class="wf-small" v-if="params.review_version.is_exist===1">
                        <label v-if="params.review_version">{{params.review_version.describe}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="5" class="wf-button" v-if="params.review_version.is_exist===1">
                </el-col>
                <el-col class="wf-fisrt-label">
                    <label v-if="params.review_version.is_exist===0">暂无从拾久云发布提交的审核版本</label>
                </el-col>
            </el-form>
        </el-row>
        <el-row class="wf-panel">
            <el-form label-width="80px" label-position="right">
                <el-col :span="18" :offset="1" >
                    <el-form-item label="体验版" class="wf-header">
                        <el-button size="mini" class="primary el-wf-preservation-buttton qr" @click="handlerQr">体验二维码</el-button>
                    </el-form-item>
                    <el-form-item label="版本号" class="wf-small" >
                        <label >{{params.experience_version.version_num}}</label>
                    </el-form-item>
                    <el-form-item label="创建时间" class="wf-small" >
                        <label >{{params.experience_version.create_time}}</label>
                    </el-form-item>
                    <el-form-item label="描述" class="wf-small">
                        <label>{{params.experience_version.describe}}</label>
                    </el-form-item>
                </el-col>
                <el-col :span="5" class="wf-button"  >
                    <el-button size="mini" type="primary el-wf-preservation-buttton" :loading="loadingP" @click="handlePubilsh(1)">提交审核</el-button>
                    <el-button size="mini" type="primary el-wf-preservation-buttton" :loading="loadingAP" @click="handleAgainPubilsh">重新获取体验版</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-dialog 
            :visible.sync="dialogShopVisible" 
            width="350px" 
            center 
            v-if="dialogShopVisible==true">
            <img :src="'data:'+params.experience_version.experience_qr" class="wf-img-qr"/>
        </el-dialog>
    </div>
</template>

<script>
import {getPublishData , submitPublish , againSubmitPublish} from '@/server/publish';
export default {
    name: '',
    data() {
        return {
            hidePage:false,
            /**二维码展示 */
            dialogShopVisible:false,
            /**初始化页面参数 */
            params:{
                "online_version": {
                    "version_num": '',
                    "version_time": '',
                    "describe":'',
                    "formal_qr": ''
                },
                "review_version": {
                    "version_num": '',
                    "version_time": '',
                    "review_status": '',
                    "describe": ''
                },
                "experience_version": {
                    "create_time": '',
                    "version_num": '',
                    "describe": '',
                    "experience_qr": ''
                }
            },
            /**体验版本中文名称 */
            review_statusCh:'',
            loadingP:false,//提交审核载入状态
            loadingAP:false,//重新发布体验版载入状态
            loadingTP:false//重新提交载入状态
        }
    },
    components: {

    },
    created(){

    },
    mounted(){
        this.initPage(0);
    },
    methods: {
        handlerQr(){
            this.dialogShopVisible=true;
        },
        /**初始化页面 */
        async initPage(id){
            let that=this;
            let loading;
            if(id===0){
                 loading= this.$loading({
                    lock: true,
                    text: '拼命加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.9)'
                });
            }
            getPublishData().then((newData)=>{
                if(id===0){
                    loading.close();
                }else if(id===1){
                    that.loadingP=false;
                }else if(id===2){
                    that.loadingTP=false;
                }else if(id===3){
                    that.loadingAP=false;
                }
                if(newData.data.code===401){
                    that.$alert('小程序尚未授权，请先授权给平台', '温馨提示', {
                        confirmButtonText: '立即授权',
                        type: 'warning',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                that.$router.push({path:'/wf/admin/shop/xcx_setting',name:'xcx_setting'});
                                done();
                            } else {
                                done();
                            }
                        }
                    })
                }else if(newData.data.code===200){
                    that.hidePage=true;
                    that.params=newData.data.data;
                    if(that.params){
                        if(that.params.review_version){
                            if(that.params.review_version.review_status){
                                if(that.params.review_version.review_status===1||that.params.review_version.review_status===7){
                                     that.review_statusCh='审核中';
                                }
                                if(that.params.review_version.review_status===2){
                                     that.review_statusCh='审核失败';
                                }
                                if(that.params.review_version.review_status===8){
                                     that.review_statusCh='审核驳回';
                                }
                            }
                        }
                    }
                   
                }else if(newData.data.code){
                    that.$message.error(newData.data.msg);
                }else{
                    that.$message.error('网络错误');
                }
            }).catch(()=>{
                if(id===0){
                    loading.close();
                }else if(id===1){
                    that.loadingP=false;
                }else if(id===2){
                    that.loadingTP=false;
                }else if(id===3){
                    that.loadingAP=false;
                }
                that.$message.error('网络错误');
            })
        },
        /**发布 */
        async handlePubilsh(id){
            if(id===1){
                this.loadingP=true;
            }else if(id===2){
                 this.loadingTP=true;
            }
            
            let newData=await submitPublish();
            let that=this;
            this.$nextTick(()=>{
                // if(id===1){
                //     this.loadingP=false;
                // }else if(id===2){
                //     this.loadingTP=false;
                // }
                if(newData.data.code===200){
                    that.$message({
                        message:'已提交，待审核',
                        type:'success',
                        duration:2500
                    });
                    that.initPage(id);
                }else if(newData.data.code){
                    that.initPage(id);
                    that.$message.error(newData.data.msg);
                }else{
                    that.$message.error('网络错误');
                }
            })
        },
        /**发布 */
        async handleAgainPubilsh(){
            this.loadingAP=true;
            let newData=await againSubmitPublish();
            let that=this;
            this.$nextTick(()=>{
                if(newData.data.code===200){
                    that.initPage(3);
                    that.$message.success('已更新');
                }else if(newData.data.code){
                    that.loadingAP=false;
                    that.$message.error(newData.data.msg);
                }else{
                    that.loadingAP=false;
                    that.$message.error('网络错误');
                }
            })
        },
    }
}
</script>


<style lang="scss" scoped>
.wf-xcx-publish{
    .wf-img-qr{
        max-width: 300px;
    }
    .wf-panel{
        min-height: 150px;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 20px;
        padding: 20px;
        .wf-fisrt-label{
            text-align: center;
            color: #999;
            font-size: 14px;
        }
        .qr{
            padding: 5px 5px;
        }
        .el-icon-question{
            color:#ccc;
            font-size: 18px;
        }
        .wf-header{
            /deep/ .el-form-item__label{
                font-size:16px;
            }
        }
        .wf-small{
            /deep/ .el-form-item__label{
                color: #999;
            }
        }
        .el-form{
            .el-form-item{
                margin-bottom: 0;
            }
        }
        .wf-button{
            line-height: 150px;
        }
    }
}
</style>