<template>
    <div class="wf-shop_list-addgoods">
        <el-row :gutter="24">
            <el-col :xs="10" :sm="14" :md="18" :lg="20" :xl="22">
                <el-form :label-position="labelPosition"
                        :model="addAddGoodsData" 
                        :rules="rules" 
                        ref="addAddGoodsData" 
                        label-width="150px" 
                        class="demo-ruleForm">
                    <el-form-item label="分类" prop="selectedOptions" size="mini">
                        <el-col :span="12" class="wf-addgoods-name">
                            <el-row>
                                <el-col :span="8" style="width:188px;">
                                    <el-cascader
                                    :props="defaultProps"
                                    :options="options"
                                    @change="changeSelect"
                                    v-model="addAddGoodsData.selectedOptions"
                                    style="width:180px;">
                                    </el-cascader>
                                </el-col>
                                <el-col :span="8" >
                                    <div class="wf-add-btn-type jump">
                                        <icon name="wf-icon-link" :scale="1.75"></icon>
                                        <router-link  target="_blank" :to="{path:'/wf/admin/shop/class_management',query:{otheruuid:otheruuid}}">管理分类</router-link>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="this.$route.query.param=='edit'" label="商品分组" size="mini">
                        <el-row>
                        <el-col :span="12" class="wf-addgoods-group">
                            <el-select v-model="group_type_allVal" 
                            multiple 
                            placeholder="请选择"
                            @visible-change="handleVisibleChange"
                            popper-class="wf-goods-group"
                            filterable
                            size="mini"
                            >
                                <el-option
                                    v-for="item in addAddGoodsData.group_type_all"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <div class="wf-add-btn-type jump">
                                <icon name="wf-icon-link" :scale="1.75"></icon>
                                <router-link  target="_blank" :to="{path:'/wf/admin/shop/newshop_list/commoditygrouping'}">管理分组</router-link>
                             </div>
                        </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item v-if="!this.$route.query.param" label="" prop="name" size="mini">
                        <span slot="label">
                            <label>淘宝一键采集</label>
                            <el-popover
                            placement="top-start"
                            trigger="hover">
                            快速读取淘宝或天猫商品详情图片及参数商品链接为:<br/>
                            https://item.taobao.com/item.htm?spm=a212j8.1690022.act-universal-20181212-item-1x5-pc4.13.6c89YRUxYRUx1x&id=583378658926<br/>
                            或https://item.taobao.com/item.htm?spm=a219r.lm843.14.7.4e136548Y7oTGV&id=575592473006&ns=1&abbucket=16#detail<br/>
                            若不使用，则该项为空
                            <span slot="reference" class="el-icon-question">
                            </span>
                        </el-popover>
                        </span>
                        <el-col :span="8" class="wf-addgoods-name">
                            <el-input  size="mini" v-model="addAddGoodsData.taobao_url" placeholder="请输入淘宝或天猫商品链接"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="taoBaoCollection" size="mini"  :loading="loadingGetTB">立即获取</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="主图" prop="master_graph" size="mini" class="wf-main-img">
                        <el-col :span="24" class="wf-addgoods-name">
                            <el-upload
                            class="avatar-uploader"
                            :action="upLoadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            v-loading.fullscreen.lock="loading"
                            element-loading-text="正在上传中..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.5"
                           >
                            <img v-if="addAddGoodsData.master_graph" :src="addAddGoodsData.master_graph" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                        <el-col class="wf-help" >
                                <span >建议图片尺寸比例为1:1(建议不超过750×750 px), 小于2M。</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="flagVideo" label="轮播图视频" prop="good_videos" size="mini" class="wf-video-img dialogImageUrl">
                        <el-col  class="wf-addgoods-name">
                            <el-upload
                            class="avatar-uploader"
                            :action="upfileVideos"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemoveVideo"
                            :on-success="handleSwiperVSuccess"
                            :before-upload="beforeAvatarVUpload"
                            element-loading-text="正在上传中..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.5"
                           >
                                <video v-if="addAddGoodsData.good_videos" :src="addAddGoodsData.good_videos" class="avatar"></video>
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                        <el-col class="wf-help" >
                            <span >建议视频宽高尺寸比例为1:1(建议为750*750 px) , 小于100MB。</span>
                        </el-col>
                    </el-form-item>
                     <el-form-item v-if="!flagVideo" label="轮播图视频" size="mini" class="wf-video-img dialogImageUrl">
                        <el-col  class="wf-addgoods-name wf-novideo">
                            
                            <el-col class="wf-text">
                                (208及以上版本可用)
                            </el-col>
                            <el-col>
                                <el-button type="primary" size="mini" @click="handleVision">立即升级</el-button>
                            </el-col>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="轮播图" prop="dialogImageUrl" size="mini" class="wf-main-img dialogImageUrl">
                        <el-col :span="12" class="wf-addgoods-name">
                            <draggable class="list-group" element="ul" v-model="addAddGoodsData.dialogImageUrl" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                                <li v-for="(item, index) in addAddGoodsData.dialogImageUrl" :key="index" class="ImageImg" @click="handleDetailImg(index)">
                                    <el-upload :bindIndex="index" 
                                    :action="upLoadUrl"
                                    list-type="picture-card"
                                    :show-file-list="false"
                                    :before-upload="beforeAvatarUpload"
                                    :on-success="handleSwiperSuccess">
                                    <img v-if="item.url" :src="item.url" class="avatar"/>
                                    </el-upload>
                                    <div class="upload-icon">
                                        <el-row>
                                            <el-col :span="12" class="upload-icon-img">
                                                <i class="el-icon-view" ></i> <img v-if="item.url" :preview="index" :src="item.url" class="avatar"/>
                                            </el-col>
                                            <el-col :span="12">
                                                <i class="el-icon-delete" @click="handleSwiperRemoveD(index)"></i>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </li>
                            </draggable>
                            <li class="detailImg1" @click="handleDetailImg(-1)" v-if="addAddGoodsData.dialogImageUrl.length<5">
                                <el-upload 
                                    :action="upLoadUrl"
                                    list-type="picture-card"
                                    :show-file-list="false"
                                    :before-upload="beforeAvatarUpload"
                                    :on-success="handleSwiperSuccessAdd">
                                    <i class="el-icon-plus"></i>
                                    </el-upload>
                            </li>
                        </el-col>
                        <el-col class="wf-help" >
                            <span >建议图片尺寸比例为1:1(建议不超过750×750 px), 小于2M, 最多上传5张,图片可拖拽。</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="商品标题" prop="pro_title" size="mini">
                        <el-col :span="12" class="wf-addgoods-name">
                            <el-input :maxlength="50" size="mini"  v-model="addAddGoodsData.pro_title" placeholder="请输入商品标题"></el-input>
                            <span class="wf-textareaVaild ">{{(50-addAddGoodsData.pro_title.length)}}/50</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="描述(最多40个字)" prop="description" size="mini">
                        <el-col :span="24" class="wf-addgoods-name">
                            <el-input type="textarea" :rows="4"  size="mini" v-model="addAddGoodsData.description" placeholder="请输入名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="虚拟销量" prop="virtual_sales" size="mini">
                        <el-col :span="12" class="wf-addgoods-name">
                            <el-input-number :controls="false" size="mini" v-model="addAddGoodsData.virtual_sales" placeholder="请输入名称"></el-input-number>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="原价" prop="original_price" size="mini">
                        <el-col :span="12" class="wf-addgoods-name">
                            <el-input-number :disabled="advance_sale_open" :controls="false" size="mini" v-model="addAddGoodsData.original_price" placeholder="请输入名称"></el-input-number>
                            <span class="wf-gray-title">划线价</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="规格明细" prop="skuDetails" size="mini">
                        <el-col :span="24" class="wf-addgoods-sku">
                            <sku v-on:handleSkuData="handleSkuData" :advanceSaleOpen="advance_sale_open" ref="sku"></sku>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="label-left wf-point" v-if="pointMarktingId!=''&&mainSwitch===true" label="赠送积分" prop="integral_content">
                        <el-radio-group v-model="addAddGoodsData.integral_type" @change="integralChange" :disabled="advance_sale_open">
                            <el-radio :label="0">统一规则</el-radio>
                            <el-radio :label="1">单独自定义设置</el-radio>
                        </el-radio-group>
                        <div style="line-height: 24px;">
                            <span v-if="addAddGoodsData.integral_type===0">{{pointMarktingPrice}}元=1积分，根据规格价格自动计算赠送积分</span>
                            <div style="margin-left: 110px;">
                                <span v-if="addAddGoodsData.integral_type===1">
                                    <div>
                                        <el-radio-group v-model="integral_num_type" :disabled="advance_sale_open">
                                            <el-radio :label="0">百分比</el-radio>
                                            <el-radio :label="1">固定积分</el-radio>
                                        </el-radio-group>
                                    </div>
                                    <el-input-number
                                    class="input_width"
                                    style="margin-right:10px;width:120px;"
                                    size="mini"
                                    :controls="false"
                                    :precision="0"
                                    :min="0"
                                    :disabled="advance_sale_open"
                                    v-model="addAddGoodsData.integral_content"></el-input-number><span v-if="integral_num_type===0">%</span>积分
                                    <p class="wf-gray-title">若商品存在多规格不同价格，建议使用%，否则存在赠送积分比例不统一</p>
                                    <p class="wf-gray-title">消费者购物赠送的积分, 如果不填写或填写0，则默认为不赠送积分，如果带%则为按成交价格的比例计算积分</p>
                                    <p class="wf-gray-title">例: 购买2件，设置10 积分, 不管成交价格是多少， 则购买后获得20积分</p>
                                    <p class="wf-gray-title">例: 购买2件，设置10%积分, 成交价格2 * 200= 400， 则购买后获得 40 积分（400*10%）</p>
                                </span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item class="label-left wf-point" v-if="pointCreditShow===true&&mainSwitch===true" label="积分抵现" prop="integral_content">
                        <el-radio-group v-model="addAddGoodsData.mortgage_type" @change="mortgageChange" :disabled="advance_sale_open">
                            <el-radio :label="0">统一规则</el-radio>
                            <el-radio :label="1">单独自定义设置</el-radio>
                        </el-radio-group>
                        <div style="line-height: 24px;">
                            <span v-if="addAddGoodsData.mortgage_type===0">{{pointMarktingPoint}}</span>
                            <div style="margin-left: 110px;">
                                <span v-if="addAddGoodsData.mortgage_type===1">
                                    <div>
                                        <el-radio-group v-model="mortgage_num_type" :disabled="advance_sale_open">
                                            <el-radio :label="0">百分比</el-radio>
                                            <el-radio :label="1">固定金额</el-radio>
                                        </el-radio-group>
                                    </div>
                                    最多抵扣
                                    <el-input-number
                                    v-if="mortgage_num_type===0"
                                    class="input_width"
                                    style="margin-right:10px;width:120px;"
                                    size="mini"
                                    :controls="false"
                                    :precision="0"
                                    :min="0"
                                    :disabled="advance_sale_open"
                                    v-model="addAddGoodsData.mortgage_content"></el-input-number>
                                    <el-input-number
                                    :disabled="advance_sale_open"
                                    v-if="mortgage_num_type===1"
                                    class="input_width"
                                    style="margin-right:10px;width:120px;"
                                    size="mini"
                                    :controls="false"
                                    :precision="2"
                                    :min="0.01"
                                    v-model="addAddGoodsData.mortgage_content"></el-input-number>
                                    <span v-if="mortgage_num_type===0">%</span>元
                                    <p class="wf-gray-title">若商品存在多规格不同价格，建议使用%，否则可能存在亏损问题</p>
                                    <p class="wf-gray-title">如果设置0，则不支持积分抵扣 如果带%则为按成交价格的比例计算抵扣多少元</p>
                                    <el-checkbox-group v-model="addAddGoodsData.is_cumulative">
                                        <el-checkbox :disabled="advance_sale_open" label="允许多件累计抵扣"></el-checkbox>
                                    </el-checkbox-group>
                                </span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item class="label-left wf-point" label="分销设置" v-if="this.$store.state.type_id===3" prop="integral_content">
                        <el-radio-group v-model="addAddGoodsData.distribution_set" @change="distributionChange" :disabled="advance_sale_open">
                            <el-radio :label="0">统一规则</el-radio>
                            <el-radio :label="1">单独自定义设置</el-radio>
                        </el-radio-group>
                        <div style="line-height: 24px;">
                            <div v-if="addAddGoodsData.distribution_set===0">
                                <p>一级佣金比例 {{one_commission}}%</p>
                                <p>二级佣金比例 {{two_commission}}%</p>
                            </div>
                            <div style="margin-left: 110px;">
                                <span v-if="addAddGoodsData.distribution_set===1">
                                    <div>
                                        <el-radio-group v-model="addAddGoodsData.distribution_type" :disabled="advance_sale_open">
                                            <el-radio :label="0">百分比</el-radio>
                                            <el-radio :label="1">固定金额</el-radio>
                                        </el-radio-group>
                                    </div>
                                    一级佣金比例
                                    <el-input-number
                                    :disabled="advance_sale_open"
                                    v-if="addAddGoodsData.distribution_type===0"
                                    class="input_width"
                                    style="margin: 0 10px 10px 0;width:120px;"
                                    size="mini"
                                    :controls="false"
                                    :precision="0"
                                    :min="0"
                                    v-model="addAddGoodsData.first_commission"></el-input-number>
                                    <el-input-number
                                    :disabled="advance_sale_open"
                                    v-if="addAddGoodsData.distribution_type===1"
                                    class="input_width"
                                    style="margin: 0 10px 10px 0;width:120px;"
                                    size="mini"
                                    :controls="false"
                                    :precision="2"
                                    :min="0.01"
                                    v-model="addAddGoodsData.first_commission"></el-input-number><span v-if="addAddGoodsData.distribution_type===0">%</span>元
                                    <br/>
                                    二级佣金比例
                                    <el-input-number
                                    :disabled="advance_sale_open"
                                    v-if="addAddGoodsData.distribution_type===0"
                                    class="input_width"
                                    style="margin-right:10px;width:120px;"
                                    size="mini"
                                    :controls="false"
                                    :precision="0"
                                    :min="0"
                                    v-model="addAddGoodsData.second_commisstion"></el-input-number>
                                    <el-input-number
                                    :disabled="advance_sale_open"
                                    v-if="addAddGoodsData.distribution_type===1"
                                    class="input_width"
                                    style="margin-right:10px;width:120px;"
                                    size="mini"
                                    :controls="false"
                                    :precision="2"
                                    :min="0.01"
                                    v-model="addAddGoodsData.second_commisstion"></el-input-number><span v-if="addAddGoodsData.distribution_type===0">%</span>元
                                    <p class="wf-gray-title">如果带%则为按成交价格的比例计算佣金</p>
                                </span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="状态" prop="state" size="mini">
                        <el-col :span="12" class="wf-addgoods-name">
                            <el-select v-model="addAddGoodsData.state" @change="changeStatus" style="width:100px;">
                                <el-option
                                v-for="item in statusOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="是否推荐" prop="name" size="mini">
                        <el-col :span="12" class="wf-addgoods-name">
                            <el-select v-model="addAddGoodsData.recommend" @change="changeRecommend" style="width:100px;">
                                <el-option
                                v-for="item in recommend"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="详情" prop="details" size="mini">
                        <el-col :span="24" class="wf-addgoods-name">
                            <el-input type="textarea" :rows="4"  size="mini" v-model="addAddGoodsData.details" placeholder="请输入名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="详情图" size="mini" class="wf-detailImg">
                        <draggable class="list-group" element="ul" v-model="addAddGoodsData.detailImg" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                            <li v-for="(item, index) in addAddGoodsData.detailImg" :key="index" class="detailImg" @click="handleDetailImg(index)">
                                <el-upload :bindIndex="index" 
                                    :action="upLoadUrl"
                                    list-type="picture-card"
                                    :show-file-list="false"
                                    :before-upload="beforeUpload"
                                    :on-success="handleDetail">
                                    <img v-if="item.url" :src="item.url" class="avatar"/>
                                    </el-upload>
                                <div class="upload-icon">
                                    <el-row>
                                        <el-col :span="12" class="upload-icon-img">
                                            <i class="el-icon-view" ></i> <img v-if="item.url" :preview="index" :src="item.url" class="avatar"/>
                                        </el-col>
                                        <el-col :span="12">
                                            <i class="el-icon-delete" @click="handleRemoveD(index)"></i>
                                        </el-col>
                                    </el-row>
                                </div>
                            </li>
                        </draggable>
                        <li class="detailImg1" @click="handleDetailImg(-1)">
                            <el-upload 
                                :action="upLoadUrl"
                                list-type="picture-card"
                                :show-file-list="false"
                                :before-upload="beforeUpload"
                                :on-success="handleDetailAdd">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                         </li>
                        <el-col class="wf-help" >
                            <span >建议图片尺寸比例为1:1(建议不超过750×750 px), 小于2M, 图片可拖拽。</span>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="排序"  size="mini">
                        <el-col :span="12" class="wf-addgoods-name">
                            <el-input-number  size="mini" :controls="false" v-model="addAddGoodsData.orderby" ></el-input-number>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="label-left wf-point" label="快递运费">
                        <el-radio class="wf-freight-radio" v-model="addAddGoodsData.freight_type" :disabled="advance_sale_open" :label="0" @change="freightChange">店铺统一邮费</el-radio>
                        <el-select class="wf-freight-select" placeholder="未设置" v-model="freight_value" :disabled="advance_sale_open" size="mini">
                            <el-option
                            v-for="item in freight_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <i class="el-icon-refresh wf-cursor" @click="getShowTemplate"></i><el-button type="text" @click="getShowTemplate">刷新</el-button> <span class="wf-blue">|</span>
                        <i class="el-icon-circle-plus wf-cursor"></i><el-button type="text" @click="freightJumpFirst">新建</el-button>
                        <br/>
                        <el-radio class="wf-freight-radio" :disabled="advance_sale_open" v-model="addAddGoodsData.freight_type" :label="1" @change="freightChange">个性化运费模版</el-radio>
                        <el-select class="wf-freight-select" :disabled="advance_sale_open" placeholder="未设置" v-model="freight_id" size="mini" @change="handleFareOpt">
                            <el-option
                            v-for="item in personalise_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <i class="el-icon-refresh wf-cursor" @click="getFreightShow"></i><el-button type="text" @click="getFreightShow">刷新</el-button> <span class="wf-blue">|</span>
                        <i class="el-icon-circle-plus wf-cursor"></i><el-button type="text" @click="freightJumpSecond">新建</el-button>
                    </el-form-item>
                    <el-form-item class="label-left" label="预售">
                        <div>
                            <el-checkbox v-model="advance_sale" :true-label="1" :false-label="0" @change="changePresale" :disabled="advance_sale_open">暂无现货，下单后，过段时间才能发货</el-checkbox>
                        </div>
                        <div v-if="advance_sale===1">
                            <el-radio v-model="advance_state" :label="0" :disabled="advance_sale_open">全款预售</el-radio>
                            <el-radio v-model="advance_state" :label="1" :disabled="advance_sale_open">定金预售</el-radio>
                            <div v-if="advance_state===0">
                                <el-radio v-model="time_state" :label="0" :disabled="advance_sale_open">
                                    <el-date-picker
                                    v-model="fullShipDate"
                                    :disabled="advance_sale_open"
                                    type="datetime"
                                    placeholder="选择日期"
                                    size="mini"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width:200px;margin-bottom:10px;">
                                    </el-date-picker>
                                </el-radio>
                                开始发货
                                <br/>
                                <el-radio v-model="time_state" :label="1" :disabled="advance_sale_open">
                                    付款成功
                                </el-radio>
                                <el-input-number
                                :disabled="advance_sale_open"
                                v-model="fullShipDay"
                                :controls="false"
                                :precision="0"
                                :min="1"
                                :max="60"
                                size="mini"></el-input-number>
                                天后发货
                                <p class="wf-gray-title">1-60天后发货，请务必按照约定时间发货以免引起客户投诉。</p>
                            </div>
                            <div v-if="advance_state===1">
                                <p class="wf-gray-title">预使用定金翻倍功能，请前往营销工具页面设置</p>
                                <p class="wf-gray-title">不可与其他优惠叠加使用（其他优惠：优惠券、满减、积分抵现、折扣卡、储值卡支付）</p>
                                <el-form label-position="right">
                                    <el-form-item label="定金" style="margin-bottom:10px;">
                                        <el-select v-model="front_money" :disabled="advance_sale_open" placeholder="请选择" size="mini" style="width:120px;">
                                            <el-option
                                            v-for="item in frontOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span v-if="min_price>0">￥{{min_price*front_money/100}}</span> <span v-if="max_price>0">- {{max_price*front_money/100}}</span>
                                        <span class="wf-gray-title">定金必须小于等于全款的20%</span>
                                    </el-form-item>
                                    <el-form-item label="定金支付时间" style="margin-bottom:10px;">
                                        <el-date-picker
                                        :disabled="advance_sale_open"
                                        v-model="front_start_time"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        size="mini"
                                        :picker-options="pickerOptions"
                                        :default-time="['00:00:00', '23:59:59']"
                                        @change="frontTimeChange">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="尾款支付时间" style="margin-bottom:10px;">
                                        <el-date-picker
                                        :disabled="advance_sale_open"
                                        v-model="tail_start_time"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :default-time="['00:00:00', '23:59:59']"
                                        size="mini"
                                        :picker-options="pickerOptionsEnd"
                                        @change="tailTimeChange"
                                        minTime="08:23">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="发货时间" style="margin-bottom:10px;">
                                        <el-radio v-model="time_state" :label="0" :disabled="advance_sale_open">
                                            <el-date-picker
                                            :disabled="advance_sale_open"
                                            v-model="depositShipDate"
                                            type="datetime"
                                            placeholder="选择日期"
                                            size="mini"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            style="width:200px;margin-bottom:10px;"
                                            :picker-options="pickerOptionsShip">
                                            </el-date-picker>
                                        </el-radio>
                                        开始发货
                                        <br/>
                                        <el-radio style="margin-left:68px;" v-model="time_state" :label="1" :disabled="advance_sale_open">
                                            尾款支付
                                        </el-radio>
                                        <el-input-number
                                        :disabled="advance_sale_open"
                                        v-model="depositShipDay"
                                        :controls="false"
                                        :precision="0"
                                        :min="1"
                                        :max="60"
                                        size="mini"></el-input-number>
                                        天后发货
                                        <p class="wf-gray-title" style="margin-left:68px;">1-60天后发货，请务必按照约定时间发货以免引起客户投诉。</p>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item >
                        <el-col :span="12" class="wf-addgoods-name">
                        <el-button :loading="saveLoading" size="mini" type="primary" @click="handleSave('addAddGoodsData')">保存</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>
