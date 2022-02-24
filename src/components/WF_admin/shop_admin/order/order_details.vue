<template>
    <div id="order_details">
        <div class="form-box">
            <el-form label-width="110px">
                <el-form-item label="订单信息" class="form-title"></el-form-item>
                <el-form-item label="订单编号">
                    {{order_detail.trade_no?order_detail.trade_no:'无'}}
                </el-form-item>
                <el-form-item label="微信/交易单号">
                    {{order_detail.transaction_id?order_detail.transaction_id:'无'}}
                </el-form-item>
                <el-form-item label="订单类型">
                    {{
                        order_detail.order_type===0?'普通订单':order_detail.order_type===1?"团购订单":order_detail.order_type===2?
                        "秒杀订单":order_detail.order_type===3?"分销订单":order_detail.order_type===4?"砍价订单":order_detail.order_type===5?
                        "积分兑换订单":order_detail.order_type===6?"全款预售订单":order_detail.order_type===7?"定金预售订单":""
                    }}
                </el-form-item>
                <el-form-item label="支付方式">
                    {{order_detail.pay_type}}
                </el-form-item>
                <el-form-item label="订单状态">
                    <div class="wf-margin-bottom-10">{{order_detail.state}}</div>
                    <div v-if="order_detail.order_type===7">
                        <div :class="order_detail.earnest_pay_time===0&&order_detail.state!=='已取消'?'wf-margin-top wf-red':'wf-margin-top'">
                            <p v-if="order_detail.state==='已取消'">超时未支付定金，订单关闭。</p>
                            <div>
                                阶段一： 定金({{order_detail.earnest_pay_time===0?"待支付":"已支付"}}) <span v-if="order_detail.purpose_money!==0">（可抵￥ {{order_detail.purpose_money}}）</span>￥{{order_detail.earnest_money}}
                            </div>
                            <p class="wf-margin-left-60 wf-margin-bottom-10">
                                {{order_detail.front_start_time}} - {{order_detail.front_end_time}}
                            </p>
                        </div>
                        <div :class="order_detail.earnest_pay_time!==0&&order_detail.state!=='已取消'&&(order_detail.tail_pay_time===0||order_detail.tail_state===1)?'wf-red':''">
                            <div>
                                阶段二： 尾款({{order_detail.tail_pay_time===0?"待支付":order_detail.tail_state===1?"未开始":"已支付"}}) ￥{{order_detail.tail_money}}
                            </div>
                            <p class="wf-margin-left-60 wf-margin-bottom-10">
                                {{order_detail.tail_start_time}} - {{order_detail.tail_end_time}}
                            </p>
                        </div>
                        <div :class="order_detail.earnest_pay_time!==0&&order_detail.state!=='已取消'&&order_detail.tail_pay_time!==0&&order_detail.tail_state!==1&&order_detail.send_time!==0?'wf-red':''">
                            <div v-if="order_detail.time_state===0">
                                阶段三： {{order_detail.advance_time!==0&&order_detail.advance_time!==undefined&&order_detail.advance_time!==""?order_detail.advance_time:""}} 开始发货
                            </div>
                            <div v-if="order_detail.time_state===1">
                                阶段三： 付款后 {{order_detail.advance_time/24/60/60}} 天开始发货
                            </div>
                        </div>
                    </div>
                    <div v-if="order_detail.order_type===6">
                        <div :class="order_detail.earnest_pay_time!==0&&order_detail.state!=='已取消'&&order_detail.tail_pay_time!==0&&order_detail.tail_state!==1&&order_detail.send_time!==0?'wf-red':''">
                            <div v-if="order_detail.time_state===0">
                                发货时间： {{order_detail.advance_time!==0&&order_detail.advance_time!==undefined&&order_detail.advance_time!==""?order_detail.advance_time:""}} 开始发货
                            </div>
                            <div v-if="order_detail.time_state===1">
                                发货时间： 付款后 {{order_detail.advance_time/24/60/60}} 天开始发货
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <el-form label-width="110px">
                <el-form-item label="配送信息" class="form-title"></el-form-item>
                <el-form-item label="下单人">
                    <span class="form-margin-right">{{order_detail.nickName}}</span>{{order_detail.phone}}
                </el-form-item>
                <el-form-item label="配送方式">
                    {{order_detail.receive_way===0?"物流配送":order_detail.receive_way===1?"到店自提":order_detail.receive_way===2?"同城配送":order_detail.receive_way===3?"虚拟商品":""}}
                </el-form-item>
                <el-form-item label="收货信息">
                    <span class="form-margin-right">{{order_detail.collection_name}}</span>{{order_detail.collection_phone}}
                    <el-button v-if="order_detail.state==='待付款'||order_detail.state==='待发货'" type="text" @click="changeCollection">修改</el-button>
                    <p>{{order_detail.collection_address}}</p>
                </el-form-item>
                <el-form-item label="自提地址" v-if="order_detail.receive_way===1&&order_detail.pick_address">
                    {{order_detail.pick_address}}
                </el-form-item>
                <el-form-item label="自提时间" v-if="order_detail.receive_way===1&&order_detail.extract_time">
                    {{order_detail.extract_time}}
                </el-form-item>
                <el-form-item label="买家留言">
                    {{order_detail.remarks?order_detail.remarks:'无'}}
                </el-form-item>
                <el-form-item v-if="order_detail.receive_way!=1" label="物流信息">
                    <span v-if="order_detail.express_name!=''" class="form-margin-right">{{order_detail.express_name}}</span>
                    <span v-if="order_detail.courier_number!==null">{{order_detail.courier_number}}</span>
                    <span>{{order_detail.waybill_id}}</span>
                    <el-button v-if="order_detail.state==='待收货'&&(order_detail.express_name!=''||order_detail.courier_number!=null)&&order_detail.waybill_id===''" type="text" @click="changeExpress">修改</el-button>
                    <el-button v-if="order_detail.state==='待收货'&&(order_detail.express_name!=''||order_detail.courier_number!=null)&&order_detail.waybill_id!==''" type="text" @click="logisticsGetList">查看</el-button>
                    <p v-if="order_detail.state==='待收货'&&(order_detail.express_name!==''||order_detail.courier_number!==null)&&order_detail.waybill_id!==''">状态
                        {{order_detail.waybill_state===0?"待揽件":order_detail.waybill_state===1?"运输中":order_detail.waybill_state===2?"派件中":
                        order_detail.waybill_state===3?"已签收":order_detail.waybill_state===4?"异常签收":""}}</p>
                    <p v-show="order_detail.courier_image!='0'"><img class="wf-img" preview="1432" :src="order_detail.courier_image" alt=""></p>
                </el-form-item>
            </el-form>
            <div class="clear"></div>
        </div>
        <div class="form-box">
            <el-form label-width="110px">
                <el-form-item label="处理进度" class="form-title"></el-form-item>
                <el-form-item label="退款状态">
                    <span class="wf-bold-title" v-show="order_detail.state==='已退款'">成功退款</span>
                    <span v-show="order_detail.state!=='已退款'" class="wf-bold-title">{{
                        order_detail.handle_state===0?"无":order_detail.handle_state===1?"退款关闭，买家主动撤销退款":order_detail.handle_state===2?
                        "商家已同意退款，等待买家发货":order_detail.handle_state===3?"退款关闭，商家拒绝退款":order_detail.handle_state===4?
                        "商家已同意退款，等待商家确认收货":order_detail.handle_state===5?"申请退款":""
                    }}</span>
                    <p v-show="order_detail.state==='已退款'" class="wf-gray-title">商家已确认收货，成功退款到买家账户</p>
                    <code v-show="order_detail.state!=='已退款'">
                        <p class="wf-gray-title">{{order_detail.handle_state===2?"您已同意退款协议，请等待买家处理":
                            order_detail.handle_state===4?"买家已发货，确认收货后，退款将返回买家账户":""}}</p>
                        <countdown
                        v-if="symptoms&&order_detail.handle_state===2"
                        class="wf-gray-title wf-countdown"
                        :currentTime="currentTime"
                        :startTime="parseInt(common_refund_time)"
                        :endTime="parseInt(common_end_time)"  
                        endText="已关闭"
                        :dayTxt="'天'" 
                        :hourTxt="'小时'" 
                        :minutesTxt="'分钟'" 
                        :secondsTxt="'秒'"
                        tipTextEnd="买家在之后">
                        </countdown>
                        <span v-show="order_detail.handle_state===2" class="wf-countdown-title">时间内未响应，退款申请将自动关闭</span>
                    </code>
                </el-form-item>
                <el-form-item v-if="order_detail.handle_state===1||order_detail.handle_state===2||order_detail.handle_state===4||order_detail.state==='已退款'" label="退货地址">
                    {{order_detail.receive_address}}
                </el-form-item>
                <el-form-item v-if="order_detail.handle_state===1||order_detail.handle_state===2||order_detail.handle_state===4||order_detail.state==='已退款'" label="收件人">
                    {{order_detail.contacts}} {{order_detail.receive_phone}}
                </el-form-item>
                <el-form-item label="退款原因">
                    {{order_detail.refunds}}
                    <p v-show="order_detail.refund_image"><img class="small-img" preview="256" :src="order_detail.refund_image"></p>
                </el-form-item>
                <el-form-item v-if="order_detail.handle_state===3" label="拒绝原因">
                    <el-col :span="24" class="wf-text-box">
                        {{order_detail.refuse_refund_reason}}
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form label-width="110px">
                <el-form-item label="订单跟踪" class="form-title"></el-form-item>
                <el-form-item label="下单时间">
                    {{order_detail.create_time}}
                </el-form-item>
                <el-form-item label="付款时间" v-if="order_detail.pay_time!=='-'">
                    {{order_detail.pay_time}}
                </el-form-item>
                <el-form-item label="申请退款时间" v-if="order_detail.apply_time!==0">
                    {{order_detail.apply_time}}
                </el-form-item>
                <el-form-item label="定金支付时间" v-if="order_detail.earnest_pay_time&&order_detail.earnest_pay_time!==0">
                    {{order_detail.earnest_pay_time}}
                </el-form-item>
                <el-form-item label="尾款支付时间" v-if="order_detail.tail_pay_time&&order_detail.tail_pay_time!==0">
                    {{order_detail.tail_pay_time}}
                </el-form-item>
                <el-form-item label="发货时间" v-if="order_detail.send_time!==0">
                    {{order_detail.send_time}}
                </el-form-item>
            </el-form>
            <div class="clear"></div>
        </div>
        <div class="form-box" v-if="order_detail.identity_name!==''||order_detail.identity_number!==''||order_detail.first_user_id!==0||order_detail.second_user_id!==0">
            <el-form label-width="110px" v-if="order_detail.identity_name!==''||order_detail.identity_number!==''">
                <el-form-item label="实名信息" class="form-title"></el-form-item>
                <el-form-item label="真实姓名">
                    {{order_detail.identity_name}}
                </el-form-item>
                <el-form-item label="身份证号">
                    {{order_detail.identity_number}}
                </el-form-item>
                <el-form-item label="身份证正反面">
                    <img :preview="order_detail.id+1" style="width:80px;height:80px;vertical-align:middle;margin-right:20px;" :src="order_detail.identity_positive" alt="">
                    <img :preview="order_detail.id+2" style="width:80px;height:80px;vertical-align:middle;" :src="order_detail.identity_opposite" alt="">
                </el-form-item>
            </el-form>
            <el-form label-width="110px" v-if="order_detail.first_user_id!==0||order_detail.second_user_id!==0">
                <el-form-item label="分销信息" class="form-title"></el-form-item>
                <el-form-item v-if="order_detail.first_user_id!==0" label="一级分销商">
                    {{order_detail.first_nickName}}
                    {{order_detail.first_phone}}
                    {{order_detail.first_commisstion}}
                </el-form-item>
                <el-form-item v-if="order_detail.second_user_id!==0" label="二级分销商">
                    {{order_detail.second_nickName}}
                    {{order_detail.second_phone}}
                    {{order_detail.second_commisstion}}
                </el-form-item>
            </el-form>
            <div class="clear"></div>
        </div>
        <!-- 判断是否隐藏订单退款按钮 -->
        <el-button v-if="(order_detail.state==='申请退款'||order_detail.state==='待发货'||order_detail.state==='待收货')&&order_detail.handle_state===4||(order_detail.state==='申请退款'&&order_detail.handle_state===0)" type="danger" style="margin-left: 20px;" @click="open" size="mini">{{order_detail.state==='待发货'?"同意退款":"确认收货并退款"}}</el-button>
        <!-- 判断是否隐藏订单退款按钮 -->
        <el-button v-if="order_detail.state!=='已退款'&&order_detail.handle_state===5" size="mini" @click="noRefundShow">拒绝退款</el-button>
        <el-button v-if="order_detail.handle_state===5&&order_detail.state!=='待发货'&&order_detail.state!=='已退款'" type="primary" size="mini" @click="agreeRefundShow">同意退款</el-button>
        <el-button v-if="order_detail.handle_state===5&&order_detail.state==='待发货'" type="danger" size="mini" @click="open">确认退款</el-button>
        <el-table
        class="wf-margin-top wf-shop-table"
        :data="tableData">
            <el-table-column
                label="商品图片"
                width="80">
                <template slot-scope="scope">
                    <img style="width:64px;height:64px;"   :src="scope.row.good_image" alt="" >
                </template>
            </el-table-column>
            <el-table-column
                prop="good_name"
                label="名称"
                width="240">
            </el-table-column>
            <el-table-column
                prop="good_spec"
                label="规格"
                width="180">
            </el-table-column>
            <el-table-column
                label="数量">
                <template slot-scope="scope">
                    ×{{scope.row.good_num}}
                </template>
            </el-table-column>
            <el-table-column
                prop="original_price"
                label="单价￥">
            </el-table-column>
            <el-table-column
                prop="good_price"
                label="会员价￥">
            </el-table-column>
            <el-table-column
                label="小计￥">
                <template slot-scope="scope">
                    {{parseFloat(scope.row.good_num)*parseFloat(scope.row.good_price)}}
                </template>
            </el-table-column>
        </el-table>
        <div class="table-last">
            <el-form label-width="110px">
                <el-form-item>
                    <el-button class="wf-black-btn" type="text" @click="offerShow=!offerShow">{{offerShow?"收起":"展开"}}查看优惠详情
                        <i v-if="offerShow" class="el-icon-arrow-up"></i>
                        <i v-else class="el-icon-arrow-down"></i>
                    </el-button>
                </el-form-item>
                <code v-if="offerShow">
                    <el-form-item label="运费">
                        ￥{{order_detail.freight}}
                    </el-form-item>
                    <el-form-item label="优惠方式">
                        会员优惠  -￥{{order_detail.membership_discount}}
                        <p>积分抵现  -￥{{order_detail.cash_amount}}</p>
                        <p>免邮  -￥{{order_detail.free_shipping_state!==0?order_detail.freight:0.00}}</p>
                        <p>满减优惠  -￥{{order_detail.cut_price}}</p>
                        <p>优惠券  -￥{{order_detail.coupon_price}}</p>
                    </el-form-item>
                    <el-form-item label="订单实付">
                        ￥{{order_detail.total_price}}
                    </el-form-item>
                </code>
            </el-form>
            <span>共{{good_num}}件商品，总计<span class="wf-red"><span class="wf-small-price">￥</span>{{order_detail.total_price}}</span>(包含运费￥{{order_detail.freight}})</span>
        </div>
        <!-- 判断是否隐藏订单改价按钮 -->
        <el-button class="wf-margin-top" v-if="order_detail.state === '待付款'" size="mini" @click="priceChangeShow">改价</el-button>

        <!-- ******************************************************以下是旧代码********************************************************************** -->
        <!-- 判断是否隐藏发货按钮 团购订单-->
            <span v-if="order_detail.state === '待发货' &&  order_detail.order_type === 1 && order_detail.status ==='拼团成功'&&order_detail.receive_way===0">
                <el-button class="wf-margin-top" type="primary" @click="order_fa" size="mini">发货</el-button>
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
                        <el-input v-model="express_remarksss" size="mini" placeholder="亲，感谢下单，本单为非实物商品，无法查看物流哦。"  type="textarea"></el-input>
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
            <span v-if="(order_detail.handle_state===0||order_detail.handle_state===1||order_detail.handle_state===3)&&order_detail.state==='待发货'&&(order_detail.order_type=== 0||order_detail.order_type===2||order_detail.order_type===3||order_detail.order_type===4||order_detail.order_type===5)&&order_detail.receive_way!==1">
                <el-button class="wf-margin-top" @click="order_back" size="mini">返回</el-button>
                <el-button v-if="order_detail.receive_way===0&&order_detail.pay_type==='货到付款'" type="primary" @click="toPayFa" size="mini">发货</el-button>
                <el-button v-else type="primary" @click="order_fa" size="mini">发货</el-button>
            </span>
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
                        <el-input v-model="express_remarksss" size="mini" placeholder="亲，感谢下单，本单为非实物商品，无法查看物流哦。"  type="textarea"></el-input>
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
            <span v-if="(order_detail.handle_state===0||order_detail.handle_state===1||order_detail.handle_state===3)&&order_detail.state === '待发货' &&  (order_detail.order_type === 0 || order_detail.order_type === 2 || order_detail.order_type === 3||order_detail.order_type === 4|| order_detail.order_type === 5)&&order_detail.receive_way===1">
                <el-button class="wf-margin-top" type="primary" @click="order_fa" size="mini">发货</el-button>
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
            <span v-if="(order_detail.handle_state===0||order_detail.handle_state===1||order_detail.handle_state===3)&&order_detail.state === '待发货' &&  order_detail.order_type === 1 && order_detail.status ==='拼团成功'&&order_detail.receive_way===1">
                <el-button class="wf-margin-top" type="primary" @click="order_fa" size="mini">发货</el-button>
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
            <!-- *****************************************旧代码*********************************************** -->
        <p class="wf-margin-top" v-if="order_detail.state === '待付款'">操作记录：</p>
        <my-table v-if="order_detail.state === '待付款'" class="wf-margin-top wf-record-data" :tableData='recordData' :columns='columns' :pagination='false'></my-table>
        <el-dialog
        title="修改收货信息"
        :visible.sync="collectionDialog"
        width="30%">
            <el-form label-position="right" label-width="100px">
                <el-form-item label="收货人">
                    <el-input size="mini" v-model="collection_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input-number :controls="false" :precision="0" :min="0" size="mini" v-model="collection_phone"></el-input-number>
                </el-form-item>
                <el-form-item label="收货地址" prop="address">
                    <el-input :maxlength="50" size="mini" v-model="collection_address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="collectionDialog = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="collectionSave" size="mini">确 定</el-button>
            </span>
        </el-dialog>
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
                        :label="item.code.split(',').join('')+item.address"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="order_detail.order_type===5&&order_detail.freight==='0.00'">
                    本订单实付金额为0，不退还资金。
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
        <el-dialog
            title="发货"
            :visible.sync="ship"
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
            <el-form class="wf-margin-top" label-position="right" label-width="100px">
                <el-form-item v-if="activeName == 'one'" label="快递公司">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in kuaidi"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="text" @click="orderOften" size="mini">常用快递管理</el-button>
                </el-form-item>
                <el-form-item v-if="activeName == 'one'" label="快递单号">
                    <el-input class="wf-input-width" v-model="express_num" size="mini"></el-input>
                </el-form-item>
                <el-form-item v-if="activeName == 'one'" label="备注">
                    <el-input class="wf-input-width" v-model="express_remarks" size="mini" ></el-input>
                </el-form-item>
                <el-form-item v-if="activeName == 'two'" label="备注">
                    <el-input class="wf-input-width" v-model="express_remarkss" placeholder="本单由商家自主配送，请耐心等待。"  type="textarea" size="mini" ></el-input>
                </el-form-item>
                <el-form-item v-if="activeName == 'three'" label="备注">
                    <el-input class="wf-input-width" v-model="express_remarksss" size="mini" placeholder="亲，感谢下单，本单为非实物商品，无法查看物流哦。"  type="textarea"></el-input>
                </el-form-item>
                <el-form-item v-if="activeName == 'one'" label="快递单拍照">
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="ship = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="expressSave" size="mini">确 定</el-button>
            </span>
        </el-dialog>
        <dialog-table
        :dialogVisible="logisticsDialog"
        :tableData='logisticsTable'
        :columns='logisticsColumns'
        dialogWidth="800px"
        @beforeClose="beforeClose"
        :pagination="false"
        >
        </dialog-table>
        <versionCom v-if="showVersion" @closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import { orderChangePrice, orderSave, orderGetRecording, upstate, agreeRefund, collectionSave, expressSave, orderConfirmRefund } from "@/server/order.js"
