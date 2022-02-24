<template>
    <div id="shop_edit">
        <el-row :gutter="24">
            <el-col :xs="15" :sm="17" :md="19" :lg="20" :xl="22">
                <el-form :label-position="labelPosition"     
                        :model="addCouponData"
                        :rules="rules"
                        ref="addCouponData"
                        label-width="12rem"
                        class="demo-ruleForm">
                    <el-row class="rule_btn">
                        <span class="rule_guize" type="text">商品列表/添加商品</span>
                    </el-row>
                    <el-form-item class="label-left" label="分类" prop="options" size="mini">
                        <!-- 分类级联选择器 -->
                        <el-cascader
                            :props="defaultProps"
                            :options="options"
                            @change="changeSelect"
                            v-model="selectedOptions"
                            style="width:180px;">
                        </el-cascader>
                        <el-button type="text" size="mini" @click="classJump">管理分类</el-button>
                    </el-form-item>
                    <el-form-item class="label-left" label="主图" prop="imageUrl" size="mini">
                        <el-upload
                        class="avatar-uploader"
                        :action="upUrl+'supper/attachment/upfile'"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-success="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="label-left" prop="lunbo" label="轮播图(最多五个)" size="mini">
                        <el-upload
                        :action="upUrl+'supper/attachment/upfile'"
                        list-type="picture-card"
                        multiple
                        :limit=5
                        :file-list="dialogImageUrl"
                        :before-upload="beforeUpload"
                        :on-success="handlePictureCardPreview"
                        :on-exceed="handleLimit"	
                        :on-remove="handleRemove1"
                        :on-preview="lunboPreview">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="lunboVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item class="label-left" label="商品标题(最多30个字)" prop="pro_title" size="mini">
                        <el-input class="input_width" style="width:400px;" :maxlength="30" size="mini" v-model="addCouponData.pro_title"></el-input>
                    </el-form-item>
                    <el-form-item label="描述(最多40个字)" prop="description" size="mini">
                        <el-input
                        :maxlength="40"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="addCouponData.description" >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="虚拟销量" prop="virtual_sales" >
                        <el-input-number :precision="0" :controls="false" :min="0" class="input_width" size="mini"  v-model="addCouponData.virtual_sales"></el-input-number>
                    </el-form-item>
                    <el-form-item class="label-left" label="原价" prop="original_price" size="mini">
                        <el-input-number :precision="2" :controls="false" :min="0" class="input_width" style="margin-right:5px;" size="mini" v-model="addCouponData.original_price"></el-input-number>
                        <span class="wf-gray-title">划线价</span>
                    </el-form-item>
                    <el-form-item label="规格明细" size="mini">
                        <el-row class="jianju add-price" v-for="(item,index) in spec" :key="index">
                            <el-row class="jianju wf-sku-gray">
                                <span>规格名:</span>
                                <span>
                                    <el-autocomplete
                                    style="width:120px;margin:14px 20px 14px;"
                                    class="inline-input"
                                    v-model="spec[index]"
                                    placeholder="请输入规格"
                                    :fetch-suggestions="querySearch"
                                    ></el-autocomplete>
                                </span>
                                <span>
                                    <i class="el-icon-delete delete_icon" @click="deleteSPC(index)"></i>
                                </span>
                            </el-row>
                            <div class="jianju" style="padding-left:20px;margin-top:16px;">
                                <span style="margin-right: 20px;">规格值:</span>
                                <div style="display:inline;" v-for="(list,i) in son_spec[index]" :key="i" >
                                    <el-autocomplete
                                    class="SPC_V_input"
                                    style="width:120px;margin-right:20px;margin-bottom:16px;"
                                    :maxlength="10"
                                    v-model="son_spec[index][i]"
                                    placeholder="请输入规格值"
                                    :fetch-suggestions="querySearch2"
                                    @focus="fetchSuggestions(index,i)">
                                    </el-autocomplete>
                                    <i class="el-icon-circle-close delete_SPC_V" @click="deleteSPCValue(index,i)"></i>
                                </div>
                                <span class="a" @click="addSPCValue(index)">添加规格值</span>
                            </div>
                        </el-row>

                        <el-row class="jianju">
                            <el-button type="primary" @click="addSPC">添加规格</el-button>
                            <el-button type="text" @click="jumpSku"><i class="el-icon-edit-outline"></i> 管理常用规格</el-button>
                        </el-row>
                        <div class="addtable">
                            <el-row class="jianju wf-sku_list-gray" v-if="spec!=''">
                                <el-col class="wf-tabel-head-spec" :span="1" v-for="(item,index) in spec" :key="index">{{spec[index]}}</el-col>
                                <el-col :span="3"><span class="wf-red">*</span>成交价</el-col>
                                <el-col :span="3" v-for="(el,i) in memberPrice" :key="(i+2)*33">{{el.name}}</el-col>
                                <el-col :span="3"><span class="wf-red">*</span>库存</el-col>
                                <el-col :span="3">编码</el-col>
                                <el-col :span="3">缩略图<span class="wf-gray-title">（160*160px）</span></el-col>
                            </el-row>
                            <el-row class="wf-sku" v-for="(item,index) in sku" :key="index" style="border-top: 1px solid #e5e5e5;padding: 20px 0;">
                                <el-col :span="1" style="width:82px;height:100%;" v-for="(list,i) in sku_list[index]" :key="i">{{list}}</el-col>
                                <el-col :span="3">
                                    <el-input-number style="width:100px;" :min="0.01" :precision="2" :controls="false" v-model="sku[index].sku_price" ></el-input-number>
                                </el-col>
                                <el-col :span="3" v-for="(el,j) in memberPrice" :key="(j+1)*22">
                                    <el-input-number v-if="j===0" v-model="sku[index].first_level" style="width:100px;" :precision="1" :min="0.1" :controls="false"></el-input-number>
                                    <el-input-number v-if="j===1" v-model="sku[index].second_level" style="width:100px;" :precision="1" :min="0.1" :controls="false"></el-input-number>
                                    <el-input-number v-if="j===2" v-model="sku[index].third_level" style="width:100px;" :precision="1" :min="0.1" :controls="false"></el-input-number>
                                </el-col>
                                <el-col :span="3">
                                    <el-input-number style="width:100px;" :precision="0" :controls="false" v-model="sku[index].sku_stock"></el-input-number>
                                </el-col>
                                <el-col :span="3">
                                    <el-input style="width:100px;" v-model="sku[index].sku_code">{{sku[index].sku_thumbnail}}</el-input>
                                </el-col>
                                <el-col :span="3">
                                        <input class="file_input" type="file" @change="smallUpload($event,index)">
                                        <img v-if="sku[index].sku_thumbnail" :src="sku[index].sku_thumbnail" :key="sku[index].sku_thumbnail" style="display:block;width:60px;height:50px;">
                                        <div v-else style="border:1px solid #e8e8e8;width:70px;">
                                            <i class="el-icon-plus avatar-uploader-icon"></i>
                                            <p v-if="sku[index].sku_thumbnail==''" style="margin-bottom: 0px;margin-left:5px;">上传图片</p>
                                        </div>
                                </el-col>
                            </el-row>
                         </div>
                    </el-form-item>
                    <el-form-item v-if="pointMarktingId!=''&&mainSwitch===true" label="赠送积分" prop="integral_content">
                        <el-radio-group v-model="addCouponData.integral_type">
                            <el-radio :label="0">统一规则</el-radio>
                            <el-radio :label="1">单独自定义设置</el-radio>
                        </el-radio-group>
                        <div style="line-height: 24px;">
                            <span v-if="addCouponData.integral_type===0">{{pointMarktingPrice}}元=1积分，根据规格价格自动计算赠送积分</span>
                            <div style="margin-left: 110px;">
                                <span v-if="addCouponData.integral_type===1">
                                    <el-input
                                    class="input_width"
                                    style="margin-right:10px;width:120px;"
                                    size="mini"
                                    v-model="addCouponData.integral_content"></el-input>积分
                                    <p class="wf-gray-title">若商品存在多规格不同价格，建议使用%，否则存在赠送积分比例不统一</p>
                                    <p class="wf-gray-title">消费者购物赠送的积分, 如果不填写或填写0，则默认为不赠送积分，如果带%则为按成交价格的比例计算积分</p>
                                    <p class="wf-gray-title">例: 购买2件，设置10 积分, 不管成交价格是多少， 则购买后获得20积分</p>
                                    <p class="wf-gray-title">例: 购买2件，设置10%积分, 成交价格2 * 200= 400， 则购买后获得 40 积分（400*10%）</p>
                                </span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="pointCreditShow===true&&mainSwitch===true" label="积分抵现" prop="integral_content">
                        <el-radio-group v-model="addCouponData.mortgage_type">
                            <el-radio :label="0">统一规则</el-radio>
                            <el-radio :label="1">单独自定义设置</el-radio>
                        </el-radio-group>
                        <div style="line-height: 24px;">
                            <span v-if="addCouponData.mortgage_type===0">{{pointMarktingPoint}}积分=1元，单次消费最多抵扣商品总价比例10%</span>
                            <div style="margin-left: 110px;">
                                <span v-if="addCouponData.mortgage_type===1">
                                    最多抵扣
                                    <el-input
                                    class="input_width"
                                    style="margin-right:10px;width:120px;"
                                    size="mini"
                                    v-model="addCouponData.mortgage_content"></el-input>元
                                    <p class="wf-gray-title">若商品存在多规格不同价格，建议使用%，否则可能存在亏损问题</p>
                                    <p class="wf-gray-title">如果设置0，则不支持积分抵扣 如果带%则为按成交价格的比例计算抵扣多少元</p>
                                    <el-checkbox-group v-model="addCouponData.is_cumulative">
                                        <el-checkbox label="允许多件累计抵扣"></el-checkbox>
                                    </el-checkbox-group>
                                </span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="分销设置" prop="integral_content">
                        <el-radio-group v-model="addCouponData.distribution_set">
                            <el-radio :label="0">统一规则</el-radio>
                            <el-radio :label="1">单独自定义设置</el-radio>
                        </el-radio-group>
                        <div style="line-height: 24px;">
                            <div v-if="addCouponData.distribution_set===0">
                                <p>一级佣金比例 {{one_commission}}%</p>
                                <p>二级佣金比例 {{two_commission}}%</p>
                            </div>
                            <div style="margin-left: 110px;">
                                <span v-if="addCouponData.distribution_set===1">
                                    <div>
                                        <el-radio-group v-model="addCouponData.distribution_type">
                                            <el-radio :label="0">百分比</el-radio>
                                            <el-radio :label="1">固定金额</el-radio>
                                        </el-radio-group>
                                    </div>
                                    一级佣金比例
                                    <el-input
                                    class="input_width"
                                    style="margin: 0 10px 10px 0;width:120px;"
                                    size="mini"
                                    v-model="addCouponData.first_commission"></el-input>元
                                    <br/>
                                    二级佣金比例
                                    <el-input
                                    class="input_width"
                                    style="margin-right:10px;width:120px;"
                                    size="mini"
                                    v-model="addCouponData.second_commisstion"></el-input>元
                                    <p class="wf-gray-title">如果带%则为按成交价格的比例计算佣金</p>
                                </span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="状态" prop="state"  size="mini" >
                        <el-select v-model="addCouponData.state" @change="changeStatus" style="width:100px;">
                            <el-option
                            v-for="item in status_list"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否推荐" prop="recommend"   size="mini">
                        <el-select v-model="addCouponData.recommend" @change="changeRecommend" style="width:100px;">
                            <el-option
                            v-for="item in recommend_list"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详情" prop="details" >
                        <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="addCouponData.details" >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="详情图(图片可拖拽)" size="mini" class="wf-detailImg">
                        <draggable class="list-group" element="ul" v-model="detailImg" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                                <li v-for="(item, index) in detailImg" :key="index" class="detailImg" @click="handleDetailImg(index)">
                                    <el-upload :bindIndex="index" 
                                        :action="upUrl+'supper/attachment/upfile'"
                                        list-type="picture-card"
                                        :show-file-list="false"
                                        :before-upload="beforeUpload"
                                        :on-success="handleDetail"	
                                        :on-preview="detailPreview">
                                        <img v-if="item.url" :src="item.url" class="avatar"/>
                                        </el-upload>
                                    <div class="upload-icon">
                                        <el-row>
                                            <el-col :span="12" class="upload-icon-img">
                                               <i class="el-icon-view" ></i> <img v-if="item.url" :preview="index" :src="item.url" class="avatar"/>
                                            </el-col>
                                            <el-col :span="12">
                                                <i class="el-icon-delete" @click="handleRemove2(index)"></i>
                                            </el-col>
                                        </el-row>
                                        
                                    </div>
                                </li>
                            <!-- </transition-group> -->
                        </draggable>
                        <li class="detailImg" @click="handleDetailImg(-1)">
                            <el-upload 
                                :action="upUrl+'supper/attachment/upfile'"
                                list-type="picture-card"
                                :show-file-list="false"
                                :before-upload="beforeUpload"
                                :on-success="handleDetailAdd"	
                                :on-remove="handleRemove2"
                                :on-preview="detailPreview">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                         </li>
                        <el-dialog :visible.sync="detailVisible">
                            <img width="100%" :src="detailImg" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="排序" prop="orderby" >
                        <el-input-number :precision="0" :controls="false" :max="9999" class="input_width" size="mini" v-model="addCouponData.orderby"></el-input-number>
                    </el-form-item>
                    <el-form-item label="快递运费">
                        <el-radio class="wf-freight-radio" v-model="addCouponData.freight_type" :label="0">店铺统一邮费</el-radio>
                        <el-select class="wf-freight-select" v-model="freight_value" size="mini">
                            <el-option
                            v-for="item in freight_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <i class="el-icon-refresh wf-cursor" @click="getShowTemplate"></i><el-button type="text" @click="getShowTemplate">刷新</el-button> <span class="wf-blue">|</span>
                        <i class="el-icon-circle-plus wf-cursor"></i><el-button type="text">新建</el-button>
                        <br/>
                        <el-radio class="wf-freight-radio" v-model="addCouponData.freight_type" :label="1">个性化运费模版</el-radio>
                        <el-select class="wf-freight-select" v-model="freight_id" size="mini">
                            <el-option
                            v-for="item in personalise_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <i class="el-icon-refresh wf-cursor" @click="getFreightShow"></i><el-button type="text" @click="getFreightShow">刷新</el-button> <span class="wf-blue">|</span>
                        <i class="el-icon-circle-plus wf-cursor"></i><el-button type="text">新建</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="save">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import { addGoodGetMemberPrice, addGoodGetDisSetting, addGoodGetShowTemplate, addGoodGetFreightShow } from "@/server/add_good.js"
