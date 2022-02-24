<template>
    <!-- class="wf-" -->
    <div class="wf-addFullslice">
        <el-form label-width="150px" 
        :model="addFullslice"  
        :label-position="labelPosition" 
        :rules="rules"
        ref="addFullslice">
            <!--*******************基本信息****************-->
            <p class="wf-title">基本信息</p>
            <el-form-item label="活动名称" size="mini" prop="name" v-if="$route.query.param!='views'">
                <el-col :span="5">
                    <el-input class="wf-active-name" v-model="addFullslice.name"  :maxlength="20"></el-input>
                    <span class="wf-textareaVaild ">{{addFullslice.name.length}}/20</span>
                </el-col>
            </el-form-item>
            <el-form-item label="活动名称" size="mini" prop="name" v-if="$route.query.param==='views'">
                {{addFullslice.name}}
            </el-form-item>
            <el-form-item label="活动时间" size="mini" prop="aciveTime" v-if="$route.query.param!='views'">
                <el-date-picker
                v-model="addFullslice.aciveTime"
                type="datetimerange"
                align="right"
                size="mini"
                start-placeholder="选择日期时间"
                end-placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="活动时间" size="mini" prop="aciveTime" v-if="$route.query.param==='views'">
                {{addFullslice.aciveTime[0]}} - {{addFullslice.aciveTime[1]}}
            </el-form-item>

            <!--*******************活动规则********************-->
            <p class="wf-title">活动规则</p>
            <el-form-item label="活动商品:" size="mini"  prop="cut_type">
                <el-radio-group v-model="addFullslice.cut_type" class="wf-addCoupon-s" @change="handleCutType" :disabled="disabledRule">
                    <el-row>
                        <el-radio :label="0" >全部商品</el-radio>
                    </el-row>
                    <el-row>
                        <el-radio :label="1" >指定分类</el-radio>
                        <el-button size="mini" type="primary" :disabled="isDisabledType" class="wf-addCoupon-s-btn" @click="fullsliceType" v-if="$route.query.param!='views'">{{wfSelectTypeName}}</el-button>
                        <el-tag size="mini" v-if="showTypeTage&&$route.query.param!='views'" class="wf-addCoupon-s-tag">已选择{{wfSelectTypeNum}}种分类</el-tag>
                    </el-row>
                    <el-row>
                        <el-radio :label="2" >指定商品</el-radio>
                        <el-button size="mini" type="primary" :disabled="isDisabledShop" class="wf-addCoupon-s-btn"  @click="fullsliceShop" v-if="$route.query.param!='views'">{{wfSelectShopName}}</el-button>
                        <el-tag size="mini" v-if="showShopTage&&$route.query.param!='views'" class="wf-addCoupon-s-tag">已选择{{wfSelectShopNum}}种商品</el-tag>
                    </el-row>
                    <el-row class="wf-classify-table" v-if="addFullslice.cut_type===2">
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
                        <el-button size="mini" type="primary" :disabled="isDisabledNotShop" class="wf-addCoupon-s-btn"  @click="couponNotShop" v-if="$route.query.param!='views'">{{wfSelectNotShopName}}</el-button>
                        <el-tag size="mini" v-if="showNotShopTage&&$route.query.param!='views'" class="wf-addCoupon-s-tag">已选择{{wfSelectNotShopNum}}种商品</el-tag>
                    </el-row>
                    <el-row class="wf-classify-table" v-if="addFullslice.cut_type===3&&flagTable3">
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

            <!--*******************优惠设置********************-->
            <el-form-item label="优惠设置:" size="mini"  prop="state">
                <el-radio-group v-model="addFullslice.state" class="wf-addCoupon-s" @change="handleState" :disabled="disabledSelectSilce">
                    <el-row>
                        <el-radio :label="0" >阶梯满减</el-radio>
                    </el-row>
                    <el-row>
                        <el-radio :label="1" >循环满减</el-radio>
                    </el-row>
                     
                    <!--*******************阶梯满减********************-->
                    <el-row v-if="addFullslice.state===0">
                        <div v-for="(item,index) in addFullslice.cap_info"  :key="index" class="wf-cap_info">
                            <div class="wf-title-info">
                                <label>{{zh_ch[index]}}级优惠</label>
                                <el-button type="text" size="mini" class="wf-delete" v-if="index!=0&&$route.query.param!='views'" @click="deleteCap(index)">删除</el-button>
                             </div>
                            <el-form-item  label="优惠门槛:" size="mini"  prop="state">
                                <el-row>
                                    <el-col :span="5">
                                        满
                                        <el-input-number 
                                        class="wf-active-cap_info-input" 
                                        :controls="false" 
                                        v-model="item.info_full_price" 
                                        size="mini"
                                        :min="0.1"
                                        @change="handleInfoFullPrice(item,index)"
                                        v-if="flagInfoFullPrice&&$route.query.param!='views'" 
                                        ></el-input-number>
                                        <label v-if="$route.query.param==='views'" >{{item.info_full_price}}</label>
                                        元 
                                    </el-col>
                                    <el-col :span="10" class="wf-help" v-if="index!=0&&$route.query.param!='views'" >
                                       <span >优惠门槛需大于上一级优惠门槛</span>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item  label="优惠内容:" size="mini"  prop="state">
                                <el-radio-group v-model="addFullslice.cap_info[index].info_state" @change="handleCap_info(index)" v-if="$route.query.param!='views'">
                                    <el-col class="wf-one">
                                        <el-radio :label="0" v-if="addFullslice.cap_info[index].my_cut_price||addFullslice.cap_info[index].my_cut_price===0||$route.query.param!='views'">减
                                            <el-input-number 
                                            v-model="addFullslice.cap_info[index].my_cut_price" 
                                            size="mini"
                                            :controls="false" 
                                            class="wf-active-cap_info-input"
                                            placeholder="请输入大于0的金额数"
                                            :min="0.1"
                                            v-if="$route.query.param!='views'"></el-input-number>
                                            元</el-radio>
                                    </el-col>
                                    <el-col class="wf-two">
                                        <el-radio :label="1" v-if="addFullslice.cap_info[index].my_Discount||addFullslice.cap_info[index].my_Discount===0||$route.query.param!='views'">打<el-input-number 
                                        v-model="addFullslice.cap_info[index].my_Discount" 
                                        :controls="false" 
                                        size="mini"
                                        class="wf-active-cap_info-input wf-my_Discount"
                                        placeholder="请输入正确的折扣，比如9.5"
                                        :min="0.1"
                                        :max="10"
                                        v-if="$route.query.param!='views'"></el-input-number>
                                        折</el-radio>
                                    </el-col>
                                </el-radio-group>
                                 <el-col class="wf-one-A"  v-if="$route.query.param==='views'&&addFullslice.cap_info[index].info_state===0">
                                    减<label>{{addFullslice.cap_info[index].my_cut_price}}</label> 元
                                </el-col>
                                <el-col class="wf-one-B" v-if="$route.query.param==='views'&&addFullslice.cap_info[index].info_state===1">
                                    打<label>{{addFullslice.cap_info[index].my_Discount}}</label>折
                                </el-col>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-form-item v-if="addFullslice.state===0&& addFullslice.cap_info.length<5&&$route.query.param!='views'">
                        <div class="wf-add-btn children">
                            <i class="el-icon-plus" @click="addPreferential"></i>
                            <label @click="addPreferential">添加{{zh_ch[addFullslice.cap_info.length]}}级优惠</label>                                                    
                        </div>
                        <el-col :span="10" class="wf-help" >
                            <span >提醒：每级优惠不叠加，如：满足二级优惠条件后则不再享有一级优惠。最多支持五级优惠。</span>
                        </el-col>
                    </el-form-item>

                    <!--*******************循环满减********************-->
                    <el-row v-if="addFullslice.state===1" class="wf-capInfo-loop">
                        <el-form-item  label="优惠门槛:" size="mini"  prop="state" class="wf-active-input">
                            <el-row>
                                每满<el-input-number  
                                class="wf-active-cap_info-input" 
                                :controls="false" 
                                v-model="addFullslice.full_price" 
                                size="mini"
                                :min="0.1"
                                v-if="$route.query.param!='views'"></el-input-number >
                                <label v-if="$route.query.param==='views'" >{{addFullslice.full_price}}</label>
                                元
                            </el-row>
                        </el-form-item>
                        <el-form-item  label="优惠内容:" size="mini"  prop="cut_price">
                            <el-row>
                                减<el-input-number  
                                class="wf-active-cap_info-input" 
                                :controls="false" 
                                v-model="addFullslice.cut_price" 
                                size="mini" 
                                placeholder="请输入大于0的金额数"
                                :min="0.1"
                                v-if="$route.query.param!='views'"></el-input-number >
                                <label v-if="$route.query.param==='views'" >{{addFullslice.cut_price}}</label>
                                元
                            </el-row>
                            <el-radio-group v-model="addFullslice.cap" @change="handleCapLoop" :disabled="disabledCap">
                                <el-col class="wf-one wf-cap-one">
                                    <el-radio :label="1" >封顶
                                        <span class="wf-right" v-if="addFullslice.cap===1||$route.query.param!='views'">商品总价超出
                                            <el-input-number 
                                            v-model="addFullslice.cap_price" 
                                            size="mini"
                                            :controls="false" 
                                            class="wf-active-cap_info-input"
                                            :min="0.1" v-if="$route.query.param!='views'"></el-input-number>
                                            <label v-if="$route.query.param==='views'" >{{addFullslice.cap_price}}</label>
                                            元不再享受优惠
                                        </span>
                                    </el-radio>
                                </el-col>
                                <el-col class="wf-two">
                                    <el-radio :label="0" >不封顶</el-radio>
                                </el-col>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="$route.query.param!='views'">
                <el-button :loading="saveLoading" size="mini" type="primary"  @click="save('addFullslice')">保存</el-button>
            </el-form-item>
            <el-form-item v-if="$route.query.param==='views'">
                <el-button  size="mini" type="primary"  @click="returnList">返回</el-button>
            </el-form-item>
        </el-form>
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
        <el-dialog title="选择商品" 
            :visible.sync="dialogNotShopVisible" 
            width="950px" 
            center 
            class="wf-addCoupon-Shop"
            v-if="dialogNotShopVisible==true">
            <select-shop 
                @handleChangeVal="handleNotChange" 
                @shopSelectedId="handleNothopSelectedId"
                ref="selectShop"
                :shopFlag="shopNotFlag"
                :selectParams="selectNotParams"
                :shopSelectedIdS="notShopSelectedIdS"></select-shop>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="handleCloseNotGoods">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleDialogNotShopVisible">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import SelectShop from "../markting/SelectShop.vue";