<script>
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
import {getTypeindex ,getTBGoodInfo ,putObject ,save, getPointMarkting,getEditData,
         addGoodGetDisSetting, addGoodGetShowTemplate, addGoodGetFreightShow ,goodGroupUnPage } from '@/server/addgoods';
import draggable from "vuedraggable";
import {imgFormat} from "@/untils/common.js";
import sku from "@/components/WF_admin/shop_admin/shop_list/sku";
import { pointMarktingSwitchData } from '@/server/pointMarkting.js';
export default {
    data() {
        return {
            advance_sale_open: false,
            max_price: 0,
            min_price: 0,
            pickerOptions: {
                disabledDate: (time) => {
                    return time.getTime() <= new Date(new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000);//减去一天的时间代表可以选择同一天;
                }
            },
            pickerOptionsEnd: {
                disabledDate: (time) => {
                    let that = this
                    if(this.front_start_time!==null&&this.front_start_time.length>0){
                        return time.getTime() <= new Date(new Date(that.front_start_time[1]).getTime()-24*60*60*1000)
                    }else{
                        return time.getTime() <= new Date(new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000);
                    }
                }
            },
            pickerOptionsShip: {
                disabledDate: (time) => {
                    let that = this
                    if(this.tail_start_time!==null&&this.tail_start_time.length>0){
                        return time.getTime() <= new Date(new Date(that.tail_start_time[1]).getTime()-24*60*60*1000)
                    }else{
                        return time.getTime() <= new Date(new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000);
                    }
                }
            },
            fullShipDate: "", // 全款预售发货时间
            fullShipDay: undefined, // 全款预售发货天数
            front_start_time: [], // 支付定金开始、结束时间
            tail_start_time: [], // 支付尾款开始、结束时间
            depositShipDate: "", // 定金预售发货时间
            depositShipDay: undefined, // 定金预售发货天数
            advance_sale: 0, // 0普通商品 1预售商品
            advance_state: 0, // 0全款预售 1定金预售
            time_state: 0, // 全款预售时间类型
            front_money: 1, // 定金
            frontOptions: [], // 定金选择
            otheruuid:require('uuid/v1')(),
            memberPrice: [], // 获取会员等级前三个
            showVersion:false,//控制版本提示
            vip_disabled: true,
            freight_id: undefined, // 个性化运费模板
            freight_options: [], // 店铺统一运费
            personalise_options: [], // 个性化运费模板
            freight_value: "", // 运费规则
            one_commission: "", // 获取分销一级佣金
            two_commission: "", //  获取分销二级佣金
            mortgage_num_type: 0, // 积分抵现百分比或金额
            pointCreditShow: false, // 显示积分抵现
            integral_num_type: 0, // 赠送积分百分比或积分
            mainSwitch: false, // 控制赠送积分、积分抵现显示
            labelPosition:'right',
            flagImageUrl:'',
            flagVisible:false,
            loading:false, //轮播图
            saveLoading:false,
            loadingGetTB:false,
            handleDetailImgIndex:0,
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            upfileVideos:this.url+'supper/attachment/upfileVideos', // 上传大附件组件的action绑定路径,
            options:[],
            defaultProps: { // 分类级联选择器配置选项
                value: 'id',
                label: 'type_name',
                children: 'children'
            },
            statusOption:[{
                value: '0',
                label: '下架'
            },{
                value: '1',
                label: '上架'
            }],
            recommend: [{
                value: '0',
                label: '否'
            },{
                value: '1',
                label: '是'
            }],
            pointMarktingId: "",
            pointMarktingPrice: "", // 交易得积分
            addAddGoodsData:{
                dialogImageUrl:[],
                master_graph:'',//主图
                taobao_url: "",
                recommend: '1',
                pro_title: "",//商品标题
                description: "",//描述
                details: "",//详情
                selectedOptions: [],
                selOptVal:0,
                state: '1', // 默认状态为上架
                detailImg: [],//详情图
                orderby:undefined,
                virtual_sales:undefined,
                original_price:undefined,
                integral_content: undefined, // 赠送积分
                integral_type: 0, // 赠送积分类型
                skuDetails:{
                    sku:[], //规格
                    sku_info:[], //规格参数
                },
                mortgage_type: 0, // 积分抵现类型
                mortgage_content: undefined, // 积分抵现金额
                is_cumulative: false, // 允许多件累计抵扣
                distribution_set: 0, // 分销设置类型
                first_commission: undefined, // 一级佣金
                second_commisstion: undefined, // 二级佣金
                distribution_type: 0, // 佣金类型
                freight_type: 0, // 运费类型
                good_videos:"", //视频
                group_type_all:[], //商品分组
            },
            fileListSwiper:[],
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            rules:{
                selectedOptions: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                master_graph: [
                    { required: true, message: '请上传主图', trigger: 'change' }
                ],
                dialogImageUrl: [
                    { required: true, message: '请上传轮播图', trigger: 'change' }
                ],
                pro_title: [
                    { required: true, message: '商品标题不能为空', trigger: 'blur' }
                ],
                original_price: [
                    { required: true, message: '请输入原价', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
                skuDetails: [
                    { required: true, message: '请将规格明细填写完整', trigger: 'change' }
                ],
            },
            group_type_allVal: [],
            flagVideo:false
        }
    },
    components: {
        draggable,
        sku,
        versionCom
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
    mounted(){
        //初始化商品分类
        this.initType();
        //初始化轮播图视频
        this.initVideo();
        //获取积分数据
        this.getPointMarkting();
        //初始化编辑数据
        let that=this;
        this.$nextTick(()=>{
            if(that.$route.query.param==='edit'){
                that.$route.meta.title="编辑商品";
                that.initPageEdit();
            }else{
                that.$route.meta.title="新建商品";
            }
        })
        
        this.getPointMarktingSwitch() // 获取积分营销外部总开关
        this.getDisSetting() // 获取分销设置数据
        this.getShowTemplate() // 获取店铺统一运费
        this.getFreightShow() // 获取个性化运费模板
        this.handleVisibleChange(true) //初始化商品分组
        for(let i=1;i<20+1;i++){
            this.frontOptions.push({value:i,label:i+"%"})
        }
    },
    methods: {
        frontTimeChange(date){
            if(this.tail_start_time!==null&&date!==null&&this.tail_start_time.length>0&&date.length>0){
                let front_start_time = new Date(new Date(date[1]).getTime())
                let tail_start_time = new Date(new Date(this.tail_start_time[0]).getTime())
                if(front_start_time>tail_start_time){
                    this.tail_start_time = []
                }
            }
        },
        tailTimeChange(date){
            if(this.depositShipDate!==null&&date!==null&&this.depositShipDate!==""&&date.length>0){
                let tail_start_time = new Date(new Date(date[1]).getTime())
                let depositShipDate = new Date(new Date(this.depositShipDate).getTime())
                if(tail_start_time>depositShipDate){
                    this.depositShipDate = ""
                }
            }
        },
        handleVision(){
            this.$router.push({path:'/wf/admin/shop/publish',name:'publish'});
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件`);
        },
        handleRemoveVideo(file, fileList){
            this.addAddGoodsData.good_videos ='';
        },
        handleVisibleChange(flag){
            if(flag){
                let that = this
                let data = { 
                    pro_id: parseInt(localStorage.getItem('proId')),
                    token: localStorage.getItem('userId'),
                }
                goodGroupUnPage(data).then((res)=>{
                    if(res.data.code===200){
                        that.addAddGoodsData.group_type_all=res.data.data;
                    }else{
                        that.$message.error(res.data.msg+'600A00100');
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误!'+'600B0099');
                })
            }
        },
        vipPriceMax(val,index,i){
            if(val>this.sku[index].sku_price){
                this.$message.warning("会员价不能大于原价")
                if(i===0){
                    this.sku[index].first_level = undefined
                }else if(i===1){
                    this.sku[index].second_level = undefined
                }else if(i===2){
                    this.sku[index].third_level = undefined
                }
            }
        },
        freightJumpFirst(){
            let classJump = this.$router.resolve({path:'/wf/admin/shop/freight_management'})
            window.open(classJump.href, '_blank');
        },
        freightJumpSecond(){
            let classJump = this.$router.resolve({path:"/wf/admin/shop/freight_management/addSpecialModal"})
            window.open(classJump.href, '_blank');
        },
        initVideo(){
            let that = this
            getAuditApplicationList(23).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===false){
                        that.flagVideo=false;
                    }else{
                        that.flagVideo=true;
                    }
                }else{
                    that.$message.error(res.data.msg+'600A00104');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!600B00103');
            })
        },
        freightChange(val){ // 快递运费版本升级提示
            let that = this
            if(val===1){
                getAuditApplicationList(7).then((res)=>{
                    if(res.data.code===200){
                        if(res.data.data===false){
                            that.showVersion = true
                            that.addAddGoodsData.freight_type = 0
                            that.freight_id="";
                        }else{
                            that.freight_value="";
                            let arr = {};
                            that.personalise_options.some(function (n){
                                if(n.value === that.freight_id){
                                    arr=n;
                                    return true;
                                }
                            })
                            if(arr.state===1){
                                that.$store.commit({
                                    type:'getWeightMust',
                                    weightMust:true,
                                });
                            }else{
                                that.$store.commit({
                                    type:'getWeightMust',
                                    weightMust:false,
                                });
                            }
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }else{
                this.freight_id="";
                this.$store.commit({
                    type:'getWeightMust',
                    weightMust:false,
                });
            }
        },
        distributionChange(val){ // 分销设置版本升级提示
            if(val===1){
                getAuditApplicationList(6).then((res)=>{
                    if(res.data.code===200){
                        if(res.data.data===false){
                            this.showVersion = true
                            this.addAddGoodsData.distribution_set = 0
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        mortgageChange(val){ // 积分抵现版本升级提示
            if(val===1){
                getAuditApplicationList(5).then((res)=>{
                    if(res.data.code===200){
                        if(res.data.data===false){
                            this.showVersion = true
                            this.addAddGoodsData.mortgage_type = 0
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        integralChange(val){ // 赠送积分版本升级提示
            if(val===1){
                getAuditApplicationList(4).then((res)=>{
                    if(res.data.code===200){
                        if(res.data.data===false){
                            this.showVersion = true
                            this.addAddGoodsData.integral_type = 0
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        handleCloseVersion(){ // 关闭版本更新提示弹框
            this.showVersion=false;
        },
        getFreightShow(){ // 获取个性化运费模板
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
                loading.close()
            }, 5000);
            let that = this
            let data = {
                secret: localStorage.getItem("secretId"),
                page: 1
            }
            addGoodGetFreightShow(data).then((res)=>{
                loading.close()
                if(res.data.code===200){
                    if(res.data.data.detail.length>0){
                        that.personalise_options = []
                        let type
                        res.data.data.detail.forEach(el => {
                            if(el.state===0){
                                type = "按件"
                            }else{
                                type = "按重"
                            }
                            that.personalise_options.push({
                                value:el.id,
                                label:type+"："+el.name,
                                type:type,
                                state:el.state
                            })
                        });
                        if(that.$route.query.param==='edit'){
                            if(that.addAddGoodsData.freight_type===1){
                                that.personalise_options.some((item)=>{
                                    if(item.value===that.addAddGoodsData.freight_id){
                                        //1 按重
                                        if(item.state===1){
                                            that.$store.commit({
                                                type:'getWeightMust',
                                                weightMust:true,
                                            });
                                        }else{
                                            that.$store.commit({
                                                type:'getWeightMust',
                                                weightMust:false,
                                            });
                                        }
                                        return true;
                                    }
                                })
                            }
                        }
                    }
                }else{
                    that.$message.error(res.data.msg+"600A0010");
                }
            }).catch((err)=>{
                loading.close()
                that.$message.error('系统出错，请联系管理员!600B0009');
            })
        },
        getShowTemplate(){ // 获取店铺统一运费
            const loading = this.$loading({
                lock: true,
                text: '系统正在为您智能获取相关数据...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
                loading.close()
            }, 5000);
            let that = this
            let data = { secret: localStorage.getItem("secretId") }
            addGoodGetShowTemplate(data).then((res)=>{
                loading.close()
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
                            that.freight_options = [{value:"0",label:"件数"},{value:"1",label:"重量"}]
                            that.freight_value = "0"
                        }else if(state1===true){
                            that.freight_options = [{value:"0",label:"件数"}]
                            that.freight_value = "0"
                        }else if(state2===true){
                            that.freight_options = [{value:"1",label:"重量"}]
                            that.freight_value = "1"
                        }else{
                            that.freight_options = []
                            that.freight_value =""
                        }
                    }
                }else{
                    that.$message.error(res.data.msg+'600A0012');
                }
            }).catch((err)=>{
                loading.close()
                that.$message.error('系统出错，请联系管理员!600B0011');
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
        getPointMarkting(){  // 获取积分营销数据
            let that = this
            let data={
                secret: localStorage.getItem('secretId')
            };
            getPointMarkting(data).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data.length>0){
                        if(res.data.data[0].state===1||res.data.data[0].state===3){
                            that.pointMarktingId = res.data.data[0].id
                            that.pointMarktingPrice = res.data.data[0].price
                        }else{
                            that.addAddGoodsData.integral_type = ""
                        }
                        if(res.data.data[0].status===1){
                            that.pointCreditShow = true
                            if(res.data.data[0].cash_limit===0){
                                that.pointMarktingPoint = res.data.data[0].cash_integral+"积分=1元，购物消费不限制积分使用数量"
                            }else if(res.data.data[0].cash_limit===1){
                                that.pointMarktingPoint = res.data.data[0].cash_integral+"积分=1元，单笔消费最多使用"+res.data.data[0].offset_value+"积分"
                            }else if(res.data.data[0].cash_limit===2){
                                that.pointMarktingPoint = res.data.data[0].cash_integral+"积分=1元，单笔消费最少使用"+res.data.data[0].offset_value+"积分"
                            }else if(res.data.data[0].cash_limit===3){
                                that.pointMarktingPoint = res.data.data[0].cash_integral+"积分=1元，单笔消费最多抵扣商品总价"+res.data.data[0].offset_value+"%金额"
                            }
                        }
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((res)=>{
                that.$message.error('网络错误！');
            })
        },
        initPageEdit(){
            let data={
                secret: localStorage.getItem('secretId'),
                id:this.$route.query.id.toString()
            };
            let that=this;
            getEditData(data).then((res)=>{
                if(res.data.code===200){
                    that.addAddGoodsData.pro_title=res.data.data.good_name;
                    if(res.data.data.original_price||res.data.data.original_price==0){
                        that.addAddGoodsData.virtual_sales=res.data.data.virtual_sales;
                    }
                    that.addAddGoodsData.original_price=res.data.data.original_price;
                    that.addAddGoodsData.master_graph=res.data.data.master_graph;
                    that.addAddGoodsData.description=res.data.data.good_describe;
                    if(res.data.data.virtual_sales||res.data.data.virtual_sales==0){
                        that.addAddGoodsData.virtual_sales=res.data.data.virtual_sales;
                    }
                    that.addAddGoodsData.details=res.data.data.good_details;
                    that.addAddGoodsData.recommend=res.data.data.recommend.toString();
                    that.addAddGoodsData.state=res.data.data.state.toString();
                    that.addAddGoodsData.orderby=res.data.data.orderby;
                    that.addAddGoodsData.selectedOptions=[res.data.data.parent_type_id,res.data.data.good_type];
                    that.addAddGoodsData.selOptVal=res.data.data.good_type;
                    that.addAddGoodsData.good_videos=res.data.data.good_videos;
                    // that.addAddGoodsData.group_type_all=res.data.data.group_type_all;
                    that.group_type_allVal=Array.from(res.data.data.good_group_type,item=>item.id);
                    that.fileListSwiper=res.data.data.broadcast.split(',').map((item,i)=>{
                        return {
                            name:'',
                            url: item,
                        }
                    });
                    that.addAddGoodsData.dialogImageUrl=res.data.data.broadcast.split(',').map((item,i)=>{
                        return {
                                url: item,
                                response:{
                                    code:i,
                                    data:{
                                        src:item
                                    }
                                }
                            }
                    });
                    if(res.data.data.good_detail_pics){
                        that.addAddGoodsData.detailImg=res.data.data.good_detail_pics.split(',').map((item,i)=>{
                            return {
                                name:'',
                                url: item,
                            }
                        });
                    }
                   
                    that.addAddGoodsData.integral_type = res.data.data.integral_type
                    if(res.data.data.integral_type===0){
                        that.addAddGoodsData.integral_content = undefined
                    }else{
                        if(res.data.data.integral_content){
                            if(res.data.data.integral_content.toString().indexOf("%")===-1){
                                that.integral_num_type = 1
                                that.addAddGoodsData.integral_content = res.data.data.integral_content
                            }else{
                                that.addAddGoodsData.integral_content = res.data.data.integral_content.replace(/%/g,"")
                            }
                        }
                    }
                    if(res.data.data.mortgage_type===1){
                        that.addAddGoodsData.mortgage_type = 1
                        if(res.data.data.mortgage_content.toString().indexOf("%")===-1){
                            that.mortgage_num_type = 1
                            that.addAddGoodsData.mortgage_content = res.data.data.mortgage_content
                        }else{
                            that.addAddGoodsData.mortgage_content = res.data.data.mortgage_content.replace(/%/g,"")
                        }
                        if(res.data.data.is_cumulative===1){
                            that.addAddGoodsData.is_cumulative = true
                        }else{
                            that.addAddGoodsData.is_cumulative = false
                        }
                    }
                    if(res.data.data.distribution_set===1){
                        that.addAddGoodsData.distribution_set = 1
                        if(res.data.data.distribution_type==1){
                            that.addAddGoodsData.distribution_type = 1
                            that.addAddGoodsData.first_commission = res.data.data.first_commission
                            that.addAddGoodsData.second_commisstion = res.data.data.second_commisstion
                        }else{
                            that.addAddGoodsData.first_commission = res.data.data.first_commission.replace(/%/g,"")
                            that.addAddGoodsData.second_commisstion = res.data.data.second_commisstion.replace(/%/g,"")
                        }
                    }
                    if(res.data.data.freight_type===1){
                        that.addAddGoodsData.freight_type = 1
                        if(res.data.data.freight_id){
                            that.freight_id = parseInt(res.data.data.freight_id)  
                            if(that.freight_id){
                                let arr = {};
                                that.personalise_options.some(function (n){
                                    if(n.value === that.freight_id){
                                        arr=n;
                                        return true;
                                    }
                                    return 
                                })
                                if(arr.state===1){
                                    that.$store.commit({
                                        type:'getWeightMust',
                                        weightMust:true,
                                    });
                                }else{
                                    that.$store.commit({
                                        type:'getWeightMust',
                                        weightMust:false,
                                    });
                                }    
                            }else{
                                that.$store.commit({
                                    type:'getWeightMust',
                                    weightMust:false,
                                });
                            }
                        }else{
                            that.freight_id=undefined
                        }       
                        that.freight_value="";
                    }else{
                        that.addAddGoodsData.freight_type = 0
                        if(res.data.data.freight_id==0&&that.freight_options.length>0){
                            that.freight_value =res.data.data.freight_id+"";
                            
                        }else{
                            that.freight_value = "";
                        }
                        that.freight_id='';
                        that.$store.commit({
                            type:'getWeightMust',
                            weightMust:false,
                        });
                    }
                    // 预售回填
                    that.advance_sale = res.data.data.advance_sale
                    if(res.data.data.advance_sale===1){ // 开启预售
                        that.advance_state = res.data.data.advance_state
                        that.time_state = res.data.data.time_state // 发货时间类型
                        if(res.data.data.advance_state===0){ // 全款
                            if(res.data.data.time_state===0){
                                that.fullShipDate = res.data.data.advance_time
                            }else if(res.data.data.time_state===1){
                                that.fullShipDay = res.data.data.advance_time
                            }
                        }else if(res.data.data.advance_state===1){ // 定金
                            that.front_money = res.data.data.front_money
                            that.front_start_time = [res.data.data.front_start_time,res.data.data.front_end_time]
                            that.tail_start_time = [res.data.data.tail_start_time,res.data.data.tail_end_time]
                            if(res.data.data.time_state===0){
                                that.depositShipDate = res.data.data.advance_time
                            }else if(res.data.data.time_state===1){
                                that.depositShipDay = res.data.data.advance_time
                            }
                        }
                    }
                    if(res.data.data.front_state===1){
                        that.advance_sale_open = true
                    }

                    that.$store.commit({
                        type:'getMember_type',
                        member_type:res.data.data.member_type,
                    });
                     /**
                     * @param spec_name 规格名
                     * @param spec_son_name 规格值
                     * @param sku_info 规格集合信息
                     */
                    that.$store.commit({
                        type:'getSku_info',
                        spec_name:res.data.data.spec_name,
                        spec_son_name:res.data.data.spec_son_name,
                        sku_info:res.data.data.sku_info
                    });
                    /**
                     * @param 标记,使用完后需关闭标记
                     */
                    that.$store.commit({
                        type:'getSkuInfoFlag',
                        skuInfoFlag:true,
                    });
                    /**
                     * @param 标记,使用完后需关闭标记
                     */
                    that.$store.commit({
                        type:'getSkuEditFlag',
                        skuEditFlag:true,
                    });
                }else{
                    that.$message.error(res.data.msg+"600A0014");
                }
            }).catch((res)=>{
                that.$message.error('网络错误!600B0013');
            })
        },
        handleSkuData(sku,tableDataApp){
            //处理sku
            let that=this;
            that.addAddGoodsData.skuDetails.sku=[];
            sku.forEach((item,i)=>{
                that.addAddGoodsData.skuDetails.sku.push({spec_name:item.val,id:item.id,son_name:[]})
                item.Children.forEach((itemi,j)=>{
                    if(itemi.val){
                        that.addAddGoodsData.skuDetails.sku[i].son_name.push({spec_name:itemi.val,id:itemi.id})
                    }
                })
            })
            //处理sku_info
            that.addAddGoodsData.skuDetails.sku_info=[];
            tableDataApp.forEach((item,i)=>{
                let spec_name='';
                //待处理编辑spec_name
                let valAssemble='';
                if(item.valAssemble){
                    valAssemble=item.valAssemble.join(',')
                }
                that.addAddGoodsData.skuDetails.sku_info.push({
                    sku_price:item.sku_price,
                    sku_stock:item.sku_stock,
                    spec_name:valAssemble,/*  */
                    sku_code:item.sku_code,
                    sku_thumbnail:item.sku_thumbnail,
                    weight:item.weight
                });
                if(item.first_level){
                    that.addAddGoodsData.skuDetails.sku_info[i].first_level=item.first_level;
                }
                if(item.second_level){
                    that.addAddGoodsData.skuDetails.sku_info[i].second_level=item.second_level;
                }
                if(item.third_level){
                    that.addAddGoodsData.skuDetails.sku_info[i].third_level=item.third_level;
                }
            })
            let maxNum = Math.max.apply(Math,that.addAddGoodsData.skuDetails.sku_info.map((item)=>{
                if(item.sku_price!==undefined){
                    return item.sku_price
                }else{
                    return ""
                }
            }))
            let minNum = Math.min.apply(Math,that.addAddGoodsData.skuDetails.sku_info.map(item=>{
                if(item.sku_price!==undefined){
                    return item.sku_price
                }else{
                    return ""
                }
            }))
            this.max_price = maxNum
            this.min_price = minNum
        },
        handleSave(formName){
            let that=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(that.$refs['sku'].validateForm()){
                        //broadcast 轮播
                        let arrAroadcast=that.addAddGoodsData.dialogImageUrl.map((item)=>item.response.data.src);
                        //good_detail_pics 详情图
                        let arrGood_detail_pics=that.addAddGoodsData.detailImg.map((item)=>item.url);
                        let is_cumulative
                        if(this.addAddGoodsData.is_cumulative===false){
                            is_cumulative = 0
                        }else{
                            is_cumulative = 1
                        }
                        let freight_id=0;
                        if(this.addAddGoodsData.freight_type===0){
                            freight_id = this.freight_value
                        }else{
                            freight_id = this.freight_id
                        }
                        let integral_content
                        if(this.pointMarktingId!=""){
                            if(this.addAddGoodsData.integral_type===0){
                                integral_content = 0
                            }else{
                                if(this.integral_num_type===0){
                                    integral_content = this.addAddGoodsData.integral_content+"%"
                                }else{
                                    integral_content = this.addAddGoodsData.integral_content
                                }
                            }
                        }else{
                            integral_content = 0
                        }
                        let mortgage_content
                        if(this.addAddGoodsData.mortgage_type===0){
                            mortgage_content = ""
                            is_cumulative = 0
                        }else{
                            if(this.mortgage_num_type===0){
                                mortgage_content = this.addAddGoodsData.mortgage_content+"%"
                            }else{
                                mortgage_content = this.addAddGoodsData.mortgage_content
                            }
                        }
                        let distribution_type
                        let first_commission
                        let second_commisstion
                        if(this.addAddGoodsData.distribution_set===0){
                            distribution_type = ""
                            first_commission = ""
                            second_commisstion = ""
                        }else{
                            distribution_type = this.addAddGoodsData.distribution_type
                            if(this.addAddGoodsData.distribution_type===0){
                                first_commission = this.addAddGoodsData.first_commission+"%"
                                second_commisstion = this.addAddGoodsData.second_commisstion+"%"
                            }else{
                                first_commission = this.addAddGoodsData.first_commission
                                second_commisstion = this.addAddGoodsData.second_commisstion
                            }
                        }
                        let data = {
                            secret: localStorage.getItem('secretId'),
                            master_graph : that.addAddGoodsData.master_graph,
                            good_videos:that.addAddGoodsData.good_videos,
                            good_name  :that.addAddGoodsData.pro_title,
                            broadcast: arrAroadcast.join(','),
                            good_describe: that.addAddGoodsData.description,
                            virtual_sales: that.addAddGoodsData.virtual_sales,
                            original_price : that.addAddGoodsData.original_price,
                            good_details : that.addAddGoodsData.details,
                            state : that.addAddGoodsData.state,
                            recommend:that.addAddGoodsData.recommend,
                            spec_name: that.addAddGoodsData.skuDetails.sku,
                            sku_info : that.addAddGoodsData.skuDetails.sku_info,
                            vnarious: 1,
                            good_type: that.addAddGoodsData.selOptVal,
                            orderby: that.addAddGoodsData.orderby,
                            good_detail_pics: arrGood_detail_pics.join(','),
                            integral_type: that.addAddGoodsData.integral_type,
                            integral_content: integral_content,
                            is_cumulative: is_cumulative,
                            mortgage_type: that.addAddGoodsData.mortgage_type,
                            mortgage_content: mortgage_content,
                            distribution_set: that.addAddGoodsData.distribution_set,
                            distribution_type: distribution_type,
                            first_commission: first_commission,
                            second_commisstion: second_commisstion,
                            freight_type: that.addAddGoodsData.freight_type,
                            freight_id: freight_id,
                            member_type: that.$store.state.member_type,
                            advance_sale: that.advance_sale
                        }
                        if(that.advance_sale===1){
                            if(that.advance_state!==0&&that.advance_state!==1){
                                that.$message.warning("开启预售后，请选择全款预售或定金预售")
                                return
                            }
                            data.advance_state = that.advance_state
                            data.time_state = that.time_state
                            if(that.advance_state===0){
                                if(that.time_state===0){
                                    if(that.fullShipDate!==""&&that.fullShipDate!==null){
                                        data.advance_time = that.fullShipDate
                                    }else{
                                        that.$message.warning("请选择发货日期")
                                        return
                                    }
                                }else if(that.time_state===1){
                                    if(that.fullShipDay!==undefined){
                                        data.advance_time = that.fullShipDay
                                    }else{
                                        that.$message.warning("请填写发货时间")
                                        return
                                    }
                                }else{
                                    that.$message.warning("请选择一种发货时间")
                                    return
                                }
                            }else if(that.advance_state===1){
                                data.front_money = that.front_money
                                if(that.front_start_time!==null&&that.front_start_time!==undefined&&that.front_start_time.length>0){
                                    data.front_start_time = that.front_start_time[0]
                                    data.front_end_time = that.front_start_time[1]
                                }else{
                                    that.$message.warning("请选择定金支付时间")
                                    return
                                }
                                if(that.tail_start_time!==null&&that.tail_start_time!==undefined&&that.tail_start_time.length>0){
                                    data.tail_start_time = that.tail_start_time[0]
                                    data.tail_end_time = that.tail_start_time[1]
                                }else{
                                    that.$message.warning("请选择尾款支付时间")
                                    return
                                }
                                if(that.time_state===0){
                                    if(that.depositShipDate!==""&&that.depositShipDate!==null){
                                        data.advance_time = that.depositShipDate
                                    }else{
                                        that.$message.warning("请选择发货日期")
                                        return
                                    }
                                }else if(that.time_state===1){
                                    if(that.depositShipDay!==undefined){
                                        data.advance_time = that.depositShipDay
                                    }else{
                                        that.$message.warning("请填写发货时间")
                                        return
                                    }
                                }else{
                                    that.$message.warning("请选择一种发货时间")
                                    return
                                }
                            }
                        }
                        if(that.$route.query.param==='edit'){
                            let good_group_id=that.group_type_allVal.join(',');
                            data.id=that.$route.query.id;
                            data.good_group_id=good_group_id
                        }
                        that.saveLoading=true;
                        save(data).then((res)=>{
                            that.saveLoading=false;
                            if(res.data.code===200){
                                if(that.$route.query.param==='edit'){
                                    that.$message.success('修改成功');
                                    if(that.$route.query.page){
                                        localStorage.setItem('page',that.$route.query.page); 
                                    }
                                }else{
                                    that.$message.success('添加成功');
                                }
                                that.$router.push({path:'/wf/admin/shop/newshop_list'});
                            }else{
                                that.$message.error(res.data.msg+"600A0016");
                            }
                        }).catch((res)=>{
                            that.saveLoading=false;
                            that.$message.error('网络错误!600B0015');
                        })
                    }else{
                        that.$message.error('请将规格明细填写完整或填写正确');
                        return false;
                    }
                }else{
                    that.$message.error('请将信息填写完整或填写正确');
                    return false;
                }
            });
        },
        handleDetailImg(i){
            this.handleDetailImgIndex=i;
        },
        beforeUpload(file) {  //图片进行限制
            let size = file.size/1024/1024;
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }else{
                return true
            }
            if(size>2){
                this.$message.warning("图片不能大于2M");
                return false;
            }else{
                return true;
            }
        },
        handleDetail(res,file,fileList) { //详情图上传
            if(res.code==0){
                let data={
                    url: fileList[fileList.length-1].response.data.src,
                    response:{
                        code:0,
                        data:{
                            src:fileList[fileList.length-1].response.data.src
                        }
                    }
                };
                this.addAddGoodsData.detailImg.splice(this.handleDetailImgIndex,1,data);
            }else{
                this.$message.error("图片上传失败");
            }
        },
        handleDetailAdd(res,file,fileList){
            if(res.code==0){
                this.addAddGoodsData.detailImg.push({
                    url: fileList[fileList.length-1].response.data.src,
                    response:{
                        code:0,
                        data:{
                            src:fileList[fileList.length-1].response.data.src
                        }
                    }
                });
                this.addAddGoodsData.detailImg = this.addAddGoodsData.detailImg;
            }else{
                this.$message.error("图片上传失败");
            }
        },
        changeSelect(e){
            this.addAddGoodsData.selectedOptions = e;
            this.addAddGoodsData.selOptVal=e[1];
        },
        changeStatus(e){
            //状态改变回调函数
        },
        changeRecommend(e){
            //是否推荐回调函数
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        initType(){
            let data={
                secret:localStorage.getItem('secretId'),
                page:1
            };
            let that=this;
            getTypeindex(data).then((res)=>{
                if(res.data.code===1){
                    res.data.data.forEach((el,i) => {
                        if(el.children||el.children.length===0){
                            el.children.forEach(element => {
                                if(!element.children||element.children.length===0){
                                    delete element.children;
                                }
                            });
                        }else{
                            delete el.children;
                        }
                    });
                    that.options = res.data.data;
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((res)=>{
                that.$message.error('网络错误');
            })
        },
        taoBaoCollection(){
            let data={
                url:this.addAddGoodsData.taobao_url,
            }
            this.loadingGetTB=true;
            let that=this;
            getTBGoodInfo(data).then((res)=>{
                if(res.data.code===200){
                    that.addAddGoodsData.pro_title=res.data.data.name;
                    if(res.data.data.original_price){
                        that.addAddGoodsData.original_price=res.data.data.original_price;
                    }
                    that.fileListSwiper=res.data.data.rotation_chart.split(',').map((item,i)=>{
                        return {
                            name:'',
                            url: item,
                        }
                    });
                    that.addAddGoodsData.dialogImageUrl=res.data.data.rotation_chart.split(',').map((item,i)=>{
                        return {
                                url: item,
                                response:{
                                    code:i,
                                    data:{
                                        src:item
                                    }
                                }
                            }
                    });
                    that.addAddGoodsData.detailImg=res.data.data.detail_pics.split(',').map((item,i)=>{
                        return {
                            name:'',
                            url: item,
                        }
                    });
                    that.handleCDNImg(res.data.data.master_graph);
                    /**
                     * @param spec_name 规格名
                     * @param spec_son_name 规格值
                     * @param sku_info 规格集合信息
                     */
                    that.$store.commit({
                        type:'getSku_info',
                        spec_name:res.data.data.spec_name,
                        spec_son_name:res.data.data.spec_son_name,
                        sku_info:res.data.data.sku_info
                    });
                    /**
                     * @param 标记,使用完后需关闭标记
                     */
                    that.$store.commit({
                        type:'getSkuInfoFlag',
                        skuInfoFlag:true,
                    });
                }else{
                    that.loadingGetTB=false;
                    that.$message.error(res.data.msg);
                }
            }).catch((res)=>{
                that.loadingGetTB=false;
                that.$message.error('网络错误');
            })
        },
        handleCDNImg(url){
            let data={
                url:url
            }
            let that=this;
            putObject(data).then((res)=>{
                that.loadingGetTB=false;
                if(res.data.code===200){
                    that.addAddGoodsData.master_graph=res.data.data.url;
                    that.$message.success('采集成功');
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((res)=>{
                that.loadingGetTB=false;
                that.$message.error('网络错误');
            })
        },
        handleRemove(file, fileList) {
            if(Object.prototype.toString.call(fileList)==='[object Array]'){
                 this.addAddGoodsData.dialogImageUrl=fileList.map((item,i)=>{
                    return {
                        url: item.url,
                        response:{
                            code:i,
                            data:{
                                src:item.url
                            }
                        }
                    }
                })
            }
            //轮播图移除回调函数
        },
        handlePictureCardPreview(file) {
            //轮播图预览回调函数
            this.flagImageUrl = file.url;
            this.flagVisible = true;
        },
        beforeAvatarUpload(file) {  //图片进行限制
            let size = file.size/1024/1024;
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }
            if(size>2){
                this.$message.warning("图片不能大于2M");
                return false;
            }else{
                this.loading=true;
                return true;
            }
        },
        exceedLimit(){
            this.$message.warning("最多上传5个");
        },
        handleAvatarSuccess(res) { // 主图上传
            this.loading=false;
            if(res.code===0){
                this.addAddGoodsData.master_graph = imgFormat(res.data.src,'q',75);
            }else{
                this.$message.error("图片上传失败");
            }
            
        },
        handleSwiperSuccess(res,file,fileList) { //轮播图上传修改
            this.loading=false;
            let that=this;
            if(res.code===0){
                let data={
                    url: fileList[fileList.length-1].response.data.src,
                    response:{
                        code:0,
                        data:{
                            src:fileList[fileList.length-1].response.data.src
                        }
                    }
                };
                this.addAddGoodsData.dialogImageUrl.splice(this.handleDetailImgIndex,1,data);
            }else{
                this.$message.error("图片上传失败");
                return;
            }
        },
        handleSwiperSuccessAdd(res,file,fileList) { //轮播图上传添加
            this.loading=false;
            let that=this;
            if(res.code===0){
                this.addAddGoodsData.dialogImageUrl.push({
                    url: fileList[fileList.length-1].response.data.src,
                    response:{
                        code:0,
                        data:{
                            src:fileList[fileList.length-1].response.data.src
                        }
                    }
                });
            }else{
                this.$message.error("图片上传失败");
                return;
            }
        },
        handleSwiperRemoveD(index) {  //轮播图删除
            this.addAddGoodsData.dialogImageUrl.splice(index,1);
        },
        handleRemoveD(index) {  //详情图删除
            this.addAddGoodsData.detailImg.splice(index,1);
        },
        handleFareOpt(val){
            let that=this;
            if(this.addAddGoodsData.freight_type===1){
                this.personalise_options.some((item)=>{
                    
                    if(item.value===val){
                        //1 按重
                        if(item.state===1){
                            that.$store.commit({
                                type:'getWeightMust',
                                weightMust:true,
                            });
                        }else{
                        //0按件
                            that.$store.commit({
                                type:'getWeightMust',
                                weightMust:false,
                            });
                        }
                        return true;
                    }
                })
            }else{
                that.$store.commit({
                    type:'getWeightMust',
                    weightMust:false,
                });
            }
        },

        beforeAvatarVUpload(file) {  //图片进行限制
            let size = file.size/1024/1024;
            let testmsg=/^video\/(mp4)$/.test(file.type);
            if(!testmsg){
                this.$message.warning("请上传正确的视频格式")
                return false
            }
            if(size>30){
                this.$message.warning("视频不能大于30M");
                return false;
            }
        },
        handleSwiperVSuccess(res) { //轮播图视频上传
            if(res.code===200){
                this.addAddGoodsData.good_videos =res.data.src;
            }else{
                this.$message.error("视频上传失败");
                return false;
            }
        },
        changePresale(val){
            let that = this
            getAuditApplicationList(34).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===false){
                        that.showVersion = true
                        that.advance_sale = false
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00205");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00206');
            })
        }
    },
    destroyed(){
        this.$store.commit({
            type:'getSku_info',
            skuInfo:{},
        });
        this.$store.commit({
            type:'getSkuEditFlag',
            skuEditFlag:false,
        });
        this.$store.commit({
            type:'getSkuInfoFlag',
            skuInfoFlag:false,
        });
        this.$store.commit({
            type:'getMember_type',
            member_type:0,
        });
        this.$store.commit({
            type:'getWeightMust',
            weightMust:false,
        });
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/shoplist/addgoods.scss';
</style>