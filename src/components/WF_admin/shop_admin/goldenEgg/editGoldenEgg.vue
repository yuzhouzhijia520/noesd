<template>
    <div class="wf-editGoldenEgg">
        <div class="wf-background"></div>
        <div class="wf-form-box">
            <el-form label-position="right" label-width="110px" :model="formData" :rules="formRules" ref="formData">
                <div class="wf-gray-box">基本信息</div>
                <el-form-item label="活动标题" prop="title">
                    <span v-if="editType">{{formData.title}}</span>
                    <el-input v-else v-model="formData.title" :maxlength="20" class="wf-input-width" size="mini">
                        <span slot="suffix">{{formData.title.length}}/20</span>
                    </el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <span v-if="editType">{{formData.start_time}}</span>
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
                    <span v-if="editType">{{formData.end_time}}</span>
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
                <el-form-item label="活动规则说明" prop="description">
                    <p v-if="editType" v-html="formData.description" class="wf-textarea-html"></p>
                    <el-input v-else v-model="formData.description" :autosize="{ minRows: 2, maxRows: 4}" :maxlength="300" type="textarea" class="wf-input-width" size="mini"></el-input>
                    <span v-if="!editType" class="wf-textarea-num">{{formData.description.length}}/300</span>
                </el-form-item>
                <el-form-item label="中奖名单" prop="status">
                    <span v-if="editType">{{formData.status===0?"隐藏":"显示"}}</span>
                    <el-radio-group v-else v-model="formData.status">
                        <el-radio :label="1">显示</el-radio>
                        <el-radio :label="0">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="可玩次数" prop="luck_draw_num">
                    <div class="wf-margin-bottom">
                        <span class="wf-span-width">每人可抽奖</span>
                        <span v-if="editType">{{formData.luck_draw_num}}</span>
                        <el-input-number v-else v-model="formData.luck_draw_num" @blur="drawBlur" :controls="false" :precision="0" :min="1" class="wf-number-input" size="mini"></el-input-number>
                        <span v-if="editType">{{lotteryOptions[formData.luck_draw_state].label}}</span>
                        <el-select v-else v-model="formData.luck_draw_state" size="mini">
                            <el-option
                            v-for="item in lotteryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span class="wf-span-width" prop="winning_num">每人最多中奖</span>
                        <span v-if="editType">{{formData.winning_num}}</span>
                        <el-input-number v-else v-model="formData.winning_num" @blur="winningBlur" :controls="false" :precision="0" :min="1" class="wf-number-input" size="mini"></el-input-number>
                        <span v-if="editType">{{lotteryOptions[formData.winning_num_state].label}}</span>
                        <el-select v-else v-model="formData.winning_num_state" size="mini">
                            <el-option
                            v-for="item in lotteryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="参与条件" prop="use_integral">
                    <div>
                        <el-checkbox v-model="formData.use_integral_state" @change="checkChange" :disabled="editType?true:false" :true-label="1" :false-label="0" class="wf-form-check"></el-checkbox>
                        <span class="wf-margin-right">每砸一次蛋，消耗</span>
                        <span v-if="editType">{{formData.use_integral}}</span>
                        <el-input-number v-else v-model="formData.use_integral" :controls="false" :precision="0" :min="1" class="wf-number-input" size="mini"></el-input-number>积分
                        <span class="wf-gray-title">积分大于等于1</span>
                    </div>
                    <div>
                        <el-checkbox v-model="formData.order_num_state" @change="checkChange2" :disabled="editType?true:false" :true-label="1" :false-label="0" class="wf-form-check"></el-checkbox>
                        <span class="wf-margin-right">下单成功获得一次砸蛋机会</span>
                        <!-- <span class="wf-gray-title">确认收货后才可使用奖品</span> -->
                    </div>
                </el-form-item>
            </el-form>
            <div class="wf-gray-box">中奖设置</div>
            <my-table :tableData="tableData" :columns="columns" :pagination="false" emptyText="请添加奖项" ref="table" v-if="flagShow"></my-table>
            <div class="wf-margin-bottom" v-if="!editType">
                <el-button @click="couponDialog=true" style="margin-left:14px;" size="mini">添加优惠券</el-button>
                <el-button @click="addIntegral" size="mini">添加积分</el-button>
            </div>
            <el-form label-position="right" label-width="100px">
                <el-form-item label="未中奖概率">
                    <span>{{formData.draw_no_chance}}</span> %
                </el-form-item>
            </el-form>
            <div class="wf-footer">
                <el-button @click="cancle" style="margin-left:14px;" size="mini">返回</el-button>
                <el-button @click="save('formData')" :loading="saveLoading" v-if="editType!==2" type="primary" size="mini">保存</el-button>
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
            @currentChange="getCupon">
            </my-table>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { getCuponList  } from '@/server/checkIn.js'
