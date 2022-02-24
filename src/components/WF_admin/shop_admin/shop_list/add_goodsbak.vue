<template>
    <div id="add_goods">
       <el-row :gutter="24">
            <el-col :xs="15" :sm="17" :md="19" :lg="20" :xl="22">
                <el-form :label-position="labelPosition"     
                        :model="addCouponData"
                        :rules="rules"
                        ref="addCouponData"
                        label-width="10rem"
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
                    <el-form-item class="Taobao-collection" label="淘宝一键采集">
                        <el-popover
                        placement="top-start"
                        width="760"
                        trigger="hover"
                        content="快速读取淘宝或天猫商品详情图片及参数商品链接为:
                        https://item.taobao.com/item.htm?spm=a212j8.1690022.act-universal-20181212-item-1x5-pc4.13.6c89YRUxYRUx1x&id=583378658926
                        或
                        https://item.taobao.com/item.htm?spm=a219r.lm843.14.7.4e136548Y7oTGV&id=575592473006&ns=1&abbucket=16#detail
                        若不使用，则该项为空">
                            <i slot="reference" class="el-icon-question"></i>
                        </el-popover>
                        <el-col :span="1"><el-input v-model="Taobao_url" placeholder="请输入淘宝或天猫商品链接" @change="storageTaobao"></el-input></el-col>
                        <el-col :span="1"><el-button @click="taoBaoCollection" size="mini">立即获取</el-button></el-col>
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
                    <el-form-item class="label-left" label="轮播图" prop="lunbo" size="mini">
                        <el-upload
                        :action="upUrl+'supper/attachment/upfile'"
                        list-type="picture-card"
                        multiple
                        :limit="5"
                        :on-exceed="exceedLimit"
                        :before-upload="beforeUpload"
                        :on-success="handlePictureCardPreview"
                        :on-remove="lunboRemove"
                        :file-list="fileList1"
                        :on-preview="lunboPreview">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="lunboVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item class="label-left" label="商品标题" prop="pro_title" size="mini">
                        <el-input class="input_width" style="width:400px;" size="mini" v-model="addCouponData.pro_title"></el-input>
                    </el-form-item>
                    <el-form-item class="label-left" label="描述(最多40个字)" prop="description" size="mini">
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
                    </el-form-item>
                    <el-form-item label="规格明细" size="mini">
                        <el-row class="jianju add-price" v-for="(item,index) in spec" :key="index">
                            <el-row class="jianju">
                                <span>规格名:</span>
                                <span>
                                    <el-autocomplete
                                    style="width:120px;margin:0 20px 20px 20px;"
                                    class="inline-input"
                                    :fetch-suggestions="querySearch"
                                    v-model="spec[index]"
                                    placeholder="请输入规格"
                                    @select="handleSelect"
                                    ></el-autocomplete>
                                </span>
                                <span>
                                    <i class="el-icon-delete delete_icon" @click="deleteSPC(index)"></i>
                                </span>
                            </el-row>
                            <div class="jianju">
                                <span style="margin-right: 20px;">规格值:</span>
                                <div style="display:inline;" v-for="(list,i) in son_spec[index]" :key="i" >
                                    <el-input :maxlength="10" class="SPC_V_input" style="width:120px;margin-right:20px;margin-bottom:20px;" v-model="son_spec[index][i]" placeholder="请输入规格值" ></el-input>
                                    <i class="el-icon-circle-close delete_SPC_V" @click="deleteSPCValue(index,i)"></i>
                                </div>
                                <span class="a" @click="addSPCValue(index)">添加规格值</span>
                            </div>
                        </el-row>

                        <el-row class="jianju"><el-button @click="addSPC">添加规格</el-button></el-row>
                        <div class="addtable">
                            <el-row class="jianju" v-if="spec!=''">
                                <el-col :span="1" style="width:70px;height:100%;" v-for="(item,index) in spec" :offset="1" :key="index">{{spec[index]}}</el-col>
                                <el-col :span="2" :offset="1"><span class="wf-red">*</span>现价</el-col>
                                <el-col :span="2" :offset="1"><span class="wf-red">*</span>库存</el-col>
                                <el-col :span="2" :offset="1">编码</el-col>
                                <el-col :span="3" :offset="1">缩略图(160*160px)</el-col>
                            </el-row>
                            <el-row v-if="spec!=''" v-for="(item,index) in sku" :key="item[index]" style="border-top: 1px solid #e5e5e5;padding: 20px 0;">
                                <el-col v-if="guige===false" :span="1" style="width:70px;height:100%;" :offset="1" v-for="(list,i) in sku[index].sku_name.split(',')" :key="i">{{list}}</el-col>
                                <el-col v-if="guige===true" :span="1" style="width:70px;height:100%;"  :offset="1" v-for="(list,i) in sku_list[index]" :key="i">{{list}}</el-col>
                                <el-col :span="2" :offset="1">
                                    <el-input-number style="width:100px;" :precision="2" :min="0.01" :controls="false" v-model="sku[index].sku_price"></el-input-number>
                                </el-col>
                                <el-col :span="2" :offset="1">
                                    <el-input-number style="width:100px;" :precision="0" :controls="false" v-model="sku[index].sku_stock"></el-input-number>
                                </el-col>
                                <el-col :span="2" :offset="1">
                                    <el-input v-model="sku[index].sku_code"></el-input>
                                </el-col>
                                <el-col :span="3" :offset="1">
                                        <input class="file_input" type="file" @change="smallUpload($event,index)">
                                        <img v-if="sku[index].sku_thumbnail" :src="sku[index].sku_thumbnail" style="display:block;width:60px;height:50px;">
                                        <div v-else style="border:1px solid #e8e8e8;width:70px;">
                                            <i class="el-icon-plus avatar-uploader-icon"></i>
                                            <p v-if="sku[index].sku_thumbnail==''" style="margin-bottom: 0px;margin-left:5px;">上传图片</p>
                                        </div>
                                </el-col>
                            </el-row>
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
                        v-model="addCouponData.details">
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
                                    :on-success="handleDetail">
                                    <img v-if="item.url" :src="item.url" class="avatar"/>
                                    </el-upload>
                                <div class="upload-icon">
                                    <el-row>
                                        <el-col :span="12" class="upload-icon-img">
                                            <i class="el-icon-view" ></i> <img v-if="item.url" :preview="index" :src="item.url" class="avatar"/>
                                        </el-col>
                                        <el-col :span="12">
                                            <i class="el-icon-delete" @click="handleRemove(index)"></i>
                                        </el-col>
                                    </el-row>
                                    
                                </div>
                            </li>
                        </draggable>
                        <li class="detailImg1" @click="handleDetailImg(-1)">
                            <el-upload 
                                :action="upUrl+'supper/attachment/upfile'"
                                list-type="picture-card"
                                :show-file-list="false"
                                :before-upload="beforeUpload"
                                :on-success="handleDetailAdd">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                         </li>
                    </el-form-item>
                    <el-form-item label="排序" prop="orderby" >
                        <el-input-number :precision="0" :controls="false" :max="9999" class="input_width" size="mini" v-model="addCouponData.orderby"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" @click="save">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import {imgFormat} from "@/untils/common.js"
