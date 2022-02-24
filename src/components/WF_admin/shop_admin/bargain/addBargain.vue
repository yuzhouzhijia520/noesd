<template>
    <div class="wf-addBargain">
        <el-row :gutter="24">
            <el-col :xs="15" :sm="17" :md="19" :lg="20" :xl="22">
                <el-form :label-position="labelPosition"
                        :model="addBargainData"
                        :rules="rules"
                        ref="addBargainData"
                        label-width="10rem"
                        class="demo-ruleForm">
                    <el-form-item class="label-left no-star rule" label="砍价规则">
                        <el-popover
                            placement="right"
                            width="340"
                            trigger="hover"
                            content="创建砍价活动，生成后发起的砍价没有时间限制，单个人可发起一次砍价，可无限帮砍，生成订单后，砍价变为已完成，终止活动，发起的活动不影响，但不可重新发起。">
                            <span slot="reference" class="el-icon-question"></span>
                        </el-popover>
                    </el-form-item>
                    <el-form-item class="label-left no-star" label="商品" prop="validFlagGoods" size="mini">
                        <el-button :disabled="dis_state" class="input_width select-btn" style="width:5.625rem ;" v-model="addBargainData.validFlagGoods" @click="selectShow">选择商品</el-button>
                    </el-form-item>
                    <!-- ********************选择商品后出现*********开始*********** -->
                    <template v-if="show_goods">
                        <el-form-item label="轮播图(最多五个)" size="mini" prop="fileListImg">
                            <el-upload
                            size="mini"
                            class="upload-demo"
                            :action="upLoadUrl"
                            :on-remove="handleRemove1"
                            :on-success="handleSuccess1"
                            :file-list="addBargainData.fileListImg"
                            :before-upload="beforeUpload1"
                            :on-exceed="max"
                            :limit='5'
                            list-type="picture-card"
                            :disabled="dis_state"
                            >
                            <i class="el-icon-plus upload_img"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item class="label-left no-star" label="详情图" size="mini">
                            <el-upload
                            size="mini"
                            class="upload-demo"
                            :action="upLoadUrl"
                            :on-remove="handleRemove2"
                            :on-success="handleSuccess2"
                            :before-upload="beforeUpload2"
                            :file-list="addBargainData.fileListImg1"
                            list-type="picture-card"
                            :disabled="dis_state">
                            <i class="el-icon-plus upload_img"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="名称" prop="good_name" size="mini">
                            <el-input :disabled="dis_state" class="input_width"  size="mini" v-model="addBargainData.good_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品属性" size="mini" prop="tableDataVal">
                            <my-table class="my_table" :tableData="tableData" v-model="addBargainData.tableDataVal" :columns="columns" :pagination="false"  @multipleSelection="handleSelectionChange"></my-table>
                        </el-form-item>
                    </template>
                    <!-- ********************选择商品后出现**********结束********** -->
                    <el-form-item label="结束时间" prop="end_time" size="mini">
                        <div class="block" >
                            <el-date-picker
                            v-model="addBargainData.end_time"
                            type="datetime"
                            align="right"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            default-time="23:59:59"
                            :placeholder="today_date"
                            :disabled="dis_state"
                            >
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item class="right-text" label="最少多少人" prop="min_number" size="mini">
                        <el-col :span="1">
                            <el-input-number :disabled="dis_state" placeholder="请填写数字" :precision="0" :controls="false" v-model="addBargainData.min_number" size="mini" :min="1" :max="100000"></el-input-number>
                        </el-col>
                        <el-col class="floor_price" :span="1"><span>砍至底价</span></el-col>
                    </el-form-item>
                    <el-form-item class="right-text" label="最多多少人" prop="max_number" size="mini">
                        <el-col :span="1">
                            <el-input-number :disabled="dis_state" placeholder="请填写数字" :precision="0" :controls="false" v-model="addBargainData.max_number" size="mini" :min="2" :max="100000"></el-input-number>
                        </el-col>
                        <el-col class="floor_price" :span="1"><span>砍至底价</span></el-col>
                    </el-form-item>
                     <el-form-item class="no-star" label="排序" prop="orderby" size="mini">
                        <el-input-number :precision="0" :controls="false" v-model="addBargainData.orderby" size="mini" :min="0" :max="100000"></el-input-number>
                    </el-form-item>
                    <el-form-item class="label-left" label="状态" prop="stateVal">
                        <el-select size="mini" v-model="stateVal" placeholder="请选择状态" >
                            <el-option v-for="item in state" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="saveLoading" class="save-btn" size="mini" type="primary" @click="save('addBargainData')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!-- ********************点击选择商品按钮后出现的弹框********************** -->
        <el-dialog title="选择商品" :visible.sync="dialogTableVisible">
                <el-row class="wf-addSeckill-Shop-row">
                    <el-col :span="5" class="wf-addSeckill-Shop-col-5">
                        <el-input  size="mini" placeholder="商品名称" v-model="search_good_name"></el-input>
                    </el-col>
                    <el-col :span="6" class="wf-addSeckill-Shop-col-6">
                        <el-select size="mini"  placeholder="父分类" v-model="search_parent" @change="handleParentChange">
                            <el-option
                            v-for="item in parent_option"
                            :key="item.id"
                            :label="item.type_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" class="wf-addSeckill-Shop-col-6">
                        <el-select size="mini" placeholder="子分类" v-model="search_son">
                            <el-option
                            v-for="item in son_option"
                            :key="item.id"
                            :label="item.type_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-button size="mini" type="primary" class="wf-addSeckill-Shop-searchShop" @click="toselect(1)">搜索</el-button>
                </el-row>
            <my-table v-loading.fullscreen.lock="loading" :tableData ='tableDatal' :columns='columnsl' class="tablelist" :currentPage='currentPage' :pageSize="pageSize" :totalPage="totalPage" @currentChange="toselect"></my-table>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from "@/untils/common.js";
