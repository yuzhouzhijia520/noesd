<template>
    <div class="wf-addCoupon">
        <el-row :gutter="24">
            <el-col :xs="5" :sm="7" :md="9" :lg="10" :xl="18">
                <el-form :label-position="labelPosition"
                        :model="addCouponData" 
                        :rules="rules" 
                        ref="addCouponData" 
                        label-width="100px" 
                        class="demo-ruleForm">
                    <el-form-item label="优惠券名称:" prop="coupon_name" size="mini">
                        <el-col :span="12" class="wf-addCoupon-coupon_name">
                            <el-input  size="mini" v-model="addCouponData.coupon_name" placeholder="请输入名称" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="面额:" prop="coupon_price" size="mini" v-if="$route.query.param!='edit'||!$route.query.param">
                        <el-input-number :precision="2" :controls="false" size="mini" v-model="addCouponData.coupon_price" :min="1"  :max="100000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="面额:"  size="mini" v-if="$route.query.param==='edit'">
                        {{addCouponData.coupon_price}}元
                    </el-form-item>
                    <el-form-item label="满多少使用:" prop="subtraction_price" size="mini"  v-if="$route.query.param!='edit'||!$route.query.param">
                        <el-input-number :precision="2" :controls="false" size="mini" v-model="addCouponData.subtraction_price" :min="1"  :max="100000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="满多少使用:"  size="mini" v-if="$route.query.param==='edit'">
                        {{addCouponData.subtraction_price}}元
                    </el-form-item>
                    <el-form-item label="发放数量:" prop="coupon_num" size="mini"  v-if="$route.query.param!='edit'||!$route.query.param">
                        <el-input-number :precision="0" :controls="false" v-model="addCouponData.coupon_num" size="mini" :min="1" :max="100000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="发放数量:"  size="mini" v-if="$route.query.param==='edit'">
                        <el-col>
                        {{addCouponData.coupon_num}}(已领取{{addCouponData.user_num}},剩余数量{{addCouponData.coupon_num}})
                        </el-col>
                        <el-radio-group v-model="radioCouponNum" @change="handleChangeCouponNum" v-if="showCouponNum">
                            <el-col class="wf-radioCouponNum">
                                <el-radio :label="0">追加</el-radio>
                                <el-input-number :controls="false" size="mini" v-model="change_numAdd"></el-input-number>
                            </el-col>
                            <el-col :span="8">
                                <el-radio :label="1">扣减</el-radio>
                                <el-input-number :controls="false" size="mini" v-model="change_numDec"></el-input-number>
                            </el-col>
                            <el-col :span="10" class="wf-help" >
                                <span > 扣减数量不可超过已发放数量的剩余数量</span>
                            </el-col>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="适用商品:" size="mini"  prop="classify">
                        <el-radio-group v-model="addCouponData.classify" class="wf-addCoupon-s" @change="handleClassify">
                            <el-row>
                                <el-radio :label="0" >全部商品</el-radio>
                            </el-row>
                            <el-row>
                                <el-radio :label="1" >指定分类</el-radio>
                                <el-button size="mini" type="primary" :disabled="isDisabledType" class="wf-addCoupon-s-btn" @click="couponType">{{wfSelectTypeName}}</el-button>
                                <el-tag size="mini" v-if="showTypeTage" class="wf-addCoupon-s-tag">已选择{{wfSelectTypeNum}}种分类</el-tag>
                            </el-row>
                            <el-row>
                                <el-radio :label="2" >指定商品</el-radio>
                                <el-button size="mini" type="primary" :disabled="isDisabledShop" class="wf-addCoupon-s-btn"  @click="couponShop">{{wfSelectShopName}}</el-button>
                                <el-tag size="mini" v-if="showShopTage" class="wf-addCoupon-s-tag">已选择{{wfSelectShopNum}}种商品</el-tag>
                            </el-row>
                            <el-row class="wf-classify-table" v-if="addCouponData.classify===2&&flagTable">
                                <my-table 
                                :tableData="tableDataApp" 
                                :pagination="false" 
                                :columns="columnsApp" 
                                :totalPage="totalPageApp"  
                                :currentPage="currentPage" 
                                @currentChange="handleChangeSpecify"
                                :border="true"></my-table>
                            </el-row>
                            <el-row class="wf-newRadio">
                                <el-radio :label="3" >指定商品不可用</el-radio>
                                <el-button size="mini" type="primary" :disabled="isDisabledNotShop" class="wf-addCoupon-s-btn"  @click="couponNotShop">{{wfSelectNotShopName}}</el-button>
                                <el-tag size="mini" v-if="showNotShopTage" class="wf-addCoupon-s-tag">已选择{{wfSelectNotShopNum}}种商品</el-tag>
                            </el-row>
                            <el-row class="wf-classify-table" v-if="addCouponData.classify===3&&flagTable3">
                                <my-table 
                                :tableData="tableDataApp3" 
                                :pagination="false" 
                                :columns="columnsApp3" 
                                :totalPage="totalPageApp3"  
                                :currentPage="currentPage3" 
                                @currentChange="handleChangeSpecify3"
                                :border="true"></my-table>
                            </el-row>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="用券时间:" size="mini" prop="expire_type" class="wf-addCoupon-date-type"> 
                        <el-radio-group v-model="addCouponData.expire_type" @change="handleExpir_type">
                            <el-radio :label="0" >固定有效期</el-radio>
                            <el-radio :label="1" >领到券当日开始N天内有效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="有效时间:" prop="expire_time"  size="mini" v-show="showExpire_Day">
                        <div >
                            <el-col :span="5" class="wf-addCoupon-expire_time" >
                                <el-input-number :precision="0" :controls="false"  size="mini" v-model="addCouponData.expire_time" :min="1" :max="10000"></el-input-number>
                            </el-col>
                             <el-col :span="1" class="wf-addCoupon-expire_time">天
                            </el-col>
                        </div>
                    </el-form-item>
                     <el-form-item label="有效时间:" prop="time"  size="mini" v-show="showExpire_Time">
                        <div class="block" >
                            <el-date-picker
                            v-model="addCouponData.time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            :default-time="['00:00:00', '23:59:59']"
                             value-format="yyyy-MM-dd HH:mm:ss"
                             :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="发放方式:" size="mini"  prop="grant">
                        <el-checkbox-group v-model="addCouponData.grant"  @change="handleGrant">
                            <el-row>
                                <el-checkbox  :label="0" >自主领取（首页、商品详情页领取）</el-checkbox >
                            </el-row>
                            <el-row >
                                <el-checkbox  :label="1" @change="handleChildrenGrant1">积分商城兑换</el-checkbox >
                            </el-row>
                            <el-row >
                                <el-checkbox  :label="2" @change="handleChildrenGrant2">购买会员卡赠送</el-checkbox >
                            </el-row>
                            <el-row >
                                <el-checkbox  :label="3" @change="handleChildrenGrant3">进店有礼</el-checkbox >
                            </el-row>
                            <el-row v-show="false">
                                <el-checkbox  :label="4" >成功邀请好友购物赠送</el-checkbox >
                            </el-row>
                            <el-row class="wf-invited" v-if="addCouponData.grant.includes(4)" v-show="false">
                                <el-radio-group v-model="fullSelect" @change="handleChangeGrant">
                                    <el-col class="wf-one">
                                        <el-radio :label="0" >满
                                            <el-input-number 
                                            v-model="addCouponData.full_price" 
                                            size="mini"
                                            :controls="false" ></el-input-number>元,并确认收货</el-radio>
                                    </el-col>
                                    <el-col class="wf-two">
                                        <el-radio :label="1" >成功购买<el-input-number v-model="addCouponData.full_order" :controls="false" size="mini"></el-input-number>单，并确认收货</el-radio>
                                    </el-col>
                                </el-radio-group>
                            </el-row>
                            <el-row >
                                <el-checkbox  :label="6" @change="handleChildrenGrant6">砸金蛋</el-checkbox >
                            </el-row>
                            <el-row >
                                <el-checkbox  :label="7" @change="handleChildrenGrant7">签到</el-checkbox >
                            </el-row>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="状态:" prop="state"  >
                        <el-select size="mini" v-model="stateVal" placeholder="请选择状态" @change="choose(stateVal)">
                            <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-button :loading="saveLoading" size="mini" type="primary" @click="save('addCouponData')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog title="选择分类" :visible.sync="dialogTypeVisible" width="550px"  center>
           <el-tree
            :data="shpopType"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            :default-checked-keys="shpopTypeKey">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogTypeVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleDialogTypeVisible">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="选择商品" 
            :visible.sync="dialogShopVisible" 
            width="950px" 
            center 
            class="wf-addCoupon-Shop"
            v-if="dialogShopVisible==true">
            <select-shop 
                @handleChangeVal="handleChange" 
                @shopSelectedId="handleShopSelectedId"
                ref="selectShop"
                :shopFlag="shopFlag"
                :selectParams="selectParams"
                :shopSelectedIdS="shopSelectedIdS"></select-shop>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="handleCloseGoods">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleDialogShopVisible">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="选择商品s" 
            :visible.sync="dialogNotShopVisible" 
            width="950px" 
            center 
            class="wf-addCoupon-Shop"
            v-if="dialogNotShopVisible==true">
            <select-shop 
                @handleChangeVal="handleNotChange" 
                @shopSelectedId="handleNotShopSelectedId"
                ref="selectShop"
                :shopFlag="notShopFlag"
                :selectParams="selectNotParams"
                :shopSelectedIdS="notShopSelectedIdS"></select-shop>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="handleCloseNotGoods">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleDialogNotShopVisible">确 定</el-button>
            </div>
        </el-dialog>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import SelectShop from "./SelectShop.vue";
