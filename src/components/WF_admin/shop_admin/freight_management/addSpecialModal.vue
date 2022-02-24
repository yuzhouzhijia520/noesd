<template>
    <div class="wf-addSpecialModal">
         <el-row :gutter="24">
            <el-col :xs="15" :sm="17" :md="19" :lg="20" :xl="22">
                <el-form :label-position="labelPosition"     
                        :model="addSpecialModal"
                        :rules="rules"
                        ref="addSpecialModal"
                        label-width="10rem"
                        class="demo-ruleForm">
                    <el-form-item class="label-left" label="模板名称" prop="name" size="mini">
                        <el-input :maxlength="30" class="input_width" style="width: 30%;" size="mini" placeholder="请输入模板名称" v-model="addSpecialModal.name"></el-input>
                        <span class="wf-textareaVaild ">{{(30-addSpecialModal.name.length)}}/30</span>
                    </el-form-item>
                    <el-form-item class="label-left" label="计费方式" prop="state" size="mini">
                        <el-radio-group v-model="addSpecialModal.state" @change="handleRadio" :disabled="disabledFlag">
                            <el-radio :label="0">按件数</el-radio>
                            <el-radio :label="1">按重量</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="label-left" label="可配送区域" prop="detail" size="mini">
                        <el-row>
                            <my-table ref="table" 
                            :pagination="pagination" 
                            :border="border" 
                            :tableData="addSpecialModal.detail" 
                            :columns="columnsApp" 
                            :totalPage="totalPageApp"  
                            :currentPage="currentPage"  ></my-table>
                        </el-row>
                        <el-row class="wf-addrow">
                            <div>
                                <div  class="wf-addCard" @click="addAddress">
                                    <i  class="el-icon-plus avatar-uploader-icon"></i>
                                    <span>添加可配送区域和运费</span>
                                </div>
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="onSubmit('addSpecialModal')" :loading="loading">保存</el-button>
                        <el-button size="mini" @click="onBack">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
         </el-row>
        <component :is="menuVal"   @geturl="geturl" :uuid="uuid" v-if="openModal" :toData="toData" :editFlag="editFlag"></component>
        <component :is="menuValC"   @getCount="getCount" v-if="openModalC" :uuid="uuid" :amount="amount" :piece="piece" :modular_id="modular_id" :eltype="eltype"></component>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import areaDialog from './areaDialog.vue'; 
