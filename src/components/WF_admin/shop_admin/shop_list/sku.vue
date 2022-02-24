<template>
    <div class="wf-sku">
        <el-form :model="skuForm" :rules="rules" ref="skuForm" >
                <el-col :span="24" class="wf-addgoods-name">
                    <el-row>
                        <el-form-item prop="sku">
                            <el-col :span="24">
                                <el-col :span="20" v-model="skuVal" v-for="(itemi,indexi) in skuForm.sku" :key='indexi'>
                                    <el-card class="box-card" >
                                        <div slot="header" class="clearfix" >
                                            <el-col :span="2" class="name">
                                                <label>规格名称</label>
                                            </el-col>
                                            <el-col :span="16">
                                                <el-autocomplete
                                                    :disabled="advanceSaleOpen"
                                                    class="inline-input"
                                                    v-model="itemi.val"
                                                    :fetch-suggestions="querySearchName"
                                                    placeholder="请输入规格名称"
                                                    @select="handleSelectName"
                                                    size='mini'
                                                    @input="handleSelectSku(itemi,indexi)"
                                                    ></el-autocomplete>
                                            </el-col>
                                            <el-col :span="3" :offset="3">
                                                <el-col :span="8">
                                                    <el-button class="button wf-com-red-text" type="text" v-if="skuForm.sku.length>1" @click="deleteSkuParent(indexi,itemi.id)">删除</el-button>
                                                </el-col>
                                            </el-col>
                                        </div>
                                        <div class="text item" >
                                            <el-row class="header wf-card-children">
                                                <el-col :span="2" class="name">
                                                    <label>规格值</label>
                                                </el-col>
                                                <el-col :span="22">
                                                    <el-col :span="4" v-for="(item,j) in itemi.Children" :key="j" class="wf-icon-close">
                                                        <el-autocomplete
                                                        class="inline-input"
                                                        :disabled="advanceSaleOpen"
                                                        v-model="item.val"
                                                        :fetch-suggestions="querySearchVal"
                                                        placeholder="请输入规格值"
                                                        size='mini'
                                                        @select="handleSelectVal"
                                                        @input="handleSelectSkuC(itemi,indexi,j)"
                                                        @focus="fetchSuggestions(itemi,indexi)"
                                                        ></el-autocomplete>
                                                        <i class="el-icon-circle-close" @click="deleteSkuChildren(indexi,j,itemi)" v-if="itemi.Children.length>1"></i>
                                                    </el-col>
                                                </el-col>
                                            </el-row>
                                            <el-row class="add-parent">
                                                <el-col :span="8" :offset="2" class="label">
                                                    <div class="wf-add-btn children" v-if="!advanceSaleOpen">
                                                        <i class="el-icon-plus" @click="addChildrenSku(indexi,itemi.Children)"></i>
                                                        <label @click="addChildrenSku(indexi,itemi.Children)">添加规格值</label>                                                    
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-col>
                            <el-col :span="3" class="add-parent" >
                                <div class="wf-add-btn" v-if="!advanceSaleOpen">
                                    <i class="el-icon-plus" @click="addParentSku"></i>
                                    <label @click="addParentSku">添加规格</label>
                                </div>
                            </el-col>
                            <el-col :span="4" class="add-parent" >
                                <div class="wf-add-btn jump" v-if="!advanceSaleOpen">
                                    <icon name="wf-icon-link" :scale="1.75"></icon>
                                    <label @click="handleJumpSku"> 管理常用规格</label>
                                </div>
                            </el-col>
                        </el-form-item>
                        <el-form-item  prop="tableDataApp">
                            <el-col>
                                <my-table v-if="destoryTab"  ref="table" 
                                    :border="border"
                                    :tableData="skuForm.tableDataApp" 
                                    :columns="columnsApp" 
                                    :totalPage="totalPageApp"  
                                    :currentPage="currentPage"
                                    :pagination="pagination"></my-table>
                            </el-col>
                        </el-form-item>
                    </el-row>
                </el-col>
        </el-form>
        <div class="vip-price-setting" v-if="this.$store.state.type_id===3">
            会员价：
            <el-radio-group class="wf-margin-left" v-model="$store.state.member_type" @change="vipPriceChange" :disabled="advance_sale_open">
                <el-radio :label="0">统一规则</el-radio>
                <el-radio :label="1">单独自定义设置</el-radio>
            </el-radio-group>
        </div>
        <div class="vip-price-setting">
            批量设置：
            <span v-if="batchSetting===false&&batchSettingCode===false">
                <el-button :disabled="advanceSaleOpen" type="text" @click="batchShow(3,'成交价')">成交价</el-button>
                <span  v-if="$store.state.member_type===1">
                    <el-button  type="text" @click="batchShow(j,el.name)" v-for="(el,j) in memberPrice" :key="j">{{el.name}}</el-button>
                </span>
                <el-button :disabled="advanceSaleOpen" type="text" @click="batchShow(4,'库存')">库存</el-button>
                <el-button :disabled="advanceSaleOpen" type="text" @click="batchShow(6,'重量')">重量</el-button>
                <el-button :disabled="advanceSaleOpen" type="text" @click="batchShow(5,'编码')">编码</el-button>
            </span>
            <span v-if="batchSetting===true">
                {{batchText}}
                <el-input-number v-model="batchValue" style="width:100px;" :precision="2"  :controls="false"></el-input-number>
                <el-button  type="text" @click="saveBatchSetting">保存</el-button>
                <el-button  type="text" @click="batchSetting=false">取消</el-button>
            </span>
            <span v-if="batchSettingCode===true">
                {{batchText}}
                <el-input v-model="batchValueCode" style="width:100px;"  ></el-input>
                <el-button  type="text" @click="saveBatchSetting">保存</el-button>
                <el-button  type="text" @click="batchSettingCode=false">取消</el-button>
            </span>
        </div>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>

