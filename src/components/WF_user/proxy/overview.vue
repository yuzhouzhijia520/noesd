<template>
   <div id="overview" class="wf-proxy-overview">
       <div class="wf-overview-title">
           <p class="overview-wf-title">概况</p>
           <el-row class="overview-wf-top" :gutter="20" >
               <el-col :span="4" class="overview-wf-top-one" v-if="formAddGroupData.discount_state == 1 && $store.state.oemFlag" :style="formAddGroupData.discount_state == 1?'background:none;':'background: #F6F6F6;'">
                   <div>余额：<span style="font-size:24px;color:#DF6A65;">{{formAddGroupData.balance}}</span>元</div>
               </el-col>
               <el-col :span="1"  v-if="formAddGroupData.discount_state == 1 " class="overview-wf-top-one">
                  <el-button type="primary" @click="pay"  >充值</el-button>
               </el-col>
               <el-col :span="4" class="overview-wf-top-one" :style="formAddGroupData.discount_state == 1?'background:none;':'background: #F6F6F6;'">
                   <div v-if="!$store.state.oemFlag">代理分组：{{formAddGroupData.group_name}}</div>
                   <div v-if="$store.state.oemFlag">OEM分组：{{formAddGroupData.group_name}}</div>
               </el-col>
               <el-col :span="5" class="overview-wf-top-one" :style="formAddGroupData.discount_state == 1?'background:none;':'background: #F6F6F6;'">
                   <div>截止日期：{{formAddGroupData.term_of_validity}}</div>
               </el-col>
               <el-col :span="3" class="overview-wf-top-one" v-if="formAddGroupData.discount_state == 1&& $store.state.oemFlag" :style="formAddGroupData.discount_state == 1?'background:none;':'background: #F6F6F6;'">
                   <div>代理折扣：{{formAddGroupData.discount}}折</div>
               </el-col>
               
           </el-row>
           <el-row class="overview-wf-top" :gutter="20" v-if="$store.state.oemFlag">
               <el-col :span="15" class="overview-wf-top-one" v-if="formAddGroupData.discount_state == 0" style="background: #F6F6F6;">
                   <div>邀请客户注册：{{formAddGroupData.invite_url}}</div>
               </el-col>
               <el-col :span="5" style="margin-top:10px;" v-if="formAddGroupData.discount_state == 0" >
                  <el-button type="primary" v-clipboard:copy="formAddGroupData.invite_url"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">复制</el-button>
               </el-col>
           </el-row>
           <!-- <el-row class="overview-wf-top" v-if="!this.$store.state.oemFlag">
               <el-col :span="1"  v-if="formAddGroupData.discount_state == 1" >
                  <el-button type="primary" @click="pay"  >充值</el-button>
               </el-col>
           </el-row> -->
           
       </div>
       
       <div class="wf-overview-data" v-if="(formAddGroupData.discount_state == 0 &&$store.state.oemFlag) || !$store.state.oemFlag">
           <el-row class="big_data" type="flex"  >
                <el-col  :span="6"  class="big_datalist">
                   <p class="number_box">展示小程序</p>
                   <div class="number">{{pxyzlist.show_num?pxyzlist.show_num:'0'}}<span class="number-text">/{{pxyzlist.show_total?pxyzlist.show_total:'0'}}</span><span class="small-text">(剩余/总数)</span> </div>
                </el-col>
                <el-col :span="6"  class="big_datalist">
                   <p  class="number_boxl">电商基础版</p>
                   <div class="number">{{pxyzlist.basics_num?pxyzlist.basics_num:'0'}}<span class="number-text">/{{pxyzlist.basics_total?pxyzlist.basics_total:'0'}}</span><span class="small-text">(剩余/总数)</span></div>

                </el-col>
                <el-col  :span="6">
                   <p class="number_boxll">电商专业版</p>
                   <div class="number">{{pxyzlist.major_num?pxyzlist.major_num:'0'}}<span class="number-text">/{{pxyzlist.major_total?pxyzlist.major_total:'0'}}</span><span class="small-text">(剩余/总数)</span></div>

                </el-col>
                <el-col  :span="6"  class="big_datalist">
                   <p class="number_boxlls">电商国际版</p>
                   <div class="number">{{pxyzlist.internation_num?pxyzlist.internation_num :'0'}}<span class="number-text">/{{pxyzlist.internation_total?pxyzlist.internation_total:'0'}}</span><span class="small-text">(剩余/总数)</span></div>

                </el-col>
                <el-col  :span="6" >
                   <p class="number_boxlll">餐饮小程序</p>
                   <div class="number">{{pxyzlist.food_num?pxyzlist.food_num:'0'}}<span class="number-text">/{{pxyzlist.food_total?pxyzlist.food_total:'0'}}</span><span class="small-text">(剩余/总数)</span></div>

                </el-col>
           </el-row>
        </div>
        <div class="wf-overview-data" v-if="formAddGroupData.discount_state == 1 && $store.state.oemFlag " >
           <el-row class="big_datas"  >
                <el-col   :span="6" :offset="1">
                    <p class="number_box">小程序数量</p>
                    <div class="number" style="color:#6E9ECF;">{{formAddGroupData.num?formAddGroupData.num:'0'}}</div>
                </el-col>
                <el-col  :span="6" :offset="1">
                    <p  class="number_boxl" style="background:#DF6A65">上线小程序数</p>
                    <div class="number" style="color:#DF6A65">{{formAddGroupData.online_num?formAddGroupData.online_num:'0'}}</div>
                </el-col>
                <el-col  :span="6" :offset="1">
                    <p class="number_boxll" style="background:#C1C1C1;">即将过期小程序数</p>
                    <div class="number" style="color:#C1C1C1">{{formAddGroupData.expire_num?formAddGroupData.expire_num:'0'}}</div>
                </el-col>
           </el-row>
       </div>
       
       <!-- <div class="wf-overview-hover overview-hover" v-if="!this.$store.state.oemFlag">
           <el-row justify="space-between" type="flex" v-if="formAddGroupData.discount_state == 1">
               <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="(item,index) in status_list"
                    :key="index"
                    :label="item.label"
                    :name="item.name">
                    </el-tab-pane>
                </el-tabs>
           </el-row>
           <my-table :tableData="tableData" :columns="columns" :totalPage="pageCount" :currentPage="currentPage" @currentChange="getPages" v-if="formAddGroupData.discount_state == 1"></my-table>
       </div> -->
       <div class="wf-overview-hover overview-hover" v-if="formAddGroupData.discount_state == 1  ">
           <el-row justify="space-between" type="flex" >
               <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="(item,index) in status_list"
                    :key="index"
                    :label="item.label"
                    :name="item.name">
                    </el-tab-pane>
                </el-tabs>
           </el-row>
           <my-table :tableData="tableData" :columns="columns" :totalPage="pageCount" :currentPage="currentPage" @currentChange="getPages" v-if="formAddGroupData.discount_state == 1 "></my-table>
       </div>
       <!--弹窗-->
       <el-dialog  false :title="judge == 0?'添加充值记录':(judge == 1?'修改充值记录':'查看充值记录')" :visible.sync="dialogFormVisible" width="30%" v-if="formAddGroupData.discount_state == 1 ">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="审核驳回原因" v-if="judge ==1">
                   {{ruleForm.check_remarks}}
                </el-form-item>
                <el-form-item label="充值金额" prop="transaction_amount">
                    <el-input-number v-model="ruleForm.transaction_amount" size="mini" :controls="false" style="width:180px;" :min="0.00" :precision="2" :disabled="judge ==2?true:false"></el-input-number>
                </el-form-item>
                <el-form-item label="收款平台" prop="paywatype" size="mini">
                    <el-select v-model="ruleForm.paywatype" placeholder="请选择收款平台"  @change='paywaychange' :disabled="judge ==2?true:false">
                    <el-option 
                        v-for="item in payway"
                        :key="item.type"
                        :label="item.value"
                        :value="item.type"
                    ></el-option>
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="收款账户" prop="region" size="mini">
                    <el-select v-model="ruleForm.region" placeholder="请选择收款账户" @change='paywaychanges' :disabled="judge ==2?true:false">
                    <el-option 
                        v-for="item in region"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易单号" prop="transaction_number">
                    <el-input-number v-model="ruleForm.transaction_number" size="mini" :controls="false" style="width:180px;" :disabled="judge ==2?true:false"></el-input-number>
                </el-form-item>
                <el-form-item label="付款凭证" prop="delivery" >
                    <el-upload
                        size="mini"
                        class="avatar-uploader"
                        :action="upLoadUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload" :disabled="judge ==2?true:false">
                        <img v-if="imglist" :src="imglist" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="打款日期" >
                    <el-col :span="11">
                        <el-form-item prop="date1" size="mini">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.time" :disabled="judge ==2?true:false"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="ruleForm.remarks" :disabled="judge ==2?true:false"></el-input>
                </el-form-item>
                <el-form-item label="审核人" v-if="is_check ==1 ||is_check ==2">
                    {{ruleForm.name}}
                </el-form-item>
                <el-form-item label="审核时间" v-if="is_check ==1 ||is_check ==2">
                   {{ruleForm.check_time}}
                </el-form-item>
                <el-form-item label="审核状态" v-if="is_check ==1 ||is_check ==2 || is_check ==0">
                   {{is_check==0?'审核中':(is_check==1?'审核通过':'审核驳回')}}
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" v-if="judge !==2" :loading="loading" size="mini">{{judge !== 1?'提交':'重新提交'}}</el-button>
                    <el-button @click="resetForm('ruleForm')" size="mini">关闭</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="wf-overview-hover overview-hover" v-if="($store.state.oemFlag && formAddGroupData.discount_state == 0) || !$store.state.oemFlag">
           <el-row  :gutter="20"  justify="space-between" type="flex">
               <el-col :span="5" class="overview-hover-left">
                   <p>使用手册</p>
               </el-col>
               <el-col :span="2" class="overview-hover-right clear" >
                   
            <a  target="_blank" href="https://mp.weixin.qq.com/s/Y2xIqEUDP09396NlNHPVAg" ><p class="left">了解详情</p><img src="@/assets/proxy_img/right.png" alt="" class="overview-hover-right-img right"></a>
                   
                  
               </el-col>
           </el-row>
       </div>
   </div>