export default {
    name: "addBargain",
    data() {
        //是否选择商品检验
        let validSelectFlagGoods=(rule, value, callback) => {
            if (value === false) {
                callback(new Error('请选择商品'));
            } else {
                callback();
            }
        };
        //是否有轮播图
        let validFileListImg=(rule, value, callback) => {
            if (value&&value.length>0) {
                callback();
            } else {
                callback(new Error('请上传轮播图'));
            }
        };
         //是否有勾选商品属性
        let validTableDataVal=(rule, value, callback) => {
            if (value&&value.length>0) {
                callback();
            } else {
                callback(new Error('请选择商品属性'));
            }
        };
        let validMaxPeople=(rule, value, callback) => {
            if(value){
                if(value<=this.addBargainData.min_number){
                    callback(new Error('最多人数必须大于最少人数'));
                }else{
                    callback()
                }
            }else{
                callback(new Error('最多人数不能为空'));
            }
        };
        let validState=(rule,value,callback) => {
            callback()
        }
        return {
            today_date: dateFormat(new Date(),"{y}-{m}-{d}")+' 23:59:59',
            fileList3: "", // 用来存储添加的图片的路径的数组，点击保存时传参用
            fileList4: "", // 详情图的，同上
            show_goods: false, // 选择商品后出现的内容
            upLoadUrl: this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径
            good_data: '', // 存储选择商品后获得的商品数据
            good_id: 0, // 商品id
            pageSize: 5,
            currentPage: 1,
            totalPage: 0,
            search_good_name: '', // 搜索商品名称
            search_parent: '', // 搜索父分类
            search_son: '', // 搜索子分类
            parent_option: [],
            son_option: [],
            dialogTableVisible: false, // 显示选择团购商品类表
            labelPosition: 'left', // 表单对齐方式
            stockNone: false, // 展示库存是否显示
            dis_state: false, // 根据状态判断是否禁用
            tableData: [], // 表格数据列表
            loading: false,
            saveLoading: false,
            columns: [
                {   
                    label: "选择",
                    width: "80",
                    render: (h, param) => {
                        let a = [h('el-switch', {
                            class:'bargain_switch',
                            props: {
                                value: param.row.bool,
                                disabled: this.stockNone
                            },
                            on: {
                                'change':(row) => {
                                    this.tableData[param.index].bool=!this.tableData[param.index].bool
                                    if(this.tableData[param.index].bool===true&&this.stockNone===false){
                                        let data = []
                                        for(var key in this.tableData){
                                            this.tableData[key].bool = false
                                        }
                                        data.push(this.tableData[param.index])
                                        this.addBargainData.tableDataVal = data
                                        this.tableData[param.index].bool = true

                                    }else if(this.tableData[param.index].bool===false&&this.stockNone===false){
                                        this.addBargainData.tableDataVal = []
                                    }
                                }
                            }
                        })];
                        return h('div', a);
                    }
                },
                {   
                    prop: "spec_name",
                    label: "商品属性",
                    align: "left",
                    width: "200",
                    render: (h, param) => {
                        return h('span',{
                            attrs: {
                                style: "padding-left:30px;"
                            }
                        }, param.row.spec_name);
                    }
                },
                {
                    label: "底价",
                    align: "center",
                    render: (h, param) => {
                        let a = [h('el-input-number', {
                                class:'bargain_price_input',
                                props: {
                                    value: param.row.discount_price,
                                    size: "mini",
                                    precision: 2,
                                    controls: false,
                                    min: 0.01,
                                    disabled: this.dis_state
                                },
                                on: {
                                    input: (val) => {
                                        if(val!=''&&val!=undefined&&val!=null){
                                            param.row.kill_price = val
                                        }else{
                                            param.row.kill_price = ''
                                        }
                                    }
                                }
                            }),[h('span','售价 ：￥'+param.row.sku_price)]];
                            return h('div', a);
                    }
                },
                {
                    label: "活动库存",
                    align: "center",
                    render: (h, param) => {
                        let a
                        if(this.stockNone===false){
                            a = [h('el-input-number', {
                                class:'bargain_price_input',
                                props: {
                                    value: param.row.sku_stock,
                                    size: "mini",
                                    precision: 0,
                                    controls: false
                                },
                                on: {
                                    input: (val) => {
                                        if(val!=''&&val!=undefined&&val!=null){
                                            param.row.sku_stock = val
                                        }else{
                                            param.row.sku_stock =''
                                        }
                                    }
                                }
                            }),
                            [h('span','库存 ：'+param.row.sku_stock)]];
                        }else{
                            a = [h('el-input-number', {
                                class:'bargain_price_input',
                                props: {
                                    value: param.row.sku_stock,
                                    size: "mini",
                                    controls: false,
                                    precision: 0,
                                    disabled: this.dis_state
                                },
                                on: {
                                    input: (val) => {
                                        if(val!=''&&val!=undefined&&val!=null){
                                            param.row.sku_stock = val
                                        }else{
                                            param.row.sku_stock =''
                                        }
                                    }
                                }
                            })]
                        }
                        return h('div', a);
                    }
                }
            ],
            tableDatal: [],
            columnsl:[
                {
                    label:'图片',
                    prop:'master_graph',
                    align:'center',
                    render: function(h, param) {
                        let img='';
                        img = [h('img', {
                            attrs: {
                                src: param.row.master_graph,
                                style: 'width:44px;height:44px;'
                            }
                        })];
                        return h('div', img);
                    }
                },
                {
                    label:'名称',
                    prop:'good_name',
                    align:'center',
                
                },
                {
                    label:'分类',
                    prop:'type_name',
                    align:'center',
                },
                {
                    label: "操作",
                    align: "center",
                    render: (h, param) => {
                        let that = this;
                        let a = [
                        h('el-button', {
                            props: {
                                size: "mini",
                                type: "primary"
                            },
                            on: {
                                click: (row) => {
                                    that.addBargainData.validFlagGoods = true; // 已选择过商品
                                    that.good_id = param.row.id;
                                    that.choose(param.row.id);
                                }
                            }
                        }, '选择')];
                        return h('div', a);
                    }
                }
            ],
            stateVal: 0,
            state: [
                {
                    value: 0,
                    label: '无效',
                    disabled: false
                },
                {
                    value: 1,
                    label: '有效',
                    disabled: false
                },
                {
                    value: 2,
                    label: '终止',
                    disabled: false
                }
            ],
            addBargainData:{
                validFlagGoods: false,//检验标记，是否选择过商品
                fileListImg:[],
                fileListImg1:[],
                tableDataVal:[],
                good_name:"",
                orderby: 0,
                end_time: ""
            },
            rules: {
                //是否有选择商品
                validFlagGoods: [
                    { validator: validSelectFlagGoods, trigger: 'blur' }
                ],
                //是否有上传轮播图
                fileListImg: [
                    { required: true, validator: validFileListImg,  trigger: 'blur' }
                ],
                good_name: [
                    { required: true, message: "商品名称不能为空",  trigger: 'blur' }
                ],
                //是否有勾选商品属性
                tableDataVal:[
                     { required: true,validator: validTableDataVal, trigger: 'blur' }
                ],
                end_time: [
                    { required: true, message: '结束时间不能为空', trigger: 'blur' }
                ],
                min_number: [
                    { required: true, message: '最少人数不能为空', trigger: 'blur' }
                ],
                max_number: [
                    { required: true, validator: validMaxPeople, trigger: 'blur' }
                ],
                stateVal: [
                    { required: true, validator: validState, trigger: 'blur' }
                ]
            },
        }
    },
    created(){
        if(this.$route.query.id){
            this.editBargain(this.$route.query.id)
            this.stockNone = true
        }
    },
    components: {
        MyTable
    },
    mounted(){
        
    },
    methods: {
        editBargain(id){ // 当有id传过来时为编辑
            let that = this
            this.$axios.post(this.url+'shopapi/bargain_good/edit',{
                pro_id: parseInt(localStorage.getItem('proId')),
                id: id
            })
            .then(function (res) {
                if(res.data.code==200){
                    that.addBargainData.validFlagGoods=true//已选择过商品
                    that.show_goods = true
                    that.fileList3 = res.data.data.rotation_chart
                    let rotation_chart = res.data.data.rotation_chart.split(",")
                    that.addBargainData.fileListImg = []
                    for(var i=0;i<rotation_chart.length;i++){
                        that.addBargainData.fileListImg.push({name:'',url:rotation_chart[i]})
                    }
                    if(res.data.data.detail_pics!=""&&res.data.data.detail_pics!=null&&res.data.data.detail_pics!=undefined){
                        that.fileList4 = res.data.data.detail_pics
                        let detail_pics = res.data.data.detail_pics.split(",")
                        that.addBargainData.fileListImg1 = []
                        for(var j=0;j<detail_pics.length;j++){
                            that.addBargainData.fileListImg1.push({name:'',url:detail_pics[j]})
                        }
                    }else{
                        that.addBargainData.fileListImg1 = []
                    }
                    that.good_id = res.data.data.good_id
                    that.addBargainData.good_name = res.data.data.name
                    let sku_detail = res.data.data.sku_detail
                    that.addBargainData.tableDataVal = sku_detail
                    for(var key in sku_detail){
                        sku_detail[key].discount_price = sku_detail[key].floor_price
                        sku_detail[key].sku_price = sku_detail[key].price
                        sku_detail[key].sku_stock = sku_detail[key].stock
                        sku_detail[key].bool = true
                        delete sku_detail[key].floor_price
                        delete sku_detail[key].price
                        delete sku_detail[key].stock
                    }
                    that.tableData = sku_detail
                    that.addBargainData.end_time = dateFormat(res.data.data.end_time,"{y}-{m}-{d} {h}:{i}:{s}")
                    that.addBargainData.min_number = res.data.data.min_people
                    that.addBargainData.max_number = res.data.data.max_people
                    that.addBargainData.orderby = res.data.data.order_by
                    that.stateVal = res.data.data.state
                    if(res.data.data.state===0){
                        that.dis_state = false
                    }else if(res.data.data.state===1){
                        that.dis_state = that.stockNone
                        that.state[0].disabled = true
                        that.state[1].disabled = true
                        that.state[2].disabled = true
                    }else if(res.data.data.state===2){
                        that.dis_state = that.stockNone
                        that.state[0].disabled = true
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
        selectShow(){
            this.search_good_name = ''
            this.search_parent = ''
            this.search_son = ''
            this.parentSelect()
            this.toselect(1)
        },
        toselect(currentPage){ // 点击选择商品时获取商品列表
            let that = this
            this.currentPage = currentPage
            this.$axios.post(this.url+'shopapi/goods/chooseGood',{
                secret: localStorage.getItem('secretId'),
                page: this.currentPage,
                good_type: this.search_son!==""?this.search_son:this.search_parent!==""?this.search_parent:undefined,
                good_name_keyword: this.search_good_name!==""?this.search_good_name:undefined
            })
            .then(function (res) {
                if(res.data.code===200){
                    that.tableDatal = res.data.data.info
                    that.totalPage = res.data.data.num
                    that.dialogTableVisible = true
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
        handleParentChange:function(){
            this.sonSelect();
        },
        parentSelect(){ // 获取父分类接口
            let that = this
            this.$axios.post(this.url+'shopapi/goodtype/fatherIndex',{
                secret: localStorage.getItem('secretId')
            })
            .then(function (res) {
                if(res.data.code==1){
                    that.parent_option = res.data.data;
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
        sonSelect(){ // 获取子分类接口
            if(this.search_parent&&this.search_parent!=''){
                let that = this
                this.$axios.post(this.url+'shopapi/goodtype/sonIndex',{
                    secret: localStorage.getItem('secretId'),
                    type_id: that.search_parent
                })
                .then(function (res) {
                    if(res.data.code==1){
                        that.son_option = res.data.data
                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    that.$message.error('请联系管理员');
                });
            }
        },
        handleSelectionChange:function(val){
            this.addBargainData.tableDataVal = val;
        },
        choose(id){ // 选择商品后获取的数据
            this.loading = true
            let that = this
            this.$axios.post(this.url+'shopapi/common/getOneGoodInfo',{
                pro_id: parseInt(localStorage.getItem('proId')),
                id: id
            })
            .then(function (res) {
                if(res.data.code===200){
                    that.fileList3 = res.data.data.broadcast
                    that.fileList4 = res.data.data.good_detail_pics
                    let broadcast = res.data.data.broadcast.split(",")
                    let good_detail_pics = res.data.data.good_detail_pics.split(",")
                    that.addBargainData.fileListImg = []
                    that.addBargainData.fileListImg1 = []
                    for(var i=0;i<broadcast.length;i++){
                        that.addBargainData.fileListImg.push({name:'',url:broadcast[i]})
                    }
                    for(var j=0;j<good_detail_pics.length;j++){
                        that.addBargainData.fileListImg1.push({name:'',url:good_detail_pics[j]})
                    }
                    that.addBargainData.good_name = res.data.data.good_name
                    for(var key in res.data.data.sku_info){
                        res.data.data.sku_info[key].bool = false
                    }
                    that.addBargainData.tableDataVal = []
                    that.tableData = res.data.data.sku_info
                    that.dialogTableVisible=true
                    that.show_goods = true
                    that.stockNone = false
                    setTimeout(function(){
                        that.loading = false
                    },1000);
                }else{
                    that.$message.error(res.data.msg);
                    that.loading = false
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
                that.loading = false
            });
        },
        handleRemove1(file, fileList) { // 轮播图删除成功后的钩子
            let list =[];
            let that=this;
            fileList.forEach((itemFile,m)=>{
                if(itemFile){
                    if(itemFile.url){
                        list.push(itemFile.url)
                    }
                }
            });
            this.fileList3=list.join(',');
            this.addBargainData.fileListImg.forEach((item,i)=>{
                if(item.uid===file.uid){
                    this.addBargainData.fileListImg.splice(i,1);
                }
            })
        },
        //轮播图上传成功后的回调函数
        handleSuccess1(res,file){
            if(this.fileList3){
                let list= this.fileList3.split(',')
                list.push(res.data.src)
                this.fileList3=list.join(',')
            }else{
                this.fileList3=res.data.src
            }
            this.addBargainData.fileListImg.push({name:file.name,uid:file.uid,url:res.data.src});
        },
        beforeUpload1(file){ // 轮播图上传之前的钩子，判断文件大小阻止上传
            let size = file.size/1024/1024
            if(size>2){
                this.$message.error("图片不能大于2M")
                return false
            }else{
                return true
            }
        },
        beforeUpload2(file){ // 详情图上传之前的钩子，判断文件大小阻止上传
            let size = file.size/1024/1024
            if(size>2){
                this.$message.error("图片不能大于2M")
                return false
            }else{
                return true
            }
        },
        handleRemove2(file, fileList) { // 详情图的，三个钩子同上
            let list =[];
            fileList.forEach((itemFile,m)=>{
                if(itemFile){
                    if(itemFile.url){
                        list.push(itemFile.url)
                    }
                }
            });
            this.fileList4=list.join(',');
            this.addBargainData.fileListImg1.forEach((item,i)=>{
                if(item.uid===file.uid){
                    this.addBargainData.fileListImg1.splice(i,1);
                }
            })
        },
        //详情图上传成功后的回调函数
        handleSuccess2(res,file){
            if(this.fileList4){
                let list= this.fileList4.split(',')
                list.push(res.data.src)
                this.fileList4=list.join(',')
            }else{
                this.fileList4=res.data.src
            }
            this.addBargainData.fileListImg1.push({name:file.name,uid:file.uid,url:res.data.src});
        },
        max(){ // 轮播图上传达最大限制时的钩子
            this.$message.warning("轮播图最多上传五个")
        },
        save(ruleForm){
            let that = this;
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    this.saveLoading = true
                    let sku_detail = []
                    this.addBargainData.tableDataVal.forEach(el => {
                        sku_detail.push({id:el.id,floor_price:el.kill_price,stock:el.sku_stock})
                    });
                    let data = {
                        good_id: this.good_id, // 来源商品id
                        rotation_chart: this.fileList3, // 轮播图
                        detail_pics: this.fileList4, // 详情图
                        name: this.addBargainData.good_name, // 名称
                        sku_detail: sku_detail, // sku信息(JSON 对象数组)
                        end_time: this.addBargainData.end_time, // 结束时间
                        min_people: this.addBargainData.min_number, // 最少人数
                        max_people: this.addBargainData.max_number, // 最多人数
                        state: this.stateVal, // 状态
                        order_by: this.addBargainData.orderby, // 排序
                        pro_id: parseInt(localStorage.getItem("proId")) // 小程序id
                    };
                    if(this.$route.query.id){
                        data.id = this.$route.query.id
                    }
                    that.$axios.post(that.url+'shopapi/bargain_good/store',data)
                    .then(function (res) {
                        if(res.data.code==200){
                            that.$message.success("保存成功!");
                            that.$router.push({path:'/wf/admin/shop/markting/bargainMenu'});
                        }else{
                            that.$message.error(res.data.msg);
                            that.saveLoading = false
                        }
                    })
                    .catch(function (error) {
                        that.$message.error('请联系管理员');
                        that.saveLoading = false
                    });
                }else{
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-addBargain{
    background-color: #fff;
    padding: 20px;
    .my_table{
        .el-table__header-wrapper{
            th {
                background-color: rgb(243, 243, 243);
            }
        }
        .el-table__body-wrapper{
            tr {
                background-color: rgb(250, 250, 250);
            }
        }
       
    }
    
    .label-left .el-form-item__label{
        margin-left: 10px;
    }
    .el-form-item--mini{
        margin-bottom: 1.5625rem;
    }
    .rule_btn{
        margin-bottom: 1.8rem;
        font-size: 1rem;
    }
    .rule_guize{
        margin-right: 1.4375rem;
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
        top: -30px;
        left: 1px;
    }
    .el-form-item__content{
        margin-left: 10.625rem !important;
    }
    .tablelist{
        margin-top: 20px;
        text-align: center;
    }
    .wf-addSeckill-Shop-row{
        padding: 0 1rem 2rem 5rem;
        .wf-addCoupon-Shop-col-6{
            margin-left: 2rem;
        }
    }
    .wf-addSeckill-Shop-searchShop{
        margin-left: 35px;
    }
    .wf-addSeckill-Shop-col-5{
        margin-right: 30px;
    }
    .no-star /deep/ .el-form-item__label{
        margin-left: 12px;
        margin-right: -12px;
    }
    /deep/ .el-upload--picture-card{
        width: 80px;
        height: 80px;
    }
    /deep/ .el-upload-list--picture-card{
        .el-upload-list__item{
            width: 80px;
            height: 80px;
            margin-right: 20px;
        }
    }
    .el-input,/deep/ .el-input__inner{
        width: 300px;
        text-align: left;
    }
    .select-btn{
        color: #719ff8;
        border-color: #719ff8;
        &:hover,&:focus{
            background: #95b6f6;
            color: #fff;
            border-color: #95b6f6;
        }
    }
    /deep/ .bargain_price_input{
        .el-input{
            .el-input__inner{
                width: 117px;
                text-align: center;
                color: #E36F6B;
            }
        }
    }
    /deep/ .rule{
        .el-form-item__label{
            color: #719FF8;
            font-size: 20px;
            font-weight:bold;
        }
        .el-icon-question{
            font-size: 22px;
            color: #ccc;
        }
    }
    .wf-addSeckill-Shop-row{
        /deep/ .el-input{
            .el-input__inner{
                width: 140px;
                height: 28px;
            }
        }
    }
    /deep/ .el-pagination__jump{
        .el-input__inner{
            width: 100%;
            height: 24px;
            text-align: center;
        }
    }
    /deep/ .el-switch.is-checked .el-switch__core{
        border-color: #719FF8;
        background-color: #719FF8;
    }
    /deep/ .el-table{
        th{
            background: #F3F3F3;
            border-radius:4px 4px 0px 0px;
        }
        tr{
            background:#FAFAFA;
            border-radius:0px 0px 4px 4px;
            font-size: 16px;
            color: #333;
        }
    }
    /deep/ .right-text{
        .el-col{
            padding: 0!important;
        }
        .floor_price{
            width: 100px;
            margin-left: 280px;
        }
    }
    .save-btn{
        background: #719FF8;
        &:hover{
            background: #95b6f6;
        }
    }
}
</style>