import emailSet from './emailSet.vue'; 
import {getShowAddress,addTemplate ,getShowlist ,getAllProvince } from "@/server/fare";
export default {
    name: '',
    data() {
        return {
            menuVal:'areaDialog',
            menuValC:'emailSet',
            mode: "transfer",
            title:['选择区域','已选区域'],
            dialogelGoodsLinks: false,
            value:'',
            fromData: [],
            path:'',
            toData:[],
            oldToData:[],
            flagOld:true,
            elformOpenAll:false, //是否全部展开
            eltoOpenAll:false, //是否全部展开

            openModal:false,
            openModalC:false,
            disabledFlag:false,//是否禁用标记
            labelPosition: 'right',
            border:true,
            addSpecialModal:{
                name:'',
                state: 0,
                detail:[],
            },
            uuid:'',
            amount:undefined,
            piece:undefined,
            modular_id:undefined,
            eltype:undefined,
            editFlag:false,
            pagination:false,
            totalPageApp:0,
            currentPage:1,
            label:[
                ['首件(个)','续件(个)'],
                ['首重(KG)','续重(KG)'],
            ],
            loading:false,
            columnsApp: [
                { 
                    label: "可配送区域",
                    width:'300',
                    align: "left",
                    render:(h, param) => {
                        let that=this;
                        const regionArr=param.row.regionZH.split(',');
                        if(Object.prototype.toString.call(that.$store.state.fromDataAllFare)==='[object Array]'){
                            const regionText=that.$store.state.fromDataAllFare.filter((item)=>{
                                if(regionArr.some(element => {
                                    if(item.base_areaid==element){
                                        return true;
                                    }
                                })){
                                    return item;
                                }
                            }).map((item)=>item.name).join(',');
                            return [h('span',regionText)];
                        }else{
                             return [h('span','')];
                        }
                    }
                },
                {  
                    align: "center",
                    renderHeader:(h, param) => {
                        return [h('div',{
                            class:'headerTab'
                        },this.label[this.addSpecialModal.state][0] )]
                    },
                    render:(h, param) => {
                        return [h('el-input-number', {
                            class:'gray',
                            props: {
                                size: "mini",
                                controls:false,
                                value:this.addSpecialModal.detail[param.index].first_number
                            },
                            on: {
                                'blur': (event) => {
                                    this.addSpecialModal.detail[param.index].first_number= event.target.value;
                                },
                            }
                        })]
                     }
                },
                { 
                    prop: "count", 
                    label: "运费(元)",
                    align: "center",
                    render:(h, param) => {
                        return [h('el-input-number', {
                            class:'gray',
                            props: {
                                size: "mini",
                                controls:false,
                                value:this.addSpecialModal.detail[param.index].first_price,
                                precision:2
                            },
                            on: {
                                'blur': (event) => {
                                    this.addSpecialModal.detail[param.index].first_price= event.target.value;
                                },
                            }
                        })]
                     }
                },
                { 
                    prop: "count", 
                    align: "center",
                    renderHeader:(h, param) => {
                        return [h('div',{
                            class:'headerTab'
                        },this.label[this.addSpecialModal.state][1] )]
                    },
                    render:(h, param) => {
                        return [h('el-input-number', {
                            class:'gray',
                            props: {
                                size: "mini",
                                controls:false,
                                value:this.addSpecialModal.detail[param.index].add_number
                            },
                            on: {
                                'blur': (event) => {
                                    this.addSpecialModal.detail[param.index].add_number= event.target.value;
                                },
                            }
                        })]
                     }
                },
                { 
                    prop: "count", 
                    label: "续费(元)",
                    align: "center",
                    render:(h, param) => {
                        return [h('el-input-number', {
                            class:'gray',
                            attrs:{
                                style:"font-size:12px;"
                            },
                            props: {
                                size: "mini",
                                controls:false,
                                value:this.addSpecialModal.detail[param.index].add_price,
                                precision:2
                            },
                            on: {
                                'blur': (event) => {
                                    this.addSpecialModal.detail[param.index].add_price= event.target.value;
                                },
                            },
                        })]
                     }
                },
                { 
                    prop: "count", 
                    label: "包邮",
                    align: "center",
                    width:'140',
                    render:(h, param) => {
                        if(param.row.type==0){
                            return [h('span','未设置')]
                        }else{
                            if(param.row.modular_id==27){
                                return [h('span','满'),h('span',this.addSpecialModal.detail[param.index].amount+'元包邮')]
                            }else if(param.row.modular_id==28){
                                return [h('span','满'),h('span',this.addSpecialModal.detail[param.index].piece+'件包邮')]
                            }
                        }
                       
                     }
                },
                {
                    label: "操作",
                    align: "center",
                    width:'300',
                    render:(h, param) => {
                        let that=this;
                        let email=h('el-button', {
                            class:'gray',
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            on:{
                                click:()=>{ 
                                    that.uuid=param.row.uuid;
                                    that.openModalC=true;
                                    that.openModal=false;
                                    that.modular_id=that.addSpecialModal.detail[param.index].modular_id;
                                    that.eltype=that.addSpecialModal.detail[param.index].type;
                                    if(that.modular_id==27){
                                        that.amount=parseInt(param.row.amount);
                                    }else if(that.modular_id==28){
                                        that.piece=param.row.piece;
                                    }
                                }   
                            }
                        }, '包邮设置');
                        let editg=h('el-button', {
                            class:'gray',
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            on:{
                                click:()=>{
                                    that.openModalC=false;
                                    that.openModal=true;
                                    that.editFlag=true;
                                    that.uuid=param.row.uuid;
                                    const regionArr=param.row.regionZH.split(',');
                                    that.toData=that.$store.state.fromDataAllFare.filter((item)=>{
                                        if(regionArr.some(element => {
                                            if(item.base_areaid==element){
                                                return true;
                                            }
                                        })){
                                            return item;
                                        }
                                    })
                                }
                            }
                        }, '编辑');
                        let deleteBtn=h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(230, 126, 122);font-size:14px"
                            },
                            on:{
                                click:()=>{
                                    that.addSpecialModal.detail=that.addSpecialModal.detail.filter((item)=>{
                                        if(item.uuid!=param.row.uuid){
                                            return item;
                                        }
                                    });
                                    const regionArr=param.row.regionZH.split(',');
                                    let addFormData=that.$store.state.fromDataAllFare.filter((item)=>{
                                        if(regionArr.some(element => {
                                            if(item.base_areaid==element){
                                                return true;
                                            }
                                        })){
                                            return item;
                                        }
                                    });
                                    let $fromDataFare=that.$store.state.fromDataAllFare.filter((item)=>{
                                        if(that.$store.state.fromDataFare.some(element => {
                                            if(item.base_areaid==element.base_areaid){
                                                return true;
                                            }
                                        })){
                                            return item;
                                        }
                                    });
                                    let newFormDataAllFare=$fromDataFare.concat(addFormData);
                                    newFormDataAllFare=newFormDataAllFare.sort(that.compareKey('vieworder'));
                                    that.$store.commit({
                                        type:'getFromDataFare',
                                        fromDataFare:newFormDataAllFare
                                    });
                                }
                            }
                        }, '删除');
                        return [email,editg,deleteBtn];
                    }
                }
            ],
            rules:{
                name: [
                    { required: true, message: '模板名称不能为空', trigger: 'blur' }
                ],
                state: [
                    { required: true, trigger: 'blur' }
                ],
                detail:[
                    { required: true, message: '请输入可配送区域', trigger: 'change' }
                ]
            }
        }
    },
    components: {
        MyTable,
        areaDialog,
        emailSet
    },
    created(){
        if(this.$route.query){
            if(this.$route.query.param==='edit'){
                this.$route.meta.title="编辑运费模板";
                this.disabledFlag=true;
                this.initPage();
            }else{
                this.$route.meta.title="新增运费模板";
                this.disabledFlag=false;
            }
        }
    },
    mounted(){
        this.initData();
    },
    methods: {
        compareKey(propName){
            return function(obj1,obj2){
                if(parseInt(obj1[propName])<parseInt(obj2[propName])){
                    return -1;
                }else if(parseInt(obj1[propName])>parseInt(obj2[propName])){
                    return 1;
                }
                return 0;
            };
        },
        handleRadio(val){
            //初始化table参数和地区参数
            this.addSpecialModal.detail=[];
            this.toData=[];
            this.$store.commit({
                type:'getFromDataFare',
                fromDataFare:this.$store.state.fromDataAllFare
            });
        },
        initPage(){
            // 初始化编辑页面参数
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
                id:this.$route.query.id
            }         
            getShowlist(data).then((res)=>{
                if(res.data.code===200){
                   that.addSpecialModal.name=res.data.data.name;
                   that.addSpecialModal.state=res.data.data.state;
                   that.addSpecialModal.detail=res.data.data.detail;
                   that.initAddress(that.addSpecialModal.state);
                }else{
                    that.$message.error(err.data.msg);
                }
            }).catch((err)=>{
                that.$message.error(err.data.msg);
            })
        },
        getCount(id,count,type,uuid){
            //回调函数
            let that=this;
            if(type===0){
                this.addSpecialModal.detail.some((item,index)=>{
                    if(item.uuid===uuid){
                        that.addSpecialModal.detail[index].type=type;
                    }
                })
            }else if(type===1){
                this.addSpecialModal.detail.some((item,index)=>{
                    if(item.uuid===uuid){
                        that.addSpecialModal.detail[index].type=type;
                        that.$set(that.addSpecialModal.detail[index],'modular_id',id);
                        that.$set(that.addSpecialModal.detail[index],'amount',count);
                        that.$set(that.addSpecialModal.detail[index],'piece',undefined);
                        that.piece=undefined;
                    }
                })
            }else if(type===2){
                this.addSpecialModal.detail.some((item,index)=>{
                    if(item.uuid===uuid){
                        that.addSpecialModal.detail[index].type=type;
                        that.$set(that.addSpecialModal.detail[index],'modular_id',id);
                        that.$set(that.addSpecialModal.detail[index],'piece',count);
                        that.$set(that.addSpecialModal.detail[index],'amount',undefined);
                        that.amount=undefined;
                    }
                })
            }
            this.openModalC=false;
        },
        initData(){
            let that=this;
            this.initAddress(this.addSpecialModal.state);
            //查询所有地区
            let data1={
                secret:localStorage.getItem('secretId')
            }    
            getAllProvince(data1).then((res)=>{
                    if(Object.prototype.toString.call(res.data.data)==='[object Array]'){
                        that.$store.commit({
                            type:'getFromDataAllFare',
                            fromDataAllFare:res.data.data
                        })
                    }else{
                        that.$message.error('数据类型错误!');
                    }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        initAddress(state){
             //初始化地区
            let that=this;
            let data={
                secret: localStorage.getItem("secretId"),
                state:state,
                freight_id:this.$route.query.id
            }
            getShowAddress(data).then((newData)=>{
                if(newData.data.code===200){
                    //深度拷贝未选择分类列表
                    if(Object.prototype.toString.call(newData.data.data)==='[object Array]'){
                        that.$store.commit({
                            type:'getFromDataFare',
                            fromDataFare:newData.data.data
                        })
                    }else{
                        that.$message.error('数据类型错误!');
                    }
                }else{
                    that.$message.error(newData.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('网络错误!');
            }); 
        },
        geturl(data,dialogFlag,addFlag,olduuid){
            //回调函数
            this.openModal=false;
            if(data.data){
                if(data.data.length>0){
                    const uuid=require('uuid/v1');
                    let regionZH=data.data.map((item)=>item.base_areaid).join(',');
                    let region=data.data.map((item)=>item.name).join(',');
                    if(addFlag){
                        let index=0;
                        this.addSpecialModal.detail.some((item,i)=>{ 
                            if(item.uuid===olduuid){
                                index=i; 
                                return true;
                            }
                        });
                        this.addSpecialModal.detail[index].regionZH=data.data.map((item)=>item.base_areaid).join(',');
                        this.addSpecialModal.detail[index].region=data.data.map((item)=>item.name).join(',');
                    }else{
                        this.addSpecialModal.detail.push({
                            type:0,
                            regionZH:regionZH,
                            region:region,
                            first_price:'',
                            add_price:'',
                            first_number:'',
                            add_number:'',
                            uuid:uuid()
                        });
                    }
                }
            }
        },
        onSubmit(formName){
            //保存
            let that=this; 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data={
                        secret:localStorage.getItem('secretId'),
                        name:this.addSpecialModal.name,
                        state:this.addSpecialModal.state,
                        detail:this.addSpecialModal.detail
                    }   
                    //如果是编辑状态，添加id参数     
                    if(this.$route.query){
                        if(this.$route.query.param==='edit'){
                            data.id=this.$route.query.id;
                        }
                    }
                    this.loading=true;
                    addTemplate(data).then((res)=>{
                        that.loading=false;
                        if(res.data){
                            if(res.data.code==200){
                                that.$message.success(res.data.msg);
                                that.$router.push({path:'/wf/admin/shop/freight_management',query:{activeName:'second'}});
                            }else{
                                that.$message.error('网络错误！');
                            }
                        }else{
                            that.addSpecialModal.detail=[];
                            that.$message.error(res.data.msg);
                        }
                    }).catch(err=>{
                        that.loading=false;
                        that.$message.error('网络错误！');
                    });
                }else{
                    return false;
                }
            })
        },
        onBack(){
            //跳转
            this.$router.push({path:'/wf/admin/shop/freight_management',query:{activeName:'second'}})
        },
        addAddress(){
            this.openModal=true;
            this.editFlag=false;
        },
    }
}
</script>
<style lang="scss" scoped>
.wf-addSpecialModal{
    background-color: #fff;
    padding: 20px;
    padding-left: 60px;
    .wf-textareaVaild {
        float: left;
        top: 2px;
        margin-left: 27%;
    }
    /deep/ .headerTab{
        overflow: initial;
    }
    /deep/ .gray{
        width: 80px;
    }
    /deep/ .el-table{
        border:none;
        &::after{
            height: 0;
        }
    }
    /deep/ .el-table--border::after, .el-table--group::after{
        width: 0;
    }
    /deep/ .el-table__header{
        th{
            background: #fafafa;
            border:1px solid #f7f7f7;
        }
    }
    /deep/ .el-table__body-wrapper{
        td{
            border:1px solid #f7f7f7;
        }
    }
    .wf-addrow{
        background-color: #ccc;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        padding: 10px;
        background: #fafafa;
        border-radius: 0 0 3px 3px;
        position: relative;
        .wf-addCard{
            width: 220px;
            background-color: #fff;
            margin: 10px;
            border-radius: 2px;
            border: 1px dashed #e5e5e5;
            cursor: pointer;
            &:hover{
                border: 1px dashed #40a9ff;
                color:#40a9ff;
            }
            i{
                margin-left: 20px;
            }
        }
    }
}
</style>