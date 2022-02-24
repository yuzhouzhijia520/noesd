<template>
    <div id="class_management">
        <el-row class="wf-top">
            <el-button size="mini" type="primary" @click="addClass(0)">添加分类</el-button>
            <el-switch
                ref="switch"
                v-model="switchFlag"
                @change="handleSwitch"
                v-loading.fullscreen.lock="fullscreenLoading"
                element-loading-text="正在加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.7)"
                active-color="#719FF8"
                size="mini">
                </el-switch>
            <label>{{switchText}}</label>
            <el-popover
                placement="top-start"
                width="250"
                trigger="hover"
                content="隐藏后，小程序分类页面不显示信息"
               >
                <span slot="reference" class="el-icon-question"></span>
            </el-popover>
            
        </el-row>
        <div class="wf-close"><span class="open" @click="defaultExpand">{{expandText}}</span></div>
        <el-table
        :data="tableData"
        style="width: 100%"
        :default-expand-all="default_expand"
        row-key="id"
        :expand-row-keys="expandKeys">
            <el-table-column width="40">
            </el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <!-- 子分类表格 -->
                    <el-table
                    class="son-table"
                    :data="props.row.sonTableData"
                    style="width: 100%"
                    :show-header="false"
                    empty-text="暂无子分类">
                        <el-table-column width="40">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="props">
                                <img style="width:44px;height:44px;padding: 4px 0;vertical-align: middle;margin-left:15px;" :preview="props.row.id" :src="props.row.type_img" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="type_name">
                        </el-table-column>
                        <el-table-column
                        prop="orderby">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="props">
                                <el-button type="text" style="color:#719FF8;margin-right:20px;" @click="addClass(3,props.row)">修改</el-button>
                                <el-button type="text" style="color:#E36F6B;margin-right:20px;" @click="deleteClass(props.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
            label="图片">
                <template slot-scope="props">
                    <img style="width:44px;height:44px;" :preview="props.row.id" :src="props.row.type_img" alt="">
                </template>
            </el-table-column>
            <el-table-column
            label="名称"
            prop="type_name">
            </el-table-column>
            <el-table-column
            label="排序"
            prop="orderby">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="props">
                    <el-button type="text" style="color:#719FF8;margin-right:20px;" @click="addClass(1,props.row)">修改</el-button>
                    <el-button type="text" style="color:#E36F6B;margin-right:20px;" @click="deleteClass(props.row.id)">删除</el-button>
                    <el-button type="text" style="color:#719FF8;" @click="addClass(2,props.row)">添加子分类</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @current-change="getData"
        :current-page.sync="currentPage"
        layout="prev, pager, next, jumper"
        :total="total">
        </el-pagination>
        <!-- 编辑分类弹框 -->
        <el-dialog
        title="编辑分类"
        :visible.sync="visible"
        width="576px">
            <el-form
            label-position="left"
            :model="formData"
            :rules="rules"
            ref="formData"
            label-width="120px"
            class="demo-ruleForm">
                <el-form-item label="分类名称" prop="type_name">
                    <el-input size="mini" style="width:300px;" placeholder="请填写分类名称" v-model="formData.type_name" :maxlength="15">
                        <span slot="suffix">{{name_number}}/15</span>
                    </el-input>
                </el-form-item>
                <el-form-item class="wf-label-left" label="父级分类" prop="id">
                    <el-select size="mini" v-model="id" style="width:200px;">
                        <el-option v-for="item in options" :key="item.id" :label="item.type_name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="缩略图" prop="type_img">
                    <el-upload
                    class="avatar-uploader"
                    :action="upfileUrl"
                    :show-file-list="false"
                    :on-success="imageSuccess"
                    :before-upload="imageBefore">
                        <img v-if="formData.type_img" :src="formData.type_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span style="color:#999;">建议尺寸200x200px</span>
                </el-form-item>
                <el-form-item class="wf-label-left" label="排序" prop="orderby">
                    <el-input-number size="mini" style="width:120px;margin-right:20px;" :precision="0" :controls="false" v-model="formData.orderby" :min="0"></el-input-number>
                    <span style="color:#999;">数字越大越靠前</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="visible = false">取 消</el-button>
                <el-button size="mini" :loading="saveLoading" type="primary" @click="save('formData')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {setMasterSwitch ,getCompile } from '@/server/management';
