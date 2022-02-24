<template>
    <div class="wf-editRules">
        <div class="wf-gray-box" style="margin-top:0;">赠送积分</div>
        <div class="wf-margin-left">
            <p class="wf-red-title">不填则不设置赠送积分。</p>
            <div class="wf-margin-top">
                <el-switch
                v-model="oneSwitch"
                active-color="#719FF8"
                :active-text="oneSwitchText">
                </el-switch>
                <span class="wf-gift-point-space">交易得积分</span>
                消费
                <el-input-number :precision="2" :max="1000" :min="0.01" size="mini" v-model="price" :controls="false"></el-input-number>
                元换1积分
                <br/>
                <span style="margin-left: 208px;" class="wf-gray-title">积分比例可设置为小数，最多保留两位小数，订单完成确认收货后赠送积分到账户。</span>
            </div>
            <div class="wf-margin-top">
                <el-switch
                v-model="twoSwitch"
                active-color="#719FF8"
                :active-text="twoSwitchText"
                @change="checkChange">
                </el-switch>
                <span class="wf-gift-point-space">签到得积分</span>
                签到1次得
                <el-input-number :precision="0" :max="100" :min="1" size="mini" v-model="integral" :controls="false"></el-input-number>
                积分
            </div>
            <!-- <div class="wf-margin-top">
                <el-switch
                v-model="fourSwitch"
                active-color="#719FF8"
                :active-text="fourSwitchText">
                </el-switch>
                <span class="wf-gift-point-space">邀请得积分</span>
                成功邀请好友购物每满
                <el-input-number :precision="0" :min="1" size="mini" v-model="aaaa" :controls="false"></el-input-number> 元得积分
                <span  class="wf-gray-title">不填写价格，则不限制购物金额仍然赠送积分；积分如果带%则为按成交价格的比例计算积分</span>
                <br/>
                <el-radio-group v-model="inviteRadio" style="line-height:36px;">
                    <div>
                        <el-radio :label="0">固定积分
                            <el-input-number :precision="0" :min="1" size="mini" v-model="bbbb" :controls="false"></el-input-number>积分
                        </el-radio>
                    </div>
                    <div>
                        <el-radio :label="1">百分比
                            <el-input size="mini" v-model="bbbb"></el-input>积分
                        </el-radio>
                    </div>
                </el-radio-group>
            </div> -->
        </div>
        <div class="wf-gray-box">积分抵现</div>
        <div class="wf-margin-left">
            <p class="wf-red-title">开启后，下单时积分可以抵扣部分金额；同时设置抵现最高金额。</p>
            <div class="wf-margin-top">
                <el-switch
                v-model="threeSwitch"
                active-color="#719FF8"
                :active-text="threeSwitchText">
                </el-switch>
                <span class="wf-gift-guize-space">抵现规则</span>
                <el-input-number :precision="0" :max="1000" :min="1" size="mini" v-model="cash_integral" :controls="false"></el-input-number>
                积分=1元
                <span class="wf-gray-title">多少个积分可以抵现1元，请填写正整数</span>
            </div>
            <div class="wf-margin-top">
                <span style="margin-left:103px;position:relative;top:-57px;" class="wf-gift-guize-space">抵现限制</span>
                <el-radio-group v-model="radio" style="line-height:36px;">
                    <div><el-radio :label="0">不限制</el-radio></div>
                    <div>
                        <el-radio :label="1">单次消费最多使用
                            <el-input-number :max="10000" :precision="0" :min="1" :disabled="disabled.input1" style="margin:0 11px 0 18px;" size="mini" v-model="offset_value1" :controls="false"></el-input-number>积分
                        </el-radio>
                    </div>
                    <div>
                        <el-radio :label="2">单次消费最少使用
                            <el-input-number :max="10000" :precision="0" :min="1" :disabled="disabled.input2" style="margin:0 11px 0 18px;" size="mini" v-model="offset_value2" :controls="false"></el-input-number>积分
                        </el-radio>
                    </div>
                    <div>
                        <el-radio :label="3">单次消费最多使用商品总价比例
                            <el-input-number :precision="0" :max="99" :min="1" :disabled="disabled.input3" style="margin:0 11px 0 18px;" size="mini" v-model="offset_value3" :controls="false"></el-input-number>%
                        </el-radio>
                    </div>
                </el-radio-group>
            </div>
        </div>
        <div class="wf-gray-box">积分过期与清除</div>
        <div class="wf-margin-left">
            <p class="wf-red-title">根据设置的积分有效期，在积分过期时，对过期积分进行清除操作</p>
            <div class="wf-margin-top">
                <span style="position:relative;top:-24px;margin-left:0;" class="wf-gift-guize-space">积分有效期</span>
                <el-radio-group v-model="dateRadio" style="line-height:36px;">
                    <div><el-radio :label="0">永久有效</el-radio></div>
                    <div>
                        <el-radio :label="1">每年发放的所有积分，在第二年
                            <el-select :disabled="dateDisabled" style="margin:0 10px 0 10px;" v-model="month" size="mini">
                                <el-option
                                v-for="item in monthOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>月
                            <el-select :disabled="dateDisabled" style="margin:0 10px 0 10px;" v-model="day" size="mini">
                                <el-option
                                v-for="item in dayOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>日过期
                        </el-radio>
                    </div>
                </el-radio-group>
                <div style="margin-left:124px;" class="wf-gray-title">例：若配置为每年发放的所有积分，在第2年的12月31日过期；那么2018年发放的所有积分，将会在2019年12月31日过期</div>
            </div>
        </div>
        <div class="wf-gray-box">积分规则补充说明</div>
        <div class="wf-margin-left">
            <el-input
            type="textarea"
            autosize
            placeholder="请填写积分规则说明，让客户更清楚积分的获取、使用情况。"
            v-model="textarea">
            </el-input>
            <div style="margin-top:30px;">
                <el-button size="mini" @click="returnJump">返回</el-button>
                <el-button type="primary" size="mini" @click="save">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {dateFormat} from "@/untils/common.js";
