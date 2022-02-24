<template>
    <div id="order_details">
        <el-row style="margin-bottom:20px;">
            <el-col :span="5">订单编号：{{order_detail.trade_no?order_detail.trade_no:'无'}}</el-col>
            <el-col :span="12" :offset="1">微信订单号： {{order_detail.transaction_id?order_detail.transaction_id:'无'}}</el-col>
        </el-row>

        <el-row class="jianju">
            <el-col :span="5">创建时间：{{order_detail.create_time}}</el-col>
        </el-row>

        <el-row class="jianju">
            <el-col :span="5">付款时间：{{order_detail.pay_time == 0?'无':order_detail.pay_time}}</el-col>
            <el-col :span="5" :offset="1">支付状态： {{order_detail.state}}</el-col>

        </el-row>

        <el-row class="jianju">
            <el-col :span="5">付款方式：{{order_detail.pay_type}}</el-col>
        </el-row>

        <el-row class="jianju">
            <el-col :span="5">订单总价：￥{{order_detail.total_price}}</el-col>
            <el-col :span="5" :offset="1">优惠价格：￥{{order_detail.coupon_price?order_detail.coupon_price:'无'}}</el-col>
        </el-row>
        <el-row class="jianju">
            <el-col :span="5" >运费： {{order_detail.freight? order_detail.freight:'无'}}</el-col>
            <el-col :span="15" :offset="1">买家留言：{{order_detail.remarks?order_detail.remarks:'无'}}</el-col>
        </el-row>
        <div class="wf-gray-line"></div>
        <!-- 判断是否隐藏快递公司和快递单号 -->
        <el-row v-if="order_detail.receive_way!=1">
            <el-row class="jianju" v-if="order_detail.express_name!=''">
                <el-col :span="5">快递公司：{{order_detail.express_name?order_detail.express_name:'无'}}</el-col>
            </el-row>

            <el-row class="jianju" v-if="order_detail.courier_number!=null">
                <el-col :span="5">快递单号：{{order_detail.courier_number?order_detail.courier_number:'无'}}</el-col>
            </el-row>
            <el-row class="jianju" v-if="order_detail.courier_image!='0'">
                <el-col :span="5">
                    快递照片：
                    <img v-if="order_detail.courier_image!='0'" :preview="1" style="vertical-align:middle;max-width:80px;max-height:80px;" :src="order_detail.courier_image" alt="">
                    <span v-else>无</span>
                </el-col>
            </el-row>
        </el-row>

        <div class="wf-gray-line" v-if="order_detail.express_name!=''&&order_detail.courier_number!=null&&order_detail.courier_image!='0'"></div>

        <template v-if="order_detail.identity_positive!=''||order_detail.identity_number!=''">
            <el-row class="jianju">
                <el-col :span="5">姓名：{{order_detail.identity_name}}</el-col>
                <el-col :span="5" :offset="1">身份证号： {{order_detail.identity_number}}</el-col>
            </el-row>
            <el-row class="jianju">
                <el-col :span="5">身份证正面：<img preview="0" style="width:80px;height:80px;vertical-align:middle;" :src="order_detail.identity_positive" alt=""></el-col>
                <el-col :span="5" :offset="1">身份证反面： <img preview="1" style="width:80px;height:80px;vertical-align:middle;" :src="order_detail.identity_opposite" alt=""></el-col>
            </el-row>

            <div class="wf-gray-line"></div>
        </template>

        <el-row class="jianju">
            <el-col :span="5">{{order_detail.receive_way===1?"提货人":"收件人"}}：{{order_detail.collection_name}}</el-col>
            <el-col :span="5" :offset="1">{{order_detail.receive_way===1?"提货人手机":"收件人手机"}}： {{order_detail.collection_phone}}</el-col>
        </el-row>

        <el-row class="jianju">
            <el-col :span="12">{{order_detail.receive_way===1?"提货地址":"收件地址"}}：{{order_detail.collection_address}}</el-col>
        </el-row>

        <el-row class="jianju">
            <el-col :span="5">
                下单用户昵称:{{order_detail.nickName}}
            </el-col>
            <el-col :span="5" :offset="1">
                下单用户手机号:{{order_detail.phone}}
            </el-col>
        </el-row>
        <el-row class="jianju">
            领取方式：{{order_detail.receive_way===1?"到店自提":"物流配送"}}
        </el-row>
        <el-row v-if="order_detail.order_type===5" class="jianju">
            兑换积分：{{order_detail.integral===0?"无":order_detail.integral+"积分"}}
        </el-row>
         <el-row class="jianju" v-if="order_detail.refunds!=null">
            退款原因：{{order_detail.refunds?order_detail.refunds:'无'}}
        </el-row>
         <el-row class="jianju" v-if="order_detail.refund_image!=null">
            退款图片：
            <img :preview="order_detail.id+''" style="width:64px;height:64px;vertical-align:middle" :src="order_detail.refund_image?order_detail.refund_image:''" alt="" >
        </el-row>

        <div class="jianju">
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    label="商品图片"
                    width="180">
                    <template slot-scope="scope">
                        <img  style="width:64px;height:64px;"   :src="scope.row.good_image" alt="" >
                    </template>
                </el-table-column>
                <el-table-column
                    prop="good_name"
                    label="名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="good_spec"
                    label="规格"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="good_price"
                    label="价格"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="good_num"
                    label="数量"
                    width="180">
                </el-table-column>
            </el-table>
        </div>
        <div class="jianju">
            <!-- 判断是否隐藏发货按钮 团购订单-->
            <span v-if="order_detail.state === '待发货' &&  order_detail.order_type === 1 && order_detail.status ==='拼团成功'&&order_detail.receive_way===0">
                
                <el-button type="primary" @click="order_fa" size="mini">发货</el-button>
                
                <el-dialog
                title="发货"
                :visible.sync="fahuo"
                width="40%">
                <el-row justify="space-between" type="flex">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane v-for="(item,index) in status_list"
                        :key="index"
                        :label="item.label"
                        :name="item.name">
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
                    <el-row v-if="activeName == 'one'" style="margin-top:30px;">
                        <el-col :span="4" :offset="2" style="line-height: 40px;">快递公司</el-col>
                        <el-col :span="7">
                            <el-select v-model="value" placeholder="请选择" size="mini">
                                <el-option
                                v-for="item in kuaidi"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="text" @click="orderOften" size="mini">常用快递管理</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="jianju" v-if="activeName == 'one'">
                        <el-col :span="4" :offset="2" style="line-height: 40px;">快递单号</el-col>
                        <el-col :span="10">
                            <el-input v-model="express_num" size="mini"></el-input>
                        </el-col>
                        
                    </el-row>
                    <el-row v-if="activeName == 'one'">
                        <el-col :span="4" :offset="2" style="line-height:40px;">备注</el-col>
                        <el-col :span="10">
                            <el-input v-model="express_remarks" size="mini" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row v-if="activeName == 'two'" style="margin-top:30px;">
                        <el-col :span="2" :offset="2" style="line-height:40px;">备注</el-col>
                        <el-col :span="10">
                            <el-input v-model="express_remarkss" size="mini" placeholder="本单由商家自主配送，请耐心等待。"  type="textarea"></el-input>
                        </el-col>
                    </el-row>
                    <el-row v-if="activeName == 'three'" style="margin-top:30px;">
                        <el-col :span="2" :offset="2" style="line-height:40px;">备注</el-col>
                        <el-col :span="10">
                            <el-input v-model="express_remarkss" size="mini" placeholder="亲，感谢下单，本单为非实物商品，无法查看物流哦。"  type="textarea"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="jianju" v-if="activeName == 'one'">
                        <el-col :span="4" :offset="2" style="line-height: 40px;">快递单拍照</el-col>
                        <el-col :span="10">
                            <el-upload
                            class="avatar-uploader"
                            :action="upfileUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess"
                            :before-upload="beforeUpload">
                                <img v-if="courier_image" :src="courier_image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="fahuo = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="order_fa_f" size="mini">确 定</el-button>
                    </span>
                </el-dialog>
            </span>
            <!-- 判断是否隐藏发货按钮 普通订单-->
             <span v-if="order_detail.state === '待发货' &&  (order_detail.order_type === 0 || order_detail.order_type === 2 || order_detail.order_type === 3|| order_detail.order_type === 4|| order_detail.order_type === 5)&&order_detail.receive_way===0">
                <el-button @click="order_back" size="mini">返回</el-button>
                <el-button v-if="order_detail.receive_way===0&&order_detail.pay_type==='货到付款'" type="primary" @click="toPayFa" size="mini">发货</el-button>
                
                <el-button v-else type="primary" @click="order_fa" size="mini">发货</el-button>
                
                <el-dialog
                title="发货"
                :visible.sync="fahuo"
                width="35%">
                <el-row justify="space-between" type="flex">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane v-for="(item,index) in status_list"
                        :key="index"
                        :label="item.label"
                        :name="item.name">
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
                    <el-row v-if="activeName == 'one'" style="margin-top:30px;">
                        <el-col :span="4" :offset="2" style="line-height: 40px;">快递公司</el-col>
                        <el-col :span="7">
                            <el-select v-model="value" placeholder="请选择" size="mini">
                                <el-option
                                v-for="item in kuaidi"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="text" @click="orderOften" size="mini">常用快递管理</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="jianju" v-if="activeName == 'one'">
                        <el-col :span="4" :offset="2" style="line-height: 40px;">快递单号</el-col>
                        <el-col :span="10">
                            <el-input v-model="express_num" size="mini"></el-input>
                        </el-col>
                        
                    </el-row>
                    <el-row v-if="activeName == 'one'">
                        <el-col :span="4" :offset="2" style="line-height:40px;">备注</el-col>
                        <el-col :span="10">
                            <el-input v-model="express_remarks" size="mini" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row v-if="activeName == 'two'" style="margin-top:30px;">
                        <el-col :span="2" :offset="2" style="line-height:40px;">备注</el-col>
                        <el-col :span="10">
                            <el-input v-model="express_remarkss" size="mini" placeholder="本单由商家自主配送，请耐心等待。"  type="textarea"></el-input>
                        </el-col>
                    </el-row>
                    <el-row v-if="activeName == 'three'" style="margin-top:30px;">
                        <el-col :span="2" :offset="2" style="line-height:40px;">备注</el-col>
                        <el-col :span="10">
                            <el-input v-model="express_remarkss" size="mini" placeholder="亲，感谢下单，本单为非实物商品，无法查看物流哦。"  type="textarea"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="jianju" v-if="activeName == 'one'">
                        <el-col :span="4" :offset="2" style="line-height: 40px;">快递单拍照</el-col>
                        <el-col :span="10">
                            <el-upload
                            class="avatar-uploader"
                            :action="upfileUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess"
                            :before-upload="beforeUpload">
                                <img v-if="courier_image" :src="courier_image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="fahuo = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="order_fa_f" size="mini">确 定</el-button>
                    </span>
                </el-dialog>
            </span>
            <span v-if="order_detail.state === '待发货' &&  (order_detail.order_type === 0 || order_detail.order_type === 2 || order_detail.order_type === 3||order_detail.order_type === 4|| order_detail.order_type === 5)&&order_detail.receive_way===1">
                <el-button type="primary" @click="order_fa" size="mini">发货</el-button>
                <el-dialog
                title="发货"
                :visible.sync="fahuo"
                width="30%">
                    <span>{{order_detail.pay_type==="货到付款"?"此为"+order_detail.total_price+"元货到付款订单，请确保线下已收款？":"是否确定发货?"}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="fahuo = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="order_fa_f_self" size="mini">确 定</el-button>
                    </span>
                </el-dialog>
            </span>
            <!-- 判断是否隐藏发货按钮 团购订单-->
            <span v-if="order_detail.state === '待发货' &&  order_detail.order_type === 1 && order_detail.status ==='拼团成功'&&order_detail.receive_way===1">
                <el-button type="primary" @click="order_fa" size="mini">发货</el-button>
                <el-dialog
                title="发货"
                :visible.sync="fahuo"
                width="30%">
                    <span>{{order_detail.pay_type==="货到付款"?"此为"+order_detail.total_price+"元货到付款订单，请确保线下已收款？":"是否确定发货?"}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="fahuo = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="order_fa_f_self" size="mini">确 定</el-button>
                    </span>
                </el-dialog>
            </span>
            <!-- 判断是否隐藏订单改价按钮 -->
            <el-button v-if="order_detail.state === '待付款'" size="mini" @click="priceChangeShow">改价</el-button>
            <!-- 判断是否隐藏订单退款按钮 -->
            <el-button v-if="order_detail.state === '申请退款'" type="danger" style="margin-left: 20px;" @click="open" size="mini">订单退款</el-button>
            <!-- 判断是否隐藏订单退款按钮 -->
            <el-button v-if="order_detail.state === '申请退款'" type="danger" size="mini" @click="noRefundDialog=true">拒绝退款</el-button>
            <el-button v-if="order_detail.state === '申请退款'" type="primary" size="mini" @click="agreeRefundShow">同意退款</el-button>
            <el-dialog
            title="拒绝理由"
            :visible.sync="noRefundDialog"
            width="30%">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="refuse_refund_reason" placeholder="最多可输入200字" :maxlength="200"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="noRefundDialog = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="noRefund" size="mini">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
            top="30vh"
            title="同意退款"
            :visible.sync="agreeRefundDialog"
            width="30%"
            :close-on-click-modal="false">
                <el-form v-if="address_options.length>0" label-position="right" label-width="100px">
                    <el-form-item label="退货地址">
                        <el-select v-model="return_address_id" placeholder="请选择" size="mini">
                            <el-option
                            v-for="item in address_options"
                            :key="item.id"
                            :label="item.address"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <p v-else>添加退货地址后，才可以同意退款</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="agreeRefundDialog = false" size="mini">取 消</el-button>
                    <el-button v-if="address_options.length>0" type="primary" @click="agreeRefund" size="mini">确 定</el-button>
                    <el-button v-else type="primary" @click="addAddress" size="mini">马上添加</el-button>
                </span>
            </el-dialog>
            <el-dialog
            v-if="order_detail.state === '待付款'"
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
                            <p class="change-price-margin" v-else>运费： ￥{{changeOrderData.freight}} <el-button type="text" @click="modify_freight=0" size="mini">直接免运费</el-button></p>
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
                    <el-button size="mini" type="primary" @click="priceChange">确 定</el-button>
                </span>
            </el-dialog>
            <p class="wf-margin-top" v-if="order_detail.state === '待付款'">操作记录：</p>
            <my-table v-if="order_detail.state === '待付款'" class="wf-margin-top wf-record-data" :tableData='recordData' :columns='columns' :pagination='false'></my-table>
        </div>
    </div>
</template>

<script>
import { orderChangePrice, orderSave, orderGetRecording, upstate, agreeRefund } from "@/server/order.js"
import { shopAddressGetData } from "@/server/shopAddress.js"
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: 'shop_order_details',
    data() {
        return {
            return_address_id: "",
            address_options: [],
            agreeRefundDialog: false,
            refuse_refund_reason: "",
            noRefundDialog: false,
             activeName: 'one',
             status_list: [
                {
                    id:0,
                    label: '快递物流',
                    name: 'one',
                },
                {
                    id: 1,
                    label: '同城配送',
                    name: 'two',
                },
                {
                    id: 2,
                    label: '虚拟商品',
                    name: 'three',
                }
            ],
            recordData: [], // 操作记录
            columns: [
                {
                    label: "时间",
                    align: "center",
                    prop: "create_time"
                },
                {
                    label: "操作类型",
                    align: "center",
                    prop: "record_type"
                },
                {
                    label: "操作内容",
                    align: "center",
                    prop: "record_content"
                },
                {
                    label: "操作者",
                    align: "center",
                    prop: "user"
                }
            ],
            realPay: "", // 实付金额
            modify_price: undefined, // 订单总价(含运费)
            modify_freight: undefined, // 运费
            modify_type: 0, // 修改价格类型
            changeOrderData: [], // 改价信息
            dialogVisible: false, // 改价弹框
            express_remarks:'可复制快递单号到官网查询',
            fahuo: false,
            kuaidi: [],
            tableData: [],
            order_detail:'',
            value:'',
            express_num:'',
            remarks:'',
            order_detail_id:'',
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            courier_image: "",
            express_remarkss:'本单由商家自主配送，预计3个自然日内配送，请耐心等待。'
            
        }
    },
    components: {
        MyTable
    },
    created(){
        let order_detail_id = this.$route.query.id
        this.all_kd()
        this.$axios.post(this.url + 'shopapi/Order/details',{
            token:localStorage.getItem('userId'),
            secret:localStorage.getItem('secretId'),
            id:order_detail_id
        }).then((res)=>{
            this.order_detail= res.data.data
            this.tableData = res.data.data.Orderdetail
        }).catch((res)=>{
        })
    },
    mounted(){
        this.getRecord()
    },
    methods: {
        addAddress(){
            this.$router.push({path:"/wf/admin/shop/shopAddress/editShopAddress",query:{type:1}})
        },
        noRefund(){
            if(this.refuse_refund_reason===""){
                return this.$message.warning("请填写拒绝理由")
            }
            let that = this
            let data = {
                pro_id: localStorage.getItem('proId'),
                order_id: this.$route.query.id,
                state: 0,
                refuse_refund_reason: this.refuse_refund_reason,
                token: localStorage.getItem("userId")
            }
            agreeRefund(data).then((res)=>{
                if(res.data.code===200){
                    that.$message.success("拒绝成功")
                    that.$router.push({path:"/wf/admin/shop/order"})
                }else{
                    that.$message.error(res.data.msg+"600A0037");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0038');
            })
        },
        agreeRefundShow(){
            let that = this
            let data = {
                pro_id: localStorage.getItem('proId'),
                page: 1
            }
            shopAddressGetData(data).then((res)=>{
                if(res.data.code===200){
                    that.address_options = res.data.data.data
                    that.agreeRefundDialog = true
                }else{
                    that.$message.error(res.data.msg+"600A0032");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0033');
            })
        },
        agreeRefund(){
            if(this.return_address_id===""){
                return this.$message.warning("请选择退货地址")
            }
            let that = this
            let data = {
                pro_id: localStorage.getItem('proId'),
                order_id: this.$route.query.id,
                state: 1,
                return_address_id: this.return_address_id,
                token: localStorage.getItem("userId")
            }
            agreeRefund(data).then((res)=>{
                if(res.data.code===200){
                    that.$message.success("已同意退款")
                    that.$router.push({path:"/wf/admin/shop/order"})
                }else{
                    that.$message.error(res.data.msg+"600A0037");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0038');
            })
        },
        open() {
            let that = this
            this.$confirm('确认退款, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                that.$axios.post(this.url + 'shopapi/Order/update',{
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.order_detail.id,
                    state:6
                }).then((res)=>{
                    if(res.data.code ==1) {
                        that.$message.success("退款成功");
                    }else{
                        that.$message.info("退款失败");
                    }
                })
            }).catch((error) => {
                that.$message.error("网络错误")
            });
        },
        handleClick(){//切换delog里面的东西
            let that  = this
        },
        orderOften(){
            //暂时没完成，等待链接
            this.$router.push({path:'/wf/admin/shop/freight_management',query:{activeName:'third'}})

        },
        getRecord(){
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                order_id: this.$route.query.id,
                type: 0
            }
            orderGetRecording(data).then((res)=>{
                if(res.data.code===200){
                    that.recordData = res.data.data.data
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
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
            let that = this
            let modify_freight="",modify_price=""
            if(this.modify_type===0){
                modify_freight = this.changeOrderData.freight
            }else{
                modify_freight = this.modify_freight
            }
            let data = {
                secret: localStorage.getItem("secretId"),
                order_id: this.$route.query.id,
                modify_price: this.realPay,
                modify_freight: modify_freight
            }
            orderSave(data).then((res)=>{
                if(res.data.code===200){
                    that.getRecord()
                    that.$message.success("操作成功")
                    that.dialogVisible = false
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员！');
            })
        },
        priceChangeShow(){
            this.modify_price = undefined
            this.modify_freight = undefined
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                order_id: this.$route.query.id
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
        toPayFa(){
            this.$confirm('此为货到付款订单，是否确认发货？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fahuo = true
            }).catch(() => {
                this.$message.info("已取消操作");
            })
        },
        handleSuccess(response, file, fileList){
            this.courier_image = response.data.src
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
      order_fa(){
          
         let that = this
         that.fahuo = !that.fahuo
         that.$axios.post(that.url + 'shopapi/order/logistics',
            'token=' + localStorage.getItem('userId') +
            '&secret=' + localStorage.getItem('secretId') 
        ).then((res)=>{
            if(res.data.code ==1){
                this.kuaidi = res.data.data
            }
        }).catch((res)=>{
        })
      },
      order_back(){
          this.$router.push({path:'wf/admin/shop/order/order',name:'order'});
      },
      order_fa_f(){
        let that = this;
         console.log(that.activeName)
         if(that.activeName == 'one'){//快递
            let rets= /^[0-9a-zA-Z]+$/;
            if(!rets.test(this.express_num)){
                this.$message({
                    message: '请输入正确的快递单号',
                    type: 'warning'
                });
            }else{
                let data={
                    secret:localStorage.getItem('secretId'),
                    id:this.order_detail.id,
                    // state:2,
                    receive_way:0,
                    express_id:this.value,
                    courier_number:this.express_num,
                    courier_image:this.courier_image,
                    delivery_remark:this.express_remarks
                }
                upstate(data).then((res)=>{
                    if(res.data.code ==1){
                        that.$message({
                        message: '发货成功',
                        type: 'success'
                        });
                        that.fahuo = !that.fahuo
                        if(that.fahuo === false){
                            that.$router.go(0)
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((res)=>{
                    that.$message.error("网路错误");
                })
            }
        }else if(that.activeName == 'two'){//同城
            let data={
                    secret:localStorage.getItem('secretId'),
                    id:this.order_detail.id,
                    // state:2,
                    receive_way:2,
                    express_id:this.value,
                    courier_number:this.express_num,
                    courier_image:this.courier_image,
                    delivery_remark:this.express_remarkss
                }
                upstate(data).then((res)=>{
                    if(res.data.code ==1){
                        that.$message({
                        message: '发货成功',
                        type: 'success'
                        });
                        that.fahuo = !that.fahuo
                        if(that.fahuo === false){
                            that.$router.go(0)
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((res)=>{
                    that.$message.error("网路错误");
                })
        }else if(that.activeName == 'three'){
                let data={
                    secret:localStorage.getItem('secretId'),
                    id:this.order_detail.id,
                    // state:2,
                    receive_way:3,
                    express_id:this.value,
                    courier_number:this.express_num,
                    courier_image:this.courier_image,
                    delivery_remark:this.express_remarkss
                }
                upstate(data).then((res)=>{
                    if(res.data.code ==1){
                        that.$message({
                        message: '发货成功',
                        type: 'success'
                        });
                        that.fahuo = !that.fahuo
                        if(that.fahuo === false){
                            that.$router.go(0)
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((res)=>{
                    that.$message.error("网路错误");
                })
        }
        
      },
      order_fa_f_self(){
          let that = this
          let receive_way = -1
          if(that.activeName == 'one'){
               receive_way = 0
            }else if(that.activeName == 'two'){
                receive_way =1
            }else if(that.activeName == 'three'){
                receive_way =3
            }
          this.$axios.post(this.url + 'shopapi/Order/upstate',
            'token=' + localStorage.getItem('userId') +
            '&secret=' + localStorage.getItem('secretId') +
            '&id=' + this.order_detail.id+
            '&receive_way=' +2 +
            '&express_id=' + 1 +
            '&courier_number=' + 1 +
            '&courier_image='+1
        ).then((res)=>{
            if(res.data.code ==1){
                    that.$message({
                    message: res.data.msg,
                    type: 'success'
                });
                that.fahuo = !that.fahuo
                if(that.fahuo === false){
                    that.$router.go(0)
                }
            }else{
                that.$message.error(res.data.msg);
            }
        }).catch((res)=>{
            this.$message.error("网路错误");
        })
      },
      all_kd(){
          let that = this
          this.$axios.post(this.url + 'shopapi/order/logistics',
            'token=' + localStorage.getItem('userId') +
            '&secret=' + localStorage.getItem('secretId')
          )
          .then(function(res){
              if(res.data.code==1){
                  that.kuaidi = res.data.data
              }else{

              }
          })
          .catch(function (error) {
            })
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
#order_details{
    background: #fff;
    padding: 20px 20px;
    .jianju{
        margin: 20px 0;
    }
    .el-button--primary{
        background: #719FF8;
    }
    // 图片上传样式
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
    /deep/ .el-table{
        thead{
            th{
                background: #F3F3F3;
            }
        }
        tbody{
            td{
                background: #FAFAFA;
            }
        }
    }
     /deep/ .el-tabs{
        margin-top: 20px;
        width: 100%;
        .el-tabs__header{
            margin: 0;
            background: #F8F8F8;
            border-radius: 4px;
            // padding-left: 25px;
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
    .wf-gray-line{
        width: 100%;
        height: 1px;
        background: #F0F0F0;
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
    .wf-margin-top{
        margin-top: 20px;
    }
    /deep/ .el-dialog{
        .el-dialog__footer{
            padding: 20px 20px 20px;
            text-align: center;
        }
        .el-dialog__body{
            padding: 10px 20px 0;
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
    .wf-record-data{
        width: 900px;
    }
}
</style>