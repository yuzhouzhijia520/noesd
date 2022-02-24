<template>
    <div class="wf-order">
        <el-form label-width="100px" label-position="right">
            <el-form-item label="订单编号">
                <el-input v-model="seach_order" @keyup.enter.native="getList(1,1)" class="wf-head-input" size="mini"></el-input>
                <span class="wf-head-span">收货人姓名/手机号</span>
                <el-input v-model="seach_input" @keyup.enter.native="getList(1,1)" class="wf-head-input" size="mini"></el-input>
                <span class="wf-head-span">下单时间</span>
                <el-date-picker
                v-model="time"
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
            <el-form-item label="商品名称">
                <el-input v-model="goodName" class="wf-head-input" size="mini" @keyup.enter.native="getList(1,1)"></el-input>
                <span class="wf-head-span">下单人昵称</span>
                <el-input v-model="nick_name" @keyup.enter.native="getList(1,1)" class="wf-head-input" size="mini"></el-input>
                <span class="wf-head-span">下单人手机号</span>
                <el-input v-model="phone" @keyup.enter.native="getList(1,1)" class="wf-head-input" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="领取方式">
                <el-select v-model="receive_way" class="wf-head-input" size="mini">
                    <el-option
                    v-for="item in receive_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span class="wf-head-span">付款方式</span>
                <el-select v-model="pay_type" class="wf-head-input" size="mini">
                    <el-option
                    v-for="item in payOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span class="wf-head-span">订单类型</span>
                <el-select v-model="order_type" class="wf-head-input" size="mini">
                    <el-option
                    v-for="item in oderType_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="batchShip" size="mini" icon="el-icon-document">电子面单发货</el-button>
                <el-button @click="exportDialog" size="mini" icon="el-icon-download">批量导出</el-button>
                <el-button @click="getList(1,1)" :loading="searchLoading" icon="el-icon-search" size="mini" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in status_list"
            :key="index"
            :label="item.label"
            :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <el-badge :style="retreat_count>0&&activeName!=='5'?'opacity:1':'opacity:0'" class="wf-badge-one" :value="retreat_count" :max="99"></el-badge>
        <el-badge :style="wait_count>0&&activeName!=='1'?'opacity:1':'opacity:0'" class="wf-badge-two" :value="wait_count" :max="99"></el-badge>
        <my-table
        class="wf-table-header"
        :tableData='tableData'
        :columns='columns'
        :pagination="false"></my-table>
        <div class="wf-surface-box" v-for="(item,index) in tableHeader" :key="index">
            <div class="wf-table-header-box">
                <el-checkbox v-model="item.checkbox" @change="checkChange" style="margin:0 20px;"></el-checkbox>
                <el-tag size="mini">{{item.order_type}}</el-tag>
                <span>订单编号  {{item.trade_no}}</span>
                <span>下单时间 {{item.create_time}}</span>
                <el-button type="text" @click="sellerShow(item)">备注</el-button>
                <el-button type="text" @click="to_detail(item.id)">查看详情</el-button>
                <div class="clear"></div>
            </div>
            <my-table
            :tableData="item.detail"
            :pagination="false"
            :showHeader="false"
            :columns="columnsChildren"
            :border="true"
            :spanMethodFlag="true"
            :rowspan="item.detail.length"></my-table>
            <div v-if="item.remarks!=='无'" class="reply-box">买家备注：{{item.remarks}}</div>
            <div v-if="item.seller_remark!==''" class="reply-box">卖家备注：{{item.seller_remark}}</div>
        </div>
        <el-pagination
        @current-change="getList"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalPage">
        </el-pagination>
        <!-- 普通发货弹框 -->
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
        <!-- 电子面单发货弹框 -->
        <el-dialog title="电子面单发货" 
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
        <!-- 改价弹框 -->
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
                                <el-form-item label="订单类型:">{{oderType_options[order_type+1].label}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="商品名称:">{{goodName}}</el-form-item>
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
                                <el-form-item label="领取方式:">{{receive_options[receive_way].label}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="付款方式:">{{payOptions[pay_type+1].label}}</el-form-item>
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
        <el-dialog title="卖家备注" 
        :visible.sync="sellerDialog" 
        width="600px">
            <el-form label-position="right">
                <el-form-item>
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="seller_note" placeholder="最多可输入300字" :maxlength="300"></el-input>
                </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="sellerDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="sellerNote" :loading="sellerLoading">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {orderList, orderChangePrice, orderSave ,batchExport, upstate, wxExpress, expressAddress, batchShipWaybill, getCourier, orderSellerRemark } from "@/server/order.js"
import { shopAddressGetData } from "@/server/shopAddress.js"
import {excelDownload,encodeFormData,dateFormat} from '@/untils/common.js';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: "order",
    data() {
        return {
            retreat_count: 0,
            wait_count: 0,
            allCheck: false, // 全选
            seller_note: "", // 卖家备注值
            sellerDialog: false, // 卖家备注弹框
            sellerLoading: false, // 卖家备注按钮加载
            downloadLoading: false,
            dialogExport: false,
            order_id: -1,
            dialogVisible: false,
            changeOrderData: [], // 改价信息
            modify_price: undefined, // 订单总价(含运费)
            modify_freight: undefined, // 运费
            modify_type: 0, // 修改价格类型
            realPay: "", // 实付金额
            saveLoading: false,
            // 改价弹框
            batchShipDialog: false,
            courierType: "", // 快递类型
            courierTypeOption: [],
            selectPrompt: "请选择快递公司",
            address_options: [],
            return_address_id: "",
            // 电子面单发货弹框
            ship_type: [
                { name: '0', label: '快递物流' },{ name: '2', label: '同城配送' },{ name: '3', label: '虚拟商品' }
            ],
            shipDialog: false,
            activeShip: '0',
            courier: "",
            courierOption: [],
            express_num:'',
            express_remarks:'可复制快递单号到官网查询',
            express_remarkss:'本单由商家自主配送，预计3个自然日内配送，请耐心等待。',
            express_remarksss: "亲，感谢下单，本单为非实物商品，无法查看物流哦。",
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            courier_image: "",
            shipLoading: false,
            // 普通发货弹框
            activeName: '1',
            status_list: [
                { label: '全部', name: '-1' },{ label: '待付款', name: '0' },{ label: '待发货', name: '1' },
                { label: '待收货', name: '2' },{ label: '已完成',  name: '3' },{ label: '已取消', name: '4' },
                { label: '申请退款', name: '5' },{ label: '已退款', name: '6' }
            ],
            searchLoading: false, // 搜索按钮
            seach_order: '',
            time: '',
            seach_input: "",
            goodName: "",
            nick_name: "",
            phone: "",
            receive_way: 2,
            receive_options: [
                { value: 2, label: "全部" },{ value: 0, label: "物流配送" },{ value: 1, label: "到店自提" }
            ],
            pay_type: -1,
            payOptions:[
                { value: -1, label: "全部" },{ value: 0, label: "余额支付" },{ value: 1, label: "微信支付"},
                { value: 2, label: "货到付款" }
            ],
            order_type: -1,
            oderType_options: [
                { value: -1, label: "全部" },{ value: 0, label: "普通" },{ value: 1, label: "团购" },
                { value: 2, label: "秒杀" },{ value: 3, label: "分销" },{ value: 4, label: "砍价" },
                { value: 5, label: "积分兑换" },{ value: 6, label: "全款预售" },{ value: 7, label: "定金预售" },
            ],
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
                    }
                ]
            },
            pageSize: 5,
            currentPage: 1,
            totalPage: 0,
            tableData: [],
            tableHeader: [],
            columns: [
                {   
                    width: "52",
                    renderHeader:(h, param) => {
                        return h('el-checkbox',{
                            props: {
                                value: this.allCheck
                            },
                            on: {
                                change: () => {
                                    this.allCheck = !this.allCheck
                                    this.tableHeader.map((item)=>{
                                        return item.checkbox = this.allCheck
                                    })
                                }
                            }
                        })
                    }
                },
                {   
                    label: "商品 / 规格",
                    align: "left",
                    width: "548",
                },
                {   
                    label: "单价（元）/ 数量",
                    align: "center"
                },
                {   
                    label: "收货人",
                    align: "center",
                },
                {   
                    width: "90",
                    label: "配送方式",
                    align: "center"
                },
                {   
                    label: "订单状态",
                    width: "90",
                    align: "center"
                },
                {   
                    label: "实付金额（元）",
                    align: "center",
                    width: "200"
                },
                {   
                    label: "操作",
                    width: "100",
                    align: "center",
                    fixed:"right"
                }
            ],
            columnsChildren: [
                {   
                    align: "left",
                    width: "600",
                    fixed: "left",
                    render: (h, param)=> {
                        let a = [
                            h("img",{
                                attrs: {
                                    src: param.row.good_image,
                                    preview: 1,
                                    style: "width:60px;height:60px;float:left;vertical-align:middle;margin-right:20px;"
                                }
                            }),
                            h("div",{
                                attrs: {
                                    style: "float:left;margin-right:10px;"
                                }
                            },[
                                h("span",{
                                    attrs: {
                                        style: "padding:0;width:350px;display:inline-block;text-overflow:ellipsis;color:#719FF8;cursor:pointer;"
                                    },
                                    on: {
                                        click: () => {
                                            this.to_detail(param.row.id)
                                        }
                                    }
                                },param.row.good_name),
                                h("p",param.row.good_spec)
                            ]),
                            h("div",{
                                attrs: {
                                    style: "float:right;margin-right:20px;"
                                }
                            },[
                                h("span",{
                                    attrs: {
                                        style: "color:#E36F6B;margin-right:10px;"
                                    }
                                },param.row.good_price),
                                h("span",{
                                    attrs: {
                                        style: "font-size:12px;"
                                    }
                                }," x"),
                                h("span",param.row.good_num)
                            ])
                        ]
                        return [
                            h('div',{
                                attrs: {
                                    style: "padding:10px;"
                                }
                            },a)
                        ]
                    }
                },
                {   
                    align: "left",
                    render: (h, param)=> {
                        let a = [
                            h('p',
                                [
                                    h('span',{
                                        attrs: {
                                            style: "margin-right:50px;"
                                        }
                                    },param.row.collection_name),
                                    h("span",param.row.collection_phone)
                                ]
                            ),
                            h('p',{
                                attrs: {
                                    style: "text-overflow:ellipsis;"
                                }
                            },param.row.collection_address)
                        ]
                        return [h('div',{
                            attrs: {
                                style: "padding:0 20px;;margin:0 auto;text-align:center;"
                            }
                        },a)]
                    }
                },
                {   
                    align: "center",
                    width: "90",
                    render: (h, param)=> {
                        return [
                            h('span', 
                                param.row.receive_way===0?"物流配送":
                                param.row.receive_way===1?"上门取货":
                                param.row.receive_way===2?"同城配送":
                                param.row.receive_way===3?"虚拟商品":""
                            )
                        ]
                    }
                },
                {   
                    align: "center",
                    width: "90",
                    render: (h, param)=> {
                        return [
                            h('span', param.row.state)
                        ]
                    }
                },
                {   
                    align: "center",
                    width: "200",
                    render: (h, param)=> {
                        let a = h('p', param.row.total_price)
                        let b = h("p",{
                            attrs: {
                                style: "color:#999;font-size:12px;"
                            }
                        },param.row.freight!=='0.00'?"(含运费"+param.row.freight+")":"")
                        let c = h("el-button",{
                            props: {
                                type: "text"
                            },
                            on: {
                                click: () => {
                                    this.priceChangeShow(param.row.id)
                                }
                            }
                        },"修改价格")
                        return [
                            h("div",{
                                attrs: {
                                    style: ""
                                }
                            },[a,b,param.row.state==="待付款"?c:""])
                        ]
                    }
                },
                {
                    align: "center",
                    width: "100",
                    fixed:"right",
                    render: (h, param)=> {
                        let b = h('el-button', {
                            props: {
                                type: "text"
                            },
                            on: {
                                click: () => {
                                    this.shipShow(param.row)
                                }
                            }
                        }, "发货")
                        return [
                            param.row.state==='待发货'?b:""
                        ]
                    }
                }
            ]
        }
    },
    components: {
        MyTable
    },
    mounted() {
        this.getList(1)
    },
    methods: {
        getList(currentPage,type){
            this.currentPage = currentPage
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                page: this.currentPage,
                limit: this.pageSize,
                state: parseInt(this.activeName),
                receive_way: this.receive_way,
                order_type: this.order_type,
                trade_no: this.seach_order!==""?this.seach_order:undefined,
                keyword: this.seach_input!==""?this.seach_input:undefined,
                nick_name: this.nick_name!==""?this.nick_name:undefined,
                phone: this.phone!==""?this.phone:undefined,
                good_name: this.goodName!==""?this.goodName:undefined,
                pay_type: this.pay_type,
                start_time: this.time!==null?this.time[0]:"",
                end_time: this.time!==null?this.time[1]:""
            }
            if(type===1){
                this.searchLoading = true
            }
            orderList(data).then((res)=>{
                that.searchLoading = false
                if(res.data.code===1){
                    that.tableHeader = res.data.data.map((item)=>{
                        item.create_time = dateFormat(item.create_time)
                        item.checkbox = false
                        item.detail.map((el)=>{
                            el.collection_name = item.collection_name
                            el.collection_phone = item.collection_phone
                            el.collection_address = item.collection_address
                            el.receive_way = item.receive_way
                            el.state = item.state
                            el.total_price = item.total_price
                            el.freight = item.freight
                            el.id = item.id
                        })
                        return item
                    })
                    that.totalPage = res.data.total
                    that.retreat_count = res.data.retreat_count
                    that.wait_count = res.data.wait_count
                }else{
                     that.$message.error(res.data.msg+"600A00195");
                }
            }).catch((err)=>{
                that.searchLoading = false
                that.$message.error('网络错误600B00196');
            })
        },
        to_detail(id){
            this.$router.push({path:'/wf/admin/shop/order/order_details',query:{id:id}})
        },
        multipleSelection(row){
            
        },
        checkChange(val){
            
        },
        handleClick(tab){
            this.getList(1)
        },
        orderOften(){
            window.open(this.$router.resolve({path:'/wf/admin/shop/freight_management',query:{activeName:'third'}}).href);
        },
        shipShow(row){ // 显示普通发货弹框
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
                    that.order_id = row.id
                    that.activeShip = '0'
                }else{
                    that.$message.error(res.data.msg+"600A0075");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0076');
            })
        },
        beforeUpload(file){ // 上传限制
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
        handleSuccess(response, file, fileList){ // 图片回显
            this.courier_image = response.data.src
        },
        shipSave(){ // 普通发货保存
            let that = this
            let data = {
                id: this.order_id,
                secret: localStorage.getItem('secretId'),
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
                    that.getList(that.currentPage)
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
        shipJump(){
            window.open(this.$router.resolve({path:'/wf/admin/shop/waybillManagement',query:{type:2}}).href);
        },
        batchShip(){
            let that = this
            getAuditApplicationList(24).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===false){
                        that.showVersion = true
                    }else{
                        let order_id = that.tableHeader.filter((item)=>{
                            if(item.checkbox === true){
                                return item
                            }
                        })
                        let order_state = order_id.every((item)=>{
                            return item.state==='待发货'
                        })
                        if(order_id.length===0){
                            that.$message.warning("请选择发货订单")
                            return
                        }else if(order_state===false){
                            that.$message.warning("勾选的订单中有非待发货状态的订单，请选择待发货状态的订单发货")
                            return
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
        batchShipSave(){
            let that = this
            if(this.courier===""){
                this.$message.warning("请选择快递公司")
            }else if(this.courierType===""){
                this.$message.warning("请选择快递类型")
            }else if(this.return_address_id===""){
                this.$message.warning("请选择发货信息")
            }else{
                let order_id = this.tableHeader.map((item,index)=>{
                    if(item.checkbox === true){
                        return item.id
                    }
                })
                for(let i=order_id.length-1;i>=0;i--){
                    if(order_id[i]===undefined){
                        order_id.splice(i,1)
                    }
                }
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
                        that.getList(that.currentPage)
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
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex===4||columnIndex===5||columnIndex===6) {
                if (rowIndex === 0) {
                    return {
                        rowspan: this.changeOrderData.data.length,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
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
        priceChange(){
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
            this.saveLoading = true
            orderSave(data).then((res)=>{
                that.saveLoading = false
                if(res.data.code===200){
                    that.$message.success("操作成功")
                    that.dialogVisible = false
                    that.getList(that.currentPage)
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.saveLoading = false
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        exportDialog(){
            if(this.time){
                if(!this.time[0]){
                    this.$message.warning('请选择起止时间！');
                    return false;
                }
                if(!this.time[1]){
                    this.$message.warning('请选择截止时间！');
                    return false;
                }
            }else{
                this.$message.warning('请选择下单时间！');
                return false;
            }
            this.dialogExport = true;
        },
        batchExport(){
            let that=this;
            let data={
                start_time: this.time!==null?this.time[0]:"",
                end_time: this.time!==null?this.time[1]:"",
                state:parseInt(this.activeName),
                keyword:this.seach_input,
                trade_no:this.seach_order,
                receive_way:this.receive_way,
                pay_type:this.pay_type,
                order_type:this.order_type,
                good_name:this.goodName,
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
        sellerShow(item){
            this.sellerDialog = true
            this.order_id = item.id
            this.seller_note = ""
        },
        sellerNote(id){
            if(this.seller_note===""){
                this.$message.warning("请填写卖家备注")
            }else{
                let that = this
                let data = {
                    token: localStorage.getItem("userId"),
                    pro_id: parseInt(localStorage.getItem("proId")),
                    order_id: this.order_id,
                    seller_remark: this.seller_note
                }
                this.sellerLoading = false
                orderSellerRemark(data).then((res)=>{
                    that.sellerLoading = false
                    if(res.data.code===200){
                        that.$message.success("备注成功")
                        that.getList(that.currentPage)
                        that.sellerDialog = false
                    }else{
                        that.$message.error(res.data.msg+"600A00203");
                    }
                }).catch((err)=>{
                    that.sellerLoading = false
                    that.$message.error('网络错误600B00204');
                })
            }
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

<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/order/order.scss';
</style>