<template>
    <!-- class="wf-" -->
    <div class="wf-oem-setOem">
         <el-row>
            <el-col :span="10" >
                <el-form ref="forms" :model="dataForm" label-width="120px" :rules="rules">
                    <el-form-item label="品牌名" prop="brand" size="mini">
                        <el-input  size="mini" v-model="dataForm.brand">{{dataForm.brand}}</el-input>
                    </el-form-item>
                    <el-form-item label="带字LOGO" size="mini" prop="word_logo" class="share-img">
                        <el-row>
                            <el-col :span='6'>
                                <el-upload
                                    class="avatar-uploader"
                                    :action="upLoadUrl"
                                    :show-file-list="false"
                                    :on-success="handleSuccess1"
                                    :before-upload="beforeUpload"
                                    v-loading.fullscreen.lock="loading"
                                    element-loading-text="正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.5">
                                    <img v-if="dataForm.word_logo" :src="dataForm.word_logo" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                            <el-col :span='12'>
                                <el-row>
                                    <span class="wf-btn" @click="handleSetOemD(0)">示例</span>
                                </el-row>
                                <el-row>
                                    <span class="help">用于显示品牌LOGO</span>
                                </el-row>
                                <el-row>
                                    <span class="help">建议图片宽高尺寸为208x38 px</span>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-form-item>
                     <el-form-item label="彩色LOGO" size="mini" prop="logo" class="share-img">
                        <el-row>
                            <el-col :span='6'>
                                <el-upload
                                    class="avatar-uploader"
                                    :action="upLoadUrl"
                                    :show-file-list="false"
                                    :on-success="handleSuccess2"
                                    :before-upload="beforeUpload"
                                    v-loading.fullscreen.lock="loading"
                                    element-loading-text="正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.5">
                                    <img v-if="dataForm.logo" :src="dataForm.logo" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                            <el-col :span='12'>
                                <el-row>
                                    <span class="wf-btn" @click="handleSetOemD(1)">示例</span>
                                </el-row>
                                <el-row>
                                    <span class="help">用于白色背景的LOGO显示</span>
                                </el-row>
                                <el-row>
                                    <span class="help">图片比例为1:1，建议图片宽高尺寸为80x80 px</span>
                                </el-row>
                            </el-col>
                        </el-row>
                     </el-form-item>
                         <el-form-item label="灰色LOGO" size="mini" prop="load_logo" class="share-img">
                         <el-row>
                            <el-col :span='6'>
                                <el-upload
                                    class="avatar-uploader"
                                    :action="upLoadUrl"
                                    :show-file-list="false"
                                    :on-success="handleSuccess3"
                                    :before-upload="beforeUpload"
                                    v-loading.fullscreen.lock="loading"
                                    element-loading-text="正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.5">
                                    <img v-if="dataForm.load_logo" :src="dataForm.load_logo" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                            <el-col :span='12'>
                                <el-row>
                                    <span class="wf-btn" @click="handleSetOemD(2)">示例</span>
                                </el-row>
                                <el-row>
                                    <span class="help">用于页面加载数据时显示的默认图</span>
                                </el-row>
                                <el-row>
                                    <span class="help">图片比例为1:1，建议图片宽高尺寸为98x98 px</span>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="网页窗口ico" size="mini" prop="ico_logo" class="share-img">
                        <el-row>
                            <el-col :span="6">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="upLoadUrl"
                                    :show-file-list="false"
                                    :on-success="handleSuccess4"
                                    :before-upload="beforeUpload"
                                    v-loading.fullscreen.lock="loading"
                                    element-loading-text="正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.5">
                                    <img v-if="dataForm.ico_logo" :src="dataForm.ico_logo" class="avatar"/>
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                            <el-col :span="12">
                                <el-row>
                                    <span class="wf-btn" @click="handleSetOemD(3)">示例</span>
                                </el-row>
                                <el-row>
                                    <span class="help">图片比例为1:1，建议图片尺寸为20×20 px</span>
                                </el-row>
                                <el-row>
                                    <span class="help">不添加则不显示icon</span>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item size="mini">
                        <el-button type="primary" @click="submit"  :loading="loadingBtn" >确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
         <el-dialog :title="dialogData.name"
            :visible.sync="dialogTableVisible"
            @close="handleClose"
            width="493px" 
            left >
            <img :src="dialogData.src" width="454px"/>
        </el-dialog>
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
            dialogTableVisible:false,
            dataForm:{
                brand:'',
                word_logo:'',
                logo:'',
                load_logo:'',
                ico_logo:''
            },
            dialogData:{},
            rules:{
                word_logo: [
                    {  required: true, message: '请上传带字LOGO', trigger: 'blur'}
                ],
                logo: [
                    {  required: true, message: '请上传彩色LOGO', trigger: 'blur' }
                ],
                load_logo: [
                    {  required: true, message: '请上传灰色LOGO', trigger: 'blur' }
                ] 
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
        handleSetOemD(index){
            if(index===0){
                this.dialogData.name="带字LOGO";
                this.dialogData.src=require("@/assets/user_img/oem/dialog1.png");
            }else if(index===1){
                this.dialogData.name="彩色LOGO";
                this.dialogData.src=require("@/assets/user_img/oem/dialog2.png");
            }else if(index===2){
                this.dialogData.name="灰色LOGO";
                this.dialogData.src=require("@/assets/user_img/oem/dialog3.png");
            }else if(index===3){
                this.dialogData.name="网页窗口ico";
                this.dialogData.src=require("@/assets/user_img/oem/dialog4.png");
            }
            this.dialogTableVisible=true;
        },
        initPage(){
            let that = this;
            let data={};
            this.$axios.post(this.url+'agent_api/oem/globalSet',data)
            .then(function (res) {
                if(res.data.code===200){
                    if(res.data.data&&res.data.data!=null){
                        that.dataForm=res.data.data;
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
            this.$refs['forms'].validate((valid) => {
                if (valid) {
                    let that = this
                    let data=this.dataForm;
                    this.loadingBtn=true;
                    this.$axios.post(this.url+'agent_api/oem/globalSet',data)
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
                }else{
                    return false;
                }
            })
        },
        handleSuccess1(res,file){
            this.loading=false;
            this.dataForm.word_logo=imgFormat(res.data.src,'q',75);
        },
        handleSuccess2(res,file){
            this.loading=false;
            this.dataForm.logo=imgFormat(res.data.src,'q',75);
        },
        handleSuccess3(res,file){
            this.loading=false;
            this.dataForm.load_logo=imgFormat(res.data.src,'q',75);
        },
        handleSuccess4(res,file){
            this.loading=false;
            this.dataForm.ico_logo=imgFormat(res.data.src,'q',75);
        },
        beforeUpload(file){
            this.loading=true;
           /**
            * 上传校验
            */
        },
        handleClose(){
            this.dialogData.name="";
            this.dialogData.src="";
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-oem-setOem{
    background-color: #fff;
    padding: 20px;
    .wf-btn{
        color:rgba(113,159,248,1);
        cursor: pointer;
    }
    .help{
        color:rgba(153,153,153,1);
        font-size: 12px;
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