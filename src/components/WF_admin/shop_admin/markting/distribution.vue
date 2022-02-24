<template>
    <div class="wf-distribution">
        <el-row :gutter="24">
            <el-col :xs="15" :sm="17" :md="19" :lg="20" :xl="22">
                <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
                    <el-row class="rule_btn">
                        <span class="rule_guize" type="text">分销规则</span>
                        <el-popover
                            placement="right"
                            width="340"
                            trigger="hover"
                            content="分销设置需要审核，则首批分销需要平台审核；分销邀请好友成为分销，平台不需要审核，进入分销列表。分销直销一笔订单，享受一级佣金，上级享受二级佣金，已完成订单计为已结算，分销提现需要商家在后台审核，微信打款或线下转账。">
                            <span slot="reference" class="el-icon-question" style="color:#D7D7D7;font-size:1.125rem;"></span>
                        </el-popover>
                    </el-row>
                    <el-form-item label="首批分销审核" prop="resource" style="margin-top:32px;">
                        <el-radio-group v-model="formLabelAlign.resource">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="一级佣金"  prop="onemoney">
                        <el-input v-model="formLabelAlign.onemoney" type="number" class="input-li"></el-input>%
                    </el-form-item>
                    <el-form-item label="二级佣金" prop="twomoney">
                        <el-input  type="number"  v-model="formLabelAlign.twomoney"  class="input-li"></el-input>%
                    </el-form-item>
                    <el-form-item label="起提金额" prop="money">
                        <el-input v-model="formLabelAlign.money" type="number"  class="input-li"></el-input>
                    </el-form-item>
                    <el-form-item label="邀请海报">
                        <el-upload
                            :action= 'urls'
                             class="avatar-uploader"
                             :show-file-list="false"
                            :on-preview="handlePictureCardPreview"
                            :on-success="handleAvatarSuccess"
                            :on-remove="handleRemove">
                            <img width="100%" :src="formLabelAlign.picurl" alt="" v-if="this.formLabelAlign.picurl !==''" class="avatar">
                            <i class="el-icon-plus"  v-if="this.formLabelAlign.picurl ==''"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" >
                            <img width="100%" :src="formLabelAlign.picurl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()" class="el-wf-preservation-buttton">保存</el-button>
                    </el-form-item>
                </el-form>
                
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'shop_markting_distribution',
    data() {
        return {
            urls:'',
            dialogImageUrl: '',
            dialogVisible: false,
            labelPosition: 'left',
            formLabelAlign: {//数据表单
                onemoney: '',
                twomoney: '',
                money:'',
                resource:'是',
                picurl:''
            },
            rules: { //输入的input验证规则
                onemoney: [
                    {  message: '请输入一级佣金金额', trigger: 'blur'}
                ],
                twomoney: [
                    {message: '请输入二级佣金金额', trigger: 'blur' }
                ],
                money: [
                    {  message: '请输入起提金额', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.getlist()
        this.urls = this.url  + 'supper/attachment/upfile'//本地图片转化为cdn路径
    },
    components: {
    },
    mounted(){
    },
    methods: {//移除图片 
         handleRemove(file, fileList) {

        },
        handlePictureCardPreview(file) {
            
        },
        handleAvatarSuccess(file){//上传图片后返回的图片地址
            let that = this
            if(file.code === 0){
                that.formLabelAlign.picurl = file.data.src
            }
        },
         onSubmit() {
             //判断是否选择平台分销
             let that = this
             if(that.formLabelAlign.resource === ''){
                that.$message.error('请选择平台分销是否需要审核！');
             }else{
                 if(that.formLabelAlign.onemoney === ''){//判断一级佣金的输入情况
                    that.$message.error('请输入一级佣金金额');
                }else {
                     //判断二级佣金的输入情况
                    if(that.formLabelAlign.twomoney === ''){
                        that.$message.error('请输入二级佣金金额');
                    }else{
                         //判断是否输出起提金额
                        if(that.formLabelAlign.money === ''){
                            that.$message.error('请输入起提金额');
                        }else {
                            if(that.formLabelAlign.picurl ===''){
                                that.$message.error('请选择海报');
                            }else{
                                //清洁接口
                                if(that.formLabelAlign.onemoney==="0"||that.formLabelAlign.onemoney==="0.00"||that.formLabelAlign.onemoney==="0.0"){
                                    that.$message.warning("一级佣金不能为0")
                                    return
                                }
                                if(that.formLabelAlign.money==="0"||that.formLabelAlign.money==="0.00"||that.formLabelAlign.money==="0.0"){
                                    that.$message.warning("起提金额不能为0")
                                    return
                                }
                                var resource = ''
                                if(that.formLabelAlign.resource === '是'){
                                    var resource = 1
                                }else{
                                    var resource = 0
                                }
                                that.$axios.post(that.url + 'distributionhome/Distributionlist/disSettingdo',{
                                    token:localStorage.getItem('userId'),
                                    secret:localStorage.getItem('secretId'),
                                    examine:resource,
                                    first_commission:that.formLabelAlign.onemoney,
                                    second_commisstion:that.formLabelAlign.twomoney,
                                    start_amount:that.formLabelAlign.money,
                                    invite_poster:that.formLabelAlign.picurl
                                }).then(function(res){
                                    if(res.data.code === 200){
                                        that.$message.success('保存成功');
                                    }else{
                                        that.$message.error(res.data.msg);
                                    }
                                })
                            }
                            
                               
                        }
                    }
                }
             }
        },
        getlist(){//获取分销设置
            let that  = this
             that.$axios.post(that.url + 'distributionhome/Distributionlist/disSetting',{
                 token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId')
             }).then(function(res){
                 if(res.data.code === 200 ){
                     if(res.data.data.examine === 1){
                         that.formLabelAlign.resource = '是'
                     }else{
                         that.formLabelAlign.resource = '否'
                     }
                     that.formLabelAlign.onemoney = res.data.data.first_commission
                     that.formLabelAlign.twomoney = res.data.data.second_commisstion
                     that.formLabelAlign.money = res.data.data.start_amount,
                     that.formLabelAlign.picurl = res.data.data.invite_poster
                     
                 }
             })
        }
    }
}
</script>

<style lang="scss" scoped>

.wf-distribution{
    background-color: #fff;
    padding:20px;
    
    .rule_guize{
        margin-bottom: 40px;
        font-size: 20px;
        color: #719FF8;
    }
    .input-li{
 width: 200px!important;

    }
    .avatar-uploader{
        max-width: 80px;
        min-height: 80px;
        border: 1px dashed #c0ccda;
        text-align: center;
        position: relative;
        .el-icon-plus{
            position: absolute;
            top:40%;
            left: 40%;
        }
    }
}
</style>