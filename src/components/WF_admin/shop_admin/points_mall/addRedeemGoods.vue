<template>
    <div class="wf-addRedeemGoods">
        <el-form label-position="right"
        :model="addRedeemData"
        :rules="rules"
        ref="addRedeemData"
        label-width="90px"
        class="demo-ruleForm">
            <el-form-item label="商品" prop="validFlagGoods">
                <el-button size="mini" @click="toselect">选择商品</el-button>
            </el-form-item>
            <el-form-item v-if="showShop===true" class="upload_label" label="主图" prop="master_graph">
                <el-upload
                class="avatar-uploader"
                :action="upfileUrl"
                :show-file-list="false"
                :on-success="mainSuccess"
                :before-upload="beforeUpload">
                    <img v-if="addRedeemData.master_graph" :src="addRedeemData.master_graph" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="wf-gray-tit img">图片宽高比例为1:1，建议图片宽高尺寸为700x700 px，图片不超过2M</span>
            </el-form-item>
            <el-form-item v-if="showShop===true" class="upload_label" label="轮播图" prop="rotation_chart">
                <el-upload
                class="upload-demo"
                :action="upfileUrl"
                :on-success="swiperSuccess"
                :on-remove="swiperRemove"
                :file-list="addRedeemData.rotation_chart"
                :on-exceed="max"
                :limit='5'
                list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <span class="wf-gray-tit img">图片宽高比例为1:1，建议图片宽高尺寸为750x750 px，图片不超过2M</span>
            </el-form-item>
            <el-form-item v-if="showShop===true" class="upload_label" label="详情图" prop="detail_pics">
                <el-upload
                class="upload-demo"
                :action="upfileUrl"
                :on-success="detailSuccess"
                :on-remove="detailRemove"
                :file-list="addRedeemData.detail_pics"
                list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <p style="margin-left:0;" class="wf-gray-tit">建议图片宽尺寸为750 px，图片不超过2M</p>
            </el-form-item>
            <el-form-item v-if="showShop===true" >
                <el-col :span="22">
                    <my-table ref="shopTable" class="sku_table" :tableData='shopSkuData' :columns='shopSkuColumns' :mutiSelect="mutiSelect" :pagination="false"  @multipleSelection="shopSelectionChange"></my-table>
                </el-col>
            </el-form-item>
            <el-form-item v-if="showCupon===true">
                <el-col :span="22">
                    <my-table ref="cuponTable" class="sku_table" :tableData='cuponSkuData' :columns='cuponSkuColumns' :pagination="false"></my-table>
                </el-col>
            </el-form-item>
            <el-form-item label="活动时间" prop="date">
                <el-date-picker
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    size="mini"
                    v-model="addRedeemData.start_time"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
                <span style="margin: 0 10px;">至</span>
                <el-date-picker
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    size="mini"
                    v-model="addRedeemData.end_time"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="兑换限制" prop="restriction_quantity">
                <el-input-number v-model="addRedeemData.restriction_quantity" style="width:240px;" size="mini" :min="1" :precision="0" :controls="false"></el-input-number>
                <span style="margin-left:10px;">件/人</span>
                <p class="wf-gray-tit" style="line-height:inherit;margin:0;">默认为不限领</p>
            </el-form-item>
            <el-form-item label="使用规则" prop="usage_rule">
                <el-input
                style="width:514px;"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5 }"
                placeholder="请输入信息"
                v-model="addRedeemData.usage_rule">
                </el-input>
            </el-form-item>
            <el-form-item label="是否上架" prop="state">
                <el-radio-group v-model="addRedeemData.state" text-color="red" fill="#000">
                    <el-radio :label="0">上架</el-radio>
                    <el-radio :label="1">下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="save('addRedeemData')">保存</el-button>
            </el-form-item>
        </el-form>
        <!-- start ************************************ 选择商品或优惠券的弹框 **************************** start -->
        <el-dialog
        :visible.sync="dialogVisible"
        width="55%">
            <el-tabs v-model="activeName">
                <el-tab-pane label="选择商品" name="first"></el-tab-pane>
                <el-tab-pane label="选择优惠券" name="second"></el-tab-pane>
            </el-tabs>
            <div class="clear">
                <div>
                    <el-button type="primary" size="mini" @click="addJump">新建</el-button>
                    <el-button size="mini" @click="refresh" :loading="refreshLoading">刷新</el-button>
                </div>
                <div class="wf-right">
                    <el-select class="wf-margin-right" v-if="activeName==='first'" size="mini"  placeholder="父分类" v-model="search_parent" @change="handleParentChange">
                        <el-option
                        v-for="item in parent_option"
                        :key="item.id"
                        :label="item.type_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select class="wf-margin-right" v-if="activeName==='first'" size="mini" placeholder="子分类" v-model="search_son">
                        <el-option
                        v-for="item in son_option"
                        :key="item.id"
                        :label="item.type_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input v-if="activeName==='first'" v-model="search_shop" class="wf-margin-right" size="mini" placeholder="输入您要搜索的商品名称"></el-input>
                    <el-input v-if="activeName==='second'" v-model="search_cupon" class="wf-margin-right" size="mini" placeholder="输入优惠券名称"></el-input>
                    <el-button type="primary" size="mini" @click="search_btn">搜索</el-button>
                </div>
            </div>
            <my-table v-if="activeName==='first'" :tableData='shopTableData' :columns='shopColumns' :pageSize="5" :currentPage='shopCurrentPage' :totalPage="shopTotalPage" @currentChange="getShopData"></my-table>
            <my-table v-if="activeName==='second'" :tableData='cuponTableData' :columns='cuponColumns' :pageSize="5" :currentPage='cuponCurrentPage' :totalPage="cuponTotalPage" @currentChange="getCuponData"></my-table>
        </el-dialog>
        <!-- end ************************************** 选择商品或优惠券的弹框 ****************************** end -->
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from "@/untils/common.js";
export default {
    name: "addRedeemGoods",
    data() {
        //是否选择商品检验
        let validSelectFlagGoods=(rule, value, callback) => {
            if(this.validFlagGoods === false) {
                this.$message.warning("请选择商品或优惠券,如已选择商品，请勾选商品规格")
                callback(new Error('请选择商品或优惠券,如已选择商品，请勾选商品规格'));
            }else{
                callback();
            }
        };
        let validSwiper=(rule, value, callback) => {
            if(value.length<1) {
                callback(new Error('轮播图不能为空'));
            }else{
                callback();
            }
        };
        let validDate=(rule, value, callback) => {
            let startDate = new Date(this.addRedeemData.start_time)
            let endDate = new Date(this.addRedeemData.end_time)
            if(this.addRedeemData.start_time==="") {
                callback(new Error('请填写活动时间'));
            }else if(startDate>=endDate){
                callback(new Error('请正确填写活动时间的范围'));
            }else{
                callback();
            }
        };
        return {
            refreshLoading: false,
            // 弹框
            search_parent: "",
            search_son: "",
            parent_option: [], // 父分类
            son_option: [], // 子分类
            activeName: "first",
            dialogVisible: false,
            search_shop: "",
            search_cupon: "",
            shopCurrentPage: 1,
            shopTotalPage: 0,
            shopTableData: [], // 商品列表
            // 商品列表
            shopColumns: [
                {   label: "商品名称",
                    align: "center",
                    render: function(h, param) {
                        let img = [
                                h('img', {
                                    attrs: {
                                        src: param.row.master_graph,
                                        preview: param.row.id,
                                        style: 'width:44px;height:44px;'
                                    }
                                })
                            ];
                        return h('div', img);
                    }
                },
                {   label: "商品名称",
                    align: "center",
                    prop: "good_name"
                },
                {
                    label: "原价（元）",
                    align: "center",
                    render: (h, param)=> {
                        let a = [
                            h('span', {
                                attrs: {
                                    style: "color:#E36F6B;"
                                }
                            }, "￥"+param.row.original_price)
                        ]
                        return a
                    }
                },
                {
                    label: "库存",
                    align: "center",
                    prop: "good_stock"
                },
                {
                    label: "操作",
                    align: "center",
                    render: (h, param)=> {
                        let a = [h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8;"
                                },
                                on: {
                                    click: () => {
                                        this.chooseShop(param.row.id)
                                    }
                                }
                            }, "选择")]
                        return h('div', a);
                    }
                }
            ],
            cuponCurrentPage: 1,
            cuponTotalPage: 0,
            cuponTableData: [], // 优惠券列表
            // 优惠券列表
            cuponColumns: [
                {   label: "优惠券名称",
                    align: "center",
                    prop: "coupon_name"
                },
                {   label: "有效期至",
                    align: "center",
                    prop: "end_time"
                },
                {
                    label: "库存",
                    align: "center",
                    prop: "coupon_num"
                },
                {
                    label: "操作",
                    align: "center",
                    render: (h, param)=> {
                        let a = [h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8;"
                                },
                                on: {
                                    click: () => {
                                        this.chooseCupon(param.row)
                                    }
                                }
                            }, "选择")]
                        return h('div', a);
                    }
                }
            ],
            // 表单
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            showShop: false, // 控制商品的图片上传和规格列表显示
            showCupon: false, // 优惠券规格列表显示
            mutiSelect: true, // 开启全选
            shopSkuData: [], // 商品规格列表
            // 商品规格列表
            shopSkuColumns: [
                {   label: "规格",
                    align: "center",
                    prop: "spec_name",
                    width: "360",
                },
                {   label: "原价（元）",
                    align: "center",
                    prop: "sku_price"
                },
                {
                    label: "库存",
                    align: "center",
                    prop: "sku_stock"
                },
                {
                    label: "发放数量",
                    align: "center",
                    render: (h, param)=> {
                        let a = [h('el-input-number', {
                                props: {
                                    size: "mini",
                                    controls: false,
                                    min: 1,
                                    precision: 0,
                                    max: param.row.sku_stock,
                                    value: param.row.stock
                                },
                                attrs: {
                                    style: "width:117px;"
                                },
                                on: {
                                    input: (val) => {
                                        param.row.stock = val
                                    }
                                }
                            })]
                        return h('div', a);
                    }
                },
                {
                    label: "兑换积分",
                    align: "center",
                    render: (h, param)=> {
                        let a = [h('el-input-number', {
                                props: {
                                    size: "mini",
                                    controls: false,
                                    min: 1,
                                    precision: 0,
                                    value: param.row.integral
                                },
                                attrs: {
                                    style: "width:117px;"
                                },
                                on: {
                                    input: (val) => {
                                        param.row.integral = val
                                    }
                                }
                            })]
                        return h('div', a);
                    }
                }
            ],
            cuponSkuData: [], // 优惠券列表
            // 优惠券规格列表
            cuponSkuColumns: [
                {   label: "优惠券名称",
                    align: "center",
                    prop: "coupon_name",
                },
                {   label: "面额",
                    align: "center",
                    prop: "subtraction_price"
                },
                {
                    label: "库存",
                    align: "center",
                    prop: "coupon_num"
                },
                {
                    label: "发放数量",
                    align: "center",
                    render: (h, param)=> {
                        let a = [h('el-input-number', {
                                props: {
                                    size: "mini",
                                    controls: false,
                                    min: 1,
                                    max: param.row.coupon_num,
                                    precision: 0,
                                    value: param.row.stock
                                },
                                attrs: {
                                    style: "width:117px;"
                                },
                                on: {
                                    input: (val) => {
                                        param.row.stock = val
                                    }
                                }
                            })]
                        return h('div', a);
                    }
                },
                {
                    label: "兑换积分",
                    align: "center",
                    render: (h, param)=> {
                        let a = [h('el-input-number', {
                                props: {
                                    size: "mini",
                                    controls: false,
                                    min: 1,
                                    precision: 0,
                                    value: param.row.integral
                                },
                                attrs: {
                                    style: "width:117px;"
                                },
                                on: {
                                    input: (val) => {
                                        param.row.integral = val
                                    }
                                }
                            })]
                        return h('div', a);
                    }
                }
            ],
            validFlagGoods: false, // 检验标记，是否选择过商品
            shopId: "", // 商品来源id
            cuponId: "", // 优惠券id
            addRedeemData: {
                secret: localStorage.getItem('secretId'),
                pro_id: parseInt(localStorage.getItem('proId')),
                master_graph: "",
                rotation_chart: [], // 轮播图
                detail_pics: [], // 详情图
                sku_detail: [], // 规格详情
                start_time: "",
                end_time: "",
                restriction_quantity: "", // 兑换限制
                usage_rule: "", // 规则
                state: 0
            },
            rules: {
                //是否有选择商品
                validFlagGoods: [
                    { required: true, validator: validSelectFlagGoods, trigger: 'blur' }
                ],
                master_graph: [
                    { required: true, message: "主图不能为空", trigger: 'blur' }
                ],
                rotation_chart: [
                    { required: true, validator: validSwiper, trigger: 'blur' }
                ],
                date: [
                    { required: true, validator: validDate, trigger: 'blur' }
                ],
                usage_rule: [
                    { required: true, message: "使用规则不能为空", trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        MyTable
    },
    mounted() {
        if(parseInt(this.$route.query.type)===1){
            this.getEdit()
        }
    },
    methods: {
        getEdit(){
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: parseInt(this.$route.query.id),
                pro_id: parseInt(localStorage.getItem('proId'))
            }
            if(parseInt(this.$route.query.shopType)===0){ // 0为商品
                this.$axios.post(this.url+'shopapi/exchange_good/edit',data)
                .then(function (res) {
                    if(res.data.code==200){
                        that.showShop = true
                        that.addRedeemData.master_graph = res.data.data.master_graph
                        if(res.data.data.rotation_chart!=""){
                            let rotation_chart = res.data.data.rotation_chart.split(",")
                            that.addRedeemData.rotation_chart = []
                            for(var i=0;i<rotation_chart.length;i++){
                                that.addRedeemData.rotation_chart.push({url:rotation_chart[i],response:{data:{src:rotation_chart[i]}}})
                            }
                        }
                        if(res.data.data.detail_pics!=""){
                            let detail_pics = res.data.data.detail_pics.split(",")
                            that.addRedeemData.detail_pics = []
                            for(var i=0;i<detail_pics.length;i++){
                                that.addRedeemData.detail_pics.push({url:detail_pics[i],response:{data:{src:detail_pics[i]}}})
                            }
                        }
                        that.shopSkuData = res.data.data.sku_detail
                        that.addRedeemData.start_time = dateFormat(res.data.data.start_time,"{y}-{m}-{d} {h}:{m}")
                        that.addRedeemData.end_time = dateFormat(res.data.data.end_time,"{y}-{m}-{d} {h}:{m}")
                        that.addRedeemData.restriction_quantity = res.data.data.restriction_quantity
                        that.addRedeemData.usage_rule = res.data.data.usage_rule.replace(/<br>/g,"\n")
                        that.addRedeemData.state = res.data.data.state
                        that.shopId = res.data.data.good_id
                        that.$nextTick(() => {
                            res.data.data.sku_detail.forEach(row => {
                                that.$refs.shopTable.$refs.multipleTable.toggleRowSelection(row);
                            });
                        })
                        loading.close()
                    }else{
                        loading.close()
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    loading.close()
                    that.$message.error('请联系管理员');
                });
            }else{ // 1为优惠券
                this.$axios.post(this.url+'shopapi/exchange_good/backfill',data)
                .then(function (res) {
                    if(res.data.code==200){
                        that.showCupon = true
                        that.cuponSkuData.push({
                            id: res.data.data.cupon_id,
                            coupon_name: res.data.data.name,
                            integral: res.data.data.integral,
                            stock: res.data.data.stock,
                            subtraction_price: res.data.data.subtraction_price,
                            coupon_num: res.data.data.coupon_num
                        })
                        that.addRedeemData.sku_detail.push({
                            id: res.data.data.cupon_id,
                            integral: res.data.data.integral,
                            stock: res.data.data.stock
                        })
                        that.addRedeemData.start_time = dateFormat(res.data.data.start_time,"{y}-{m}-{d} {h}:{m}")
                        that.addRedeemData.end_time = dateFormat(res.data.data.end_time,"{y}-{m}-{d} {h}:{m}")
                        that.addRedeemData.restriction_quantity = res.data.data.restriction_quantity
                        that.addRedeemData.usage_rule = res.data.data.usage_rule.replace(/<br>/g,"\n")
                        that.addRedeemData.state = res.data.data.state
                        that.cuponId = res.data.data.coupon_id
                        // that.$nextTick(() => {
                        //     that.cuponSkuData.forEach(row => {
                        //         that.$refs.cuponTable.$refs.multipleTable.toggleRowSelection(row);
                        //     });
                        // })
                        loading.close()
                    }else{
                        that.$message.error(res.data.msg);
                        loading.close()
                    }
                })
                .catch(function (error) {
                    loading.close()
                    that.$message.error('请联系管理员');
                });
            }
            
        },
        toselect(){ // 获取商品列表
            this.search_parent = ""
            this.search_son = ""
            this.getShopData(1)
            this.getCuponData(1)
            this.parentSelect()
        },
        parentSelect(){ // 获取父分类接口
            let that = this
            this.$axios.post(this.url+'shopapi/goodtype/fatherIndex',{
                secret: localStorage.getItem('secretId')
            })
            .then(function (res) {
                if(res.data.code==1){
                    that.parent_option = res.data.data;
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
        sonSelect(){ // 获取子分类接口
            if(this.search_parent&&this.search_parent!=''){
                let that = this
                this.$axios.post(this.url+'shopapi/goodtype/sonIndex',{
                    secret: localStorage.getItem('secretId'),
                    type_id: that.search_parent
                })
                .then(function (res) {
                    if(res.data.code==1){
                        that.son_option = res.data.data
                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    that.$message.error('请联系管理员');
                });
            }
        },
        handleParentChange(){
            this.search_son = ""
            this.sonSelect();
        },
        addJump(){ // 新建跳转
            if(this.activeName==="first"){
                this.$router.push({path:"/wf/admin/shop/newshop_list/newadd_goods"})
            }else{
                this.$router.push({path:'/wf/admin/shop/markting/coupon/addCoupon',name:'addCoupon'})
            }
        },
        getShopData(currentPage){ // 获取商品列表
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            this.shopCurrentPage = currentPage
            let that = this
            this.$axios.post(this.url+'shopapi/goods/chooseGood',{
                secret: localStorage.getItem('secretId'),
                page: this.shopCurrentPage,
                good_type: this.search_son!==""?this.search_son:this.search_parent!==""?this.search_parent:undefined,
                good_name_keyword: this.search_shop!==""?this.search_shop:undefined
            })
            .then(function (res) {
                loading.close()
                that.refreshLoading = false
                if(res.data.code===200){
                    that.shopTableData = res.data.data.info;
                    that.shopTotalPage = res.data.data.num
                    that.dialogVisible = true
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                loading.close()
                that.refreshLoading = false
                that.$message.error('请联系管理员');
            });
        },
        getCuponData(currentPage){
            this.shopCurrentPage = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: currentPage,
                coupon_name: this.search_cupon!==""?this.search_cupon:undefined,
                type: 1
            }
            this.$axios.post(this.url+'shopapi/member_card/choose',data
            ).then(res=>{
                that.refreshLoading = false
                if(res.data.code===200){
                    that.cuponTableData = res.data.data;
                    that.cuponTotalPage = res.data.count
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.refreshLoading = false
                that.$message.error('请联系管理员！');
            });
        },
        search_btn(){
            if(this.activeName==="first"){
                this.getShopData(1)
            }else{
                this.getCuponData(1)
            }
        },
        refresh(){
            this.refreshLoading = true
            if(this.activeName==="first"){
                this.getShopData(1)
            }else{
                this.getCuponData(1)
            }
        },
        chooseShop(id){
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let that = this
            this.$axios.post(this.url+'shopapi/common/getOneGoodInfo',{
                pro_id: parseInt(localStorage.getItem('proId')),
                id: id
            })
            .then(function (res) {
                if(res.data.code===200){
                    that.addRedeemData.master_graph = res.data.data.master_graph
                    that.addRedeemData.rotation_chart = []
                    that.addRedeemData.detail_pics = []
                    let broadcast = res.data.data.broadcast.split(",")
                    for(var i=0;i<broadcast.length;i++){
                        that.addRedeemData.rotation_chart.push({url:broadcast[i],response:{data:{src:broadcast[i]}}})
                    }
                    if(res.data.data.good_detail_pics.length>0){
                        let good_detail_pics = res.data.data.good_detail_pics.split(",")
                        for(var i=0;i<good_detail_pics.length;i++){
                            that.addRedeemData.detail_pics.push({url:good_detail_pics[i],response:{data:{src:good_detail_pics[i]}}})
                        }
                    }else{
                        that.addRedeemData.detail_pics = []
                    }
                    that.shopSkuData = res.data.data.sku_info
                    that.showShop = true
                    that.showCupon = false
                    that.shopId = id
                    that.dialogVisible = false
                    loading.close()
                }else{
                    that.$message.error(res.data.msg);
                    loading.close()
                }
            })
            .catch(function (error) {
                loading.close()
                that.$message.error('请联系管理员');
            });
        },
        chooseCupon(row){
            this.cuponSkuData = []
            this.cuponSkuData.push(row)
            let arr = []
            arr.push({
                id: row.id,
                integral: row.integral,
                stock: row.stock
            })
            this.addRedeemData.sku_detail = arr
            this.showCupon = true
            this.showShop = false
            this.cuponId = row.id
            this.dialogVisible = false
        },
        beforeUpload(file){
            if(file.size/1024/1024>2){
                this.$message.warning("上传图片大小不能超过2M")
                return false
            }
        },
        mainSuccess(response, file, fileList){
            this.addRedeemData.master_graph = response.data.src
        },
        swiperSuccess(response, file, fileList){
            this.addRedeemData.rotation_chart = fileList
        },
        swiperRemove(file, fileList){
            this.addRedeemData.rotation_chart = fileList
        },
        detailRemove(file, fileList){
            this.addRedeemData.detail_pics = fileList
        },
        max(file,fileList){
            this.$message.warning("轮播图最多上传5张")
        },
        detailSuccess(response, file, fileList){
            this.addRedeemData.detail_pics = fileList
        },
        shopSelectionChange(row){
            if(row.length>0){
                let arr = []
                for(var data in row){
                    arr.push({
                        id: row[data].id,
                        integral: row[data].integral,
                        stock: row[data].stock
                    })
                }
                this.addRedeemData.sku_detail = arr
            }else{
                this.addRedeemData.sku_detail = []
            }
        },
        // cuponSelectionChange(row){
        //     if(row.length>0){
        //         let arr = []
        //         for(var data in row){
        //             arr.push({
        //                 id: row[data].id,
        //                 integral: row[data].integral,
        //                 stock: row[data].stock
        //             })
        //         }
        //         this.addRedeemData.sku_detail = arr
        //     }else{
        //         this.addRedeemData.sku_detail = []
        //     }
        // },
        save(ruleForm){ // 保存
            if(this.addRedeemData.sku_detail.length>0){
                this.validFlagGoods = true
            }else{
                if(this.showCupon===true){
                    this.validFlagGoods = true
                }else{
                    this.validFlagGoods = false
                }
            }
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    if(this.showShop===true){ // 避免规格选中后再改写内容不能实时获取值
                        for(var data in this.shopSkuData){
                            for(var detail in this.addRedeemData.sku_detail){
                                if(this.shopSkuData[data].id===this.addRedeemData.sku_detail[detail].id){
                                    if(this.shopSkuData[data].integral===undefined){
                                        this.addRedeemData.sku_detail[detail].integral = ""
                                        this.$message.warning("请填写兑换积分")
                                        return
                                    }else{
                                        this.addRedeemData.sku_detail[detail].integral = this.shopSkuData[data].integral
                                    }
                                    if(this.shopSkuData[data].stock===undefined){
                                        this.addRedeemData.sku_detail[detail].stock = ""
                                        this.$message.warning("请填写发放数量")
                                        return
                                    }else{
                                        this.addRedeemData.sku_detail[detail].stock = this.shopSkuData[data].stock
                                    }
                                }
                            }
                        }
                    }else if(this.showCupon===true){
                        for(var data in this.cuponSkuData){
                            for(var detail in this.addRedeemData.sku_detail){
                                if(this.cuponSkuData[data].id===this.addRedeemData.sku_detail[detail].id){
                                    if(this.cuponSkuData[data].integral===undefined){
                                        this.addRedeemData.sku_detail[detail].integral = ""
                                        this.$message.warning("请填写兑换积分")
                                        return
                                    }else{
                                        this.addRedeemData.sku_detail[detail].integral = this.cuponSkuData[data].integral
                                    }
                                    if(this.cuponSkuData[data].stock===undefined){
                                        this.addRedeemData.sku_detail[detail].stock = ""
                                        this.$message.warning("请填写发放数量")
                                        return
                                    }else{
                                        this.addRedeemData.sku_detail[detail].stock = this.cuponSkuData[data].stock
                                    }
                                }
                            }
                        }
                    }// 避免规格选中后再改写内容不能实时获取值
                    const loading = this.$loading({
                        lock: true,
                        text: '保存中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    let that = this
                    let data = JSON.parse(JSON.stringify(this.addRedeemData))
                    let addUrl = ""
                    if(this.showCupon===true){
                        console.log(data)
                        delete data.master_graph
                        delete data.rotation_chart
                        delete data.detail_pics
                        data.integral = data.sku_detail[0].integral
                        data.stock = data.sku_detail[0].stock
                        delete data.sku_detail
                        data.coupon_id = this.cuponId
                        addUrl = "shopapi/exchange_good/add"
                    }else{
                        let rotation_chart = []
                        let detail_pics = []
                        data.rotation_chart.forEach(el => {
                            rotation_chart.push(el.response.data.src)
                        })
                        data.detail_pics.forEach(el => {
                            detail_pics.push(el.response.data.src)
                        })
                        data.rotation_chart = rotation_chart.join(",")
                        data.detail_pics = detail_pics.join(",")
                        data.good_id = this.shopId
                        addUrl = "shopapi/exchange_good/store"
                    }
                    data.usage_rule = data.usage_rule.replace(/\n|\r\n/g,"<br>")
                    if(parseInt(this.$route.query.type)===1){
                        data.id = parseInt(this.$route.query.id)
                    }
                    this.$axios.post(this.url+addUrl,data
                    ).then(res=>{
                        if(res.data.code===200){
                            that.$message.success("保存成功")
                            loading.close()
                            that.$router.push({path:"/wf/admin/shop/markting/pointsMall"})
                        }else{
                            that.$message.error(res.data.msg);
                            loading.close()
                        }
                    }).catch(err=>{
                        that.$message.error('请联系管理员！');
                        loading.close()
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-addRedeemGoods{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    /deep/ .el-form-item__label{
        color: #333;
        padding: 0px 20px 0 0;
    }
    .upload-demo,.avatar-uploader{
        display: inline-block;
    }
    .el-form-item{
        margin-bottom: 20px;
    }
    .wf-right{
        float: right;
    }
    .wf-margin-right{
        margin-right: 20px;
    }
    .el-input{
        width: 240px;
    }
    .el-select{
        width: 140px;
    }
    .el-button{
        width: 80px;
    }
    .el-button--default{
        border-color: #719FF8;
        color: #719FF8;
    }
    .el-button--primary{
        background: #719FF8;
    }
    .wf-gray-tit{
        color: #999;
        font-size: 12px;
        margin-left: 17px;
    }
    .wf-gray-tit.img{
        position: relative;
        top: -42px;
    }
    /deep/ .upload_label{
        .el-form-item__label{
            line-height: 70px;
        }
    }
    /deep/ .el-dialog{
        .el-dialog__header{
            padding: 0;
            z-index: 10;
            position: relative;
        }
        .el-dialog__body{
            z-index: 5;
            padding: 0 20px 30px 20px!important;
            .el-tabs__item{
                height: 60px;
                line-height: 60px;
                &:hover{
                    color: #719FF8;
                }
            }
            .el-tabs__item.is-active{
                color: #719FF8;
            }
            .el-tabs__active-bar{
                background-color: #719FF8;
                height: 4px;
            }
            .el-tabs__nav-wrap::after{
                background: #F0F0F0;
            }
        }
        
    }
    // 表格样式
    /deep/ .el-table{
        margin-top: 10px;
        thead{
            color: #333;
            font-size: 16px;
            tr{
                th{
                    font-weight:400;
                    background: #F8F8F8;
                    border-radius:4px;
                    border: none;
                }
            }
        }
        tbody{
            tr{
                td{
                    padding: 6px 0;
                }
            }
        }
    }
    /deep/ .wf_pagination{
        text-align: center;
        margin-top: 30px;
    }
    /deep/ .sku_table{
        thead tr th{
            background: #F3F3F3;
        }
        tbody tr{
            background: #FAFAFA;
        }
    }
    /deep/ .el-radio-group{
        .el-radio__input.is-checked+.el-radio__label{
            color: inherit;
        }
        .el-radio__inner{
            width: 18px;
            height: 18px;
        }
        .el-radio__input.is-checked .el-radio__inner{
            border-color: #719FF8;
            background: #fff;
        }
        .el-radio__inner::after{
            width: 14px;
            height: 14px;
            background-color: #719FF8;
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
    /deep/ .el-upload--picture-card{
        width: 80px;
        height: 80px;
        line-height: 86px;
        border: none;
        background: #F3F3F3;
        i{
            color: #999;
        }
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item{
        width: 80px;
        height: 80px;
    }
}
</style>
