<template>
    <!-- class="wf-" -->
    <div class="wf-oem-indexWeb">
         <el-row>
            <el-col :span="10" >
                <el-form  label-width="120px">
                    <el-form-item label="banner图" size="mini"  class="share-img">
                        <el-row v-if="detailImg.length>0">
                            <el-col :span="24" class="wf-first-upload">
                                <draggable class="list-group" element="ul"  v-model="detailImg" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                                  <transition-group appear tag="ul" name="list-complete">
                                    <li v-for="(item, index) in detailImg" :key="index" class="detailImg" @click="handleDetailImg(index)">
                                        <el-upload :bindIndex="index" 
                                            :action="url+'supper/attachment/upfile'"
                                            :show-file-list="false"
                                            :on-success="handleDetail"
                                            v-loading.fullscreen.lock="loading1"
                                            element-loading-text="正在上传中..."
                                            element-loading-spinner="el-icon-loading"
                                            element-loading-background="rgba(0, 0, 0, 0.5">
                                            <img v-if="item.url" :src="item.url" class="avatar"/>
                                            </el-upload>
                                        <div class="upload-icon">
                                            <el-row>
                                                <el-col :span="12" class="upload-icon-img">
                                                    <i class="el-icon-view" ></i> <img v-if="item.url" :preview="index" :src="item.url" class="avatar"/>
                                                </el-col>
                                                <el-col :span="12">
                                                    <i class="el-icon-delete" @click="handleRemove(index)"></i>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </li>
                                   </transition-group>
                                </draggable>
                            </el-col>
                        </el-row>
                        <el-row>
                            <li class="detailImg1" @click="handleDetailImg(-1)" v-if="this.detailImg.length!=6">
                                    <el-upload 
                                        :action="url+'supper/attachment/upfile'"
                                        :show-file-list="false"
                                        :before-upload="beforeUpload"
                                        :on-success="handleDetailAdd"
                                        v-loading.fullscreen.lock="loading2"
                                        element-loading-text="正在上传中..."
                                        element-loading-spinner="el-icon-loading"
                                        element-loading-background="rgba(0, 0, 0, 0.5">
                                        <i class="el-icon-plus"></i>
                                        </el-upload>
                                </li>
                                <el-row>
                                    <span class="help">建议尺寸1920x500 px，最多上传6张</span>
                                </el-row>
                        </el-row>
                    </el-form-item>
                    <el-form-item size="mini">
                        <el-button type="primary" @click="submit"  :loading="loadingBtn" >确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import {imgFormat} from '@/untils/common.js';
export default {
    name: '',
    data() {
        return {
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            loadingBtn:false,
            loading1:false,
            loading2:false,
            id:null,
            detailImg:[],//详情图上传
            isDragging: false,
            delayedDragging: false,
            handleDetailImgIndex:null
        }
    },
    components: {
        draggable
    },
    computed:{
        //拖拽操作
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                ghostClass: "ghost"
            };
        },
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
            this.$axios.post(this.url+'agent_api/oem/index',data)
            .then(function (res) {
                if(res.data.code===200){
                    res.data.data.banner.forEach((item,index)=>{
                        that.detailImg.push({
                             url:item
                        })
                    })
                   that.id=res.data.data.id;
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误');
            });
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        handleDetailImg(i){
            this.handleDetailImgIndex=i;
        },
        submit(){
            let that = this;
            let newBanner=[];
            this.detailImg.forEach((item,index)=>{
                newBanner.push(item.url);
            })
            let data={
                banner:newBanner
            };
            if(this.id!=null){
                data.id=this.id;
            }
            this.loadingBtn=true;
            this.$axios.post(this.url+'agent_api/oem/index',data)
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
        beforeUpload1(file){
           this.loading1=true;
           /**
            * 上传校验
            */
        },
        beforeUpload(file){
            if(this.detailImg.length==6){
                this.$message.error("图片已上限，最多上传6张");
                return false;
            }
            this.loading2=true;
           /**
            * 上传校验
            */
        },
        handleDetailAdd(res,file,fileList){
            this.loading2=false;
            if(res.code==0){
                this.detailImg.push({
                    url:fileList[fileList.length-1].response.data.src
                })
            }else{
                this.$message.error("图片上传失败");
            }
        },
        handleRemove(index) {  
            this.detailImg.splice(index,1);
        },
        handleDetail(res,file,fileList) { 
            this.loading1=false;
            if(res.code==0){
                this.detailImg.splice(this.handleDetailImgIndex,1,
                {url:fileList[fileList.length-1].response.data.src});
            }else{
                this.$message.error("图片上传失败");
                // return;
            }
        },
    },
    watch:{
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        }
    }
}
</script>


<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.wf-oem-indexWeb{
    background-color: #fff;
    padding: 20px;
    .wf-first-upload{
        @include clearfix;
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
    } 
     /deep/ .list-group{
             .detailImg{
                margin-bottom: 5px;
               .el-upload--text{
                    width: 284px;
                    height: 98px;
                    line-height: 98px;
                    border: 1px dashed rgb(64, 158, 255);
                }
                 .upload-icon{
                    text-align: center;
                    width: 284px;
                    .el-icon-delete{
                        cursor: pointer;
                    }
                    .upload-icon-img{
                        position: relative;
                        img{
                            width: 14px;
                            height: 14px;
                            opacity: 0;
                            position: absolute;
                            left: 64px;
                            top: 6px;
                            cursor: pointer;
                        }
                    }
                 }
             }
         }
         .detailImg1{
               /deep/ .el-upload--text{
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                    border: 1px dashed #ccc;
                    &:hover{
                        border: 1px dashed rgb(64, 158, 255) !important;
                    }
                }
             }
}
</style>