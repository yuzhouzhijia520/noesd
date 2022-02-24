<template>
    <div class="wf-markting-addSeckill">
        
        <el-row :gutter="24">
            <el-col :xs="15" :sm="17" :md="19" :lg="20" :xl="22">
                <el-form :label-position="labelPosition"
                        :model="addSeckillData"
                        :rules="rules"
                        ref="addSeckillData"
                        label-width="10rem"
                        class="demo-ruleForm">
                    <el-form-item class="label-left" label="商品" prop="validFlagGoods" size="mini">
                        <el-button class="input_width" style="width:5.625rem ;" size="mini" v-model="addSeckillData.validFlagGoods" @click="selectShow" type="primary">选择商品</el-button>
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
                            :file-list="addSeckillData.fileListImg"
                            :before-upload="beforeUpload1"
                            :on-exceed="max"
                            :limit='5'
                            list-type="picture-card"
                            >
                            <i class="el-icon-plus upload_img"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item class="label-left" label="详情图" size="mini">
                            <el-upload
                            
                            size="mini"
                            class="upload-demo"
                            :action="upLoadUrl"
                            :on-remove="handleRemove2"
                            :on-success="handleSuccess2"
                            :before-upload="beforeUpload2"
                            :file-list="addSeckillData.fileListImg1"
                            list-type="picture-card">
                            <i class="el-icon-plus upload_img"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="名称" prop="good_name" size="mini">
                            <el-input  class="input_width"  size="mini" v-model="addSeckillData.good_name"></el-input>
                        </el-form-item>
                        <el-form-item label="详细介绍" prop="good_details" size="mini">
                            <el-input  class="input_width"  size="mini" v-model="addSeckillData.good_details"></el-input>
                        </el-form-item>
                        <el-form-item label="商品属性" size="mini" prop="tableDataVal">
                            <my-table class="my_table"  ref="my_table_goods" :tableData="tableData" v-model="addSeckillData.tableDataVal" :columns="columns" :mutiSelect="mutiSelect" :pagination="false"  @multipleSelection="handleSelectionChange"></my-table>
                        </el-form-item>
                    </template>
                    <!-- ********************选择商品后出现**********结束********** -->
                    <el-form-item label="秒杀时间" prop="time" size="mini">
                        <div class="block" >
                            <el-date-picker
                            v-model="addSeckillData.time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            align="right"
                            :default-time="['00:00:00', '23:59:59']"
                             value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="限购" prop="purchase_number" size="mini">
                        <el-input-number :precision="0" :controls="false" v-model="addSeckillData.purchase_number" size="mini" :min="0" :max="100000"></el-input-number>&nbsp件
                    </el-form-item>
                    <el-form-item class="label-left" label="排序" prop="orderby" size="mini">
                        <el-input-number :precision="0" :controls="false" v-model="addSeckillData.orderby" size="mini" :min="0" :max="100000"></el-input-number>
                    </el-form-item>
                    <el-form-item class="label-left" label="状态" prop="state"  >
                        <el-select size="mini" v-model="stateVal" placeholder="请选择状态" >
                            <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="saveLoading" size="mini" type="primary" @click="save('addSeckillData')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
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
            <my-table :tableData = 'tableDatal' :columns='columnsl' class="tablelist" :currentPage='currentPage' :pageSize="pageSize" :totalPage="totalPage" @currentChange="toselect"></my-table>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from "@/untils/common.js";
