<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-wfCube0">
        <div v-for="(item,i) in newComProps.item" :key="item.order" >
            <el-card class="box-card"  v-if="newComProps.item&&i<newComProps.type">
                <div slot="header" class="clearfix wf-card-header">
                    <el-row >
                        <el-col :span='3' v-if="i!=0">
                            <el-button type="text" @click="hangdleMoveUp(item)">上移</el-button>
                        </el-col>
                        <el-col :span='3' v-if="i<newComProps.type-1">
                            <el-button type="text" @click="hangdleMoveDown(item)">下移</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="text item">
                    <el-row>
                        <el-col :span='6' class="wf-card-Img" >
                            <div  @click="getImageTypeIndex(item.order)">
                            <el-upload
                                class="avatar-uploader"
                                :action="upLoadUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :on-error="handleError"
                                :before-upload="beforeAvatarUpload"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                v-loading.fullscreen.lock="loading"
                                element-loading-text="正在上传中..."
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(0, 0, 0, 0.5"
                            >
                                <img v-if="item.srcUrl" :src="item.srcUrl"  class="avatar"/>
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="tiplist" v-if="item.srcUrl">更换图片</div>
                                </el-upload>
                            </div>
                        </el-col>
                        <el-col :span='18' class="wf-card-Props">
                            <el-row>
                                <el-col :span='6'>
                                <span>链接：</span>
                                </el-col>
                                <el-col :span='18'>
                                <!-- <el-select v-model="optionsVal['optionsVal'+i]"   placeholder="请选择跳转链接" size="mini" >
                                    <el-option
                                    v-for="(itemLink,index) in linkList" :key="index" @click.native="handleClick(itemLink.nameEn,item.order,itemLink.linkListId,item)"
                                    :label="itemLink.nameCh"
                                    :value="itemLink.linkListId">
                                    </el-option>
                                </el-select> -->
                                    <link-drop-drown :item="item" :indexs="i" :comProps="comProps" v-on:newComPropsChild="handleGetUrl" v-on:newOrder="handleNewOrder" :selComponentId="selComponentId" :uploadImageOrder="uploadImageOrder"></link-drop-drown>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-tag v-if="item.imgLink" size="mini" class="dropdown-tag" :title="linkList[item.linkListId].nameCh">{{linkList[item.linkListId].nameCh}}</el-tag>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===0">
                                <el-col >
                                    <span >推荐宽高尺寸346x428 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===1">
                                <el-col >
                                    <span >推荐宽高尺寸228x300 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===2">
                                <el-col >
                                    <span >推荐宽高尺寸169x240 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===3&&i===0">
                                <el-col >
                                    <span >推荐宽高尺寸346x428 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===3&&(i===1||i===2)">
                                <el-col >
                                    <span >推荐宽高尺寸346x210 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===4&&i===0">
                                <el-col >
                                    <span >推荐宽高尺寸700x276 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===4&&(i===1||i===2)">
                                <el-col >
                                    <span >推荐宽高尺寸346x276 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===5&&i===0">
                                <el-col >
                                    <span >推荐宽高尺寸346x428 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===5&&i===1">
                                <el-col >
                                    <span >推荐宽高尺寸346x210 px，或同等比例</span>
                                </el-col>
                            </el-row>
                            <el-row class="wf-help wf-bottom" v-if="newComProps.order===5&&(i===2||i===3)">
                                <el-col >
                                    <span >推荐宽高尺寸169x210 px，或同等比例</span>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
// import elGoodsDetail from "../linkDialog/elGoodsDetail.vue";
// import elGoodsList from "../linkDialog/elGoodsList.vue";
// import elMarketingDetail from "../linkDialog/elMarketingDetail.vue";
// import elMarketingList from "../linkDialog/elMarketingList.vue";
// import elGoodsLinks from "../linkDialog/elGoodsLinks.vue";
import linkDropDrown from "../linkDropDrown/linkDropDrown.vue";
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
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            dialogImageUrl: '',
            dialogVisible: false,
            src:'',
            uploadImageOrder:0,//上传组件卡片标志
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
    },
    mounted(){
    },
    methods: {
        handleGetUrl(newComProps,selComponentId){//获取子组件跳转的地址
            this.$emit('newComProps',newComProps,selComponentId);
        },
        handleNewOrder(newOrder){
            this.uploadImageOrder=newOrder;
        },
        getImageTypeIndex:function (index) {
            this.uploadImageOrder = index  //轮播图选框标志
        },
        upLoadData(order){
            let data={
                order:order
            }
            return data;
        },
        hangdleMoveUp(item){
            //向上移动
            let that=this;
            this.newComProps.item.some((el,i) => {
                if(el.order===item.order){
                    that.newComProps.item[i]= that.newComProps.item[i-1];
                    that.newComProps.item[i-1]=item;
                    that.$emit('newComProps',that.newComProps,that.selComponentId);
                    return true;
                }
            });
        },
        hangdleMoveDown(item){
            //向下移动
            let that=this;
            this.newComProps.item.some((el,i) => {
                if(el.order===item.order){
                    that.newComProps.item[i]= that.newComProps.item[i+1];
                    that.newComProps.item[i+1]=item;
                    that.$emit('newComProps',that.newComProps,that.selComponentId); 
                    return true;
                }
            });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleError(err, file, fileList){
            this.loading = false;
            this.$message.error('上传失败!');
        },
        handleAvatarSuccess(res, file) {
            // this.$emit("imgUrl",file.response.data.src);
            this.loading = false
            let that=this;
            this.newComProps.item.some((el,i) => {
                if(el.order===that.uploadImageOrder){
                    that.newComProps.item[i].srcUrl=file.response.data.src;
                    that.$emit('newComProps',that.newComProps,that.selComponentId);
                    return true;
                }
            });
        },
        beforeAvatarUpload(file,id) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }else{
                this.loading = true
            }
            return isLt2M;
        }
    },
    watch:{
        comProps:{
            immediate:true,//初始值执行handler的函数
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps));
            },
            deep:true
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-wfCube0{
    .wf-help{
        text-align: left;
        span{
            color: #a7a7a7;
            font-size: 12px;
        }
    }
    .wf-addCard{
        cursor: pointer;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border: 1px dashed #e8e8e8;
        margin-top: 20px;
        width: 100%;
        text-align: center;
        &:hover{
            background-color: #f9f9f9;
        }
        .el-icon-plus{
            height: 40px;
            line-height: 40px;
            width: 40px;
            font-size: 18px;
        }
    }
    /deep/ .el-card{
        margin-bottom: 10px;
        .el-card__header{
            background-color: rgba(64, 158, 255, 0.12);
            padding: 10px 20px;
            .wf-card-header{
                .el-row{
                    .el-col:first-child{
                        margin-left: 290px;
                    }
                    .el-button{
                        float: right; 
                        padding: 3px 0
                    }
                }
            }
        }
        .el-card__body{
            .el-dropdown{
                .el-button--mini{
                    line-height: normal;
                }
            }
             .dropdown-tag{
                max-width: 360px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: help;
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
        max-height: 80px;
    }
    /deep/ .text {
        font-size: 14px;
    }

    .item {
        .el-row{
            .wf-card-Props{
                line-height: 40px;
            }
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
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
}
</style>