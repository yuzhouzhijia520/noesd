<template>
    <div class="wf-shop_settings">
        <el-form label-position="right"
        label-width="15px"
        class="demo-ruleForm">
            <div class="wf-gray-tit">好物圈设置<span class="small-tit">设置小程序扩展功能</span></div>
           
            <el-form-item v-for="(item,index) in selectlist" :key="index">
                <el-row :gutter="20">
                    <el-col :span="2" style="text-align:center">{{item.type==0?'好物圈':'推荐好物'}}</el-col>
                    <el-col :span="2">
                        <el-switch
                            v-model="item.state"
                            active-color="#719FF8"
                            inactive-color="#CCCCCC"
                            class="markting-switch"
                            :active-text="item.state==0?'关闭':'开启' "
                            @change="changereadios(item,index)">
                        </el-switch>
                    </el-col>
                    <el-col :span="20"><span> {{item.type==0?'开启好物圈，同步小程序里的订单和购物车商品，还可以将自己购买或添加购物车的好物推荐给朋友，享有小程序搜索能力。（v3.5.2 及以上版本可用）':'开启推荐好物后，用户在商品详情页可点击按钮分享到好物圈。（v3.5.2 及以上版本可用）  提示：需先开启好物圈功能。医疗、金融、游戏类目无法开启。'}} </span></el-col>
                  
                </el-row>
            </el-form-item>
            <!-- <el-form-item  >
                <el-row :gutter="20">
                    <el-col :span="2" style="text-align:center"> </el-col>
                    <el-col :span="2">
                        <el-switch
                            v-model="recommend.state"
                            active-color="#719FF8"
                            inactive-color="#CCCCCC"
                            class="markting-switch"
                            :active-text="recommend.state==0?'关闭':'开启' "
                            @change="changereadio(recommend)">
                        </el-switch>
                    </el-col>
                    <el-col :span="20"><span> </span><span></span></el-col>
                  
                </el-row>
            </el-form-item> -->
            
        </el-form>
        
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getbutton,open} from '@/server/goodcircle.js'
import { getAuditApplicationList } from '@/server/common';
export default {
    name: "goodcircle",
    data() {
        return {
            state:false,
            showVersion:false,//版本控制
            goodthing:'',//好物圈
            recommend:'',//推荐
            selectlist:[]
        }
    },
    components: {
        versionCom
    },
    mounted() {
        let that = this
        that.getbutton()
    },
    methods: {
        handleCloseVersion(){
            this.showVersion=false;
        },
        changereadios(e,index){//
            let that = this
            getAuditApplicationList(index===0?25:26).then((res)=>{
                if(res.data.code==200){
                    if(res.data.data){
                        let data = {secret:localStorage.getItem('secretId'),id:e.id,state:e.state===false?0:1}
                        console.log(e.state)
                        open(data).then(function (res) {
                            if(res.data.code ==200){
                                that.$message({
                                    showClose: true,
                                    message: '操作成功!',
                                    type: 'success'
                                });
                            }else{
                                that.$message({
                                    showClose: true,
                                    message: '网络错误 错误码600A0079',
                                    type: 'warning'
                                });
                            }
                        }).catch(err=>{
                            that.$message({
                                showClose: true,
                                message: '网络错误 错误码600B0080',
                                type: 'warning'
                            });
                        });
                    }else{
                        that.showVersion = true;
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00135");
                }
            }).catch((item)=>{
                that.$message.error(res.data.msg+"600B00136");
            })
        },
        getbutton(){
            let that = this
            let data = {secret:localStorage.getItem('secretId')}
            getbutton(data).then(function (res) {
                if(res.data.code ==200){
                    res.data.data.forEach((element,index) => {
                        if(element.type == 0){
                            if(res.data.data[index].state == 0){
                                res.data.data[index].state = false
                            }else if(res.data.data[index].state == 1){
                                res.data.data[index].state = true
                            }
                            // that.goodthing = res.data.data[index]
                        }else if(element.type == 1){
                            if(res.data.data[index].state == 0){
                                res.data.data[index].state = false
                            }else if(res.data.data[index].state == 1){
                                res.data.data[index].state = true
                            }
                            // that.recommend = res.data.data[index]
                        }
                        that.selectlist = res.data.data
                    });
                }else{
                    that.$message({
                        showClose: true,
                        message: '网络错误 错误码600A0077',
                        type: 'warning'
                    });
                }
            }).catch(err=>{
                that.$message({
                    showClose: true,
                    message: '网络错误 错误码600B0078',
                    type: 'warning'
                });
            });
            
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
}
</style>