export default {
    name: 'addSeckill',
    data() {
        //是否选择商品检验
        let that=this;
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
                    callback(new Error('请勾选商品属性'));
                }
            };
            
        return {
            saveLoading: false,
            search_good_name: '', // 搜索商品名称
            search_parent: '', // 搜索父分类
            search_son: '', // 搜索子分类
            parent_option: [],
            son_option: [],
            mutiSelect: true, // 默认开启全选
            // disabled_group: false, // 默认不开启团购价禁选
            show_goods: false, // 选择商品后出现的内容
            param: this.$route.query.param, // 接收团购列表传进来的参数param是add(添加)还是edite(编辑)
            group_id: this.$route.query.group_id,
            query_state: this.$route.query.state, // 接收列表传来的状态
            // state_disabled: false,
            options: {
                mutiSelect: true, // 是否支持列表项选中功能
            },
            labelPosition: 'left', // 表单对齐方式
            // fileList1: [], // 轮播图上传图片绑定的数组
            // fileList2: [], // 详情上传图片绑定的数组
            fileList3: null, // 用来存储添加的图片的路径的数组，点击保存时传参用
            fileList4: null, // 详情图的，同上
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            dialogTableVisible:false,//显示选择团购商品类表,
            value:'',
            currentPage:1,
            pageSize:5,
            totalPage: 0,
            input_shop:'',//商品名称,
            tableData: [], // 表格数据列表
            // spec_select: '', // 选择到的商品规格信息，传参用
            spec_names: [], // 存储规格名，在规格详情的表格中使用
            stateVal:'0',
            good_id:null,//商品id
            state: [
            {
                value: '0',
                label: '无效'
            }, {
                value: '1',
                label: '有效'
            }, {
                value: '2',
                label: '终止'
            }],
            addSeckillData:{
                state: '0', // 默认状态为无效
                validFlagGoods:false,//检验标记，是否选择过商品
                fileListImg:[],
                fileListImg1:[],
                tableDataVal:[],
                good_name:null,
                good_details:null,
                time:[],
                // purchase_number:null,
                // orderby:null
            },
            good_data: '', // 存储选择商品后获得的商品数据
            rules: {
                //是否有选择商品
                validFlagGoods: [
                    { validator: validSelectFlagGoods, trigger: 'blur' }
                ],
                //是否有上传轮播图
                fileListImg: [
                    { required: true,validator: validFileListImg,  trigger: 'blur' }
                ],
                //是否有勾选商品属性
                tableDataVal:[
                     { required: true, validator: validTableDataVal, trigger: 'blur' }
                ],
                good_name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                good_details: [
                    { required: true, message: '详细介绍不能为空', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '秒杀时间不能为空', trigger: 'blur' }
                ],
                purchase_number: [
                    { required: true, message: '限购不能为空', trigger: 'blur' }
                ]
            },
            isFirstInEidtFlag:0,
            columns: [
                {   prop: "spec_name",
                    label: "商品属性",
                    align: "left",
                    width: "200",
                    render: (h, param) => {

                        if(that.$route.query.param&&that.$route.query.good_id){
                            if(that.$route.query.param=='edit'){
                                return h('span', param.row.spec_name);
                            }
                        }else{
                            let a = [];
                            for(var i=0;i<param.row.spec_name.split(",").length;i++){
                                a.push(that.spec_names[i]+":"+param.row.spec_name.split(",")[i])
                            }
                            return h('span', a.join());
                        }
                       
                        // this.$refs.my_table_goods.$refs.multipleTable.toggleAllSelection();
                        // that.isFirstInEidtFlag++;
                        // console.log(that.isFirstInEidtFlag);
                        //  
                       
                    }
                },
                {
                    label: "秒杀价",
                    align: "left",
                    render: (h, param) => {
                        let a = [h('el-input-number', {
                                class:'group_price_input',
                                props: {
                                    size: "mini",
                                    value: param.row.kill_price,
                                    precision: 2,
                                    controls: false,
                                    max:10000000
                                },
                                attrs: {
                                    style: 'width:150px;'
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
                    align: "left",
                    render: (h, param) => {
                         
                        let a = [h('el-input-number', {
                                class:'group_price_input',
                                props: {
                                    size: "mini",
                                    value: param.row.kill_good_stock,
                                    controls: false,
                                    max:10000000
                                },
                                attrs: {
                                    style: 'width:150px;'
                                },
                                on: {
                                    input: (val) => {
                                        if(val!=''&&val!=undefined&&val!=null){
                                            param.row.kill_good_stock = val
                                        }else{
                                            param.row.kill_good_stock =''
                                        }
                                    }
                                }
                            }),[h('span','库存 ：'+param.row.sku_stock)]];
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
                    prop: "",
                    label: "操作",
                    align: "center",
                    render: (h, param) => {
                        let that=this;
                        let a = [
                        h('el-button', {
                            props: {
                                size: "mini",
                                type: "primary"
                            },
                            on: {
                                click: () => {
                                    that.addSeckillData.validFlagGoods=true;//已选择过商品
                                    that.good_id=param.row.id;
                                    that.choose(param.row.id);
                                }
                            }
                        }, '选择')];
                        return h('div', a);
                    }
                }
            ],
        }
    },
    created(){
        if(this.group_id!=undefined&&this.group_id!=''&&this.group_id!=null){
            this.editData()
        }
        // if(this.param=='edite'){
        //     this.mutiSelect = false
        //     this.disabled_group = true
        // }else{
        //     this.mutiSelect = true
        //     this.disabled_group = false
        // }

        // if(this.query_state=='进行中'){
        //     this.state_disabled = true
        // }else{
        //     this.state_disabled = false
        // }

        //判断是否是编辑秒杀，如果是，则初始化编辑秒杀页面参数
        if(this.$route.query.param&&this.$route.query.good_id){
            if(this.$route.query.param=='edit'){
                this.initPageParams(this.$route.query.good_id);
            }
        }
    },
    components: {
        MyTable
    },
    mounted(){

    },
    methods: {
        //编辑页面参数初始化
        initPageParams(good_id){
            this.good_id=parseInt(good_id);
            let that=this;
            let data={
                good_id:this.good_id
            };
            this.$axios.post(this.url+'shopapi/Kill_good/getkillGoodDetail',data)
            .then(function (res) {
                let data=res.data.data;
                 
                if(res.data.code==200){
                    that.addSeckillData.validFlagGoods=true;//已选择过商品
                    that.mutiSelect = true;
                    that.show_goods = true;
                    that.addSeckillData.fileListImg=[];
                    that.good_id=data.kill_good.good_id;
                    for(let i=0;i<data.kill_good.broadcast.split(',').length;i++){
                        that.addSeckillData.fileListImg.push({name:'',url:data.kill_good.broadcast.split(',')[i]});
                    }//轮播图
                    that.fileList3=data.kill_good.broadcast;
                    that.addSeckillData.fileListImg1=[];
                       
                    if(data.kill_good.good_detail_pics!=null&&data.kill_good.good_detail_pics){
                        for(let i=0;i<data.kill_good.good_detail_pics.split(',').length;i++){
                            that.addSeckillData.fileListImg1.push({name:'',url:data.kill_good.good_detail_pics.split(',')[i]});
                        }//详情图
                    }
                   
                    that.fileList4=data.kill_good.good_detail_pics;
                    that.addSeckillData.good_name=data.kill_good.good_name;//名称
                    that.addSeckillData.good_details=data.kill_good.good_details;//详细介绍
                    that.tableData = []; // 获取规格值、sku_id和团购价
                    that.spec_names=[];//商品属性名称
                        data.sku_info.forEach((item,i)=>{
                            that.tableData.push({
                                    id: data.sku_info[i].id,
                                    kill_price: data.sku_info[i].kill_sku_price,
                                    sku_price:data.sku_info[i].kill_good_price,
                                    sku_stock: data.sku_info[i].kill_good_stock,
                                    spec_id:data.sku_info[i].kill_spec_id,
                                    kill_good_stock:data.sku_info[i].kill_sku_stock,
                                    spec_name:[]
                                });
                                let spec_name=[];
                                if(i<data.sku_info.length){
                                    data.sku_info[i].spec.forEach((childItem,k)=>{
                                        that.spec_names.push(childItem.parent_name);
                                        spec_name[k]=data.sku_info[i].spec[k].title_name;
                                    })
                                }
                                that.tableData[i].spec_name=spec_name.join('');
                        })
                    that.addSeckillData.time=[dateFormat(data.kill_good.start_time),dateFormat(data.kill_good.end_time)];//时间
                    that.addSeckillData.purchase_number=data.kill_good.purchase_number;//限购
                    that.addSeckillData.orderby=data.kill_good.orderby;//排序
                    that.stateVal=data.kill_good.state.toString();//状态
                    that.$nextTick(()=>{
                        that.$refs.my_table_goods.$refs.multipleTable.toggleAllSelection();
                    })
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
        save(ruleForm){ // 保存
            let that = this;
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                        this.saveLoading = true
                        let sku_detail = [] // 获取规格值、sku_id和团购价
                       
                        for(var i in that.addSeckillData.tableDataVal){
                            sku_detail.push({
                                sku_id: that.addSeckillData.tableDataVal[i].id,
                                kill_good_price: that.addSeckillData.tableDataVal[i].sku_price,
                                kill_sku_stock: that.addSeckillData.tableDataVal[i].sku_stock,
                                spec_name:that.addSeckillData.tableDataVal[i].spec_name,
                                favourable_price:that.addSeckillData.tableDataVal[i].kill_price,
                                favourable_stock:that.addSeckillData.tableDataVal[i].kill_good_stock
                            })
                        }
                        let data={
                            good_id:that.good_id,
                            secret: localStorage.getItem('secretId'),
                            good_name:that.addSeckillData.good_name,
                            good_details:that.addSeckillData.good_details,
                            broadcast:that.fileList3,
                            good_detail_pics:that.fileList4,
                            start_time:that.addSeckillData.time[0],
                            end_time:that.addSeckillData.time[1],
                            purchase_number:that.addSeckillData.purchase_number,
                            orderby:that.addSeckillData.orderby,
                            state:that.stateVal,
                            sku_detail:sku_detail
                        };

                        //编辑新增id传入后台
                        if(that.$route.query.param&&that.$route.query.good_id){
                            if(that.$route.query.param=='edit'){
                                data.id=that.$route.query.good_id;
                            }
                        }
                       
                        that.$axios.post(that.url+'shopapi/Kill_good/addKillGoodDetail',data)
                        .then(function (res) {
                            if(res.data.code==200){
                                that.$message.success("保存成功!");
                                that.$router.push({path:'/wf/admin/shop/markting/seckill'});
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
            this.addSeckillData.tableDataVal = val;
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
        choose(id){ // 选择商品后获取的数据
            let that = this
            
            this.$axios.post(this.url+'shopapi/Kill_good/getGoodInfo',{
                token: localStorage.getItem('userId'),
                secret: localStorage.getItem('secretId'),
                id: id
            })
            .then(function (res) {
                if(res.data.code==1){
                    that.good_data = res.data.data.good_detail
                    that.addSeckillData.good_name = res.data.data.good_detail.good_name
                    that.addSeckillData.good_details = res.data.data.good_detail.good_details
                    that.tableData = res.data.data.sepc_list
                    that.fileList3 = res.data.data.good_detail.broadcast
                    that.fileList4 = res.data.data.good_detail.good_detail_pics.join(',')
                    let broadcast = res.data.data.good_detail.broadcast.split(",")
                    let good_detail_pics = res.data.data.good_detail.good_detail_pics
                    that.addSeckillData.fileListImg = []
                    that.addSeckillData.fileListImg1 = []
                    for(var i=0;i<broadcast.length;i++){
                        that.addSeckillData.fileListImg.push({name:'',url:broadcast[i]})
                    }
                    for(var j=0;j<good_detail_pics.length;j++){
                        that.addSeckillData.fileListImg1.push({name:'',url:good_detail_pics[j]})
                    }
                    for(var n=0;n<res.data.data.allSpec.length;n++){
                        that.spec_names.push(res.data.data.allSpec[n].spec_name)
                    }
                    that.mutiSelect = true
                    // that.disabled_group = false
                    that.dialogTableVisible=!that.dialogTableVisible
                    that.show_goods = true
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
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
            this.addSeckillData.fileListImg.forEach((item,i)=>{
                if(item.uid===file.uid){
                    that.addSeckillData.fileListImg.splice(i,1);
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
            this.addSeckillData.fileListImg.push({name:file.name,uid:file.uid,url:res.data.src});
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
            this.addSeckillData.fileListImg1.forEach((item,i)=>{
                if(item.uid===file.uid){
                    that.addSeckillData.fileListImg1.splice(i,1);
                }
            })
        },
        //详情图上传成功后的回调函数
        handleSuccess2(res){
            if(this.fileList4){
                let list= this.fileList4.split(',')
                list.push(res.data.src)
                this.fileList4=list.join(',')
            }else{
                this.fileList4=res.data.src
            }
            this.addSeckillData.fileListImg1.push({name:file.name,uid:file.uid,url:res.data.src});
        },
        max(){ // 轮播图上传达最大限制时的钩子
            this.$message.warning("轮播图最多上传五个")
        },
    }
}
</script>

<style lang="scss">
@import '@/styles/components/css_WF_admin/shop_admin/markting/addSeckill.scss'
</style>
