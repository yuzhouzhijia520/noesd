<template>
    <!-- class="wf-" 标题编辑-->
    <div class="wf-DIY-bannerProps" >
        <div class="wf-DIY-bannerProps-top">
            <el-row>
                <el-col :span="4" class="wf-bannerProps-right">
                    标题：
                </el-col> 
                <el-col :span="20">
                    <el-input size="mini" v-model="bannerPropstitlet" placeholder="请输入标题(最多四个字)" @keyup.native="handleTitleInput(bannerPropstitlet)"></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="wf-DIY-bannerProps-bg">
            <el-row>
                <el-col :span="4" class="wf-bannerProps-right">
                    设置背景图：
                </el-col> 
                <el-col :span="20" class="wf-bannerProps-back">
                    <el-col class="wf-bannerProps-backl">
                        <el-upload
                        class="avatar-uploader"
                        :action="upLoadUrl"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-error="handleAvatarError"
                        v-loading.fullscreen.lock="loading"
                        element-loading-text="正在上传中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.5)"
                        :show-file-list="false">
                            <img v-if="newComProps.item.background" :src="newComProps.item.background" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="tiplist" v-if="newComProps.item.background">更换图片</div>
                        </el-upload>
                        <i class="el-icon-delete wf-bannerProps-i" @click="removeBg" v-if="newComProps.item.background"></i>
                    </el-col>
                    <div class="wf-DIY-bannerProps-bg-tip">建议图片尺寸375 x 42 px ,最大宽度不超过750px</div>
                </el-col>
            </el-row>
        </div>
        <div class="wf-DIY-bannerProps-more">
            <el-row>
                <el-col :span="24">
                    <el-row>
                         <el-col :span="4" class="wf-bannerProps-right">
                             更多：
                         </el-col>
                        <el-col :span="20">
                            <el-checkbox v-model="newComProps.item.checked" @change="changecheckbox">显示更多</el-checkbox>
                         </el-col>
                    </el-row>
                </el-col>
                <el-col :span="24" v-if="newComProps.item.checked"  class="wf-bannerProps-link">
                    <el-col :span="4" class="wf-bannerProps-right">
                    <span>跳转路径：</span>
                    </el-col>
                    <el-col :span='20'>
                        <link-drop-drown  :comProps="comProps" :indexs="0" v-on:newComPropsChild="handleGetUrl"  :selComponentId="selComponentId"></link-drop-drown>
                    </el-col>
                </el-col>
                <el-col>
                    <el-tag v-if="newComProps.item.link" size="mini" class="dropdown-tag" :title="linkList[newComProps.item.linkListId].nameCh">{{linkList[newComProps.item.linkListId].nameCh}}</el-tag>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import linkDropDrown from "../linkDropDrown/linkDropDrown.vue";
import { widthCheck } from "@/untils/common.js";
export default {
    name: '',
    props:{
        comProps:Object,
        selComponentId:Number
    },
    data() {
        return {
            loading:false,
            imageUrl:'', //图片上传地址但会的cdn地址
            bannerPropstitlet:'', //标题
            upLoadUrl:this.url+'supper/attachment/upfile',
            newComProps:{},
            linkList:[
                    {
                        nameCh:"商品详情",
                        nameEn:"elGoodsDetail",
                        linkListId:0
                    },{
                        nameCh:"商品列表",
                        nameEn:"elGoodsList",
                        linkListId:1
                    },
                    {
                        nameCh:"营销活动列表",
                        nameEn:"elMarketingList",
                        linkListId:2
                    },{
                        nameCh:"营销活动详情",
                        nameEn:"elMarketingDetail",
                        linkListId:3
                    },{
                        nameCh:"商品分类",
                        nameEn:"elGoodsLinks",
                        linkListId:4  
                    }
                ],
        }
    },
    components: {
        linkDropDrown
    },
    created(){
        //操作新对象,深度拷贝对象
        this.newComProps=JSON.parse(JSON.stringify(this.comProps));
    },
    mounted(){
        this.$watch('comProps',function (val){
            this.newComProps=JSON.parse(JSON.stringify(this.comProps));
            this.bannerPropstitlet=this.newComProps.item.title;
        });
    },
    methods: {
        handleGetUrl(newComProps){//获取子组件跳转的地址
            this.$emit('newComProps',newComProps,this.selComponentId);
        },
        handleAvatarSuccess(res, file) {//上传图片
            this.loading  =false
            this.newComProps.item.background=file.response.data.src;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        handleTitleInput(val){
            this.newComProps.item.title=widthCheck(val,16);
            this.bannerPropstitlet=widthCheck(val,16);
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        removeBg(){//去除背景图片
            this.$confirm('此操作将清空背景, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '清空成功!'
                    });
                    this.newComProps.item.background = ''
                    this.$emit('newComProps',this.newComProps,this.selComponentId);
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消清空'
                });          
                });
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }else{
                this.loading = true
            }
            return  isLt2M;
        },
        handleAvatarError(){
            this.$message.error('网络错误！请联系管理员');
        },
        changecheckbox(e){//选择是否选中默认展示
           this.newComProps.item.checked=e;
           if(!e){
               this.newComProps.item.link='';
               this.newComProps.item.linkListId=0;
           }
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        }
    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps));
                this.bannerPropstitlet=this.newComProps.item.title;
            }
        }
    }
}

</script>


<style lang="scss" scoped>
.wf-DIY-bannerProps{
    .wf-DIY-bannerProps-top{
        .el-input{
            width: 300px;
            // margin-left:40px;
        }
    }
        .wf-DIY-bannerProps-bg-tip{
            width: 200px;
            color: #ccc;
            font-size: 12px;
            margin-left: 20px;
        }
        .wf-bannerProps-back{
            display: flex;
            // margin-bottom: 20px;
        }
        .wf-bannerProps-backl{
            width: 85px;
            .wf-bannerProps-i{
                margin:  0 auto;
                width: 11px;
                height: 11px;
                display: flex;
                margin-top: 10px;
                cursor: pointer;
            }
        }
        
        .avatar-uploader{
                width: 80px;
                height: 40px;
                border: 1px dashed #d9d9d9;
                text-align: center;
                cursor: pointer;
                position: relative;
                &:hover{
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
                    border-color: rgba(0, 0, 0, 0.09);
                    border: 1px dashed #00a9ff;
                }
            }
        .avatar-uploader .el-upload {
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 20px;
            color: #8c939d;
            width: 20px;
            height: 20px;
            line-height: 40px;
        }
        .avatar {
            width: 80px;
            height: 40px;
            display: block;
        }
    .wf-DIY-bannerProps-more{
        margin-top: 10px;
        .wf-bannerProps-link{
            /deep/ .el-dropdown{
                .el-button--mini{
                    line-height: normal;
                }
            }
        }
        .dropdown-tag{
            margin-left: 16.66667%;
            margin-top: 5px;
        }
    }
    .tiplist{
        color: #fff;
        position: absolute;bottom: 0;
        left: 0;
        width: 100%;
        background:rgba(0, 0, 0, 0.5);
        font-size: 12px;
    }
    .wf-bannerProps-right{
            text-align: right;
            margin-bottom: 20px;
        }
}
</style>