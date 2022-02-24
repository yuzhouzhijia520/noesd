<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-videoSet" >
        <div class="wf-DIY-videoSet-top" >
            <el-row  class="wf-bottom">
                <el-col :span="5" class="wf-videoSet-right">
                    视频:
                </el-col> 
                <el-col :span="16">
                    <el-upload
                        class="avatar-uploader"
                        :action="upfileVideos"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-success="handleAvatarSuccessVideo"
                        :before-upload="beforeAvatarUploadVideo"
                        :on-preview="handleVideoCardPreview"
                        element-loading-text="正在上传中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.5)"
                        :on-remove="handleRemoveVideo"
                        >
                        <video v-if="newComProps.item.videosrc" :src="newComProps.item.videosrc" class="avatar"></video>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                </el-col>
            </el-row>
            <el-row class="wf-help wf-bottom">
                <el-col :offset="5">
                    <span >建议视频宽高尺寸比例为750*420 px,仅支持mp4格式的视频,小于100MB。</span>
                </el-col>
            </el-row>
            <el-row class="wf-bottom">
                <el-col :span="5" class="wf-setPageProps-right">
                    封面:
                </el-col> 
                <el-col :span="16">
                    <el-upload
                        class="avatar-uploader"
                        :action="upLoadUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-preview="handlePictureCardPreview"
                        v-loading.fullscreen.lock="loading"
                        element-loading-text="正在上传中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.5)"
                        :on-remove="handleRemove"
                        >
                        <img v-if="newComProps.item.imgsrc" :src="newComProps.item.imgsrc" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="tiplist" v-if="newComProps.item.imgsrc">更换图片</div>
                        </el-upload>
                </el-col>
            </el-row>
            <el-row class="wf-help wf-bottom">
                <el-col :offset="5">
                    <span >建议视频宽高尺寸比例为750*420 px</span>
                </el-col>
            </el-row>
            <el-row class="wf-bottom">
                <el-col :span="5" class="wf-setPageProps-right">
                    播放方式:
                </el-col> 
                <el-col :span="16">
                    <el-radio-group v-model="autoplay" size="small" @change="handleAutoplay">
                        <el-radio :label="false" >手动</el-radio>
                        <el-radio :label="true" >自动</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { widthCheck } from "@/untils/common.js";
