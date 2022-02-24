<template>
    <div class="wf-addGroup">
        <el-row :gutter="24">
            <el-col :xs="15" :sm="17" :md="19" :lg="20" :xl="22">
                <el-form :label-position="labelPosition"
                        :model="addCouponData"
                        :rules="rules"
                        ref="addCouponData"
                        label-width="140px"
                        class="demo-ruleForm">
                    <el-row class="rule_btn">
                        <span class="rule_guize" type="text">拼团规则</span>
                        <el-popover
                            placement="right"
                            width="340"
                            trigger="hover"
                            content="拼团创建立即生效，且不能修改，成团计入全部订单发货，失败须在团购订单下手动退款">
                            <span slot="reference" class="el-icon-question" style="color:#D7D7D7;font-size:1.125rem;"></span>
                        </el-popover>
                    </el-row>
                    <el-form-item label="商品" prop="goods" size="mini">
                        <el-button :disabled="state_disabled" class="input_width" style="width:5.625rem ;" size="mini" v-model="addCouponData.goods" @click="selectShow" type="primary">选择商品</el-button>
                    </el-form-item>
                    <el-form-item class="label-left" label="原价" prop="original_price" size="mini">
                        <el-input-number :precision="2" :controls="false" :disabled="state_disabled" :min="0" class="input_width" style="margin-right:5px;" size="mini" v-model="addCouponData.original_price"></el-input-number>
                    </el-form-item>
                    <el-form-item class="label-left" label="团购价" prop="concessional_rate" size="mini">
                        <el-input-number :precision="2" :controls="false" :disabled="state_disabled" :min="0" class="input_width" style="margin-right:5px;" size="mini" v-model="addCouponData.concessional_rate"></el-input-number>
                    </el-form-item>
                    <!-- ********************选择商品后出现*********开始*********** -->
                    <template v-if="show_goods">
                        <el-form-item label="轮播图(最多五个)" size="mini">
                            <el-upload 
                            :disabled="state_disabled"
                            size="mini"
                            class="upload-demo"
                            :action="upLoadUrl"
                            :on-remove="handleRemove1"
                            :on-success="handleSuccess1"
                            :file-list="fileList1"
                            :before-upload="beforeUpload1"
                            :on-exceed="max"
                            :limit='5'
                            list-type="picture-card">
                            <i class="el-icon-plus upload_img"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="详情图" size="mini">
                            <el-upload
                            :disabled="state_disabled"
                            size="mini"
                            class="upload-demo"
                            :action="upLoadUrl"
                            :on-remove="handleRemove2"
                            :on-success="handleSuccess2"
                            :before-upload="beforeUpload2"
                            :file-list="fileList2"
                            list-type="picture-card">
                            <i class="el-icon-plus upload_img"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="名称" prop="goods_name" size="mini">
                            <el-input :disabled="state_disabled" class="input_width"  size="mini" v-model="addCouponData.good_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品属性" size="mini">
                            <my-table class="my_table" :tableData="tableData" :columns="columns" :mutiSelect="mutiSelect" :pagination="false"  @multipleSelection="handleSelectionChange"></my-table>
                        </el-form-item>
                    </template>
                    <!-- ********************选择商品后出现**********结束********** -->
                    <el-form-item label="结束时间" prop="end_time" class="label-left">
                        <el-date-picker
                        :disabled="state_disabled"
                        class="input_width"
                        size="mini"
                        v-model="addCouponData.end_time"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="23:59:59"
                        type="datetime"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="label-left" label="参团人数" prop="people_num" size="mini">
                        <el-input-number :precision="0" :controls="false" :disabled="state_disabled" :min="2" class="input_width" style="margin-right:5px;" size="mini" v-model="addCouponData.people_num"></el-input-number>
                        人成团可发货
                    </el-form-item>
                    <el-form-item  class="label-left" label="单次购买限购数" prop="limit" size="mini">
                        <el-input-number :precision="0" :controls="false" :disabled="state_disabled" :min="0" class="input_width"  size="mini" v-model="addCouponData.limit"></el-input-number>
                    </el-form-item>
                    <el-form-item  class="label-left" label="虚拟销量" prop="sales" size="mini">
                        <el-input-number :precision="0" :controls="false" :disabled="state_disabled" :min="0" :max="100000" class="input_width"  size="mini" v-model="addCouponData.sales"></el-input-number>
                    </el-form-item>
                    <el-form-item label="排序" prop="orderby" size="mini">
                        <el-input-number :precision="0" :controls="false" :disabled="state_disabled" :min="0" :max="100000" class="input_width"  size="mini" v-model="addCouponData.orderby"></el-input-number>
                    </el-form-item>
                    <el-form-item label="状态" prop="state" >
                        <el-select :disabled="state_disabled" class="input_width" style="width:116px;" size="mini" v-model="addCouponData.state" placeholder="请选择状态">
                            <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="saveLoading" size="mini" type="primary"  @click="save('addCouponData')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog title="选择商品" :visible.sync="dialogTableVisible">
                <el-row class="wf-addCoupon-Shop-row">
                    <el-col :span="5" class="wf-addCoupon-Shop-col-5">
                        <el-input  size="mini" placeholder="商品名称" v-model="search_good_name"></el-input>
                    </el-col>
                    <el-col :span="6" class="wf-addCoupon-Shop-col-6">
                        <el-select size="mini"  placeholder="父分类" v-model="search_parent" @change="handleParentChange">
                            <el-option
                            v-for="item in parent_option"
                            :key="item.id"
                            :label="item.type_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" class="wf-addCoupon-Shop-col-6">
                        <el-select size="mini" placeholder="子分类" v-model="search_son">
                            <el-option
                            v-for="item in son_option"
                            :key="item.id"
                            :label="item.type_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-button size="mini" type="primary" class="wf-addCoupon-Shop-searchShop" @click="toselect(1)">搜索</el-button>
                </el-row>
            <my-table :tableData = 'tableDatal' :columns='columnsl' class="tablelist" :currentPage='currentPage' :pageSize="pageSize" :totalPage="totalPage" @currentChange="toselect"></my-table>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from "@/untils/common.js";
