<template>
    <div class="wf-memberList">
        <el-row>
            <span class="wf-span-box">
                <span>手机号</span>
                <el-input-number size="mini" class="wf-input-width" v-model="phone" :controls="false" :precision="0" :min="0" placeholder="输入您要搜索的手机号码" @keyup.enter.native="getList(1)"></el-input-number>
            </span>
            <span class="wf-span-box">
                <span>昵称</span>
                <el-input size="mini" class="wf-input-width" v-model="name" placeholder="输入您要搜索的用户昵称" @keyup.enter.native="getList(1)"></el-input>
            </span>
            <span class="wf-span-box wf-span-price" v-if="pointShow">
                <span>当前积分</span>
                <el-input-number v-model="start_points" @keyup.enter.native="getList(1)" :controls="false" :precision="2" :min="0" class="wf-input-width" size="mini"></el-input-number>
                <span class="wf-center-text">至</span><el-input-number v-model="end_points" @keyup.enter.native="getList(1)" :controls="false" :precision="2" :min="0" class="wf-input-width" size="mini"></el-input-number>
            </span>
        </el-row>
        <el-row>
            <span class="wf-span-box" v-if="cardShow">
                <span>折扣卡</span>
                <el-select v-model="discount_card" class="wf-input-width" placeholder="请选择" size="mini">
                    <el-option
                    v-for="item in discountCardOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span class="wf-span-box" v-if="levelShow">
                <span>会员等级</span>
                <el-select v-model="vip_level" class="wf-input-width" placeholder="请选择" size="mini">
                    <el-option
                    v-for="item in vipLevelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span class="wf-span-box wf-span-price" v-if="cardShow">
                <span>储值卡余额</span>
                <el-input-number v-model="start_balance" @keyup.enter.native="getList(1)" :controls="false" :precision="2" :min="0" class="wf-input-width" size="mini"></el-input-number>
                <span class="wf-center-text">至</span><el-input-number v-model="end_balance" @keyup.enter.native="getList(1)" :controls="false" :precision="2" :min="0" class="wf-input-width" size="mini"></el-input-number>
            </span>
            <span class="wf-span-btn">
                <el-button size="mini" type="primary" @click="getList(1)" :loading="loading">搜索</el-button>
            </span>
        </el-row>
        <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" @currentChange="getList"></my-table>
        <el-dialog
        title="充值余额"
        :visible.sync="recharge_dialog"
        width="540px">
            <div class="wf-gray-box">
                {{member_name}}<span v-if="member_phone!=''">（{{member_phone}}）</span>
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
        <el-dialog
        title="给积分"
        :visible.sync="givePoint_dialog"
        width="540px">
            <div class="wf-gray-box">
                {{member_name}}<span v-if="member_phone!=''">（{{member_phone}}）</span>
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
                    {{member_name}}
                </el-form-item>
                <el-form-item label="等级名称">
                    <el-select class="wf-dialog-input" size="mini" v-model="change_level_id" @change="selectLevel">
                        <el-option
                        v-for="item in vipLevelOptions2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="修改原因">
                    <el-input v-model="reason" class="wf-dialog-input" type="textarea" :autosize="{minRows:6,maxRows:6}"></el-input>
                </el-form-item> -->
                <!-- <el-form-item>
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
import { getUserList, rechargeSave, getModularSwitch } from "@/server/userList.js"
import MyTable from "@/commonComponents/table/table.vue";
import { dateFormat } from '@/untils/common.js';
export default {
    name: "memberList",
    data() {
        return {
            //控制是否显示筛选条件
            cardShow: false,
            pointShow: false,
            levelShow: false,
            // 充值弹框数据
            recharge_dialog: false,
            recharge_radio: 0,
            recharge_amount: undefined,
            recharge_remarks: "",
            recharge_change_explain: "",
            // 充值弹框数据
            vip_level: "",
            discount_card: "",
            start_points: undefined, // 起始积分
            end_points: undefined, // 结束积分
            start_balance: undefined, // 起始余额
            end_balance: undefined, // 结束余额
            loading:false,
            prompt_dialog: false, // 提示弹框
            old_level_id: "", // 原来的会员等级的等级
            change_level_id: "", // 修改会员等级的等级
            reason: "", // 修改原因
            member_name: "", // 修改会员等级姓名
            member_phone:'',
            changeLevel_dialog: false, // 修改会员等级弹框
            table_id: "", // 表id
            change_points: undefined, // 变动积分
            change_explain: "", // 备注说明
            remarks: "", // 变动说明
            point_radio: 1, // 增加或扣除积分单选框
            givePoint_dialog: false, // 给积分弹框
            membership_level_id: "", // 会员等级
            vipLevelData: "", // 存会员等级所有数据
            vipLevelOptions: [{value:"",label:"全部"}],
            vipLevelOptions2: [],
            discountCardOptions: [{value:"",label:"全部"}],
            phone: undefined,
            name: "",
            currentPage: 1, // 优惠券当前页
            totalPage: 0, // 优惠券总条数
            tableData: [], // 优惠券表格数据
            columns: []
        }
    },
    components: {
        MyTable
    },
    mounted() {
        this.getModularSwitch()
        this.getList(1)
        this.getDiscountCard()
        this.getVipLevel()
    },
    methods: {
        getModularSwitch(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                pro_id: localStorage.getItem("proId")
            }
            getModularSwitch(data).then((res)=>{
                if(res.data.code===200){
                    res.data.data.filter(row=>{
                        if(row===7){
                            that.cardShow = true
                        }
                        if(row===29){
                            that.pointShow = true
                        }
                        if(row===34){
                            that.levelShow = true
                        }
                    })
                }else{
                    that.$message.error(res.data.msg+"600A0022");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0023');
            })
        },
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
                        that.getList(that.currentPage)
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
        recharge(id,phone,name){
            this.table_id = id
            this.member_phone = phone
            this.member_name = name
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
                        that.getList(that.currentPage)
                        that.changeLevel_dialog = false
                        that.prompt_dialog = true
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        changeLevelShow(id, name, levelId){
            this.table_id = id
            this.change_level_id = levelId
            this.old_level_id = levelId
            this.member_name = name
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
                        that.givePoint_dialog = false
                        that.getList(that.currentPage)
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        givePointShow(id,phone,name){
            this.member_phone = phone
            this.member_name = name
            this.change_points = undefined
            this.change_explain = ""
            this.remarks = "增加积分"
            this.point_radio = 1
            this.table_id = id
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
                        that.vipLevelOptions.push({value:el.integral,label:el.name})
                        that.vipLevelOptions2.push({value:el.id,label:el.name})
                    });
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        getDiscountCard(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axios.post(this.url+'shopapi/member_card/disindex',data
            ).then(res=>{
                if(res.data.code===200){
                    res.data.data.forEach(el => {
                        that.discountCardOptions.push({value:el.id,label:el.title})
                    });
                    
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        getList(currentPage){
            this.currentPage = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: this.currentPage,
                name: this.name,
                limit: 10,
                start_points: this.start_points,
                end_points: this.end_points,
                start_balance: this.start_balance,
                end_balance: this.end_balance
            }
            if(this.phone!=undefined){
                data.phone = parseInt(this.phone)
            }
            if(this.vip_level!==""){
                data.integral = this.vip_level
            }
            if(this.discount_card!==""){
                data.card_id = this.discount_card
            }
            this.loading = true;
            getUserList(data).then((res)=>{
                that.loading = false
                if(res.data.code===200){
                    that.tableData = res.data.data.data;
                    that.totalPage = res.data.data.total
                    that.columns = [
                        {   label: "手机号",
                            align: "center",
                            prop: "phone"
                        },
                        {
                            label: "头像",
                            align: "center",
                            render: (h, param)=>{
                                if(param.row.avatarUrl!=""){
                                    let img = [
                                        h('img', {
                                            attrs: {
                                                src: param.row.avatarUrl,
                                                preview: param.row.id,
                                                style: 'width:44px;height:44px;'
                                            }
                                        })
                                    ];
                                    return h('div', img);
                                }
                            }
                        },
                        {
                            label: "昵称",
                            align: "center",
                            prop: "nickName"
                        }
                    ]
                    if(that.pointShow===true){
                        that.columns.push(
                            { 
                                label: "当前积分",
                                align: "center",
                                render: (h, param)=>{
                                    return [h('el-button', {
                                        props: {
                                            type: "text"
                                        },
                                        attrs: {
                                            style: "color:#719FF8"
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({path:"/wf/admin/shop/userList/pointsDetails",query:{id:param.row.id,phone:param.row.phone,nickName:param.row.nickName}})
                                            }
                                        }
                                    }, param.row.points)];
                                }
                            }
                        )
                    }
                    if(that.cardShow===true){
                        that.columns.push(
                            {
                                label: "储值卡余额（元）",
                                align: "center",
                                render: (h, param)=> {
                                    let a = [
                                            h('el-button', {
                                                props: {
                                                    type: "text"
                                                },
                                                attrs: {
                                                    style: "color:#719FF8"
                                                },
                                                on: {
                                                    click: () => {
                                                        this.$router.push({path:"/wf/admin/shop/userList/accountDetails",query:{id:param.row.id,phone:param.row.phone,nickName:param.row.nickName}})
                                                    }
                                                }
                                            }, param.row.balance)
                                        ];
                                    return h('div', a);
                                }
                            },
                            { 
                                label: "折扣卡",
                                align: "center",
                                render: (h, param)=> {
                                    let title = param.row.title
                                    let discount = param.row.discount==='-'?'':param.row.discount
                                    let a = title+"-"+discount
                                    return h('span', a);
                                }
                            }
                        )
                    }
                    that.columns.push(
                        { 
                            label: "优惠券数量",
                            align: "center",
                            prop: "coupon_num"
                        },
                        { 
                            label: "订单数",
                            align: "center",
                            render: (h, param)=> {
                                let a = [
                                    h('el-button', {
                                        props: {
                                            type: "text"
                                        },
                                        attrs: {
                                            style: "color:#719FF8"
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({path:"/wf/admin/shop/order",query:{phone:param.row.phone}})
                                            }
                                        }
                                    }, param.row.order_num)
                                ];
                                return h('div', a);
                            }
                        },
                        { 
                            label: "会员等级",
                            align: "center",
                            prop: "level"
                        },
                        {
                            label: "注册时间",
                            align: "center",
                            width: "180",
                            render: (h, param)=> {
                                return h('span',dateFormat(param.row.create_time))
                            }
                        },
                        {
                            label: "操作",
                            align: "center",
                            width: 280,
                            render: (h, param)=> {
                                let a = [
                                    h('el-button', {
                                        props: {
                                            type: "text"
                                        },
                                        attrs: {
                                            style: "color:#719FF8"
                                        },
                                        on: {
                                            click: () => {
                                                this.recharge(param.row.id,param.row.phone,param.row.nickName)
                                            }
                                        }
                                    }, "充值余额"),
                                    h('el-button', {
                                        props: {
                                            type: "text"
                                        },
                                        attrs: {
                                            style: "color:#719FF8"
                                        },
                                        on: {
                                            click: () => {
                                                this.givePointShow(param.row.id,param.row.phone,param.row.nickName)
                                            }
                                        }
                                    }, "给积分"),
                                    h('el-button', {
                                        props: {
                                            type: "text"
                                        },
                                        attrs: {
                                            style: "color:#719FF8"
                                        },
                                        on: {
                                            click: () => {
                                                this.changeLevelShow(param.row.id, param.row.nickName, param.row.membership_level_id)
                                            }
                                        }
                                    }, "改等级"),
                                    h('el-button', {
                                        props: {
                                            type: "text"
                                        },
                                        attrs: {
                                            style: "color:#719FF8"
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({path:"/wf/admin/shop/userList/memberInformation",query:{id:param.row.id}})
                                            }
                                        }
                                    }, "会员信息")
                                ];
                                return h('div', a);
                            }
                        }
                    )
                }else{
                    that.$message.error(res.data.msg+"600A0024");
                }
            }).catch(err=>{
                that.loading = false
                that.$message.error('网络错误600B0025');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-memberList{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    .wf-input-width,.wf-select-width,.wf-number-width{
        width: 140px;
        margin-right: 10px;
    }
    .el-button--primary{
        background: #719FF8;
    }
    /deep/ .wf_pagination{
        text-align: center;
        margin: 30px 0;
    }
    /deep/ .el-table{
        margin-top: 20px;
    }
    .wf-clear{
        clear: both;
        overflow: hidden;
    }
    .wf-clear>div{
        float: left;
    }
    .wf-input-line-height{
        line-height: 44px;
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
    .wf-input-width{
        width: 140px;
        margin-left: 10px;
    }
    .wf-span-box{
        text-align: right;
        display: inline-block;
        width: 260px;
        margin-bottom: 20px;
    }
    .wf-span-box.wf-span-price{
        width: 460px;
    }
    .wf-span-box.wf-span-btn{
        width: 184px;
    }
    .wf-center-text{
        margin: 0 10px;
    }
}
</style>