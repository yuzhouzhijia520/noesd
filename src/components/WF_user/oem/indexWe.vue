<template>
    <!-- class="wf-" -->
    <div class="wf-oem-indexWe">
         <el-row>
            <el-col :span="12" >
                <el-form ref="formWe" :model="dataForm" label-width="120px" :rules="rules">
                    <el-form-item label="banner图" size="mini" prop="banner_img" class="banner">
                        <el-row>
                            <el-col :span="6">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="upLoadUrl"
                                    :show-file-list="false"
                                    :on-success="handleSuccess1"
                                    :before-upload="beforeUpload1"
                                    v-loading.fullscreen.lock="loading1"
                                    element-loading-text="正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.5">
                                    <img v-if="dataForm.banner_img" :src="dataForm.banner_img" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                        </el-row>
                        <el-row>
                            <span class="help">建议图片宽高尺寸为1920x500px</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="机构名称" prop="corporate_name" size="mini">
                        <el-input  class="input_width" placeholder="请输入公司/机构/组织名称"  size="mini" v-model="dataForm.corporate_name"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍内容" prop="content" size="mini">
                        <div class="ql-container ql-snow wf-edit">
                            <div class="ql-editor" >
                                <quill-editor v-model="dataForm.content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @ready="onEditorReady($event)">
                                </quill-editor>
                                <input type="file" hidden accept=".jpg,.png" ref="fileBtn" @change="handleChange">
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="我们的团队" prop="team_name" size="mini">
                        <el-input  class="input_width" placeholder="请输入图片介绍名称" size="mini" v-model="dataForm.team_name"></el-input>
                    </el-form-item>
                    <el-form-item label="我们的团队" size="mini" class="share-img">
                        <el-row>
                            <el-col :span="24">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="upLoadUrl"
                                    :on-success="handleSuccess2"
                                    list-type="picture-card"
                                    :file-list="photoList"
                                    :on-remove="handleRemove"
                                    :before-upload="beforeUpload2"
                                    v-loading.fullscreen.lock="loading2"
                                    element-loading-text="正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.5)"
                                    ref="weUpload">
                                    <!-- <img v-if="dataForm.photo" :src="dataForm.photo" class="avatar"> -->
                                    <i  class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                        </el-row>
                        <el-row>
                            <span class="help">不添加则不显示图片</span>
                        </el-row>
                        <el-row>
                            <span class="help">建议图片宽高尺寸为328x276 px，最多上传6张</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item size="mini">
                         <el-button type="primary" @click="submit"  :loading="loadingBtn" >确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-form label-width="120px">
                    <el-form-item label="内容示意图"  size="mini">
                        <img :src="indexWeImg" width="406px"/>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor';
