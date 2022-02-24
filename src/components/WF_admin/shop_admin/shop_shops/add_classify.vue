<template>
    <div id="add_classify">
        <el-row>
            <el-col :span="3">
                <span class="wf-red">*</span>分类图片(建议尺寸90X90)
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

        <el-row class="jianju">
            <el-col :span="3">
                <span>
                    <span class="wf-red">*</span>分类名称
                </span>
            </el-col>
            <el-col :span="4">
                <el-input size="mini" v-model="classify_name" style="width: 200px;"></el-input>
            </el-col>
        </el-row>
        
        
        <el-row class="jianju">
            <el-col :span="3">
                <span>
                    <span class="wf-red">*</span>排序
                </span>
            </el-col>
            <el-col :span="4">
                <el-input size="mini" v-model="orderby" style="width: 200px;"></el-input>
            </el-col>
            <el-col :span="4">
                <span style="margin-left: 10px;color: #999;">数字越大越靠前</span>
            </el-col>
        </el-row>
        
        <el-row class="jianju">
            <el-col :span="3">
                <span>
                    <span class="wf-red">*</span>跳转至
                </span>
            </el-col>
            <el-col :span="4">
                <!-- 分类级联选择器 -->
                <el-cascader
                    :props="defaultProps"
                    :options="options"
                    v-model="selectedOptions"
                    @change="changeSelect"
                    style="width:200px;">
                </el-cascader>
            </el-col>
        </el-row>

        <el-row class="jianju">
            <el-col :span="3">
                <span>
                    <span class="wf-red">*</span>状态
                </span>
            </el-col>
            <el-col :span="4">
                <el-select v-model="status" @change="changeStatus" size="mini">
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
    name: 'shop_add_classify',
    data() {
        return {
            status: '有效',
            state: '1',
            jump: '0',
            orderby: '',
            classify_name: '',
            id: '',
            imageUrl: '',
            status_list: [
            {
                value: '1',
                label: '有效'
            },{
                value: '0',
                label: '无效'
            }],
            selectedOptions: [], //分类级联选择器
            options: [],
            defaultProps: { // 分类级联选择器配置选项
                value: 'id',
                label: 'type_name',
                children: 'children'
            }
        }
    },
    created: function(){
        this.id = this.$route.query.data.id
        this.classList()
    },
    methods: {
        classList(){ // 查询所有分类
            var that=this;
            this.$axios.post(this.url+'shopapi/Goodtype/typeindex',
                'secret='+localStorage.getItem('secretId')+
                '&token='+localStorage.getItem('userId')+
                '&page=' + 1
            ).then(function (res) {
                if(res.data.code==1){
                    let data = res.data.data
                    var list=[]
                    for(var da in data){
                        if(data[da].children.length!=0){
                            list.push(data[da])
                        }
                        for(var child in data[da].children){
                            if(data[da].children[child].children.length==0){
                                data[da].children[child].children = ''
                            }
                        }
                    }
                    that.options = list
                }else{
                    that.$message.error('请求数据失败，请重新刷新页面');
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误，请重新添加');
            });
        },
        changeSelect(e){
            this.selectedOptions = e
        },
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
            if(this.status=='有效'){
                this.state = 1
            }else if(that.status=='无效'){
                this.state = 0
            }
            if(this.imageUrl==''){
                this.$message.error('请上传分类图片');
            }else if(this.classify_name==''){
                this.$message.error('请填写分类名称')
            }else if(this.selectedOptions==''){
                this.$message.error('请选择跳转至哪个分类')
            }else{
                this.$axios.post(this.url + 'shopapi/shop/shopAdd',
                    'token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId')+
                    '&setting_id='+that.id+
                    '&orderby='+that.orderby+
                    '&state='+that.state+
                    '&jump='+that.selectedOptions+
                    '&classify_name='+that.classify_name+
                    '&classify_img='+that.imageUrl
                )
                .then(function(res){
                    if(res.data.code==1){
                        that.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        let storage = window.localStorage
                        storage.type = 'classify'
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
}
</script>

<style lang="scss">
#add_classify{
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
        width: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
}
</style>