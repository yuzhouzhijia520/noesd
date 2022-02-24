<template>
    <div class="wf-shop_shops">
        <el-dialog
            title="温馨提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            center>
            <span style="text-align:center;">可视化店铺装修上线啦~<br>你可试用该功能，正式生效请联系客服升级小程序</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sublimeshhpo">确 定</el-button>
            </span>
        </el-dialog>
        <div class="wf-shop_shops-nav">
            <el-menu :default-active="type" mode="horizontal" class="el-menu-demo" @select="tabActive">
                <el-menu-item :index="index"  v-for="(item,index) in classData"   :name="item.type" :key="index" v-if="!($store.state.type_id==6&&item.type=='groupgood')" >{{item.type_name}}</el-menu-item>
            </el-menu>
        </div>
        <div id="shop_shops" >
            <!-- <el-tabs @tab-click='tabActive' v-model="activeName" type="border-card" style="padding-bottom: 40px;"> -->
<!--                 
                <el-tab-pane v-for="(item,index) in classData" :label="item.type_name" :name="item.type" :key="index">
                </el-tab-pane> -->
            
                <div v-if="type=='swiper'" class="wf-shop_shops-left">
                    <el-radio-group v-model="radio1" @change="shopState" v-if="hideOff">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                    <el-row style="margin: 20px 0;">
                        <router-link :to="{path:'/wf/admin/shop/shop_shops/add_lunbo',query:{data:classData.swiper}}">
                            <el-button size="mini"  >添加轮播</el-button>
                        </router-link>
                    </el-row>
                    <el-table
                    :data="lunbo_tableData"
                    style="width: 100%;margin: 20px 0;"
                    :key="type">
                        <el-table-column
                        label="图片">
                            <template slot-scope="scope">
                                <img style="width:40px;height:40px;" :src="scope.row.banner_img" alt="" preview="0">
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="排序"
                        prop="orderby">
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        prop="state">
                        </el-table-column>
                        <el-table-column label="操作"
                        width="220">
                        <template slot-scope="scope">
                            <el-button size="mini"  @click="getEditLunbo(scope.row)">编辑</el-button>
                            <el-dialog
                            title="编辑"
                            :visible.sync="lunboEdit"
                            width="40%">

                            <el-row>
                                <el-col :span="7">
                                    <div class="jianju"><span class="wf-red">*</span>轮播图(建议尺寸640X320)</div>
                                </el-col>
                                <el-col :span="4">
                                    <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                                    :before-upload="lunboAvatarUpload">
                                        <img v-if="lunbo_imageUrl" :src="lunbo_imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-col>
                            </el-row>

                            <el-row class="jianju" style="line-height:28px;">
                                <el-col :span="7">
                                    <span>排序：</span>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" v-model="lunbo_orderby" style="width: 120px;"></el-input>
                                </el-col>
                                <el-col :span="4"><span style="margin-left: 10px;color: #999;">数字越大越靠前</span></el-col>
                            </el-row>

                            <el-row class="jianju">
                                <el-col :span="7">
                                    <span>状态：</span>
                                </el-col>
                                <el-col :span="4">
                                    <el-select size="mini" v-model="lunbo_status" @change="changeLunboStatus">
                                        <el-option
                                        v-for="item in lunbo_status_list"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <span slot="footer" class="dialog-footer">
                                <el-button size="mini" @click="lunboEdit = false">取 消</el-button>
                                <el-button size="mini"  @click="editLunbo">确 定</el-button>
                            </span>
                            </el-dialog>
                            <el-button size="mini" type="danger" @click="deletLunbo(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div v-if="type=='classify'" class="wf-shop_shops-left">
                    <el-radio-group v-model="radio2" @change="shopState" v-if="hideOff">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                    <p class="jianju" style="color: #999;">一排最多展示4个</p>
                    <el-row class="jianju">
                        <router-link :to="{path:'/wf/admin/shop/shop_shops/add_classify',query:{data:classData.classify}}">
                            <el-button size="mini"  >添加</el-button>
                        </router-link>
                    </el-row>
                    <el-table
                    :data="class_tableData"
                    style="width: 100%;margin: 20px 0;"
                    :key="type">
                        <el-table-column
                        label="图片">
                            <template slot-scope="scope">
                                <img style="width:40px;height:40px;" :src="scope.row.classify_img" alt="" preview="1">
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="名称"
                        prop="classify_name">
                        </el-table-column>
                        <el-table-column
                        label="跳转至"
                        prop="jump">
                        </el-table-column>
                        <el-table-column
                        label="排序"
                        prop="orderby">
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        prop="state">
                        </el-table-column>
                        <el-table-column label="操作"
                        width="220">
                        <template slot-scope="scope">
                            <el-button size="mini"  @click="getEditClaasify(scope.row)">编辑</el-button>
                            <el-dialog
                            title="编辑"
                            :visible.sync="classify_edit"
                            width="40%">

                            <el-row>
                                <el-col :span="8">
                                    <div class="jianju"><span class="wf-red">*</span>分类图(建议尺寸90X90)</div>
                                </el-col>
                                <el-col :span="4">
                                    <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                                    :before-upload="classifyAvatarUpload">
                                        <img v-if="classify_imageUrl" :src="classify_imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-col>
                            </el-row>

                            <el-row class="jianju" style="line-height: 68px;">
                                <el-col :span="6">
                                    <el-col :span="10">
                                        <span>分类名称：</span>
                                    </el-col>
                                    <el-col :span="14">
                                        <el-input size="mini" v-model="classify_name" style="width: 120px;"></el-input>
                                    </el-col>
                                </el-col>

                                <el-col :span="16" :offset="2">
                                    <el-col :span="3">
                                        <span>排序：</span>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-input size="mini" v-model="classify_orderby" style="width: 120px;"></el-input>
                                    </el-col>
                                    <el-col :span="8"><span style="margin-left: 10px;color: #999;">数字越大越靠前</span></el-col>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="6">
                                    <el-col :span="10">
                                        <span>跳转至：</span>
                                    </el-col>
                                    <el-col :span="14">
                                        <el-select size="mini" v-model="classify_jumpTo" style="width:120px;">
                                            <el-option
                                            v-for="(item,index) in classify_jumpTo_list"
                                            :label="item.type_name"
                                            :value="item.type_name"
                                            :key="index">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                                
                                <el-col :span="16" :offset="2">
                                    <el-col :span="3">
                                        <span>状态：</span>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-select style="width:120px;" size="mini" v-model="classify_status" @change="changeClassifyStatus">
                                            <el-option
                                            v-for="(item,index) in classify_status_list"
                                            :key="index"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </el-row>

                            <span slot="footer" class="dialog-footer">
                                <el-button size="mini" @click="classify_edit = false">取 消</el-button>
                                <el-button size="mini"  @click="editClassify">确 定</el-button>
                            </span>
                            </el-dialog>
                            <el-button size="mini" type="danger" @click="deletClassify(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div v-if="type=='recommendgood'" class="wf-shop_shops-left">
                    <el-radio-group v-model="radio3" @change="shopState" v-if="hideOff">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>

                    <el-table
                    :data="recommend_tableData"
                    style="width: 100%;margin: 20px 0;"
                    :key="type">
                        <el-table-column
                        label="图片">
                            <template slot-scope="scope">
                                <img style="width:40px;height:40px;" :src="scope.row.master_graph" alt="" preview="2">
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="商品"
                        prop="good_name">
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        prop="state">
                        </el-table-column>
                        <el-table-column
                        label="库存"
                        prop="good_stock">
                        </el-table-column>
                        <el-table-column
                        label="销量"
                        prop="virtual_sales">
                        </el-table-column>
                        <el-table-column label="操作"
                        width="220">
                        <template slot-scope="scope">
                            <el-button size="mini"  @click="removeRecommend(scope.row)">取消推荐</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="pageCount"
                    :page-size='pageSize'
                    @current-change="getPages">
                    </el-pagination>
                </div>

                <div v-if="type=='coupon'" class="wf-shop_shops-left">
                    <el-radio-group v-model="radio4" @change="shopState" style="margin-bottom:20px;" v-if="hideOff">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                    <el-upload
                    class="avatar-uploader"
                    action="img_url"
                    :show-file-list="false"
                    :before-upload="couponUpload">
                        <img v-if="coupon_img" :src="coupon_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button @click="saveCoupon"  size="mini" style="margin-top:5px;margin-left:5px;">保存</el-button>
                </div>

                <div v-if="type=='groupgood'&&this.$store.state.type_id!=6" class="wf-shop_shops-left" >
                    <el-radio-group v-model="radio5" @change="shopState" style="margin-bottom:20px;" v-if="hideOff">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="groupUpload">
                        <img v-if="group_img" :src="group_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button @click="saveGroup"  size="mini" style="margin-top:5px;margin-left:5px;">保存</el-button>
                </div>

                <div v-if="type=='killgood'" class="wf-shop_shops-left" >
                    <el-radio-group v-model="radio6" @change="shopState" style="margin-bottom:20px;" v-if="hideOff">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="killUpload">
                        <img v-if="kill_img" :src="kill_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button @click="saveKill"  size="mini" style="margin-top:5px;margin-left:5px;">保存</el-button>
                </div>

                <div v-if="type=='bargaingood'" class="wf-shop_shops-left" >
                    <el-radio-group v-model="radio7" @change="shopState" style="margin-bottom:20px;" v-if="hideOff">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="bargainUpload">
                        <img v-if="bargain_img" :src="bargain_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button @click="saveBargain"  size="mini" style="margin-top:5px;margin-left:5px;">保存</el-button>
                </div>
            <!-- </el-tabs> -->
            <div>
                <img v-lazy="lazyImg" :key="lazyImg.src" class="wf-shop_shops-rightImg"/>
            </div>
        </div>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: 'shop_shop_shops',
    data() {
        return {
            //隐藏开关
            hideOff:false,
            dialogVisible:true,
            classData: {
                swiper:{
                    type:"swiper",
                    type_name:"轮播图"
                },
                classify:{
                    type:"classify",
                    type_name:"首页分类"
                },
                recommendgood:{
                    type:"recommendgood",
                    type_name:"推荐商品"
                },
                coupon:{
                    type:"coupon",
                    type_name:"优惠券"
                },
                groupgood:{
                    type:"groupgood",
                    type_name:"团购"
                },
                killgood:{
                    type:"killgood",
                    type_name:"秒杀"
                },
                bargaingood:{
                    type:"bargaingood",
                    type_name:"砍价"
                }
            },
            type: 'swiper',
            radio1: 1,
            radio2: 1,
            radio3: 1,
            radio4: 1,
            radio5: 1,
            radio6: 1,
            radio7: 1,
            //轮播编辑数据
            lunboEdit: false,
            lunbo_status: '有效',
            lunbo_state: '1',
            lunbo_orderby: '',
            lunbo_id: '',
            lunbo_imageUrl: '',
            lunbo_status_list: [
                {
                    value: '1',
                    label: '有效'
                },{
                    value: '0',
                    label: '无效'
                }
            ],
            //分类编辑数据
            classify_edit: false,
            classify_status: '有效',
            classify_state: '1',
            classify_jumpTo: '',
            classify_jump: '0',
            classify_orderby: '',
            classify_id: '',
            classify_name: '',
            classify_imageUrl: '',
            classify_jumpTo_list: [],
            classify_status_list: [{
                value: '1',
                label: '有效'
            },{
                value: '0',
                label: '无效'
            }],
            lunbo_tableData: [], // 轮播列表
            class_tableData: [], // 分类列表
            recommend_tableData: [], // 推荐列表
            shopId: '',
            pageSize: 10,
            getPage: 1,
            pageCount: 1,
            coupon_img: '', // 优惠券图片链接
            group_img: '', // 团购图片链接
            kill_img: "", // 秒杀图片
            bargain_img: "",
            lazyImg:{
                        preLoad:1,
                        src: require('@/assets/admin_img/shop_admin_img/shop_shops/shopImg1.png'),
                        error: require('@/assets/admin_img/shop_admin_img/shop_shops/lazyLoadShop.png'),
                        loading: require('@/assets/admin_img/shop_admin_img/shop_shops/lazyLoadShop.png')
                    },
            rightImg:[
                {
                    swiper:{
                        src: require('@/assets/admin_img/shop_admin_img/shop_shops/shopImg1.png')
                    },
                    classify:{
                        src: require('@/assets/admin_img/shop_admin_img/shop_shops/shopImg2.png')
                    },
                    recommendgood:{
                        src: require('@/assets/admin_img/shop_admin_img/shop_shops/shopImg3.png')
                    },
                    coupon:{
                        src: require('@/assets/admin_img/shop_admin_img/shop_shops/shopImg4.png')
                    },
                    groupgood:{
                        src: require('@/assets/admin_img/shop_admin_img/shop_shops/shopImg5.png')
                    },
                    killgood:{
                        src: require('@/assets/admin_img/shop_admin_img/shop_shops/shopImg6.png')
                    },
                    bargaingood:{
                        src: require('@/assets/admin_img/shop_admin_img/shop_shops/shopImg7.png')
                    }
                }
                
            ]
        }
    },
    created(){
        let type = window.localStorage.type
        if(type!=''){
            this.type = type
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/shopIndex',{ //获取店铺信息接口
                token: localStorage.getItem('userId'),
                secret: localStorage.getItem('secretId')
            })
            .then(function(res){
                if(res.data.code==1){
                    that.type = res.data.data.classify.type 
                    that.class_tableData = res.data.data.classify.son //判断type为首页分类时
                    that.shopId = res.data.data.classify.id
                }else{
                    that.$message({
                        showClose: true,
                        message: '请求失败',
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })

            this.$axios.post(this.url + 'shopapi/shop/shopIndex',{ //获取店铺信息接口
                token: localStorage.getItem('userId'),
                secret: localStorage.getItem('secretId')
            })
            .then(function(res){
                if(res.data.code==1){
                    that.type = res.data.data.classify.type 
                    that.lunbo_tableData = res.data.data.classify.son //默认取第一个为轮播页数据
                    that.classData = res.data.data //全部数据，循环选项卡分类
                    that.shopId = res.data.data.classify.id
                }else{
                    that.$message({
                    showClose: true,
                    message: '请求失败',
                    type: 'error'
                })
                }
                
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
            window.localStorage.type='';
        }else{
            this.getShopIndex()
            let that=this;
            this.$axios.post(this.url + 'shopapi/Goodtype/typeindex',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId') +
            '&page=' + 1
            )
            .then(function(res){
                if(res.data.code==1){
                    let data = res.data.data
                    var list=[]
                    for(var da in data){
                        if(data[da].children.length!=0){
                            for(var child in data[da].children){
                                list.push({id:data[da].children[child].id,type_name:data[da].children[child].type_name})
                            }
                        }
                    }
                    that.classify_jumpTo_list = list;
                }else{
                    that.$message({
                        showClose: true,
                        message: '请求失败',
                        type: 'error'
                    })
                }
                
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        }
    },
    methods: {
        handleClose(){
            this.dialogVisible = false
        },
        sublimeshhpo(){
            this.dialogVisible = false
            this.$router.push({path:'/wf/admin/shop/diy'})
        },
        shopState(){
            let that = this
            let shopId = ''
            let radio = ''
            shopId = this.shopId
            if(this.type=='swiper'){
                radio = this.radio1
            }else if(this.type=='classify'){
                radio = this.radio2
            }else if(this.type=='recommendgood'){
                radio = this.radio3
            }else if(this.type=='coupon'){
                radio = this.radio4
            }else if(this.type=='groupgood'){
                shopId = this.shopId
                radio = this.radio5
            }else if(this.type=="killgood"){
                shopId = this.shopId
                radio = this.radio6
            }else if(this.type=="bargaingood"){
                shopId = this.shopId
                radio = this.radio7
            }
            this.$axios.post(this.url + 'shopapi/shop/shopState',{ // 店铺信息状态开启关闭
                token: localStorage.getItem('userId'),
                secret: localStorage.getItem('secretId'),
                state: radio,
                id: shopId
            })
            .then(function(res){
                let msg = ''
                if(res.data.code==200){
                    if(radio==1){
                        msg = '开启成功'
                    }else{
                        msg = '关闭成功'
                    }
                    that.$message({
                        showClose: true,
                        message: msg,
                        type: 'success'
                    })
                }else{
                    if(radio==1){
                        msg = '开启失败，请重新开启'
                    }else{
                        msg = '关闭失败，请重新关闭'
                    }
                    that.$message({
                        showClose: true,
                        message: msg,
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        getShopIndex(){
            this.type='swiper';
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/shopIndex',{ //获取店铺信息接口
                token: localStorage.getItem('userId'),
                secret: localStorage.getItem('secretId')
            })
            .then(function(res){
                if(res.data.code==1){
                    that.lunbo_tableData = res.data.data.swiper.son //默认取第一个为轮播页数据
                    that.classData = res.data.data //全部数据，循环选项卡分类
                    that.shopId = res.data.data.swiper.id
                }else{
                    that.$message({
                    showClose: true,
                    message: '请求失败',
                    type: 'error'
                })
                }
                
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        getPages(e){
            this.getPage = e
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/recommendgood', //获取店铺信息接口
                'token=' + localStorage.getItem('userId')+
                '&secret=' + localStorage.getItem('secretId')+
                '&page=' + this.getPage
            )
            .then(function(res){
                if(res.data.code==200){
                    that.recommend_tableData = res.data.data
                }else{
                    that.$message({
                        showClose: true,
                        message: '请求失败',
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        tabActive(k){
            let e={};
            e.name=k;
            //切换图片
            // this.lazyImg=this.rightImg[0].k;
            Object.keys(this.rightImg[0]).forEach((i,key)=>{
                let that=this;
                if(i==k){
                    that.lazyImg.src=that.rightImg[0][i].src;
                }
            })
            // this.type = e.name
            let that = this
            if(e.name=='swiper'){
                that.getShopIndex()
            }else if(e.name=='classify'){
                this.type ='classify';
                that.$axios.post(that.url + 'shopapi/shop/shopIndex',{ //获取店铺信息接口
                    token: localStorage.getItem('userId'),
                    secret: localStorage.getItem('secretId')
                })
                .then(function(res){
                    if(res.data.code==1){
                        that.class_tableData = res.data.data.classify.son ////判断type为首页分类时
                        that.shopId = res.data.data.classify.id
                    }else{
                        that.$message({
                            showClose: true,
                            message: '请求失败',
                            type: 'error'
                        })
                    }
                })
                .catch(function (error) {
                    that.$message({
                        showClose: true,
                        message: '网络错误',
                        type: 'error'
                    })
                    
                })
            }else if(e.name=='recommendgood'){
                this.type ='recommendgood';
                that.$axios.post(that.url + 'shopapi/shop/shopIndex',{ // 获取店铺信息接口
                    token: localStorage.getItem('userId'),
                    secret: localStorage.getItem('secretId')
                })
                .then(function(res){
                    if(res.data.code==1){
                        that.pageCount = res.data.data.recommendgood.num
                        that.recommend_tableData = res.data.data.recommendgood.son // 判断type为推荐商品时
                        that.shopId = res.data.data.recommendgood.id
                    }else{
                        that.$message({
                            showClose: true,
                            message: '请求失败',
                            type: 'error'
                        })
                    }
                })
                .catch(function (error) {
                    that.$message({
                        showClose: true,
                        message: '网络错误',
                        type: 'error'
                    })
                    
                })
            }else if(e.name=='coupon'){
                this.type ='coupon';
                let that=this;
                this.$axios.post(that.url + 'shopapi/shop/shopIndex',{ //获取优惠券信息接口
                    token: localStorage.getItem('userId'),
                    secret: localStorage.getItem('secretId')
                })
                .then(function(res){
                    if(res.data.code==1){
                        that.shopId = res.data.data.coupon.id
                        if(res.data.data.coupon.son!=''&&res.data.data.coupon.son!=undefined&&res.data.data.coupon.son!=null){
                            that.coupon_img = res.data.data.coupon.son.coupon_image
                        }
                    }else{
                        that.$message({
                            showClose: true,
                            message: '请求失败',
                            type: 'error'
                        })
                    }
                })
                .catch(function (error) {
                    that.$message({
                        showClose: true,
                        message: '网络错误',
                        type: 'error'
                    })
                    
                })
            }else if(e.name=='groupgood'){
                this.type ='groupgood';
                let that=this;
                this.$axios.post(that.url + 'shopapi/shop/shopIndex',{ //获取团购信息接口
                    token: localStorage.getItem('userId'),
                    secret: localStorage.getItem('secretId')
                })
                .then(function(res){
                    if(res.data.code==1){
                        that.shopId = res.data.data.groupgood.id
                        if(res.data.data.groupgood.son!=''&&res.data.data.groupgood.son!=undefined&&res.data.data.groupgood.son!=null){
                            that.group_img = res.data.data.groupgood.son.group_image
                        }
                    }else{
                        that.$message({
                            showClose: true,
                            message: '请求失败',
                            type: 'error'
                        })
                    }
                })
                .catch(function (error) {
                    that.$message({
                        showClose: true,
                        message: '网络错误',
                        type: 'error'
                    })
                })
            }else if(e.name=='killgood'){
                this.type ='killgood';
                let that=this;
                this.$axios.post(that.url + 'shopapi/shop/shopIndex',{ //获取团购信息接口
                    token: localStorage.getItem('userId'),
                    secret: localStorage.getItem('secretId')
                })
                .then(function(res){
                    if(res.data.code==1){
                        that.shopId = res.data.data.killgood.id
                        if(res.data.data.killgood.son!=''&&res.data.data.killgood.son!=undefined&&res.data.data.killgood.son!=null){
                            that.kill_img = res.data.data.killgood.son.kill_image
                        }
                    }else{
                        that.$message({
                            showClose: true,
                            message: '请求失败',
                            type: 'error'
                        })
                    }
                })
                .catch(function (error) {
                    that.$message({
                        showClose: true,
                        message: '网络错误',
                        type: 'error'
                    })
                })
            }else if(e.name=='bargaingood'){
                this.type ='bargaingood';
                let that=this;
                this.$axios.post(that.url + 'shopapi/shop/shopIndex',{ //获取团购信息接口
                    token: localStorage.getItem('userId'),
                    secret: localStorage.getItem('secretId')
                })
                .then(function(res){
                    if(res.data.code==1){
                        that.shopId = res.data.data.bargaingood.id
                        if(res.data.data.bargaingood.son!=''&&res.data.data.bargaingood.son!=undefined&&res.data.data.bargaingood.son!=null){
                            that.bargain_img = res.data.data.bargaingood.son.bargain_image
                        }
                    }else{
                        that.$message({
                            showClose: true,
                            message: '请求失败',
                            type: 'error'
                        })
                    }
                })
                .catch(function (error) {
                    that.$message({
                        showClose: true,
                        message: '网络错误',
                        type: 'error'
                    })
                })
            }
        },
        deletLunbo(e){
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/shopDel',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&setting_id='+that.classData.swiper.id+
                '&id='+e.id
            )
            .then(function(res){
                if(res.data.code==1){
                    that.getShopIndex()
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    })
                }else if(res.data.code==0){
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })
                }else{
                    that.$message({
                        showClose: true,
                        message: '删除失败',
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        deletClassify(e){
            this.type ='classify';
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/shopDel',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&setting_id='+that.classData.classify.id+
                '&id='+e.id
            )
            .then(function(res){
                if(res.data.code==1){
                    that.$axios.post(that.url + 'shopapi/shop/shopIndex',{ //获取店铺信息接口
                        token: localStorage.getItem('userId'),
                        secret: localStorage.getItem('secretId')
                    })
                    .then(function(res){
                        if(res.data.code==1){
                            // that.type = res.data.data.classify.type 
                            that.class_tableData = res.data.data.classify.son //取首页分类数据
                            that.classData = res.data.data //全部数据，循环选项卡分类
                            that.shopId = res.data.data.classify.id
                        }else{
                            that.$message({
                                showClose: true,
                                message: '请求失败',
                                type: 'error'
                            })
                        }
                    })
                    .catch(function (error) {
                        that.$message({
                            showClose: true,
                            message: '网络错误',
                            type: 'error'
                        })
                        
                    })
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    })
                }else if(res.data.code==0){
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })
                }else{
                    that.$message({
                        showClose: true,
                        message: '删除失败',
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        //**************轮播编辑*********************
        getEditLunbo(e){
            this.lunboEdit = true
            if(e.state=='有效'){
                this.lunbo_state = '1'
            }else if(e.state=='无效'){
                this.lunbo_state = '0'
            }
            this.lunbo_status = e.state
            this.lunbo_orderby = e.orderby
            this.lunbo_id = e.id
            this.lunbo_imageUrl = e.banner_img
        },
        changeLunboStatus(e){
            this.lunbo_state = e
        },
        lunboAvatarUpload(file) {
            let formData = new FormData();
            formData.append('file', file);
            let that=this;
            this.$axios.post(this.url+'supper/attachment/upfile', formData).then(function (res) {
                if(res.data.code==0){
                    that.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    that.lunbo_imageUrl = res.data.data.src;
                }else{
                    that.$message({
                        showClose: true,
                        message: '上传失败，请从新上传',
                        type: 'error'
                    })
                }
            })
        },
        editLunbo(){
            let that = this
            if(this.lunbo_imageUrl==''){

            }else{
                this.$axios.post(this.url + 'shopapi/shop/shopEdit',
                    'token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId')+
                    '&setting_id='+that.classData.swiper.id+
                    '&id='+that.lunbo_id+
                    '&orderby='+that.lunbo_orderby+
                    '&state='+that.lunbo_state+
                    '&banner_img='+that.lunbo_imageUrl
                )
                .then(function(res){
                    if(res.data.code==1){
                        that.getShopIndex()
                        that.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'success'
                        })
                    }else{
                        that.$message({
                            showClose: true,
                            message: '编辑失败',
                            type: 'error'
                        })
                    }
                })
                .catch(function (error) {
                    that.$message({
                        showClose: true,
                        message: '网络错误',
                        type: 'error'
                    })
                    
                })
                that.lunboEdit = false
            }
        },
        //******************分类编辑***********************
        getEditClaasify(e){
            this.classify_edit = true
            if(e.state=='有效'){
                this.classify_state = '1'
            }else if(e.state=='无效'){
                this.classify_state = '0'
            }
            if(e.jump=='女装'){
                that.classify_jump = 0
            }else if(e.jump=='无效'){
                that.classify_jump = 1
            }
            this.classify_name = e.classify_name
            this.classify_jumpTo = e.jump
            this.classify_status = e.state
            this.classify_orderby = e.orderby
            this.classify_id = e.id
            this.classify_imageUrl = e.classify_img
        },
        changeClassifyStatus(e){
            this.classify_state = e
        },
        classifyChangeJump(e){
            this.classify_jump = e
        },
        classifyAvatarUpload(file) {
            let formData = new FormData();
            formData.append('file', file);
            let that=this;
            this.$axios.post(this.url+'supper/attachment/upfile', formData).then(function (res) {
                if(res.data.code==0){
                    that.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    that.classify_imageUrl = res.data.data.src;
                }else{
                    that.$message({
                        showClose: true,
                        message: '上传失败，请从新上传',
                        type: 'error'
                    })
                }
            })
        },
        editClassify(){
            this.type ='classify';
            let that = this
            for(var i=0;i<this.classify_jumpTo_list.length;i++){
                if(this.classify_jumpTo==this.classify_jumpTo_list[i].type_name){
                    var jump=this.classify_jumpTo_list[i].id
                }
            }
            this.$axios.post(this.url + 'shopapi/shop/shopEdit',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&setting_id='+that.classData.classify.id+
                '&id='+that.classify_id+
                '&orderby='+that.classify_orderby+
                '&state='+that.classify_state+
                '&classify_img='+that.classify_imageUrl+
                '&jump='+jump+
                '&classify_name='+that.classify_name
            )
            .then(function(res){
                if(res.data.code==1){
                    that.$axios.post(that.url + 'shopapi/shop/shopIndex',{ //获取店铺信息接口
                        token: localStorage.getItem('userId'),
                        secret: localStorage.getItem('secretId')
                    })
                    .then(function(res){
                        if(res.data.code==1){
                            that.class_tableData = res.data.data.classify.son //取首页分类数据
                            that.classData = res.data.data //全部数据，循环选项卡分类
                            that.shopId = res.data.data.classify.id
                        }else{
                            that.$message({
                                showClose: true,
                                message: '请求失败',
                                type: 'error'
                            })
                        }
                    })
                    .catch(function (error) {
                        that.$message({
                            showClose: true,
                            message: '网络错误',
                            type: 'error'
                        })
                        
                    })
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    })
                }else{
                    that.$message({
                        showClose: true,
                        message: '编辑失败',
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
            that.classify_edit = false
        },
        removeRecommend(e){
            this.type ='recommendgood';
            let that = this
            this.$axios.post(this.url + 'shopapi/Goods/removeRecommend',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&good_id='+e.id
            )
            .then(function(res){
                if(res.data.code==1){
                    that.$axios.post(that.url + 'shopapi/shop/shopIndex',{ //获取店铺信息接口
                        token: localStorage.getItem('userId'),
                        secret: localStorage.getItem('secretId')
                    })
                    .then(function(res){
                        if(res.data.code==1){
                            that.recommend_tableData = res.data.data.recommendgood.son //取首页分类数据
                            that.classData = res.data.data //全部数据，循环选项卡分类
                            that.shopId = res.data.data.recommendgood.id
                        }else{
                            that.$message({
                                showClose: true,
                                message: '请求失败',
                                type: 'error'
                            })
                        }
                    })
                    .catch(function (error) {
                        that.$message({
                            showClose: true,
                            message: '网络错误',
                            type: 'error'
                        })
                        
                    })
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    })
                }else{
                    that.$message({
                        showClose: true,
                        message: '取消失败',
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        couponUpload(file) { // 优惠券上传、替换图片
            let formData = new FormData();
            formData.append('file', file);
            let that=this;
            if(file.size/1024/1024 > 2){
                that.$message({
                    message: '图片大小不要超过2M',
                    type: 'warning'
                });
                return
            }
            this.$axios.post(this.url+'supper/attachment/upfile', formData).then(function (res) {
                if(res.data.code==0){
                    that.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    that.coupon_img = res.data.data.src;
                }else{
                    that.$message({
                        message: '上传失败，请联系管理人员',
                        type: 'error'
                    });
                }
            })
        },
        groupUpload(file){
            let formData = new FormData();
            formData.append('file', file);
            let that=this;
            if(file.size/1024/1024 > 2){
                that.$message({
                    message: '图片大小不要超过2M',
                    type: 'warning'
                });
                return
            }
            this.$axios.post(this.url+'supper/attachment/upfile', formData).then(function (res) {
                if(res.data.code==0){
                    that.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    that.group_img = res.data.data.src;
                }else{
                    that.$message({
                        message: '上传失败，请联系管理人员',
                        type: 'error'
                    });
                }
            })
        },
        killUpload(file) { // 秒杀上传、替换图片
            let formData = new FormData();
            formData.append('file', file);
            let that=this;
            if(file.size/1024/1024 > 2){
                that.$message({
                    message: '图片大小不要超过2M',
                    type: 'warning'
                });
                return
            }
            this.$axios.post(this.url+'supper/attachment/upfile', formData).then(function (res) {
                if(res.data.code==0){
                    that.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    that.kill_img = res.data.data.src;
                }else{
                    that.$message({
                        message: '上传失败，请联系管理人员',
                        type: 'error'
                    });
                }
            })
        },
        bargainUpload(file) { // 砍价上传、替换图片
            let formData = new FormData();
            formData.append('file', file);
            let that=this;
            if(file.size/1024/1024 > 2){
                that.$message({
                    message: '图片大小不要超过2M',
                    type: 'warning'
                });
                return
            }
            this.$axios.post(this.url+'supper/attachment/upfile', formData).then(function (res) {
                if(res.data.code==0){
                    that.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    that.bargain_img = res.data.data.src;
                }else{
                    that.$message({
                        message: '上传失败，请联系管理人员',
                        type: 'error'
                    });
                }
            })
        },
        saveCoupon(){
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/shopAdd',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&coupon_image='+that.coupon_img+
                '&setting_id='+that.shopId
            )
            .then(function(res){
                if(res.data.code==200){
                    that.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else{
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        saveGroup(){
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/shopAdd',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&group_image='+that.group_img+
                '&setting_id='+that.shopId
            )
            .then(function(res){
                if(res.data.code==200){
                    that.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else{
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        saveKill(){
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/shopAdd',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&kill_image='+that.kill_img+
                '&setting_id='+that.shopId
            )
            .then(function(res){
                if(res.data.code==200){
                    that.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else{
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        },
        saveBargain(){
            let that = this
            this.$axios.post(this.url + 'shopapi/shop/shopAdd',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&bargain_image='+that.bargain_img+
                '&setting_id='+that.shopId
            )
            .then(function(res){
                if(res.data.code==200){
                    that.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else{
                    that.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
                
            })
        }
    }
}
</script>

<style lang="scss">
.wf-shop_shops{
    .wf-red{
        color: red;
    }
    .el-dialog__body{
        text-align: center;
    }
    .wf-shop_shops-nav{
        margin-bottom: 10px;
        .el-menu--horizontal>.el-menu-item{
            height: 40px;
            line-height: 40px;
        }
    }
    #shop_shops{
        display: flex;
        border: none;
        .wf-shop_shops-left{
            background-color: #fff;
            padding: 40px 0px 40px 10px;
            flex: 1;
            box-shadow: none;
            padding-bottom: 40px;
            float: left;
            min-height: 590px;
            min-width: 74%;
        }
        .wf-shop_shops-rightImg{
            width: 320px;
            margin-left: 10px;
            padding: 10px;
            background-color: #fff;
            border-radius: 30px;
            box-shadow: 1px 6px 8px 12px #eaeaeaa3;
        }
        .jianju{
            margin: 20px 0;
        }
        // 上传图片
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
            width: 60px;
            line-height: 60px;
            text-align: center;
        }
        .avatar {
            width: 60px;
            height: 60px;
            display: block;
        }
    }
}

</style>
