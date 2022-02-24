<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-imageUpload">
        <el-card class="box-card" >
            <div class="text item">
                <el-row>
                    <el-col :span='6' class="wf-card-Img">
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
                                <img v-if="newComProps.item.srcUrl" :src="newComProps.item.srcUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="tiplist" v-if="newComProps.item.srcUrl">更换图片</div>
                                </el-upload>
                    </el-col>
                    <el-col :span='18' class="wf-card-Props">
                        <el-row>
                             <!-- <el-select v-model="optionsVal" placeholder="请选择跳转链接" size="mini" >
                                <el-option
                                v-for="(itemLink,index) in linkList" :key="index" @click.native="handleClick(itemLink.nameEn,index)" 
                                :label="itemLink.nameCh"
                                :value="itemLink.linkListId">
                                </el-option>
                            </el-select> -->
                            <link-drop-drown  :comProps="comProps" :indexs="0" v-on:newComPropsChild="handleGetUrl"  :selComponentId="selComponentId"></link-drop-drown>
                        </el-row>
                        <el-row>
                            <el-tag v-if="newComProps.item.link" size="mini" :title="linkList[newComProps.item.linkListId].nameCh">{{linkList[newComProps.item.linkListId].nameCh}}</el-tag>
                        </el-row>
                    </el-col>
                </el-row>
                
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
import linkDropDrown from "../linkDropDrown/linkDropDrown.vue";
export default {
    name: '',
    props:{
        comProps:Object,
        selComponentId:Number
    },
    data() {
        return {
            optionsVal:'',
            loading:false,
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            dialogImageUrl: '',
            dialogVisible: false,
            src:'',
            newComProps:{},
            fullscreenLoading:false,
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
        // this.newComProps=this.comProps;
    },
    mounted(){

    },
    methods: {
        handleGetUrl(newComProps){//获取子组件跳转的地址
            this.$emit('newComProps',newComProps,this.selComponentId);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
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
                    console.log(srcl)
                }else{
                    srcl = urlsec[0]
                    console.log(srcl)

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
            let newUrl = srcl + 'cdn'+src + '?imageInfo'//将cdn全部换成cdn4
            console.log(newUrl)
            this.$axios.get(newUrl)
            .then(function (response) {
                //设置默认比例高度
                const newHeight=320*response.data.height/response.data.width
                /**
                 * @params （param1,param2） 
                 * param1:需要处理的属性
                 * parma2：需要改变的面板名称
                 * parma3:需要改变的面板属性名称
                 */
                that.$emit('otherProps',newHeight,'wfCardProps','height');
            })
            .catch(function (error) {
                console.log(error);
            });
            this.loading=false
            this.newComProps.item.srcUrl=file.response.data.src;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        beforeAvatarUpload(file) {
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
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-imageUpload{
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