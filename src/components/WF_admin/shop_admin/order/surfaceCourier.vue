<template>
    <div class="wf-surfaceCourier">
        <p class="wf-title">更多快递公司，请到小程序后台绑定签约账号。</p>
        <my-table class="wf-table-header" :tableData='tableData' :columns='columns' :pagination="false" :border="true"></my-table>
        <div class="wf-surface-box" v-for="(item,index) in tableHeader" :key="index">
            <div class="wf-table-header-box">
                <span>{{item.name}}{{item.cash===1?"（可发散单）":""}}</span>
                <el-button type="text" @click="addDelivery(item,1)">新增发货信息</el-button>
                <div class="clear"></div>
            </div>
            <my-table :tableData="item.address" :pagination="false" :showHeader="false" :columns="columnsChildren" :border="true"></my-table>
        </div>
        <el-pagination
        @current-change="getList"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalPage">
        </el-pagination>
        <el-dialog
        :title="dialogTitle"
        :visible.sync="addDeliveryDialog"
        width="500px"
        :close-on-click-modal="false"
        center>
        <el-form label-position="right" label-width="100px" :model="addDeliveryData" :rules="addDeliveryRules" ref="addDeliveryData">
            <el-form-item label="快递公司">
                {{courierName}}
            </el-form-item>
            <el-form-item label="发货地址" prop="address_id">
                <el-select class="wf-form-input" v-model="addDeliveryData.address_id" placeholder="请选择" size="mini">
                    <el-option
                    v-for="item in addresOptions"
                    :key="item.id"
                    :label="item.code+item.address"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="text" @click="addJump">新建</el-button>
            </el-form-item>
            <el-form-item label="签约账号" prop="biz_id">
                <el-input class="wf-form-input" v-model="addDeliveryData.biz_id" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="发货人" prop="contacts">
                <el-input class="wf-form-input" v-model="addDeliveryData.contacts" size="mini" :maxLength="15"></el-input>
            </el-form-item>
            <el-form-item label="发货人电话" prop="phone">
                <el-input-number class="wf-form-input" v-model="addDeliveryData.phone" size="mini" :controls="false" :precision="0" :min="0"></el-input-number>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDeliveryDialog = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="deliverySave('addDeliveryData')" size="mini" :loading="addLoading">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { expressIndex, expressAddressAdd, expressAddressInfo, expressAddressDel } from "@/server/surfaceCourier.js"