import { pointMarktingCheckOpen } from '@/server/pointMarkting.js';
export default {
    name: "editRules",
    data() {
        return {
            inviteRadio: 0,
            aaaa: undefined, // 邀请得积分满元
            bbbb: undefined, // 邀请得积分送积分
            fourSwitch: false,
            fourSwitchText: "禁用",
            oneSwitch: false, // 交易得积分开关
            oneSwitchText: "禁用", // 开关文字
            price: undefined, // 交易得积分
            twoSwitch: false, // 签到得积分开关
            twoSwitchText: "禁用",
            integral: undefined, // 签到得积分
            threeSwitch: false, // 抵现规则开关
            threeSwitchText: "禁用",
            cash_integral: undefined, // 抵现规则
            radio: 0, // 抵现限制类型
            offset_value1: undefined, // 抵现限制数据
            offset_value2: undefined,
            offset_value3: undefined,
            disabled: { // 单选框禁选
                input1: true,
                input2: true,
                input3: true
            },
            dateRadio: 0,
            dateDisabled: true, // 日期禁用
            month: "01", // 月
            day: "01", // 日
            monthOptions: [
                { value:"01", label:"01" },{ value:"02", label:"02" },{ value:"03", label:"03" },{ value:"04", label:"04" },{ value:"05", label:"05" },{ value:"06", label:"06" },
                { value:"07", label:"07" },{ value:"08", label:"08" },{ value:"09", label:"09" },{ value:"10", label:"10" },{ value:"11", label:"11" },{ value:"12", label:"12" }
            ], // 月选择器
            dayOptions: [
                { value:"01", label:"01" },{ value:"02", label:"02" },{ value:"03", label:"03" },{ value:"04", label:"04" },{ value:"05", label:"05" },{ value:"06", label:"06" },
                { value:"07", label:"07" },{ value:"08", label:"08" },{ value:"09", label:"09" },{ value:"10", label:"10" },{ value:"11", label:"11" },{ value:"12", label:"12" },
                { value:"13", label:"13" },{ value:"14", label:"14" },{ value:"15", label:"15" },{ value:"16", label:"16" },{ value:"17", label:"17" },{ value:"18", label:"18" },
                { value:"19", label:"19" },{ value:"20", label:"20" },{ value:"21", label:"21" },{ value:"22", label:"22" },{ value:"23", label:"23" },{ value:"24", label:"24" },
                { value:"25", label:"25" },{ value:"26", label:"26" },{ value:"27", label:"27" },{ value:"28", label:"28" },{ value:"29", label:"29" },{ value:"30", label:"30" }
            ], // 日选择器
            textarea: "" // 文本框
        }
    },
    mounted(){
        if(this.$route.query.id!=-1){
            this.editData(this.$route.query.id)
        }
    },
    methods: {
        checkChange(val){
            let that = this
            let data = {
                pro_id: parseInt(localStorage.getItem('proId')),
                token: localStorage.getItem('userId')
            }
            pointMarktingCheckOpen(data).then((res)=>{
                if(res.data.code===200){
                    
                }else{
                    that.twoSwitch =! that.twoSwitch
                    that.$message.error(res.data.msg+"600A00187");
                }
            }).catch((err)=>{
                that.twoSwitch =! that.twoSwitch
                that.$message.error('网络错误600B00188');
            })
        },
        returnJump(){
            this.$router.push({path:"/wf/admin/shop/markting/pointMarkting"})
        },
        editData(id){
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                id: id
            }
            this.$axios.post(this.url+'shopapi/integral/edit',data
            ).then(res=>{
                if(res.data.code===200){
                    let data = res.data.data
                    if(data.state===1){
                        that.oneSwitch = true
                        that.price = data.price
                    }else if(data.state===2){
                        that.twoSwitch = true
                        that.integral = data.integral
                    }else if(data.state===3){
                        that.oneSwitch = true
                        that.twoSwitch = true
                        that.price = data.price
                        that.integral = data.integral
                    }
                    if(data.status===1){
                        that.threeSwitch = true
                        that.cash_integral = data.cash_integral
                        if(data.cash_limit===1){
                            that.radio = 1
                            that.offset_value1 = data.offset_value
                        }else if(data.cash_limit===2){
                            that.radio = 2
                            that.offset_value2 = data.offset_value
                        }else if(data.cash_limit===3){
                            that.radio = 3
                            that.offset_value3 = data.offset_value
                        }
                    }
                    if(data.integral_type===1){
                        that.dateRadio = 1
                        that.month = dateFormat(data.end_time,"{m}")
                        that.day = dateFormat(data.end_time,"{d}")
                    }
                    that.textarea = data.rule.replace(/<br>/g,"\n")
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        save(){
            let that = this
            // else if(this.fourSwitch===true&&this.aaaa===undefined){
            //     this.$message.warning("请填写邀请得积分")
            // }
            if(this.oneSwitch===true&&this.price===undefined){
                this.$message.warning("请填写交易得积分")
            }else if(this.twoSwitch===true&&this.integral===undefined){
                this.$message.warning("请填写签到得积分")
            }else if(this.threeSwitch===true&&this.cash_integral===undefined){
                this.$message.warning("请填写抵现规则")
            }else if(this.threeSwitch===true&&(this.radio===1&&this.offset_value1===undefined||this.radio===2&&this.offset_value2===undefined||this.radio===3&&this.offset_value3===undefined)){
                this.$message.warning("请填写抵现限制")
            }else if(this.textarea===""){
                this.$message.warning("请填写积分规则补充说明")
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: '保存中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let data = {
                    secret: localStorage.getItem("secretId"),
                    rule: this.textarea.replace(/\n|\r\n/g,"<br>"),
                    modular_id: 29
                }
                if(this.oneSwitch===false&&this.twoSwitch===false){
                    data.state = 0
                }else if(this.oneSwitch===true&&this.twoSwitch===true){
                    data.state = 3
                    data.price = this.price
                    data.integral = this.integral
                }else if(this.oneSwitch===true){
                    data.state = 1
                    data.price = this.price
                }else if(this.twoSwitch===true){
                    data.state = 2
                    data.integral = this.integral
                }
                if(this.threeSwitch===true){
                    data.status = 1
                    data.cash_integral = this.cash_integral
                    if(this.radio===0){
                        data.cash_limit = 0
                    }else if(this.radio===1){
                        data.cash_limit = 1
                        data.offset_value = this.offset_value1
                    }else if(this.radio===2){
                        data.cash_limit = 2
                        data.offset_value = this.offset_value2
                    }else if(this.radio===3){
                        data.cash_limit = 3
                        data.offset_value = this.offset_value3
                    }
                }else{
                    data.status = 0
                }
                // if(this.fourSwitch===true){
                //     data.aaaa = this.aaaa
                //     data.bbbb = this.bbbb
                // }
                if(this.dateRadio===0){
                    data.integral_type = 0
                    data.end_time = ""
                }else{
                    data.integral_type = 1
                    data.end_time = this.month+"-"+this.day
                }
                if(this.$route.query.id!=-1){
                    data.id = this.$route.query.id
                }
                this.$axios.post(this.url+'shopapi/integral/store',data
                ).then(res=>{
                    loading.close()
                    if(res.data.code===200){
                        that.$message.success("保存成功")
                        that.$router.push({path:"/wf/admin/shop/markting/pointMarkting"})
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch(err=>{
                    loading.close()
                    that.$message.error('系统出错，请联系管理员！');
                });
            }
        }
    },
    watch: {
        oneSwitch(val,oldVal){
            if(val===true){
                this.oneSwitchText = "开启"
            }else{
                this.oneSwitchText = "禁用"
            }
        },
        twoSwitch(val,oldVal){
            if(val===true){
                this.twoSwitchText = "开启"
            }else{
                this.twoSwitchText = "禁用"
            }
        },
        threeSwitch(val,oldVal){
            if(val===true){
                this.threeSwitchText = "开启"
            }else{
                this.threeSwitchText = "禁用"
            }
        },
        // fourSwitch(val,oldVal){
        //     if(val===true){
        //         this.fourSwitchText = "开启"
        //     }else{
        //         this.fourSwitchText = "禁用"
        //     }
        // },
        radio(val,oldVal){
            if(val===1){
                this.disabled.input1 = false
                this.disabled.input2 = true
                this.disabled.input3 = true
            }else if(val===2){
                this.disabled.input2 = false
                this.disabled.input1 = true
                this.disabled.input3 = true
            }else if(val===3){
                this.disabled.input3 = false
                this.disabled.input1 = true
                this.disabled.input2 = true
            }else{
                this.disabled.input1 = true
                this.disabled.input2 = true
                this.disabled.input3 = true
            }
        },
        dateRadio(val,oldVal){
            if(val===0){
                this.dateDisabled = true
            }else{
                this.dateDisabled = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-editRules{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    .el-button--primary{
        background: #719FF8;
    }
    .wf-gray-box{
        height: 60px;
        background: #F8F8F8;
        border-radius:4px;
        padding-left: 20px;
        line-height: 60px;
        margin: 20px 0;
    }
    .wf-margin-left{
        margin-left:20px;
        line-height:30px;
    }
    .wf-gray-title{
        color: #999;
        font-size: 12px;
        margin-left: 20px;
    }
    /deep/ .el-switch__label{
        color: #999;
    }
    /deep/ .el-switch__label.is-active{
        color: #719FF8;
    }
    .wf-red-title{
        font-size: 12px;
        color: #E36F6B;
    }
    .wf-gift-point-space{
        margin: 0 20px;
    }
    .wf-gift-guize-space{
        margin: 0 37px 0 20px;
    }
    .el-input-number,.el-select{
        width: 80px;
    }
    .wf-margin-top{
        margin-top: 16px;
    }
    /deep/ .el-radio{
        .el-radio__inner{
            width: 16px;
            height: 16px;
            border: 1px solid #719FF8;
        }
        .el-radio__input.is-checked .el-radio__inner{
            border-color: #719FF8;
            background: #fff;
        }
        .el-radio__inner::after{
            width: 12px;
            height: 12px;
            background-color: #719FF8;
        }
    }
    /deep/ .el-textarea{
        width: 800px;
        .el-textarea__inner{
            height: 120px!important;
        }
    }
}
</style>