export default {
    name: 'shop_markting_addGroup',
    data() {
        return {
            saveLoading: false,
            search_good_name: '', // 搜索商品名称
            search_parent: '', // 搜索父分类
            search_son: '', // 搜索子分类
            parent_option: [],
            son_option: [],
            mutiSelect: true, // 默认开启全选
            disabled_group: false, // 默认不开启团购价禁选
            show_goods: false, // 选择商品后出现的内容
            param: this.$route.query.param, // 接收团购列表传进来的参数param是add(添加)还是edite(编辑)
            group_id: this.$route.query.group_id,
            query_state: this.$route.query.state, // 接收列表传来的状态
            state_disabled: false,
            options: {
                mutiSelect: true, // 是否支持列表项选中功能
            },
            labelPosition: 'left', // 表单对齐方式
            fileList1: [], // 轮播图上传图片绑定的数组
            fileList2: [], // 详情上传图片绑定的数组
            fileList3: [], // 用来存储添加的图片的路径的数组，点击保存时传参用
            fileList4: [], // 详情图的，同上
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            dialogTableVisible:false,//显示选择团购商品类表,
            value:'',
            currentPage:1,
            pageSize:5,
            totalPage: 0,
            input_shop:'',//商品名称,
            tableData: [], // 表格数据列表
            spec_select: '', // 选择到的商品规格信息，传参用
            spec_names: [], // 存储规格名，在规格详情的表格中使用
            state: [
            {
                value: '0',
                label: '无效'
            }, {
                value: '1',
                label: '有效'
            }],
            addCouponData:{
                state: '0', // 默认状态为无效
                end_time: '',
            },
            good_data: '', // 存储选择商品后获得的商品数据
            rules: {
                original_price: [
                    { required: true, message: '商品原价不能为空', trigger: 'blur' }
                ],
                concessional_rate: [
                    { required: true, message: '商品团购价不能为空', trigger: 'blur' }
                ],
                end_time: [
                    { required: true, message: '结束时间不能为空', trigger: 'blur' }
                ],
                people_num: [
                    { required: true, message: '参团人数不能为空', trigger: 'blur' }
                ],
                limit: [
                    { required: true, message: '单次购买限购数不能为空', trigger: 'blur' }
                ],
                sales: [
                    { required: true, message: '虚拟销量不能为空', trigger: 'blur' }
                ]
            },
            columns: [
                {   prop: "spec_name",
                    label: "商品属性",
                    align: "left",
                    // width: "800",
                    render: (h, param) => {
                        let a = []
                        for(var i=0;i<param.row.spec_name.split(",").length;i++){
                            a.push(this.spec_names[i] + '：' + param.row.spec_name.split(",")[i] + '；')
                        }
                        return h('span', a.join(""));
                    }
                },
                {
                    label: "团购价",
                    align: "left",
                    render: (h, param) => {
                        let a = [h('el-input-number', {
                                class:'group_price_input',
                                props: {
                                    size: "mini",
                                    value: param.row.group_price,
                                    disabled: this.disabled_group,
                                    precision: 2,
                                    controls: false
                                },
                                attrs: {
                                    style: 'width:150px;'
                                },
                                on: {
                                    input: (val) => {
                                        if(val!=''&&val!=undefined&&val!=null){
                                            param.row.group_price = val
                                        }else{
                                            param.row.group_price = val
                                        }
                                    }
                                }
                            }),[h('span','售价 ：￥'+param.row.sku_price)]];
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
                        let a = [
                        h('el-button', {
                            props: {
                                size: "mini",
                                type: "primary"
                            },
                            on: {
                                click: () => {
                                    this.choose(param.row.id)
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
        if(this.param=='edite'){
            this.mutiSelect = false
            this.disabled_group = true
        }else{
            this.mutiSelect = true
            this.disabled_group = false
        }

        if(this.query_state=='进行中'){
            this.state_disabled = true
        }else{
            this.state_disabled = false
        }
    },
    components: {
        MyTable
    },
    mounted(){
    },
    methods: {
        handleParentChange:function(){
            this.search_son = ""
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
            this.spec_select = val
        },
        editData(){ // 编辑，获取该团购的所有数据
            let that = this
            this.$axios.post(this.url+'shopapi/Group_good/getGroupGoodDetail',{
                token: localStorage.getItem('userId'),
                secret: localStorage.getItem('secretId'),
                good_id: this.group_id
            })
            .then(function (res) {
                if(res.data.code==200){
                    let broadcast = res.data.data.group_good.broadcast.split(",")
                    let good_detail_pics = res.data.data.group_good.good_detail_pics.split(",")
                    that.fileList1 = []
                    that.fileList2 = []
                    that.fileList3 = []
                    that.fileList4 = []
                    that.fileList3 = res.data.data.group_good.broadcast
                    that.fileList4 = res.data.data.group_good.good_detail_pics
                    for(var i=0;i<broadcast.length;i++){
                        that.fileList1.push({name:'',url:broadcast[i]})
                    }
                    for(var j=0;j<good_detail_pics.length;j++){
                        that.fileList2.push({name:'',url:good_detail_pics[j]})
                    }
                    that.addCouponData.good_name = res.data.data.group_good.good_name
                    that.addCouponData.original_price = res.data.data.group_good.original_price
                    that.addCouponData.concessional_rate = res.data.data.group_good.concessional_rate
                    that.addCouponData.end_time =dateFormat(res.data.data.group_good.end_time,"{y}-{m}-{d} {h}:{i}:{s}")
                    that.addCouponData.people_num = res.data.data.group_good.member_number
                    that.addCouponData.limit = res.data.data.group_good.purchase_number
                    that.addCouponData.sales = res.data.data.group_good.virtual_sales
                    that.addCouponData.orderby = res.data.data.group_good.orderby
                    if(res.data.data.group_good.state==0){
                        res.data.data.group_good.state = '无效'
                    }else if(res.data.data.group_good.state==1){
                        res.data.data.group_good.state = '有效'
                    }
                    
                    let spec_list = []
                    let group_price = ''
                    let sku_price = ''
                    let temp = [] // 规格名存储
                    let spec_name = [] // 规格值存储
                    res.data.data.sku_info.forEach(item=>{
                        let spec_nameIn=[];
                        item.spec.forEach(i=>{
                            spec_nameIn.push(i.group_spec_name)
                        })
                        spec_name.push(spec_nameIn);
                    });
                    for(var i in res.data.data.sku_info){  // 循环出sku_info里的规格、规格值、团购价和售价
                        for(var j=0;j<res.data.data.sku_info[i].group_spec_id.split(",").length;j++){
                            if(res.data.data.sku_info[i].group_spec_id.split(",")[j]==res.data.data.sku_info[i].spec[j].id){
                                temp.push(res.data.data.sku_info[i].spec[j].parent_name)
                            }
                        }
                        group_price = res.data.data.sku_info[i].group_sku_price
                        sku_price = res.data.data.sku_info[i].group_good_price
                        spec_list.push({spec_name:spec_name[i].join(','),group_price:group_price,sku_price:sku_price})
                    }
                    
                    let spec_names = []
                    for(var i = 0; i < temp.length; i++){
                        if(spec_names.indexOf(temp[i]) == -1){
                            spec_names.push(temp[i]);
                        }
                    }
                    that.spec_names = spec_names
                    that.tableData = spec_list
                    that.addCouponData.state = res.data.data.group_good.state
                    that.show_goods = true
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
        choose(id){ // 选择商品后获取的数据
            let that = this
            this.fileList1 = []
            this.fileList2 = []
            this.$axios.post(this.url+'shopapi/group_good/getGoodInfo',{
                token: localStorage.getItem('userId'),
                secret: localStorage.getItem('secretId'),
                id: id
            })
            .then(function (res) {
                if(res.data.code==1){
                    that.good_data = res.data.data.good_detail
                    that.addCouponData.good_name = res.data.data.good_detail.good_name
                    that.tableData = res.data.data.sepc_list
                    that.fileList3 = res.data.data.good_detail.broadcast
                    that.fileList4 = res.data.data.good_detail.good_detail_pics.join(',')
                    let broadcast = res.data.data.good_detail.broadcast.split(",")
                    let good_detail_pics = res.data.data.good_detail.good_detail_pics
                    for(var i=0;i<broadcast.length;i++){
                        that.fileList1.push({name:'',url:broadcast[i]})
                    }
                    for(var j=0;j<good_detail_pics.length;j++){
                        that.fileList2.push({name:'',url:good_detail_pics[j]})
                    }
                    for(var n=0;n<res.data.data.allSpec.length;n++){
                        that.spec_names.push(res.data.data.allSpec[n].spec_name)
                    }
                    that.mutiSelect = true
                    that.disabled_group = false
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
            var list=[]
            for(var i=0;i<this.fileList3.split(',').length;i++){ // 用来将添加的图片的路径循环出来放在一个数组里
                if(this.fileList3.split(',')[i]!=file.url){
                    list.push(this.fileList3.split(',')[i])
                }
            }
            this.fileList3=list.join(',');
        },
        handleSuccess1(res,file){ // 轮播图上传成功后的钩子
            var list = this.fileList3.split(',')
            list.push(res.data.src)
            this.fileList3=list.join(',')
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
            var list=[]
            for(var i=0;i<this.fileList4.split(',').length;i++){
                if(this.fileList4.split(',')[i]!=file.url){
                    list.push(this.fileList4.split(',')[i])
                }
            }
            this.fileList4=list.join(',');
        },
        handleSuccess2(res){
            var list = this.fileList4.split(',')
            list.push(res.data.src)
            this.fileList4=list.join(',')
        },
        max(){ // 轮播图上传达最大限制时的钩子
            this.$message.warning("轮播图最多上传五个")
        },
        save:function(ruleForm){ // 保存提交的接口
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    let that = this
                    let state = ''
                    state = this.addCouponData.state
                    if(state=="无效"){
                        state = 0
                    }else if(state=="有效"){
                        state = 1
                    }

                    let sku_detail = [] // 获取规格值、sku_id和团购价
                    for(var i in this.spec_select){
                        sku_detail.push({
                            sku_id: this.spec_select[i].id,
                            favourable_price: this.spec_select[i].group_price,
                            spec_name: this.spec_select[i].spec_name,
                            group_good_price: this.spec_select[i].sku_price
                        })
                    }

                    let editor = ''
                    
                    if(this.param=='add'){
                        editor = 1
                    }else if(this.param=='edite'){
                        if(this.spec_select==''){
                            editor = 0
                        }else{
                            editor = 1
                        }
                    }

                    if(this.show_goods==false){
                        this.$message.error("请选择商品")
                        return
                    }
                    if(this.param=='add'&&this.spec_select.length==0){
                        this.$message.error("请选择商品属性")
                        return
                    }

                    let group_id = ''
                    if(this.group_id!=undefined&&this.group_id!=''&&this.group_id!=null){
                        group_id = parseInt(this.group_id)
                    }else{
                        group_id = ''
                    }
                    
                    let good_id = ''
                    if(this.good_data.id!=undefined&&this.good_data.id!=''&&this.good_data.id!=null){
                        good_id = this.good_data.id
                    }else{
                        good_id = ''
                    }
                    let data={
                        secret: localStorage.getItem('secretId'),
                        good_id: good_id,
                        broadcast: this.fileList3,
                        good_detail_pics: this.fileList4,
                        good_name: this.addCouponData.good_name,
                        original_price: this.addCouponData.original_price,
                        concessional_rate: this.addCouponData.concessional_rate,
                        end_time: this.addCouponData.end_time,
                        member_number: this.addCouponData.people_num,
                        purchase_number: this.addCouponData.limit,
                        virtual_sales: this.addCouponData.sales,
                        orderby: this.addCouponData.orderby,
                        state: state,
                        sku_detail: sku_detail,
                        id: group_id,
                        editor: editor
                    }
                    this.saveLoading = true
                    this.$axios.post(this.url+'/shopapi/Group_good/addGroupGoodDetail',data)
                    .then(function (res) {
                        if(res.data.code==200){
                            that.$message.success("保存成功");
                            that.$router.push({path:'/wf/admin/shop/markting/group'})
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
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
.wf-addGroup{
    background-color: #fff;
    padding: 20px;
    .label-left .el-form-item__label{
        margin-left: -10px;
    }
    .el-form-item--mini{
        margin-bottom: 1.5625rem;
    }
    .input_width{
        width: 12rem;
        height: 2rem;
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
        top: -40px;
        left: 1px;
    }
    // .el-form-item__content{
    //     margin-left: 10.625rem !important;
    // }
    .el-upload-list--picture-card .el-upload-list__item{
        margin: 0 1.6875rem  8px 0;
    }
    .tablelist{
        margin-top: 20px;
        text-align: center;
    }
    .wf-addCoupon-Shop-row{
        padding: 0 1rem 2rem 5rem;
        .wf-addCoupon-Shop-col-6{
            margin-left: 2rem;
        }
    }
    .wf-addCoupon-Shop-searchShop{
        margin-left: 35px;
    }
}
</style>