<template>
    <div class="wf-membershipLevel">
        <el-button type="primary" size="mini" @click="addVisible(-1)">新增会员等级</el-button>
        <el-button size="mini" @click="editDescription">会员权益说明</el-button>
        <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" @currentChange="getData"></my-table>
        <el-dialog
        title="编辑会员等级"
        :visible.sync="vipLevelVisible"
        width="30%">
            <el-form
            label-position="right"
            :model="addVipLevelData"
            :rules="vipLevelRules"
            ref="addVipLevelData"
            label-width="110px">
                <div class="wf-h1-title">最多添加10类等级</div>
                <el-form-item class="label-left" label="等级名称" prop="name">
                    <el-input class="wf-form-input" size="mini" v-model="addVipLevelData.name" maxlength="8">
                        <span slot="suffix">{{name_number}}/8</span>
                    </el-input>
                    <div class="wf-gray-title">等级名称如白银会员、黄金会员</div>
                </el-form-item>
                <el-form-item class="label-left" label="等级LOGO" prop="logo">
                    <el-upload
                    size="mini"
                    class="avatar-uploader"
                    :action="upfileUrl"
                    :show-file-list="false"
                    :on-success="logoSuccess"
                    :before-upload="beforeLogoUpload">
                        <img v-if="addVipLevelData.logo" :src="addVipLevelData.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="wf-gray-title">建议尺寸26x26px，不超过200kb，仅支持png格式</div>
                </el-form-item>
                <el-form-item class="label-left" label="升级积分" prop="integral">
                    <el-input-number v-if="disabled" :disabled="disabled" class="wf-form-input" size="mini" :controls="false" :precision="0" :min="0" v-model="addVipLevelData.integral"></el-input-number>
                    <el-input-number v-else class="wf-form-input" size="mini" :controls="false" :precision="0" :min="1" v-model="addVipLevelData.integral"></el-input-number>
                    <div class="wf-gray-title">用户累计的总积分</div>
                </el-form-item>
                <el-form-item label="会员权益">
                    <el-checkbox-group v-model="checkList" @change="checkDiscountChange" class="wf-inline-block">
                        <el-checkbox :disabled="disabled" label="购物折扣"></el-checkbox>
                    </el-checkbox-group>
                     <el-input-number :disabled="disabled" class="wf-form-small-input" size="mini" :controls="false" :precision="1" :min="1" :max="10" v-model="addVipLevelData.discount"></el-input-number>折
                    <div class="wf-gray-title">1-10之间，支持一位小数，比如8.8表示8.8折（10为无折扣）</div>
                    <el-checkbox v-model="addVipLevelData.old_good" :disabled="disabled" :true-label="1" :false-label="0" label="对已添加的商品生效"></el-checkbox>
                    <div class="wf-gray-title">若改动会员折扣，将按新折扣对已添加的商品价格进行自动修改</div>
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-select :disabled="disabled" size="mini" style="width:140px;" v-model="state" placeholder="请选择">
                        <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="footer-btn">
                <el-button size="mini" @click="vipLevelVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="savePrompt">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog
        title="提示"
        :visible.sync="promptDialog"
        width="30%">
            <span>{{prompt_title}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="promptDialog = false">取消</el-button>
                <el-button :loading="saveLoading" size="mini" type="primary" @click="addVipLevel('addVipLevelData')">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog
        title="会员权益说明"
        :visible.sync="descriptionVisible"
        width="30%">
            <el-form
            label-position="left"
            :model="descriptionData"
            :rules="descriptionRules"
            ref="descriptionData"
            label-width="110px">
                <el-form-item class="label-left" label="会员权益说明" prop="notes">
                    <el-input type="textarea" :autosize="true" v-model="descriptionData.notes" placeholder="请输入会员权益说明"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="descriptionVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="saveDescription('descriptionData')">保 存</el-button>
            </span>
        </el-dialog>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import { getAuditApplicationList } from '@/server/common';
import MyTable from "@/commonComponents/table/table.vue";
import versionCom from '@/components/WF_admin/shop_admin/version/version';
export default {
    name: "membershipLevel",
    data() {
        return {
            prompt_title: "",
            promptDialog: false,
            showVersion:false,//控制版本提示
            checkList: [],
            saveLoading: false,
            disabled: false, // 权重为1时禁用
            id: -1,
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            name_number: 0, // 监听等级名称字数
            vipLevelVisible: false, // 新建编辑会员等级弹框
            descriptionVisible: false, // 权益说明弹框
            totalPage: 0,
            currentPage: 1,
            state: 1,
            deleteDisabled: false,
            tableData: [],
            stateOptions: [
                { value: 1, label: "有效" },
                { value: 0, label: "无效" }
            ],
            addVipLevelData: {
                secret: localStorage.getItem('secretId'), // 加密secretId
                name: "",
                logo: "",
                integral: undefined,
                discount: undefined,
                old_good: 1,
            }, // 表单数据
            descriptionData: {
                secret: localStorage.getItem('secretId'), // 加密secretId
                notes: "",
                id: ""
            }, // 权益说明表单数据
            descriptionRules: {
                notes: [
                    { required: true, message: '会员权益说明不能为空', trigger: 'blur' }
                ]
            },
            vipLevelRules: {
                name: [
                    { required: true, message: '等级名称不能为空', trigger: 'blur' }
                ],
                logo: [
                    { required: true, message: 'logo图片不能为空', trigger: 'blur' }
                ],
                integral: [
                    { required: true, message: '升级积分不能为空', trigger: 'blur' }
                ]
            }, // 表单验证
            columns: [
                {
                    label: "等级名称",
                    align: "center",
                    prop: "name"
                },
                {
                    label: "升级积分",
                    align: "center",
                    prop: "integral"
                },
                {
                    label: "购物折扣",
                    align: "center",
                    render: (h, param)=>{
                        let a
                        if(param.row.discount==="0折"){
                            a = [h('span', {}, "-")];
                        }else{
                            a = [h('span', {}, param.row.discount)];
                        }
                        return a
                    }
                },
                { 
                    label: "状态",
                    align: "center",
                    render: (h, param)=>{
                        let a
                        if(param.row.state==="无效"){
                            a = [h('span', {}, param.row.state)];
                        }else if(param.row.state==="有效"){
                            a = [h('span', {
                                attrs: {
                                    style: "color:#719FF8"
                                }
                            }, param.row.state)];
                        }
                        return a
                    }
                },
                {
                    label: "操作",
                    align: "left",
                    render: (h, param)=> {
                        let a
                        if(param.row.integral===0){
                            a = [h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8;margin-right:20px;margin-left:110px;"
                                },
                                on: {
                                    click: () => {
                                        this.addVisible(param.row.id)
                                    }
                                }
                            }, "编辑")]
                        }else{
                            a = [h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color: #719FF8;margin-right:20px;margin-left:110px;"
                                },
                                on: {
                                    click: () => {
                                        this.addVisible(param.row.id)
                                    }
                                }
                            }, "编辑"),
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color: #E36F6B"
                                },
                                on: {
                                    click: () => {
                                        this.$confirm('此操作将永久删除此会员等级', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            this.delete(param.row.id)
                                        }).catch(() => {
                                            this.$message.info("已取消删除");          
                                        });
                                    }
                                }
                            }, "删除")];
                        }
                        return h('div', a);
                    }
                }
            ]
        }
    },
    components: {
        MyTable,
        versionCom
    },
    mounted() {
        this.getData(this.currentPage)
    },
    methods: {
        savePrompt(){
            if(this.addVipLevelData.old_good===0){
                this.prompt_title = "您修改了会员折扣，不对已添加商品的该等级会员价进行修改，仅对将来添加的商品生效，确定修改？"
            }else if(this.addVipLevelData.old_good===1){
                this.prompt_title = "您修改了会员折扣，将对已添加商品的该等级会员价进行修改，新的会员价将在5分钟之内生效，确定修改？"
            }
            this.promptDialog = true
        },
        checkDiscountChange(val){
            let that = this
            if(val[0]==="购物折扣"){
                getAuditApplicationList(9).then((res)=>{
                    if(res.data.code===200){
                        if(res.data.data===false){
                            that.showVersion = true
                            that.checkList = []
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('系统出错，请联系管理员！');
                })
            }
        },
        getData(currentPage){
            this.currentPage = currentPage
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                page: currentPage
            }
            this.$axios.post(this.url+'shopapi/member_card/memberindex',data
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        delete(id){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id
            }
            this.$axios.post(this.url+'shopapi/member_card/memberdel',data
            ).then(res=>{
                if(res.data.code===200){
                    that.getData()
                    that.$message.success("删除成功");
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        addVisible(id){
            this.id = id
            if(id!=-1){
                let that = this
                let data = {
                    secret: localStorage.getItem('secretId'),
                    id: id
                }
                this.$axios.post(this.url+'shopapi/member_card/membershow',data
                ).then(res=>{
                    if(res.data.code===200){
                        if(res.data.data.integral===0){
                            that.disabled = true
                        }else{
                            that.disabled = false
                        }
                        that.addVipLevelData.name = res.data.data.name
                        that.addVipLevelData.logo = res.data.data.logo
                        that.addVipLevelData.integral = res.data.data.integral
                        if(res.data.data.discount===0){
                            that.addVipLevelData.discount = undefined
                        }else{
                            that.addVipLevelData.discount = res.data.data.discount
                        }
                        if(res.data.data.status===0){
                            that.checkList = []
                        }else{
                            that.checkList = ["购物折扣"]
                        }
                        that.state = res.data.data.state
                        that.addVipLevelData.old_good = res.data.data.old_good
                        that.vipLevelVisible = true
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch(err=>{
                    that.$message.error('系统出错，请联系管理员！');
                });
            }else{
                if(this.disabled===true){
                    this.disabled = false
                }
                this.addVipLevelData.name = ""
                this.addVipLevelData.logo = ""
                this.addVipLevelData.integral = undefined
                this.state = 1
                this.addVipLevelData.discount = undefined
                this.checkList = []
                this.vipLevelVisible = true
            }
        },
        beforeLogoUpload(file){ // logo图上传前的校验格式和大小
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }else{
                return true
            }
            if(file.size/1024>200){
                this.$message.warning("上传图片大小不能超过200kb")
                return false
            }
        },
        logoSuccess(res,file,fileList){ // 储值卡logo图上传成功
            this.$message.success("上传成功")
            this.addVipLevelData.logo = res.data.src
        },
        addVipLevel(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    let that = this
                    let data = JSON.parse(JSON.stringify(this.addVipLevelData))
                    data.state = this.state
                    if(data.integral===undefined){
                        data.integral = ""
                    }
                    if(this.checkList.indexOf("购物折扣")===-1){
                        data.discount = ""
                        data.status = 0
                    }else{
                        data.status = 1
                    }
                    let editUrl
                    if(this.id!=-1){
                        data.id = this.id
                        editUrl =  "shopapi/member_card/memberedit"
                    }else{
                        editUrl = "shopapi/member_card/memberadd"
                    }
                    this.saveLoading = true
                    this.$axios.post(this.url+editUrl,data
                    ).then(res=>{
                        setTimeout(() => {
                            that.saveLoading = false
                        }, 1500);
                        if(res.data.code===200){
                            that.getData()
                            that.$message.success("保存成功");
                            that.promptDialog = false
                            that.vipLevelVisible = false
                        }else{
                            that.$message.error(res.data.msg);
                        }
                    }).catch(err=>{
                        that.saveLoading = false
                        that.$message.error('系统出错，请联系管理员！');
                    });
                }else{
                    return false;
                }
            });
        },
        editDescription(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axios.post(this.url+'shopapi/member_card/noteindex',data
            ).then(res=>{
                if(res.data.code===200){
                    if(res.data.data===null){
                        that.descriptionData.notes = ""
                        that.descriptionData.id = ""
                    }else{
                        that.descriptionData.notes = res.data.data.notes
                        that.descriptionData.id = res.data.data.id
                    }
                    that.descriptionVisible = true
                    
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        saveDescription(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    let that = this
                    let data = JSON.parse(JSON.stringify(this.descriptionData))
                    this.$axios.post(this.url+"shopapi/member_card/noteadd",data
                    ).then(res=>{
                        if(res.data.code===200){
                            that.getData()
                            that.$message.success("保存成功");
                            that.descriptionVisible = false
                        }else{
                            that.$message.error(res.data.msg);
                        }
                    }).catch(err=>{
                        that.$message.error('系统出错，请联系管理员！');
                    });
                }else{
                    return false;
                }
            });
        }
    },
    computed: {
    　　levelTitle() {
    　　　　return this.addVipLevelData.name
    　　}
    },
    watch: {
        levelTitle: {
            handler(val,oldVal){
                this.name_number = val.length
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-membershipLevel{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    /deep/ .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
    .el-button--default{
        color: #999;
        &:hover,&:focus{
            background: inherit;
        }
    }
    .el-button--primary{
        background: #719FF8;
    }
    .wf-gray-title{
        font-size: 12px;
        color: #999;
        height: 25px;
    }
    .label-left{
        /deep/ .el-form-item__label{
            margin-left: -10px;
        }
    }
    .wf-form-input{
        width: 300px;
        margin-right: 10px;
    }
    .wf-form-small-input{
        width: 100px;
        margin-right: 10px;
    }
    .wf-h1-title{
        height: 50px;
        background: #F8F8F8;
        border-radius: 4px;
        color: #E36F6B;
        line-height: 50px;
        padding-left: 20px;
        margin-bottom: 20px;
    }
    /deep/ .el-dialog__header{
        border-bottom: 1px solid #F0F0F0;
        padding: 20px 20px 20px 20px;
        .el-icon{
            font-size: 18px;
        }
    }
    /deep/ .el-dialog__body{
        padding: 20px 20px;
    }
    /deep/ .el-dialog__footer{
        text-align: center;
    }
    .el-textarea{
        /deep/ .el-textarea__inner{
            height: 80px!important;
        }
    }
    /deep/ .el-table{
        margin-top: 10px;
        thead{
            font-size: 16px;
            color: #333!important;
            .cell{
                font-weight: 400;
            }
        }
    }
    .footer-btn{
        text-align:center;
        padding: 10px 0;
    }
    .wf-inline-block{
        display: inline-block;
    }
    // 图片上传样式
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
}
</style>