export default {
    name: 'shop_class_management',
    data() {
        return {
            expandText: "展开",
            expandKeys: [],
            default_expand: false, // 全部折叠或展开
            saveLoading: false,
            type: 0, // 0：添加分类，1：修改父分类，2：添加子分类，3：修改子分类
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            visible: false,
            currentPage: 1, // 当前页
            total: 0, // 总条数
            tableData: [], // 父分类表格数据
            options: [],
            id: -1,
            name_number: 0, // 监听分类名称字数
            formData: {
                secret: localStorage.getItem('secretId'),
                type_name: "",
                type_img: "",
                orderby: undefined
            },
            rules: {
                type_name: [
                    { required: true, message: "分类名称不能为空",  trigger: 'blur' }
                ],
                type_img: [
                    { required: true, message: "缩略图不能为空",  trigger: 'blur' }
                ]
            },
            switchFlag:true, //小程序分类管理开关
            switchText:'', //小程序分类管理开关文本
            fullscreenLoading:false
        }
    },
    components: {
        MyTable
    },
    mounted(){
        this.getData(this.currentPage);
        this.initSwitch(0);
    },
    methods:{
        defaultExpand(){
            console.log(this.expandKeys,this.tableData)
            if(this.expandKeys.length===0){
                let arr = []
                for(let i=0;i<this.tableData.length;i++){
                    arr.push(this.tableData[i].id)
                }
                this.expandKeys = arr
                console.log(this.expandKeys)
                this.expandText = "收起"
            }else{
                this.expandKeys = []
                this.expandText = "展开"
            }
        },
        async initSwitch(id){
            let newData=await getCompile();
            let that=this;
            this.$nextTick(()=>{
                if(id===1){
                    this.fullscreenLoading=false;
                }
                if(newData.data.code===200){
                    if(Object.prototype.toString.call(newData.data.data)==='[object Array]'){
                        newData.data.data.some((item)=>{
                            if(item.modular_id===31){
                                if(item.state===0){
                                    that.switchText="隐藏";
                                    that.switchFlag=false;
                                }else if(item.state===1){
                                    that.switchText="显示";
                                    that.switchFlag=true;
                                }
                            }
                        })
                    }
                }else{
                    that.$message.error('网络错误');
                }
            })
        },
        async handleMasterSwitch(){
            this.fullscreenLoading=true;
            let newData=await setMasterSwitch();
            let that=this;
            this.$nextTick(()=>{
                if(newData.data.code===200){
                    that.initSwitch(1);
                }else{
                    this.fullscreenLoading=false;
                    that.$message.error('网络错误');
                }
            })
        },
        handleSwitch(val){
            this.handleMasterSwitch();
        },
        getData(currentPage){
            this.currentPage = currentPage
            let that = this
            that.tableData = []
            let data = {
                secret: localStorage.getItem('secretId'),
                page: currentPage
            }
            this.$axios.post(this.url+'shopapi/Goodtype/index',data
            ).then(res=>{
                if(res.data.code===1){
                    that.tableData = res.data.data.data
                    that.total = res.data.data.total
                    that.tableData.forEach(el => {
                        el.sonTableData = []
                        that.expandChange(el.id)
                    })
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        deleteClass(id){
            this.$confirm('是否确认删除此分类?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that=this;
                let data = {
                    secret: localStorage.getItem('secretId'),
                    id: id
                }
                this.$axios.post(this.url+'shopapi/Goodtype/delType',data
                ).then(res=>{
                    if(res.data.code===1){
                        that.getData(that.currentPage)
                        that.$message.success('删除成功');
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch(err=>{
                    that.$message.error('系统出错，请联系管理员！');
                });
            }).catch(() => {
                this.$message.info("已取消删除");          
            });
        },
        expandChange(id){ 
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id
            }
            this.$axios.post(this.url+'shopapi/Goodtype/index',data
            ).then(res=>{
                if(res.data.code===1){
                    that.tableData.forEach((el,index) => {
                        if(el.id===id){
                            that.tableData[index].sonTableData = res.data.data;
                            that.tableData[index].sonTableData.pid = id
                        }
                    });
                
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        imageSuccess(res,file,fileList){
            this.$message.success("上传成功")
            this.formData.type_img = res.data.src
        },
        imageBefore(file){
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }else{
                return true
            }
            if(file.size/1024/1024>2){
                this.$message.warning("上传图片不得超过2M")
            }
        },
        addClass(type,row){
            this.type = type
            this.formData.type_name = "",
            this.id = -1,
            this.formData.type_img = "",
            this.formData.orderby = undefined
            this.options = []
            let that = this;
            let data = {
                secret: localStorage.getItem('secretId')
            }
            that.$axios.post(that.url+"shopapi/goodtype/fatherIndex",data)
            .then(function (res) {
                if(res.data.code===1){
                    if(type===0){
                        let arr = res.data.data
                        arr.unshift({id:-1,type_name:"无"})
                        that.options = arr
                    }else if(type===1){
                        that.formData.type_name = row.type_name
                        that.formData.type_img = row.type_img
                        that.formData.orderby = row.orderby
                        that.formData.fatherId = row.id
                        that.options = [{id:-1,type_name:"无"}]
                    }else if(type===2){
                        that.id = row.id
                        let arr = []
                        res.data.data.forEach(el => {
                            if(el.id===row.id){
                                arr.push(el)
                            }
                        });
                        that.options = arr
                    }else if(type===3){
                        that.id = row.pid
                        that.formData.sonId = row.id
                        that.formData.type_name = row.type_name
                        that.formData.type_img = row.type_img
                        that.formData.orderby = row.orderby
                        let arr = []
                        res.data.data.forEach(el => {
                            if(el.id===row.pid){
                                arr.push(el)
                            }
                        });
                        that.options = arr
                    }
                    that.visible = true
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
        save(ruleForm){
            let that = this;
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    let data = this.formData
                    data.id = this.id
                    if(data.orderby===undefined){
                        data.orderby = ""
                    }
                    that.saveLoading = true
                    let this_url
                    if(this.type===0){
                        if(data.id===-1){
                            delete data.id
                            this_url = "shopapi/Goodtype/editParentTypedo"
                        }else{
                            data.pid = data.id
                            delete data.id
                            this_url = "shopapi/Goodtype/editSonTypedo"
                        }
                    }else if(this.type===1){
                        data.id = data.fatherId
                        delete data.fatherId
                        this_url = "shopapi/Goodtype/editParentTypedo"
                    }else if(this.type===2){
                        data.pid = data.id
                        delete data.id
                        this_url = "shopapi/Goodtype/editSonTypedo"
                    }else if(this.type===3){
                        data.id = data.sonId
                        delete data.sonId
                        this_url = "shopapi/Goodtype/editSonTypedo"
                    }
                    that.$axios.post(that.url + this_url,data)
                    .then(function (res) {
                        if(res.data.code===1){
                            that.$message.success("保存成功");
                            that.getData(that.currentPage)
                            that.defaultExpand()
                            that.visible = false
                            setTimeout(() => {
                                that.saveLoading = false
                            }, 1500);
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
    },
    computed: {
    　　typeName() {
    　　　　return this.formData.type_name
    　　}
    },
    watch: {
        typeName: {
            handler(val,oldVal){
                this.name_number = val.length
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#class_management{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    .wf-top{
        /deep/ .el-switch{
            line-height: 25px;
            label{
                color: #409EFF;
            }
            .el-switch__core{
                border-radius: 16px;
                width: 60px !important;
                height: 26px;
                font-size: 12px;
                color: #fff;
                line-height: 26px;
                padding-left: 30px;
                &:after{
                    width: 22px;
                    height: 22px;
                }
            }
        }
        .el-icon-question{
            color:#ccc;
            font-size: 18px;
        }
        /deep/ .el-switch.is-checked{
            .el-switch__core{
                padding-left: 10px;
                &:after{
                    margin-left: -22px;
                }
            }
        }
    }
    /deep/ .wf_pagination{
        text-align: center;
        margin: 30px 0;
    }
    /deep/ .el-table{
        margin-top: 20px;
    }
    /deep/ .el-table__expanded-cell{
        background: #fbfbfb;
        &:hover{
            background-color: #fbfbfb!important;
        }
        .el-table__row{
            td{
                background: #fbfbfb;
                padding: 2px 0;
            }
        }
        .el-table::before{
            display: none;
        }
        .el-table tr:last-child td{
            border: none;
        }
        .el-table__row:hover td{
            background: #f5f7fa;
        }
    }
    /deep/ .el-table__expanded-cell{
        padding: 0 0 0 50px;
    }
    .el-button{
        width: 80px;
    }
    .el-button--primary{
        background: #719FF8;
    }
    .son-table{
        margin: 0;
    }
    .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
    .el-button--text{
        width: inherit;
    }
    /deep/ .el-dialog__footer{
        text-align: center;
    }
    .avatar-uploader .el-upload {
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon {
        border-radius: 4px;
        background: #F8F8F8;
        font-size: 28px;
        color: #D6D6D6;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        border-radius: 4px;
        width: 80px;
        height: 80px;
        display: block;
    }
    .wf-close{
        position: relative;
        cursor: pointer;
        top: 53px;
        margin-left: 20px;
        z-index: 998;
        .open{
            color: #719FF8;
            margin-right: 16px;
        }
    }
    /deep/ .wf-label-left .el-form-item__label{
        padding-left: 10px;
    }
}
</style>