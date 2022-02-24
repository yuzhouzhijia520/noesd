<template>
    <div class="wf-memberInformation">
        <el-form label-width="100px" label-position="right">
            <el-form-item label="昵称">
                {{nickName}}
            </el-form-item>
            <el-form-item label="电话号码">
                {{phone}}
            </el-form-item>
            <el-form-item label="当前积分">
                {{points}}
                <el-button class="wf-margin-left" size="mini" @click="givePointShow">给积分</el-button>
                <el-button class="wf-margin-left" type="text" @click="pointRecord">操作记录</el-button>
            </el-form-item>
            <el-form-item label="获得积分">
                {{total_points}}
            </el-form-item>
            <div class="wf-gray-line"></div>
            <el-form-item label="储值卡余额">
                {{balance}}
                <el-button class="wf-margin-left" size="mini" @click="recharge">充值余额</el-button>
                <el-button class="wf-margin-left" type="text" @click="rechargeRecord">操作记录</el-button>
            </el-form-item>
            <el-form-item label="折扣卡">
                {{validity_name}} <span v-if="discount!==''&&discount!==null">— {{discount}}折</span>
            </el-form-item>
            <el-form-item label="会员等级">
                {{membership_level}}
                <el-button class="wf-margin-left" size="mini" @click="changeLevelShow">改等级</el-button>
                <el-button class="wf-margin-left" type="text" @click="levelRecord">操作记录</el-button>
            </el-form-item>
            <el-form-item label="真实姓名">
                {{identity_name}}
            </el-form-item>
            <el-form-item label="身份证号">
                {{identity_number}}
            </el-form-item>
            <div class="wf-gray-line"></div>
            <div class="wf-margin-top">
                <el-button size="mini" @click="cancel">返回</el-button>
                <!-- <el-button size="mini" type="primary">保存</el-button> -->
            </div>
        </el-form>
        <!-- *************************************弹框************************************** -->
        <el-dialog
        title="给积分"
        :visible.sync="givePoint_dialog"
        width="540px">
            <div class="wf-gray-box">
                给{{nickName}}<span v-if="phone!==''">（{{phone}}）</span>
                <el-radio-group v-model="point_radio" @change="changeRadio">
                    <el-radio :label="1">增加积分</el-radio>
                    <el-radio :label="0">扣除积分</el-radio>
                </el-radio-group>
            </div>
            <el-form class="wf-margin-top" label-width="100px" label-position="right">
                <el-form-item label="变动积分">
                    <el-input-number v-model="change_points" :precision="0" :controls="false" class="wf-dialog-input" size="mini"></el-input-number>
                    <p class="wf-gray-title">默认加积分</p>
                </el-form-item>
                <el-form-item label="变动说明">
                    <el-input v-model="remarks" class="wf-dialog-input" size="mini"></el-input>
                    <p class="wf-gray-title">显示给买家查看的</p>
                </el-form-item>
                <el-form-item label="备注说明">
                    <el-input v-model="change_explain" class="wf-dialog-input" size="mini"></el-input>
                    <p class="wf-gray-title">商家后台查看的备忘</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="givePoint_dialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="givePoint">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
        title="修改会员等级"
        :visible.sync="changeLevel_dialog"
        width="540px">
            <el-form class="wf-margin-top" label-width="100px" label-position="right">
                <el-form-item label="姓名">
                    {{nickName}}
                </el-form-item>
                <el-form-item label="等级名称">
                    <el-select class="wf-dialog-input" size="mini" v-model="change_level_id" @change="selectLevel">
                        <el-option
                        v-for="item in vipLevelOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="修改原因">
                    <el-input v-model="reason" class="wf-dialog-input" type="textarea" :autosize="{minRows:6,maxRows:6}"></el-input>
                </el-form-item>
                <el-form-item>
                    <p class="wf-gray-title">不填写则默认显示系统设置提示</p>
                    <p class="wf-gray-title" style="width:360px;">
                        例：尊敬的用户，【恭喜您的信誉良好/很抱歉您的行为违反了本店规则（
                        <span class="wf-red-title">中括号内显示升级/降级原因</span>
                        ）】，本店将您的等级由“钻石会员”升级/降级到了“白银会员”。
                    </p>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="changeLevel_dialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="changeLevel">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
        title="充值余额"
        :visible.sync="recharge_dialog"
        width="540px">
            <div class="wf-gray-box">
                {{nickName}}<span v-if="phone!==''">（{{phone}}）</span>
                <el-radio-group v-model="recharge_radio" @change="changeRecharge">
                    <el-radio :label="0">充值</el-radio>
                    <el-radio :label="1">扣减</el-radio>
                </el-radio-group>
            </div>
            <el-form class="wf-margin-top" label-width="100px" label-position="right">
                <el-form-item label="充值金额">
                    <el-input-number v-model="recharge_amount" :precision="2" :min="0.01" :controls="false" class="wf-dialog-input" size="mini"></el-input-number> 元
                    <p class="wf-gray-title">大于0，支持2位小数</p>
                </el-form-item>
                <el-form-item label="变动说明">
                    <el-input v-model="recharge_remarks" class="wf-dialog-input" size="mini"></el-input>
                    <p class="wf-gray-title">手动充值</p>
                </el-form-item>
                <el-form-item label="备注说明">
                    <el-input v-model="recharge_change_explain" class="wf-dialog-input" size="mini"></el-input>
                    <p class="wf-gray-title">商家后台查看的备忘</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="recharge_dialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="rechargeSave">确 定</el-button>
            </span>
        </el-dialog>
        <!-- <el-dialog
        title="提示"
        :visible.sync="prompt_dialog"
        width="30%"
        style="text-align:center;">
            <p>降级后，用户的等级名称及累积积分都将降到低等级</p>
            <p>但不对用户当前积分进行修改。</p>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="prompt_dialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="prompt_dialog = false">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import { memberListGivePoint, memberListChangeLevel } from "@/server/memberList.js"
