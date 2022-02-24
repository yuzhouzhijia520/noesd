<template>
    <div class="wf-membershipCard">
        <div class="wf-addSaveCard">
            <div class="wf-vip-card wf-vip-card-edit">
                <div
                class="wf-card wf-card-edit radius"
                :style="'background:'+cover+';color:'+addSaveCardData.word_cover">
                    <div class="clear">
                        <div class="card-left">
                            <div class="first-font h1">{{addSaveCardData.title!=""?addSaveCardData.title:"储值卡名称"}}</div>
                            <div>
                                首充
                                <span class="second-font">
                                    {{addSaveCardData.first_impulse_amount!=undefined?addSaveCardData.first_impulse_amount:"X"}}
                                </span>
                                送
                                <span class="second-font">
                                    {{addSaveCardData.give_amount!=undefined&&addSaveCardData.disableds.give_amount!=true?addSaveCardData.give_amount:"X"}}
                                </span>
                                元
                            </div>
                            <div>
                                送
                                <span class="second-font">
                                    {{cupon_money!=0&&addSaveCardData.disableds.gift_coupon_name!=true?cupon_money:"X"}}
                                </span>
                                元优惠券 
                                <span>
                                    · 送
                                    <span class="second-font">
                                        {{addSaveCardData.give_integral!=undefined&&addSaveCardData.disableds.give_integral!=true?addSaveCardData.give_integral:"X"}}
                                    </span>
                                    积分
                                </span>
                            </div>
                            <div class="h2">每次续充都得{{addSaveCardData.charge_multiplier!=undefined?addSaveCardData.charge_multiplier:"X"}}倍金额</div>
                        </div>
                        <div class="card-right">
                            <div>
                                <div>用卡须知</div>
                                <img :src="addSaveCardData.logo!=''?addSaveCardData.logo:'../../../../assets/admin_img/shop_admin_img/椭圆logo.png'" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-form
                label-position="right"
                :model="addSaveCardData"
                :rules="saveCardRules"
                ref="addSaveCardData"
                label-width="110px">
                <div class="spacing" style="color:#E36F6B;">最多添加10类会员卡</div>
                <el-form-item class="spacing label-left card-name-input" label="储值卡名称" prop="title">
                    <el-input v-model="addSaveCardData.title" maxlength="8">
                        <span slot="suffix">{{saveCard_name_number}}/8</span>
                    </el-input>
                </el-form-item>
                <el-form-item class="spacing card-logo-upload" label="LOGO" prop="logo">
                    <el-upload
                    class="avatar-uploader"
                    :action="upfileUrl"
                    :show-file-list="false"
                    :on-success="saveCardLogoSuccess"
                    :before-upload="beforeLogoUpload">
                        <img v-if="addSaveCardData.logo" :src="addSaveCardData.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="wf-font-info" style="margin:0;">建议尺寸140x140 px，不超过200kb，仅支持png格式</div>
                </el-form-item>
                <el-form-item class="spacing" label="文字颜色" prop="word_cover">
                    <el-color-picker v-model="addSaveCardData.word_cover"></el-color-picker>
                </el-form-item>
                <el-form-item class="spacing card-cover-select" label="卡封面" prop="cover_type">
                    <el-radio-group v-model="addSaveCardData.cover_type">
                        <el-radio :label="0">颜色</el-radio>
                        <el-radio :label="1">图片</el-radio>
                    </el-radio-group>
                    <div style="margin-top:20px;" v-if="addSaveCardData.cover_type===0"><el-color-picker v-model="addSaveCardData.card_cover_color"></el-color-picker></div>
                    <div style="margin-top:20px;" v-if="addSaveCardData.cover_type===1">
                        <el-upload
                        class="avatar-uploader"
                        :action="upfileUrl"
                        :show-file-list="false"
                        :on-success="saveCardSuccess"
                        :before-upload="beforeCardUpload">
                            <img v-if="addSaveCardData.card_cover_img" :src="addSaveCardData.card_cover_img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="wf-font-info" style="margin:0;">建议尺寸690x320 px，不超过1M</div>
                    </div>
                </el-form-item>
                <div class="wf-card-type radius margin-bottom">充值规则</div>
                <el-form-item class="spacing label-left card-input-number" label="充值面额" prop="first_impulse_amount">
                    充
                    <el-input-number style="margin-left:42px;" :controls="false" :precision="2" :min="0.01" v-model="addSaveCardData.first_impulse_amount"></el-input-number>
                    元
                    <div class="wf-font-info">金额大于0，支持2位小数</div>
                </el-form-item>
                <el-form-item class="spacing card-offer-inputNumber" label="首充优惠" prop="give_amount">
                    <el-checkbox-group v-model="addSaveCardData.checkList" @change="saveCardCheckbox">
                        <div>
                            <el-checkbox :label="0">
                                送
                                <el-input-number :disabled="addSaveCardData.disableds.give_amount" :controls="false" :precision="2" :min="0.01" v-model="addSaveCardData.give_amount"></el-input-number>
                                元余额
                            </el-checkbox>
                        </div>
                        <div class="wf-font-info">金额大于0，支持2位小数</div>
                        <div>
                            <el-checkbox :label="1">
                                送
                                <el-input-number :disabled="addSaveCardData.disableds.give_integral" :controls="false" :precision="0" :min="1" v-model="addSaveCardData.give_integral"></el-input-number>
                                积分
                            </el-checkbox>
                        </div>
                        <div class="wf-font-info">积分大于等于1，必须填写整数</div>
                        <div>
                            <el-checkbox :label="2">
                                送
                                <span v-if="addSaveCardData.cupon_choose===false">
                                    <el-button :disabled="addSaveCardData.disableds.gift_coupon" @click="openCuppon" icon="el-icon-plus">优惠券</el-button>
                                    优惠券
                                </span>
                                <span v-else>
                                    <el-input disabled v-model="addSaveCardData.gift_coupon"></el-input>
                                    <el-button :disabled="addSaveCardData.disableds.gift_coupon_name" class="edit-btn" type="text" @click="openCuppon">修改</el-button>
                                </span>
                            </el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item class="spacing label-left" label="续充金额倍数" prop="charge_multiplier">
                    <el-input-number style="width:300px;" :controls="false" :precision="1" :min="1" v-model="addSaveCardData.charge_multiplier"></el-input-number>
                    <div class="wf-font-info">续费充值获得金额倍数，例：系数为1.2，充100最后得到120。续充金额倍数大于等于1，支持1位小数</div>
                </el-form-item>
                <div class="wf-card-type radius margin-bottom">用卡须知</div>
                <el-form-item class="spacing label-left card-instructions" label="用卡须知" prop="notice">
                    <el-input type="textarea" :autosize="true" v-model="addSaveCardData.notice"></el-input>
                </el-form-item>
                <el-form-item class="spacing" label="状态" prop="state">
                    <el-select style="width:140px;" v-model="addSaveCardData.state" placeholder="请选择">
                        <el-option
                        v-for="item in SC_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="spacing" style="padding-top:10px;">
                    <el-button size="mini" class="wf-button-default" @click="jump">取 消</el-button>
                    <el-button size="mini" class="wf-button-primary" type="primary" @click="saveCardSave('addSaveCardData')">保存</el-button>
                </el-form-item>
            </el-form>
            <!-- ********************************************************************选择优惠券弹框********************************************************* -->
            <el-dialog
            width="61%"
            title="选择优惠券"
            :visible.sync="innerVisible"
            class="cupon-dialog">
                <div class="clear" style="margin-bottom:10px;">
                    <span style="float:left">
                        <el-button size="mini" class="wf-button-primary" type="primary" @click="addCupon">新建</el-button>
                        <el-button size="mini" class="wf-button-default" @click="getCuponTable(1)">刷新</el-button>
                    </span>
                    <span style="float:right">
                        <el-input style="width:300px;" v-model="cupon_search" placeholder="输入优惠券名称"></el-input>
                        <el-button size="mini" class="wf-button-primary" type="primary" @click="getCuponTable(1)">搜索</el-button>
                    </span>
                </div>
                <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" :mutiSelect="true" @currentChange="getCuponTable" @multipleSelection="handleSelectionChange"></my-table>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" class="wf-button-default" @click="innerVisible = false">取 消</el-button>
                    <el-button size="mini" class="wf-button-primary" type="primary" @click="cuponSave">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: "addSaveCard",
    data() {
        return {
            cupon_money: 0,
            cover: "#EDEDED",
            edit_saveCard_id: -1, // 编辑储值卡id
            currentPage: 1, // 优惠券当前页
            totalPage: 0, // 优惠券总条数
            tableData: [], // 优惠券表格数据
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            innerVisible: false, // 控制内层二级弹出框
            saveCard_name_number: 0, // 储值卡名称长度
            cupon_search: "", // 选择优惠券搜索表单
            SC_options: [ // 储值卡状态选择
                {
                    value: 1,
                    label: "有效"
                },
                {
                    value: 0,
                    label: "无效"
                }
            ],
            // 储值卡表单初始数据
            addSaveCardData: {
                secret: localStorage.getItem('secretId'), // 加密secretId
                logo: "", // logo上传图片
                word_cover: "#333", // 字体默认颜色
                title: "", // 储值卡名称
                cover_type: 0, // 卡封面类型默认
                card_cover_color: "#ededed", // 卡背景默认颜色
                card_cover_img: "", // 卡封面上传图片
                first_impulse_amount: undefined, // 充值金额默认为空
                checkList: [], // 选择框默认不选
                give_amount: undefined, // 赠送金额默认为空
                give_integral: undefined, // 赠送积分默认为空
                gift_coupon: "", // 赠送优惠券名称默认为空，保存优惠券名称
                give_coupon_ids: "", // 保存的优惠券id
                charge_multiplier: undefined, // 金额倍数默认为空
                cupon_choose: false, // 优惠券是否选择
                selectionChange: [], // 优惠券多选数据
                disableds: {
                    give_amount: true, // 赠送金额默认为禁止操作
                    give_integral: true, // 赠送积分默认为禁止操作
                    gift_coupon: true, // 赠送优惠券按钮默认为禁止操作
                    gift_coupon_name: false // 赠送优惠券修改按钮默认为可以操作
                },
                notice: "", // 用卡须知
                state: 1 // 状态默认为有效
            },
            // 储值卡表单校验
            saveCardRules: {
                title: [
                    { required: true, message: '储值卡名称不能为空', trigger: 'blur' }
                ],
                first_impulse_amount: [
                    { required: true, message: '充值面额不能为空', trigger: 'blur' }
                ],
                charge_multiplier: [
                    { required: true, message: '续充金额倍数不能为空', trigger: 'blur' }
                ],
                notice: [
                    { required: true, message: '用卡须知不能为空', trigger: 'blur' }
                ]
            },
            columns: [
                {   label: "优惠券名称",
                    align: "center",
                    prop: "coupon_name"
                },
                {
                    label: "有效期",
                    align: "center",
                    width: "340",
                    render: (h,param)=>{
                        let a
                        if(param.row.expire_type===0){
                            a = param.row.start_time + " — " + param.row.end_time
                        }else{
                            a = param.row.expire_time + "天"
                        }
                        return h('div', a);
                    }
                },
                {
                    label: "适用商品",
                    align: "center",
                    prop: "classify"
                },
                { 
                    label: "优惠内容",
                    align: "center",
                    render:function(h,param){
                        let a = "满" + param.row.subtraction_price + "减" + param.row.coupon_price
                        return [h('span', a)];
                    }
                },
                {
                    label: "库存",
                    align: "center",
                    prop: "coupon_num"
                }
            ]
        }
    },
    components: {
        MyTable
    },
    mounted() {
        if(this.$route.query.id){
            this.editSaveCard(this.$route.query.id)
        }
        this.getCuponTable(this.currentPage)
    },
    methods: {
        beforeLogoUpload(file){ // logo图上传前的校验格式和大小
            if(file.type!="image/png"){
                this.$message.warning("上传图片仅支持png格式")
                return false
            }else if(file.size/1024>200){
                this.$message.warning("上传图片大小不能超过200kb")
                return false
            }
        },
        saveCardLogoSuccess(res,file,fileList){ // 储值卡logo图上传成功
            this.$message.success("上传成功")
            this.addSaveCardData.logo = res.data.src
        },
        saveCardSuccess(res,file,fileList){ // 储值卡封面图片上传成功
            this.$message.success("上传成功")
            this.addSaveCardData.card_cover_img = res.data.src
        },
        beforeCardUpload(file){ // 卡封面上传前的校验格式和大小
            if(file.size/1024>1024){
                this.$message.warning("上传图片大小不能超过1M")
                return false
            }
        },
        saveCardCheckbox(e){ // 储值卡多选禁用判断
            if(e.indexOf(0)!=-1){ // 判断赠送余额
                this.addSaveCardData.disableds.give_amount = false
            }else{
                this.addSaveCardData.disableds.give_amount = true
            }
            if(e.indexOf(1)!=-1){ // 判断赠送积分
                this.addSaveCardData.disableds.give_integral = false
            }else{
                this.addSaveCardData.disableds.give_integral = true
            }
            if(e.indexOf(2)!=-1){ // 判断赠送优惠券
                this.addSaveCardData.disableds.gift_coupon = false
                if(this.addSaveCardData.cupon_choose===true){
                    this.addSaveCardData.disableds.gift_coupon_name = false
                }
            }else{
                this.addSaveCardData.disableds.gift_coupon = true
                if(this.addSaveCardData.cupon_choose===true){
                    this.addSaveCardData.disableds.gift_coupon_name = true
                }
            }
        },
        addCupon(){
            this.$router.push({path:'/wf/admin/shop/markting/coupon/addCoupon',name:'addCoupon'})
        },
        getCuponTable(currentPage){ // 获取优惠券列表
            this.currentPage = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: this.currentPage,
                coupon_name: this.cupon_search!==""?this.cupon_search:undefined,
                type: 2
            }
            this.$axios.post(this.url+'shopapi/member_card/choose',data
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data;
                    that.totalPage = res.data.count
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        openCuppon(){
            this.innerVisible = true
        },
        handleSelectionChange(e){ // 优惠券表格多选事件
            this.addSaveCardData.selectionChange = e
        },
        cuponSave(){ // 选择优惠券保存
            if(this.addSaveCardData.selectionChange.length===0){
                this.$message.warning("请选择优惠券")
            }else{
                let arr = []
                let id_arr = []
                this.addSaveCardData.selectionChange.forEach(el => {
                    arr.push(el.coupon_name)
                    id_arr.push(el.id)
                });
                this.addSaveCardData.gift_coupon = arr.join(",")
                this.addSaveCardData.give_coupon_ids = id_arr.join(",")
                this.addSaveCardData.cupon_choose = true
                this.innerVisible = false
            }
        },
        saveCardSave(ruleForm){ // 储值卡保存
            let that = this;
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    let data = JSON.parse(JSON.stringify(this.addSaveCardData))
                    // 删除多余属性
                    delete data.checkList
                    delete data.selectionChange
                    delete data.gift_coupon
                    delete data.cupon_choose
                    // 判断若文字颜色为null则传空
                    if(data.word_cover===null){
                        data.word_cover = ""
                    }
                    // 判断若为禁选，值就传空,若为undefined也传空
                    if(data.disableds.give_amount===true){
                        data.give_amount = ""
                    }else{ // 如果勾选了没有填，则验证
                        if(data.give_amount===undefined){
                            this.$message.warning("请输入赠送余额")
                            return false
                        }
                    }
                    if(data.disableds.give_integral===true){
                        data.give_integral = ""
                    }else{
                        if(data.give_integral===undefined){
                            this.$message.warning("请输入赠送积分")
                            return false
                        }
                    }
                    if(data.disableds.gift_coupon===true){
                        data.give_coupon_ids = ""
                    }else{
                        if(data.give_coupon_ids===""){
                            this.$message.warning("请选择赠送优惠券")
                            return false
                        }
                    }
                    delete data.disableds
                    // 判断卡封面文字和图片是否为空
                    if(data.cover_type===0){
                        delete data.card_cover_img
                        if(data.card_cover_color===null){
                            data.cover = "#EDEDED"
                        }else{
                            data.cover = data.card_cover_color
                        }
                        delete data.card_cover_color
                    }else if(data.cover_type===1){
                        delete data.card_cover_color
                        if(data.card_cover_img===null){
                            data.cover = ""
                        }else{
                            data.cover = data.card_cover_img
                        }
                        delete data.card_cover_img
                    }

                    if(that.edit_saveCard_id===-1){
                        that.$axios.post(that.url + 'shopapi/member_card/store',data)
                        .then(function (res) {
                            if(res.data.code===200){
                                that.$router.push({path:"/wf/admin/shop/markting/memberMenu"})
                                that.$message.success("添加成功");
                            }else{
                                that.$message.error(res.data.msg);
                            }
                        })
                        .catch(function (error) {
                            that.$message.error('请联系管理员');
                        });
                    }else{
                        data.id = that.edit_saveCard_id
                        that.$axios.post(that.url + 'shopapi/member_card/edit',data)
                        .then(function (res) {
                            if(res.data.code===200){
                                that.$router.push({path:"/wf/admin/shop/markting/memberMenu"})
                                that.$message.success("保存成功");
                                that.edit_saveCard_id = -1
                            }else{
                                that.$message.error(res.data.msg);
                            }
                        })
                        .catch(function (error) {
                            that.$message.error('请联系管理员');
                        });
                    }
                }else{
                    return false;
                }
            });
        },
        editSaveCard(id){ // 编辑储值卡数据回填
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id
            }
            this.$axios.post(this.url+'shopapi/member_card/editlist',data
            ).then(res=>{
                if(res.data.code===200){
                    that.edit_saveCard_id = id
                    that.addSaveCardData.logo = res.data.data.logo // logo图
                    that.addSaveCardData.word_cover = res.data.data.word_cover // 字体颜色
                    that.addSaveCardData.title = res.data.data.title // 储值卡名称
                    that.addSaveCardData.cover_type = res.data.data.cover_type // 卡封面类型
                    if(res.data.data.cover_type===0){
                        that.addSaveCardData.card_cover_color = res.data.data.cover // 卡封面为背景颜色时
                    }else if(res.data.data.cover_type===1){
                        that.addSaveCardData.card_cover_img = res.data.data.cover // 卡封面为背景图片时
                    }
                    that.addSaveCardData.first_impulse_amount = res.data.data.first_impulse_amount // 充值金额
                    if(res.data.data.give_amount!="0.00"){
                        that.addSaveCardData.checkList.push(0)
                        that.addSaveCardData.disableds.give_amount = false
                        that.addSaveCardData.give_amount = res.data.data.give_amount // 赠送金额
                    }else{
                        that.addSaveCardData.give_amount = undefined // 赠送金额
                    }
                    if(res.data.data.give_integral!="0.00"){
                        that.addSaveCardData.checkList.push(1)
                        that.addSaveCardData.disableds.give_integral = false
                        that.addSaveCardData.give_integral = res.data.data.give_integral // 赠送积分
                    }else{
                        that.addSaveCardData.give_integral = undefined // 赠送积分
                    }
                    if(res.data.data.give_coupon_ids!=""){
                        that.addSaveCardData.checkList.push(2)
                        that.addSaveCardData.give_coupon_ids = res.data.data.give_coupon_ids.join(",") // 赠送优惠券id
                        let give_coupon_name = []
                        res.data.data.give_coupon_name.forEach(el => {
                            give_coupon_name.push(el.coupon_name)
                        });
                        that.addSaveCardData.gift_coupon =  give_coupon_name.join(",")// 赠送优惠券名称
                        that.addSaveCardData.cupon_choose = true
                        that.addSaveCardData.disableds.gift_coupon = false
                    }
                    that.addSaveCardData.charge_multiplier = res.data.data.charge_multiplier // 金额倍数
                    that.addSaveCardData.notice = res.data.data.notice // 用卡须知
                    that.addSaveCardData.state = res.data.data.state // 状态
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        jump(){
            this.$router.push({path:"/wf/admin/shop/markting/memberMenu"})
        }
    },
    computed: {
    　　cardTitle() {
    　　　　return this.addSaveCardData.title
    　　}
    },
    watch: {
        cardTitle: {
            handler(val,oldVal){
                this.saveCard_name_number = val.length
            }
        },
        addSaveCardData: {
            handler(val,oldVal){
                if(val.cover_type===1){
                    this.cover = "url(" + val.card_cover_img + ")"
                }else{
                    if(val.card_cover_color===null){
                        this.cover = "#EDEDED"
                        this.addSaveCardData.card_cover_color = "#EDEDED"
                    }else{
                        this.cover = val.card_cover_color
                    }
                }
                if(val.give_coupon_ids!=""){
                    let a = 0
                    for(var i=0;i<val.give_coupon_ids.split(",").length;i++){
                        for(var j=0;j<this.tableData.length;j++){
                            if(parseInt(val.give_coupon_ids.split(",")[i])===this.tableData[j].id){
                                a += parseInt(this.tableData[j].subtraction_price)
                            }
                        }
                    }
                    this.cupon_money = a
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/membership_card/membershipCard.scss'
</style>