export default {
    name: '',
    props:{
        comProps:Object,
        selComponentId:Number
    },
    data() {
        return {
            newComProps:{},
            loading:false,
            autoplay:false,
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            upfileVideos:this.url+'supper/attachment/upfileVideos', // 上传大附件组件的action绑定路径,
            fileArr:[]
        }
    },
    components: {

    },
    computed:{

    },
    created(){

    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            this.newComProps=JSON.parse(JSON.stringify(this.comProps));
        });
    },
    methods: {
        //视频
        handleRemoveVideo(file, fileList) {

        },
        handleVideoCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件`);
        },
        handleAvatarSuccessVideo(res, file,fileList) {
            let that=this;
            let urlsec = res.data.src.split('cdn')
            let src = ''
            let srcl = ''
            for(var i = 0;i<urlsec.length;i++){
                if(urlsec[0].indexOf('s') === -1){//-1表示没有这个字符
                    srcl = urlsec[0].replace('p','ps')
                }else{
                    srcl = urlsec[0]
                }
                if(urlsec[1].slice(0,1) === '1'){
                     src = urlsec[1].replace('1',4)
                }else if(urlsec[1].slice(0,1) === "2"){
                    src = urlsec[1].replace('2',4)
                }else if(urlsec[1].slice(0,1) === "3"){
                    src = urlsec[1].replace('3',4)
                }else if(urlsec[1].slice(0,1) === "0"){
                    src = urlsec[1].replace('0',4)
                }
            }
            let newUrl = srcl + 'cdn'+src//将cdn全部换成cdn4
            this.newComProps.item.videosrc=newUrl;
            this.newComProps.item.type=file.raw.type;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        beforeAvatarUploadVideo(file) {
            const isLt2M = file.size / 1024 / 1024 <= 100;
            if (!isLt2M) {
                this.$message.warning('上传视频大小不能超过 100MB!');
                return false;
            }else if(file.type!='video/mp4'){
                this.$message.warning('目前仅支持mp4格式!');
                return false;
            }
            return isLt2M;
        },
        handleAutoplay(val){
            this.newComProps.item.autoplay=val;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        //图片
        handleRemove(file, fileList) {

        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        
        handleAvatarSuccess(res, file,order) {
            let that=this;
            let urlsec = res.data.src.split('cdn')
            let src = ''
            let srcl = ''
            for(var i = 0;i<urlsec.length;i++){
                if(urlsec[0].indexOf('s') === -1){//-1表示没有这个字符
                    srcl = urlsec[0].replace('p','ps')
                }else{
                    srcl = urlsec[0]
                }
                if(urlsec[1].slice(0,1) === '1'){
                     src = urlsec[1].replace('1',4)
                }else if(urlsec[1].slice(0,1) === "2"){
                    src = urlsec[1].replace('2',4)
                }else if(urlsec[1].slice(0,1) === "3"){
                    src = urlsec[1].replace('3',4)
                }else if(urlsec[1].slice(0,1) === "0"){
                    src = urlsec[1].replace('0',4)
                }
            }
            let newUrl = srcl + 'cdn'+src//将cdn全部换成cdn4
            this.loading=false
            this.newComProps.item.imgsrc=newUrl;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 20;
            if (!isLt2M) {
                this.$message.warning('上传头像图片大小不能超过 20MB!');
                return false;
            }else{
                this.loading = true
            }
            return isLt2M;
        }
        
    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps));
                // handleTitleInput();
            },
            deep:true
        }
    }
}

</script>


<style lang="scss" scoped>
.wf-DIY-videoSet{
    text-align: left;
    .wf-help{
        text-align: left;
        span{
            color: #a7a7a7;
            font-size: 12px;
        }
    }
    .wf-bottom{
        margin-bottom: 15px;
        .wf-default-color{
            line-height: 38px;
        }
        .wf-my-color{
            min-width: 250px;
            line-height: 38px;
        }
    }
    /deep/ .el-color-picker__trigger{
        width: 62px;
        height: 26px;
        padding: 3px;
        .el-color-picker__color{
            .el-icon-close{
                display: none;
            }
        }
        .el-icon-arrow-down{
            display: none;
        }
    }
    .wf-default-color{
        .wf-sy-color{
        display: flex;
        /deep/ .el-radio-group{
            margin-left: 20px;
            margin-bottom: 20px;
                .el-radio-button__inner{
                    margin-right: 20px;
                }
                .el-radio__label{
                    width: 50px;
                    height: 20px;
                    padding: 2px 30px 2px 30px;
                    border-radius: 2px;
                    margin-left: 8px;
                }
                .wf-radio1{
                    .el-radio-button__inner{
                        background-color: rgb(184, 180, 158);
                        border-color: rgb(184, 180, 158);
                        border-radius: 2px;
                    }
                }
                .wf-radio2{
                    .el-radio-button__inner{
                        background-color: greenyellow;
                        border-color: greenyellow;
                        border-radius: 2px;
                    }
                }
                .wf-radio3{
                    .el-radio-button__inner{
                        background-color: rgb(191, 53, 209);
                        border-color: rgb(191, 53, 209);
                        border-radius: 2px;
                    }
                }
                .is-active{
                    .el-radio-button__inner{
                      border:1px dashed rgb(39, 121, 230); 
                    } 
                }
            }
        }
    }
    /deep/ .wf-DIY-videoSet-top{
        margin-bottom: 10px;
        .el-card__header{
            background-color: rgba(64, 158, 255, 0.12);
            padding: 10px 20px;
            .wf-card-header{
                .el-button{
                    float: right; 
                    padding: 3px 0
                }
            }
        }
        .el-card__body{
            .el-dropdown{
                .el-button--mini{
                    line-height: normal;
                }
            }
        }
    }
    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 80px;
        display: table-cell;
        vertical-align: middle;
    }
    /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    /deep/ .avatar {
        width: 80px;
        display: block;
    }
}
</style>