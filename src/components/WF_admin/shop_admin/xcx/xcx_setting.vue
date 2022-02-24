<template>
    <div id="xcx_setting">
        <div v-if="appId===undefined"></div>
        <div v-else-if="appId===''">
            <p class="wf-title wf-margin-bottom">您还没有授权小程序，授权小程序后，即可发布小程序</p>
            <div class="wf-content wf-margin-bottom">1.首先进行小程序注册，然后将小程序授权给平台。</div>
            <div class="wf-content wf-margin-bottom">2.小程序个人开放的服务类目有严格规定，内容不在服务类目中，是审核不通过的。</div>
            <div class="wf-content wf-margin-bottom">3.为什么要授权小程序？<p>因为平台需要获取到您的小程序ID和密钥，以便生成相应的代码包。</p></div>
            <div class="wf-content wf-margin-bottom">4.授权之后能完成什么功能？<p>授权之后可以直接在平台中提交体验版本，在小程序上线之前提前预览。</p></div>
            <el-button type="primary" size="mini" @click="authorization">已有小程序，直接授权</el-button>
            <el-button size="mini" @click="registApp">注册小程序账号</el-button>
        </div>
        <div v-else>
            <p class="wf-title wf-margin-bottom">您已授权以下小程序给平台</p>
            <div class="wf-box">
                <div class="wf-float-left">
                    <img v-if="head_img!==''" class="wf-logo" :src="head_img" alt="">
                    <div v-else class="wf-logo">logo</div>
                </div>
                <div class="wf-float-left wf-margin-left">
                    <p class="wf-margin-bottom">APPID(小程序ID）：{{appId}}</p>
                    <p class="wf-margin-bottom">小程序名称：{{nick_name}}</p>
                    <p class="wf-margin-bottom">运营主体：{{principal_name}}</p>
                    <p class="wf-margin-bottom">小程序介绍：{{signature}}</p>
                    <el-button class="wf-margin-right" @click="authorization" type="primary" size="mini">重新授权小程序</el-button>
                    <el-popover
                    placement="right"
                    width="340"
                    trigger="hover"
                    content="已绑定小程序，解绑或换绑数据可能丢失，请谨慎操作">
                        <span style="font-size:20px;color:#ccc;" slot="reference" class="el-icon-question"></span>
                    </el-popover>
                </div>
                <div class="wf-clear"></div>
            </div>
            <div>
                <p class="wf-title wf-margin-bottom wf-margin-top">小程序若需要微信支付及退款功能，必须完善以下信息</p>
                <el-form
                label-position="right"
                label-width="220px">
                    <el-form-item v-if="this.$store.state.proVersion==='国际电商版'" label="商户号所属国家或地区">
                        <el-select class="wf-input-width" v-model="region" placeholder="请选择所属国家或地区" size="mini">
                            <el-option
                            v-for="item in regionOptions"
                            :key="item.id"
                            :label="item.country"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <code v-if="this.$store.state.proVersion!=='国际电商版'||region!==''">
                        <el-form-item :label="region===1?'微信商户号ID（Merchant No.）':(region===2?'门店账号（門店賬號）':'微信商户号ID')">
                            <el-input class="wf-input-width" v-model="shanghuhao" placeholder="请输入微信商户号ID" size="mini"></el-input>
                            <p class="wf-title-gray">用于实现微信支付功能
                                <span v-if="this.$store.state.proVersion!=='国际电商版'||region===1000">
                                    ，登录微信商户平台(
                                    <el-button type="text" @click="weixinJump">https://pay.weixin.qq.com</el-button>)，在
                                    <span class="wf-color-3">”账户中心-账户设置-商户信息”</span>中查看
                                </span>
                            </p>
                        </el-form-item>
                        <el-form-item :label="region===1?'店铺号（Store No.）':(region===2?'支付秘钥（支付秘鑰）':'微信商户API密钥')">
                            <el-input class="wf-input-width" v-model="miyao" :placeholder="region!==1000?'请输入微信店铺号':'请输入微信商户API密钥'" size="mini"></el-input>
                            <p class="wf-title-gray">用于实现微信支付功能
                                <span v-if="this.$store.state.proVersion!=='国际电商版'||region===1000">
                                    ，登录微信商户平台(
                                        <el-button type="text" @click="weixinJump">https://pay.weixin.qq.com</el-button>
                                        )，在
                                        <span class="wf-color-3">”账户中心-账户设置-API安全”</span>中查看
                                </span>
                            </p>
                        </el-form-item>
                        <el-form-item label="Token" v-if="region===1">
                            <el-input class="wf-input-width" v-model="country_token" placeholder="请输入token" size="mini"></el-input>
                            <p class="wf-title-gray">调用微信支付接口凭据</p>
                        </el-form-item>
                        <el-form-item label="CERT证书" v-if="this.$store.state.proVersion!=='国际电商版'||region===1000">
                            <el-upload
                            class="upload-demo"
                            :action= "uploadurl"
                            :data="upload"
                            :onSuccess="onSuccess"
                            :beforeUpload="beforeAvatarUpload"
                            :onError="uploadError"
                            :show-file-list="false"
                            >
                                <el-button size="mini">点击上传</el-button>
                            </el-upload>
                            <code v-if="upText1!==''"><span class="wf-title-gray wf-margin-left"><i class="el-icon-document"></i> {{upText1}}</span></code>
                            <p class="wf-title-gray">微信退款原路退回时所需
                                <span v-if="this.$store.state.proVersion!=='国际电商版'||region===1000">
                                    ，下载证书cert.zip中的apiclient_cert.pem文件
                                </span>
                            </p>
                        </el-form-item>
                        <el-form-item label="KEY密钥文件" v-if="this.$store.state.proVersion!=='国际电商版'||region===1000">
                            <el-upload
                            class="upload-demo"
                            :action="uploadurls"
                            :data="upload"
                            :onSuccess="onSuccess2"
                            :beforeUpload="beforeAvatarUpload"
                            :show-file-list="false"
                            :onError="uploadError"
                            >
                                <el-button size="mini">点击上传</el-button>
                            </el-upload>
                            <code v-if="upText2!==''"><span class="wf-title-gray wf-margin-left"><i class="el-icon-document"></i> {{upText2}}</span></code>
                            <p class="wf-title-gray">微信退款原路退回时所需
                                <span v-if="this.$store.state.proVersion!=='国际电商版'||region===1000">
                                    ，下载证书cert.zip中的apiclient_key.pem文件
                                </span>
                            </p>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" :loading="saveLoading" @click="save">保存</el-button>
                        </el-form-item>
                    </code>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { getCountry } from '@/server/getCountry.js'
export default {
    name: 'xcx_setting',
    data(){
        return{
            saveLoading: false,
            country_token: "",
            upText1: "",
            upText2: "",
            head_img: "",
            principal_name: "",
            nick_name: "",
            signature: "",
            region: "",
            regionOptions: [],
            urls:'',
            appId:undefined,
            upload:{
                secret:localStorage.getItem('secretId')
            },
            shanghuhao:'',
            miyao:'',
            uploadurl:'',//上传apiclient_cert证书所需地址
            uploadurls:''//上传apiclient_key证书所需地址
        }
    },
    created(){
        this.set();
        //上传apiclient_cert证书
        this.uploadurl = this.url + 'shopapi/program/apiclientCert?token='+localStorage.getItem('userId')
        //上传apiclient_key证书所需地址
        this.uploadurls = this.url + 'shopapi/program/apiclientKey?token='+localStorage.getItem('userId')
        this.getCountry()
    },
    methods:{
        getCountry(){
            let that = this
            let data = {
                secret: localStorage.getItem("secretId")
            }
            getCountry(data).then(function (res) {
                if(res.data.code === 200){
                    that.regionOptions = res.data.data
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误');
            });
        },
        weixinJump(){
            window.open("https://pay.weixin.qq.com");
        },
        registApp(){
            window.open("https://mp.weixin.qq.com/cgi-bin/wx");
        },
        authorization(){
            window.open(this.urls);
        },
        set(){
            let that = this
            this.$axios.post(this.url + 'shopapi/Application/index', //小程序授权
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            )
            .then(function(res){
                if(res.data.code==1){
                    that.urls=res.data.data.url;
                    that.appId=res.data.data.appId;
                    that.shanghuhao = res.data.data.merchant_number
                    that.miyao = res.data.data.merchant_key
                    that.head_img = res.data.data.head_img
                    that.principal_name = res.data.data.principal_name
                    that.nick_name = res.data.data.nick_name
                    that.signature = res.data.data.signature
                    that.region = res.data.data.country_id
                    if(res.data.data.country_token!=0){
                        that.country_token = res.data.data.country_token
                    }
                }else{
                    that.$message(res.data.msg)
                }
            })
            .catch(function (error) {
                that.$message.error("网络错误")
            })
        },
        onSuccess(response, file, fileList){
            this.$message.success("上传成功");
            this.upText1 = file.name
        },
        onSuccess2(response, file, fileList){
            this.$message.success("上传成功");
            this.upText2 = file.name
        },
        uploadError (response, file, fileList) {
              this.$message.warning("上传失败，请重试");
        },
        beforeAvatarUpload (file) {
            const extension = file.name.split('.')[1] === 'pem'
            const isLt2M = file.size / 1024 / 1024 < 10
            if (!extension) {
            
                this.$message({
                message: '上传模板只能是pem',
                type: 'warning'
            });
            }
            return extension 
        },
        save(){
            debugger
            let that = this
            if(this.region===1&&this.country_token===""){
                this.$message.warning("请填写token")
            }else if(this.shanghuhao===""){
                this.$message.warning("请填写商户号id")
            }else if(this.miyao===""){
                this.$message.warning("请填写微信api密钥或微信店铺号")
            }else{
                let data = {
                    secret: localStorage.getItem('secretId'),
                    merchant_number: this.shanghuhao,
                    merchant_key: this.miyao,
                    state: this.$store.state.proVersion==='国际电商版'?1:0,
                    country_id: this.region,
                    country_token: this.region===1?this.country_token:0
                }
                this.saveLoading = true
                this.$axios.post(this.url+'shopapi/Application/smallUpdate',data
                ).then(res=>{
                    that.saveLoading = false
                    if(res.data.code===200){
                        that.set()
                        that.$message.success("保存成功")
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch(err=>{
                    that.saveLoading = false
                    that.$message.error('系统出错，请联系管理员！');
                });
            }
        }
    }
}
</script>

<style lang="scss">
#xcx_setting{
    background-color: #fff;
    padding: 30px 40px;
    border-radius: 4px;
    .el-button--text{
        color: #719FF8;
    }
    .wf-color-3{
        color: #333;
    }
    .wf-title{
        color: #333;
        font-size: 18px;
        font-weight: 500;
    }
    .wf-margin-bottom{
        margin-bottom: 20px;
    }
    .wf-margin-right{
        margin-right: 10px;
    }
    .wf-margin-top{
        margin-top: 20px;
    }
    .wf-content{
        color: #555;
        p{
            margin-top: 10px;
            text-indent: 14px;
        }
    }
    .el-button--primary{
        background-color: #719FF8;
    }
    .wf-logo{
        width:100px;
        height:100px;
        background-color:#EDEDED;
        border-radius:4px;
        color: #555;
        text-align: center;
        line-height: 100px;
    }
    .wf-clear{
        clear: both;
    }
    .wf-float-left{
        float: left;
    }
    .wf-margin-left{
        margin-left: 30px;
    }
    .wf-box{
        padding-bottom: 30px;
        border-bottom: 1px solid #F0F0F0;
    }
    .wf-input-width{
        width: 300px;
    }
    .wf-title-gray{
        font-size: 12px;
        color: #999;
    }
    .upload-demo{
        display: inline-block;
    }
}
</style>
