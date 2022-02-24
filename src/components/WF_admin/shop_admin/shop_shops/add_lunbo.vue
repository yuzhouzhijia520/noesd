<template>
    <div id="add_lunbo">
        <el-row>
            <el-col :span="3">
                <span class="wf-red">*</span>轮播图(建议尺寸640X320)
            </el-col>
            <el-col :span="4">
                <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>

        <el-row class="jianju" style="line-height:28px;">
            <el-col :span="3">
                <span>排序：</span>
            </el-col>
            <el-col :span="4">
                <el-input size="mini" v-model="orderby" style="width: 200px;"></el-input>
            </el-col>
            <el-col :span="4"><span style="margin-left: 10px;color: #999;">数字越大越靠前</span></el-col>
        </el-row>
        

        <el-row class="jianju">
            <el-col :span="3">
                <span>状态：</span>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="status" @change="changeStatus">
                <el-option
                v-for="item in status_list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-col>
        </el-row>
        
        
        <div class="jianju" style="padding-bottom:20px;">
            <el-col :span="4" :offset="3"><el-button size="mini" @click="save">保存</el-button></el-col>
        </div>
    </div>
</template>

<script>
export default {
    name: 'shop_add_lunbo',
    data() {
        return {
            status: '有效',
            state: '1',
            orderby: '',
            id: '',
            imageUrl: '',
            status_list: [{
                value: '1',
                label: '有效'
            },{
                value: '0',
                label: '无效'
            }]
        }
    },
    created: function(){
        this.id = this.$route.query.data.id
    },
    methods: {
        // 上传图片
        beforeAvatarUpload(file) {
            let size = file.size/1024/1024;
            if(size>2){
                this.$message.warning("图片不能大于2M")
                return false
            }
            let formData = new FormData();
            formData.append('file', file);
            let that=this;
            this.$axios.post(this.url+'supper/attachment/upfile', formData).then(function (res) {
                if(res.data.code==0){
                    that.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    that.imageUrl = res.data.data.src;
                }else{
                    that.$message({
                        showClose: true,
                        message: '上传失败，请从新上传',
                        type: 'error'
                    })
                }
            })
        },
        changeStatus(e){
            this.state = e
        },
        save(){
            let that = this
            if(that.status=='有效'){
                that.state = 1
            }else if(that.status=='无效'){
                that.state = 0
            }
            this.$axios.post(this.url + 'shopapi/shop/shopAdd',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&setting_id='+that.id+
                '&orderby='+that.orderby+
                '&state='+that.state+
                '&banner_img='+that.imageUrl
            )
            .then(function(res){
                if(res.data.code==1){
                    that.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    that.$router.push({path:'/wf/admin/shop/shop_shops'})
                }else{
                    that.$message({
                        showClose: true,
                        message: '请求失败',
                        type: 'error'
                    })
                }
                
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
            })
        }
    }
}
</script>

<style lang="scss">
#add_lunbo{
    background: #fff;
    padding: 20px;
    .jianju{
        margin: 20px 0;
    }
    .wf-red{
        color: red;
    }
    // 上传图片
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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
        width: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
}
</style>