export default {
    name: 'shop_add_goods',
    data() {
        const token=localStorage.getItem('userId');
        return {
            pageData: {
                description: "",
                details: "",
                orderby: undefined,
                original_price: undefined,
                pro_title: "",
                recommend: "1",
                state: "1",
                virtual_sales: undefined,
                imageUrl: "",
                dialogImageUrl: "",
                detailImg: [],
                selectedOptions: [],
                spec: [''],
                son_spec: [['']],
                sku_list: [],
                sku: [],
                Taobao_url: ""
            },
            guige: true,
            lunboVisible: false,
            detailVisible: false,
            flagSku: true,
            getTaoBao: false,
            Taobao_url: "", // 淘宝商品链接
            imageUrl:'',//主图
            dialogImageUrl: '',//轮播图
            upUrl:'',//图片上传路径
            detailImg:[],//详情图上传
            fileList1: [],
            fileList2: [],
            fileList3: [], // 详情图传参用数组
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
            spec:[''],
            son_spec:[['']],
            sku:[],
            sku_list:[],
            addCouponData: {
                state: '1', // 默认状态为上架
                recommend: '1',
                pro_title: "",
                description: "",
                details: "",
                orderby: undefined,
                original_price: undefined,
                virtual_sales: undefined,
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
            }
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
    created() {
        this.upUrl=this.url;
        this.classList();  //分类接口
    },
    mounted() {
        this.restaurants = this.loadAll();
        let obj = JSON.parse(localStorage.getItem("pageData"))
        if(obj!=null){
            this.addCouponData.description = obj.description
            this.addCouponData.details = obj.details
            this.addCouponData.orderby = obj.orderby
            this.addCouponData.original_price = obj.original_price
            this.addCouponData.pro_title = obj.pro_title
            this.addCouponData.recommend = obj.recommend
            this.addCouponData.state = obj.state
            this.addCouponData.virtual_sales = obj.virtual_sales
            this.selectedOptions = obj.selectedOptions
            this.spec = obj.spec
            this.son_spec = obj.son_spec
            this.sku_list = obj.sku_list
            this.flagSku = false
            this.sku = obj.sku
            this.Taobao_url = obj.Taobao_url
            this.imageUrl = obj.imageUrl
            let arr = []
            if(obj.dialogImageUrl!=""){
                if(obj.dialogImageUrl[0].response!=undefined&&obj.dialogImageUrl[0].response!=""&&obj.dialogImageUrl[0].response!=null){
                    for(var i=0;i<obj.dialogImageUrl.length;i++){
                        // arr.push({url:obj.dialogImageUrl[i].response.data.src,data:"",response:{data:{src:obj.dialogImageUrl[i]}}})
                        arr.push(obj.dialogImageUrl[i])
                    }
                    this.fileList1 = arr
                }else{
                    for(var i=0;i<obj.dialogImageUrl.length;i++){
                        arr.push({url:obj.dialogImageUrl[i],data:"",response:{data:{src:obj.dialogImageUrl[i]}}})
                    }
                    this.fileList1 = arr
                }
            }else{
                this.fileList1 = []
            }
            this.dialogImageUrl = obj.dialogImageUrl
            this.detailImg = obj.detailImg
        }
    },
    methods: {
        classJump(){
            this.$router.push({path:"/wf/admin/shop/class_management"})
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
        exceedLimit(){
            this.$message.warning("轮播图最多上传5个")
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
        beforeAvatarUpload(res) { // 主图上传
            if(res.code==0){
                this.imageUrl = imgFormat(res.data.src,'q',75)
                this.pageData.imageUrl = imgFormat(res.data.src,'q',75)
            }else{
                this.$message.error("图片上传失败");
            }
            
        },
        lunboRemove(file,fileList){  //轮播图删除
            let arr = []
            if(fileList.length>0){
                for(var i=0;i<fileList.length;i++){
                    arr.push(fileList[i].response.data.src)
                }
            }
            this.dialogImageUrl = arr
            this.pageData.dialogImageUrl = arr
        },
        handleRemove(index) {  //详情图删除
            this.detailImg.splice(index,1);
            this.pageData.detailImg.splice(index,1);
        },
        handlePictureCardPreview(res,file,fileList) { //轮播图上传
            if(res.code==0){
                this.dialogImageUrl=fileList;
                this.pageData.dialogImageUrl = fileList
            }else{
                this.$message.error("图片上传失败");
                return;
            }
        },
        lunboPreview(file){
            this.dialogImageUrl = file.url;
            this.lunboVisible = true;
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
                }
                this.detailImg.splice(this.handleDetailImgIndex,1,data);
                this.pageData.detailImg = this.detailImg.splice(this.handleDetailImgIndex,1,data)
            }else{
                this.$message.error("图片上传失败");
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
                this.pageData.detailImg = this.detailImg
            }else{
                this.$message.error("图片上传失败");
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
            let that=this;
            this.$axios.post(this.url+'shopapi/Goodtype/typeindex',
                'secret='+localStorage.getItem('secretId')+
                '&token='+localStorage.getItem('userId')+
                '&page=' + 1
            ).then(function (res) {
                if(res.data.code==1){
                    let data = res.data.data
                    let list=[]
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
            this.pageData.selectedOptions = e
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
      loadAll() {
        return [
          { "value": "颜色" },
          { "value": "大小" },
          { "value": "尺寸" },
          { "value": "套餐类型" },
          { "value": "长度" },
          { "value": "尺码" }
        ]
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
        this.pageData.son_spec = this.son_spec

        func([],0,this.son_spec);
        this.sku_list=arr;
        this.pageData.sku_list = this.sku_list
        var arrs=[]
        for(var a=0;a<arr.length;a++){
            var c={
                sku_name:arr[a].join(','),
                sku_price:'',
                sku_stock:'',
                sku_code:'',
                sku_thumbnail: ''
            }
            arrs.push(c)
        }
        this.sku = arrs;
        this.pageData.sku = this.sku
      },
      addSPC(){  //添加规格
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
            for(var i in this.sku){ // 循环判断sku中的现价和库存都不能为空
                if(this.sku[i].sku_stock===''||this.sku[i].sku_stock===0){
                    bool = false
                }else if(this.sku[i].sku_price===''){
                    bool = false
                }
            }
            let broadcast=[]
            let good_detail_pics=[]
            if(this.getTaoBao===false){
                if(this.dialogImageUrl===""||this.dialogImageUrl.length===0){
                    broadcast = []
                }else if(this.dialogImageUrl[0].response&&this.dialogImageUrl[0].response!=undefined){
                    for(var i=0;i<this.dialogImageUrl.length;i++){
                        if(this.dialogImageUrl[i].response&&this.dialogImageUrl[i].response!=undefined){
                            broadcast.push(this.dialogImageUrl[i].response.data.src)
                        }
                    }
                }else{
                    broadcast = this.dialogImageUrl
                }
                if(this.detailImg.length===0){
                    good_detail_pics = []
                }else{
                    if(this.detailImg[0].response){
                        for(var i=0;i<this.detailImg.length;i++){
                            good_detail_pics.push(this.detailImg[i].response.data.src)
                        }
                    }else{
                        for(var i=0;i<this.detailImg.length;i++){
                            good_detail_pics.push(this.detailImg[i].url)
                        }
                    }
                }
            }else{
                broadcast = this.dialogImageUrl
                for(var i=0;i<this.detailImg.length;i++){
                    good_detail_pics.push(this.detailImg[i].url)
                }
            }
            if(this.selectedOptions.length===0){
                this.$message.error('商品分类不能为空');
            }else if(this.imageUrl===''){
                this.$message.error('主图不能为空');
            }else if(broadcast.length===0){
                this.$message.error('轮播图至少上传一张')
            }else if(this.addCouponData.pro_title===''){
                this.$message.error('商品标题不能为空');
            }else if(this.addCouponData.original_price===''){
                this.$message.error('原价不能为空');
            }else if(this.spec===''||this.son_spec===''){
                this.$message.error('规格与规格值不能为空');
            }else if(bool===false){
                this.$message.error('规格的现价、库存不能为空或为0');
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: '商品保存中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                let data = {
                    secret: localStorage.getItem('secretId'),
                    token: localStorage.getItem('userId'),
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
                    sku : this.sku,
                    vnarious: 1,
                    good_type: this.selectedOptions.join(',')+',',
                    orderby: this.addCouponData.orderby,
                    good_detail_pics: good_detail_pics.join(',')
                }
                this.$axios.post(this.url+'shopapi/Goods/addGood',data
                ).then(function (res) {
                    loading.close()
                    if(res.data.code==1){
                        that.$message.success('保存成功');
                        that.$router.push({path:'/wf/admin/shop/newshop_list'})
                        localStorage.removeItem('pageData');
                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    that.$message.error('网络错误，请重新添加');
                    loading.close()
                });
            }
        },
        Qcloud(url){
            let that = this
            let data = {
                url: url
            }
            this.$axios.post(this.url+'common_api/qcloud/putObject',data
            ).then(function (res) {
                if(res.data.code===200){
                    that.imageUrl = res.data.data.url
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误');
            });
        },
        taoBaoCollection(){
            let that = this;
            if(this.Taobao_url!=""&&this.Taobao_url!=null&&this.Taobao_url!=undefined){
                const loading = this.$loading({
                    lock: true,
                    text: '拼命采集中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                let data = {
                    url: this.Taobao_url
                }
                this.$axios.post(this.url+'shopapi/common/getTBGoodInfo',data
                ).then(function (res) {
                    if(res.data.code===200){
                        that.fileList1 = []
                        that.getTaoBao = true
                        that.Qcloud(res.data.data.master_graph)
                        let rotation_chart = res.data.data.rotation_chart.split(",")
                        let detail_pics = res.data.data.detail_pics.split(",")
                        that.dialogImageUrl = rotation_chart
                        for(var i=0;i<rotation_chart.length;i++){
                            that.fileList1.push({name:'',url:rotation_chart[i],data:"",response:{data:{src:rotation_chart[i]}}})
                        }
                        that.detailImg = []
                        for(var i=0;i<detail_pics.length;i++){
                            that.detailImg.push({name:'',url:detail_pics[i]})
                        }
                        that.spec = res.data.data.spec_name
                        that.son_spec = res.data.data.spec_son_name
                        that.sku = []
                        for(var key in res.data.data.sku_info){
                            that.sku.push({
                                sku_code: "",
                                sku_price: res.data.data.sku_info[key].price,
                                sku_stock: res.data.data.sku_info[key].stock,
                                sku_thumbnail: res.data.data.sku_info[key].sku_thumbnail,
                                sku_name: res.data.data.sku_info[key].spec_son_name
                            })
                        }
                        that.flagSku = false
                        that.guige = false
                        that.addCouponData.pro_title = res.data.data.name
                        that.addCouponData.original_price = res.data.data.original_price
                        loading.close()
                    }else{
                        that.$message.error(res.data.msg);
                        loading.close()
                    }
                })
                .catch(function (error) {
                    that.$message.error('网络错误，请重新添加');
                    loading.close()
                });
            }else{
                that.$message.warning("请填写淘宝或天猫商品链接");
            }
        },
        storageTaobao(e){
            this.pageData.Taobao_url = e
        }
    },
    watch: {
        imageUrl(val,oldVal){
            this.pageData.imageUrl = val
        },
        dialogImageUrl(val,oldVal){
            this.pageData.dialogImageUrl = val
        },
        detailImg(val,oldVal){
            this.pageData.detailImg = val
        },
        selectedOptions(val,oldVal){
            this.pageData.selectedOptions = val
        },
        spec(val,oldVal){
            this.pageData.spec = val
        },
        son_spec(val,oldVal){
            this.pageData.son_spec = val
        },
        sku_list(val,oldVal){
            this.pageData.sku_list = val
        },
        sku: {
            handler(val,oldVal){
                this.pageData.sku = val
            },
            deep: true
        },
        Taobao_url(val,oldVal){
            this.pageData.Taobao_url = val
        },
        addCouponData: {
            handler(val,oldVal){
                let obj = this.pageData
                obj.description = val.description
                obj.details = val.details
                obj.orderby = val.orderby
                obj.original_price = val.original_price
                obj.pro_title = val.pro_title
                obj.recommend = val.recommend
                obj.state = val.state
                obj.virtual_sales = val.virtual_sales
            },
            deep: true
        },
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

            this.pageData.son_spec = this.son_spec

            func([],0,this.son_spec)
            this.sku_list=arr;
            this.pageData.sku_list = this.sku_list
            var arrs=[]
            for(var a=0;a<arr.length;a++){
                var c={
                    sku_name:arr[a].join(','),
                    sku_price:'',
                    sku_stock:'',
                    sku_code:'',
                    sku_thumbnail: ''
                }
                arrs.push(c)
            }
            if(this.flagSku===false){
                this.flagSku = true
            }else{
                this.sku = arrs;
                this.pageData.sku = this.sku
            }
        },
        pageData: {
            handler(val,oldVal){
                localStorage.setItem("pageData",JSON.stringify(val))
            },
            deep: true
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
    }
}
</script>

<style lang="scss">
#add_goods{
    background: #fff;
    padding-top: 50px;
    padding-left: 40px;
    .wf-detailImg{
         .list-group{
             .detailImg{
                float: left;
                margin-bottom: 5px;
                 .upload-icon{
                    text-align: center;
                    width: 102px;
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
    .detailImg1{
        margin-bottom: 40px;
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
        padding: 20px;
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
        font-size: 20px;
        cursor: pointer;
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
    .el-icon-question{
        position: absolute;
        left: -100px;
        top: 10px;
        font-size: 20px;
        color: #999;
    }
    /deep/ .Taobao-collection{
        .el-input__inner{
            width: 400px;
            height: 28px;
            margin-left: -12px
        }
        .el-button{
            margin-left: 380px;
        }
    }
}
</style>