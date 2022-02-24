<template>
    <div class="wf-editEnterStore">
        <div class="wf-background"></div>
        <div class="wf-form-box">
            <el-form label-position="right" label-width="110px" :model="formData" :rules="formRules" ref="formData">
                <el-form-item label="活动标题" prop="title">
                    <span v-if="editType===2">{{formData.title}}</span>
                    <el-input v-else v-model="formData.title" :maxlength="20" class="wf-input-width" size="mini">
                        <span slot="suffix">{{formData.title.length}}/20</span>
                    </el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <span v-if="editType===2">{{formData.start_time}}</span>
                    <el-date-picker
                    v-else
                    v-model="formData.start_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    size="mini">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time">
                    <span v-if="editType===2">{{formData.end_time}}</span>
                    <el-date-picker
                    v-else
                    v-model="formData.end_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    size="mini">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="发送给" prop="time">
                    <div>
                        <el-checkbox v-model="formData.new_shopper" @change="checkChange" :disabled="editType===2?true:false" :true-label="1" :false-label="0" class="wf-form-check"></el-checkbox>
                        <span class="wf-margin-right">新客</span>
                        <span class="wf-gray-title">新客礼包领取资格：还未提交订单、提交订单未付款的客户，且没有领过本次发放的新客礼包。</span>
                    </div>
                    <div>
                        <el-checkbox v-model="formData.aged_shopper" @change="checkChange2" :disabled="editType===2?true:false" :true-label="1" :false-label="0" class="wf-form-check"></el-checkbox>
                        <span class="wf-margin-right">老客</span>
                        <span class="wf-gray-title">提交货到付款订单、支付成功后退款的客户</span>
                    </div>
                    <div>
                        <span class="wf-margin-right">发券频率</span>
                        每
                        <span v-if="editType===2">{{formData.time}}</span>
                        <el-select v-model="formData.time" v-else class="wf-select-width" size="mini">
                            <el-option
                            v-for="item in timeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        天首次进店发券
                        <p class="wf-gray-title" style="margin-left:80px;">举例：选择5，则老客每隔5天第一次进店会发放优惠券</p>
                    </div>
                </el-form-item>
                <el-form-item label="礼品设置" prop="integral">
                    <div>
                        <el-checkbox v-model="coupon_state" @change="checkChange3" :disabled="editType===2?true:false" :true-label="1" :false-label="0" class="wf-form-check"></el-checkbox>
                        <span class="wf-margin-right">优惠券</span>
                        <el-button @click="getCupon(1)" v-if="editType===2?false:true" size="mini" :icon="tableData.length===0?'el-icon-plus':'el-icon-edit'">{{tableData.length===0?"添加":"修改"}}优惠券</el-button>
                        <el-tag v-if="tableData.length>0" size="mini">已选择{{tableData.length}}张优惠券</el-tag>
                        <span class="wf-gray-title">最多可添加5张优惠券</span>
                    </div>
                    <my-table style="margin-bottom:20px;" :tableData="tableData" :columns="columns" :pagination="false" emptyText="请添加优惠券" ref="table"></my-table>
                    <div>
                        <el-checkbox v-model="integral_state" @change="checkChange4" :disabled="editType===2?true:false" :true-label="1" :false-label="0" class="wf-form-check"></el-checkbox>
                        <span class="wf-margin-right">赠送</span>
                        <span v-if="editType===2">{{formData.integral===0?undefined:formData.integral}}</span>
                        <el-input-number v-model="formData.integral" v-else :controls="false" :precision="0" :min="0" size="mini"></el-input-number> 积分,获得条件
                        <span v-if="editType===2">{{conditionOptions[formData.condition].label}}</span>
                        <el-select v-model="formData.condition" v-else class="wf-select-width" size="mini">
                            <el-option
                            v-for="item in conditionOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-form>
            <div class="wf-footer">
                <el-button @click="cancle" style="margin-left:14px;" size="mini">返回</el-button>
                <el-button @click="save('formData')" :loading="saveLoading" v-if="editType===2?false:true" type="primary" size="mini">保存</el-button>
            </div>
        </div>
        <div class="clear"></div>
        <el-dialog
            title="选择优惠券"
            :visible.sync="couponDialog"
            width="1000px"
            :close-on-click-modal="false"
            center>
            <div style="margin-bottom:10px;">
                <span style="float:left">
                    <el-button size="mini" class="wf-button-primary" icon="el-icon-plus" type="primary" @click="addCupon">新建</el-button>
                    <el-button :loading="refreshLoading" @click="getCupon(1,2)" icon="el-icon-refresh" size="mini" class="wf-button-default">刷新</el-button>
                </span>
                <span style="float:right">
                    <el-input style="width:300px;" v-model="cupon_search" placeholder="输入优惠券名称" size="mini"></el-input>
                    <el-button :loading="searchLoading" @click="getCupon(1,1)" size="mini" class="wf-button-primary" type="primary" icon="el-icon-search">搜索</el-button>
                </span>
                <div class="clear"></div>
            </div>
            <my-table
            :tableData="couponTable"
            ref="couponTable"
            :columns="couponColumns"
            :totalPage="couponTotalPage"
            :pageSize="5"
            :currentPage="couponCurrent"
            @currentChange="getCupon"
            :mutiSelect="true"
            :reserveSelection="true"
            @multipleSelection="multipleSelection">
            </my-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="couponDialog = false" size="mini">取消</el-button>
                <el-button type="primary" @click="definite" size="mini">确定({{select_data.length}})</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { getCuponList  } from '@/server/checkIn.js'