// import quillConfig from './quill-config.js';//源码编辑功能
import { imgFormat } from '@/untils/common.js';
import * as hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/atom-one-light.css'
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image']//去除video即可
]
export default {
    name: '',
    data() {
        return {
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            loading1:false,
            loading2:false,
            loadingBtn:false,
            indexWeImg:require('@/assets/user_img/oem/indexWe.png'),
            // editorOption:quillConfig,//源码编辑功能,暂时不需要此功能
            editorOption:{
                placeholder:'请输入信息',
                theme: 'snow',  // 主题
                modules: {
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        },
                        toolbar: toolOptions,
                    },
            },
            dataForm: {
                banner_img:'',
                corporate_name:'',
                content:'',
                team_name:'',
                photo:[]
            },
            photoList:[],
            rules:{
                banner_img: [
                    {  required: true, message: '请上传banner图', trigger: 'blur'}
                ],
                corporate_name: [
                    {  required: true, message: '请输入机构名称', trigger: 'blur' }
                ],
                content: [
                    {  required: true, message: '请输入介绍内容', trigger: 'blur' }
                ] 
            }
        }
    },
    components: {
        quillEditor
    },
    created(){

    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted(){
        // quillConfig.initButton();
        this.initPage();
        if (this.$refs.myQuillEditor) {
            
            //myQuillEditor改成自己的
            this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", this.imgHandler);
            //这里初始化，劫持toolbar的image的handler方法，在mounted中处理
        }
    },
    methods: {
        imgHandler(state) {
            if (state) {
            //触发input的单击 ，fileBtn换成自己的
                this.$refs.fileBtn.click()
            }
        },
        handleChange(e) {
            let that=this;
            const files = Array.prototype.slice.call(e.target.files);
            if (!files) {
                return;
            }
            let form = new FormData();
            form.append("file", files[0]);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            //使用了axios请求
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }); 
            this.$axios.post(this.upLoadUrl,form,config).then((responseData) => {
                loading.close();
                that.$refs.fileBtn.value = "";
                if (responseData.data.code===0) {
                    let selection = that.$refs.myQuillEditor.quill.getSelection();
                    //腾讯图片处理转化
                    let imgUrl = imgFormat(responseData.data.data.src);       
                    that.$refs.myQuillEditor.quill.insertEmbed(selection != null ? selection.index : 0, 'image', imgUrl)   
                    that.$refs.myQuillEditor.quill.setSelection(selection.index + 1);
                } 
            }).catch(err=>{
                  loading.close();
                that.$message.error('网络错误');
            })
        },
        initPage(){
            let that = this;
            let data={};
            this.$axios.post(this.url+'agent_api/oem/about',data)
            .then(function (res) {
                if(res.data.code===200){
                    if(res.data.data&&res.data.data!=null){
                        that.dataForm=res.data.data;
                        that.photoList=[];
                        that.dataForm.photo.forEach((item,index)=>{
                            that.photoList.push({name:'',url:item});
                        })
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                this.$message.error('网络错误');
            });
        },
        submit(){
            this.$refs['formWe'].validate((valid) => {
                if (valid) {
                    let that = this;
                    let data=JSON.parse(JSON.stringify(this.dataForm));
                    data.photo=[];
                    this.photoList.forEach((item,index)=>{
                        data.photo.push(item.url);
                    })
                    this.loadingBtn=true;
                    this.$axios.post(this.url+'agent_api/oem/about',data)
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
        onEditorBlur(quill) {
        //   let xss = require("xss");
        //   this.dataForm.content = xss(this.dataForm.content, {
        //     onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
        //         if (name.substr(0, 5) === 'class'||name.substr(0, 6) === 'title'||name.substr(0, 4) === 'href'||name.substr(0, 6) === 'target') {
        //         // 通过内置的escapeAttrValue函数来对属性值进行转义
        //         return name + '="' + xss.escapeAttrValue(value) + '"';
        //         }
        //     }
        //     });
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        handleSuccess1(res,file){
            this.dataForm.banner_img=imgFormat(res.data.src,'q',75);
            this.loading1=false;
        },
        handleSuccess2(res,file){
            this.photoList.push({name:'',url:imgFormat(res.data.src,'q',75)});
            this.loading2=false;
        },
        handleRemove(file, fileList){
            let that=this;
            this.photoList.forEach((item,i)=>{
                if(item.uid===file.uid){
                    that.photoList.splice(i,1);
                }
            })
        },
        beforeUpload1(file){
          this.loading1=true;
           /**
            * 上传校验
            */
        },
        beforeUpload2(file){
            if(this.photoList.length===6){
                this.$message.error("图片已上限，最多上传6张");
                return false;
            }
            this.loading2=true;
           /**
            * 上传校验
            */
        },
    },
    watch:{
        photoList(val){
            if(val.length===6){
                this.$refs.weUpload.$children[1].$el.style.display="none";
            }else{
                this.$refs.weUpload.$children[1].$el.style.display="";
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-oem-indexWe{
    background-color: #fff;
    padding: 20px;
    .help{
        color:rgba(153,153,153,1);
        font-size: 12px;
    }
    .wf-edit{
        border:none;
        /deep/ .quill-editor{
            .ql-tooltip.ql-editing{
                left: 0px !important;
                top: 55px !important;
            }
            .ql-toolbar{
                position: absolute;
                top: 0px;
                z-index: 2;
            }
            .ql-container{
                padding-top: 72px;
                border: 1px solid #ccc;
                margin-right: -15px;
                margin-top: -30px;
            }
        }
    }
    /deep/ .banner{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 284px;
            height: 98px;
            line-height: 98px;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 12px;
            color: #8c939d;
            width: 284px;
            height: 98px;
            line-height: 98px;
            text-align: center;
        }
        .avatar {
            width: 284px;
            height: 98px;
            display: block;
        }
        .el-upload-list__item{
            width: 284px;
            height: 98px;
            line-height: 98px;
        }
    }
    /deep/ .share-img{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 80px;
            height: 80px;
            line-height: 80px;
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
        .el-upload-list__item{
            width: 80px;
            height: 80px;
            line-height: 80px;
        }
    } 
    .quill-editor{
        height: 300px;
        margin-left: -15px;
        .ql-toolbar{
            position: absolute;
        }
        .ql-container{
            padding-top: 88px;
        }
    }
    
    
}
</style>