<template>
    <div class="wf-depositAdd">
       <el-form label-width="180px" 
        :model="depositAdd"  
        :label-position="labelPosition" 
        :rules="rules"
        ref="depositAdd"
        class="wf-form">
            <el-row>
                <el-form-item label="活动名称:" size="mini" prop="name"  v-if="$route.query.param!='views'">
                    <el-col :span="5">
                        <el-input class="wf-active-name" v-model="depositAdd.name"  :maxlength="20"></el-input>
                        <span class="wf-textareaVaild ">{{depositAdd.name.length}}/20</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动名称:" size="mini" prop="name"  v-if="$route.query.param==='views'">
                    {{depositAdd.name}}
                </el-form-item>
                <el-form-item label="活动商品:" size="mini" prop="good_id" >
                    
                    <el-row v-if="$route.query.param!='views'&&$route.query.param!='edit'">
                        <el-col :span="5">
                            <el-button size="mini" type="primary" :disabled="isDisabledShop" class="wf-addCoupon-s-btn"  @click="depositShop" >{{wfSelectShopName}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12" class="wf-classify-table" >
                            <my-table 
                                :tableData="tableDataApp" 
                                :pagination="false" 
                                :columns="columnsApp" 
                                :totalPage="totalPageApp"  
                                :currentPage="currentPage" 
                                :border="true"></my-table>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="活动定金:" size="mini">
                    <el-col :span="24">
                       <my-table 
                            :tableData="tableDataApp1" 
                            :pagination="false" 
                            :columns="columnsApp1" 
                            :totalPage="totalPageApp1"  
                            :currentPage="currentPage1" 
                            @multipleSelection="handleSelectionChange"
                            :border="true"
                            ref="tableActive"
                            :reserveSelection="true"
                            v-if="showTable"
                            ></my-table>
                        <div class="vip-price-setting" v-if="tableDataApp1.length>0&&$route.query.param!='views'&&$route.query.param!='edit'" >
                            批量设置：
                            <span v-if="batchSetting===false">
                                <el-button type="text" @click="batchShow(-1,'定金可抵')">定金可抵</el-button>
                                <span >
                                    <el-button  type="text" @click="batchShow(j,el.name+'定金可抵')" v-for="(el,j) in memberPrice" :key="j">{{el.name}}定金可抵</el-button>
                                </span>
                            </span>
                            <span v-if="batchSetting===true">
                                {{batchText}}
                                <el-input-number v-model="batchValue" style="width:100px;" :precision="2"  :controls="false"></el-input-number>
                                <el-button  type="text" @click="saveBatchSetting">保存</el-button>
                                <el-button  type="text" @click="batchSetting=false">取消</el-button>
                            </span>
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item label="定金支付时间:" size="mini"  v-if="depositAdd.front_start_time">
                    <el-col :span="24">
                        {{depositAdd.front_start_time}} - {{depositAdd.front_end_time}}
                    </el-col>
                </el-form-item>
                <el-form-item label="尾款支付时间:" size="mini"  v-if="depositAdd.tail_start_time">
                    <el-col :span="5">
                        {{depositAdd.tail_start_time}} - {{depositAdd.tail_end_time}}
                    </el-col>
                </el-form-item>
                <el-form-item label="发货时间:" size="mini" v-if="depositAdd.time_state||depositAdd.time_state===0">
                    <el-row>
                        <el-col class="wf-limit" v-if="depositAdd.time_state===0">
                            <span class="wf-color-font">{{depositAdd.advance_time}}</span>
                            开始发货
                        </el-col>
                        <el-col class="wf-two" v-if="depositAdd.time_state===1">
                            尾款支付
                            <span class="wf-color-font">{{depositAdd.advance_time}}</span>
                            天后发货
                        </el-col>
                    </el-row>
                    <el-col  class="wf-help" >
                        <span >1-60天后发货，请务必按照约定时间发货以免引起客户投诉。</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动结束后商品状态:" size="mini" prop="end_state">
                    <el-col :span="5">
                        <el-radio-group v-model="depositAdd.end_state" :disabled="endStateDisabled">
                            <el-radio :label="0">正常销售</el-radio>
                            <el-radio :label="1">商品下架</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="限购:" size="mini" prop="limit" >
                    <el-checkbox v-model="depositAdd.quotaFlag"  :disabled="quotaFlagDisabled">
                        开启限购，限制每个账号累计限购
                        <el-input-number v-model="depositAdd.quota" size="mini" :controls="false" v-if="$route.query.param!='views'"></el-input-number>
                        <el-button type="text" v-if="$route.query.param==='views'" >{{depositAdd.quota}}</el-button>件
                    </el-checkbox>
                </el-form-item>
                    <el-form-item label="活动规则:" size="mini" >
                    <el-col :span="12" class="wf-rule">
                        可使用储值卡支付，不可与其他优惠叠加使用（其他优惠：优惠券、满减、积分抵现、折扣卡）
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-button :loading="saveLoading"  v-if="$route.query.param!='views'"  size="mini" type="primary"  @click="save('depositAdd')">保存</el-button>
                    <router-link to="/wf/admin/shop/markting/deposit">
                        <el-button size="mini" type="primary">返回</el-button>
                    </router-link>
                </el-form-item>
            </el-row>
        </el-form>
        <modelView 
        v-if="dialogShopVisible" 
        v-on:handleShopslist="handleShopslist"  
        v-on:shopSelectedId="handleShopSelectedId" 
        :selectParams="selectParams"/>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import modelView from "./modelView.vue";
import {getGoodInfo ,frontAdd ,frontShow } from "@/server/depositAdd";
import {dateFormat} from "@/untils/common.js";
import {addGoodGetMemberPrice} from '@/server/addgoods';
export default {
    name: '',
    data() {
        return {    
            labelPosition:'right',
            showTable:true,
            mutiSelect:true,
            saveLoading:false,
            endStateDisabled:false,//活动结束后商品状态详情
            quotaFlagDisabled:false,//开启限购详情
            depositAdd:{
                name:'',
                good_id:undefined,
                front_start_time:'',
                front_end_time:'',
                tail_start_time:'',
                tail_end_time:'',
                time_state:undefined,
                advance_time:'',
                quotaFlag:false,
                quota:0,
                radioSt:1,
                time_state:'',
                end_state:0,
                range:'',//优惠金额
                limitDate:[]
            },
            memberPrice:[],
            batchSetting:false,
            batchText:'',
            disabled:false,
            selectedData:[],
            rules:{
                name: [
                    { required: true, message: '活动名称不能为空', trigger: 'blur' }
                ],
                end_state:[
                    { required: true, message: '请选择活动结束后商品状态', trigger: 'change' }
                ],
                good_id:[
                    { required: true, message: '请选择活动商品', trigger: 'change' }
                ]
            },
            isDisabledShop:false,
            wfSelectShopName:'添加商品',

            dialogShopVisible:false,
            selectParams:[],
            tableDataApp:[],
            totalPageApp:0,
            currentPage:1,
            columnsApp: [
                { 
                    prop: "name", 
                    label: "商品",
                    align: "left",
                },
                { 
                    prop: "price", 
                    width:'150',
                    label: "原价(元)",
                    align: "center",
                }
            ],
            batchValue:undefined,
            tableDataApp1:[],
            totalPageApp1:0,
            currentPage1:1,
            columnsApp1: [
                { 
                    prop: "spec_name", 
                    label: "商品规格尺寸",
                    align: "left",
                },
                { 
                    prop: "sku_price", 
                    label: "预售价格(元)",
                    align: "center",
                },
                { 
                    prop: "front_money", 
                    label: "预售定金(元)",
                    align: "center",
                },{ 
                    label: "定金可抵",
                    align: "center",
                    render:(h, param) => {
                        let that=this;
                        let htmlShow= h('el-input-number',{
                            style:'width: 70px;',
                            props: {
                                value: param.row.pledge,
                                precision:2,
                                controls:false,
                                size:'mini'
                            },
                            on: {
                                blur: (event) => {
                                    let newrow=param.row;
                                    if(parseFloat(event.target.value)<parseFloat(that.tableDataApp1[param.index].front_money)
                                    ||parseFloat(event.target.value)>parseFloat(that.tableDataApp1[param.index].sku_price)||event.target.value==0){
                                        newrow.pledge=undefined;                                          
                                        that.$message({
                                            message:'定金可抵需大于或等于预售定金并且小于预售价格',
                                            type:'warning',
                                            duration:5000});
                                    }else if(event.target.value){
                                        newrow.pledge=parseFloat(event.target.value).toFixed(2);
                                        newrow.first_pledge=undefined;
                                        newrow.second_pledge=undefined;
                                        newrow.third_pledge=undefined;
                                    }
                                    that.tableDataApp1.splice(param.index,1,newrow);   
                                }
                            },
                        });
                        let htmlLabel=h('span',{},param.row.pledge);
                        if(this.$route.query.param==='views'||this.$route.query.param==='edit'){
                            return [h('div'),htmlLabel];
                        }else{
                            return [h('div'),htmlShow];
                        }
                    }
                },{  
                    label: "优惠金额(元)",
                    align: "center",
                    render:(h, param) => {
                        let range='';
                        if(param.row.range
                        &&!Number.isNaN(parseFloat(param.row.range))
                        &&param.row.range!=undefined
                        &&Math.abs(param.row.range)!=0){
                            range=param.row.range;
                        }
                        return h('el-button',{
                            class:'wf-range',
                            props:{
                                type:'text',
                            }
                        },range);
                    }
                },
            ],
            submitSelected:[],
        }
    },
    components: {
        MyTable,
        modelView
    },
    created(){

    },
    mounted(){
         if(this.$route.query.param==='edit'){
            this.$route.meta.title="编辑定金膨胀";
            this.wfSelectShopName='修改商品';
            this.initPage();
        }else if(this.$route.query.param==='views'){
            this.$route.meta.title="定金膨胀详情";
            this.endStateDisabled=true;
            this.quotaFlagDisabled=true;
            this.mutiSelect=false;
            this.initPage();
        }else{
            this.$route.meta.title="新增定金膨胀";
        }
    },
    methods: {
        //编辑，详情初始化
        initPage(){
            let that=this;
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                id:this.$route.query.id,
            }
            frontShow(data).then((res)=>{
                if(res.data.code===200){
                    that.depositAdd.good_id=res.data.data.good_id;
                    that.depositAdd.name=res.data.data.name;
                    that.depositAdd.front_start_time= dateFormat(res.data.data.good.front_start_time);
                    that.depositAdd.front_end_time=dateFormat(res.data.data.good.front_end_time);
                    that.depositAdd.tail_start_time=dateFormat(res.data.data.good.tail_start_time);
                    that.depositAdd.tail_end_time=dateFormat(res.data.data.good.tail_end_time);
                    //此处应该给一个标记
                    that.depositAdd.time_state=res.data.data.good.time_state;
                    if(that.depositAdd.time_state===1){
                        that.depositAdd.advance_time=res.data.data.good.advance_time/60/60/24;
                    }else if(that.depositAdd.time_state===0){
                        that.depositAdd.advance_time=dateFormat(res.data.data.good.advance_time);
                    }
                    that.depositAdd.end_state=parseInt(res.data.data.end_state);
                    that.depositAdd.quota=res.data.data.quota;
                    if(that.depositAdd.quota>0){
                        that.depositAdd.quotaFlag=true;
                    }else{
                        that.depositAdd.quotaFlag=false;
                    }
                    that.tableDataApp.push({
                        name:res.data.data.good.good_name,
                        price:res.data.data.good.original_price
                    });
                    that.tableDataApp1=res.data.data.good.good_sku;
                   
                    // that.selectedData=tableDataApp1;
                    that.getMember(1);
                }else{
                    that.$message.error('网络错误!'+'600A00199');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!'+'600B00200');
            }) 
        },
        //table选中回调
        handleSelectionChange(val){
            // this.selectedData=val;
            debugger
        },
        saveBatchSetting(){
            let that=this;
            let flagClose=false;
            if(this.batchKey===-1){
                let newTableD=JSON.parse(JSON.stringify(this.tableDataApp1));
                newTableD.forEach((item,index)=>{
                    let newItem=item;
                    if(that.batchValue>=item.front_money&&that.batchValue<=item.sku_price){
                        newItem.pledge=that.batchValue;
                        newItem.first_pledge=undefined;
                        newItem.second_pledge=undefined;
                        newItem.third_pledge=undefined;
                        flagClose=true;
                    }else{
                        newItem.pledge=undefined;
                        that.$message({
                                message:'定金可抵需大于或等于预售定金并且小于预售价格',
                                type:'warning',
                                duration:5000});
                    }
                    this.tableDataApp1.splice(index,1,newItem);
                })
            }else if(this.batchKey===0||this.batchKey===1||this.batchKey===2){
                let newTableD=JSON.parse(JSON.stringify(this.tableDataApp1));
                newTableD.forEach((item,index)=>{
                    let newItem=item;
                    let propname='';
                    if(that.batchKey===0){
                        propname='first_pledge';
                    }else if(that.batchKey===1){
                        propname='second_pledge';
                    }else if(that.batchKey===2){
                        propname='third_pledge';
                    }
                    if(parseFloat(that.batchValue)>=parseFloat(item.front_money)&&parseFloat(that.batchValue)<=parseFloat(item.sku_price)){
                        if(parseFloat(item.pledge)>parseFloat(item.front_money)){
                            if(parseFloat(that.batchValue)<parseFloat(item.pledge)){
                                newItem[propname]=undefined;
                                that.$message({
                                    message:that.batchText+'定金可抵需大于或等于定金可抵，小于预售定金',
                                    type:'warning',
                                    duration:7000});
                            }else{
                                newItem[propname]=that.batchValue;
                                flagClose=true;
                            }
                        }else{
                            newItem[propname]=undefined;
                            that.$message({
                                message:'定金可抵需大于或等于预售定金并且小于预售价格',
                                type:'warning',
                                duration:7000
                            });
                        }
                    }else{
                        newItem[propname]=undefined;
                        that.$message({
                                message:'定金可抵需大于或等于预售定金并且小于预售价格',
                                type:'warning',
                                duration:7000
                            });
                    }
                    this.tableDataApp1.splice(index,1,newItem);
                })
            }
            if(flagClose){
                this.batchSetting=false;
            }
            this.batchValue=undefined;
        },
        batchShow(key,name){ // 打开批量设置
            this.batchSetting=true;
            this.batchKey = key;
            this.batchText = name;
        },
        getMember(i){
            let that = this
            let data ={ 
                pro_id:localStorage.getItem('proId')
            }
            addGoodGetMemberPrice(data).then((res)=>{
                if(res.data.code===200){
                    that.memberPrice = res.data.data;
                    //重复添加初始化
                    if(that.columnsApp1.length>5){
                        that.columnsApp1= [
                            { 
                                prop: "spec_name", 
                                label: "商品规格尺寸",
                                align: "left",
                            },
                            { 
                                prop: "sku_price", 
                                label: "预售价格(元)",
                                align: "center",
                            },
                            { 
                                prop: "front_money", 
                                label: "预售定金(元)",
                                align: "center",
                            },{ 
                                label: "定金可抵",
                                align: "center",
                                render:(h, param) => {
                                    let that=this;
                                    let htmlShow= h('el-input-number',{
                                        style:'width: 70px;',
                                        props: {
                                            value: param.row.pledge,
                                            precision:0,
                                            controls:false,
                                            size:'mini'
                                        },
                                        on: {
                                            'blur': (event) => {
                                                 let newrow=param.row;
                                                if(parseFloat(event.target.value)<parseFloat(that.tableDataApp1[param.index].front_money)
                                                ||parseFloat(event.target.value)>parseFloat(that.tableDataApp1[param.index].sku_price)||event.target.value==0){
                                                    newrow.pledge=undefined;                                   
                                                    that.$message({
                                                        message:'定金可抵需大于或等于预售定金并且小于预售价格',
                                                        type:'warning',
                                                        duration:7000
                                                    });
                                                }else if(event.target.value){
                                                    newrow.first_pledge=undefined;
                                                    newrow.second_pledge=undefined;
                                                    newrow.third_pledge=undefined;
                                                    newrow.pledge=parseFloat(event.target.value).toFixed(2);
                                                }
                                                that.tableDataApp1.splice(param.index,1,newrow);
                                            },
                                        },
                                    });
                                    let htmlLabel=h('span',{},param.row.pledge);
                                    if(this.$route.query.param==='views'||this.$route.query.param==='edit'){
                                        return [h('div'),htmlLabel];
                                    }else{
                                        return [h('div'),htmlShow];
                                    }
                                }
                            },{  
                                label: "优惠金额(元)",
                                align: "center",
                                render:(h, param) => {
                                    let range='';
                                    if(param.row.range&&!Number.isNaN(parseFloat(param.row.range))&&param.row.range!=undefined&&parseFloat(param.row.range)!=0){
                                        range=param.row.range;
                                    }
                                    return h('el-button',{
                                        class:'wf-range',
                                        props:{
                                            type:'text',
                                        }
                                    },range);
                                }
                            },
                        ];
                    }
                    if(res.data.data.length>0){
                        let member=res.data.data.map((item,index)=>{
                            let propname='';
                            if(index===0){
                                propname='first_pledge';
                            }else if(index===1){
                                propname='second_pledge';
                            }else if(index===2){
                                propname='third_pledge';
                            }
                            
                            if(that.$route.query.param!='views'&&i!=1){
                                that.tableDataApp1.forEach((itemT)=>{
                                    itemT[propname]=undefined;
                                });
                            }
                            that.tableDataApp1.forEach((items)=>{
                                if(parseFloat(items['pledge'])===0){
                                    items['pledge']=undefined;
                                }
                                if(parseFloat(items[propname])===0){
                                    items[propname]=undefined;
                                }
                                return items;
                            })
                            that.columnsApp1.splice((that.columnsApp1.length-1),0,{ 
                                prop: propname, 
                                label: item.name+'定金可抵',
                                align: "center",
                                render:(h, param) => {
                                    let that=this;
                                    let htmlShow= h('el-input-number',{
                                        style:'width: 70px;',
                                        props: {
                                            value: that.tableDataApp1[param.index][propname],
                                            precision:2,
                                            controls:false,
                                            size:'mini',
                                            disabled:that.disabled
                                        },
                                        on: {
                                            'blur': (event) => {
                                                let newrow=param.row;
                                                // res.data.data.forEach((item,k)=>{

                                                // })
                                                if(res.data.data.length===1){
                                                    if(parseFloat(event.target.value)<that.tableDataApp1[param.index].front_money
                                                    ||parseFloat(event.target.value)>that.tableDataApp1[param.index].sku_price){
                                                        that.$message({
                                                            message:item.name+'定金可抵需大于或等于预售定金或者定金可抵，小于预售价格',
                                                                type:'warning',
                                                                duration:7000
                                                            });
                                                        newrow[propname]=undefined;
                                                        that.tableDataApp1.splice(param.index,1,newrow);
                                                    }else{
                                                        if(that.tableDataApp1[param.index].pledge>that.tableDataApp1[param.index].front_money){
                                                            if(parseFloat(event.target.value)<that.tableDataApp1[param.index].pledge){
                                                                that.$message({
                                                                    messsage:item.name+'定金可抵需大于或等于定金可抵，小于预售定金',
                                                                    type:'warning',
                                                                    duration:7000
                                                                });
                                                                newrow[propname]=undefined;
                                                                that.tableDataApp1.splice(param.index,1,newrow);
                                                            }else{
                                                                newrow[propname]=event.target.value;
                                                                that.tableDataApp1.splice(param.index,1,newrow);
                                                            }
                                                        }else{
                                                            if(parseFloat(event.target.value)>=that.tableDataApp1[param.index].front_money){
                                                                newrow[propname]=event.target.value;
                                                                that.tableDataApp1.splice(param.index,1,newrow);
                                                            }else{
                                                                that.$message({
                                                                    message:item.name+'定金可抵需大于或等于预售定金',
                                                                    type:'warning',
                                                                    duration:4000
                                                                });
                                                                newrow[propname]=undefined;
                                                                that.tableDataApp1.splice(param.index,1,newrow);
                                                            }
                                                        }
                                                    }
                                                }else if(res.data.data.length===2||res.data.data.length===3){
                                                    if(parseFloat(event.target.value)<that.tableDataApp1[param.index].front_money
                                                    ||parseFloat(event.target.value)>that.tableDataApp1[param.index].sku_price){
                                                        that.$message({
                                                            message:item.name+'定金可抵需大于或等于预售定金或者定金可抵，小于预售价格',
                                                            type:'warning',
                                                            duration:7000
                                                        });
                                                        newrow[propname]=undefined;
                                                        that.tableDataApp1.splice(param.index,1,newrow);
                                                    }else{
                                                        if(that.tableDataApp1[param.index].pledge>that.tableDataApp1[param.index].front_money){
                                                            if(parseFloat(event.target.value)<that.tableDataApp1[param.index].pledge){
                                                                that.$message({
                                                                    message:item.name+'定金可抵需大于或等于定金可抵，小于预售定金',
                                                                    type:'warning',
                                                                    duration:7000
                                                                });
                                                                newrow[propname]=undefined;
                                                                that.tableDataApp1.splice(param.index,1,newrow);
                                                            }else{
                                                                newrow[propname]=event.target.value;
                                                                that.tableDataApp1.splice(param.index,1,newrow);
                                                            }
                                                        }else{
                                                           if(parseFloat(event.target.value)>=that.tableDataApp1[param.index].front_money){
                                                                newrow[propname]=event.target.value;
                                                                that.tableDataApp1.splice(param.index,1,newrow);
                                                            }else{
                                                                that.$message.warning(item.name+'定金可抵需大于或等于预售定金');
                                                                newrow[propname]=undefined;
                                                                that.tableDataApp1.splice(param.index,1,newrow);
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                        },
                                    });
                                    let htmlLabel=h('span',{},param.row[propname]);
                                    if(this.$route.query.param==='views'||this.$route.query.param==='edit'){
                                        return [h('div'),htmlLabel];
                                    }else{
                                        return [h('div'),htmlShow];
                                    }
                                }
                            });
                        });        
                    }      
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        //商品选择
        depositShop(){
            this.selectParams=this.tableDataApp;
            this.dialogShopVisible=true;
        },
        handleShopslist(val,goods){
            this.dialogShopVisible=val;
            // this.wfSelectShopName='修改商品';
            let that=this;
            if(goods){
                this.wfSelectShopName='修改商品';
                this.tableDataApp=[];
                this.tableDataApp.push({
                    name:goods.name,
                    price:goods.price
                }) 
                let data={
                    token:localStorage.getItem('userId'),
                    pro_id:parseInt(localStorage.getItem('proId')),
                    id:goods.id
                }
                this.depositAdd.good_id=goods.id;
                getGoodInfo(data).then((res)=>{
                    if(res.data.code === 200){
                        that.depositAdd.front_start_time= dateFormat(res.data.data.front_start_time);
                        that.depositAdd.front_end_time=dateFormat(res.data.data.front_end_time);
                        that.depositAdd.tail_start_time=dateFormat(res.data.data.tail_start_time);
                        that.depositAdd.tail_end_time=dateFormat(res.data.data.tail_end_time);
                        that.tableDataApp1=res.data.data.good_sku;
                        that.$nextTick(()=>{
                            if(that.$refs.tableActive){
                                for(let i=0;i< that.tableDataApp1.length;i++){
                                    that.$refs.tableActive.$refs.multipleTable.toggleRowSelection(that.tableDataApp1[i], true);
                                    that.tableDataApp1[i].pledge=undefined;
                                    that.tableDataApp1[i].range=undefined;
                                    that.tableDataApp1[i].sku_id=that.tableDataApp1[i].id;
                                }
                            }
                            that.getMember();
                            
                        })
                        that.depositAdd.time_state=res.data.data.time_state;
                        if(that.depositAdd.time_state===1){
                            that.depositAdd.advance_time=res.data.data.advance_time/60/60/24;
                        }else if(that.depositAdd.time_state===0){
                            that.depositAdd.advance_time=dateFormat(res.data.data.advance_time);
                        }
                        
                    }else{
                        that.$message.error('网络错误!600A00193');
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误!600B00194');
                }); 
            }
        },
        //已选择的商品回调函数
        handleShopSelectedId:function(selected){
            this.submitSelected=selected;
        },
        save(ruleForm){
            let that=this;
            this.$refs[ruleForm].validate((valid) => {
                let flagVa=that.tableDataApp1.some((item,index)=>{
                    let itemArr=[item['first_pledge'],item['second_pledge'],item['third_pledge'],item['pledge']];
                    itemArr=itemArr.map((itemA)=>{
                        if(parseFloat(itemA)>0){
                            itemA=parseFloat(itemA);
                            return itemA;
                        }
                    }).filter((itemB)=>parseFloat(itemB)>0);
                    let flagValid=false;
                    if(itemArr.length>1){
                        for(let i=0;i<itemArr.length-1;i++){
                            if(itemArr[i]<itemArr[i+1]){
                                flagValid=true;
                                break;
                            }
                        }
                        if(flagValid){
                            return true;
                        }
                    }
                })
                if(flagVa){
                    that.$message({
                        message:'校验不通过,高等级会定金低价需大于或者等于低等级会员低价',
                        type:'warning',
                        duration:5000
                    });
                    return false;
                }
                if (valid) {
                    let data = { 
                        pro_id: parseInt(localStorage.getItem('proId')),
                        token:localStorage.getItem('userId'),
                        name:that.depositAdd.name,
                        good_id:that.depositAdd.good_id,
                        end_state:that.depositAdd.end_state,
                    }
                    if(that.depositAdd.quotaFlag){
                        data.quota=that.depositAdd.quota;
                    }else{
                        data.quota=0;
                    }
                    that.saveLoading=true;
                    if(that.$route.query.param==='edit'){
                        data.id=that.$route.query.id;
                    }else{
                        data.good_sku=that.tableDataApp1;
                    }
                    frontAdd(data).then((res)=>{
                        that.saveLoading=false;
                        if(res.data.code===200){
                            if(that.$route.query.param==='edit'){
                                that.$message.success('修改成功');
                            }else{
                                that.$message.success('保存成功');
                            }
                            that.$router.push({path:'/wf/admin/shop/markting/deposit',name:'deposit'});
                        }else{
                            that.$message.warning(res.data.msg+'600A00197');
                        }
                    }).catch((err)=>{
                        that.saveLoading=false;
                        that.$message.error('网络错误!'+'600B00198');
                    })
                }else{
                    return false;
                }
            })
        }
    },
    watch:{
        tableDataApp1:{
            immediate:true,//初始值执行handler的函数
            handler(val,oldVal){
                let that=this;
                this.tableDataApp1.forEach((item,index)=>{
                    let itemArr=[item['pledge'],item['first_pledge'],item['second_pledge'],item['third_pledge']];
                    itemArr=itemArr.map((itemA)=>{
                        if(parseFloat(itemA)>0){
                            itemA=parseFloat(itemA);
                            return itemA;
                        }
                    }).filter((itemB)=>parseFloat(itemB)>0);
                    if(itemArr.length===0){
                        item.range=undefined;
                    }else if(itemArr.length===1){
                        let counts=(parseFloat(itemArr[0])-parseFloat(item.front_money)).toFixed(2);
                        if(counts>0){
                            item.range=counts;
                        }
                    }else if(itemArr.length>1){
                        if(((Math.min.apply(Math,itemArr)-parseFloat(item.front_money)).toFixed(2))===((Math.max.apply(Math,itemArr)-parseFloat(item.front_money)).toFixed(2))){
                            item.range=((Math.min.apply(Math,itemArr)-parseFloat(item.front_money)).toFixed(2));
                        }else{
                            item.range=((Math.min.apply(Math,itemArr)-parseFloat(item.front_money)).toFixed(2)) + ' - ' +
                            ((Math.max.apply(Math,itemArr)-parseFloat(item.front_money)).toFixed(2));
                        }
                    }
                });
                this.showTable=false;
                this.$nextTick(()=>{
                    that.showTable=true;
                })
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-depositAdd{
    position: relative;
    background-color: #fff;
    padding: 20px;
    .wf-textareaVaild{
        top:-30px;
    }
    .wf-form{
        .wf-rule{
            color: #adacac;
            font-weight: 900;
        }
        .wf-help{
            color: #b1b1b1;
            font-size: 14px;
        }
        .wf-limit{
            /deep/ .el-radio{
                margin-bottom: 10px;
            }
        }
    }
    .wf-addCoupon-s-btn{
        margin-bottom: 20px;
    }
    .wf-color-font{
        color:#409EFF;
        font-weight: 900;
    }
    .vip-price-setting{
        border-bottom: 1px solid rgb(235, 238, 245);
        border-left: 1px solid rgb(235, 238, 245);
        border-right: 1px solid rgb(235, 238, 245);
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    /deep/ .wf-range{
        text-align: center;
        cursor: auto;
        color: black;
    }
}
</style>