import { getmylist } from '@/server/mymarkting.js'
import {dateFormat} from '@/untils/common.js';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: 'shop_markting_addCoupon',
    data() {
        let that=this;
        const couponPrice = (rule, value, callback) => {
            if (!value||value===0) {
                callback(new Error('面额不能为空'));
            }else if(value==0){
                callback(new Error('面额不能等于0'))
            }else{
                callback()
            }
            callback();
        };
        const subtractionPrice = (rule, value, callback) => {
            if (!value||value===0) {
                callback(new Error('满多少使用价格不能为空'));
            }else if(value==0){
                callback(new Error('满多少使用价格不能等于0'))
            }else if(value <= that.addCouponData.coupon_price){
                callback(new Error('满多少价格必须大于面额'));
            }else{
                callback()
            }
            callback();
        };

         const expire_timeVali = (rule, value, callback) => {
            if(that.addCouponData.expire_type===1){
                if(!value){
                    callback(new Error('请输入有效时间！'));
                }
            }
            callback();
        };
        const timeVali = (rule, value, callback) => {
            if(that.addCouponData.expire_type===0){
                if(value.length<2){
                    callback(new Error('请选择有效时间！'));
                }
            }
            callback();
        };
        return {
            showVersion: false, // 控制版本提示
            disIntegral:false, //积分商城兑换
            disMember:false, //购买会员卡赠送
            disPolite:false, //进店有礼
            disHit:false, //砸金蛋
            disSign:false, //签到
            showCouponNum:true,
            radioCouponNum:0,
            change_numAdd:undefined,
            change_numDec:undefined,
            saveLoading: false,
            //指定分类 状态
            isDisabledType:true,
            //指定商品 状态
            isDisabledShop:true,
            //选择商品
            dialogShopVisible:false,
            //选择指定不可用商品
            dialogNotShopVisible:false,
            //选择分类
            wfSelectTypeName:'选择分类',
            wfSelectTypeNum:0,
            showTypeTage:false,//是否显示指定分类
            //选择商品
            wfSelectShopName:'选择商品',
            wfSelectShopNum:0,
            showShopTage:false, //是否显示商品
            //指定商品不可用 状态
            isDisabledNotShop:true,
            showNotShopTage:false, //是否显示不可用商品
            wfSelectNotShopName:'选择商品',
            wfSelectNotShopNum:0, //不可用商品数量
            toData:[],
            //选择分类弹窗
            dialogTypeVisible:false,
            //表单对齐方式
            labelPosition:'right',
            //状态
            state: [
                {
                    value: 0,
                    label: '无效'
                }, {
                    value: 1,
                    label: '有效'
                }],
            stateVal:1,
            shpopType:[],
            shpopTypeKey:[],
            defaultProps: {
                children: 'children',
                label: 'type_name'
            },
            //选择的商品id  typeof String
            shopSelectedIdS:'',
            //选择的商品不可用id  typeof String
            notShopSelectedIdS:'',
            //选择的商品行数据  typeof [array[object]]
            shopSelectedIdA:[],
            //选择的不可用商品行数据  typeof [array[object]]
            notShopSelectedIdA:[],
            //指定分类
            typeSelectedIdS:'',
            addCouponShopData:{
                coupon_name:''
            },
            addCouponData:{
                classify:0,
                expire_type:0,
                coupon_name:'',
                state:0,
                time:[],
                coupon_other_id:0,
                coupon_other_idType:'',
                coupon_other_idShop:'',
                grant:[],
                full_order:undefined,
                full_price:undefined,
                user_num:undefined,
                coupon_num:undefined,//coupon_num
            },
            showExpire_Time:true,
            showExpire_Day:false,
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            //校验
            rules: {
                coupon_name: [
                    { required: true, message: '优惠券名称不能为空', trigger: 'blur' }
                ],
                coupon_price: [
                    { required: true, trigger: 'blur', validator: couponPrice }
                ],
                subtraction_price: [
                    { required: true, trigger: 'blur', validator: subtractionPrice }
                ],
                coupon_num: [
                    { required: true, message: '发放数量不能为空', trigger: 'blur' }
                ],
                classify:[
                    { required: true, message: '请选择适用商品', trigger: 'blur' }
                ],
                expire_type:[
                    { required: true, message: '请选择用券时间', trigger: 'blur' }
                ],
                expire_time:[
                     { required: true, trigger: 'blur', validator: expire_timeVali }
                ],
                time:[
                     { required: true, trigger: 'blur', validator: timeVali }
                ],
                grant:[
                     { required: true, message: '请选择发放方式', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '状态不能为空', trigger: 'blur' }
                ]
            },
            //时间范围限制在当日及当日后
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            //默认指定商品标记
            shopFlag:false,
            //默认指定不可用商品标记
            notShopFlag:false,
            selectParams:[],
            selectNotParams:[],
            submitSelected:[],
            submitNotSelected:[],
            //指定商品
            tableDataApp:[],
            totalPageApp:0,
            currentPage:1,
            fullSelect:0,
            columnsApp: [
                { 
                    prop: "good_name", 
                    label: "商品",
                    align: "left",
                },
                { 
                    prop: "original_price", 
                    label: "单价(元)",
                    align: "center",
                },
                { 
                    prop: "good_stock", 
                    label: "库存",
                    align: "center",
                },
                { 
                    label: "操作",
                    align: "center",
                    render:(h, param)=> {
                        let a=[h('el-button', {
                            props:{
                                type:'text'
                            },
                            class:'wf-delete',
                             on: {
                                click: () => {
                                    this.cancelSelect(param.row);
                                }
                            }
                        }, '删除')];
                        return h('div', a);
                    }
                }
            ],
            //指定商品
            tableDataApp3:[],
            totalPageApp3:0,
            currentPage3:1,
            columnsApp3: [
                { 
                    prop: "good_name", 
                    label: "商品",
                    align: "left",
                },
                { 
                    prop: "original_price", 
                    label: "单价(元)",
                    align: "center",
                },
                { 
                    prop: "good_stock", 
                    label: "库存",
                    align: "center",
                },
                { 
                    label: "操作",
                    align: "center",
                    render:(h, param)=> {
                        let a=[h('el-button', {
                            props:{
                                type:'text'
                            },
                            class:'wf-delete',
                            on: {
                                click: () => {
                                    this.cancelSelect3(param.row);
                                }
                            }
                        }, '删除')];
                        return h('div', a);
                    }
                }
            ],
            flagTable:true,
            flagTable3:true
        }
    },
    components: {
        MyTable,
        SelectShop,
        versionCom
    },
    mounted(){
        this.shopFlag=false;
        this.notShopFlag=false;
        if(this.$route.query.param==='edit'){
            if(!localStorage.getItem('id')||!localStorage.getItem("coupon_name")){
                localStorage.removeItem('id');
                this.$router.push({path:'/wf/admin/shop/markting/coupon',name:'coupon'});
            }
            this.addCouponData.coupon_name=localStorage.getItem("coupon_name");
            this.addCouponData.coupon_price=localStorage.getItem("coupon_price");
            this.addCouponData.subtraction_price=localStorage.getItem("subtraction_price");
            this.addCouponData.coupon_num=localStorage.getItem("coupon_num");
            this.addCouponData.classify=parseInt(localStorage.getItem("classify"));
            if(localStorage.getItem("user_num")||localStorage.getItem("user_num")===0){
                this.addCouponData.user_num=parseInt(localStorage.getItem("user_num"));
            }
            if(localStorage.getItem("coupon_num")||localStorage.getItem("coupon_num")===0){
                this.addCouponData.coupon_num=parseInt(localStorage.getItem("coupon_num"));
            }
            this.stateVal=parseInt(localStorage.getItem("state"));
            if(localStorage.getItem("grant")){
                let val=localStorage.getItem("grant");
                let arr=val.split(',');
                this.addCouponData.grant=Array.from(arr,x=>parseInt(x));
                let validgrant2=this.addCouponData.grant.includes(4);
                if(validgrant2){
                    this.fullSelect=parseInt(localStorage.getItem("fullSelect"));
                    if(this.fullSelect===0){
                        this.addCouponData.full_price=parseFloat(localStorage.getItem("full_price"));
                        localStorage.removeItem('full_price');
                    }else if(this.fullSelect===1){
                        this.addCouponData.full_order=parseInt(localStorage.getItem("full_order"));
                        localStorage.removeItem('full_order');
                        
                    }
                }
                localStorage.removeItem('grant');
            }
            
            localStorage.removeItem('coupon_name');
            localStorage.removeItem('coupon_price');
            localStorage.removeItem('subtraction_price');
            localStorage.removeItem('coupon_num');
            localStorage.removeItem('classify');
            localStorage.removeItem('state');
            if(this.$store.state.couponList){
                this.tableDataApp=this.$store.state.couponList;
            }
            if(this.$store.state.couponNotList){
                this.tableDataApp3=this.$store.state.couponNotList;
            }

            //使用限制
            if(this.addCouponData.classify===0){
                localStorage.setItem("coupon_other_id",0);
                this.addCouponData.coupon_other_id=0;
            }else if(this.addCouponData.classify===1){
                this.typeSelectedIdS=localStorage.getItem("coupon_other_id");
                this.getHandleEditType(localStorage.getItem("coupon_other_id"));
                this.wfSelectTypeNum = localStorage.getItem("coupon_other_id").split(",").length;
                this.wfSelectTypeName="选择分类";
                this.isDisabledType=false;
                if(this.wfSelectTypeNum>0){
                    this.showTypeTage=true;
                    this.wfSelectTypeName="修改分类";
                }
            }else if(this.addCouponData.classify===2){
                 this.shopSelectedIdS=localStorage.getItem("coupon_other_id");
                 this.wfSelectShopName="选择商品";
                 this.shopFlag=true;
                 this.wfSelectShopNum = localStorage.getItem("coupon_other_id").split(",").length;
                 this.isDisabledShop=false;
                 if(this.wfSelectShopNum>0){
                    this.showShopTage=true;
                    this.wfSelectShopName="修改商品";
                 }
            }else if(this.addCouponData.classify===3){
                 this.notShopSelectedIdS=localStorage.getItem("coupon_other_id");
                 this.wfSelectNotShopName="选择商品";
                 this.notShopFlag=true;
                 this.shopNotFlag=true;
                 this.wfSelectNotShopNum = localStorage.getItem("coupon_other_id").split(",").length;
                 this.isDisabledNotShop=false;
                 if(this.wfSelectNotShopNum>0){
                    this.showNotShopTage=true;
                    this.wfSelectNotShopName="修改商品";
                 }
            }
            this.addCouponData.expire_type=parseInt(localStorage.getItem("expire_type"));
            //期效方式
            if(this.addCouponData.expire_type===0){
                let newTime=[];
                newTime.push(dateFormat(localStorage.getItem("start_time")));
                newTime.push(dateFormat(localStorage.getItem("end_time")));
                this.addCouponData.time=newTime;
            }else if(this.addCouponData.expire_type===1){
                this.addCouponData.expire_time=localStorage.getItem("expire_time");
                this.showExpire_Time=false;
                this.showExpire_Day=true;
            }
        }
        if(this.$route.query.param!='edit'&&this.$route.query.param!='views'){
            this.$store.commit({
                type:'getCouponList',
                couponList:[],
            });
            this.$store.commit({
                type:'getCouponNotList',
                couponNotList:[],
            });
        }
        if(this.$route.query.param!='views'){
            this.getMyMarkingData();
        }
    },
    methods: {
        handleCloseVersion(){
            this.showVersion = false;
        },
        handleChildrenGrant1(val){
            if(this.disIntegral){
                this.addCouponData.grant=this.addCouponData.grant.filter(x=>x!=1);
                this.$alert('开通“积分商城”营销工具才可使用', '温馨提示', {
                    confirmButtonText: '知道了',
                    center: true
                })
            }
        },
        handleChildrenGrant2(val){
            if(this.disMember){
                this.addCouponData.grant=this.addCouponData.grant.filter(x=>x!=2);
                this.$alert('开通“会员卡”营销工具才可使用', '温馨提示', {
                    confirmButtonText: '知道了',
                    center: true
                })
            }
        },
        handleChildrenGrant3(val){
            if(this.disPolite){
                this.addCouponData.grant=this.addCouponData.grant.filter(x=>x!=3);
                this.$alert('开通“进店有礼”营销工具才可使用', '温馨提示', {
                    confirmButtonText: '知道了',
                    center: true
                })
            }
        },
        handleChildrenGrant6(){
            if(this.disHit){
                this.addCouponData.grant=this.addCouponData.grant.filter(x=>x!=6);
                this.$alert('开通“砸金蛋”营销工具才可使用', '温馨提示', {
                    confirmButtonText: '知道了',
                    center: true
                })
            }
        },
        handleChildrenGrant7(){
            if(this.disSign){
                this.addCouponData.grant=this.addCouponData.grant.filter(x=>x!=7);
                this.$alert('开通“签到”营销工具才可使用', '温馨提示', {
                    confirmButtonText: '知道了',
                    center: true
                })
            }
        },
        getMyMarkingData(){
            let that = this
            const loading = this.$loading({
                lock: true,
                text: '拼命加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let data={
                pro_id: parseInt(localStorage.getItem('proId')),
            }
            //  disIntegral:false, //积分商城兑换23
            // disMember:false, //购买会员卡赠送7
            // disPolite:false, //进店有礼8
            getmylist(data).then(function (res) {
                loading.close()
                if(res.data.code ==200){
                    let arrIdParent=[];
                    res.data.data.forEach((k)=>{
                        arrIdParent.concat(Array.from(k.children,x=>x.id));
                    })
                    if(!arrIdParent.includes(7)){
                        that.disMember=true;
                    }
                    if(!arrIdParent.includes(8)){
                        that.disPolite=true;
                    }
                    if(!arrIdParent.includes(23)){
                        that.disIntegral=true;
                    }
                    if(!arrIdParent.includes(14)){
                        that.disHit=true;
                    }
                     if(!arrIdParent.includes(20)){
                        that.disSign=true;
                    }
                    res.data.data.forEach((i)=>{
                        i.children.forEach((item)=>{
                            if(item.id===7){
                                if(item.state===0){
                                    that.disMember=true;
                                }else if(item.state===1){
                                    that.disMember=false;
                                }
                            }
                            if(item.id===8){
                                if(item.state===0){
                                    that.disPolite=true;
                                }else if(item.state===1){
                                    that.disPolite=false;
                                }
                            }
                            if(item.id===23){
                                if(item.state===0){
                                    that.disIntegral=true;
                                }else if(item.state===1){
                                    that.disIntegral=false;
                                }
                            }
                            if(item.id===14){
                                if(item.state===0){
                                    that.disHit=true;
                                }else if(item.state===1){
                                    that.disHit=false;
                                }
                            }
                            if(item.id===20){
                                if(item.state===0){
                                    that.disSign=true;
                                }else if(item.state===1){
                                    that.disSign=false;
                                }
                            }
                        })
                    })
                }else{
                    that.$message.error({
                        title: 'error',
                        message: '网络错误！'
                    });
                }
            }).catch((err)=>{
                loading.close()
                that.$message.error({
                    title: 'error',
                    message: '网络错误！'
                });
            })
        },
        handleChangeCouponNum(val){
            let that=this;
            if(val===0){
                this.change_numDec=undefined;
            }else if(val===1){
                this.change_numAdd=undefined;
            }
            this.showCouponNum=false;
            this.$nextTick(()=>{
                that.showCouponNum=true;
            })
        },
        handleChangeGrant(val){
            if(val===0){
                this.addCouponData.full_order=undefined;
            }else if(val===1){
                this.addCouponData.full_price=undefined;
            }
        },
        cancelSelect(row){
            this.tableDataApp=this.tableDataApp.filter((item)=>{
                if(item.id!=row.id){
                    return item;
                }
            })
            this.shopSelectedIdS=Array.from(this.tableDataApp,x=>x.id).join(',');
            this.wfSelectShopNum=this.tableDataApp.length;
            if(this.wfSelectShopNum>0){
                this.wfSelectShopName="修改商品";
            }else if(this.wfSelectShopNum===0){
                this.wfSelectShopName="选择商品";
            }
            this.flagTable=false;
            this.$nextTick(()=>{
                this.flagTable=true;
            })
        },
        cancelSelect3(row){
            this.tableDataApp3=this.tableDataApp3.filter((item)=>{
                if(item.id!=row.id){
                    return item;
                }
            })
            this.notShopSelectedIdS=Array.from(this.tableDataApp3,x=>x.id).join(',');
            this.updateSelectNotParams=this.tableDataApp3;
            this.wfSelectNotShopNum=this.tableDataApp3.length;
            if(this.wfSelectNotShopNum>0){
                this.wfSelectNotShopName="修改商品";
            }else if(this.wfSelectNotShopNum===0){
                this.wfSelectNotShopName="选择商品";
            }
            this.flagTable3=false;
            this.$nextTick(()=>{
                this.flagTable3=true;
            })
        },
        //发放方式callback
        handleGrant(val){
            let that = this
            let id
            val.filter((item)=>{
                if(item===3||item===6||item===7){
                    if(item===3){
                        id = 30
                    }else if(item===6){
                        id = 29
                    }else if(item===7){
                        id = 28
                    }
                    getAuditApplicationList(id).then((res)=>{
                        if(res.data.code===200){
                            if(res.data.data){
                                
                            }else{
                                that.showVersion = true;
                                if(item===3){
                                    that.addCouponData.grant = that.addCouponData.grant.map(item=>{
                                        return item!==3
                                    })
                                }else if(item===6){
                                    that.addCouponData.grant = that.addCouponData.grant.map(item=>{
                                        return item!==6
                                    })
                                }else if(item===7){
                                    that.addCouponData.grant = that.addCouponData.grant.map(item=>{
                                        return item!==7
                                    })
                                }
                            }
                        }else{
                            that.$message.error(res.data.msg+id===29?"600A00181":id===30?"600A00183":id===28?"600A00185":"");
                        }
                    }).catch((item)=>{
                        that.$message.error(res.data.msg+id===29?"600B00182":id===30?"600B00184":id===28?"600B00186":"");
                    })
                }
                return item
            })
            
            
        },
        handleChangeSpecify(currentPage){

        },
        handleChangeSpecify3(currentPage){

        },
        choose:function(val){
            this.stateVal=val;
        },
        getHandleEditType:function(coupon_other_id){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
                coupon_other_id:coupon_other_id
            };
            this.$axios.post(this.url+'shopapi/Goodtype/allIndex',data).then(res=>{
                let newTypeData=[];
                if(res.data.code===1){
                    res.data.data.forEach((el,i)=>{
                        el.children.forEach((elC)=>{
                            if(elC.use_state===1){
                                newTypeData.push(elC.id);
                            }
                        })
                        
                    });
                    //设置指定分类选中
                    that.shpopTypeKey=newTypeData;
                }else{
                    that.$message.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                    duration: 2000
                });
                }
            }).catch(err=>{
                that.$message.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                    duration: 2000
                });
            });
        },
        //已选择的商品回调函数
        handleShopSelectedId:function(selected){
            this.submitSelected=selected;
        },
        //已选择的不可用商品回调函数
        handleNotShopSelectedId:function(selected){
            this.submitNotSelected=selected;
        },
        //子分类数据回调函数
        handleChildrenChangeVal:function(val){
        },
        //商品父分类数据回调函数
        handleChange:function(val){
        },
        //指定不可用商品父分类数据回调函数
        handleNotChange:function(val){
        },
        //选择商品确定事件
        handleDialogShopVisible:function(){
            this.shopSelectedIdA=JSON.parse(JSON.stringify(this.submitSelected));
            this.tableDataApp=this.shopSelectedIdA;
            let newArr=[];
            this.shopSelectedIdA.forEach((el,i)=>{
                newArr.push(el.id);
            })
            this.shopSelectedIdS=newArr.join(',');

            this.dialogShopVisible=false;
            this.wfSelectShopName="选择商品";
            this.showShopTage=false;
            if(this.shopSelectedIdA&&this.shopSelectedIdA.length>0){
                this.wfSelectShopNum=this.shopSelectedIdA.length;
                this.wfSelectShopName="修改商品";
                this.showShopTage=true;
            }
        },
        //选择指定不可用商品
        handleDialogNotShopVisible(){
            this.notShopSelectedIdA=JSON.parse(JSON.stringify(this.submitNotSelected));
            this.tableDataApp3=this.notShopSelectedIdA;
            let newArr=[];
            this.notShopSelectedIdA.forEach((el,i)=>{
                newArr.push(el.id);
            })
            this.notShopSelectedIdS=newArr.join(',');

            this.dialogNotShopVisible=false;
            this.wfSelectNotShopName="选择商品";
            this.showNotShopTage=false;
            if(this.notShopSelectedIdA&&this.notShopSelectedIdA.length>0){
                this.wfSelectNotShopNum=this.notShopSelectedIdA.length;
                this.wfSelectNotShopName="修改商品";
                this.showNotShopTage=true;
            }
        },
        handleCloseGoods(){
            this.dialogShopVisible = false
        },
        handleCloseNotGoods(){
            this.dialogNotShopVisible = false
        },
        //选择分类确定事件
        handleDialogTypeVisible:function(){
            let allKey=this.$refs.tree.getCheckedKeys();
            //初始化
            this.wfSelectTypeName="选择分类";
            this.showTypeTage==false;
            if(allKey&&allKey.length>0){
                this.wfSelectTypeName="修改分类";
            }
            allKey.forEach((el,i)=>{
                if(el===undefined){
                    allKey.splice(i,1);
                }
            });
            if(allKey.length!=0){
                this.shpopTypeKey=allKey;
                this.wfSelectTypeNum=allKey.length;
                this.showTypeTage=true;
            }else{
                this.showTypeTage=false;
            }
            allKey=allKey.join(',');
            this.typeSelectedIdS=allKey;
            //关闭弹出
            this.dialogTypeVisible=false;
        },
        //选择商品点击事件
        couponShop:function(){
            this.selectParams=this.$store.state.couponList;
            this.dialogShopVisible=true;
        },
        //选择不可以用商品点击事件
        couponNotShop:function(){
            this.selectNotParams=this.$store.state.couponNotList;
            this.dialogNotShopVisible=true;
        },
        //选择分类点击事件
        couponType:function(){
            this.dialogTypeVisible=true;
            //获取所有商品数据
            this.getAllShopType();

        },
        //获取所有商品分类
        getAllShopType:function(){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
                page:1
            };
            this.$axios.post(this.url+'shopapi/Goodtype/typeindex',data).then(res=>{
                if(res.data.code===1){
                    that.shpopType=res.data.data;
                    that.shpopType.forEach((el,i)=>{
                        if(that.shpopType[i].id){
                           delete that.shpopType[i].id;
                        }
                        
                        if(el.children.length===0){
                            that.shpopType[i].disabled=true;
                        }
                    });
                }else{
                    this.$message.error({
                        title: 'error',
                        message: '系统出错，请联系管理员！',
                        duration: 2000
                    });
                }
            }).catch(err=>{
                this.$message.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                    duration: 2000
                });
            });
        },
        //保存
        save:function(ruleForm){
                let that=this;
                this.$refs[ruleForm].validate((valid) => {
                    let validgrant=that.addCouponData.grant.includes(4);
                    if(validgrant){
                        if(that.fullSelect===1){
                            if(!that.addCouponData.full_order){
                                that.$message.warning('满多少订单数量赠送不能为空!');
                                return false;
                            }
                        }else if(that.fullSelect===0){
                             if(!that.addCouponData.full_price){
                                that.$message.warning('成功购买多少赠送不能为空!');
                                return false;
                            }
                        }
                    }
                    if (valid) {
                        //本地调试采用mock
                        let secret=localStorage.getItem('secretId');
                        let data={
                            secret:localStorage.getItem('secretId'),//secret
                            coupon_name:that.addCouponData.coupon_name,//名称
                            coupon_price:that.addCouponData.coupon_price,//面额
                            subtraction_price:that.addCouponData.subtraction_price,//满多少使用
                            coupon_num:that.addCouponData.coupon_num,//数量
                            classify:that.addCouponData.classify,//使用限制
                            expire_type:that.addCouponData.expire_type,//期效方式
                            state: that.stateVal,//状态
                        };

                        //使用限制
                        if(that.addCouponData.classify===0){
                            data.coupon_other_id=0;
                        }else if(that.addCouponData.classify===1){
                            data.coupon_other_id=that.typeSelectedIdS;
                        }else if(that.addCouponData.classify===2){
                            data.coupon_other_id=that.shopSelectedIdS;
                        }else if(that.addCouponData.classify===3){
                            data.coupon_other_id=that.notShopSelectedIdS;
                        }

                        //期效方式
                        if(that.addCouponData.expire_type===0){
                            data.start_time=that.addCouponData.time[0];
                            data.end_time=that.addCouponData.time[1];
                        }else if(that.addCouponData.expire_type===1){
                            data.expire_time=that.addCouponData.expire_time;
                        }
                        //发放方式
                        data.grant=that.addCouponData.grant.join(',');

                        //发放方式4
                        let validgrant1=that.addCouponData.grant.includes(4);
                        if(validgrant1){
                            data.fullSelect=that.fullSelect;
                            if(that.fullSelect===0){
                                data.full_price=that.addCouponData.full_price;
                            }else if(that.fullSelect===1){
                                data.full_order=that.addCouponData.full_order;
                            }
                        }
                        //编辑
                        that.saveLoading = true;
                        if(that.$route.query.param==='edit'){
                            data.id=localStorage.getItem('id');
                            if(that.radioCouponNum||that.radioCouponNum===0){
                                data.change=that.radioCouponNum;
                                if(that.radioCouponNum===0){
                                    data.change_num=that.change_numAdd;
                                }else if(that.radioCouponNum===1){
                                    data.change_num=that.change_numDec;
                                }
                            }
                            that.$axios.post(that.url+'/shopapi/coupon/couponEdit',data).then(res=>{
                                that.saveLoading = false
                                if(res.data.code===200){
                                    that.$message.success(res.data.msg);
                                    localStorage.removeItem('id');
                                    that.$router.push({path:'/wf/admin/shop/markting/coupon',name:'coupon'});
                                }else{
                                    that.$message.warning(res.data.msg);
                                }
                            }).catch(err=>{
                                that.$message.error('网络错误!');
                                that.saveLoading = false
                            });
                        //新增
                        }else{
                            that.$axios.post(that.url+'/shopapi/coupon/couponAdd',data).then(res=>{
                                that.saveLoading = false
                                if(res.data.code===200){
                                   that.$message.success(res.data.msg);
                                    that.$router.push({path:'/wf/admin/shop/markting/coupon',name:'coupon'});
                                }else{
                                    that.$message.warning(res.data.msg);
                                }
                            }).catch(err=>{
                                that.$message.error('网络错误!');
                                that.saveLoading = false
                            });
                        }
                    } else {
                        that.$message.warning('请检查数据是否填写正确或填写完整!');
                        return false;
                    }
                });
            
            
        },
        //期效方式切换事件
        handleExpir_type:function(val){
            if(val===0){
                this.showExpire_Time=true;
                this.showExpire_Day=false;
                this.addCouponData.expire_time='';
            }else if(val===1){
                this.showExpire_Time=false;
                this.showExpire_Day=true;
                this.addCouponData.expire_time='';
            }
        },
        //使用限制改变事件
        handleClassify:function(val){
            if(val===0){
                //禁用按钮
                this.isDisabledType=true;
                this.isDisabledShop=true;
                this.isDisabledNotShop=true;
                // this.addCouponData.coupon_other_id='';
                // this.shopSelectedIdS='';
            }else if(val===1){
                //可选指定分类
                this.isDisabledType=false;
                this.isDisabledShop=true;
                this.isDisabledNotShop=true;
                // this.shopSelectedIdS='';
            }else if(val===2){
                //可选指定商品
                this.isDisabledType=true;
                this.isDisabledShop=false;
                this.isDisabledNotShop=true;
                // this.addCouponData.coupon_other_id='';
            }else if(val===3){
                //可选指定商品不可用
                this.isDisabledType=true;
                this.isDisabledShop=true;
                this.isDisabledNotShop=false;
                // this.addCouponData.coupon_other_id='';
            }
           
        }
    },
    destroyed(){
        this.$store.commit({
            type:'getCouponList',
            couponList:[],
        });
    }
}
</script>