</template>

<script>
import {dateFormat} from '@/untils/common.js';
// import {dateFormat} from '@/server/newcommonheader.js';
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: 'shop_overview',
    data() {
        return {
            payway:[
                {
                    value:'支付宝',
                    type:1
                },
                {
                    value:'微信',
                    type:2
                },
                {
                    value:'银行卡',
                    type:3
                },
                {
                    value:'其他',
                    type:4
                }
            ],
            upLoadUrl:this.url+'supper/attachment/upfile',
            formAddGroupData:{
                term_of_validity:'',
                discount_state:0
            },
            form:{
                name:'111'
            },
            id:-1,
            is_check:-1,
            loading:false,
            imglist:'',
            ll:false,
            paylist:'',//支付方式所列出的选项
            pxyzlist:'',
            judge:0,//0为添加充值记录，1为编辑充值记录，2查看充值记录
            pageCount:0,//总的条数
            dialogFormVisible:false,//delog
            activeName: 'one',
            page:1,
            currentPage:1,//总共几页
            tableData:[],
            region:[],//支付方式选中的选项
            ruleForm: {
                transaction_number: '',//交易单号
                transaction_amount:'',//交易的金额
                paywatype:'',
                region:'',
                check_time:'',
                check_remarks:'',
                name:'',
                time: '',//打款时间
                remarks:''//备注
            },
            rules: {
                transaction_number: [
                    { required: true, message: '请输入交易单号', trigger: 'blur' }
                ],
                transaction_amount: [
                    { required: true, message: '请输入交易金额', trigger: 'blur' }
                ],
                paywatype: [
                    { required: true, message: '请选择支付账户', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择收款账户', trigger: 'blur' }
                ]
               
            },
            status_list: [
                {
                    id:0,
                    label: '充值记录',
                    name: 'one',
                },
                {
                    id: 1,
                    label: '消费记录',
                    name: 'two',
                }
            ],
            imageUrl: '',
            columns:[
                    {   prop: "time", 
                        label: "充值时间",
                        align: "center"
                    },
                    {   prop: "type",
                        label: "收款平台",
                        align: "center",
                        render: (h, param) => {
                        let a = [
                            h('span' , {
                               
                                
                            }, param.row.type == 1?'支付宝':(param.row.type == 2?'微信':(param.row.type == 3?'银行卡':'其他'))),
                           ];
                        return h('div', a);
                    }
                    },
                    {   prop: "name",
                        label: "收款账户",
                        align: "center"
                    },
                    {   prop: "transaction_amount",
                        label: "充值金额",
                        align: "center"
                    },
                    {   prop: "created_at",
                        label: "提交时间",
                        align: "center"
                    },
                    {
                    prop: "",
                    label: "状态",
                    align: "center",
                    render: (h, param) => {
                        let a = [
                            h('span' , {
                                // props: {
                                //     size: "mini",
                                //     type: "text",
                                    
                                // },
                                attrs:{
                                    style:param.row.is_check == 0?'color:#409EFF':(param.row.is_check == 1?'color:#67C23A':'color:#F56C6C'),
                                    size: "mini",
                                    type: "text",
                                },
                                on: {
                                    click: () => { // 点击新建时传参param的值为edite
                                        this.edit(param.row)
                                    }
                                }
                            }, param.row.is_check == 0?'待审核':(param.row.is_check == 1?'审核通过':'审核驳回')),
                            h('i' , {
                                attrs:{
                                    style:'cursor: pointer;width:50px;',
                                    size: "mini",
                                    type: "text",
                                    class:param.row.is_check == 2?'el-icon-edit-outline':'el-icon-search'
                                },
                                on: {
                                    click: () => { // 点击新建时传参param的值为edite
                                        this.edit(param.row)
                                    }
                                }
                            }, '')];
                        return h('div', a);
                    }
                    }
            ]
        }
    },
    created(){
        this.getDate()
    },
    components: {
        MyTable
    },
     mounted(){
        this.gettable()//获取充值记录
        //初始化页面判断是否已登录
        this.initPage();
        //获取代理商详情信息
        this.getAgentDetail();
        //获取代理商详情信息
       this.getAgentlist()
       //得到打款的类表
       this.getselectid()
    },
    methods: {
        getDate(){
            var date = new Date()
            console.log(dateFormat(date))
            this.ruleForm.time = dateFormat(date)
        },
        resetForm(formName) {
            let that = this
            that.dialogFormVisible = false
            // that.$refs[formName].resetFields();
        },
        paywaychanges(e){
            console.log(e)
            let that = this
            that.account_id = e
        },
        paywaychange(e){//选择支付方式
            console.log(e)
            let that = this
            let arr = []
            // that.region = []
            that.ruleForm.region =''
            for(var i = 0;i<that.paylist.length;i++){
                if(that.paylist[i].type == e){
                    arr.push(that.paylist[i])
                }
            }
            console.log(arr)
            that.region = arr
        },
        getselectid(){//得到打款的类表
            let that = this
            let data={}
            that.$axios.post(that.url+'agent_api/account/getAccount',data).then(res=>{
                if(res.data.code===200){
                    console.log(res.data.data)
                    that.paylist = res.data.data
                }else{
                    that.$message({
                        type: 'error',
                        message:res.data.msg
                    });
                }
            })
        },
        handleClick(){
            let that = this
            that.tableData=[]
            that.page = 1
            if(that.activeName === 'one'){
                that.columns=[
                    {   prop: "time", 
                        label: "充值时间",
                        align: "center"
                    },
                    {   prop: "type",
                        label: "收款平台",
                        align: "center",
                        render: (h, param) => {
                        let a = [
                            h('span' , {
                                
                            }, param.row.type == 1?'支付宝':(param.row.type == 2?'微信':(param.row.type == 3?'银行卡':'其他'))),
                           ];
                        return h('div', a);
                    }
                    },
                    {   prop: "name",
                        label: "收款账户",
                        align: "center"
                    },
                    {   prop: "transaction_amount",
                        label: "充值金额",
                        align: "center"
                    },
                    {   prop: "created_at",
                        label: "提交时间",
                        align: "center"
                    },
                    {
                    prop: "",
                    label: "状态",
                    align: "center",
                    render: (h, param) => {
                        let a = [
                            h('span' , {
                                // props: {
                                //     size: "mini",
                                //     type: "text",
                                    
                                // },
                                attrs:{
                                    style:param.row.is_check == 0?'color:#409EFF':(param.row.is_check == 1?'color:#67C23A':'color:#F56C6C'),
                                    size: "mini",
                                    type: "text",
                                },
                                on: {
                                    click: () => { // 点击新建时传参param的值为edite
                                        this.edit(param.row)
                                    }
                                }
                            }, param.row.is_check == 0?'待审核':(param.row.is_check == 1?'审核通过':'审核驳回')),
                            h('i' , {
                                attrs:{
                                    style:'cursor: pointer;width:50px;',
                                    size: "mini",
                                    type: "text",
                                    class:param.row.is_check == 2?'el-icon-edit-outline':'el-icon-search'
                                },
                                on: {
                                    click: () => { // 点击新建时传参param的值为edite
                                        this.edit(param.row)
                                    }
                                }
                            }, '')];
                        return h('div', a);
                    }
                    }
            ]
                that.gettable()
            }else{//消费类表

                that.columns= [
                    {   prop: "created_at", 
                        label: "消费时间",
                        align: "center"
                    },
                    {   prop: "price",
                        label: "消费金额",
                        align: "center"
                    },
                    {   prop: "result",
                        label: "消费类型",
                        align: "center"
                    }
                ]
                that.gettable()
            }
        },
        handleAvatarSuccess(res, file) {
            let that = this
            console.log(res)
            if(res.code == 0){
                that.imglist = res.data.src;

            }else{
                that.$message.error("图片上传失败");
            }
        },
        beforeAvatarUpload(file) {
            const isimglist = file.type;
            console.log(file.type)
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (isimglist === 'image/jpeg' || isimglist ==='image/png') {
                
            }else{
                this.$message.error('上传图片只能是 JPG 格式或者png!');
                this.loading2 = false
                return false
            }
            // if(!isJPG){
            //     this.$message.error('上传图片只能是 JPG 格式或者png!');
            //     this.loading2 = false
            // }
             if(!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                this.loading2 = false
                return false
            }
            return isimglist && isLt2M;
        },
        initPage(){
            if(!localStorage.agentId||!localStorage.agentPhone){
                //设置跳转服务商页面
                localStorage.setItem('activeName','second');
                this.$router.push({path:'/wf/index/login',name:'index'})
            }
        },
        submitForm(formName) {
            let that= this
            that.loading = true
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(that.is_check == -1){//添加
                   let  data={
                        transaction_number:that.ruleForm.transaction_number,//交易单号
                        transaction_amount:that.ruleForm.transaction_amount,//交易金额
                        account_id:that.account_id,//账户id
                        time:that.ruleForm.time,//打款时间
                        pay_pictures:that.imglist,//截图
                        remarks:that.ruleForm.remarks
                    }
                    debugger
                    that.$axios.post(that.url+'agent_api/account/storeRecords',data).then(res=>{
                    console.log(res)
                    debugger
                        if(res.data.code===200){
                            that.$message({
                                type: 'success',
                                message:'添加成功'
                            });
                            that.loading = false
                            that.dialogFormVisible = false
                            that.ruleForm.time= ''//打款时间
                            that.$refs[formName].resetFields();
                            that.gettable()
                            that.judge = 0
                        }else{
                            that.$message({
                                type: 'error',
                                message:res.data.msg
                            });
                        }
                    
                    }).catch(err=>{
                        that.$message({
                            type: 'error',
                            message:'网络错误！'
                        });
                    });
                }else if(that.is_check == 2){//编辑
                    that.$axios.post(that.url+'agent_api/account/storeRecords',{
                        id:that.id,
                        transaction_number:that.ruleForm.transaction_number,//交易单号
                        transaction_amount:that.ruleForm.transaction_amount,//交易金额
                        account_id:that.account_id,//账户id
                        time:that.ruleForm.time,//打款时间
                        pay_pictures:that.imglist,//截图
                        remarks:that.ruleForm.remarks
                    }).then(function(res){
                        console.log(res)
                        if(res.data.code == 200){
                            that.$message({
                                type: 'success',
                                message:'添加成功'
                            });
                            that.loading = false
                            that.dialogFormVisible = false
                            that.ruleForm.time= ''//打款时间
                            that.$refs[formName].resetFields();
                            that.gettable()
                            that.judge = 0
                        }else{
                            that.$message({
                                type: 'error',
                                message:res.data.msg
                            });
                        }
                    
                    })
                }
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        edit(e){//数据回填
            //判断是属于驳回还是通过
            let that = this 
            that.ll = false
            
            console.log(e)
            if(e.is_check == 2){//2属于驳回,为重新编辑
                that.judge = 1 //1为修改只有驳回修改
                that.dialogFormVisible = true
                console.log(e.id)
                that.id = e.id
                that.is_check = e.is_check
                let data={
                    type:1,
                    id:e.id
                }
                that.$axios.post(that.url+'agent_api/account/getRecords',data).then(res=>{
                    if(res.data.code===200){
                        console.log(res.data.data)
                        // that.$message({
                        //     type: 'success',
                        //     message:'添加成功'
                        // });
                        that.ruleForm.transaction_number = res.data.data.transaction_number,//交易单号
                        that.ruleForm.transaction_amount= res.data.data.transaction_amount,//交易金额
                        that.account_id= res.data.data.account_id,//账户id
                        that.ruleForm.paywatype=res.data.data.account_info.type,
                        that.ruleForm.time= res.data.data.check_time,//打款时间
                        that.imglist= res.data.data.pay_pictures,//截图
                        that.ruleForm.check_remarks = res.data.data.check_remarks
                        // that.region=res.data.data.account_info
                        let arr =[]
                        for(var i = 0;i<that.paylist.length;i++){
                            if(that.paylist[i].type == res.data.data.account_info.type){
                                arr.push(that.paylist[i])
                            }
                        }
                        console.log(arr)
                        that.region = arr
                        that.ruleForm.region=res.data.data.account_info.account_name
                        that.ruleForm.remarks= res.data.data.remarks
                        that.ruleForm.check_time = res.data.data.check_time
                        that.ruleForm.name = res.data.data.name
                        console.log(res.data.data.account_info)
                    }else{
                        that.$message({
                            type: 'error',
                            message:res.data.msg
                        });
                    }
                
                }).catch(err=>{
                    that.$message({
                        type: 'error',
                        message:'网络错误！'
                    });
                });
            }else if(e.is_check == 1 || e.is_check == 0){//1属于审核通过,为查看
                that.judge = 2 //2位审核通过查看
                that.dialogFormVisible = true
                that.ll = true
                that.is_check = e.is_check//显示审核状态
                that.id = e.id
                let data={
                    type:1,
                    id:e.id
                }
                that.$axios.post(that.url+'agent_api/account/getRecords',data).then(res=>{
                    if(res.data.code===200){
                        console.log(res.data.data)
                        // that.$message({
                        //     type: 'success',
                        //     message:'添加成功'
                        // });
                        that.ruleForm.transaction_number = res.data.data.transaction_number,//交易单号
                        that.ruleForm.transaction_amount= res.data.data.transaction_amount,//交易金额
                        that.account_id= res.data.data.account_id,//账户id
                        that.ruleForm.paywatype=res.data.data.account_info.type,
                        that.ruleForm.time= res.data.data.check_time,//打款时间
                        that.imglist= res.data.data.pay_pictures//截图
                        // that.region=res.data.data.account_info
                        let arr =[]
                        for(var i = 0;i<that.paylist.length;i++){
                            if(that.paylist[i].type == res.data.data.account_info.type){
                                arr.push(that.paylist[i])
                            }
                        }
                        console.log(arr)
                        that.region = arr
                        that.ruleForm.region=res.data.data.account_info.account_name
                        that.ruleForm.remarks= res.data.data.remarks
                        that.ruleForm.check_time = res.data.data.check_time
                        that.ruleForm.name = res.data.data.name
                        console.log(res.data.data.account_info)
                    }else{
                        that.$message({
                            type: 'error',
                            message:res.data.msg
                        });
                    }
                
                }).catch(err=>{
                    that.$message({
                        type: 'error',
                        message:'网络错误！'
                    });
                });
            }
        },
        pay(){//充值按钮
            let that= this
            that.dialogFormVisible = true
            that.is_check = -1
            that.judge = 0
            that.ruleForm.transaction_number= '',//交易单号
            that.ruleForm.transaction_amount='',//交易的金额
            that.ruleForm.paywatype='',
            that.ruleForm.region='',
            that.ruleForm.check_time='',
            that.ruleForm.name='',
            that.imglist='',
            that.ruleForm.time='',//打款时间
            that.ruleForm.remarks=''//备注
            that.getDate()
            
        },
        onCopy(){
            this.$message({
                type: 'success',
                message: '已复制到剪切板！'
            });
        },
        onError(){
            this.$message({
                    type: 'error',
                    message: '复制失败！'
                });
        },
        gettable(){//获取消费记录
            let that = this
            let type = -1
            if(that.activeName == 'one'){
                type = 1//充值记录
            }else if(that.activeName == 'two'){
                type = 2//消费记录
            }
            let data={
                type : type,
                page: that.page
            }
            that.$axios.post(that.url+'agent_api/account/records',data).then(res=>{
                if(res.data.code===200){
                    console.log(res.data.data)
                    that.tableData = res.data.data.data
                    that.pageCount =  res.data.data.total
                }else{
                    that.$message({
                        type: 'error',
                        message:res.data.msg
                    });
                }
               
            }).catch(err=>{
                that.$message({
                    type: 'error',
                    message:'网络错误！'
                });
            });
        },
        getAgentDetail:function(){//获取代理商详情信息
            let that=this;
            let data={};
            this.$axios.post(this.url+'agent_api/account/info',data).then(res=>{
                if(res.data.code===200){
                    that.formAddGroupData=res.data.data;
                    that.formAddGroupData.term_of_validity=dateFormat(that.formAddGroupData.term_of_validity);
                    that.formAddGroupData.discount_state=res.data.data.discount_state;
                }else{
                    this.$message({
                        type: 'error',
                        message:res.data.msg
                    });
                }
               
            }).catch(err=>{
                this.$message({
                    type: 'error',
                    message:'网络错误！'
                });
            });
        },
         getAgentlist:function(){ // 获取代理商使用情况
            let that=this;
            let data={};
            this.$axios.post(this.url+'agent_api/account/accountSmallNum',data).then(res=>{
                console.log(res.data.data)
                if(res.data.code===200){
                    that.pxyzlist = res.data.data
                }else{
                    this.$message({
                        type: 'error',
                        message:res.data.msg,
                    });
                }
            }).catch(err=>{
                this.$message({
                    type: 'error',
                    message:'网络错误'
                });
            });
        },
        getPages(e){
            console.log(e)
            let that = this
            that.page = e
            that.gettable()
        }
    }
}
</script>

<style lang="scss" scoped>
   #overview{
       .el-input{
            width: 179px;
        }
       
       
       
       
       .clear{
           clear: both;
       }
       .wf-overview-title{
           background:#fff;padding-bottom:20px;
       }
       .overview-wf-title{
           font-size:24px;
           width: 100%;
           height: 85px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            border-bottom: 1px solid #F0F0F0;
            line-height: 85px;
            padding-left:49px;
       }
       .overview-wf-top{
           width: 100%;
           padding-left:56px; 
           margin-bottom:20px;
           margin-top:20px;
           .overview-wf-top-one{
            //    background: #F6F6F6;
               height: 56px;
               line-height: 56px;
               font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
                // text-align: center;
                padding-left:39px;
                margin-right:60px;
                
           }
       }
       /deep/ .el-tabs{
        margin-top: 20px;
        width: 100%;
        .el-tabs__header{
            margin: 0;
            background: #F8F8F8;
            border-radius: 4px;
            padding-left: 25px;
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
                display: none;
            }
        }
    }
    .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 78px;
            border: 1px dashed #d9d9d9;
            height: 78px;
            line-height: 78px;
            text-align: center;
        }
        .avatar {
            width: 78px;
            height: 78px;
            display: block;
        }
       .big_data{
           box-shadow:none;
           flex-wrap: wrap;
           padding:0;
           .big_datalist{
               margin-right: 190px;
               margin-bottom: 33px;
           }
           .number_box,.number_boxl,.number_boxll,.number_boxlls,.number_boxlll{
               background: #6E9ECF;
               height: 56px;
               margin-bottom:0;
               line-height: 56px;
               font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
                padding-left:37px;
           }
           .number_boxl{
               background: #DF6A65;
           }
           .number_boxll{
               background: #68BDB6;
           }
           .number_boxlls{
               background: #8D93E5;
           }
           .number_boxlll{
                background: #EDCD68;
           }
           .number,.number-text{
               background: #f6f6f6;
               height: 100px;
               font-size:32px;
               line-height: 100px;
                font-family:SanFranciscoDisplay-Bold;
                font-weight:bold;
                color:rgba(244,102,102,1);
                text-align: center;
           }
           .number-text{
               color:rgba(153,153,153,1);
           }
           .small-text{
               font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(153,153,153,1);
           }
       }
       .big_datas{
           box-shadow:none;
           
           .big_datalist{
            //    margin-right: 190px;
               margin-bottom: 33px;
           }
           .number_box,.number_boxl,.number_boxll,.number_boxlls,.number_boxlll{
               background: #6E9ECF;
               height: 56px;
               margin-bottom:0;
               line-height: 56px;
               font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
                padding-left:37px;
           }
           .number_boxl{
               background: #DF6A65;
           }
           .number_boxll{
               background: #68BDB6;
           }
           .number_boxlls{
               background: #8D93E5;
           }
           .number_boxlll{
                background: #EDCD68;
           }
           .number,.number-text{
               background: #f6f6f6;
               height: 100px;
               font-size:32px;
               line-height: 100px;
                font-family:SanFranciscoDisplay-Bold;
                font-weight:bold;
                color:rgba(244,102,102,1);
                text-align: center;
           }
           .number-text{
               color:rgba(153,153,153,1);
           }
           .small-text{
               font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(153,153,153,1);
           }
       }
       .overview-wf-top-hover{
           width: 100%;
           background: #fff;
           margin-top: 20px;
       }
       .overview-hover{
           margin-top:20px;
           background:#fff;
        //    height: 86px;
           padding: 0 49px;
           .overview-hover-left{
            font-size:24px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(219,84,68,1);
            height: 86px;
            line-height: 86px;
            }
            .overview-hover-right{
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:#333;
                     height: 86px;
                     padding-top:36px;
                     cursor: pointer;
                    .overview-hover-right-img{
                        width: 22px;
                        height: 22px;
                        // background: red;
                    }
            }
       }
       
   }
   .wf-proxy-overview{
       .wf-overview-data{
            padding: 38px 50px;
            // margin-bottom: 20px;
            background:#fff;
            margin-top:20px;
            min-height: 360px;
       }
   }
</style>
