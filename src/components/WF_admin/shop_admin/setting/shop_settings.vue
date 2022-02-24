<template>
    <div class="wf-shop_settings">
        <el-form label-position="right"
        :model="shopData"
        :rules="rules"
        ref="shopData"
        label-width="90px"
        class="demo-ruleForm">
            <div class="wf-gray-tit">基本资料 <span class="small-tit">设置你的店铺基本资料</span></div>
            <el-form-item label="店铺名称" prop="proName">
                <el-input v-model="shopData.proName" size="mini"></el-input>
            </el-form-item>
            <el-form-item class="wf-upload" label="店铺头像" prop="proImg">
                <el-upload
                class="avatar-uploader"
                :action="upfileUrl"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload">
                    <img v-if="shopData.proImg" :src="shopData.proImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <div class="wf-gray-tit">经营设置 <span class="small-tit">设置你的店铺经营模式</span></div>
            <el-form-item label="发货方式" prop="shop_yourself">
                <el-checkbox v-model="shopData.shop_yourself" @change="selfChange">到店自提</el-checkbox>
                <el-checkbox v-model="logistics" disabled>物流配送</el-checkbox>
            </el-form-item>
            <el-form-item label="支付方式" prop="cash_on_delivery">
                <el-checkbox v-model="shopData.cash_on_delivery" @change="payChange">货到付款</el-checkbox>
            </el-form-item>
            <el-form-item label="登陆方式" prop="login_type">
                <el-radio v-model="shopData.login_type" :label="0" @change="loginChange">微信登录</el-radio>
                <el-radio v-model="shopData.login_type" :label="1" @change="loginChange">微信及手机号登录</el-radio>
            </el-form-item>
            <div class="wf-gray-tit">交易设置<span class="small-tit">设置订单相关时间规则</span></div>
            <el-form-item  prop="shop_yourself" label-width="15px">
                <span class="wf-time-span">普通待付款订单取消时间 </span>拍下未付款订单
                <el-input-number v-model="shopData.order_cancel_time" placeholder="请输入内容" :controls="false" :min="10" :max="60" class="numberlist" style="width:100px;"></el-input-number>
                分钟内未付款，自动取消订单
                <span class="graycolor">10分钟-60分钟</span>
            </el-form-item>
            <el-form-item  prop="shop_yourself"  label-width="15px">
                <span class="wf-time-span">商家发货后买家自动确认收货时间 </span>商家发货后
                <el-input-number v-model="shopData.order_receiving_time" placeholder="请输入内容" :min="7" :max="30" :controls="false" class="numberlist" style="width:100px;"></el-input-number>
                天，买家自动确认收货
                <span class="graycolor">买家自动确认收货时间必须在7-30天之间</span>
            </el-form-item>
            <el-form-item prop="shop_yourself"  label-width="15px">
                <span class="wf-time-span">买家退货后商家自动确认收货时间 </span>买家发货后
                <el-input-number v-model="shopData.order_return_time" placeholder="请输入内容" :min="7" :max="15" :controls="false" class="numberlist" style="width:100px;"></el-input-number>
                天，商家自动确认收货
                <span class="graycolor">商家自动确认收货时间必须在7-15天之间</span>
            </el-form-item>
            <el-form-item  prop="shop_yourself"  label-width="15px">
                <span class="wf-time-span">买家确认收货后关闭退款时间 </span>买家确认收货后
                <el-input-number v-model="shopData.order_refund_time" placeholder="请输入内容" :min="7" :max="30" :controls="false" class="numberlist" style="width:100px;"></el-input-number>
                天，关闭退款申请
                <span class="graycolor">关闭退款时间必须在7-30天之间</span>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="save('shopData')">确认修改</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="20%">
        <span>添加自提点地址后，才能开启"到店自提"功能。</span>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="dialogVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="jumpAdd">去添加</el-button>
        </span>
        </el-dialog> 
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import { getAuditApplicationList } from '@/server/common';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
export default {
    name: "shop_settings",
    data() {
        return {
            showVersion:false,//控制版本提示
            selfId: "",
            payId: "",
            input:2,
            dialogVisible: false,
            logistics: true, // 物流配送默认开启
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            shopData: {
                secret: localStorage.getItem('secretId'),
                proName: "",
                proImg: "https://cdn0.19mini.com/shijiu/shijiu_logo.png",
                shop_yourself: false,
                cash_on_delivery: false,
                id: "",
                order_cancel_time:15,
                order_receiving_time:7,
                order_return_time:7,
                order_refund_time:7,
                login_type: 1, // 登陆方式 
            },
            rules: {
                proName: [
                    { required: true, message: "店铺名称不能为空", trigger: 'blur' }
                ],
                proImg: [
                    { required: true, message: "店铺头像不能为空", trigger: 'blur' }
                ],
                shop_yourself: [
                    { required: true, message: "发货方式至少选一个", trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        versionCom
    },
    mounted() {
        this.getData()
        this.getCompile()
        this.getSelf()
    },
    methods: {
        loginChange(val){
            if(val===0){
                getAuditApplicationList(12).then((res)=>{
                    if(res.data.code===200){
                        if(res.data.data===false){
                            this.showVersion = true
                            this.shopData.login_type = 1
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        handleCloseVersion(){ // 关闭版本更新提示弹框
            this.showVersion=false;
        },
        getData(){ // 获取头像和名称
            let that = this
            this.$axios.post(this.url + 'shopapi/Program/show',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')
            )
            .then(function(res){
                if(res.data.code===1){
                    that.shopData.proName = res.data.data.proName
                    if(res.data.data.proImg!=""){
                        that.shopData.proImg = res.data.data.proImg
                    }
                    that.shopData.id = res.data.data.id
                    that.shopData.order_cancel_time = res.data.data.order_cancel_time
                    that.shopData.order_receiving_time = res.data.data.order_receiving_time
                    that.shopData.order_return_time = res.data.data.order_return_time
                    that.shopData.order_refund_time = res.data.data.order_refund_time
                    that.shopData.login_type = res.data.data.login_type
                }else{
                    that.$message.error(res.data.msg)
                }
            })
            .catch(function (error) {
                that.$message.error("请联系管理员")
            })
        },
        getCompile(){ // 获取到店自提/货到付款数据回填
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            const loading = this.$loading({
                lock: true,
                text: '保存中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$axios.post(this.url+'shopapi/program/compile',data
            ).then(res=>{
                if(res.data.code===200){
                    if(res.data.data.length>0){
                        res.data.data.forEach(el => {
                            if(el.modular_id===25){
                                if(el.state===1){
                                    that.shopData.shop_yourself = true
                                }else{
                                    that.shopData.shop_yourself = false
                                }
                                that.selfId = el.id
                            }
                            if(el.modular_id===26){
                                if(el.state===1){
                                    that.shopData.cash_on_delivery = true
                                }else{
                                    that.shopData.cash_on_delivery = false
                                }
                                that.payId = el.id
                            }
                        });
                    }
                    loading.close()
                }else{
                    that.$message.error(res.data.msg);
                    loading.close()
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
                loading.close()
            });
        },
        getSelf(){ // 获取自提点数据
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: 1
            }
            this.$axios.post(this.url+'shopapi/address/index',data
            ).then(res=>{
                if(res.data.code===200){
                    that.selfTotal = res.data.data.total
                    if(res.data.data.total<1){
                        that.shopData.shop_yourself = false
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        handleSuccess(response, file, fileList){
            this.shopData.proImg = response.data.src
        },
        beforeUpload(file){
            if(file.size/1024/1024>2){
                this.$message.warning("上传图片大小不能超过2M")
                return false
            }
        },
        selfChange(val){ // 选择到店自提前判断自提点是否有数据
            if(this.selfTotal<1){
                this.shopData.shop_yourself = false
                this.dialogVisible = true
            }else{
                this.saveSetting(25,val)
            }
        },
        payChange(val){
            this.saveSetting(26,val)
        },
        jumpAdd(){
            const { href } = this.$router.resolve({
                path: '/wf/admin/shop/self_point_management/add_self_point',
                query: {
                    id: -1
                }
            })
            window.open(href)
        },
        saveName(){ // 保存头像和名称接口
            if(/^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{1,30}$/.test(this.shopData.proName)){
                let that = this
                let data = JSON.parse(JSON.stringify(this.shopData))
                delete data.shop_yourself
                delete data.cash_on_delivery
                this.$axios.post(this.url+'shopapi/Program/edit', data)
                .then(function (res) {
                    if(res.data.code===1){
                        that.$message.success("保存成功")
                        location.reload()
                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    that.$message.error('请联系管理员');
                });
            }else{
                this.$message.error("名称不能包含特殊字符,且汉字在1-15个,英文在1-30个!")
            }
        },
        saveSetting(type,val){ // 保存经营设置的接口
            let that = this
            let state
            if(this.payId!=""||this.selfId!=""){
                if(val===true){
                    state = 0
                }else{
                    state = 1
                }
            }else{
                if(val===true){
                    state = 1
                }else{
                    state = 0
                }
            }
            let data = {
                secret: localStorage.getItem('secretId'),
                modular_id: type,
                state: state
            }
            if(this.payId!=""||this.selfId!=""){
                if(type===25){
                    data.id = this.selfId
                }else{
                    data.id = this.payId
                }
            }
            this.$axios.post(this.url+'shopapi/program/store', data)
            .then(function (res) {
                if(res.data.code===200){
                    that.getCompile()
                    that.$message.success("修改成功")
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
        save(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    this.saveName()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-shop_settings{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    .el-button--primary{
        background: #719FF8;
    }
    .numberlist{
        margin: 0 10px;
        width: 200px;
    }
    .graycolor{
        color:#999;
        margin-left: 20px;
        font-size: 12px;
    }
    .el-input{
        width: 300px;
    }
    .wf-gray-tit{
        padding: 20px 50px 20px 20px;
        background: #F8F8F8;
        border-radius: 4px;
        margin-bottom: 20px;
        .small-tit{
            font-size:12px;
            color: #999;
            margin-left: 5px;
        }
    }
    /deep/ .el-dialog__footer{
        text-align: center;
    }
    /deep/ .wf-upload{
        .el-form-item__label{
            line-height: 80px;
        }
    }
    // 图片上传样式
    .avatar-uploader .el-upload {
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon{
        border-radius: 4px;
        background: #F3F3F3;
        font-size: 28px;
        color: #999;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border: none;
    }
    .avatar{
        border-radius: 4px;
        width: 80px;
        height: 80px;
        display: block;
    }
    .wf-time-span{
        width: 220px;
        margin-right: 20px;
        text-align: right;
        display: inline-block;
    }
}
</style>