import { shopAddressGetData } from "@/server/shopAddress.js"
import MyTable from "@/commonComponents/table/table.vue";
import { dateFormat } from "@/untils/common.js";
import countdown from '@/commonComponents/countdown/countdown.vue';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
import DialogTable from "@/commonComponents/dialogTable/dialogTable.vue";
import { waybillListLogistics } from "@/server/waybillList.js"
export default {
    name: 'shop_order_details',
    data() {
        return {
            offerShow: false,
            logisticsDialog: false,
            logisticsTable: [], // 列表数据
            logisticsColumns: [
                {   
                    label: "时间",
                    align: "center",
                    render: (h, param)=> {
                        return h('span',{
                            attrs: {
                                style: param.index===0?"color:#719FF8;":""
                            }
                        },dateFormat(param.row.action_time))
                    }
                },
                {   
                    label: "内容",
                    align: "center",
                    render: (h, param)=> {
                        return h('span',{
                            attrs: {
                                style: param.index===0?"color:#719FF8;":""
                            }
                        },param.row.action_msg)
                    }
                },
                {   
                    label: "状态",
                    align: "center",
                    render: (h, param)=> {
                        return h('span',{
                            attrs: {
                                style: param.index===0?"color:#719FF8;":""
                            }
                        },param.row.action_name)
                    }
                },
            ],
            showVersion:false,//控制版本提示
            common_end_time: ( new Date() ).getTime(),
            symptoms: true,
            common_refund_time: ( new Date() ).getTime(),
            currentTime:( new Date() ).getTime(),
            express_remarksss: "亲，感谢下单，本单为非实物商品，无法查看物流哦。",
            ship: false,
            //*****修改收货信息弹框开始******//
            collection_name: "", // 收货人
            collection_phone: undefined, // 手机号
            collection_address: "", // 详细地址
            collectionDialog: false,
            //*****修改收货信息弹框结束******//
            apply_time: "",
            good_num: 0,
            return_address_id: "",
            address_options: [],
            agreeRefundDialog: false,
            refuse_refund_reason: "",
            noRefundDialog: false,
             activeName: 'one',
             status_list: [
                { id: 0, label: '快递物流', name: 'one', },{ id: 1, label: '同城配送', name: 'two', },{ id: 2, label: '虚拟商品', name: 'three', }
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
            order_detail:{},
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
        MyTable,
        countdown,
        DialogTable
    },
    created(){
        this.$nextTick(()=>{
            this.getData()
        })
        this.all_kd()
    },
    mounted(){
        this.getRecord()
    },
    methods: {
        beforeClose(){
            this.logisticsDialog = false
        },
        logisticsGetList(){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                order_id: this.order_detail.id
            }
            waybillListLogistics(data).then((res)=>{
                if(res.data.code===200){
                    that.logisticsTable = res.data.data.path_item_list
                    that.logisticsDialog = true
                }else{
                    that.$message.error(res.data.msg+"600A00119");
                }
            }).catch(err=>{
                that.$message.error('网络错误600B00120');
            });
        },
        handleCloseVersion(){ // 关闭版本更新提示弹框
            this.showVersion = false;
        },
        getData(){
            let that = this
            this.$axios.post(this.url + 'shopapi/Order/details',{
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                id:this.$route.query.id
            }).then((res)=>{
                if(res.data.code===1){
                    that.order_detail= res.data.data
                    that.common_refund_time = res.data.data.common_refund_time
                    that.common_end_time = res.data.data.common_refund_time+60*60*24*7
                    that.symptoms=false;
                    that.$nextTick(()=>{
                        that.symptoms=true;
                    })
                    that.tableData = res.data.data.Orderdetail
                    let num = 0
                    for(let i=0;i<res.data.data.Orderdetail.length;i++){
                        num += res.data.data.Orderdetail[i].good_num
                    }
                    that.good_num = num
                    if(res.data.data.apply_time!==0&&res.data.data.apply_time!==null){
                        that.apply_time = dateFormat(res.data.data.apply_time)
                        that.order_detail.apply_time = dateFormat(res.data.data.apply_time)
                    }
                    that.order_detail.front_start_time = dateFormat(that.order_detail.front_start_time)
                    that.order_detail.tail_start_time = dateFormat(that.order_detail.tail_start_time)
                    that.order_detail.front_end_time = dateFormat(that.order_detail.front_end_time)
                    that.order_detail.tail_end_time = dateFormat(that.order_detail.tail_end_time)
                    if(that.order_detail.time_state===1){
                        that.order_detail.advance_time = that.order_detail.advance_time
                    }else{
                        that.order_detail.advance_time = dateFormat(that.order_detail.advance_time)
                    }
                    if(that.order_detail.earnest_pay_time&&that.order_detail.earnest_pay_time!==0){
                        that.order_detail.earnest_pay_time = dateFormat(that.order_detail.earnest_pay_time)
                    }
                    if(that.order_detail.tail_pay_time&&that.order_detail.tail_pay_time!==0){
                        that.order_detail.tail_pay_time = dateFormat(that.order_detail.tail_pay_time)
                    }
                    if(that.order_detail.send_time!==0){
                        that.order_detail.send_time = dateFormat(that.order_detail.send_time)
                    }
                }else{
                    that.$message.error(res.data.msg)
                }
            }).catch((res)=>{
                that.$message.error("网络错误")
            })
        },
        expressSave(){
            let that = this
            let express_remarks = this.activeName==='one'?this.express_remarks:this.activeName==='two'?this.express_remarkss:this.express_remarksss
            let data = {
                pro_id: localStorage.getItem('proId'),
                order_id: this.$route.query.id,
                token: localStorage.getItem("userId"),
                delivery_remark: express_remarks,
                receive_way: this.activeName==='one'?0:this.activeName==='two'?2:3,    
            }
            if(this.activeName==='one'){
                if(this.value===""){
                    this.$message.warning("请选择快递公司")
                    return
                }else if(this.express_num===""){
                    this.$message.warning("请填写快递单号")
                    return
                }else if(!/^[0-9a-zA-Z]+$/.test(this.express_num)){
                    this.$message.warning("请正确填写快递单号")
                    return
                }
                data.express_id = this.value
                data.courier_number = this.express_num
                data.courier_image = this.courier_image
            }
            if(express_remarks===""){
                this.$message.warning("请填写备注")
                return
            }
            expressSave(data).then((res)=>{
                if(res.data.code===200){
                    that.getData()
                    that.ship = false
                    that.$message.success("修改成功")
                }else{
                    that.$message.error(res.data.msg+"600A0065");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0066');
            })
        },
        changeExpress(){
            if(this.order_detail.receive_way===0||this.order_detail.receive_way===1){
                this.activeName = 'one'
                this.courier_image = this.order_detail.courier_image==="0"?"":this.order_detail.courier_image
                if(this.order_detail.express_id!==0){
                    this.value = this.order_detail.express_id
                }else{
                    this.value = ""
                }
                if(this.order_detail.delivery_remark===""){
                    this.express_remarks = '可复制快递单号到官网查询'
                }else{
                    this.express_remarks = this.order_detail.delivery_remark
                }
            }else if(this.order_detail.receive_way===2){
                this.activeName = 'two'
                if(this.order_detail.delivery_remark===""){
                    this.express_remarkss = '本单由商家自主配送，预计3个自然日内配送，请耐心等待。'
                }else{
                    this.express_remarkss = this.order_detail.delivery_remark
                }
            }else if(this.order_detail.receive_way===3){
                this.activeName = 'three'
                if(this.order_detail.delivery_remark===""){
                    this.express_remarksss = '亲，感谢下单，本单为非实物商品，无法查看物流哦。'
                }else{
                    this.express_remarksss = this.order_detail.delivery_remark
                }
            }
            this.express_num = this.order_detail.courier_number
            this.ship = true
        },
        collectionSave(){
            let that = this
            if(this.collection_name===""){
                this.$message.warning("请填写收货人")
            }else if(this.collection_phone===undefined){
                this.$message.warning("请填写手机号")
            }else if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.collection_phone)){
                this.$message.warning("请填写正确手机号")
            }else if(this.collection_address===""){
                this.$message.warning("请填写收货地址")
            }else if(this.detail_address===""){
                this.$message.warning("请详细地址")
            }else{
                let data = {
                    pro_id: localStorage.getItem('proId'),
                    order_id: this.$route.query.id,
                    token: localStorage.getItem("userId"),
                    collection_name: this.collection_name,
                    collection_phone: this.collection_phone,
                    collection_address: this.collection_address
                }
                collectionSave(data).then((res)=>{
                    if(res.data.code===200){
                        that.getData()
                        that.collectionDialog = false
                        that.$message.success("修改成功")
                    }else{
                        that.$message.error(res.data.msg+"600A0063");
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误600B0064');
                })
            }
        },
        changeCollection(){
            this.collection_name = this.order_detail.collection_name
            this.collection_phone = this.order_detail.collection_phone
            this.collection_address = this.order_detail.collection_address
            this.collectionDialog = true
        },
        addAddress(){
            this.$router.push({path:"/wf/admin/shop/shopAddress/editShopAddress",query:{type:1}})
        },
        noRefundShow(){
            let that = this
            getAuditApplicationList(22).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===false){
                        that.showVersion = true
                    }else{
                        that.noRefundDialog = true
                    }
                }else{
                    that.$message.error(res.data.msg+"600A0073");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0074');
            })
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
            getAuditApplicationList(22).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===false){
                        that.showVersion = true
                    }else{
                        let data = {
                            pro_id: localStorage.getItem('proId'),
                            page: 1
                        }
                        shopAddressGetData(data).then((res)=>{
                            if(res.data.code===200){
                                that.address_options = res.data.data.data
                                let defaultAddress = res.data.data.data.filter((item=>{
                                    return item.state===1
                                }))
                                if(defaultAddress.length>0){
                                    that.return_address_id = defaultAddress[0].id
                                }
                                that.agreeRefundDialog = true
                            }else{
                                that.$message.error(res.data.msg+"600A0032");
                            }
                        }).catch((err)=>{
                            that.$message.error('网络错误600B0033');
                        })
                    }
                }else{
                    that.$message.error(res.data.msg+"600A0073");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0074');
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
                let data = {
                    pro_id: parseInt(localStorage.getItem("proId")),
                    token: localStorage.getItem('userId'),
                    order_id: this.order_detail.id,
                }
                orderConfirmRefund(data).then((res)=>{
                    if(res.data.code===200){
                        that.getData()
                        that.$message.success("退款成功")
                    }else{
                        that.$message.error(res.data.msg+"600A00207");
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误600B00208');
                })
            }).catch((error) => {
                that.$message.info("已取消操作")
            });
        },
        handleClick(){//切换delog里面的东西
            
        },
        orderOften(){
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
                    delivery_remark:this.express_remarksss
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
    border-radius: 4px;
    color: #333;
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
            padding-left: 20px;
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
            padding: 10px 20px;
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
    // 新样式
    .el-form-item__label,.el-form-item__content{
        line-height: 14px;
        p{
            margin-top: 10px;
        }
        .form-margin-right{
            margin-right: 20px;
        }
    }
    .form-title .el-form-item__label{
        font-size: 18px;
    }
    .form-box{
        .el-form{
            float: left;
            width: 40%;
        }
        margin-bottom: 20px;
        border-bottom: 1px solid #F0F0F0;
    }
    .wf-img{
        vertical-align:middle;
        max-width:80px;
        max-height:80px;
    }
    .small-img{
        width:64px;
        height:64px;
    }
    .table-last{
        width: 900px;
        box-sizing: border-box;
        padding: 20px;
        border-left: 1px solid #eee;
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
        border-radius: 4px;
        .wf-red{
            color: #E36F6B;
        }
        .wf-small-price{
            font-size: 14px;
        }
        .el-form{
            display: inline-block;
        }
    }
    .table-last>span{
        float: right;
    }
    /deep/ .wf-shop-table{
        width: 900px!important;
        .el-table__empty-block{
            border-left: 1px solid #eee!important;
            border-right: 1px solid #eee!important;
            border-bottom: 1px solid #eee!important;
        }
    }
    .el-table::before{
        height: 0;
    }
    .el-button--text{
        padding: 0;
    }
    /deep/ .el-dialog{
        .el-form-item__label,.el-form-item__content{
            line-height: 32px;
        }
    }
    .el-input-number .el-input__inner{
        text-align: left;
    }
    .wf-input-width{
        width: 300px;
    }
    .wf-gray-title{
        color: #666;
    }
    .wf-bold-title{
        color: #333;
        font-weight: bold;
    }
    .wf-countdown{
        display: inline-block;
    }
    .wf-countdown-title{
        font-size: 14px;
        color: #666;
    }
    .el-pagination{
        text-align: center;
    }
    .wf-black-btn{
        color: #333;
    }
    .wf-margin-left-60{
        margin-left: 60px;
    }
    .wf-margin-bottom-10{
        margin-bottom: 10px;
    }
    .wf-red{
        color: #F46666;
    }
    .wf-text-box{
        line-height: 20px;
        word-break: break-all;
    }
}
</style>
