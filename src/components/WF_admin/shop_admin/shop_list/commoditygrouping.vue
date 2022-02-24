<template>
    <div id="shop_list">
        <el-row class="search">
            <el-form >
                <el-form-item label="分组名称" >
                    <el-col :span="12">
                        <el-input class="search-input" 
                        style="width:20rem;margin-right:1.875rem;" 
                        v-model="pro_name" size="mini" 
                        placeholder="输入分组名称"
                        ></el-input>
                        <el-button type="primary" class="input_size search-btn" size="mini"  @click="getgroupinglist" >搜索</el-button>
                        <el-button size="mini" type="primary" @click="addgrounp" :loading="searchLoading">新建商品分组</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-row>
        <my-table :tableData="tableData" :columns="columnsApp"  :page-size='pageSize' :totalPage="pageCount"  :currentPage="getPage" @currentChange="getgroupinglists"></my-table>
        <el-dialog :title='title' :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" v-if="defaults !== -1">
                <el-form-item label="分组名称" :label-width="formLabelWidth">
                    <el-input v-model="form.grounpname" style="width:200px;" :maxlength="16" @change="inputLength"></el-input>
                </el-form-item>
                <el-form-item label="说明" :label-width="formLabelWidth"  v-if="defaults === 1 || defaults === 2" style="position: relative;">
                    <el-input v-model="form.grounpcontent" autocomplete="off" style="width:300px;" :maxlength="20"></el-input>
                    <span style="position: absolute;right:130px;bottom:3px;color:#ccc;">{{form.grounpcontent.length}}/20</span>
                </el-form-item>
                <el-form-item label="分组图片" :label-width="formLabelWidth" >
                    <el-upload
                        class="avatar-uploader left"
                        :action="upLoadUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.img" :src="form.img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="el-upload-text" v-if="form.img == '' || !form.img">添加图片</div>
                        <div class="el-upload-texts" v-if="form.img !== ''&&form.img">更换图片</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- <span v-if="defaults == -1"> {{delgroup == 0?'确定删除该分组':'该分组在装修店铺内被使用，请删除链接后再删除该分组？'}} </span> -->
            <span v-if="defaults == -1"> 确定删除该分组 </span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="subime" size="mini">确 定</el-button>
            </div>
        </el-dialog>
        <!--设置的弹窗-->
        <el-dialog title='归属分类' v-if="dialogFormVisibles" :visible.sync="dialogFormVisibles" width="520px">
            <el-switch
                v-model="value4"
                active-color="#719FF8"
                inactive-color="#eee"
                :active-text=" value4==false? '关闭':'开启'"
                >
            </el-switch>
            <el-form >
                <el-form-item style="border-bottom:1px solid #F0F0F0;padding:25px 0;" v-for="(item,index) in forms" :key="index">
                    <el-col class="clear " style="margin-bottom:20px;">
                        <span class="name-width left">归属一级分类</span>
                        <el-select
                            v-model="item.id"
                            placeholder="请选择分类"
                            class="input_size left"
                            size="mini"
                            @focus="saveIndex(index,item)"
                            @change="changeSelect(item,index)"
                            >
                                <el-option
                                v-for="items in options"
                                :key="items.id"
                                :label="items.type_name"
                                :value="items.id"
                                :disabled="items.disabled">
                                </el-option>
                        </el-select>
                        <el-button type="text" @click="dellistss(item,index)" size="mini" style="color:#E36F6B;" v-if="forms.length>1">删除</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
            <div class="addlists clear" @click="addlistss">
                <i class="el-icon-circle-plus left" style="color: #719FF8; font-size:20px;"></i>
                <span style="color: #719FF8;line-height:20px;height:20px;margin-bottom:2px;margin-left:11px;" class="left">添加商品分类</span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="uodategrouping" size="mini">确 定</el-button>
            </div>
        </el-dialog>
        <versionCom v-if="showVersion" @closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {getgroupinglist,dels,addedit,getonelist,typeBelong} from '@/server/commoditygrouping';