import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
import MyTable from "@/commonComponents/table/table.vue";

import {calcDescartes} from '@/untils/common.js';
import {getSpec,getSpecVal,upload,addGoodGetMemberPrice} from '@/server/addgoods';
import {imgFormat} from "@/untils/common.js";
export default {
    name: '',
    props: {
        advanceSaleOpen: { type: Boolean, default: false }
    },
    data() {
        const inituuid=require('uuid/v1');
        let that=this;
        let vSku = (rule, value, callback) => {
            if(Object.prototype.toString.call(value)==='[object Array]'){
                if(value.some((item)=>!item.val)){
                    callback(new Error('规格名称未填写完整'));
                }else if(value.some((item)=>{
                    if(item.Children.some((itemi)=>!itemi.val)){
                        return true;
                    } 
                })){
                    callback(new Error('规格值未填写完整'));
                }else{
                    callback();
                }
            }else{
                callback(new Error('表单数据填写错误'));
            }
        };
        let vTableDataApp = (rule, value, callback) => {
            if(Object.prototype.toString.call(value)==='[object Array]'){
                let flag=value.some((item)=>{
                    if(item.sku_stock&&parseFloat(item.sku_stock)>0){
                        return true;
                    }
                });
                let flagInputErr=value.some((item)=>{
                    if(item.second_level){
                        if(parseFloat(item.second_level)<parseFloat(item.first_level)){
                            return true;
                        }
                    }
                    if(item.third_level){
                        if(parseFloat(item.third_level)<parseFloat(item.second_level)||parseFloat(item.third_level)<parseFloat(item.first_level)){
                            return true;
                        }
                    }
                });
                if(value.some((item)=>!item.sku_price)){
                    callback(new Error('成交价未填写完整'));
                }else if(value.some((item)=>!flag)){
                    callback(new Error('至少有一个库存有值'));
                }else if(value.some((item)=>flagInputErr)){
                    callback(new Error('高等级会员价必须小于等于低等级会员价'));
                }else if(value.some((item)=>(!item.weight||parseFloat(item.weight)<=0))&&that.$store.state.weightMust){
                    callback(new Error('重量未填写完整'));
                }else{
                    callback();
                }
            }else{
                callback(new Error('表单数据填写错误'));
            }
        };
        return {
            memberPrice: [], // 获取会员等级前三个
            showVersion:false,//控制版本提示
            batchKey: "", // 批量设置key
            batchValue: undefined, // 批量设置的值
            batchValueCode:'',
            batchText: "", // 批量设置文字
            batchSetting: false, // 批量设置显示
            batchSettingCode:false,
            disabled:true,
            destoryTab:true,//销毁table
            suggestions_index_id: 0,
            suggestions_index:0,
            skuForm:{
                sku:[{
                    name:'skuName0',
                    val:'规格',
                    id:0,
                    Children:[{
                        val:'默认',
                        id:1
                    }]
                }],
                tableDataApp:[
                    {
                        skuName0:'默认',
                        uuid:inituuid(),
                        question_title:'',
                        sku_price:undefined,
                        sku_stock:0,
                        sku_code:undefined,
                        weight:undefined,
                        sku_thumbnail:'',
                        discount:[]
                    }
                ]
            },
            id:2,
            skuVal:'',
            border:true,
            pagination:false,
            totalPageApp:0,
            currentPage:1,
            columnsApp: [
                { 
                    prop: "skuName0", 
                    label: "规格",
                    align: "center"
                },
                { 
                    label: "成交价",
                    align: "center",
                    renderHeader(h, { column, $index }) {
                        return h('div',{
                                domProps: {
                                    innerHTML: '<span class="wf-require">*</span>'+column.label 
                                }
                            }
                        )
                    },
                    render:(h, param) => {
                        let that=this;
                        return h('el-input-number',{
                            style:'width: 70px;',
                            props: {
                                value: that.skuForm.tableDataApp[param.index].sku_price,
                                precision:2,
                                min:0.01,
                                controls:false,
                                size:'mini'
                            },
                            attrs: {
                                disabled: this.advanceSaleOpen
                            },
                            on: {
                                'blur': (event) => {
                                    if(parseFloat(event.target.value)>0){
                                        that.skuForm.tableDataApp[param.index].sku_price =event.target.value;
                                    }else{
                                        that.skuForm.tableDataApp[param.index].sku_price=undefined;
                                    }
                                   
                                    that.memberPrice.forEach((m,ki)=>{
                                         let propname='';
                                        if(ki===0){
                                            propname='first_level';
                                        }else if(ki===1){
                                            propname='second_level';
                                        }else if(ki===2){
                                            propname='third_level';
                                        }
                                        if(that.$store.state.member_type==0){
                                            if(Object.prototype.toString.call(parseInt(that.skuForm.tableDataApp[param.index].sku_price))==='[object Number]'){
                                                if(m.discount*parseFloat(that.skuForm.tableDataApp[param.index].sku_price)/10<0.01){
                                                    that.skuForm.tableDataApp[param.index][propname]=0.01;
                                                }else{
                                                    that.skuForm.tableDataApp[param.index][propname]=m.discount*parseFloat(that.skuForm.tableDataApp[param.index].sku_price)/10;
                                                }
                                            }else{
                                                that.skuForm.tableDataApp[param.index][propname]=undefined;
                                            }
                                        }
                                    })
                                    that.destoryTab=false;
                                    that.$nextTick(()=>{
                                        that.destoryTab=true;
                                    });
                                    this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
                                    event.preventDefault(); 
                                    event.stopPropagation();
                                },
                            },
                        });
                    }
                },
                { 
                    label: "库存",
                    align: "center",
                    renderHeader(h, { column, $index }) {
                        return h(
                            'div',
                            {
                                domProps: {
                                    innerHTML: '<span class="wf-require">*</span>'+column.label 
                                }
                            }
                        )
                    },
                    render:(h, param) => {
                        let that=this;
                        return h('el-input-number',{
                            style:'width: 70px;',
                            props: {
                                value: this.skuForm.tableDataApp[param.index].sku_stock,
                                precision:0,
                                controls:false,
                                size:'mini'
                            },
                            attrs:{
                                'show-file-list':false
                            },
                            on: {
                                 'blur': (event) => {
                                    if(parseInt(event.target.value)>=0){
                                        that.skuForm.tableDataApp[param.index].sku_stock =parseInt(event.target.value).toFixed(2);
                                    }else{
                                        that.skuForm.tableDataApp[param.index].sku_stock=0;
                                    }
                                    that.destoryTab=false;
                                    that.$nextTick(()=>{
                                        that.destoryTab=true;
                                    });
                                    this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
                                },
                            },
                        });
                    }
                },
                { 
                    label: "重量（KG）",
                    align: "center",
                    render:(h, param) => {
                        let that=this;
                        return h('el-input-number',{
                            style:'width: 70px;',
                            props: {
                                value: this.skuForm.tableDataApp[param.index].weight,
                                precision:2,
                                controls:false,
                                size:'mini'
                            },
                            attrs: {
                                disabled: this.advanceSaleOpen
                            },
                            on: {
                                'blur': (event) => {
                                    if(parseFloat(event.target.value)>0){
                                        that.skuForm.tableDataApp[param.index].weight = event.target.value;
                                        that.$emit('handleSkuData',that.skuForm.sku,that.skuForm.tableDataApp);
                                    }else{
                                        that.skuForm.tableDataApp[param.index].weight=undefined;
                                    }
                                   
                                },
                            },
                        });
                    }
                },
                { 
                    label: "编码",
                    align: "center",
                    render:(h, param) => {
                        let that=this;
                        return h('base-input',{
                            class:'base-input-code',
                            style:`display: block;`,
                            props: {
                                type:'text',
                                value:that.skuForm.tableDataApp[param.index].sku_code,
                            },
                            attrs: {
                               disabled: this.advanceSaleOpen 
                            },
                            on: {
                                 'blur': (value) => {
                                    that.skuForm.tableDataApp[param.index].sku_code =value;
                                    that.$emit('handleSkuData',that.skuForm.sku,that.skuForm.tableDataApp);
                                },
                                'mouseout':(value) => {
                                    that.skuForm.tableDataApp[param.index].sku_code =value;
                                    that.$emit('handleSkuData',that.skuForm.sku,that.skuForm.tableDataApp);
                                },
                            }
                            // domProps: {
                            //     // value: this.skuForm.tableDataApp[param.index].sku_code,
                            //     innerHTML : ,
                            // },
                            // on: {
                            //     'blur': (event) => {
                            //         that.skuForm.tableDataApp[param.index].sku_code = event.target.value;
                            //         // that.$emit('handleSkuData',that.skuForm.sku,that.skuForm.tableDataApp);
                            //     }
                            // },
                        });
                    }
                },
                 { 
                    label: "缩略图",
                    align: "center",
                    render:(h, param) => {
                        let that=this;
                        let actionUrl=this.url+'supper/attachment/upfile';
                        if(that.skuForm.tableDataApp[param.index].sku_thumbnail){
                            return [h('div'),[h('el-upload',{
                                props: { 
                                    action:actionUrl,
                                    'show-file-list':false,
                                    'on-success':this.onSuccess,
                                    'before-upload':this.beforeUpload,
                                },
                                attrs: {
                                    disabled: this.advanceSaleOpen
                                },
                                class: "avatar-uploader",
                            },[h('img',{
                                class: "avatar",
                                attrs:{
                                    src:this.skuForm.tableDataApp[param.index].sku_thumbnail
                                },
                                on:{
                                    click:()=>{
                                        that.selectedIndex=param.index;
                                    }
                                }
                            })]
                            )]];
                        }else{
                             return [h('div'),[h('el-upload',{
                                props: { 
                                    action:actionUrl,
                                    'show-file-list':false,
                                    'on-success':this.onSuccess,
                                    'before-upload':this.beforeUpload,
                                },
                                attrs: {
                                    disabled: this.advanceSaleOpen
                                },
                                class: "avatar-uploader",
                            },[h('i',{
                                class: "el-icon-plus avatar-uploader-icon",
                                on:{
                                    click:()=>{
                                        that.selectedIndex=param.index;
                                    }
                                }
                            })]
                            )]];
                        }
                    }
                },
            ],
            restaurantsName:[],
            restaurantsVal:[],
            selectedIndex:0,
            rules:{
                sku: [
                    { required: true, validator: vSku, trigger: 'blur' }
                ],
                tableDataApp: [
                    { required: true, validator: vTableDataApp, trigger: 'blur' }
                ]
            },
            indexi:0
        }
    },
    components: {
        MyTable,
        versionCom,
        
    },
    computed:{
        getSkuInfoFlag(){
            return this.$store.state.skuInfoFlag;
        }
    },
    created(){
        this.initPage();
    },
    mounted(){
        this.getMemberPrice();
        if(!this.$route.query.param){
            this.skuForm.tableDataApp[0].valAssemble=['默认'];
            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
        }
    },
    methods: {
        fetchSuggestions(item,index){
            this.suggestions_index_id = item.val;
            this.suggestions_index = index;
        },
        saveBatchSetting(){ // 保存批量设置
            let that=this;
            if(this.batchKey===0){
                if(this.$store.state.member_type==1){
                    this.skuForm.tableDataApp.forEach((el,index) => {
                        if(parseInt(that.batchValue)>parseInt(that.skuForm.tableDataApp[index].sku_price)
                            &&parseInt(that.batchValue)>0){
                            el.first_level = that.skuForm.tableDataApp[index].sku_price;
                        }else{
                            el.first_level =that.batchValue;
                        }
                    });
                }else{
                    this.batchSetting = false
                    this.batchValue = undefined
                }
                
            }else if(this.batchKey===1){
                if(this.$store.state.member_type==1){
                    this.skuForm.tableDataApp.forEach((el,index) => {
                        if(parseInt(that.batchValue)>parseInt(that.skuForm.tableDataApp[index].sku_price)
                            &&parseInt(that.batchValue)>0){
                            el.second_level = that.skuForm.tableDataApp[index].sku_price;
                        }else{
                            el.second_level =that.batchValue;
                        }
                    });
                }else{
                    this.batchSetting = false
                    this.batchValue = undefined
                }
            }else if(this.batchKey===2){
                if(this.$store.state.member_type==1){
                    this.skuForm.tableDataApp.forEach((el,index) => {
                        if(parseInt(that.batchValue)>parseInt(that.skuForm.tableDataApp[index].sku_price)
                            &&parseInt(that.batchValue)>0){
                            el.third_level = that.skuForm.tableDataApp[index].sku_price;
                        }else{
                            el.third_level =that.batchValue;
                        }
                    });
                }else{
                    this.batchSetting = false
                    this.batchValue = undefined
                }
            }else if(this.batchKey===3){
                this.skuForm.tableDataApp.forEach(el => {
                    el.sku_price = this.batchValue
                    if(this.memberPrice[0]){
                        el.first_level = this.memberPrice[0].discount*el.sku_price/10
                    }
                    if(this.memberPrice[1]){
                        el.second_level = this.memberPrice[1].discount*el.sku_price/10
                    }
                    if(this.memberPrice[2]){
                        el.third_level = this.memberPrice[2].discount*el.sku_price/10
                    }
                });
            }else if(this.batchKey===4){
                this.skuForm.tableDataApp.forEach(el => {
                    el.sku_stock = this.batchValue
                });
            }else if(this.batchKey===5){
                this.skuForm.tableDataApp.forEach(el => {
                    el.sku_code = this.batchValueCode
                });
            }else if(this.batchKey===6){
                this.skuForm.tableDataApp.forEach(el => {
                    el.weight = this.batchValue
                });
            }
            this.destoryTab=false;
            this.$nextTick(()=>{
                this.destoryTab=true;
            });
            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
            this.batchSetting = false;
            this.batchSettingCode=false;
            this.batchValue = undefined;
            this.batchValueCode='';
           
        },
        batchShow(key,name){ // 打开批量设置
            if(key==5){
                this.batchKey = key
                this.batchSettingCode = true
                this.batchSetting=false
                this.batchText = name
            }else{
                this.batchKey = key
                this.batchSetting = true
                this.batchText = name
            }
            
        },
        vipPriceChange(val){ // 会员价类型
            let that=this;
            if(val===0){
                this.disabled = true;
                this.skuForm.tableDataApp.forEach((s,si)=>{
                    that.memberPrice.forEach((m,ki)=>{
                        let propname='';
                        if(ki===0){
                            propname='first_level';
                        }else if(ki===1){
                            propname='second_level';
                        }else if(ki===2){
                            propname='third_level';
                        }
                        if(Object.prototype.toString.call(parseInt(that.skuForm.tableDataApp[si].sku_price))==='[object Number]'){
                            if(m.discount*parseFloat(that.skuForm.tableDataApp[si].sku_price)/10<0.01){
                                that.skuForm.tableDataApp[si][propname]=0.01;
                            }else{
                                that.skuForm.tableDataApp[si][propname]=m.discount*parseFloat(that.skuForm.tableDataApp[si].sku_price)/10;
                            }
                        }else{
                            that.skuForm.tableDataApp[si][propname]=undefined;
                        }
                    })
                })
                
                this.$store.commit({
                    type:'getMember_type',
                    member_type:val,
                });
                this.destoryTab=false;
                this.$nextTick(()=>{
                    that.destoryTab=true;
                });
                this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
            }else{
                 const loading = this.$loading({
                    lock: true,
                    text: '正在校验权限...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                getAuditApplicationList(11).then((res)=>{
                    loading.close();
                    if(res.data.code===200){
                        if(res.data.data===false){
                            that.disabled = true
                            that.showVersion = true;
                            this.$store.commit({
                                type:'getMember_type',
                                member_type:0,
                            });
                        }else{
                            that.showVersion = false;
                            this.$store.commit({
                                type:'getMember_type',
                                member_type:val,
                            });
                            that.disabled = false;
                            that.skuForm.tableDataApp.forEach((s,si)=>{
                                that.memberPrice.forEach((m,ki)=>{
                                    let propname='';
                                    if(ki===0){
                                        propname='first_level';
                                    }else if(ki===1){
                                        propname='second_level';
                                    }else if(ki===2){
                                        propname='third_level';
                                    }
                                    that.skuForm.tableDataApp[si][propname]=undefined;
                                })
                            })
                            that.destoryTab=false;
                            that.$nextTick(()=>{
                                that.destoryTab=true;
                            });
                        }
                        that.$emit('handleSkuData',that.skuForm.sku,that.skuForm.tableDataApp);
                    }else{
                        loading.close();
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
                // this.disabled = false
                // this.sku.forEach(el => {
                //     if(this.memberPrice[0]){
                //         el.first_level = undefined
                //     }
                //     if(this.memberPrice[1]){
                //         el.second_level = undefined
                //     }
                //     if(this.memberPrice[2]){
                //         el.third_level = undefined
                //     }
                // });
            }
        },
        validateForm() {
            let flag = false
            this.$refs['skuForm'].validate((valid) => {
                flag = valid
            })
            return flag
        },
        onSuccess(file){
            let that=this;
            if(file.code===0){
                this.skuForm.tableDataApp[this.selectedIndex].sku_thumbnail=imgFormat(file.data.src,'q',75);
                this.destoryTab=false;
                this.$nextTick(()=>{
                    that.destoryTab=true;
                });
                this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
            }else{
                this.$message.error("图片上传失败");
            }
        },
        getMemberPrice(){ // 获取会员等级前三个
            let that = this
            let data ={ 
                pro_id:localStorage.getItem('proId')
            }
            addGoodGetMemberPrice(data).then((res)=>{
                if(res.data.code===200){
                    that.memberPrice = res.data.data;
                    let member=res.data.data.map((item,index)=>{
                        let propname='';
                        if(index===0){
                            propname='first_level';
                        }else if(index===1){
                            propname='second_level';
                        }else if(index===2){
                            propname='third_level';
                        }
                        that.columnsApp.splice((that.skuForm.sku.length+1+index),0,{ 
                            prop: propname, 
                            label: item.name,
                            align: "center",
                            renderHeader(h, { column, $index }) {
                                return h(
                                    'div',
                                    {
                                        domProps: {
                                            innerHTML: '<span class="wf-require">*</span>'+column.label 
                                        }
                                    }
                                )
                            },
                            render:(h, param) => {
                                let that=this;
                                return h('el-input-number',{
                                    style:'width: 70px;',
                                    props: {
                                        value: that.skuForm.tableDataApp[param.index][propname],
                                        precision:2,
                                        min:0.01,
                                        controls:false,
                                        size:'mini',
                                        disabled:that.disabled
                                    },
                                    on: {
                                        'blur': (event) => {
                                            if(parseFloat(event.target.value)>0){
                                                if(parseFloat(event.target.value)<=parseFloat(that.skuForm.tableDataApp[param.index].sku_price)
                                                &&parseFloat(event.target.value)>0){
                                                    that.skuForm.tableDataApp[param.index][propname]=parseFloat(event.target.value);
                                                }else if(parseFloat(event.target.value)>parseFloat(that.skuForm.tableDataApp[param.index].sku_price)
                                                &&parseFloat(event.target.value)>0){
                                                    that.skuForm.tableDataApp[param.index][propname]=parseFloat(that.skuForm.tableDataApp[param.index].sku_price);
                                                }else{
                                                    that.skuForm.tableDataApp[param.index][propname]=undefined;
                                                }
                                            }else{
                                                that.skuForm.tableDataApp[param.index][propname]=undefined;
                                            }
                                            that.destoryTab=false;
                                            that.$nextTick(()=>{
                                                that.destoryTab=true;
                                            });
                                            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
                                        },
                                    },
                                });
                            }
                        });
                    });                    
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        beforeUpload(file){
            let size = file.size/1024/1024;
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }else{
                return true
            }
            if(size>2){
                this.$message.warning("图片不能大于2M");
                return false;
            }else{
                return true;
            }
        },
        handleJumpSku(){
            let jumpSku = this.$router.resolve({path:"/wf/admin/shop/sku_setting"});
            window.open(jumpSku.href, '_blank');
        },
        initPage(){
            let that=this;
            let data={
                secret: localStorage.getItem('secretId')
            }
            getSpec(data).then((newData)=>{
                if(newData.data.code===200){
                    that.restaurantsName=[];
                    newData.data.data.forEach((item)=>{
                        that.restaurantsName.push({
                            value:item.spec_name,
                            id:item.id
                        })
                    })
                }else{
                    that.$message.error(newData.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('网络错误');
            });
        },
        addChildrenSku(index,addItem){
            //uuid组合唯一id备用
            const uuid=require('uuid/v1');
            this.skuForm.sku[index].Children.push({
                val:'',
                id:this.id,
            });
            this.id++;
            let that=this;
            let newSku=calcDescartes(this.skuForm.sku);
            this.skuForm.tableDataApp.push({
                [this.skuForm.sku[index].name]:newSku[this.skuForm.sku[index].Children.length-1][index].val,
                uuid:uuid(),
                sku_price:undefined,
                sku_stock:0,
                sku_code:undefined,
                sku_thumbnail:'',
                discount:[]
            });
            this.destoryTab=false;
            this.$nextTick(()=>{
                that.destoryTab=true;
            });
            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
        },
        deleteSkuChildren(index,j,item){
            let that=this;
            //通过id移除组合
            this.skuForm.tableDataApp=this.skuForm.tableDataApp.filter((items)=>{
                if(items.idAssemble){
                    return !items.idAssemble.some((itemi)=>{
                        return itemi===that.skuForm.sku[index].Children[j].id;
                    });
                }else{
                    return false;
                }
            });
            //移除组合源
            this.skuForm.sku[index].Children.splice(j,1);
            this.destoryTab=false;
            this.$nextTick(()=>{
                that.destoryTab=true;
            });
            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
        },
        addParentSku(){
            let that=this;
            let newid=this.id+1;
            this.skuForm.sku.push({
                name:"skuName"+this.id,
                val:'',
                id:this.id,
                Children:[{
                    val:'',
                    id:newid
                }]
            });
            this.columnsApp.splice(this.skuForm.sku.length-1,0,{ 
                prop: "skuName"+this.id, 
                label: this.skuForm.sku[this.skuForm.sku.length-1].val,
                align: "center",
            });
            this.destoryTab=false;
            this.$nextTick(()=>{
                that.destoryTab=true;
            });
            this.id+=2;
            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
        },
        deleteSkuParent(index,parentId){
            let that=this;
            //移除table列
            this.columnsApp.splice(index,1);
            //移除当列所有值
            this.skuForm.tableDataApp=this.skuForm.tableDataApp.map((items)=>{
                let newObj=Object.keys(items).filter(key=>{
                    if(key.includes('skuName')){
                        if(key.split('skuName')[1]==parentId){
                            return false
                        }else{
                            return key;
                        }
                    }else{
                        return key;
                    }
                });
                let getObj=that.getTargetObject(items,newObj);
                return getObj;
            });
            let starrtCount=1;//过滤开始条数
            let allCount=1;//总过滤条数
            //计算starrtCount和allCount
            this.skuForm.sku.map((item,i)=>{
                if(item.id>=parentId){
                    if(item.Children.length!=0){
                        allCount*=item.Children.length;
                    }
                }
                if(i>=index+1){
                    starrtCount*=item.Children.length;
                }
            });
            //过滤多余组合
            this.skuForm.tableDataApp=this.skuForm.tableDataApp.filter((item,i)=>{
                if(i%allCount-starrtCount<0){
                    return item;
                }
            });
            //移除组合源
            this.skuForm.sku.splice(index,1);
            //通过新组合源重新生成idAssemble和valAssemble
            this.skuForm.tableDataApp=this.skuForm.tableDataApp.map((items)=>{
                let newIdAssemble=[];
                let newValAssemble=[];
                that.skuForm.sku.forEach((item)=>{
                    item.Children.forEach((itemk)=>{
                        if(items.idAssemble.includes(itemk.id)){
                            newIdAssemble.push(itemk.id);
                            newValAssemble.push(itemk.val);
                        }
                    })
                });
                let getObj=items;
                getObj.idAssemble=newIdAssemble;
                getObj.valAssemble=newValAssemble;
                return getObj;
            });
            //强刷
            this.destoryTab=false;
            this.$nextTick(()=>{
                that.destoryTab=true;
            });
            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
        },
        getTargetObject(targetObject, propsArray) {
            if (typeof (targetObject) !== "object" || !Array.isArray(propsArray)) {
                throw new Error("参数格式不正确");
            }
            const result = {};
            Object.keys(targetObject).filter(key => propsArray.includes(key)).forEach(key => {
                result[key] = targetObject[key];
            })
            return result;
        },
        querySearchName(queryString, cb){
            let restaurants = this.restaurantsName;
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
           
        },
        querySearchVal(queryString, cb){
            let id=0;
            this.restaurantsName.some((item)=>{
                if(item.value===this.suggestions_index_id){
                    id=item.id;
                    return true;
                }
            })
            let data={
                secret: localStorage.getItem('secretId'),
                id:id
            } 
            let that=this;
            getSpecVal(data).then((newData)=>{
                let resArr=[];
                let restaurants = resArr;
                if(newData.data.code===200){
                    
                    newData.data.data.forEach((item)=>{
                        resArr.push({
                            value:item.spec_name,
                            id:item.id
                        })
                    })
                }
                let results = queryString ? restaurants.filter(that.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            }).catch((err)=>{
                that.$message.error(err.message);
            });
           
        },
        createFilter(queryString) {
            return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelectName(item){
            //触发规格名称改变，通过规格名称id查询相应规格值 
            //查询规格值 getSpecVal()
            let data={
                secret: localStorage.getItem('secretId'),
                id:item.id
            } 
            let that=this;
            getSpecVal(data).then((newData)=>{
                if(newData.data.code===200){
                    that.restaurantsVal[that.indexi]=[];
                    newData.data.data.forEach((item)=>{
                        that.restaurantsVal[that.indexi].push({
                            value:item.spec_name,
                            id:item.id
                        })
                    })
                }
            }).catch((err)=>{
                that.$message.error(newData.data.msg);
            });
        },
        handleSelectVal(item){
        },
        handleSelectSku(item,index){
            let that=this;
            this.$set(this.columnsApp[index],'label',item.val);
            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
            this.destoryTab=false;
            this.$nextTick(()=>{
                that.destoryTab=true;
            });
        },
        handleSelectSkuC(itemParent,indexParentIndex,childrenIndex){
            this.skuForm.sku[indexParentIndex].Children[childrenIndex].val=itemParent.Children[childrenIndex].val;
            let that=this;
            //newSku是通过算法生成的完整组合
            let newSku=calcDescartes(this.skuForm.sku);
            this.columnsApp.forEach((item,i)=>{
                //处理columnsApp中的规格
                if(i<that.columnsApp.length-that.memberPrice.length-4){
                    newSku.forEach((itemj,j)=>{
                        //提取数组集合
                        let idAssemble=itemj.map((iteme)=>iteme.id);
                        let valAssemble=itemj.map((iteme)=>iteme.val);
                        itemj.forEach((itemk,k)=>{
                            //处理父类id和子类id
                            if(!that.skuForm.tableDataApp[j]){
                                //uuid组合唯一id备用
                                const uuid=require('uuid/v1');
                                that.skuForm.tableDataApp[j]={
                                    uuid:uuid(),
                                    idAssemble:idAssemble,
                                    valAssemble:valAssemble,
                                    question_title:'',
                                    sku_price:undefined,
                                    sku_stock:0,
                                    sku_code:undefined,
                                    weight:undefined,
                                    sku_thumbnail:'',
                                };
                            }else{
                                that.skuForm.tableDataApp[j].idAssemble=idAssemble;
                                that.skuForm.tableDataApp[j].valAssemble=valAssemble;
                            }
                            //追价会员价
                            let objMemberPrice={};
                            that.memberPrice.forEach((m,ki)=>{
                                let propname='';
                                if(ki===0){
                                    propname='first_level';
                                }else if(ki===1){
                                    propname='second_level';
                                }else if(ki===2){
                                    propname='third_level';
                                }
                                if(Object.prototype.toString.call(parseInt(that.skuForm.tableDataApp[j].sku_price))==='[object Number]'&&that.$store.state.member_type===0){
                                    //member_type=0标志统一规则
                                    objMemberPrice[propname]=m.discount*parseFloat(that.skuForm.tableDataApp[j].sku_price)/10;
                                }else if(Object.prototype.toString.call(parseInt(that.skuForm.tableDataApp[j].sku_price))==='[object Number]'&&that.$store.state.member_type===1){
                                    //member_type=1 自定义规则
                                    objMemberPrice[propname]=that.skuForm.tableDataApp[j][propname];
                                }else{
                                    objMemberPrice[propname]=undefined;
                                }
                            });
                            
                            //合并会员价
                            Object.assign(that.skuForm.tableDataApp[j],objMemberPrice);
                            //动态强刷新视图
                            that.$set(that.skuForm.tableDataApp[j],that.columnsApp[k].prop,itemj[k].val);
                        })
                    })
                }
            });
            this.destoryTab=false;
            this.$nextTick(()=>{
                that.destoryTab=true;
            });
            this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
        },
    },
    watch:{
        getSkuInfoFlag:{
            handler(val,oldVal){
                if(this.$store.state.skuInfoFlag&&this.$store.state.skuInfo.spec_name.length>0){
                    let that=this;
                    let info=this.$store.state.skuInfo;
                    this.skuForm.sku=[];
                    let count=0;
                    //uuid组合唯一id备用
                    const uuid=require('uuid/v1');
                    info.spec_name.forEach((item,i)=>{
                        that.skuForm.sku.push({
                            name:'skuName'+count,
                            val:item,
                            id:count,
                            Children:[]
                        });
                        info.spec_son_name[i].forEach((itemj,j)=>{
                            count++;
                            that.skuForm.sku[i].Children.push({
                                val:itemj,
                                id:count
                            });
                        });
                        that.id=count+1;
                        count++;
                    });
                    //清空规格信息表头
                    this.columnsApp=this.columnsApp.filter((item,i)=>{
                        if(item.prop){
                            if(item.prop.includes('skuName')){
                                return false;
                            }else{
                                return item;
                            }
                        }else{
                            return item;
                        }
                    });
                    //规格信息表头处理
                    this.skuForm.sku.forEach((item,i)=>{
                        that.columnsApp.splice(i,0,{
                            prop: item.name, 
                            label: item.val,
                            align: "center",
                        })
                    });
                    //规格信息表处理
                    let getCalcDescartesArr=calcDescartes(this.skuForm.sku);
                    //清空规格信息表
                    this.skuForm.tableDataApp=Array.apply([],{length:getCalcDescartesArr.length}).map(item=>({}));
                    let newsku_info=JSON.parse(JSON.stringify(info.sku_info));
                    calcDescartes(this.skuForm.sku).forEach((itemc,c)=>{
                        //采用some查找到完全相同组合结束该次循环，等待下一次循环
                        let idAssemble=[],valAssemble=[];
                        if(itemc.length>0){
                            idAssemble=itemc.map((iteme)=>iteme.id);
                            valAssemble=itemc.map((iteme)=>iteme.val);
                        }
                        let flagDesc=newsku_info.some((itemN,nIndex)=>{
                            let spec_son_nameArr=itemN.spec_son_name.split(',');
                            let num=0;
                            spec_son_nameArr.forEach((cur,index)=>{
                                if(itemc.length===spec_son_nameArr.length){
                                    if(cur===itemc[index].val){
                                        num++;
                                    }
                                }
                            });
                            /**
                             * 判断规格组合是否完全相等，
                             * @param spec_son_nameArr.length 总长度
                             * @param num 相等总计数量
                             */
                            if(num===spec_son_nameArr.length){
                                itemc.forEach((iteme,e)=>{
                                    that.skuForm.tableDataApp[c][that.skuForm.sku[e].name]=itemc[e].val;
                                });
                                that.skuForm.tableDataApp[c].uuid=uuid();
                                if(newsku_info[nIndex].price){
                                    that.skuForm.tableDataApp[c].sku_price=newsku_info[nIndex].price;
                                }else{
                                    that.skuForm.tableDataApp[c].sku_price=undefined;
                                }
                                if(newsku_info[nIndex].stock){
                                    that.skuForm.tableDataApp[c].sku_stock=newsku_info[nIndex].stock;
                                }else{
                                    that.skuForm.tableDataApp[c].sku_stock=0;
                                }
                                that.skuForm.tableDataApp[c].weight=newsku_info[nIndex].weight;
                                that.skuForm.tableDataApp[c].sku_thumbnail=newsku_info[nIndex].sku_thumbnail;
                                that.skuForm.tableDataApp[c].valAssemble=valAssemble;
                                that.skuForm.tableDataApp[c].idAssemble=idAssemble;
                                that.skuForm.tableDataApp[c].sku_code=newsku_info[nIndex].sku_code;
                                if(!that.$store.state.skuEditFlag){
                                    newsku_info.splice(nIndex,1);
                                }
                                //删除已比较过的数组，减少循环
                                return true;
                            }
                        })
                        if(!flagDesc){
                            //uuid组合唯一id备用
                            const uuid=require('uuid/v1');
                            that.skuForm.tableDataApp[c]={
                                uuid:uuid(),
                                idAssemble:idAssemble,
                                valAssemble:valAssemble,
                                sku_price:undefined,
                                sku_stock:0,
                                sku_code:undefined,
                                weight:undefined,
                                sku_thumbnail:'',
                            };
                            that.skuForm.sku.forEach((d,eIndex)=>{
                                that.skuForm.tableDataApp[c]['skuName'+d.id]=itemc[eIndex].val;
                            })
                        }
                        let objMemberPrice={};
                         if(!that.$store.state.skuEditFlag){
                            that.memberPrice.forEach((m,ki)=>{
                                let propname='';
                                if(ki===0){
                                    propname='first_level';
                                }else if(ki===1){
                                    propname='second_level';
                                }else if(ki===2){
                                    propname='third_level';
                                }
                                objMemberPrice[propname]=m.discount;
                                if(that.$store.state.member_type==1){
                                    objMemberPrice[propname]=undefined;
                                    that.disabled = false;
                                }else{
                                    that.disabled = true;
                                    if(Object.prototype.toString.call(parseInt(that.skuForm.tableDataApp[c].sku_price))==='[object Number]'){
                                        objMemberPrice[propname]=m.discount*parseFloat(that.skuForm.tableDataApp[c].sku_price)/10;
                                    }else{
                                        objMemberPrice[propname]=undefined;
                                    }
                                }
                            });
                        }
                        //合并会员价
                        Object.assign(that.skuForm.tableDataApp[c],objMemberPrice);
                    })
                    if(this.$store.state.skuEditFlag){
                         //追价会员价
                        this.skuForm.tableDataApp.forEach((m,ki)=>{
                            newsku_info.forEach((kA,iA)=>{
                                let propname='';
                                if(iA===0){
                                    propname='first_level';
                                }else if(iA===1){
                                    propname='second_level';
                                }else if(iA===2){
                                    propname='third_level';
                                }
                                if(m.valAssemble.toString()===kA.spec_son_name){
                                    that.memberPrice.forEach((mp,imp)=>{
                                        let propname='';
                                        if(imp===0){
                                            propname='first_level';
                                        }else if(imp===1){
                                            propname='second_level';
                                        }else if(imp===2){
                                            propname='third_level';
                                        }
                                        that.skuForm.tableDataApp[ki][propname]=kA[propname];
                                    })
                                }
                            })
                        })
                        //初始化规格名称搜索
                        this.initPage();
                        if(this.$store.state.member_type===1){
                            this.disabled = false;
                        }else{
                            this.disabled = true;
                        }
                    }
                    this.destoryTab=false;
                    this.$nextTick(()=>{
                        that.destoryTab=true;
                    });
                    this.$emit('handleSkuData',this.skuForm.sku,this.skuForm.tableDataApp);
                    /**
                     * 关闭标记
                     */
                    that.$store.commit({
                        type:'getSkuInfoFlag',
                        skuInfoFlag:false,
                    });
                    /**
                     * 关闭标记
                     */
                    that.$store.commit({
                        type:'getSkuEditFlag',
                        skuEditFlag:false,
                    });
                }
            },
            deep:true
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/shoplist/sku.scss';
</style>