import { enterStoreSave,enterStoreEdit } from "@/server/enterStore.js"
export default {
    name: "editEnterStore",
    data() {
        let timeValid =(rule, value, callback) => {
            if(value===''||value===null){
                if(rule.field==='start_time'){
                    callback(new Error("请填写开始时间"))
                }else if(rule.filed==='end_time'){
                    callback(new Error("请填写结束时间"))
                }
            }else{
                callback()
            }
        };
        let integralValid = (rule, value, callback) => {
            if(this.coupon_state===1){
                let a = this.tableData.some(item=>{
                    return item.num===undefined
                })
                if(this.tableData.length<1){
                    callback(new Error("请选择优惠券"))
                }else if(a){
                    callback(new Error("请填写赠券数"))
                }else{
                    callback()
                }
            }
            if(this.integral_state===1){
                if(value){
                    callback()
                }else{
                    callback(new Error("请填写赠送积分"))
                }
            }else{
                callback()
            }
        };
        return{
            setMin: [],
            editFlag: false,
            editType: parseInt(this.$route.query.type),
            select_data: [],
            saveLoading: false,
            coupon_state: 1,
            integral_state: 0,
            timeOptions: [],
            conditionOptions: [
                { value: 0, label: "进店即得"},{ value: 1, label: "支付后得"}
            ],
            formData: {
                title: "",
                start_time: "",
                end_time: "",
                new_shopper: 1, // 发送给新客
                aged_shopper: 1, // 发送给老客
                integral: undefined,
                time: 1, // 发送频率
                condition: 0, // 发送频率
            },
            formRules: {
                title: [
                    { required: true, message: '请填写活动标题', trigger: 'blur' }
                ],
                start_time: [
                    { required: true, validator: timeValid, trigger: 'change' }
                ],
                end_time: [
                    { required: true, validator: timeValid, trigger: 'change' }
                ],
                time: [
                    { required: true, message: '请选择发送客户', trigger: 'blur' }
                ],
                integral: [
                    { required: true, validator: integralValid, trigger: 'blur' }
                ]
            },
            tableData: [],
            columns: [
                {   
                    label: "优惠券名称",
                    align: "center",
                    prop: "coupon_name"
                },
                {   
                    label: "面额",
                    align: "center",
                    prop: "coupon_price"
                },
                {   
                    label: "赠券数",
                    align: "center",
                    render: (h,param)=>{
                        let that = this
                        let a
                        if(this.editType===2){
                            a = h('span', param.row.num)
                        }else if(this.editType===1){
                            a = h('el-input-number',{
                                props: {
                                    value: param.row.num,
                                    size: "mini",
                                    controls: false,
                                    precision: 0,
                                    min: this.setMin[param.index],
                                    max: 5
                                },
                                attrs: {
                                    style: "width:100px;"
                                },
                                on: {
                                    input: (val) => {
                                        let data = JSON.parse(JSON.stringify(this.tableData))
                                        let num = 0
                                        for(let i=0;i<data.length;i++){
                                            num += parseInt(data[i].num)
                                        }
                                        if(num>5){
                                            this.$message.warning('优惠券总共最多选择5张')
                                            param.row.num = 0
                                            return false
                                        }
                                        param.row.num = val
                                    }
                                }
                            })
                        }else{
                            a = h('el-input-number',{
                                props: {
                                    value: param.row.num,
                                    size: "mini",
                                    controls: false,
                                    precision: 0,
                                    min: 0,
                                    max: 5
                                },
                                attrs: {
                                    style: "width:100px;"
                                },
                                on: {
                                    input: (val) => {
                                        let data = JSON.parse(JSON.stringify(this.tableData))
                                        let num = 0
                                        for(let i=0;i<data.length;i++){
                                            num += parseInt(data[i].num)
                                        }
                                        if(num>5){
                                            this.$message.warning('优惠券总共最多选择5张')
                                            param.row.num = 0
                                            return false
                                        }
                                        param.row.num = val
                                    }
                                }
                            })
                        }
                        return a
                    }
                },
                { 
                    label: "获得条件",
                    align: "center",
                    render: (h,param)=>{
                        let a
                        if(this.editType===2){
                            a = h('span', this.conditionOptions[param.row.condition].label)
                        }else{
                            a = h('el-select',{
                                props: {
                                    value: param.row.condition,
                                    size: "mini"
                                },
                                attrs: {
                                    style: "width:100px;"
                                },
                                on:{
                                    input :(val)=>{
                                        param.row.condition = val
                                    }
                                }
                            },[
                                h('el-option', {
                                    props: {
                                        value: 0,
                                        label: '进店即得'
                                    }
                                }),
                                h('el-option', {
                                    props: {
                                        value: 1,
                                        label: '支付后得'
                                    }
                                })
                            ])
                        }
                        return a
                    }
                },
                {
                    label: "操作",
                    align: "center",
                    width: "100",
                    render: (h,param)=>{
                        let that = this
                        return h('el-button',{
                            props: {
                                type: "text"
                            },
                            attrs: {
                                disabled: parseInt(this.$route.query.type)!==2?false:true,
                                style: "color:#FB6664;"
                            },
                            on:{
                                click: () =>{
                                    that.tableData.splice(param.index,1)
                                    that.$refs.couponTable.$refs.multipleTable.toggleRowSelection(that.select_data[param.index],false);
                                    that.select_data.splice(param.index,1)
                                }
                            }
                        }, "删除")
                    }
                }
            ],
            // 优惠券弹框
            refreshLoading: false,
            searchLoading: false,
            cupon_search: "",
            couponDialog: false,
            couponCurrent: 1,
            couponTotalPage: 0,
            couponTable: [],
            couponColumns: [
                {   
                    label: "优惠券名称",
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
                    prop: "coupon_num",
                    width: "80"
                }
            ],
            // 优惠券弹框
        }
    },
    components: {
        MyTable
    },
    mounted(){
        for(let i=1;i<31;i++){
            this.timeOptions.push({ value: i, label: i })
        }
        if(this.$route.query.id){
            this.enterStoreEdit()
        }
        let that = this
        this.getCupon(1,3)
    },
    methods: {
        enterStoreEdit(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: parseInt(this.$route.query.id)
            }
            enterStoreEdit(data).then((res)=>{
                if(res.data.code===200){
                    that.formData.title = res.data.data.title
                    that.formData.start_time = res.data.data.start_time
                    that.formData.end_time = res.data.data.end_time
                    that.formData.new_shopper = res.data.data.new_shopper
                    that.formData.aged_shopper = res.data.data.aged_shopper
                    that.formData.time = res.data.data.time
                    if(res.data.data.coupon_info.length<1){
                        that.coupon_state = 0
                    }else{
                        that.coupon_state = 1
                        that.tableData = JSON.parse(JSON.stringify(res.data.data.coupon_info))
                        that.select_data = JSON.parse(JSON.stringify(res.data.data.coupon_info))
                        that.setMin = res.data.data.coupon_info.map((item)=>{
                            return item.num
                        })
                    }
                    if(res.data.data.integral===0){
                        that.integral_state = 0
                    }else{
                        that.integral_state = 1
                        that.formData.integral = res.data.data.integral
                        that.formData.condition = res.data.data.condition
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00177");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00178');
            })
        },
        checkChange(val){
            if(val===0&&this.formData.aged_shopper===0){
                this.$message.warning("至少选择一种发送客户")
                this.formData.new_shopper = 1
            }
        },
        checkChange2(val){
            if(val===0&&this.formData.new_shopper===0){
                this.$message.warning("至少选择一种发送客户")
                this.formData.aged_shopper = 1
            }
        },
        checkChange3(val){
            if(val===0&&this.integral_state===0){
                this.$message.warning("至少选择一种礼品")
                this.coupon_state = 1
            }
        },
        checkChange4(val){
            if(val===0&&this.coupon_state===0){
                this.$message.warning("至少选择一种礼品")
                this.integral_state = 1
            }
        },
        addCupon(){
            window.open(this.$router.resolve({path:'/wf/admin/shop/markting/coupon/addCoupon'}).href);
        },
        getCupon(currentPage,type){
            this.couponCurrent = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: this.couponCurrent,
                coupon_name: this.cupon_search!==""?this.cupon_search:undefined,
                type: 3
            }
            if(type===1){
                this.searchLoading = true
            }else if(type===2){
                this.refreshLoading = true
            }
            getCuponList(data).then((res)=>{
                that.searchLoading = false
                that.refreshLoading = false
                if(res.data.code===200){
                    that.couponTable = res.data.data
                    that.couponTotalPage = res.data.count
                    if(type!==3){
                        that.couponDialog = true
                        if(that.$route.query.id){
                            that.$nextTick(()=>{
                                let remSelect = JSON.parse(JSON.stringify(that.select_data))
                                remSelect.forEach((el,index) => {
                                    that.couponTable.forEach((item,i) => {
                                        if(el.coupon_id===item.id){
                                            that.editFlag = true
                                            that.$refs.couponTable.$refs.multipleTable.toggleRowSelection(item,true);
                                        }
                                    });
                                });
                                that.editFlag = false
                            })
                        }
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00139");
                }
            }).catch((err)=>{
                that.searchLoading = false
                that.refreshLoading = false
                that.$message.error('网络错误600B00140');
            })
        },
        multipleSelection(row){
            if(this.editFlag){
                this.editFlag = false
            }else{
                this.select_data = row
            }
        },
        definite(){
            if(this.select_data.length>5){
                this.$alert('挑选的数量超过限制，请重新选择。', {
                    confirmButtonText: '知道了',
                    showClose: false,
                    center: true
                });
            }else{
                let obj = {}
                this.tableData = this.select_data.map((item)=>{
                    return obj = {
                        coupon_id: item.id,
                        coupon_name: item.coupon_name,
                        coupon_price: item.subtraction_price,
                        num: 1,
                        condition: 0
                    }
                })
                this.couponDialog = false
            }
        },
        cancle(){
            this.$router.push({path:"/wf/admin/shop/markting/enterStore"})
        },
        save(ruleForm){
            let that = this
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    let formData = JSON.parse(JSON.stringify(that.formData))
                    let token = {
                        secret: localStorage.getItem('secretId'),
                        id: that.$route.query.id?parseInt(that.$route.query.id):undefined
                    }
                    let tableData = {}
                    tableData.coupon_info = JSON.parse(JSON.stringify(that.tableData))
                    let bigger = false
                    this.select_data.forEach(item => {
                        tableData.coupon_info.forEach(el => {
                            if(item.coupon_id===el.coupon_id||item.id===el.coupon_id){
                                if(el.num>item.coupon_num){
                                    bigger = true
                                }
                            }
                        });
                    });
                    if(bigger){
                        this.$message.warning("赠券数不能大于优惠券库存")
                        return false
                    }
                    if(that.coupon_state===0){
                        tableData.coupon_info = []
                    }
                    if(that.integral_state===0){
                        formData.integral = 0
                        formData.condition = 0
                    }
                    if(formData.aged_shopper===0){
                        formData.time = 0
                    }
                    let data = Object.assign(formData,token,tableData)
                    that.saveLoading = true
                    enterStoreSave(data).then((res)=>{
                        that.saveLoading = false
                        if(res.data.code===200){
                            that.$message.success("保存成功")
                            that.$router.push({path:"/wf/admin/shop/markting/enterStore"})
                        }else{
                            that.$message.error(res.data.msg+"600A00175");
                        }
                    }).catch((err)=>{
                        that.saveLoading = false
                        that.$message.error('网络错误600B00176');
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-editEnterStore{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    .clear{
        clear: both;
    }
    .el-button--primary{
        background: #719FF8;
        border-color: #719FF8;
    }
    .el-button--text{
        padding: 0;
        color: #719FF8;
    }
    .wf-background{
        width: 406px;
        height: 634.2px;
        background: url("https://cdn1.19mini.com/2019-05-28%2Fbd035732fd55e64e1862f895b15d8b5f.png") no-repeat;
        background-size: 100% 100%;
        float: left;
    }
    .wf-form-box{
        margin-left: 50px;
        width: 60%;
        float: left;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        box-sizing: border-box;
    }
     .wf-input-width{
        width: 360px;
    }
    /deep/ .el-input-number{
        .el-input__inner{
            text-align: left;
        }
    }
    .wf-gray-title{
        color: #999;
        font-size: 12px;
    }
    .wf-form-check{
        margin-right: 10px;
    }
    .wf-margin-right{
        margin-right: 20px;
    }
    /deep/ .el-checkbox{
        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
            background-color: #719FF8;
            border-color: #719FF8;
        }
    }
    .wf-select-width{
        width: 100px;
    }
    /deep/ .el-dialog{
        .el-dialog__header{
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        .el-pagination{
            text-align: center;
            margin-top: 20px;
        }
    }
    /deep/ .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
        color: #C0C4CC;
        border-color: #EBEEF5;
        background-color: #FFF;
    }
    /deep/ .el-button--text.is-disabled{
        border: none;
    }
    .wf-footer{
        margin-top: 20px;
        text-align: center;
    }
}
</style>
