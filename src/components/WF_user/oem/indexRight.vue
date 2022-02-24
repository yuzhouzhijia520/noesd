<template>
    <!-- class="wf-" -->
    <div class="wf-oem-indexRight">
        <el-row>
            <el-col :span="10">
                <el-form :model="dataForm" label-width="120px">
                    <el-form-item label="咨询热线" prop="team_name" size="mini">
                        <el-row v-for="(item,index) in dataForm.consultation" :key="index"  class="wf-group">
                            <el-col :span="4">
                                <el-input  :maxlength="20" class="input_width" placeholder="请输入名称" size="mini" v-model="item.title"></el-input>
                            </el-col>
                            <el-col :span="6" :offset="1">
                                <el-input  :maxlength="20" class="input_width" placeholder="请输入电话号码" size="mini" v-model="item.phone"></el-input>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="text" @click="deleteCon(index)">删除</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <i class="el-icon-plus wf-add" @click="addCon" ></i>
                            <label @click="addCon"  class="wf-add">添加热线</label>
                        </el-row>
                        <el-row>
                            <span class="help">不添加则不显示电话图标</span>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form label-width="120px">
                    <el-form-item label="示例"  size="mini">
                        <img :src="exampleright1" width="287px"/>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <hr>
        <el-row>
            <el-col :span="10">
                <el-form :model="dataForm" label-width="120px">
                    <el-form-item label="二维码提示语" prop="tips" size="mini">
                        <el-input  :maxlength="20" class="input_width"  size="mini" v-model="dataForm.tips"></el-input>
                        <span class="wf-textareaVaild" v-if="dataForm.tips">{{20-dataForm.tips.length}}/20</span>
                        <span class="wf-textareaVaild" v-else>20/20</span>
                    </el-form-item>
                    <el-form-item label="二维码" prop="qrcode" size="mini" class="share-img">
                        <el-row>
                            <el-col :span="6">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="upLoadUrl"
                                    :show-file-list="false"
                                    :on-success="handleSuccess"
                                    :before-upload="beforeUpload"
                                    v-loading.fullscreen.lock="loading"
                                    element-loading-text="正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.5">
                                    <img v-if="dataForm.qrcode" :src="dataForm.qrcode" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                        </el-row>
                        <el-row>
                            <span class="help">不添加则不显示二维码</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item size="mini">
                        <el-button type="primary" @click="submit"  :loading="loadingBtn" >确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="4">
                <el-form label-width="120px">
                    <el-form-item label="示例"  size="mini">
                        <img :src="exampleright2" width="287px"/>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {imgFormat} from '@/untils/common.js';
export default {
    name: '',
    data() {
        return {
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            loadingBtn:false,
            loading:false,
            exampleright1:require('@/assets/user_img/oem/exampleright1.png'),
            exampleright2:require('@/assets/user_img/oem/exampleright2.png'),
            dataForm:{
                tips:'',
                qrcode:'',
                consultation:[
                    {
                        title:'',
                        phone:''
                    },
                ],
                
            }
        }
    },
    components: {

    },
    created(){

    },
    mounted(){
        this.initPage();
    },
    methods: {
        initPage(){
            let that = this;
            let data={};
            this.$axios.post(this.url+'agent_api/oem/right',data)
            .then(function (res) {
                if(res.data.code===200){
                    if(res.data.data&&res.data.data!=null){
                        that.dataForm=res.data.data;
                        if( that.dataForm.consultation.length>0){
                            that.dataForm.consultation.forEach((item,index)=>{
                                that.dataForm.consultation[index]={
                                    title:item[0],
                                    phone:item[1]
                                }
                            })
                        }else{
                            that.dataForm.consultation=[
                                {
                                    title:'',
                                    phone:''
                                }
                            ]
                        }
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误');
            });
        },
        submit(){
            let that = this
            let data=JSON.parse(JSON.stringify(this.dataForm));
            this.loadingBtn=true;
            this.$axios.post(this.url+'agent_api/oem/right',data)
            .then(function (res) {
                that.loadingBtn=false;
                if(res.data.code===200){
                    that.$message.success(res.data.msg);
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.loadingBtn=false;
                that.$message.error('网络错误');
            });
        },
        deleteCon(index){
             this.dataForm.consultation.splice(index,1);
        },
        addCon(){
            this.dataForm.consultation.push({
                title:'',
                phone:''
            })
        },
        handleSuccess(res,file){
            this.dataForm.qrcode=imgFormat(res.data.src,'q',75);
            this.loading=false;
        },
        beforeUpload(file){
            this.loading=true;
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-oem-indexRight{
    background-color: #fff;
    padding: 20px;
    hr{
        border: 1px solid rgba(240,240,240,1);
        margin-bottom: 11px;
    }
    .help{
        color:rgba(153,153,153,1);
        font-size: 12px;
    }
    .wf-add{
        color: #409EFF;
        font-size: 12px;
        cursor: pointer;
    }
    .wf-group{
        padding: 5px 0;
    }
    /deep/ .share-img{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 12px;
            color: #8c939d;
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
        }
        .avatar {
            width: 80px;
            height: 80px;
            display: block;
        }
    } 
}
</style>