<style lang="scss">
    .wf-addCoupon{
        background-color: #fff;
        padding: 20px;
        /deep/ .wf-delete{
            color: #e67e7a;
        }
        .wf-radioCouponNum{
            padding: 5px 0;
        }
        .wf-help{
            font-size: 12px;
            line-height: 32px;
            color: #b1b1b1;
        }
        .wf-invited{
            margin-left: 20px;
            .wf-one{
                margin-bottom: 10px;
            }
            input{
                width: 100px;
                margin: 0 15px;
                height: 28px;
            }
        }
        .wf-classify-table{
            /deep/ .el-table{
                margin-bottom: 20px;
                thead{
                    th{
                        background-color: rgb(245, 247, 250);
                    }
                }
            }
        }
        .el-form-item--mini{
            margin-bottom: 25px;
            .wf-addCoupon-coupon_name{
                padding-left: 0 !important;
            }
            .wf-addCoupon-expire_time{
                padding-left: 0 !important;
            }
            .wf-addCoupon-s{
                margin-top: 8px;
                display: block;
                .wf-addCoupon-s-btn{
                    margin-left: 20px;
                    padding: 6px 37px;
                }
                .wf-addCoupon-s-tag{
                    margin-left: 5px;
                }
            }
            .wf-addCoupon-s .el-radio{
                margin-bottom: 20px;
            }
            .wf-addCoupon-date-type{
                margin-top: -25px;
            }
            .wf-addCoupon-classify-el{
                input{
                    width: 124px;
                    margin-left: 20px;
                    padding-left: 38px;
                }
            }
        }
        .wf-addCoupon-Shop{
            .wf-addCoupon-Shop-row{
                padding: 0 22px 36px 60px;
                .wf-addCoupon-Shop-col-6{
                    margin-left: 68px;
                }
            }
            .wf-addCoupon-Shop-searchShop{
                margin-left: 35px;
            }
        }
    }
</style>
