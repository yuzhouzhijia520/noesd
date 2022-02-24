<template>
    <div class="wf-pointMarkting">
        <el-button style="margin-right:40px;" type="primary" size="mini" @click="editRules">编辑规则</el-button>
        <el-switch
        v-model="pointSwitch"
        active-color="#719FF8"
        :active-text="switchText"
        @change="ruleSwitch">
        </el-switch>
        <div class="wf-gray-box">操作流程</div>
        <ul class="wf-margin-left" style="font-size:14px;">
            <li>1.商家设置积分规则，开启积分营销功能</li>
            <li>2.买家通过指定方式获取积分</li>
            <li>3.买家消耗积分</li>
            <li>4.商家查看积分变动明细</li>
        </ul>
        <div v-if="pointShowAll">
            <div class="wf-gray-box">赠送积分</div>
            <div class="wf-margin-left">
                <p v-if="pointShowTop">交易得积分 : <span class="wf-font-size">每消费{{price}}元换1积分</span><span class="wf-gray-title">订单完成确认收货后赠送积分到账户。</span></p>
                <p v-if="pointShowBottom">签到得积分 : <span class="wf-font-size">签到1次得{{integral}}积分</span></p>
                <!-- <p v-if="pointShowInvite">邀请得积分 : <span class="wf-font-size">成功邀请好友购物每满{{1}}元，得{{2}}积分</span></p> -->
            </div>
        </div>
        <div v-if="guizeShow">
            <div class="wf-gray-box">积分抵现</div>
            <div class="wf-margin-left">
                <p>抵现规则 : <span class="wf-font-size">{{cash_integral}}积分=1元</span></p>
                <p>抵现限制 : <span class="wf-font-size">{{offset_value}}</span><span class="wf-gray-title">开启后，下单时积分可以抵扣部分金额；同时设置抵现最高金额。</span></p>
            </div>
        </div>
        <div v-if="dateShow">
            <div class="wf-gray-box">积分过期与清除</div>
            <div class="wf-margin-left">
                <p>积分有效期<span class="wf-font-blue">{{end_time}}</span></p>
                <span class="wf-gray-title" style="margin-left:0;">根据设置的积分有效期，在积分过期时，对过期积分进行清除操作</span>
            </div>
        </div>
        <div v-if="rulseShow">
            <div class="wf-gray-box">积分规则补充说明</div>
            <div class="wf-margin-left">
                <p v-html="rule"></p>
            </div>
        </div>
    </div>
</template>

<script>
import {pointMarktingData,pointMarktingSwitchData,pointMarktingSwitch} from '@/server/pointMarkting.js';
import {dateFormat} from "@/untils/common.js";
export default {
    name: "pointMarkting",
    data() {
        return {
            switchText: "禁用",
            pointSwitch: false, // 小程序功能总开关
            price: "", // 交易得积分数据
            integral: "", // 签到得积分数据
            pointShowAll: false, // 赠送积分整体显示
            pointShowTop: false, // 交易得积分显示
            pointShowBottom: false, // 签到得积分显示
            pointShowInvite: false, // 邀请得积分显示
            guizeShow: false, //积分抵现显示
            cash_integral: "", // 抵现规则积分
            offset_value: "", // 抵现限制
            end_time: "", // 积分有效期
            rule: "", // 积分规则补充说明
            dateShow: false, // 积分有效期显示
            rulseShow: false, // 积分规则说明显示
            id: "", // 保存开关的模块id
            dataId: -1 // 列表id
        }
    },
    mounted(){
        this.getData();
        this.getSwitchData();
    },
    methods:{
        async getData(){
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let newData = [];
            let that = this;
            newData = await pointMarktingData()
            that.$nextTick(()=>{
                loading.close()
                if(newData.data.code===200){
                    if(newData.data.data.length>0){
                        let data = newData.data.data[0]
                        that.dataId = data.id
                        that.integral = data.integral
                        that.price = data.price
                        if(data.state===1){
                            that.pointShowAll = true
                            that.pointShowTop = true
                        }else if(data.state===2){
                            that.pointShowBottom = true
                            that.pointShowAll = true
                        }else if(data.state===3){
                            that.pointShowAll = true
                            that.pointShowTop = true
                            that.pointShowBottom = true
                        }
                        if(data.status===1){
                            that.cash_integral = data.cash_integral
                            if(data.cash_limit===0){
                                that.offset_value = "不限制"
                            }else if(data.cash_limit===1){
                                that.offset_value = "单次消费最多使用"+data.offset_value+"积分"
                            }else if(data.cash_limit===2){
                                that.offset_value = "单次消费最少使用"+data.offset_value+"积分"
                            }else if(data.cash_limit===3){
                                that.offset_value = "单次消费最多使用商品总价比例"+data.offset_value+"%"
                            }
                             that.guizeShow = true
                        }
                        if(data.integral_type===0){
                            that.end_time = "永久有效"
                        }else{
                            that.end_time = "每年发放的所有积分，在第二年"+
                            dateFormat(data.end_time,"{m}")+"月"+
                            dateFormat(data.end_time,"{d}")+"日过期"
                        }
                        that.rule = data.rule
                        that.rulseShow = true
                        that.dateShow = true
                    }else{
                        that.pointShowAll = false
                        that.guizeShow = false
                        that.dateShow = false
                        that.rulseShow =false
                    }
                }else{
                    that.$message.error(newData.data.msg)
                }
            })
        },
        editRules(){
            this.$router.push({path:"/wf/admin/shop/markting/pointMarkting/editRules",query:{id:this.dataId}})
        },
        async getSwitchData(){
            let newData = [];
            let that = this;
            newData = await pointMarktingSwitchData()
            if(newData.data.code===200){
                for(let i=0;i<newData.data.data.length;i++){
                    if(newData.data.data[i].modular_id===29){
                        that.id = newData.data.data[i].id
                        if(newData.data.data[i].state!=0){
                            that.pointSwitch = true
                        }
                    }
                }
            }else{
                that.$message.error(newData.data.msg)
            }
        },
        async ruleSwitch(val){
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let newData = [];
            let that = this;
            let id = that.id
            newData = await pointMarktingSwitch(val,id)
            loading.close()
            if(newData.data.code===200){
                that.getSwitchData();
            }else{
                that.pointSwitch = false
                that.$message.error(newData.data.msg)
            }
        }
    },
    watch: {
        pointSwitch(val,oldVal){
            if(val===true){
                this.switchText = "开启"
            }else{
                this.switchText = "禁用"
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-pointMarkting{
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
    .wf-font-size{
        font-size: 14px;
    }
    .wf-font-blue{
        color: #719FF8;
        font-size: 14px;
        margin-left: 20px;
    }
    /deep/ .el-switch__label{
        color: #999;
    }
    /deep/ .el-switch__label.is-active{
        color: #719FF8;
    }
}
</style>
