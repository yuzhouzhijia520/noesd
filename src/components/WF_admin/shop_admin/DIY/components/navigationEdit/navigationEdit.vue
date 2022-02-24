<template>
    <!-- class="wf-"图文面板选择页面 -->
    <div class="wf-DIY-navigationEdit">
        <div class="selectmu">
            选择模板:
            <div class="selectmu-one">
                <img src="" alt="">
                <div class="selectmu-one-txt"></div>
            </div>
            <div class="selectmu-two"></div>
        </div>
        <div v-for="(item,index) in dataList" :key="index">
            <div slot="header" class="clearfix wf-card-header">
                <el-row >
                    <el-col :span='3'>
                        <el-button type="text" @click="hangdleMoveUp(item)">上移</el-button>
                    </el-col>
                    <el-col :span='3'>
                        <el-button type="text" @click="hangdleMoveDown(item)">下移</el-button>
                    </el-col>
                    <el-col :span='3'>
                        <el-button type="text" @click="hangdleDelete(item.order)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="wf-DIY-navigationEdit-ist">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                     v-loading.fullscreen.lock="loading"
                     element-loading-spinner="el-icon-loading"
                      element-loading-text="正在上传中..."
                     element-loading-background="rgba(0, 0, 0, 0.5)"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="wf-DIY-navigationEdit-ist-right">
                    <div style="margin-bottom:10px;">
                        标题：<el-input v-model="dataList.input" placeholder="请输入内容" ></el-input>
                    </div>
                    链接:选择跳转的页面
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
export default {
    name: '',
   
    data() {
        return {
            imageUrl: '',
            loading:false,
            rule:[
                {

                }
            ],
            dataList:[
                {
                    imageUrl:'',
                    input:'',
                    link:'',
                    order:0
                },
                {
                    imageUrl:'',
                    input:'',
                    link:'',
                    order:1

                },
                {
                    imageUrl:'',
                    input:'',
                    link:'',
                    order:2

                },
                {
                    imageUrl:'',
                    input:'',
                    link:'',
                    order:3

                },
            ]
        }
    },
    components: {

    },
    computed:{

    },
    created(){
        
    },
    mounted(){
       
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.loading = false
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            this.loading = true
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
        hangdleDelete(order){
             let that=this;
             this.$confirm('此操作将永久删除该轮播图, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.newComProps.item.forEach((el,i) => {
                    if(el.order===order){
                        that.newComProps.item.splice(i,1);
                        that.$emit('newComProps',that.newComProps,that.selComponentId);
                        return;
                    }
                });
               
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
           
        },
    },
    watch:{
        
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-navigationEdit{
    .selectmu{
        display: flex;
        align-items: center;
        padding: 20px 0;
        .selectmu-one,.selectmu-two{
            width: 80px;
            height: 80px;
            border: 1px solid #ccc;
            margin-left: 30px;
        }
    }
    .wf-card-header{
        background-color: rgba(64, 158, 255, 0.12);
            padding: 10px 20px;
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
    .wf-DIY-navigationEdit-ist{
        display: flex;
        align-items: center;
        // justify-content: space-between;
        padding: 20px 10px;
        border: 1px solid #ccc;
         .avatar-uploader{
                width: 60px;
                height: 60px;
            border: 1px dashed #d9d9d9;
                // background: red;
            text-align: center;

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
            line-height: 60px;

        }
        .avatar {
            width: 60px;
            height: 60px;
            display: block;
        }
        .wf-DIY-navigationEdit-ist-right{
            margin-left: 50px;
            .el-input{
                width: 200px;
                height: 35px;
            }
        }
    }
   
}
</style>