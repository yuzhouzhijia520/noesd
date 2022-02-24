<template>
    <!-- class="wf-" -->
    <div class="wf-addHForm" >
        <el-steps :active="0" class="wf-steps" simple>
            <el-step title="创建表单" class="one"><div class="icon-active" slot="icon">1</div></el-step>
            <el-step title="设置表单内容" class="two"><div class="icon-active " slot="icon">2</div></el-step>
            <el-step title="完成" class="four"><div class="icon-active four" slot="icon">3</div></el-step>
        </el-steps>
        <el-row>
            <el-col :span="8" :offset="4">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="表单主题" required>
                        <el-input :maxlength="20" v-model="form.title"  size="mini"   placeholder="请在这里编辑表单主题"></el-input>
                        <span class="wf-textareaVaild ">{{(20-form.title.length)}}/20</span>
                    </el-form-item>
                    <el-form-item label="表单描述" required>
                        <el-input type="textarea" :rows="4" :maxlength="300" v-model="form.description"  size="mini"  placeholder="请在这里编辑表单描述"></el-input>
                        <span class="wf-textareaVaild ">{{(300-form.description.length)}}/300</span>
                    </el-form-item>
                    <el-form-item label="分享图片" size="mini" prop="fileListImg" class="share-img">
                        <el-upload
                            class="avatar-uploader"
                            :action="upLoadUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess"
                            :before-upload="beforeUpload">
                            <img v-if="form.img" :src="form.img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        <span class="help">建议尺寸216x168 px, 不上传则显示表单首屏截图</span>
                    </el-form-item>
                    <el-form-item size="mini">
                        <!-- <el-button type="primary" v-if="$route.query.param&&$route.query.state==0" @click="nextSubmit"  :loading="loadingBtn" >下一步</el-button>
                        <el-button type="info" v-else-if="$route.query.param&$route.query.state==1" disabled size="mini">下一步</el-button>
                        <el-button type="primary" v-else-if="!$route.query.param" @click="nextSubmit"  :loading="loadingBtn" size="mini">下一步</el-button> -->
                         <el-button type="primary" @click="nextSubmit" size="mini">下一步</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {initialUpdate,initialEdit} from '@/server/hform';
import {imgFormat} from '@/untils/common.js';
export default {
    name: '',
    data() {
        return {
            form: {
                title: '',
                description: '',
                img:'',
            },
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            loadingBtn:false,
        }
    },
    components: {

    },
    computed:{
    },
    created(){
        if(this.$route.query.param&&this.$route.query.id){
            if(this.$route.query.param=='edit'){
                this.initialEditPage();
            }
        }
    },
    mounted(){
    },
    methods: {
        initialEditPage(){
            let that=this;
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                id:this.$route.query.id,
            }
            initialEdit(data).then((res)=>{
                if(res.data.code===200){
                   that.form.title=res.data.data.title;
                   that.form.description=res.data.data.description;
                   that.form.img=res.data.data.img;
                }else{
                    that.$message.error(res.data.msg+'600A00237');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!'+'600B00238');
            })
        },
        nextSubmit(){
            let that=this;
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                title:this.form.title,
                description:this.form.description,
                img:this.form.img,
                type:this.$route.query.type
            }
            if(this.$route.query.param&&this.$route.query.id){
                if(this.$route.query.param=='edit'){
                    data.id=this.$route.query.id
                }
            }
            initialUpdate(data).then((res)=>{
                if(res.data.code===200){
                    if(that.$route.query.type===1){
                        if(that.$route.query.param&&that.$route.query.id){
                            if(that.$route.query.param=='edit'){
                                that.$router.push({path:'/wf/admin/shop/markting/hform/mainHForm',name:'mainHForm',query:{param:'edit',type:res.data.data.type,id:res.data.data.id}});
                            }
                        }else{
                            that.$router.push({path:'/wf/admin/shop/markting/hform/mainHForm',name:'mainHForm',query:{type:res.data.data.type,id:res.data.data.id}});
                        }
                    }else if(that.$route.query.type===0){
                        if(that.$route.query.param&&that.$route.query.id){
                            if(that.$route.query.param=='edit'){
                                that.$router.push({path:'/wf/admin/shop/markting/hform/mainHFormOne',name:'mainHFormOne',query:{param:'edit',type:res.data.data.type,id:res.data.data.id}});
                            }
                        }else{
                            that.$router.push({path:'/wf/admin/shop/markting/hform/mainHFormOne',name:'mainHFormOne',query:{type:res.data.data.type,id:res.data.data.id}});
                        }
                    }
                }else{
                    that.$message.error(res.data.msg+'600A00223');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!'+'600B00224');
            })
        },
        handleSuccess(res,file){
            this.form.img=imgFormat(res.data.src,'q',75);
        },
        beforeUpload(file){
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }else{
                return true
            }
           /**
            * 上传校验
            */
        },
    }
}
</script>


<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.wf-addHForm{
    background-color: #fff;
    padding: 20px;
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
    /deep/ .el-form{
        .el-form-item{
            .el-form-item__content{
                @include clearfix;
                .help{
                    font-size: 12px;
                    color: rgba(153,153,153,1);
                }
                .sharePicture{
                    .el-upload{
                        width: 80px;
                        height: 80px;
                        line-height: 80px;
                    }
                }
            }
        }
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