import { goldenEggUpdate, goldenEggEdit } from "@/server/goldenEgg.js"
import {dateFormat} from '@/untils/common.js';
export default {
    name: "editGoldenEgg",
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
        let drawValid=(rule, value, callback) => {
            if(this.formData.luck_draw_num===undefined){
                callback(new Error("请填写每人可抽奖次数"))
            }else if(this.formData.winning_num===undefined){
                callback(new Error("请填写每人最多中奖次数"))
            }else{
                callback()
            }
        };
        let integralValid=(rule, value, callback) => {
            if(this.formData.use_integral_state===1&&!value){
                callback(new Error("请填写参与条件消耗积分"))
            }else{
                callback()
            }
        };
        return {
            setMax: [],
            setMin: [], // 获取编辑回填时的剩余数量
            editType: parseInt(this.$route.query.type),
            saveLoading: false,
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
                },
                {
                    label: "操作",
                    align: "center",
                    render: (h,param)=>{
                        return h('el-button', {
                            props: {
                                type: "text"
                            },
                            attrs: {
                                style: "color:#719FF8;"
                            },
                            on: {
                                click: () => {
                                    this.choose(param.row)
                                }
                            }
                        }, "选择");
                    }
                }
            ],
            // 优惠券弹框
            flagShow: true,
            lotteryOptions: [
                {
                    value: 0,
                    label: "次/活动全程"
                },
                {
                    value: 1,
                    label: "次/每天"
                }
            ],
            formData: {
                title: "", // 活动标题
                start_time: "",
                end_time: "",
                description: "", // 活动规则说明
                status: 1, // 中奖名单显示隐藏
                luck_draw_num: 1, // 每人可抽奖次数
                luck_draw_state: 0, // 抽奖次数状态
                winning_num: 1, // 每人最多中奖次数
                winning_num_state: 0, // 中奖次数状态
                use_integral: undefined, // 每次消耗多少积分砸蛋
                use_integral_state: 1, // 是否开启消耗积分砸蛋
                order_num_state: 1, // 是否开启下单成功增加1次砸蛋数
                draw_no_chance: undefined, // 未中奖概率
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
                description: [
                    { required: true, message: '请填写活动规则说明', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择中奖名单', trigger: 'blur' }
                ],
                luck_draw_num: [
                    { required: true, validator: drawValid, trigger: 'blur' }
                ],
                use_integral: [
                    { required: true, validator: integralValid, trigger: 'blur' }
                ]
            },
            tableData: [],
            columns: [
                {   
                    renderHeader:(h, param) => {
                        return [
                            h('span',{
                                attrs: {
                                    style: "color:#FB6664;"
                                }
                            },"*"),
                            h('span',"奖项名称")
                        ]
                    },
                    align: "center",
                    render: (h,param)=>{
                        let a
                        if(this.editType){
                            a = h('span',param.row.name)
                        }else{
                            a = h('el-input',{
                                props: {
                                    value: param.row.name,
                                    size: "mini"
                                },
                                on:{
                                    input: (val) =>{
                                        param.row.name = val;
                                    }
                                }
                            })
                        }
                        return a
                    }
                },
                {   
                    renderHeader:(h, param) => {
                        return [
                            h('span',{
                                attrs: {
                                    style: "color:#FB6664;"
                                }
                            },"*"),
                            h('span',"奖项内容")
                        ]
                    },
                    align: "center",
                    render: (h,param)=>{
                        let a
                        if(param.row.type===0){
                            a = h('span', param.row.content)
                        }else if(param.row.type===1){
                            if(this.editType){
                                a = h('span', param.row.prize+" 积分")
                            }else{
                                a = [
                                    h('el-input-number',{
                                        props: {
                                            value: param.row.prize,
                                            size: "mini",
                                            controls: false,
                                            precision: 0,
                                            min: 0
                                        },
                                        attrs: {
                                            style: "width:80px;margin-right:10px;"
                                        },
                                        on:{
                                            input: (val) =>{
                                                param.row.prize = val;
                                                param.row.content = val+"积分"
                                            }
                                        }
                                    }),
                                    h('span', "积分")
                                ]
                            }
                        }
                        return a;
                    }
                },
                {   
                    renderHeader:(h, param) => {
                        return [
                            h('span',{
                                attrs: {
                                    style: "color:#FB6664;"
                                },
                            },"*"),
                            h('span',"获奖概率")
                        ]
                    },
                    align: "center",
                    render: (h,param)=>{
                        let a
                        if(this.editType){
                            a = h('span', param.row.draw_chance+" %")
                        }else{
                            a = [
                                h('el-input-number',{
                                    props: {
                                        value: param.row.draw_chance,
                                        size: "mini",
                                        controls: false,
                                        precision: 0,
                                        min: 0,
                                        max: 100
                                    },
                                    attrs: {
                                        style: "width:80px;margin-right:10px;"
                                    },
                                    on: {
                                        change: (val) => {
                                            let that=this;
                                            let num = 0
                                            for(let i=0;i<this.tableData.length;i++){
                                                num += this.tableData[i].draw_chance
                                            }
                                            if(num-param.row.draw_chance+val>100){
                                                this.tableData[param.index].draw_chance = 100-(num-param.row.draw_chance)
                                                this.formData.draw_no_chance = 100-(num-param.row.draw_chance+val)
                                            }else{
                                                this.formData.draw_no_chance = 100-(num-param.row.draw_chance+val)
                                                this.tableData[param.index].draw_chance = val
                                            }
                                            this.flagShow=false;
                                            this.$nextTick(()=>{
                                                that.flagShow=true;
                                            })
                                        }
                                    }
                                }),
                                h('span', "%")
                            ]
                        }
                        return a
                    }
                },
                { 
                    renderHeader:(h, param) => {
                        return [
                            h('span',{
                                attrs: {
                                    style: "color:#FB6664;"
                                }
                            },"*"),
                            h('span',"剩余数量")
                        ]
                    },
                    align: "center",
                    render: (h,param)=>{
                        let that = this
                        let a
                        if(this.editType===2){
                            a = h('span',param.row.stock)
                        }else if(this.editType===1){
                            if(param.row.type===0){
                                a = h('el-input-number',{
                                    props: {
                                        value: param.row.stock,
                                        size: "mini",
                                        controls: false,
                                        precision: 0,
                                        min: this.setMin[param.index],
                                        max: param.row.coupon_num
                                    },
                                    attrs: {
                                        style: "width:80px;margin-right:10px;"
                                    },
                                    on:{
                                        input: (val) =>{
                                            param.row.overweight = val-that.setMin[param.index]
                                            param.row.stock = val;
                                        }
                                    }
                                })
                            }else{
                                a = h('el-input-number',{
                                    props: {
                                        value: param.row.stock,
                                        size: "mini",
                                        controls: false,
                                        precision: 0,
                                        min: 0
                                    },
                                    attrs: {
                                        style: "width:80px;margin-right:10px;"
                                    },
                                    on:{
                                        input: (val) =>{
                                            param.row.stock = val;
                                        }
                                    }
                                })
                            }
                        }else{
                            if(param.row.type===0){
                                a = h('el-input-number',{
                                    props: {
                                        value: param.row.stock,
                                        size: "mini",
                                        controls: false,
                                        precision: 0,
                                        min: 0,
                                        max: this.setMax[param.index].stock
                                    },
                                    attrs: {
                                        style: "width:80px;margin-right:10px;"
                                    },
                                    on:{
                                        input: (val) =>{
                                            param.row.stock = val;
                                            param.row.overweight = val
                                        }
                                    }
                                })
                            }else{
                                a = h('el-input-number',{
                                    props: {
                                        value: param.row.stock,
                                        size: "mini",
                                        controls: false,
                                        precision: 0,
                                        min: 0
                                    },
                                    attrs: {
                                        style: "width:80px;margin-right:10px;"
                                    },
                                    on:{
                                        input: (val) =>{
                                            param.row.stock = val;
                                        }
                                    }
                                })
                            }
                        }
                        return a
                    }
                },
                {   
                    label: "已发放量",
                    align: "center",
                    render: (h,param)=>{
                        return h('span',param.row.send_num)
                    }
                },
                {   
                    label: "操作",
                    align: "left",
                    width: "100",
                    render: (h,param)=>{
                        let a = h('el-checkbox',{
                            props: {
                                value: param.row.state,
                                "true-label": 1,
                                "false-label": 0
                            },
                            attrs: {
                                disabled: this.editType?true:false
                            },
                            on:{
                                input: (val) =>{
                                    param.row.state = val;
                                }
                            }
                        })
                        let b = h('i',{
                            attrs: {
                                class: "el-icon-circle-close-outline wf-icon-close"
                            },
                            on: {
                                click: () => {
                                    this.tableData.splice(param.index,1)
                                    let num = 0
                                    for(let i=0;i<this.tableData.length;i++){
                                        num += this.tableData[i].draw_chance
                                    }
                                    this.formData.draw_no_chance = 100-num
                                }
                            }
                        })
                        return [a,this.$route.query.type?"":b]
                    }
                }
            ]
        }
    },
    components: {
        MyTable
    },
    mounted(){
        let num = 0
        for(let i=0;i<this.tableData.length;i++){
            num += this.tableData[i].draw_chance
        }
        this.formData.draw_no_chance = 100-num
        if(this.$route.query.type){
            this.goldenEggEdit()
        }
        this.getCupon(1,3)
    },
    methods: {
        goldenEggEdit(){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                id: parseInt(this.$route.query.id)
            }
            goldenEggEdit(data).then((res)=>{
                if(res.data.code===200){
                    that.formData.title = res.data.data.title
                    that.formData.start_time = dateFormat(res.data.data.start_time)
                    that.formData.end_time = dateFormat(res.data.data.end_time)
                    that.formData.description = res.data.data.description
                    that.formData.status = res.data.data.status
                    that.formData.luck_draw_num = res.data.data.luck_draw_num
                    that.formData.luck_draw_state = res.data.data.luck_draw_state
                    that.formData.winning_num = res.data.data.winning_num
                    that.formData.winning_num_state = res.data.data.winning_num_state
                    that.formData.use_integral = res.data.data.use_integral
                    that.formData.use_integral_state = res.data.data.use_integral_state
                    that.formData.draw_no_chance = res.data.data.draw_no_chance
                    that.formData.order_num_state = res.data.data.order_num_state
                    that.tableData = res.data.data.child
                    that.setMin = res.data.data.child.map((item)=>{
                        return item.stock
                    })
                }else{
                    that.$message.error(res.data.msg+"600A00163");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00164');
            })
        },
        drawBlur(event){
            if(parseInt(event.target.value)<this.formData.winning_num){
                this.formData.luck_draw_num = this.formData.winning_num
            }
        },
        winningBlur(event){
            if(parseInt(event.target.value)>this.formData.luck_draw_num){
                this.formData.winning_num = this.formData.luck_draw_num
            }
        },
        checkChange(val){
            if(val===0&&this.formData.order_num_state===0){
                this.$message.warning("至少选择一种参与条件")
                this.formData.use_integral_state = 1
            }
        },
        checkChange2(val){
            if(val===0&&this.formData.use_integral_state===0){
                this.$message.warning("至少选择一种参与条件")
                this.formData.order_num_state = 1
            }
        },
        addIntegral(){
            this.tableData.push(
                {
                    name: "",
                    type: 1,
                    content: "",
                    prize: undefined,
                    draw_chance: 0,
                    stock: undefined,
                    send_num: 0,
                    state: 1
                }
            )
            this.setMax = JSON.parse(JSON.stringify(this.tableData))
        },
        getCupon(currentPage,type){
            this.couponCurrent = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: this.couponCurrent,
                coupon_name: this.cupon_search!==""?this.cupon_search:undefined,
                type: 6
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
        choose(row){
            this.tableData.push(
                {
                    name: "",
                    type: 0,
                    prize: row.id,
                    content: row.coupon_name,
                    draw_chance: 0,
                    stock: row.coupon_num,
                    send_num: 0,
                    state: 1,
                    overweight: row.coupon_num
                }
            )
            this.setMax = JSON.parse(JSON.stringify(this.tableData))
            this.couponDialog = false
        },
        addCupon(){
            window.open(this.$router.resolve({path:'/wf/admin/shop/markting/coupon/addCoupon'}).href);
        },
        cancle(){
            this.$router.push({path:"/wf/admin/shop/markting/goldenEgg"})
        },
        save(ruleForm){
            let that = this;
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    let bool = this.tableData.some(item=>{
                        return item.state===1
                    })
                    if(this.tableData.length<1){
                        this.$message.warning("请至少添加一个奖项")
                    }else if(!bool){
                        this.$message.warning("请至少勾选一个奖项")
                    }else{
                        let bool = this.tableData.some((item)=>{
                            return item.name===""||item.content===""||item.content===undefined||item.draw_chance===undefined||item.stock===undefined
                        })
                        if(bool){
                            this.$message.warning("请将奖项设置填写完整")
                        }else{
                            let tableData = {
                                child: this.tableData
                            }
                            let formData = JSON.parse(JSON.stringify(this.formData))
                            if(!formData.use_integral){
                                formData.use_integral = 0
                            }
                            let token = {
                                token: localStorage.getItem("userId"),
                                pro_id: parseInt(localStorage.getItem("proId"))
                            }
                            if(parseInt(this.$route.query.id)){
                                token.id = parseInt(this.$route.query.id)
                            }
                            let data = Object.assign(formData,token,tableData)
                            this.saveLoading = true
                            goldenEggUpdate(data).then((res)=>{
                                that.saveLoading = false
                                if(res.data.code===200){
                                    that.$message.success("保存成功")
                                    that.$router.push({path:"/wf/admin/shop/markting/goldenEgg"})
                                }else{
                                    that.$message.error(res.data.msg+"600B00161")
                                }
                            }).catch((err)=>{
                                that.saveLoading = false
                                that.$message.error('网络错误600A00162');
                            })
                        }
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-editGoldenEgg{
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
    .wf-background{
        width: 316px;
        height: 937px;
        background: url("https://cdn0.19mini.com/2019-05-28%2F65206a0391583b7cac0f0660a1a6f51c.png") no-repeat;
        background-size: 100% 100%;
        float: left;
    }
    .wf-form-box{
        margin-left: 50px;
        width: 70%;
        float: left;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        box-sizing: border-box;
    }
    .wf-gray-box{
        padding: 10px;
        background: #F3F3F3;
        border-radius: 4px;
        margin-bottom: 10px;
    }
    .wf-input-width{
        width: 360px;
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
    /deep/ .el-input-number{
        .el-input__inner{
            text-align: left;
        }
    }
    .wf-margin-bottom{
        margin-bottom: 10px;
    }
    .wf-span-width{
        width: 110px;
        display: inline-block;
    }
    .wf-gray-title{
        color: #999;
        font-size: 12px;
    }
    .wf-number-input{
        width: 100px;
        margin-right: 20px;
    }
    /deep/ .wf-icon-close{
        cursor: pointer;
        &:hover{
            color: #FB6664;
        }
    }
    /deep/ .el-table{
        margin-bottom: 20px;
    }
    .wf-footer{
        margin-top: 20px;
        text-align: center;
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
    /deep/ .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
        color: #C0C4CC;
        border-color: #EBEEF5;
        background-color: #FFF;
    }
    /deep/ .el-input-number--mini{
        line-height: 30px;
    }
    .wf-textarea-num{
        position: absolute;
        color: #ccc;
        left: 362px;
        top: 60px;
    }
    .wf-textarea-html{
        word-wrap: break-word;
    }
}
</style>