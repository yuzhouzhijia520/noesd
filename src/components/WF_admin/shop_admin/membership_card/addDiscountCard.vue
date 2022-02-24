<template>
    <div class="wf-membershipCard">
        <div class="wf-addDiscountCard">
            <div class="wf-vip-card wf-vip-card-edit">
                <div class="wf-card wf-card-edit radius" :style="'background:'+cover+';color:'+addDiscountCardData.word_cover">
                    <div class="clear">
                        <div class="card-left">
                            <div class="first-font h1">{{addDiscountCardData.title!=""?addDiscountCardData.title:"折扣卡名称"}}</div>
                            <div>
                                <span class="second-font">
                                    ￥{{addDiscountCardData.price!=undefined?addDiscountCardData.price:"X"}}
                                    /{{cardDate}}
                                </span>
                            </div>
                            <div>
                                折扣
                                <span class="second-font">
                                    {{addDiscountCardData.discount!=undefined?addDiscountCardData.discount:"X"}}
                                </span>
                                折 
                                <span>
                                · 积分
                                    <span class="second-font">
                                        {{addDiscountCardData.integral_multiple!=undefined?addDiscountCardData.integral_multiple:"X"}}
                                    </span>
                                    倍
                                </span>
                            </div>
                            <div class="h2">办卡赠送{{addDiscountCardData.give_integral!=undefined&&addDiscountCardData.disableds.give_integral!=true?addDiscountCardData.give_integral:"X"}}积分</div>
                        </div>
                        <div class="card-right">
                            <div>
                                <div>用卡须知</div>
                                <img :src="addDiscountCardData.logo!=''?addDiscountCardData.logo:'../../../../assets/admin_img/shop_admin_img/椭圆logo.png'" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-form
                label-position="right"
                :model="addDiscountCardData"
                :rules="discountCardRules"
                ref="addDiscountCardData"
                label-width="110px">
                <div class="spacing" style="color:#E36F6B;">最多添加10类会员卡</div>
                <el-form-item class="spacing label-left card-name-input" label="折扣卡名称" prop="title">
                    <el-input v-model="addDiscountCardData.title" maxlength="8">
                        <span slot="suffix">{{discountCard_name_number}}/8</span>
                    </el-input>
                </el-form-item>
                <el-form-item class="spacing card-logo-upload" label="LOGO" prop="logo">
                    <el-upload
                    class="avatar-uploader"
                    :action="upfileUrl"
                    :show-file-list="false"
                    :on-success="discountCardLogoSuccess"
                    :before-upload="beforeLogoUpload">
                        <img v-if="addDiscountCardData.logo" :src="addDiscountCardData.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="wf-font-info" style="margin:0;">建议尺寸140x140 px，不超过200kb，仅支持png格式</div>
                </el-form-item>
                <el-form-item class="spacing" label="文字颜色" prop="word_cover">
                    <el-color-picker v-model="addDiscountCardData.word_cover"></el-color-picker>
                </el-form-item>
                <el-form-item class="spacing card-cover-select" label="卡封面" prop="cover_type">
                    <el-radio-group v-model="addDiscountCardData.cover_type">
                        <el-radio :label="0">颜色</el-radio>
                        <el-radio :label="1">图片</el-radio>
                    </el-radio-group>
                    <div style="margin-top:20px;" v-if="addDiscountCardData.cover_type===0"><el-color-picker v-model="addDiscountCardData.card_cover_color"></el-color-picker></div>
                    <div style="margin-top:20px;" v-if="addDiscountCardData.cover_type===1">
                        <el-upload
                        class="avatar-uploader"
                        :action="upfileUrl"
                        :show-file-list="false"
                        :on-success="discountCardSuccess"
                        :before-upload="beforeCardUpload">
                            <img v-if="addDiscountCardData.card_cover_img" :src="addDiscountCardData.card_cover_img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="wf-font-info" style="margin:0;">建议尺寸690x320 px，不超过1M</div>
                    </div>
                </el-form-item>
                <div class="wf-card-type radius margin-bottom">充值规则</div>
                <el-form-item class="spacing label-left" label="价格" prop="price">
                    <el-input-number style="width:140px;" :controls="false" :precision="2" :min="0.01" v-model="addDiscountCardData.price"></el-input-number>
                    <el-select style="width:140px;margin-left:18px;" v-model="addDiscountCardData.price_type" placeholder="请选择">
                        <el-option
                        v-for="item in dateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="wf-font-info">金额大于0，支持2位小数</div>
                </el-form-item>
                <el-form-item class="spacing" label="积分倍数" prop="integral_multiple">
                    <el-input-number style="width:300px;" :controls="false" :precision="1" :min="1" :max="100" v-model="addDiscountCardData.integral_multiple"></el-input-number>
                    <div class="wf-font-info">得到的积分是普通用户的几倍（1-100之间）</div>
                </el-form-item>
                <el-form-item class="spacing label-left" label="折扣" prop="discount">
                    <el-input-number style="width:300px;" :controls="false" :precision="1" :min="1" :max="10" v-model="addDiscountCardData.discount"></el-input-number>
                    <div class="wf-font-info">0-10之间，比如8.8表示88折（10为无折扣）</div>
                </el-form-item>
                <el-form-item class="spacing card-offer-inputNumber" label="首充优惠" prop="give_amount">
                    <el-checkbox-group v-model="addDiscountCardData.checkList" @change="discountCardCheckbox">
                        <div>
                            <el-checkbox :label="1">
                                送
                                <el-input-number :disabled="addDiscountCardData.disableds.give_integral" :controls="false" :precision="0" :min="1" v-model="addDiscountCardData.give_integral"></el-input-number>
                                积分
                            </el-checkbox>
                        </div>
                        <div class="wf-font-info">积分大于等于1，必须填写整数</div>
                        <div>
                            <el-checkbox :label="2">
                                送
                                <span v-if="addDiscountCardData.cupon_choose===false">
                                    <el-button :disabled="addDiscountCardData.disableds.gift_coupon" @click="getCuponTable(1)" icon="el-icon-plus">优惠券</el-button>
                                    优惠券
                                </span>
                                <span v-else>
                                    <el-input disabled v-model="addDiscountCardData.gift_coupon"></el-input>
                                    <el-button :disabled="addDiscountCardData.disableds.gift_coupon_name" class="edit-btn" type="text" @click="getCuponTable(1)">修改</el-button>
                                </span>
                            </el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
                <div class="wf-card-type radius margin-bottom">用卡须知</div>
                <el-form-item class="spacing label-left card-instructions" label="用卡须知" prop="notice">
                    <el-input type="textarea" :autosize="true" v-model="addDiscountCardData.notice"></el-input>
                </el-form-item>
                <el-form-item class="spacing" label="状态" prop="state">
                    <el-select style="width:140px;" v-model="addDiscountCardData.state" placeholder="请选择">
                        <el-option
                        v-for="item in DC_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="spacing" style="padding-top:10px;">
                    <el-button size="mini" class="wf-button-default" @click="jump">取 消</el-button>
                    <el-button size="mini" class="wf-button-primary" type="primary" @click="discountCardSave('addDiscountCardData')">保存</el-button>
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
    name: "membershipCard",
    data() {
        return {
            cover: "#EDEDED",
            cardDate: "月",
            edit_discountCard_id: -1, // 编辑折扣卡id
            currentPage: 1, // 优惠券当前页
            totalPage: 0, // 优惠券总条数
            tableData: [], // 优惠券表格数据
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            innerVisible: false, // 控制内层二级弹出框
            discountCard_name_number: 0, // 折扣卡名称长度
            cupon_search: "", // 选择优惠券搜索表单
            DC_options: [ // 折扣卡状态选择
                {
                    value: 1,
                    label: "有效"
                },
                {
                    value: 0,
                    label: "无效"
                }
            ],
            dateOptions: [ // 日期选择
                {
                    value: 0,
                    label: "月（30天）"
                },
                {
                    value: 1,
                    label: "季（90天）"
                },
                {
                    value: 2,
                    label: "半年（180天）"
                },
                {
                    value: 3,
                    label: "年（365天）"
                }
            ],
            // 折扣卡表单初始数据
            addDiscountCardData: {
                secret: localStorage.getItem('secretId'), // 加密secretId
                logo: "", // logo上传图片
                word_cover: "#333", // 字体默认颜色
                title: "", // 折扣卡名称
                cover_type: 0, // 卡封面类型默认为不选
                card_cover_color: "#ededed", // 卡背景默认颜色
                card_cover_img: "", // 卡封面上传图片
                checkList: [], // 选择框默认不选
                give_integral: undefined, // 赠送积分默认为空
                gift_coupon: "", // 赠送优惠券默认为空
                price: undefined, // 折扣卡价格
                integral_multiple: undefined, // 积分倍数默认为空
                discount: undefined, // 折扣数
                cupon_choose: false, // 优惠券是否选择
                selectionChange: [], // 优惠券多选数据
                give_coupon_ids: "", // 保存的优惠券id
                disableds: {
                    give_integral: true, // 赠送积分默认为禁止操作
                    gift_coupon: true, // 赠送优惠券默认为禁止操作
                    gift_coupon_name: false // 赠送优惠券修改按钮默认为可以操作
                },
                price_type: 0, // 选择器默认为月
                notice: "", // 用卡须知
                state: 1 // 状态
            },
            // 折扣卡表单校验
            discountCardRules: {
                title: [
                    { required: true, message: '折扣卡名称不能为空', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '价格不能为空', trigger: 'blur' }
                ],
                discount: [
                    { required: true, message: '折扣不能为空', trigger: 'blur' }
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
            this.editDiscountCard(this.$route.query.id)
        }
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
        discountCardLogoSuccess(res,file,fileList){ // 折扣卡logo图上传成功
            this.$message.success("上传成功")
            this.addDiscountCardData.logo = res.data.src
        },
        discountCardSuccess(res,file,fileList){ // 折扣卡封面图片上传成功
            this.$message.success("上传成功")
            this.addDiscountCardData.card_cover_img = res.data.src
        },
        beforeCardUpload(file){ // 卡封面上传前的校验格式和大小
            if(file.size/1024>1024){
                this.$message.warning("上传图片大小不能超过1M")
                return false
            }
        },
        discountCardCheckbox(e){ // 折扣卡多选禁用判断
            if(e.indexOf(1)!=-1){ // 判断赠送积分
                this.addDiscountCardData.disableds.give_integral = false
            }else{
                this.addDiscountCardData.disableds.give_integral = true
            }
            if(e.indexOf(2)!=-1){ // 判断赠送优惠券
                this.addDiscountCardData.disableds.gift_coupon = false
                if(this.addDiscountCardData.cupon_choose===true){
                    this.addDiscountCardData.disableds.gift_coupon_name = false
                }
            }else{
                this.addDiscountCardData.disableds.gift_coupon = true
                if(this.addDiscountCardData.cupon_choose===true){
                    this.addDiscountCardData.disableds.gift_coupon_name = true
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
                page: currentPage,
                coupon_name: this.cupon_search,
                type: 2
            }
            this.innerVisible = true
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
        handleSelectionChange(e){ // 优惠券表格多选事件
            this.addDiscountCardData.selectionChange = e
        },
        cuponSave(){ // 选择优惠券保存
            if(this.addDiscountCardData.selectionChange.length===0){
                this.$message.warning("请选择优惠券")
            }else{
                let arr = []
                let id_arr = []
                this.addDiscountCardData.selectionChange.forEach(el => {
                    arr.push(el.coupon_name)
                    id_arr.push(el.id)
                });
                this.addDiscountCardData.gift_coupon = arr.join(",")
                this.addDiscountCardData.give_coupon_ids = id_arr.join(",")
                this.addDiscountCardData.cupon_choose = true
                this.innerVisible = false
            }
        },
        discountCardSave(ruleForm){ // 折扣卡保存
            let that = this;
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    let data = JSON.parse(JSON.stringify(this.addDiscountCardData))
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

                    if(that.edit_discountCard_id===-1){
                        that.$axios.post(that.url + 'shopapi/member_card/discount',data)
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
                        data.id = that.edit_discountCard_id
                        that.$axios.post(that.url + 'shopapi/member_card/disedit',data)
                        .then(function (res) {
                            if(res.data.code===200){
                                that.$router.push({path:"/wf/admin/shop/markting/memberMenu"})
                                that.$message.success("添加成功");
                                that.edit_discountCard_id = -1
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
        editDiscountCard(id){ // 编辑折扣卡数据回填
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id
            }
            this.$axios.post(this.url+'shopapi/member_card/dislist',data
            ).then(res=>{
                if(res.data.code===200){
                    that.edit_discountCard_id = id
                    that.addDiscountCardData.logo = res.data.data.logo // logo图
                    that.addDiscountCardData.word_cover = res.data.data.word_cover // 字体颜色
                    that.addDiscountCardData.title = res.data.data.title // 储值卡名称
                    that.addDiscountCardData.cover_type = res.data.data.cover_type // 卡封面类型
                    if(res.data.data.cover_type===0){
                        that.addDiscountCardData.card_cover_color = res.data.data.cover // 卡封面为背景颜色时
                    }else if(res.data.data.cover_type===1){
                        that.addDiscountCardData.card_cover_img = res.data.data.cover // 卡封面为背景图片时
                    }
                    if(res.data.data.give_integral!="0.00"){
                        that.addDiscountCardData.checkList.push(1)
                        that.addDiscountCardData.disableds.give_integral = false
                        that.addDiscountCardData.give_integral = res.data.data.give_integral // 赠送积分
                    }else{
                        that.addDiscountCardData.give_integral = undefined // 赠送积分
                    }
                    if(res.data.data.give_coupon_ids!=""){
                        that.addDiscountCardData.checkList.push(2)
                        that.addDiscountCardData.give_coupon_ids = res.data.data.give_coupon_ids.join(",") // 赠送优惠券id
                        let give_coupon_name = []
                        res.data.data.give_coupon_name.forEach(el => {
                            give_coupon_name.push(el.coupon_name)
                        });
                        that.addDiscountCardData.gift_coupon =  give_coupon_name.join(",")// 赠送优惠券名称
                        that.addDiscountCardData.cupon_choose = true
                    }
                    // 积分倍数
                    if(res.data.data.integral_multiple!="0"){
                        that.addDiscountCardData.integral_multiple = res.data.data.integral_multiple
                    }else{
                        that.addDiscountCardData.integral_multiple = undefined
                    }
                    // 折扣数
                    if(res.data.data.discount!="0.0"){
                        that.addDiscountCardData.discount = res.data.data.discount
                    }else{
                        that.addDiscountCardData.discount = undefined
                    }
                    // 折扣卡价格
                    if(res.data.data.price!="0.00"){
                        that.addDiscountCardData.price = res.data.data.price
                    }else{
                        that.addDiscountCardData.price = undefined
                    }
                    that.addDiscountCardData.price_type = res.data.data.price_type // 选择器默认为月
                    that.addDiscountCardData.notice = res.data.data.notice // 用卡须知
                    that.addDiscountCardData.state = res.data.data.state // 状态
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
    　　　　return this.addDiscountCardData.title
    　　}
    },
    watch: {
        cardTitle: {
            handler(val,oldVal){
                this.discountCard_name_number = val.length
            }
        },
        addDiscountCardData: {
            handler(val,oldVal){
                if(val.cover_type===1){
                    this.cover = "url(" + val.card_cover_img + ")"
                }else{
                    if(val.card_cover_color===null){
                        this.cover = "#EDEDED"
                        this.addDiscountCardData.card_cover_color = "#EDEDED"
                    }else{
                        this.cover = val.card_cover_color
                    }
                }
                this.cardDate = this.dateOptions[val.price_type].label.replace(/\（[^\)]*\）/g,"")
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/membership_card/membershipCard.scss'
</style>