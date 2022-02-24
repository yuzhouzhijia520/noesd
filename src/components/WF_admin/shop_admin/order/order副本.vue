<template>
    <div id="order">
        <el-row>
            <el-form ref="form" :model="form" label-width="150px">
                <el-col :span="6">
                    <el-form-item label="订单编号" >
                        <el-input  v-model="seach_order"  size="mini" @keyup.enter.native="search"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="6" :pull="6">
                    <el-form-item label="下单时间" >
                        <el-date-picker
                        v-model="time"
                        style="margin-left:12px;"
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
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品名称" >
                        <el-input  v-model="form.goodName"  size="mini"  @keyup.enter.native="search"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" >
                    <el-form-item label="收货人姓名、手机" >
                        <el-input size="mini" v-model="seach_input" @keyup.enter.native="search"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" >
                    <el-form-item label="下单人昵称" >
                        <el-input size="mini" v-model="nick_name" @keyup.enter.native="search"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" >
                    <el-form-item label="下单人手机号" >
                        <el-input size="mini" v-model="phone" @keyup.enter.native="search"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="领取方式" >
                        <el-select v-model="receive_way" size="mini" @change="handleChangeReceive">
                            <el-option
                            v-for="item in receive_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="付款方式" >
                        <el-select v-model="form.pay_type" size="mini" @change="handleChangePay">
                            <el-option
                            v-for="item in payOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单类型" >
                        <el-select v-model="order_type" size="mini" @change="handleChangeOrder">
                            <el-option
                            v-for="item in oderType_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" >
                    <el-form-item label-width="57px">
                        <el-button size="mini" type="primary" @click="search" :loading="searchLoading">搜索</el-button>
                        <el-button size="small" @click="exportDialog" >批量导出</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label-width="80px">
                        <el-button size="mini" @click="batchShip">电子面单发货</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="(item,index) in status_list"
                :key="index"
                :label="item.label"
                :name="item.name">
                </el-tab-pane>
            </el-tabs>
        </el-row>

        <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="订单号"
            prop="trade_no"
            width="200">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="state">
            </el-table-column>
            <el-table-column
            label="领取方式">
                <template slot-scope="scope">
                    {{scope.row.receive_way===1?"到店自提":"物流配送"}}
                </template>
            </el-table-column>
            <el-table-column
            label="总价">
                <template slot-scope="scope">
                    {{scope.row.order_type==="积分兑换"?scope.row.integral+"积分"+(scope.row.total_price!="0.00"?"+￥"+scope.row.total_price:""):"￥"+scope.row.total_price}}
                </template>
            </el-table-column>
            <el-table-column
            label="收货人"
            prop="collection_name">
            </el-table-column>
            <el-table-column
            label="收件人手机"
            prop="collection_phone">
            </el-table-column>
            <el-table-column
            label="付款方式">
                <template slot-scope="scope">
                    {{scope.row.pay_type===0?"储值卡支付":(scope.row.pay_type===2?"货到付款":"微信支付")}}
                </template>
            </el-table-column>
            <el-table-column
            label="订单类型"
            prop="order_type">
            </el-table-column>
            <el-table-column
            label="创建时间"
            prop="create_time"
            width="180"
            :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作"
            width="220">
            <template slot-scope="scope">
                <el-button type="text" @click="toOrder_detail(scope.row.id)">详情</el-button>
                <el-button v-if="scope.row.state==='待付款'" type="text" @click="priceChangeShow(scope.row.id)">改价</el-button>
                <el-button v-if="scope.row.state==='待发货'" type="text" @click="shipShow(scope.row.id,scope.row)">发货</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
        layout="total, prev, pager, next, jumper"
        :total="pageCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size='pageSize'>
        </el-pagination>
        <el-dialog
        title="改价"
        :visible.sync="dialogVisible"
        width="1080px">
            <p class="wf-balck-weight">订单原价（含运费）{{changeOrderData.total_price}}元<span class="wf-red-title wf-margin-left">只有未付款订单才支持改价，改价后请联系买家刷新订单核实订单金额后再支付。</span></p>
            <el-table
            :data="changeOrderData.data"
            :span-method="objectSpanMethod"
            border
            class="wf-margin-top wf-order-change-table">
                <el-table-column
                    prop="good_name"
                    label="商品"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="单价（元）"
                    align="center">
                    <template slot-scope="scope">
                        {{"￥"+scope.row.good_price}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="数量"
                    align="center">
                    <template slot-scope="scope">
                        {{"×"+scope.row.good_num}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="小计（元）"
                    align="center">
                    <template slot-scope="scope">
                        {{"￥"+scope.row.good_amount}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="店铺优惠"
                    align="center">
                    <template slot-scope="scope">
                        <div style="display:none">{{scope.row}}</div>
                        {{changeOrderData.discount==0?changeOrderData.discount:"-"+changeOrderData.discount}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="修改价格"
                    width="280"
                    header-align="center">
                    <template slot-scope="scope">
                        <div style="display:none">{{scope.row}}</div>
                        <el-radio v-model="modify_type" :label="0">订单总价（含运费）</el-radio>
                        <el-radio v-model="modify_type" :label="1">运费（元）</el-radio>
                        <p class="change-price-margin" v-if="modify_type===0">订单总价： ￥{{changeOrderData.total_price}}</p>
                        <p class="change-price-margin" v-else>运费： ￥{{changeOrderData.freight}} <el-button type="text" @click="modify_freight=0">直接免运费</el-button></p>
                        <el-input-number v-model="modify_price" v-if="modify_type===0" class="change-price-input-margin" :controls="false" :precision="2" :min="0.01" size="mini" placeholder="请输入修改后的价格"></el-input-number>
                        <el-input-number v-model="modify_freight" v-else class="change-price-input-margin" :controls="false" :precision="2" :min="0" size="mini" placeholder="请输入修改后的价格"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                    label="实付金额（元）"
                    align="center">
                    <template slot-scope="scope">
                        <div style="display:none">{{scope.row}}</div>
                        {{realPay}}
                    </template>
                </el-table-column>
            </el-table>
            <p class="wf-margin-top-ten">收货地址：{{changeOrderData.address}}</p>
            <p class="wf-margin-top-ten">实付金额 =订单原价 + （修改后的运费-原运费）</p>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" :loading="saveLoading" @click="priceChange">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量导出订单" 
            :visible.sync="dialogExport" 
            width="950px" 
            center 
            class="wf-export-dialog"
            v-if="dialogExport==true">
                <el-row>
                    <p class="wf-export-title">提示说明</p>
                </el-row>
                <el-row>
                    <p class="wf-export-body">1.为保证报表导出性能，只能导出距当前时间5分钟前的订单</p>
                    <p class="wf-export-body">2.订单数越多，报表生成越慢，请耐心等待</p>
                </el-row>
                <el-row>
                    <p class="wf-export-title">查询条件</p>
                </el-row>
                <el-row>
                    <el-form label-width="140px">
                        <el-row>
                            <el-form-item label="下单时间:">{{time[0]}}  至  {{time[1]}}</el-form-item>
                        </el-row>
                        <el-row>
                             <el-col :span="8">
                                 <el-form-item label="订单编号:">{{seach_order}}</el-form-item>
                             </el-col>
                             <el-col :span="8">
                                <el-form-item label="订单类型:">{{oderType_optionsLable}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="商品名称:">{{form.goodName}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="收货人姓名、手机:">{{seach_input}}</el-form-item>
                            </el-col>
                            <el-col :span="8">   
                                <el-form-item label="下单人昵称:">{{nick_name}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="下单人手机号:">{{phone}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="领取方式:">{{receive_optionsLable}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="付款方式:">{{payOptionsLable}}</el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-row>
                <el-row>
                    <p class="wf-export-title">导出维度</p>
                </el-row>
                <el-row>
                    <p class="wf-export-body">以订单维度导出，报表中每个订单号一行</p>
                </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogExport = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="batchExport" :loading="downloadLoading">确定导出</el-button>
            </div>
        </el-dialog>
        <el-dialog title="发货" 
        :visible.sync="shipDialog" 
        width="500px"
        class="wf-ship-dialog">
            <el-row justify="space-between" type="flex">
                <el-tabs v-model="activeShip">
                    <el-tab-pane v-for="(item,index) in ship_type"
                    :key="index"
                    :label="item.label"
                    :name="item.name">
                    </el-tab-pane>
                </el-tabs>
            </el-row>
            <el-form class="wf-margin-top" label-position="right" label-width="100px">
                <el-form-item v-if="activeShip == '0'" label="快递公司">
                    <el-select v-model="courier" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in courierOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="text" @click="orderOften" size="mini">常用快递管理</el-button>
                </el-form-item>
                <el-form-item v-if="activeShip==='0'" label="快递单号">
                    <el-input class="wf-input-width" v-model="express_num" size="mini"></el-input>
                </el-form-item>
                <el-form-item v-if="activeShip==='0'" label="备注">
                    <el-input class="wf-input-width" v-model="express_remarks" size="mini" ></el-input>
                </el-form-item>
                <el-form-item v-if="activeShip==='2'" label="备注">
                    <el-input class="wf-input-width" v-model="express_remarkss" placeholder="本单由商家自主配送，请耐心等待。"  type="textarea" size="mini" ></el-input>
                </el-form-item>
                <el-form-item v-if="activeShip==='3'" label="备注">
                    <el-input class="wf-input-width" v-model="express_remarksss" size="mini" placeholder="亲，感谢下单，本单为非实物商品，无法查看物流哦。"  type="textarea"></el-input>
                </el-form-item>
                <el-form-item v-if="activeShip==='0'" label="快递单拍照">
                    <el-upload
                    class="avatar-uploader"
                    :action="upfileUrl"
                    :show-file-list="false"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload">
                        <img v-if="courier_image" :src="courier_image" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="shipDialog = false">取消</el-button>
                <el-button size="mini" type="primary" @click="shipSave" :loading="shipLoading">发货</el-button>
            </div>
        </el-dialog>
        <el-dialog title="发货" 
        :visible.sync="batchShipDialog" 
        width="500px"
        class="wf-ship-dialog">
            <el-row justify="space-between" type="flex">
                <el-tabs v-model="activeShip">
                    <el-tab-pane v-for="(item,index) in ship_type"
                    :key="index"
                    :label="item.label"
                    :name="item.name">
                    </el-tab-pane>
                </el-tabs>
            </el-row>
            <el-form class="wf-margin-top" label-position="right" label-width="100px">
                <el-form-item v-if="activeShip == '0'" label="快递公司">
                    <el-select v-model="courier" placeholder="请选择" size="mini" @change="changeCourier">
                        <el-option
                        v-for="item in courierOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <p class="wf-gray-title">自动使用签约运单号</p>
                </el-form-item>
                <el-form-item v-if="activeShip == '0'" label="快递类型">
                    <el-select v-model="courierType" placeholder="请选择" size="mini" :no-data-text="selectPrompt">
                        <el-option
                        v-for="item in courierTypeOption"
                        :key="item[0]"
                        :label="item[1]"
                        :value="item[0]">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="activeShip == '0'" label="发货信息">
                    <el-select v-model="return_address_id" placeholder="请选择" size="mini" :no-data-text="selectPrompt">
                        <el-option
                        v-for="item in address_options"
                        :key="item.id"
                        :label="item.code.join('')+item.address"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <div>
                        <el-button type="text" @click="shipJump">管理发货信息</el-button>
                    </div>
                </el-form-item>
                <el-form-item v-if="activeShip==='2'" label="备注">
                    <el-input class="wf-input-width" v-model="express_remarkss" placeholder="本单由商家自主配送，请耐心等待。"  type="textarea" size="mini" ></el-input>
                </el-form-item>
                <el-form-item v-if="activeShip==='3'" label="备注">
                    <el-input class="wf-input-width" v-model="express_remarksss" size="mini" placeholder="亲，感谢下单，本单为非实物商品，无法查看物流哦。"  type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="batchShipDialog = false">取消</el-button>
                <el-button size="mini" type="primary" @click="batchShipSave" :loading="shipLoading">发货</el-button>
            </div>
        </el-dialog>
        <versionCom v-if="showVersion" @closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import {orderList, orderChangePrice, orderSave ,batchExport, upstate, wxExpress, expressAddress, batchShipWaybill, getCourier } from "@/server/order.js"
import { shopAddressGetData } from "@/server/shopAddress.js"
import {excelDownload,encodeFormData,dateFormat} from '@/untils/common.js';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: 'shop_order',
    data() {
      return {
          showVersion:false,//控制版本提示
          courierType: "", // 快递类型
          courierTypeOption: [],
          selectPrompt: "请选择快递公司",
          return_address_id: "",
          address_options: [],
          batchShipDialog: false,
          selectOrder: [],
        //   发货弹框数据
        shipLoading: false,
          courier: "",
          courierOption: [],
          express_num:'',
          courier_image: "",
          express_remarks:'可复制快递单号到官网查询',
          express_remarkss:'本单由商家自主配送，预计3个自然日内配送，请耐心等待。',
          express_remarksss: "亲，感谢下单，本单为非实物商品，无法查看物流哦。",
          upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
          activeShip: '0',
          ship_type: [
              { name: '0', label: '快递物流' },{ name: '2', label: '同城配送' },{ name: '3', label: '虚拟商品' }
          ],
          shipDialog: false,
        form:{
            goodName:'',
            pay_type:-1
        },
        dialogExport:false,
        searchLoading:false,
        saveLoading: false,
        order_id: "",
        realPay: "", // 实付金额
        modify_price: undefined, // 订单总价(含运费)
        modify_freight: undefined, // 运费
        modify_type: 0, // 修改价格类型
        changeOrderData: [], // 改价信息
        dialogVisible: false, // 改价弹框
        nick_name:'',//下单人名称
        phone:'',//下单人手机号
        time:'',
        receive_way: 2,
        pickerOptions: {
            disabledDate: (time) => {
                return time.getTime() > new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);//减去一天的时间代表可以选择同一天;
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
        payOptionsLable:'全部',
        payOptions:[
            { value: -1, label: "全部" },{ value: 0, label: "余额支付" },{ value: 1, label: "微信支付"},
            { value: 2, label: "货到付款" }
        ],
        receive_optionsLable:'全部',
        receive_options: [
            { value: 2, label: "全部" },{ value: 0, label: "物流配送" },{ value: 1, label: "到店自提" }
        ],
        order_type: -1,
        oderType_optionsLable:'全部',
        oderType_options: [
            { value: -1, label: "全部" },{ value: 0, label: "普通" },{ value: 1, label: "团购" },
            { value: 2, label: "秒杀" },{ value: 3, label: "分销" },{ value: 4, label: "砍价" },
            { value: 5, label: "积分兑换" },
        ],
        status_list: [
            { id: -1, label: '全部', name: 'state=-1' },{ id: 0, label: '待付款', name: 'state=0' },{ id: 1, label: '待发货', name: 'state=1' },
            { id: 2, label: '待收货', name: 'state=2' },{ id: 3, label: '已完成',  name: 'state=3' },{ id: 4, label: '已取消', name: 'state=4' },
            { id: 5, label: '申请退款', name: 'state=5' },{ id: 6, label: '已退款', name: 'state=6' }
        ],
        tableData: [],
        activeName: 'state=1',
        getPage: 1,
        pageSize: 10,
        page:1,
        pageCount: 0,
        state: '1',
        seach_input:'',
        seach_order:'',
        downloadLoading:false,
        autoWidth:true,
        bookType:'xlxs',
      };
    },
    components: {
        versionCom
    },
    created: function(){
        let that = this
        let keyword = undefined
        if(this.$route.query.phone){
            keyword = this.$route.query.phone
            this.seach_input = this.$route.query.phone
        }
        that.$axios.post(this.url +'shopapi/Order/index',{
            token:localStorage.getItem('userId'),
            secret:localStorage.getItem('secretId'),
            limit:10,
            page:1,
            state:parseInt(this.state),
            receive_way: this.receive_way,
            order_type: this.order_type,
            keyword: keyword,
            pay_type: this.form.pay_type
        })
        .then(function (res) {
            if(res.data.code === 1){
                that.pageCount = res.data.total
                that.tableData = res.data.data
            }
        }).catch(function (error) {
            that.$message.error('系统出错，请联系管理员！');
        });
    },
    methods: {
        handleCloseVersion(){ // 关闭版本更新提示弹框
            this.showVersion = false;
        },
        shipJump(){
            window.open(this.$router.resolve({path:'/wf/admin/shop/waybillManagement',query:{type:2}}).href);
        },
        batchShipSave(){
            if(this.courier===""){
                this.$message.warning("请选择快递公司")
            }else if(this.courierType===""){
                this.$message.warning("请选择快递类型")
            }else if(this.return_address_id===""){
                this.$message.warning("请选择发货信息")
            }else{
                let that = this
                let order_id = this.selectOrder.map((item)=>{
                    return item.id
                })
                let service_name = this.courierTypeOption.map((item)=>{
                    if(item[0]===that.courierType){
                        return item[1]
                    }
                })
                let activeShip = parseInt(this.activeShip)
                let data = {
                    token: localStorage.getItem('userId'),
                    pro_id: parseInt(localStorage.getItem("proId")),
                    order_id: order_id.join(","),
                    address_id: activeShip===0?this.return_address_id:undefined,
                    service_type: activeShip===0?parseInt(this.courierType):undefined,
                    service_name: activeShip===0?service_name.join(""):undefined,
                    delivery_id: activeShip===0?this.courier:undefined,
                    receive_way: activeShip,
                    delivery_remark: activeShip===2?this.express_remarkss:activeShip===3?this.express_remarksss:undefined
                }
                batchShipWaybill(data).then((res)=>{
                    if(res.data.code===200){
                        that.getData("-1")
                        that.$message.success("操作成功")
                        that.batchShipDialog = false
                    }else{
                        that.$message.error(res.data.msg+"600A00121");
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误600B00122');
                })
            }
        },
        changeCourier(val){
            let that = this
            let expressData = {
                token: localStorage.getItem('userId'),
                pro_id: parseInt(localStorage.getItem("proId")),
                id: val
            }
            expressAddress(expressData).then((res)=>{
                if(res.data.code===200){
                    that.selectPrompt = "无数据"
                    that.address_options = res.data.data.address
                    that.courierTypeOption = res.data.data.state
                }else{
                    that.$message.error(res.data.msg+"600A0081");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0082');
            })
        },
        batchShip(){
            let that = this
            getAuditApplicationList(24).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===false){
                        that.showVersion = true
                    }else{
                        let select = this.selectOrder.every((item)=>{
                            return item.state === '待发货'
                        })
                        if(this.selectOrder.length===0){
                            this.$message.warning("请选择发货订单")
                        }else if(select===false){
                            this.$message.warning("勾选的订单中有非待发货状态的订单，请选择待发货状态的订单发货")
                        }else{
                            let data = {
                                token: localStorage.getItem('userId'),
                                pro_id: parseInt(localStorage.getItem("proId"))
                            }
                            wxExpress(data).then((res)=>{
                                if(res.data.code===200){
                                    that.courier = ""
                                    that.courierType = ""
                                    that.return_address_id = ""
                                    that.courierOption = res.data.data
                                    that.courierTypeOption = []
                                    that.address_options = []
                                    that.selectPrompt = "请选择快递公司"
                                    that.activeShip = '0'
                                    that.batchShipDialog = true
                                }else{
                                    that.$message.error(res.data.msg+"600A0075");
                                }
                            }).catch((err)=>{
                                that.$message.error('网络错误600B0076');
                            })
                        }
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00123");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00124');
            })
        },
        orderOften(){
            window.open(this.$router.resolve({path:'/wf/admin/shop/freight_management',query:{activeName:'third'}}).href);
        },
        shipSave(){
            let that = this
            let data = {
                id: this.order_id,
                secret:localStorage.getItem('secretId'),
                delivery_remark: this.activeShip==='0'?this.express_remarks:this.activeShip==='1'?this.express_remarkss:this.express_remarksss,
                receive_way: parseInt(this.activeShip),    
            }
            if(this.activeShip==='0'){
                if(this.courier===""){
                    this.$message.warning("请选择快递公司")
                    return
                }else if(this.express_num===""){
                    this.$message.warning("请填写快递单号")
                    return
                }else if(!/^[0-9a-zA-Z]+$/.test(this.express_num)){
                    this.$message.warning("请输入正确的快递单号")
                    return
                }
                data.express_id = this.courier
                data.courier_number = this.express_num
                data.courier_image = this.courier_image
            }
            this.shipLoading = true
            upstate(data).then((res)=>{
                that.shipLoading = false
                if(res.data.code===1){
                    that.getData('1')
                    that.shipDialog = false
                    that.$message.success("发货成功")
                }else{
                    that.$message.error(res.data.msg+"600A0065");
                }
            }).catch((err)=>{
                that.shipLoading = false
                that.$message.error('网络错误600B0066');
            })
        },
        beforeUpload(file){
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }else{
                return true
            }
            if(file.size/1024/1024>2){
                this.$message.warning("上传图片大小不能超过2M")
                return false
            }
        },
        handleSuccess(response, file, fileList){
            this.courier_image = response.data.src
        },
        shipShow(id,row){
            let that = this
            let data = {
                token: localStorage.getItem('userId'),
                pro_id: parseInt(localStorage.getItem("proId"))
            }
            getCourier(data).then((res)=>{
                if(res.data.code===1){
                    that.courier = ""
                    that.courierOption = res.data.data
                    that.courier_image = ""
                    that.shipDialog = true
                    that.order_id = id
                    that.activeShip = '0'
                }else{
                    that.$message.error(res.data.msg+"600A0075");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0076');
            })
        },
        handleSelectionChange(row){
            this.selectOrder = row
        },
        handleChangeReceive(val){
            let that=this;
            this.receive_options.some(item=>{
                if(item.value===val){
                    that.receive_optionsLable=item.label
                    return true;
                }
            })
        },
        handleChangePay(val){
            let that=this;
            this.payOptions.some(item=>{
                if(item.value===val){
                    that.payOptionsLable=item.label
                    return true;
                }
            })
        },
        handleChangeOrder(val){
            let that=this;
            this.oderType_options.some(item=>{
                if(item.value===val){
                    that.oderType_optionsLable=item.label
                    return true;
                }
            })
        },
        exportDialog(){
            if(this.time){
                if(!this.time[0]){
                    this.$message.error('请选择起止时间！');
                    return false;
                }
                if(!this.time[1]){
                    this.$message.error('请选择截止时间！');
                    return false;
                }
            }else{
                this.$message.error('请选择下单时间！');
                return false;
            }
            this.dialogExport=true;
        },
        handleDialogExport(){
            this.dialogExport=false;
        },
        formatter(row, column){
            return dateFormat(row.create_time,"{y}-{m}-{d}")
        },
        batchExport(){
            let that=this;
            let data={
                start_time: this.time!==null?this.time[0]:"",
                end_time: this.time!==null?this.time[1]:"",
                state:parseInt(this.state),
                keyword:this.seach_input,
                trade_no:this.seach_order,
                receive_way:this.receive_way,
                pay_type:this.form.pay_type,
                order_type:this.order_type,
                good_name:this.form.goodName,
                secret: localStorage.getItem("secretId"),
                nick_name:this.nick_name,
                phone:this.phone
            }
            let url=this.url+'/shopapi/order/export'+'?token='+localStorage.getItem('userId');
            let time = new Date();
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            let name = year + "" + month + "" + day;//文件名称
            let fileName=name+'.xls';
            this.downloadLoading = true;
            batchExport(url,encodeFormData(data)).then((res)=>{
                that.downloadLoading = false
                let blob = new Blob([res.res], {type: res.type});
                if(blob.size>68){
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        window.navigator.msSaveBlob(blob, fileName);
                    } else {
                        let URL = window.URL || window.webkitURL;
                        let objectUrl = URL.createObjectURL(blob);
                        if (fileName) {
                            let a = document.createElement('a');
                            if (typeof a.download === 'undefined') {
                                window.location = objectUrl;
                            } else {
                                a.href = objectUrl;
                                a.download = fileName;
                                document.body.appendChild(a);
                                a.click();
                                a.remove();
                            }
                        } else {
                            window.location = objectUrl
                        }
                    }
                }else{
                    that.$message.error('未查询到相关数据可导出');
                }
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if(columnIndex===4||columnIndex===5||columnIndex===6){
                return {
                    rowspan: this.changeOrderData.data.length,
                    colspan: 1
                };
            }
        },
        priceChange(){
            this.saveLoading = true
            let that = this
            let modify_freight="",modify_price=""
            if(this.modify_type===0){
                modify_freight = this.changeOrderData.freight
            }else{
                modify_freight = this.modify_freight
            }
            let data = {
                secret: localStorage.getItem("secretId"),
                order_id: this.order_id,
                modify_price: this.realPay,
                modify_freight: modify_freight
            }
            setInterval(() => {
                this.saveLoading = false
            }, 5000);
            orderSave(data).then((res)=>{
                that.saveLoading = false
                if(res.data.code===200){
                    that.$message.success("操作成功")
                    that.dialogVisible = false
                    that.getData("-1")
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.saveLoading = false
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        priceChangeShow(id){
            this.modify_price = undefined
            this.modify_freight = undefined
            this.order_id = id
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                order_id: id
            }
            orderChangePrice(data).then((res)=>{
                if(res.data.code===200){
                    that.changeOrderData = res.data.data
                    that.realPay = res.data.data.total_price
                    that.dialogVisible = true
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        handleSizeChange(val) {

        },
        search() {
            this.handleCurrentChange(1);
        },
        handleClick(tab) {
            let arr = tab.name.split('=')
            this.state = arr[1]
            this.getData(arr[1])
        },
        handleCurrentChange(current){
            let that = this
            this.page = current;
            let data={
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                trade_no: this.seach_order!==""?this.seach_order:undefined,
                keyword: this.seach_input!==""?this.seach_input:undefined,
                state: parseInt(this.state),
                page: this.page,
                limit: 10,
                receive_way: this.receive_way,
                order_type: this.order_type,
                nick_name: this.nick_name!==""?this.nick_name:undefined,
                phone: this.phone!==""?this.phone:undefined,
                good_name: this.form.goodName!==""?this.form.goodName:undefined,
                pay_type: this.form.pay_type,
                start_time: this.time!==null?this.time[0]:"",
                end_time: this.time!==null?this.time[1]:""
            }
            this.searchLoading=true;
            orderList(data).then((res)=>{
                that.searchLoading=false;
                if(res.data.code===1){
                    that.pageCount = res.data.total;
                    that.tableData = res.data.data;
                }else{
                     that.$message.error('系统出错，请联系管理员！');
                }
            }).catch((err)=>{
                that.searchLoading=false;
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        toOrder_detail(id){
            this.$router.push({
                path:'/wf/admin/shop/order/order_details',
                query: { 
                    id:id
                }
            })
        },
        getData(state){
            let that = this
             that.$axios.post(this.url +'shopapi/Order/index',{
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                limit:10,
                page:1,
                state:parseInt(state),
                receive_way: this.receive_way,
                order_type: this.order_type
            }).then((res)=>{
                that.pageCount = res.data.total
                that.tableData = res.data.data
            }).catch(function (error) {

            });
        }
    },
    watch: {
        modify_price(val,oldVal){
            this.realPay = val
        },
        modify_freight(val,oldVal){
            this.realPay = (this.changeOrderData.total_price*100 + (val*100-this.changeOrderData.freight*100))/100
        }
    }
}
</script>

<style lang="scss">
#order{
    background-color: #fff;
    padding: 20px;
    .wf-export-dialog{
        .wf-export-title{
            line-height: 40px;
            font-size: 20px;
            background-color: #F8F8F8;
            padding: 10px 0 10px 25px;
            border-radius: 2px;
        }
        .wf-export-body{
            padding-left: 40px;
            margin: 15px 0;
        }
        .el-form-item{
            margin-bottom: 0;
            word-wrap: break-word;
        }
    }
    .el-input{
        width: 240px;
        margin-left: 12px;
        margin-right: 40px;
    }
    .el-button--primary{
        background: #719FF8;
    }
    /deep/ .el-tabs{
        margin-top: 20px;
        .el-tabs__header{
            padding-left: 20px;
            margin: 0;
            background: #F8F8F8;
            border-radius: 4px;
            padding: 0 25px;
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
    .el-pagination{
        background: white;
        text-align: center;
        padding: 20px 0;
    }
    .el-dialog__header{
        border-bottom: 1px solid #F0F0F0;
    }
    .wf-balck-weight{
        color: #333;
        font-weight: 600;
    }
    .wf-red-title{
        font-size: 12px;
        color: #E36F6B;
    }
    .wf-margin-left{
        margin-left: 20px;
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
    .el-radio+.el-radio{
        margin: 0;
    }
    /deep/ .wf-order-change-table{
        thead{
            th{
                background: #F8F8F8;
            }
        }
        .el-input-number{
            width: 140px;
            .el-input{
                width: 100%;
            }
        }
    }
    .el-pagination__jump{
        .el-input{
            width: 46px;
        }
    }
    .wf-margin-top{
        margin-top: 20px;
    }
    /deep/ .el-dialog{
        .el-dialog__footer{
            padding: 0 20px 20px;
        }
        .el-dialog__body{
            padding: 30px 20px 0;
        }
    }
    .wf-margin-top-ten{
        margin-top: 10px;
    }
    .change-price-margin{
        margin-left: 24px;
    }
    .change-price-input-margin{
        margin-left: 12px;
    }
    /deep/ .wf-ship-dialog{
        .el-dialog__body{
            padding: 0 20px 0;
        }
        .el-tabs{
            width: 100%;
            box-sizing: border-box;
        }
        .el-input{
            margin: 0;
        }
    }
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
    .wf-gray-title{
        color: #999;
    }
    .el-select{
        display: inline;
    }
}
</style>