import { rechargeSave } from "@/server/userList.js"
export default {
    name: "memberInformation",
    data() {
        return {
            discount: "", // 折扣
            identity_name: "", // 真实姓名
            identity_number: "", // 身份证号
            // 充值弹框数据
            recharge_dialog: false,
            recharge_radio: 0,
            recharge_amount: undefined,
            recharge_remarks: "",
            recharge_change_explain: "",
            // 页面变量
            nickName: "",
            phone: "",
            total_points: "",
            points: "",
            balance: "",
            validity_name: "",
            membership_level: "",
            // 弹框变量
            vipLevelData: "", // 存会员等级所有数据
            prompt_dialog: false, // 提示弹框
            old_level_id: "", // 原来的会员等级的等级
            change_level_id: "", // 修改会员等级的等级
            reason: "", // 修改原因
            changeLevel_dialog: false, // 修改会员等级弹框
            table_id: "", // 表id
            change_points: undefined, // 变动积分
            change_explain: "", // 备注说明
            remarks: "", // 变动说明
            point_radio: 1, // 增加或扣除积分单选框
            givePoint_dialog: false, // 给积分弹框
            vipLevelOptions: [],
            membership_level_id: "", // 会员等级
        }
    },
    mounted() {
        this.table_id = this.$route.query.id
        this.getData()
        this.getVipLevel()
    },
    methods: {
        rechargeSave(){
            if(this.recharge_amount===undefined){
                this.$message.warning("请填写充值金额")
            }else if(this.recharge_remarks===""){
                this.$message.warning("请填写变动说明")
            }else{
                let that = this
                let data = {
                    id: this.table_id,
                    type: this.recharge_radio,
                    change: this.recharge_amount,
                    remarks: this.recharge_remarks,
                    change_explain: this.recharge_change_explain,
                    pro_id: localStorage.getItem("proId")
                }
                rechargeSave(data).then((res)=>{
                    if(res.data.code===200){
                        that.$message.success("操作成功")
                        that.getData()
                        that.recharge_dialog = false
                    }else{
                        that.$message.error(res.data.msg+"600A0020");
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误600B0021');
                })
            }
        },
        changeRecharge(val){
            if(val===1){
                this.recharge_remarks = "扣减余额"
            }else{
                this.recharge_remarks = "手动充值"
            }
        },
        recharge(){
            this.recharge_radio = 0
            this.recharge_remarks = "手动充值"
            this.recharge_amount = undefined
            this.recharge_change_explain = ""
            this.recharge_dialog = true
        },
        changeRadio(val){
            if(val===0){
                this.remarks = "扣除积分"
            }else{
                this.remarks = "增加积分"
            }
        },
        selectLevel(e){
            let point = ""
            let oldPoint = ""
            this.vipLevelData.forEach(el => {
                if(el.id===e){
                    point = el.integral
                }
                if(el.id===this.old_level_id){
                    oldPoint = el.integral
                }
            });
            if(point>oldPoint){
                this.reason = "恭喜您的信誉良好"
            }else if(point<oldPoint){
                this.reason = "很抱歉您的行为违反了本店规则"
            }else{
                this.reason = ""
            }
        },
        changeLevel(){
            if(this.change_level_id===""){
                this.$message.warning("请选择等级名称")
            }else if(this.change_level_id===this.old_level_id){
                this.$message.warning("等级未改变，请重新编辑。")
            }else if(this.reason===""){
                this.$message.warning("请选填写修改原因")
            }else{
                let that = this
                let data = {
                    secret: localStorage.getItem('secretId'),
                    id: this.table_id,
                    membership_level_id: this.change_level_id,
                    // reason: this.reason
                }
                memberListChangeLevel(data).then((res)=>{
                    if(res.data.code===200){
                        that.$message.success("操作成功")
                        that.changeLevel_dialog = false
                        that.getData()
                        that.prompt_dialog = true
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        changeLevelShow(){
            this.table_id = this.$route.query.id
            this.change_level_id = this.membership_level_id
            this.old_level_id = this.membership_level_id
            this.reason = ""
            this.changeLevel_dialog = true
        },
        givePoint(){
            let that = this
            if(this.change_points===undefined){
                this.$message.warning("请填写变动积分")
            }else if(this.remarks===""){
                this.$message.warning("请填写变动说明")
            }else{
                let data = {
                    secret: localStorage.getItem('secretId'),
                    id: this.table_id,
                    points: this.change_points,
                    change_explain: this.change_explain,
                    remarks: this.remarks,
                    status: this.point_radio
                }
                memberListGivePoint(data).then((res)=>{
                    if(res.data.code===200){
                        that.$message.success("操作成功")
                        that.getData()
                        that.givePoint_dialog = false
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        givePointShow(){
            this.change_points = undefined
            this.change_explain = ""
            this.remarks = "增加积分"
            this.point_radio = 1
            this.table_id = this.$route.query.id
            this.givePoint_dialog = true
        },
        getVipLevel(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axios.post(this.url+'shopapi/member_card/memberindex',data
            ).then(res=>{
                if(res.data.code===200){
                    that.vipLevelData = res.data.data.data
                    res.data.data.data.forEach(el => {
                        that.vipLevelOptions.push({value:el.id,label:el.name})
                    });
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        getData(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: this.$route.query.id
            }
            this.$axios.post(this.url+'shopapi/member_card/memberInfo',data
            ).then(res=>{
                if(res.data.code===200){
                    that.nickName = res.data.data.nickName
                    that.phone = res.data.data.phone
                    that.total_points = res.data.data.total_points
                    that.points = res.data.data.points
                    that.balance = res.data.data.balance
                    that.validity_name = res.data.data.validity_name
                    that.membership_level = res.data.data.membership_level
                    that.membership_level_id = res.data.data.membership_level_id
                    that.discount = res.data.data.discount
                    that.identity_name = res.data.data.identity_name
                    that.identity_number = res.data.data.identity_number
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        cancel(){
            this.$router.push({path:"/wf/admin/shop/userList"})
        },
        rechargeRecord(){
            this.$router.push({path:"/wf/admin/shop/userList/memberInformation/rechargeRecord",query:{id:this.table_id}})
        },
        pointRecord(){
            this.$router.push({path:"/wf/admin/shop/userList/memberInformation/givePointRecord",query:{id:this.table_id}})
        },
        levelRecord(){
            this.$router.push({path:"/wf/admin/shop/userList/memberInformation/changeLevelRecord",query:{id:this.table_id}})
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-memberInformation{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    .wf-gray-line{
        width: 100%;
        height: 1px;
        background: #F0F0F0;
        margin-bottom: 10px;
    }
    .el-button--default{
        color: #669EFF;
        border: 1px solid #669EFF;
    }
    .el-button--primary{
        background: #719FF8;
    }
    .el-button--text{
        color: #719FF8;
    }
    .wf-margin-left{
        margin-left: 20px;
    }
    /deep/ .el-dialog{
        .el-dialog__header{
            border-bottom: 1px solid #F0F0F0;
        }
        .el-dialog__body{
            padding: 10px 20px;
        }
        .el-dialog__footer{
            text-align: center;
        }
    }
    .wf-gray-box{
        height:50px;
        background:#F8F8F8;
        border-radius:4px;
        line-height: 50px;
        padding-left: 20px;
    }
    /deep/ .el-radio{
        .el-radio__input.is-checked+.el-radio__label{
            color: #719FF8;
        }
        .el-radio__input.is-checked .el-radio__inner{
            background: #fff;
        }
        .el-radio__inner::after{
            width: 10px;
            height: 10px;
            background-color: #719FF8;
        }
    }
    .wf-margin-top{
        margin-top: 20px;
    }
    .wf-dialog-input{
        width: 360px;
    }
    .wf-gray-title{
        color: #999;
        font-size: 12px;
    }
    /deep/ .el-form-item__label{
        font-size: 16px;
    }
    /deep/ .el-input-number .el-input__inner{
        text-align: left;
    }
    .wf-red-title{
        color: #E36F6B;
        font-size: 12px;
    }
    /deep/ .el-form-item__content,/deep/ .el-form-item__label{
        line-height: 40px;
    }
}
</style>