import { pointMarktingSwitchData } from '@/server/pointMarkting.js';
export default {
    name: 'shop_shop_edit',
    data() {
        const token=localStorage.getItem('userId');
        return {
            pointCreditShow: false, // 显示积分抵现
            freight_value: 0, // 运费规则
            freight_id: "", // 个性化运费模板
            freight_options: [], // 店铺统一运费
            personalise_options: [], // 个性化运费模板
            one_commission: "", // 获取分销一级佣金
            two_commission: "", //  获取分销二级佣金
            mainSwitch: false, // 控制赠送积分、积分抵现显示
            memberPrice: [], // 获取会员等级前三个
            suggestions_index: "",
            pointMarktingId: "",
            pointMarktingPrice: "", // 交易得积分
            pointMarktingPoint: "", // 积分抵现规则
            handleDetailImgIndex:0,
            isDragging: false,
            delayedDragging: false,
            lunboVisible: false,
            detailVisible: false,
            imageUrl:'',//主图
            dialogImageUrl:[],//轮播图
            upUrl:'',//图片上传路径
            detailImg:[],//详情图上传
            fileList1: [],
            fileList2: [],
            fileList3: [],
            fileList4: [],
            labelPosition: 'left', // 表单对齐方式
            upLoadUrl:this.url+'supper/attachment/upfile?token='+token,
            small_imageUrl: '',
            dialogVisible: false,
            selectedOptions: [], //分类级联选择器
            options: [],
            defaultProps: { // 分类级联选择器配置选项
                value: 'id',
                label: 'type_name',
                children: 'children'
            },
            restaurants: [], // 带输入建议=
            restaurants2: [],
            status_list: [{
                value: '0',
                label: '下架'
            },{
                value: '1',
                label: '上架'
            }],
            recommend1: '1',
            recommend: '是',
            recommend_list: [{
                value: '0',
                label: '否'
            },{
                value: '1',
                label: '是'
            }],
            spec:[],
            son_spec:[],
            sku:[],
            sku_list:[],
            addCouponData: {
                state: '1', // 默认状态为上架
                recommend: '1',
                pro_title:'',
                description:'',
                integral_content: "", // 赠送积分
                integral_type: 0, // 赠送积分类型
                mortgage_type: 0, // 积分抵现类型
                mortgage_content: "", // 积分抵现金额
                is_cumulative: false, // 允许多件累计抵扣
                distribution_set: 0, // 分销设置类型
                first_commission: "", // 一级佣金
                second_commisstion: "", // 二级佣金
                distribution_type: 0, // 佣金类型
                freight_type: 0, // 运费类型
            },
            rules: {
                options: [
                    { required: true, message: '分类不能为空', trigger: 'blur' }
                ],
                imageUrl: [
                    { required: true, message: '主图不能为空', trigger: 'blur' }
                ],
                lunbo: [
                    { required: true, message: '轮播图不能为空', trigger: 'blur' }
                ],
                pro_title: [
                    { required: true, message: '商品标题不能为空', trigger: 'blur' }
                ],
                original_price: [
                    { required: true, message: '原价不能为空', trigger: 'blur' }
                ]
            },
            flagSku:false,
            flagSkuNum:0
        }
    },
    components: {
        draggable
    },
    computed:{
        //拖拽操作
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                ghostClass: "ghost"
            };
        },
    },
    created(){
        this.upUrl=this.url;
        this.classList();  //分类接口
        this.getPointMarkting()
        this.shopDetail()
    },
    mounted(){
        this.restaurants = this.loadAll();
        this.getPointMarktingSwitch() // 获取积分营销外部总开关
        this.getPointMarkting()
        this.getMemberPrice()
        this.getDisSetting() // 获取分销设置数据
        this.getShowTemplate() // 获取店铺统一运费
        this.getFreightShow() // 获取个性化运费模板
    },
    methods: {
        getFreightShow(){ // 获取个性化运费模板
            let that = this
            let data = { secret: localStorage.getItem("secretId") }
            addGoodGetFreightShow(data).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data.data.length>0){
                        that.personalise_options = []
                        that.freight_id = res.data.data.data[0].id
                        res.data.data.data.forEach(el => {
                            that.personalise_options.push({value:el.id,label:el.name})
                        });
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        getShowTemplate(){ // 获取店铺统一运费
            let that = this
            let data = { secret: localStorage.getItem("secretId") }
            addGoodGetShowTemplate(data).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data.data.length>0){
                        let state1 = false
                        let state2 = false
                        res.data.data.data.forEach(el => {
                            if(el.state===0){
                                state1 = true
                            }
                            if(el.state===1){
                                state2 = true
                            }
                        });
                        if(state1===true&&state2===true){
                            that.freight_options = [{value:0,label:"件数"},{value:1,label:"重量"}]
                        }else if(state1===true){
                            that.freight_options = [{value:0,label:"件数"}]
                        }else if(state2===true){
                            that.freight_options = [{value:1,label:"重量"}]
                        }
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        getDisSetting(){ // 获取分销设置数据
            let that = this
            let data = { secret: localStorage.getItem("secretId") }
            addGoodGetDisSetting(data).then((res)=>{
                if(res.data.code===200){
                    that.one_commission = res.data.data.first_commission
                    that.two_commission = res.data.data.second_commisstion
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        getPointMarktingSwitch(){ // 获取积分营销外部总开关
            let that = this
            let data = { secret: localStorage.getItem("secretId") }
            pointMarktingSwitchData(data).then((res)=>{
                if(res.data.code===200){
                    for(let i=0;i<res.data.data.length;i++){
                        if(res.data.data[i].modular_id===29&&res.data.data[i].state===1){
                            that.mainSwitch = true
                        }
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        getMemberPrice(){ // 获取会员等级前三个
            let that = this
            let data = { secret: localStorage.getItem('secretId') }
            addGoodGetMemberPrice(data).then((res)=>{
                if(res.data.code===200){
                    that.memberPrice = res.data.data
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        fetchSuggestions(index,i){
            this.suggestions_index = index
            this.suggestions_i = i
        },
        getPointMarkting(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axios.post(this.url+'shopapi/integral/index',data
            ).then(res=>{
                if(res.data.code===200){
                    if(res.data.data.length>0){
                        if(res.data.data[0].state===1||res.data.data[0].state===3){
                            that.pointMarktingId = res.data.data[0].id
                            that.pointMarktingPrice = res.data.data[0].price
                            that.addCouponData.integral_type = 0
                        }else{
                            that.addCouponData.integral_type = ""
                        }
                        if(res.data.data[0].status===1){
                            that.pointCreditShow = true
                            that.pointMarktingPoint = res.data.data[0].offset_value
                        }
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        jumpSku(){
            let jumpSku = this.$router.resolve({path:"/wf/admin/shop/sku_setting"})
            window.open(jumpSku.href, '_blank');
        },
        classJump(){
            let classJump = this.$router.resolve({path:"/wf/admin/shop/class_management"})
            window.open(classJump.href, '_blank');
        },
        handleDetailImg(i){
            this.handleDetailImgIndex=i;
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        shopDetail(){
            var that=this;
            let data = {
                token: localStorage.getItem('userId'),
                secret: localStorage.getItem('secretId'),
                id: that.$route.query.id
            }
            this.$axios.post(this.url+'shopapi/Goods/getGood', data).then(function (res) {
                if(res.data.code===1){
                    that.addCouponData.recommend=JSON.stringify(res.data.data.good_detail.recommend) //是否推荐
                    that.addCouponData.pro_title = res.data.data.good_detail.good_name // 商品标题
                    that.addCouponData.description = res.data.data.good_detail.good_describe // 描述
                    that.addCouponData.virtual_sales = res.data.data.good_detail.virtual_sales // 虚拟销量
                    that.addCouponData.original_price = res.data.data.good_detail.original_price // 原价
                    that.addCouponData.details = res.data.data.good_detail.good_details // 详情
                    that.addCouponData.orderby = res.data.data.good_detail.orderby
                    for(var i=0;i<res.data.data.good_detail.broadcast.split(',').length;i++){
                        that.dialogImageUrl.push({
                            url: res.data.data.good_detail.broadcast.split(',')[i],
                            response:{
                                code:0,
                                data:{
                                    src:res.data.data.good_detail.broadcast.split(',')[i]
                                }
                            }
                        })
                    }
                    for(var i=0;i<res.data.data.good_detail.good_detail_pics.length;i++){
                        that.detailImg.push({
                            url: res.data.data.good_detail.good_detail_pics[i],
                            response:{
                                code:0,
                                data:{
                                    src:res.data.data.good_detail.good_detail_pics[i]
                                }
                            }
                        })
                    }
                    that.selectedOptions = res.data.data.good_detail.good_type // 分类
                    that.imageUrl=res.data.data.good_detail.master_graph;
                    that.sku = res.data.data.sepc_list;
                    for(var a=0;a<res.data.data.allSpec.length;a++){
                        that.spec.push(res.data.data.allSpec[a].spec_name)
                        var c=[]
                        for(var b=0;b<res.data.data.allSpec[a].son.length;b++){
                            c.push(res.data.data.allSpec[a].son[b].spec_name)
                        }
                        that.son_spec.push(c)
                    };
                    that.addCouponData.integral_type = res.data.data.good_detail.integral_type
                    if(res.data.data.good_detail.integral_content===0||res.data.data.good_detail.integral_type===0){
                        that.addCouponData.integral_content = ""
                    }else{
                        that.addCouponData.integral_content = res.data.data.good_detail.integral_content
                    }
                    if(res.data.data.good_detail.mortgage_type===1){
                        that.addCouponData.mortgage_type = 1
                        that.addCouponData.mortgage_content = res.data.data.good_detail.mortgage_content
                        if(res.data.data.good_detail.is_cumulative===1){
                            that.addCouponData.is_cumulative = true
                        }else{
                            that.addCouponData.is_cumulative = false
                        }
                    }
                    if(res.data.data.good_detail.distribution_set===1){
                        that.addCouponData.distribution_set = 1
                        that.addCouponData.first_commission = res.data.data.good_detail.first_commission
                        that.addCouponData.second_commisstion = res.data.data.good_detail.second_commisstion
                        if(res.data.data.good_detail.distribution_type===1){
                            that.addCouponData.distribution_type = 1
                        }
                    }
                    if(res.data.data.good_detail.freight_type===1){
                        that.addCouponData.freight_type = 1
                        that.freight_id = res.data.data.good_detail.freight_id
                    }else{
                        that.freight_value = res.data.data.good_detail.freight_id
                    }
                    var arr = []
                    function func(skuarr=[], i, list){  
                        for (let j=0; j<list[i].length; j++) {  
                            if (i<list.length-1) {  　　　// 演示一下第一次执行函数的结果
                                skuarr[i] = list[i][j]  // skuarr[0] = ['黑色']  i=0, j=0
                                func(skuarr, i+1, list)    // 执行递归 skuarr[1] = ['s']  i=1, j=0
                            } else {
                    　　　　　　// 拓展运算符合并数组  
                            arr.push([...skuarr,list[i][j]])  // arr[0] = ['黑色','s','好']  i=2不符合if条件,执行else   j=0
                            }  
                        }  
                        return arr  
                    }
                    func([],0,that.son_spec)
                    that.sku_list=arr;
                }
            })
            .catch(function (error) {
                that.$message.error("网络错误")
            });
        },
        beforeUpload(file) {  //图片进行限制
            let size = file.size/1024/1024;
            if(size>2){
                this.$message.warning("图片不能大于2M")
                return false
            }else{
                return true
            }
        },
        handleLimit(files, fileList){ //图片个数超出
            this.$message.error("图片超出个数")
        },
        beforeAvatarUpload(res) { // 主图上传
            if(res.code==0){
                this.imageUrl=res.data.src;
            }else{
                this.$message.error("图片上传失败");
            }
            
        },
        handleRemove1(file, fileList) {  //轮播图删除
            this.dialogImageUrl=fileList;
        },
        handleRemove2(index) {  //轮播图删除
            this.detailImg.splice(index,1);
        },
        handlePictureCardPreview(res,file,fileList) { //轮播图上传
            if(res.code==0){
                this.dialogImageUrl=fileList;
            }else{
                this.$message.error("图片上传失败");
                return;
            }
        },
        lunboPreview(file){
            this.dialogImageUrl = file.url;
            this.lunboVisible = true;
        },
        detailPreview(file){
            this.detailImg = file.url;
            this.detailVisible = true;
        },
        handleDetail(res,file,fileList) { //轮播图上传
            if(res.code==0){
                let data={
                    url: fileList[fileList.length-1].response.data.src,
                    response:{
                        code:0,
                        data:{
                            src:fileList[fileList.length-1].response.data.src
                        }
                    }
                }
                this.detailImg.splice(this.handleDetailImgIndex,1,data);
            }else{
                this.$message.error("图片上传失败");
                // return;
            }
        },
        handleDetailAdd(res,file,fileList){
            if(res.code==0){
                this.detailImg.push({
                    url: fileList[fileList.length-1].response.data.src,
                    response:{
                        code:0,
                        data:{
                            src:fileList[fileList.length-1].response.data.src
                        }
                    }
                })
            }else{
                this.$message.error("图片上传失败");
                // return;
            }
        },
         smallUpload(event,i){  //规格缩略图上传
            let size = event.target.files[0].size/1024/1024
            if(size>2){
                this.$message.warning("图片不能大于2M")
                return false
            }
            var file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', file);
            var that=this;
             this.$axios.post(this.url+'supper/attachment/upfile', formData).then(function (res) {
                if(res.data.code==0){
                    that.sku[i].sku_thumbnail = res.data.data.src;
                    that.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                }
                else{
                    that.$message({
                        showClose: true,
                        message: '上传失败，请重上传',
                        type: 'error'
                    })
                }
            })
        },
        
        classList(){ // 查询所有分类
            var that=this;
            this.$axios.post(this.url+'shopapi/Goodtype/typeindex',
                'secret='+localStorage.getItem('secretId')+
                '&token='+localStorage.getItem('userId')+
                '&page=' + 1
            ).then(function (res) {
                if(res.data.code==1){
                    let data = res.data.data
                    var list=[]
                    for(var da in data){
                        if(data[da].children.length!=0){
                            list.push(data[da])
                        }
                        for(var child in data[da].children){
                            if(data[da].children[child].children.length==0){
                                data[da].children[child].children = ''
                            }
                        }
                    }
                    that.options = list
                }else{
                    that.$message.error('请求数据失败，请重新刷新页面');
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误，请重新添加');
            });
        },
        changeSelect(e){
            this.selectedOptions = e
        },
    //   带输入建议
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },
      //   规格值输入建议
      querySearch2(queryString, cb2) {
        if(this.spec[this.suggestions_index]!=""){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axios.post(this.url+'shopapi/default_spec/index',data
            ).then(res=>{
                if(res.data.code===200){
                    let arr = []
                    for(var i=0;i<res.data.data.length;i++){
                        if(res.data.data[i].spec_name===that.spec[that.suggestions_index]){
                            for(var j=0;j<res.data.data[i].children.length;j++){
                                arr.push({"value":res.data.data[i].children[j].spec_name})
                            }
                        }
                    }
                    let restaurants = arr;
                    let results = queryString ? restaurants.filter(that.createFilter2(queryString)) : restaurants;
                    // 调用 callback 返回建议列表的数据
                    cb2(results);
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        }
    },
      createFilter2(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },
    loadAll() {
        let that = this
        let data = {
            secret: localStorage.getItem('secretId')
        }
        let arr = []
        this.$axios.post(this.url+'shopapi/default_spec/index',data
        ).then(res=>{
            if(res.data.code===200){
                for(let i=0;i<res.data.data.length;i++){
                    arr.push({"value":res.data.data[i].spec_name})
                }
            }else{
                that.$message.error(res.data.msg);
            }
        }).catch(err=>{
            that.$message.error('系统出错，请联系管理员！');
        });
        return arr
    },
      handleSelect(item) {
      },
      changeStatus(e){
          this.state1 = e
      },
      changeRecommend(e){
          this.recommend1 = e
      },
      combList(){  //从新组合新的数组
       var arr = []
        function func(skuarr=[], i, list){  
            for (let j=0; j<list[i].length; j++) {  
                if (i<list.length-1) {  　　　
                    skuarr[i] = list[i][j] 
                    func(skuarr, i+1, list) 
                } else { 
                arr.push([...skuarr,list[i][j]]) 
                }  
            }  
            return arr  
        }

        func([],0,this.son_spec);
        this.sku_list=arr;
        var arrs=[]
        for(var a=0;a<arr.length;a++){
            var c={
                spec_name:arr[a].join(','),
                sku_price:undefined,
                sku_stock:undefined,
                first_level: undefined,
                second_level: undefined,
                third_level: undefined,
                sku_code:'',
                sku_thumbnail: '',
                key:a
            }
            arrs.push(c)
        }
        this.sku.forEach(el=>{
            arrs.forEach(els=>{
                if(el.spec_name===els.spec_name){
                    els.sku_price=el.sku_price;
                    els.sku_stock=el.sku_stock;
                    els.sku_code=el.sku_code;
                    els.sku_thumbnail=el.sku_thumbnail;
                    els.first_level=el.first_level;
                    els.second_level=el.second_level;
                    els.third_level=el.third_level;
                }
            })
        })
        this.sku=arrs;
      },
      addSPC(){  //添加规格
            if(this.spec.length<3){
                for(var i=0;i<this.spec.length;i++){
                    if(this.spec[i]===''){
                        this.$message.error('规格名不能为空')
                        return;
                    }
                }
                for(var j=0;j<this.son_spec.length;j++){
                    for(var k=0;k<this.son_spec[j].length;k++){
                        if(this.son_spec[j][k]===''){
                            this.$message.error('规格值不能为空')
                            return;
                        }
                    }
                }
                this.spec.push('');
                this.son_spec.push([''])
                this.combList();
                
            }else{
                this.$message({
                    showClose: true,
                    message: '最多添加3个规格',
                    type: 'warning'
                })
                return
            }
      },
      deleteSPC(index){ // 删除规格
        if(this.spec.length==1){
             this.$message.error('规格值不能为空')
        }else{
            this.spec.splice(index,1)
            this.son_spec.splice(index,1)
            this.combList();
        }
      },
      addSPCValue(index){  // 添加规格值
        for(var i=0;i<this.spec.length;i++){
            if(this.spec[i]===''){
                this.$message.error('规格名不能为空')
                return;
            }
        }
        for(var j=0;j<this.son_spec.length;j++){
            for(var k=0;k<this.son_spec[j].length;k++){
                if(this.son_spec[j][k]===''){
                    this.$message.error('规格值不能为空')
                    return;
                }
            }
        }
        this.son_spec[index].push('');
        this.combList();
        
      },
      deleteSPCValue(index,i){ // 删除规格值
        if(this.son_spec[index].length==1){
            this.$message.error('规格值最少一个')
        }else{
            this.son_spec[index].splice(i,1)
            this.combList();
        }
      },
      save(){
            let that = this
            let bool = true
            this.sku_list;
            if(this.sku.length<0){
                this.$message.error('规格不能为空');
                return
            }
            
            if(this.sku[0].sku_name){
                this.sku_list.forEach((item,i)=>{
                    this.sku[i].sku_name=item.join(",");
                })
            }else if(this.sku[0].spec_name){
                this.sku_list.forEach((item,i)=>{
                    delete this.sku[i].spec_name;
                    this.sku[i].sku_name=item.join(",");
                    
                })
            }
            for(var i in this.sku){ // 循环判断sku中的现价和库存都不能为空
                if(this.sku[i].sku_stock===''){
                    bool = false
                }else if(this.sku[i].sku_price===''){
                    bool = false
                }
            }
            
            var broadcast=[]
            for(var i=0;i<this.dialogImageUrl.length;i++){
                if(this.dialogImageUrl[i].response.code==0){
                    broadcast.push(this.dialogImageUrl[i].response.data.src)
                }
            }

            var good_detail_pics=[]
            for(var i=0;i<this.detailImg.length;i++){
                if(this.detailImg[i].response.code==0){
                    good_detail_pics.push(this.detailImg[i].response.data.src)
                }
            }

            if(this.selectedOptions.length===0){
                this.$message.error('商品分类不能为空');
            }else if(this.imageUrl===''){
                this.$message.error('主图不能为空');
            }else if(broadcast.length===0){
                this.$message.error('轮播图至少上传一张')
            }else if(this.addCouponData.pro_title==''){
                this.$message.error('商品标题不能为空');
            }else if(this.addCouponData.original_price===''){
                this.$message.error('原价不能为空');
            }else if(this.spec===''||this.son_spec===''){
                this.$message.error('规格与规格值不能为空');
            }else if(bool===false){
                this.$message.error('规格的现价、库存不能为空');
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: '商品保存中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                    loading.close()
                }, 5000);
                let sku = JSON.parse(JSON.stringify(this.sku))
                for(let i=0;i<sku.length;i++){
                    delete sku[i].key
                }
                let is_cumulative
                if(this.addCouponData.is_cumulative===false){
                    is_cumulative = 0
                }else{
                    is_cumulative = 1
                }
                let freight_id
                if(this.addCouponData.freight_type===0){
                    freight_id = this.freight_value
                }else{
                    freight_id = this.freight_id
                }
                let integral_content
                if(this.addCouponData.integral_type===0){
                    integral_content = ""
                }else{
                    integral_content = this.addCouponData.integral_content
                }
                let mortgage_content
                if(this.addCouponData.mortgage_type===0){
                    mortgage_content = ""
                    is_cumulative = 0
                }else{
                    mortgage_content = this.addCouponData.mortgage_content
                }
                let distribution_type
                let first_commission
                let second_commisstion
                if(this.addCouponData.distribution_set===0){
                    distribution_type = ""
                    first_commission = ""
                    second_commisstion = ""
                }else{
                    distribution_type = this.addCouponData.distribution_type
                    first_commission = this.addCouponData.first_commission
                    second_commisstion = this.addCouponData.second_commisstion
                }
                let data = {
                    secret: localStorage.getItem('secretId'),
                    token: localStorage.getItem('userId'),
                    id:this.$route.query.id,
                    master_graph : this.imageUrl,
                    good_name  :this.addCouponData.pro_title,
                    broadcast: broadcast.join(','),
                    good_describe: this.addCouponData.description,
                    virtual_sales: this.addCouponData.virtual_sales,
                    original_price : this.addCouponData.original_price,
                    good_details : this.addCouponData.details,
                    state : this.addCouponData.state,
                    recommend:this.addCouponData.recommend,
                    spec: this.spec,
                    son_spec : this.son_spec,
                    sku : sku,
                    vnarious: 1,
                    good_type: this.selectedOptions.join(',')+',',
                    orderby: this.addCouponData.orderby,
                    good_detail_pics: good_detail_pics.join(','),
                    integral_type: this.addCouponData.integral_type,
                    integral_content: integral_content,
                    is_cumulative: is_cumulative,
                    mortgage_type: this.addCouponData.mortgage_type,
                    mortgage_content: mortgage_content,
                    distribution_set: this.addCouponData.distribution_set,
                    distribution_type: distribution_type,
                    first_commission: first_commission,
                    second_commisstion: second_commisstion,
                    freight_type: this.addCouponData.freight_type,
                    freight_id: freight_id
                }
                if(this.addCouponData.integral_type===""){
                    data.integral_content = ""
                }else if(this.addCouponData.integral_type===0){
                    data.integral_content = this.pointMarktingId
                }else{
                    data.integral_content = this.addCouponData.integral_content
                }
                this.$axios.post(this.url+'shopapi/Goods/addGood',data
                ).then(function (res) {
                    loading.close()
                    if(res.data.code==1){
                        that.$message.success('保存成功');
                        that.$router.push({path:'/wf/admin/shop/newshop_list'})
                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    that.$message.error('网络错误，请重新添加');
                    loading.close()
                });
            }
        }
    },
    watch: {
        son_spec(newValue,oldValue){
            var arr = []
            function func(skuarr=[], i, list){  
                for (let j=0; j<list[i].length; j++) {  
                    if (i<list.length-1) {  　　　// 演示一下第一次执行函数的结果
                        skuarr[i] = list[i][j]  // skuarr[0] = ['黑色']  i=0, j=0
                        func(skuarr, i+1, list)    // 执行递归 skuarr[1] = ['s']  i=1, j=0
                    } else {
            　　　　　　// 拓展运算符合并数组  
                    arr.push([...skuarr,list[i][j]])  // arr[0] = ['黑色','s','好']  i=2不符合if条件,执行else   j=0
                    }  
                }  
                return arr
            }

            func([],0,this.son_spec)
            this.sku_list=arr;
            var arrs=[]
            for(var a=0;a<arr.length;a++){
                var c={
                    spec_name:arr[a].join(','),
                    sku_price:undefined,
                    sku_stock:undefined,
                    first_level: undefined,
                    second_level: undefined,
                    third_level: undefined,
                    sku_code:'',
                    sku_thumbnail: '',
                    key:a
                }
                arrs.push(c)
            }
            this.sku.forEach(el=>{
                arrs.forEach(els=>{
                    if((el.spec_name===els.spec_name)){
                        els.sku_price=el.sku_price;
                        els.sku_stock=el.sku_stock;
                        els.sku_code=el.sku_code;
                        els.sku_thumbnail=el.sku_thumbnail;
                        els.first_level=el.first_level;
                        els.second_level=el.second_level;
                        els.third_level=el.third_level;
                    }
                })
            });
            if(this.flagSku===false){
                this.flagSku=true;
            }else{
                if(this.sku.length<this.sku_list.length){
                    
                }
            }
        },
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        }
    },
}
</script>

<style lang="scss">
#shop_edit{
    background: #fff;
    padding: 50px;
    .wf-detailImg{
         .list-group{
             .detailImg{
                float: left;
                margin-bottom: 5px;
                 .upload-icon{
                    text-align: center;
                    width: 80px;
                    .el-icon-delete{
                        cursor: pointer;
                    }
                    .upload-icon-img{
                        position: relative;
                        img{
                            width: 14px;
                            height: 14px;
                            opacity: 0;
                            position: absolute;
                            left: 20px;
                            top: 5px;
                            cursor: pointer;
                        }
                    }
                 }
             }
         }
    }
    .el-button--primary{
        background: #719FF8;
    }
    .el-button--text{
        color: #719FF8;
    }
    .label-left .el-form-item__label{
        margin-left: -10px;
    }
    .el-upload{
        width: 100px;
        height: 100px;
        line-height: 100px;
       
    }
    .el-upload-list--picture-card .el-upload-list__item{
         width: 100px;
        height: 100px;
    }
    .wf-red{
        color: red;
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
        font-size: 20px;
        color: #8c939d;
        width: 70px;
        line-height: 30px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    .add-price{
        border: 1px solid #ececec;
        margin-bottom: 20px;
        border-radius: 5px;
    }
    .addtable{
        margin-top:20px;
        border: 1px solid #ececec;
        border-radius: 5px;
    }
    .el-upload--picture-card{
        width: 102px;
        height: 102px;
        line-height: 100px;
        margin-right: 10px;
    }
    .el-upload--picture-card i{
        font-size: 20px;
    }
    a,.a{
        color: rgb(42, 148, 255);
        cursor: pointer;
    }
    a:hover,.a:hover{
        color: rgb(93, 174, 255);
    }
    .delete_icon{
        line-height: 40px;
        font-size: 24px;
        cursor: pointer;
        color: #C1C1C1;
        float: right;
        margin-right: 16px;
        margin-top: 6px;
    }
    .delete_icon:hover{
        color: red;
    }
    .delete_SPC_V{
        position: relative;
        background-color: #fff;
        color: red;
        left: -33px;
        top: -17px;
        z-index: 10;
        font-size: 16px;
        cursor: pointer;
        opacity: 0;
        transition: .2s;
    }
    .SPC_V_input:hover+.delete_SPC_V,.delete_SPC_V:hover{
        opacity: 1;
    }
    .file_input{
        position: absolute;
        opacity: 0;
        width: 70px;
        display: block;
        height: 80px;
        cursor: pointer;
    }
    .el-upload-list{
        width: 400px;
    }
    .el-form-item--mini{
        margin-bottom: 1.5625rem;
    }
    .input_width{
        width: 10rem;
        height: 2rem;
    }
    .rule_btn{
        margin-bottom: 1.8rem;
        font-size: 1rem;
    }
    .rule_guize{
        margin-right: 1.4375rem;
        font-size: 20px;
    }
    .upload-demo{
        display: inline-block;
    }
    .upload-demo div,.upload-demo li{
       width: 3.875rem ;
       height: 3.875rem ; 
    }
    .group_price_input{
        width: 6rem;
        margin-right: 0.625rem;
    }
    .upload_img{
        position: relative;
        top: -12px;
        left: 2px;
    }
    .el-form-item__content{
        margin-left: 12rem !important;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        margin: 0 1.6875rem  8px 0;
    }
    .wf-gray-title{
        color: #999;
        font-size: 12px;
    }
    .wf-sku_list-gray{
        height: 60px;
        background: #F8F8F8;
        line-height: 60px;
    }
    .wf-sku,.wf-sku_list-gray{
        padding-left: 20px!important;
        overflow: auto;
    }
    .wf-sku-gray{
        background: #F8F8F8;
        padding-left: 20px;
    }
    .wf-cursor{
        cursor: pointer;
        color: #719FF8;
    }
    .wf-blue{
        color: #719FF8;
    }
    .wf-freight-radio{
        width: 140px;
    }
    .wf-freight-select{
        width: 100px;
        margin-right: 20px;
    }
    .wf-tabel-head-spec{
        width: 82px;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