import {cutAdd,cutShow} from '@/server/fullslice';
import {dateFormat} from '@/untils/common.js';
export default {
    name: '',
    data() {
        return {
            disabledRule:false,
            disabledSelectSilce:false,
            disabledCap:false,
            flagInfoFullPrice:true,
            labelPosition:"right",
            saveLoading:false,
            addFullsliceShopData:{
                coupon_name:''
            },
            addFullslice:{
                name:'',
                aciveTime:[],
                state:0,
                cut_type:0,
                cap_info:[
                    {
                        info_state:0,
                        info_full_price:undefined,
                        info_cut_price:undefined,
                        my_cut_price:undefined,
                        my_Discount:undefined
                    }
                ],
                cap:1,
                full_price:undefined,
                cut_price:undefined,
                cap_price:undefined
                
            },
            zh_ch:['一','二','三','四','五'],
            pickerOptions: {
                disabledDate: (time) => {
                    return time.getTime() <= new Date(new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000);//减去一天的时间代表可以选择同一天;
                },
                shortcuts: [
                {
                    text: '最近一天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            //选择分类弹窗
            dialogTypeVisible:false,
            defaultProps: {
                children: 'children',
                label: 'type_name'
            },
            shpopType:[],
            shpopTypeKey:[],
            isDisabledType:true,
            //指定分类 状态
            isDisabledType:true,
            //指定商品 状态
            isDisabledShop:true,
            //选择商品
            dialogShopVisible:false,
            //选择不可用商品
            dialogNotShopVisible:false,
            wfSelectTypeName:'选择分类',
            wfSelectTypeNum:0,
            showTypeTage:false,//是否显示指定分类
            //选择商品
            wfSelectShopName:'选择商品',
            wfSelectShopNum:0,
            showShopTage:false,//是否显示商品
            //指定商品
            tableDataApp:[],
            totalPageApp:0,
            currentPage:1,
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
            ],
            selectParams:[],
            selectNotParams:[],
            //选择的商品id  typeof String
            shopSelectedIdS:'',
            //指定分类
            typeSelectedIdS:'',
            //默认指定商品标记
            shopFlag:false,
            //默认指定不可用商品标记
            shopNotFlag:false,
            submitSelected:[],
            submitNotSelected:[],
             //校验
            rules: {
                name: [
                    { required: true, message: '活动名称不能为空', trigger: 'blur' }
                ],
                aciveTime: [
                    { required: true, message: '请选择活动时间', trigger: 'blur' }
                ],
                cut_type: [
                    { required: true, message: '请选择活动商品', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请选择优惠设置', trigger: 'blur' }
                ],
            },
            /*指定商品*/
            //指定商品不可用 状态
            isDisabledNotShop:true,
            showNotShopTage:false, //是否显示不可用商品
            wfSelectNotShopName:'选择商品',
            wfSelectNotShopNum:0, //不可用商品数量
            //选择的商品行数据  typeof [array[object]]
            shopSelectedIdA:[],
            //选择的不可用商品行数据  typeof [array[object]]
            notShopSelectedIdA:[],
            //选择的商品不可用id  typeof String
            notShopSelectedIdS:'',
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
                
            ],
            flagTable:true,
            flagTable3:true
        }
        
    },
    components: {
        MyTable,
        SelectShop
    },
    created(){

    },
    mounted(){
        if(this.$route.query.param!='views'){
            this.columnsApp.push(
             { 
                    label: "操作",
                    align: "center",
                    render:(h, param)=> {
                        if(this.$route.query.param!='views'){
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
                }
            )
            this.columnsApp3.push(
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
            )
        }
        if(this.$route.query.param==='edit'){
            this.$route.meta.title="编辑";
            this.initPage();
        }else if(this.$route.query.param==='views'){
            this.$route.meta.title="满减详情";
            this.disabledRule=true;
            this.disabledSelectSilce=true;
            this.disabledCap=true;
            this.initPage();
        }else{

            this.$route.meta.title="新增满减";
        }
    },
    methods: {
        returnList(){
            this.$router.push({path:'/wf/admin/shop/markting/fullslice',name:'fullslice'});
        },
        initPage(){
            let that=this;
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                id:this.$route.query.id,
            }
            cutShow(data).then((res)=>{
                if(res.data.code===200){
                    that.addFullslice=res.data.data;
                    
                    //活动时间回显
                    that.addFullslice.aciveTime=[];
                    that.addFullslice.aciveTime.push(dateFormat(res.data.data.start_time));
                    that.addFullslice.aciveTime.push(dateFormat(res.data.data.end_time));

                    //活动商品回显
                    if(that.addFullslice.cut_type===1){
                        that.typeSelectedIdS=res.data.data.cut_ids;
                        that.getHandleEditType(res.data.data.cut_ids);
                        that.wfSelectTypeNum = res.data.data.cut_ids.split(",").length;
                        that.wfSelectTypeName="选择分类";
                        that.isDisabledType=false;
                        if(that.wfSelectTypeNum>0){
                            that.showTypeTage=true;
                            that.wfSelectTypeName="修改分类";
                        }
                    }else if(that.addFullslice.cut_type===2){
                        that.shopSelectedIdS=res.data.data.cut_ids;
                        that.wfSelectShopName="选择商品";
                        that.shopFlag=true;
                        that.wfSelectShopNum = res.data.data.cut_ids.split(",").length;
                        that.isDisabledShop=false;
                        if(that.wfSelectShopNum>0){
                            that.showShopTage=true;
                            that.wfSelectShopName="修改商品";
                        }
                        that.tableDataApp=res.data.data.good_list;
                    }else if(that.addFullslice.cut_type===3){
                        that.notShopSelectedIdS=res.data.data.cut_ids;
                        that.wfSelectNotShopName="选择商品";
                        that.shopNotFlag=true;
                        that.wfSelectNotShopNum = res.data.data.cut_ids.split(",").length;
                        that.isDisabledNotShop=false;
                        if(that.wfSelectNotShopNum>0){
                            that.showNotShopTage=true;
                            that.wfSelectNotShopName="修改商品";
                        }
                        that.tableDataApp3=res.data.data.good_list;
                    }

                    //优惠设置回显
                    if(that.addFullslice.state===0){
                        that.addFullslice.cap_info.forEach((item,index)=>{
                            if(item.info_state===0){
                                that.addFullslice.cap_info[index].my_cut_price=item.info_cut_price;
                            }else if(item.info_state===1){
                                that.addFullslice.cap_info[index].my_Discount=item.info_cut_price;
                            }
                        })
                    }else if(that.addFullslice.state===1){
                        that.addFullslice.cap_info=[
                            {
                                info_state:0,
                                info_full_price:undefined,
                                info_cut_price:undefined,
                                my_cut_price:undefined,
                                my_Discount:undefined
                            }
                        ];

                    }
                }else{
                    that.$message.error(res.data.msg+'600A00160');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!'+'600B00159');
            }) 
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
                });
                }
            }).catch(err=>{
                that.$message.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                });
            });
        },
        handleInfoFullPrice(item,index){
            if(this.addFullslice.cap_info.length>1){
                 if(this.addFullslice.cap_info[index-1].info_full_price>item.info_full_price){
                     this.addFullslice.cap_info[index].info_full_price=undefined;
                 }
            }
            this.flagInfoFullPrice=false;
            this.$nextTick(()=>{
                 this.flagInfoFullPrice=true;
            })
        },
        //删除阶梯优惠
        deleteCap(index){
            this.addFullslice.cap_info.splice(index,1);
        },
        //添加阶梯优惠
        addPreferential(){
            this.addFullslice.cap_info.push(
                {
                    info_state:0,
                    info_full_price:undefined,
                    info_cut_price:undefined,
                    my_cut_price:undefined,
                    my_Discount:undefined
                })
            //临时状态，更新渲染使用
            this.addFullslice.state=2;
            this.$nextTick(()=>{
                 this.addFullslice.state=0;
            })
        },
        //新建，修改优惠活动
         save:function(ruleForm){
            let that=this;
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    let data = { 
                        pro_id: parseInt(localStorage.getItem('proId')),
                        token:localStorage.getItem('userId'),
                        name:that.addFullslice.name,
                        cut_type:that.addFullslice.cut_type,
                        state:that.addFullslice.state,
                        start_time:that.addFullslice.aciveTime[0],
                        end_time:that.addFullslice.aciveTime[1],
                    }
                    if(that.addFullslice.state===0){
                        if(that.addFullslice.cap_info.some((item)=>{
                            if(!item.info_full_price){
                                return true;
                            }
                        })){
                            that.$message.warning("请输入优惠门槛");
                            return false;
                        }else if(that.addFullslice.cap_info.some((item)=>{
                            if(item.info_state===0){
                                if(!item.my_cut_price){
                                    return true;
                                }
                            }else if(item.info_state===1){
                                if(!item.my_Discount){
                                    return true;
                                }
                            }
                        })){
                            that.$message.warning("请输入优惠内容");
                            return false;
                        }
                        that.addFullslice.cap_info.forEach((item)=>{
                            if(item.info_state===0){
                                item.info_cut_price=item.my_cut_price
                            }else if(item.info_state===1){
                                item.info_cut_price=item.my_Discount
                            }
                        })
                        data.cap_info=that.addFullslice.cap_info;
                    }else if(that.addFullslice.state===1){
                        //优惠门槛
                        if(that.addFullslice.full_price){
                            data.full_price=that.addFullslice.full_price
                        }else{
                            that.$message.warning("请输入优惠门槛");
                            return false;
                        }
                        //优惠金额
                        if(that.addFullslice.cut_price){
                            data.cut_price=that.addFullslice.cut_price
                        }else{
                            that.$message.warning("请输入优惠金额");
                            return false;
                        }
                        if(that.addFullslice.cap||that.addFullslice.cap===0){
                            //是否封顶金额上限
                            data.cap=that.addFullslice.cap;
                            if(that.addFullslice.cap===1){
                                if(that.addFullslice.cap_price){
                                    data.cap_price=that.addFullslice.cap_price
                                }else{
                                    that.$message.warning("请输入封顶金额");
                                    return false;
                                }
                                
                            }else if(that.addFullslice.cap===0){
                                data.cap_price=0;
                            }
                        }
                    }
                    if(that.addFullslice.cut_type===0){
                        data.cut_ids='';
                    }else if(that.addFullslice.cut_type===1){
                        data.cut_ids=that.typeSelectedIdS;
                    }else if(that.addFullslice.cut_type===2){
                        data.cut_ids=that.shopSelectedIdS;
                    }else if(that.addFullslice.cut_type===3){
                        data.cut_ids=that.notShopSelectedIdS;
                    }
                    if(that.$route.query.param==='edit'){
                        data.id=that.$route.query.id;
                    }
                    that.saveLoading=true;
                    cutAdd(data).then((res)=>{
                        that.saveLoading=false;
                        if(res.data.code===200){
                             that.$message.success(res.data.msg);
                             that.$router.push({path:'/wf/admin/shop/markting/fullslice',name:'fullslice'});
                        }else{
                            that.$message.warning(res.data.msg+'600A00156');
                        }
                    }).catch((err)=>{
                        that.saveLoading=false;
                        that.$message.error('网络错误!'+'600B00155');
                    })
                }else{
                    return false;
                }
            })
        },
        handleCapLoop(val){

        },
        //阶梯满减callback()
        handleCap_info(index){
           if(this.addFullslice.cap_info[index].info_state===0){
                this.$set(this.addFullslice.cap_info[index],'my_Discount',undefined);
               
           } else if(this.addFullslice.cap_info[index].info_state===1){
                this.$set(this.addFullslice.cap_info[index],'my_cut_price',undefined);
           }
           let that=this;
           let state=this.addFullslice.state;
           //临val
           this.addFullslice.state=2;
           this.$nextTick(()=>{
               //还原状态值进行渲染
               that.addFullslice.state=state;
           })
        },
        //优惠设置
        handleState(){

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
        //选择不可以用商品点击事件
        couponNotShop:function(){
            this.selectNotParams=this.tableDataApp3;
            this.dialogNotShopVisible=true;
        },
        //已选择的商品回调函数
        handleShopSelectedId:function(selected){
            this.submitSelected=selected;
        },
        //已选择的不可用商品回调函数
        handleNothopSelectedId:function(selected){
            this.submitNotSelected=selected;
        },
        handleCloseGoods(){
            this.dialogShopVisible = false
        },
        handleCloseNotGoods(){
            this.dialogNotShopVisible = false
        },
        //商品父分类数据回调函数
        handleChange:function(val){
        },
        //不可用商品父分类数据回调函数
        handleNotChange:function(val){
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
        //选择商品确定事件
        handleDialogShopVisible:function(){
            this.shopSelectedIdA=JSON.parse(JSON.stringify(this.submitSelected));
            this.tableDataApp=this.shopSelectedIdA;
            this.$store.commit({
                type:'getCouponList',
                couponList:this.shopSelectedIdA,
            });
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
        //选择不可用商品确定事件
        handleDialogNotShopVisible:function(){
            this.notShopSelectedIdA=JSON.parse(JSON.stringify(this.submitNotSelected));
            this.tableDataApp3=this.notShopSelectedIdA;
            this.$store.commit({
                type:'getCouponNotList',
                couponNotList:this.notShopSelectedIdA,
            });
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
        handleCutType(val){
            if(val===0){
                //禁用按钮
                this.isDisabledType=true;
                this.isDisabledShop=true;
                this.isDisabledNotShop=true;
            }else if(val===1){
                //可选指定分类
                this.isDisabledType=false;
                this.isDisabledShop=true;
                this.isDisabledNotShop=true;
            }else if(val===2){
                //可选指定商品
                this.isDisabledType=true;
                this.isDisabledShop=false;
                this.isDisabledNotShop=true;
            }else if(val===3){
                //可选指定商品不可用
                this.isDisabledType=true;
                this.isDisabledShop=true;
                this.isDisabledNotShop=false;
            }
        },
        fullsliceType(){
            this.dialogTypeVisible=true;
            //获取所有商品数据
            this.getAllShopType();
        },
        fullsliceShop(){
            this.selectParams=this.tableDataApp;
            this.dialogShopVisible=true;
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
        handleChangeSpecify(currentPage){

        },
        handleChangeSpecify3(currentPage){

        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/fullslice/fullslice.scss';

</style>