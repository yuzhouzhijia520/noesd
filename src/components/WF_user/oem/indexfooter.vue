<template>
    <!-- class="wf-" -->
    <div class="wf-oem-indexfooter">
         <el-row>
            <el-col :span="12" >
                <el-form ref="form" :model="dataForm" label-width="120px">
                    <el-form-item label="示例" prop="phone_number" size="mini">
                       <img :src="bannerSrc" class="wf-banner"/>
                    </el-form-item>
                    <el-form-item label="开店咨询" prop="phone_number" size="mini">
                        <el-input  class="input_width"  size="mini" v-model="dataForm.phone_number"></el-input>
                    </el-form-item>
                    <el-form-item label="周一到周日" prop="time" size="mini">
                        <div class="block" >
                            <el-time-picker
                                is-range
                                v-model="dataForm.business_hours"
                                range-separator="-"
                                format="HH:mm"
                                value-format="HH:mm">
                            </el-time-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="办公地址" prop="good_name" size="mini">
                        <el-input  class="input_width"  size="mini" v-model="dataForm.office_address"></el-input>
                    </el-form-item>
                    <el-form-item label="小程序二维码" size="mini" prop="fileListImg" class="share-img">
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
                                    <img v-if="dataForm.small_program_code" :src="dataForm.small_program_code" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                        </el-row>
                    </el-form-item>
                     <el-form-item label="公众号二维码" size="mini" prop="fileListImg" class="share-img">
                        <el-row>
                            <el-col :span="6">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="upLoadUrl"
                                    :show-file-list="false"
                                    :on-success="handleSuccess2"
                                    :before-upload="beforeUpload2"
                                    v-loading.fullscreen.lock="loading2"
                                    element-loading-text="正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.5">
                                    <img v-if="dataForm.public_code" :src="dataForm.public_code" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="备案信息" prop="good_name" size="mini">
                        <el-input  class="input_width"  size="mini" v-model="dataForm.copyright"></el-input>
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
import {imgFormat} from '@/untils/common.js';
export default {
    name: '',
    data() {
        return {
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            loadingBtn:false,
            loading1:false,
            loading2:false,
            // id	
            // phone_number
            // 电话号码
            // business_hours	
            // 营业时间
            // office_address	
            // 办公地址
            // small_program_code		
            // 小程序码
            // public_code	
            // 公众号码
            // copyright	String	
            // 版权信息
            dataForm: {
                phone_number:'',
                business_hours:'',
                office_address:'',
                small_program_code:'',
                public_code:'',
                copyright:''
            },
            bannerSrc:require('@/assets/user_img/oem/banner1.png')
        }
    },
    components: {

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
            this.$axios.post(this.url+'agent_api/oem/footer',data)
            .then(function (res) {
                if(res.data.code===200){
                    if(res.data.data&&res.data.data!=null){
                        that.dataForm={};
                        that.dataForm=res.data.data;
                        that.dataForm.business_hours=res.data.data.business_hours.split(',');
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
        submit(){
            let that = this
            let data=JSON.parse(JSON.stringify(this.dataForm));
            data.business_hours=data.business_hours.join(',');
            this.loadingBtn=true;
            this.$axios.post(this.url+'agent_api/oem/footer',data)
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
        handleSuccess1(res,file){
            this.dataForm.small_program_code=imgFormat(res.data.src,'q',75);
            this.loading1=false;
        },
        handleSuccess2(res,file){
            this.dataForm.public_code=imgFormat(res.data.src,'q',75);
            this.loading2=false;
        },
        beforeUpload1(file){
            this.loading1=true;
           /**
            * 上传校验
            */
        },
        beforeUpload2(file){
            this.loading2=true;
           /**
            * 上传校验
            */
        },
    }
}
</script>


<style lang="scss" scoped>
.wf-oem-indexfooter{
    background-color: #fff;
    padding: 20px;
    .wf-banner{
        width: 774px;
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