import { widthCheck } from "@/untils/common.js"
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: 'commoditygrouping',
    data() {
        return {
            showVersion:false,//控制版本提示
            formsItem: {},
            formsKey: -1,
            formsIndex: -1,
            forms:[
                {
                    id: "",
                    type_img: "",
                    type_name:"",
                    disabled:false,
                    key: 0
                }
            ],
           upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
           searchLoading:false,
           pro_name:'',//搜索的名称
           getPage:1,
           pageCount:0,
           value4:true,
           dialogFormVisible:false,//弹窗
           pageSize:10,
           dialogFormVisibles:false,//设置的弹窗
           form: {//编辑添加分组
                grounpname: '',
                grounpcontent:'',
                img:''
            },
            title:'提示',
            formLabelWidth:'120px',
            defaults:-1,//判断是否是默认分组
            delgroup:-1,//判断是否存在分组是否一杯使用
             options: [],
            selectid:-1,//选中的id
           tableData:[],
            columnsApp: [
                { 
                    prop: "name", 
                    label: "分组名称",
                    align: "center",
                    width:'300'
                },
                { 
                    prop: "description", 
                    label: "排序条件及说明",
                    align: "center",
                    width: "400"
                },
                { 
                    prop: "good_num", 
                    label: "商品数",
                    align: "center",
                    width: "80"
                },
                { 
                    prop: "created_at", 
                    label: "创建时间",
                    align: "center"
                },
                {
                    label: "操作",
                    align: "left",
                    width: "280",
                    render: (h, param)=> {
                        let a = [
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8"
                                },
                                on: {
                                    click: () => {
                                        this.deitfenzu(param.row)
                                    }
                                }
                            }, "编辑分组"),
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8"
                                },
                                on: {
                                    click: () => {
                                        this.deitshop(param.row)
                                    }
                                }
                            }, "编辑商品"),
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8"
                                },
                                on: {
                                    click: () => {
                                        this.setup(param.row)
                                    }
                                }
                            }, "设置分类"),
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#f56c6c"
                                },
                                on: {
                                    click: () => {
                                        this.del(param.row.id)
                                    }
                                }
                            }, param.row.state===0? "删除":""),
                        ];
                        return h('div', a);
                    }
                }
            ],
            
        }
    },
    components: {
        MyTable,
        versionCom
    },
    created: function(){
        let that =  this
        that.getgroupinglist()
        that.getonelist()
    },
    methods: {
        handleCloseVersion(){ // 关闭版本更新提示弹框
            this.showVersion = false;
        },
        inputLength(val){
            this.form.grounpname = widthCheck(val,16)
        },
        getgroupinglists(val){
            let that = this
            that.getPage = val
            that.getgroupinglist()
        },
        getonelist(){//获取一级分类
            let that = this
            let data={
                token:localStorage.getItem('userId'),
                pro_id:parseInt(localStorage.getItem('proId')),
            }
             getonelist(data).then((res)=>{
                 if(res.data.code == 200){
                    let options = res.data.data
                    options.forEach((e,i) => {
                        e.disabled = false
                        e.key = i
                    });
                    that.options = options
                 }else{
                     that.$message({
                        message: '网络错误，错误码600A0083',
                        type: 'warning'
                    });
                 }
             }).catch(()=>{
                that.$message({
                    message: '网络错误，错误码600B0084',
                    type: 'warning'
                });
             })
        },
        getgroupinglist(){
            let that = this
            const loading = this.$loading({
                lock: true,
                text: '数据加载中~',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
           
            let data={
                token:localStorage.getItem('userId'),
                pro_id:parseInt(localStorage.getItem('proId')),
                page:that.getPage,
                bar:that.pageSize,
                name:that.pro_name,
            }
             getgroupinglist(data).then((res)=>{
                 loading.close();
                 if(res.data.code == 200){
                    that.tableData = res.data.data.data
                    that.pageCount = res.data.data.total
                 }else{
                     that.$message({
                        message: '网络错误，错误码600A0085',
                        type: 'warning'
                    });
                 }
             }).catch(()=>{
                 loading.close();
                 that.$message({
                        message: '网络错误，错误码600B0086',
                        type: 'warning'
                    });
             })
            
        },
        uodategrouping(){//设置分类的确定按钮
            let that = this
            let arr = that.forms
            let arrs = []
            arr.forEach((e,index)=>{
                arrs.push(e.id)
            })
            let type_id=JSON.stringify(arrs).replace("[","").replace("]","")
            let switchs = -1//判断是否开启
            if(that.value4 == false){
                switchs = 0
            }else if(that.value4 == true){
                switchs = 1
            }
            let data={
                token:localStorage.getItem('userId'),
                pro_id:parseInt(localStorage.getItem('proId')),
                id:that.selectid,
                switch:switchs,
                type_id:type_id
            }
            typeBelong(data).then((res)=>{
                 if(res.data.code == 200){
                    that.$message({
                        showClose: true,
                        message: '保存成功!',
                        type: 'success'
                    });
                    that.dialogFormVisibles = !that.dialogFormVisibles
                    that.getgroupinglist()
                     
                 }else{
                     that.$message({
                        message: '网络错误，错误码600A0087',
                        type: 'warning'
                    });
                 }
            }).catch(()=>{
                 loading.close();
                 that.$message({
                        message: '网络错误，错误码600B0088',
                        type: 'warning'
                    });
             })
        },
        handleAvatarSuccess(res, file,index) {
            let that = this
            let obj = that.form
            obj.img = res.data.src
            that.form = obj
        },
        beforeAvatarUpload(file,index) {
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
        addlistss(){//添加商品分类
            let that = this
            let arr = that.forms
            if(that.options.length>5){
                if(arr.length<5){//判断是否超过5个
                    arr.push({ 
                        id: "",
                        type_img: "",
                        type_name:"",
                        disabled:false,
                        key: arr.length
                    })
                    that.forms = arr
                }else{
                    that.$message.warning("最多添加5个分类");
                }
            }else{
                if(arr.length<that.options.length){//判断是否超过5个
                    arr.push({ 
                        id: "",
                        type_img: "",
                        type_name:"",
                        disabled:false,
                        key: arr.length
                    })
                }else{
                    that.$message.warning("已超过可选分类总数");
                }
            }
        },
        dellistss(items,i){//删除商品分类
            if(items){
                this.options.some((item,i)=>{
                    if(items.id===item.id){
                        this.options[i].disabled=false;
                    }
                })
            }
            if(this.forms.length>1){
                this.forms.splice(i,1)
            }else{
                this.$message({
                    message: '超过限制！',
                    type: 'warning'
                });
            }
        },
        saveIndex(index,item){
            let that = this
            this.formsIndex = index
            this.formsItem = item
            let arr = this.forms
            let options = this.options
            options.forEach(el => {
                arr.some((item,index) => {
                    if(item.id===el.id&&this.formsIndex!=index){
                        el.disabled = true;
                        return false;
                    }
                });
                if(el.type_name===that.formsItem.type_name){
                    el.disabled = false
                }
            });
        },
        changeSelect(items,index){//选择所属分类
            let that = this
            let newObj = this.options.filter((item)=>{
                if(item.id===items.id){
                    return item
                }
            })
            this.forms = this.forms.map((item,i)=>{
                if(i===index){
                    debugger
                    item = JSON.parse(JSON.stringify(newObj[0]))
                }
                return item
            })
        },
        deitfenzu(item){//编辑分组
            let that = this
            that.dialogFormVisible = !that.dialogFormVisible
            that.form.grounpname = item.good_name
            that.form.grounpcontent = item.description
            that.form.img = item.img
            that.selectid = item.id
            if(item.state === 1 || item.state === 2){//默认分组
                that.defaults = 0
                that.title="编辑"
                that.form.grounpname= item.name
                that.form.img = item.img
                that.form.grounpcontent = item.description
            }else if(item.state === 0){//不是默认分组
                that.defaults = 1
                that.title="编辑分组"
                that.form.grounpname= item.name
                that.form.grounpcontent= item.description
                that.selectid = item.id
                that.form.img = item.img
            }
        },
        deitshop(item){//编辑商品
            let that = this
            that.$router.push({path:'/wf/admin/shop/newshop_list/editshopgroup',query: {id:item.id,groupname:item.name}}); 
        },
        
        addgrounp(){//新建商品分组
            let that = this
            that.dialogFormVisible = !that.dialogFormVisible
            that.defaults = 2
            that.form.grounpname = ''
            that.form.grounpcontent = ''
            that.form.img = ''
            that.title="添加分组"
        },
        del(id){//删除分类
            this.dialogFormVisible = !this.dialogFormVisible
            this.defaults = -1
            this.title="提示"
            this.selectid= id
            
        },
        setup(item){//设置分类
            let that = this
            getAuditApplicationList(27).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===false){
                        that.showVersion = true
                    }else{
                        if(item.switch===0){
                            this.value4=false;
                        }else if(item.switch===1){
                            this.value4=true;
                        }
                        let that = this
                        let options = that.options
                        let typeArr = item.type
                        options.forEach((e,i) => {
                            e.disabled = false
                            e.key = i
                        });
                        if(typeArr){
                            if(typeArr.length>0){
                                options.forEach((e,i) => {
                                    typeArr.forEach((el,s) => {
                                        el.disabled = true
                                        el.key = s
                                        if(e.id === el.id){
                                            e.disabled = true
                                        }
                                    });
                                });
                                that.forms = typeArr
                            }else{//没有选择所属分类
                                let forms=[//数据初始化
                                    {
                                        id: "",
                                        type_img: "",
                                        type_name:"",
                                        disabled:false,
                                        key: 0
                                    }
                                ]
                                that.forms = forms
                            }
                        }else{
                        let forms=[//数据初始化
                                {
                                    id: "",
                                    type_img: "",
                                    type_name:"",
                                    disabled:false,
                                    key: 0
                                }
                            ]
                            that.forms = forms
                        }
                        that.selectid = item.id
                        that.dialogFormVisibles = true
                    }
                }else{
                    that.$message.error(res.data.msg+"600A00137");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B00138');
            })
        },
        subime(){
            let that = this
            let data={}
            if(that.defaults == -1){//点击弹窗确定按钮 首先判断是否是 -1 是点了删除的 0是默认的分组 1是用户自己家的分组 2是用户添加分组
                let data = {
                    token:localStorage.getItem('userId'),
                    pro_id:parseInt(localStorage.getItem('proId')),
                    id:that.selectid
                }
                dels(data).then((res)=>{
                    if(res.data.code == 200){
                        that.$message({
                            showClose: true,
                            message: '删除成功!',
                            type: 'success'
                        });
                        that.getgroupinglist()
                        that.dialogFormVisible = !that.dialogFormVisible
                        that.selectid = -1
                    }else{
                        that.$message({
                            message: '网络错误，错误码600A0089',
                            type: 'warning'
                        });
                    }
                }).catch(()=>{
                    that.$message({
                        message: '网络错误，错误码600B0090',
                        type: 'warning'
                    });
                })
            }else if(that.defaults == 0 || that.defaults == 1 || that.defaults == 2){
                if(that.form.grounpcontent == ''){
                    that.$message({
                        message: '分组说明不能为空！',
                        type: 'warning'
                    });
                }else if(that.form.grounpname == ''){
                    that.$message({
                        message: '分组名称不能为空！',
                        type: 'warning'
                    });
                }else if(that.form.img ==''){
                    that.$message({
                        message: '分组图片不能为空！',
                        type: 'warning'
                    });
                }else{
                    if(that.defaults == 0){//编辑默认分组
                        data={
                            token:localStorage.getItem('userId'),
                            pro_id:parseInt(localStorage.getItem('proId')),
                            id:that.selectid,
                            name:that.form.grounpname,
                            description:that.form.grounpcontent,
                            img:that.form.img,
                        }
                    }else if(that.defaults == 1){//编辑用户自己加的分组
                        data={
                            token:localStorage.getItem('userId'),
                            pro_id:parseInt(localStorage.getItem('proId')),
                            id:that.selectid,
                            name:that.form.grounpname,
                            description:that.form.grounpcontent,
                            img:that.form.img,
                        }
                    }else if(that.defaults == 2){//添加分组
                        data={
                            token:localStorage.getItem('userId'),
                            pro_id:parseInt(localStorage.getItem('proId')),
                            name:that.form.grounpname,
                            description:that.form.grounpcontent,
                            img:that.form.img,
                        }
                    }
                    //系统默认的分支只允许修改分类名称addedit
                    addedit(data).then((res)=>{
                        if(res.data.code == 200){
                            that.$message({
                                showClose: true,
                                message: '操作成功!',
                                type: 'success'
                            });
                            that.getgroupinglist()
                            that.dialogFormVisible = !that.dialogFormVisible
                            that.selectid = -1
                        }else{
                            that.$message({
                                message: '网络错误，错误码600A0091',
                                type: 'warning'
                            });
                        }
                    }).catch(()=>{
                        that.$message({
                            message: '网络错误，错误码600B0092',
                            type: 'warning'
                        });
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
    position: relative;
}
.addlists{
    clear: both;
    cursor: pointer;
}
.el-upload-text{
    position: absolute;
    bottom: 0;
    left: 0;right: 0px;
    text-align: center;
    width: 100%;
    
}
.el-upload-texts{
    position: absolute;
    bottom: 0;
    left: 1px;right: 0px;
    text-align: center;
    width: 80px;
    height: 20px;
    background:rgba(0,0,0,1);
    color: #FFFFFF;
    line-height: 20px;
}
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        width: 80px;
        height: 80px;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 65px;
        text-align: center;
        border: 1px dashed #d9d9d9;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
        border: 1px dashed #d9d9d9;
    }
#shop_list{
    background-color: #fff;
    padding: 20px;
    .td.el-table_1_column_1{
        padding:7px 0;
    }
    .name-width{
        width: 85px;
        text-align: left;
        margin-right: 24px;
    }
    .input_size{
        margin-right: 1.875rem;
    }
    .input_size input{
        width: 7.5rem;
        height: 2.125rem;
    }
    .search-input input{
        height:2.125rem;
    }
    .search{
        margin-bottom: 30px;
        clear: both;
    }
    .el-pagination{
        background: white;
        text-align: center;
        padding: 20px 0;
    }
    .el-table{
        border-radius: 4px;
    }
    .search-btn{
        width:88px;
        height:2rem;
        margin-top:1px;
        margin-right: 1.875rem ;
    }
    .el-button--primary{
        background: #719FF8;
    }
}
</style>
