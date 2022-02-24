<template>
    <div class="watchtooldetail-list clear">
        <div class="big-title">{{type}}</div>
        <div class="watchtooldetail-imgs clear">
            <img :src="image" alt="" class="watchtooldetail-img left"/>
            <span class="left watchtooldetail-span">
                <p class="watchtooldetail-pone">{{name}} <span>{{state}}</span> </p>
                <p class="watchtooldetail-ptwo">{{describe}}</p>
            </span>
        </div>
        <div class="year">￥ {{type_price}}/年</div>
        <div class="buttonlist">
            <el-button style="color:#719FF8;border-color:#719FF8;" @click="paymoney(0)" v-if="probation == 1" :disabled="noshows" size="mini" :loading="loading">免费试用7天</el-button>
            <el-button type="primary" @click="paylogin(1)" :disabled="noshow" size="mini" >{{states == 0?'审核中':'付费使用'}}</el-button>
        </div>
        <div class="big-titles">使用说明</div>
        <!-- <div class="small-title">商户如何进行配置？</div> -->
        <div class="small-title" v-html="explain"></div>
        <!-- <div class="small-title">如何投入实际试用？</div>
        <div class="small-titles">路径“店铺装修＞编辑＞添加优惠券入口(广告图、魔方等）”，页面入口链接设置为“优惠券列表”</div>
        <div class="small-title">使用者体验</div>
        <div class="small-titless">用户进入优惠券列表即可领取普通优惠券并消费</div> -->
        <div class="big-titles">案例介绍</div>
        <!-- <div class="small-title">图文混排</div> -->
        <div class="imalusi clear" v-html="content">
            
        </div>
        <el-dialog title="付费使用" :visible.sync="dialogFormVisible" width="40%" center>
            <el-form  :label-position="labelPosition" label-width="100px" >
                <el-form-item label="插件名称" >
                    <el-col :span="11" class="threepeice">{{name}}</el-col>
                </el-form-item>
                <el-form-item label="插件价格" >
                     <el-col :span="11" class="threepeice">{{type_price}}元/年</el-col>
                </el-form-item>
                 <el-form-item label="选择购买时长" >
                    <el-row>
                        <el-button v-for="(item,index) in list" :key="index" @click="watchprice(item)" size="mini">{{item.term_value}}</el-button>
                    </el-row>

                </el-form-item>
                 <el-form-item label="支付金额" >
                     <el-col :span="11" class="redprice">￥{{delogprice}}元</el-col>
                    
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="paymoney(1)" size="mini" :loading="loadings" v-if="this.list.length > 0">申请开通</el-button>
            </div>
        </el-dialog>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
import { getdetail ,paymoney} from '@/server/watchtooldetail.js'
export default {
    data(){
        return {
            showVersion:false,//控制版本提示
            //列表
            dialogFormVisible:false,
            labelPosition:'right',
            name:'',
            describe:'',
            type_price:'',
            type:'',
            explain:'',
            content:'',
            image:'',
            list:'',
            delogprice:0,//弹窗选中之后的价格
            state:'',
            modular_id:0,
            trial:0,
            probation:0,
            noshow:false,
            noshows:false,
            loading:false,
            loadings:false,
            time_limit:-1,
            states:0,
        }
    },
    components: {
        versionCom
    },
    created(){
        this.getdetail(this.$route.query.id)

    },
    methods: {
        handleCloseVersion(){
            this.showVersion=false;
        },
        paylogin(){
            if(parseInt(this.$route.query.id)===40){
                let that=this;
                getAuditApplicationList(25).then((res)=>{
                    if(res.data.code==200){
                        if(res.data.data){
                            that.dialogFormVisible=true
                        }else{
                            that.showVersion = true;
                        }
                    }else{
                        that.$message.error(res.data.msg+"600A00135");
                    }
                }).catch((item)=>{
                    that.$message.error(res.data.msg+"600B00136");
                })
            }else{
                this.dialogFormVisible=true
            }
        },
        watchprice(e){
            this.delogprice = e.price
            this.time_limit= e.term
        },
        paymoney(e){
            let that = this
            let probation 
            let state
            if(e == 0){//点击7天的anniu
                that.loading = true
                if(that.trial == 1){//已经点了7天的
                     that.$message({
                        message: '您已试用，请购买后再进行使用。',
                        type: 'warning'
                    });
                    that.loading = false
                }else{
                    probation=1
                    state=1
                     let data = {
                        pro_id: parseInt(localStorage.getItem('proId')),
                        price:that.delogprice,
                        time_limit:that.time_limit,
                        modular_id:that.modular_id,
                        probation:probation,
                        state:state
                    }
                    paymoney(data).then(function (res) {
                        that.loading = false
                        if(res.data.code ==200){
                            that.$message({
                                message: '申请成功！',
                                type: 'success'
                            });
                            that.dialogFormVisible =false
                            that.delogprice = 0
                            that.time_limit =0
                            that.trial = res.data.data.trial
                        }else{
                            that.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                    })
                }
            }else if(e==1){
                probation=0
                state=0
                that.loadings = true
                if(that.time_limit !== -1){
                    let data = {
                        pro_id: parseInt(localStorage.getItem('proId')),
                        price:that.delogprice,
                        time_limit:that.time_limit,
                        modular_id:that.modular_id,
                        probation:probation,
                        state:state
                    }
                     paymoney(data).then(function (res) {
                        that.loadings = false
                        if(res.data.code ==200){
                            that.$message({
                                message: '申请成功！',
                                type: 'success'
                            });
                            that.dialogFormVisible =false
                            that.delogprice = 0
                            that.time_limit =-1
                            that.trial = res.data.data.trial
                            that.states = 0,
                            that.noshow = true
                        }else{
                            that.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                    })
                }else{
                    that.$message({
                        message: '请选择购买的时长',
                        type: 'warning'
                    });
                    that.loadings = false
                }
                 
               
            }
           
            
        },
        getdetail(id){
            let that = this
            const loading = this.$loading({
                lock: true,
                text: '拼命加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let data = {id: id,pro_id: parseInt(localStorage.getItem('proId'))}
             getdetail(data).then(function (res) {
                 if(res.data.code ==200){
                     loading.close()
                     that.name = res.data.data.name
                     that.type_price = res.data.data.type_price
                     that.describe = res.data.data.describe
                     that.content = res.data.data.content
                     that.explain = res.data.data.explain
                     that.image = res.data.data.image
                     that.list = res.data.data.list
                     that.modular_id = res.data.data.id
                     that.probation = res.data.data.probation
                     that.trial = res.data.data.trial
                     that.states =  res.data.data.state
                     if(res.data.data.state ==0){
                         that.state = "未核对"
                         that.noshow  =true
                     }else if(res.data.data.state ==1){
                         that.state = "已核对"
                         that.noshow  =false
                     }else if(res.data.data.state ==2){
                         that.state = "拒绝"
                         that.noshow  =false
                     }
                     if(res.data.data.type ==0){
                        that.type = "营销玩法" 
                     }else if(res.data.data.type ==1){
                         that.type = "趣味玩法"
                     }else if(res.data.data.type ==2){
                         that.type = "粉丝唤醒"
                     }else if(res.data.data.type ==3){
                         that.type = "通用"
                     }else if(res.data.data.type ==4){
                         that.type = "跨境工具"
                     }
                 }
             })
        }
        
    }
};
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.clear{
    clear: both;
}
.watchtooldetail-list{
    background: #fff;
    padding: 28px 20px;
    .big-title{
        font-size:24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .watchtooldetail-imgs{
        margin-top: 26px;
        width: 100%;
        .watchtooldetail-img{
            width:60px;
            height:60px;
            // background: red;
        }
        .watchtooldetail-span{
            // height: 60px;
            padding-top: 7px;
            margin-left: 18px;
            .watchtooldetail-pone{
                font-size:20px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height: 20px;
                height: 20px;
                span{
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(227,111,107,1);
                    margin-left: 17px;
                }
            }
            .watchtooldetail-ptwo{
                font-size:15px;
                height: 15px;
                margin-top: 12px;
                font-family:MicrosoftYaHeiLight;
                font-weight:300;
                color:rgba(51,51,51,1);
                line-height: 15px;
            }
        }
    }
    .year{
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(227,111,107,1);
        margin-top: 22px;
        margin-bottom: 22px;
    }
    .buttonlist{
        padding-bottom: 28px;
        width: 100%;
        border-bottom:1px solid #eee;
    }
    .big-titles{
        font-size:20px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        margin-top: 28px;width: 100%;
    }
    .small-title{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:#666;
        margin-top: 30px;width: 100%;
        margin-bottom: 18px;
    }
    .small-titles{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;width: 100%;
        color:rgba(153,153,153,1);
        margin-top: 15px;
    }
    .small-titless{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;width: 100%;
        color:rgba(153,153,153,1);
        padding-bottom: 31px;
        border-bottom: 1px solid #eee;
    }
    .imalusi{
        color: #666;
        width: 100%;
        margin-top: 15px;
    }
    .redprice{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(227,111,107,1);
    }
    .threepeice{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .selectnear{
         width:80px;
        height:40px;
        border:1px solid rgba(204,204,204,1);
        border-radius:4px;
        text-align: center;
        line-height: 40px;
        margin-right: 20px;
    }
}

    
</style>