export default {
    name: "surfaceCourier",
    data() {
        const phoneValid = (rule, value, callback) => {
            if(value===undefined){
                callback(new Error("请填写发货人电话"))
            }else if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)){
                callback(new Error("请填写正确的手机号"))
            }else{
                callback()
            }
        };
        return {
            dialogType: 0,
            dialogTitle: "",
            table_son_id: -1, // 存发货地址id
            deleteLoading: false, // 删除按钮loading
            rowData: {}, // 存当前表的数据
            addLoading: false,
            courierName: "", // 保存快递公司名称
            addDeliveryDialog: false,
            pageSize: 5,
            currentPage: 1,
            totalPage: 0,
            tableData: [],
            tableHeader: [],
            addresOptions: [],
            addDeliveryData: {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                address_id: "",
                contacts: "",
                phone: undefined,
                express_id: -1,
                biz_id: ""
            },
            addDeliveryRules: {
                address_id: [
                    { required: true, message: '请选择发货地址', trigger: 'change' }
                ],
                contacts: [
                    { required: true, message: '请填写发货人', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: phoneValid, trigger: 'blur' }
                ]
            },
            columns: [
                {   
                    renderHeader:(h, param) => {
                        return [h('span',{
                            class: 'headerTab'
                        },"快递公司")]
                    },
                    width: "260",
                    align: "left"
                },
                {   
                    label: "面单余量",
                    align: "center"
                },
                {   
                    label: "发货信息",
                    align: "center",
                    width: "600"
                },
                {   
                    label: "操作",
                    align: "center"
                }
            ],
            columnsChildren: [
                {   
                    align: "left",
                    width: "260",
                    render: (h, param)=> {
                        return [
                            h('span',{
                                attrs: {
                                    style: "margin-left:80px;"
                                }
                            }, param.row.name)
                        ]
                    }
                },
                {
                    align: "center",
                    render: (h, param)=> {
                        return [
                            h('span', param.row.quota_num)
                        ]
                    }
                },
                {   
                    align: "left",
                    width: "600",
                    render: (h, param)=> {
                        let a = [
                            h('p',"发货信息："+param.row.contacts+" "+param.row.phone),
                            h('p',param.row.code.join(" ")+" "+param.row.address)
                        ]
                        return [h('div',{
                            attrs: {
                                style: "padding:0 100px;;margin:0 auto;text-align:left;"
                            }
                        },a)]
                    }
                },
                {
                    align: "center",
                    render: (h, param)=> {
                        return [
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#719FF8"
                                },
                                on: {
                                    click: () => {
                                        this.addDelivery(param.row,2)
                                    }
                                }
                            }, "修改"),
                            h('el-button', {
                                props: {
                                    type: "text",
                                    loading: this.deleteLoading
                                },
                                attrs: {
                                    style: "color:#E36F6B"
                                },
                                on: {
                                    click: () => {
                                        this.$confirm('删除后，发货时将不能选择该地址进行在线快递发货', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning',
                                            center: true
                                        }).then(() => {
                                            this.surfaceDelete(param.row)
                                        }).catch(() => {
                                            this.$message.info("已取消删除");          
                                        });
                                    }
                                }
                            }, "删除")
                        ]
                    }
                }
            ]
        }
    },
    components: {
        MyTable
    },
    mounted() {
        this.getList(this.currentPage)
    },
    methods: {
        getList(currentPage){
            this.currentPage = currentPage
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                page: this.currentPage,
                limit: this.pageSize
            }
            expressIndex(data).then((res)=>{
                if(res.data.code===200){
                    let tableData = JSON.parse(JSON.stringify(res.data.data.data))
                    tableData.forEach(el => {
                        el.address.forEach(item => {
                            item.name = el.name
                            item.quota_num = el.quota_num
                        });
                    });
                    that.tableHeader = tableData
                    that.currentPage = res.data.data.current_page
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg+"600A00105");
                }
            }).catch(err=>{
                that.$message.error('网络错误600B00106');
            });
        },
        addDelivery(row,type){
            this.dialogType = type
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId"))
            }
            this.rowData = row
            if(type===1){
                this.addDeliveryData.express_id = row.id
                data.express_id = row.id
            }else if(type===2){
                this.addDeliveryData.express_id = row.express_id
                this.table_son_id = row.id
                data.express_id = row.express_id,
                data.address_id = row.id
            }
            expressAddressInfo(data).then((res)=>{
                if(res.data.code===200){
                    that.courierName = row.name
                    if(type===1){
                        that.addresOptions = res.data.data.map((item)=>{
                            item.code = item.code.split(",").join("")
                            return item
                        })
                        that.addDeliveryData.address_id = ""
                        that.addDeliveryData.contacts = ""
                        that.addDeliveryData.phone = undefined
                        that.dialogTitle = "新增发货信息"
                    }else if(type===2){
                        that.addresOptions = res.data.data.address.map((item)=>{
                            item.code = item.code.split(",").join("")
                            return item
                        })
                        that.addDeliveryData.address_id = res.data.data.info.yid
                        that.addDeliveryData.contacts = res.data.data.info.contacts
                        that.addDeliveryData.phone = res.data.data.info.phone
                        that.addDeliveryData.biz_id = res.data.data.info.biz_id
                        that.dialogTitle = "编辑发货信息"
                    }
                    that.addDeliveryDialog = true
                }else{
                    that.$message.error(res.data.msg+"600A0095");
                }
            }).catch(err=>{
                that.$message.error('网络错误600B0096');
            });
        },
        addJump(){
            window.open(this.$router.resolve({path:'/wf/admin/shop/shopAddress'}).href);
        },
        deliverySave(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if(valid){
                    let that = this
                    let data = JSON.parse(JSON.stringify(this.addDeliveryData))
                    if(this.rowData.cash===0&&data.biz_id===""){
                        this.$message.warning("此快递公司不可发散单，请填写签约账号")
                        return
                    }
                    if(this.dialogType===2){
                        data.id = this.table_son_id
                    }
                    this.addLoading = true
                    expressAddressAdd(data).then((res)=>{
                        that.addLoading = false
                        if(res.data.code===200){
                            that.getList(that.currentPage)
                            that.addDeliveryDialog = false
                            that.$message.success("添加成功")
                        }else{
                            that.$message.error(res.data.msg+"600A0097");
                        }
                    }).catch(err=>{
                        that.addLoading = false
                        that.$message.error('网络错误600B0098');
                    });
                }
            })
        },
        surfaceDelete(row){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                id: row.id
            }
            this.deleteLoading = true
            expressAddressDel(data).then((res)=>{
                that.deleteLoading = false
                if(res.data.code===200){
                    that.getList(that.currentPage)
                    that.$message.success("删除成功");
                }else{
                    that.$message.error(res.data.msg+"600A00101");
                }
            }).catch(err=>{
                that.deleteLoading = false
                that.$message.error('网络错误600B00102');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-surfaceCourier{
    .clear{
        clear: both;
    }
    /deep/ .el-input-number .el-input__inner{
        text-align: left;
    }
    /deep/ .wf-table-header{
        margin-bottom: 10px;
        .el-table{
            border-radius: 4px;
        }
        th,tr{
            background: #f3f3f3;
        }
        .el-table__body-wrapper{
            display: none;
        }
    }
    .wf-surface-box{
        margin-bottom: 10px;
        border-radius: 4px;
        .wf-table-header-box{
            background: #f3f3f3;
            padding: 10px;
            border-radius: 4px;
            span{
                margin-left: 80px;
            }
            .el-button{
                float: right;
                margin-right: 20px;
            }
        }
    }
    /deep/ .el-table{
        td,th{
            padding: 4px 0;
        }
    }
    .wf-form-input{
        width: 200px;
    }
}
</style>
