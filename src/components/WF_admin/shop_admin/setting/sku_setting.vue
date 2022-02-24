<template>
    <div class="wf-sku_setting">
        <el-button size="mini" type="primary" @click="addSku">新增规格</el-button>
        <div class="wf-close"><span class="open" @click="defaultExpand">{{expandText}}</span></div>
        <el-table
        :data="tableData"
        style="width: 100%;margin-top:20px;"
        row-key="id"
        :default-expand-all="default_expand"
        ref="table"
        :expand-row-keys="expandKeys">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <!-- 子分类表格 -->
                    <el-table
                    class="son-table"
                    :data="props.row.children"
                    style="width: 100%"
                    :show-header="false"
                    empty-text="暂无规格值">
                        <el-table-column>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="props">
                                <div style="margin-left:10px;">{{props.row.spec_name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="orderby">
                            <template slot-scope="props">
                                <div style="margin-left:25px;">{{props.row.orderby}}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                        prop="use_num">
                            <template slot-scope="props">
                                <div style="margin-left:24px;">{{props.row.use_num}}</div>
                            </template>
                        </el-table-column> -->
                        <el-table-column >
                            <template slot-scope="props">
                                <el-button type="text" style="color:#719FF8;margin-left:124px;" @click="editSpec(props.row)">编辑</el-button>
                                <el-button type="text" style="color:#E36F6B;" @click="deleteSpec(props.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column>
            </el-table-column>
            <el-table-column
            label="规格 / 规格值"
            prop="spec_name">
            </el-table-column>
            <el-table-column
            label="排序"
            prop="orderby">
            </el-table-column>
            <!-- <el-table-column
            label="被使用总数"
            prop="use_num">
            </el-table-column> -->
            <el-table-column
            label="操作">
                <template slot-scope="props">
                    <el-button type="text" style="color:#719FF8;" @click="addSpec(props.row)">新增规格值</el-button>
                    <el-button type="text" style="color:#719FF8;" @click="editSku(props.row)">编辑</el-button>
                    <el-button type="text" style="color:#E36F6B;" @click="deleteSku(props.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        title="新增规格值"
        :visible.sync="addSpecVisible"
        width="512px">
        <div class="wf-gray-title">规格名称 <span class="wf-light-black">{{sku_name}}</span></div>
        <div>*规格值 <span style="margin-left:232px;">排序 <span class="wf-gray-font">数字越大越靠前</span></span></div>
        <div style="margin-top:16px;" v-for="(spec,index) in addSpecForm" :key="index">
            <el-input style="width:260px;margin-right:20px;" size="mini" v-model="addSpecForm[index].spec"></el-input>
            <el-input-number style="width:120px;margin-right:10px;" size="mini" v-model="addSpecForm[index].orderby" placeholder="请输入数字" :precision="0" :controls="false"></el-input-number>
            <el-button style="color:#E36F6B;" v-if="index>0" type="text" @click="deleteSpecInput(index)">删除</el-button>
        </div>
        <i class="el-icon-plus" style="cursor:pointer;color:#719FF8;" @click="addSpecInput"></i><el-button type="text" @click="addSpecInput">添加</el-button>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="addSpecVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="addSpecSave">保存</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="编辑规格"
        :visible.sync="addSkuVisible"
        width="512px">
        <el-form 
        label-position="right"
        label-width="110px">
            <el-form-item label="*规格名称">
                <el-input v-model="addSkuName" placeholder="请输入规格名称" size="mini" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="addOrderby" :controls="false" :precision="0" placeholder="请输入数字" size="mini" style="width:300px;"></el-input-number>
            </el-form-item>
            <el-form-item>
                <span class="wf-gray-font">数字越大越靠前</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="addSkuVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="addSkuSave">保存</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="编辑规格值"
        :visible.sync="editSpecVisible"
        width="512px">
        <el-form 
        label-position="right"
        label-width="110px">
            <el-form-item label="规格名称">
                <div style="line-height:32px;">{{edit_sku_name}}</div>
            </el-form-item>
            <el-form-item label="*规格值">
                <el-input v-model="editSpecName" placeholder="请输入规格值名称" size="mini" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="editOrderby" :controls="false" :precision="0" placeholder="请输入数字" size="mini" style="width:300px;"></el-input-number>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="editSpecVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="editSpecSave">保存</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import adapter from '@/server/adapter';
export default {
    name: "sku_setting",
    data(){
        return {
            expandText: "展开",
            expandKeys: [],
            default_expand: false, // 全部折叠或展开
            addOrEditSku: 0, // 判断新建或编辑规格
            editOrderby: undefined, // 编辑规格值排序
            editSpecName: "", // 编辑规格值名称
            addSkuName: "",
            addOrderby: undefined,
            editSpecVisible: false, // 编辑规格值对话框
            addSkuVisible: false, // 新增规格对话框
            sku_name: "", // 新增规格值父规格名称
            edit_sku_name: "", // 编辑规格值父规格名称
            addSpecVisible: false, // 新增规格值对话框
            addSpecForm: [
                {
                    spec: "",
                    orderby: undefined
                }
            ],
            tableData: [],
            pid: "", // 父id规格
            id: "", // 规格id
            edit_son_id: "", //编辑规格值id
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        defaultExpand(){
            if(this.expandKeys.length===0){
                let arr = []
                for(let i=0;i<this.tableData.length;i++){
                    arr.push(this.tableData[i].id)
                }
                this.expandKeys = arr
                this.expandText = "收起"
            }else{
                this.expandKeys = []
                this.expandText = "展开"
            }
        },
        getData(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axios.post(this.url+'shopapi/default_spec/index',data
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        addSku(){
            this.addSkuName = ""
            this.addOrderby = undefined
            this.addSkuVisible = true
            this.addOrEditSku = 0
        },
        addSpec(row){
            this.addSpecVisible = true
            this.sku_name = row.spec_name
            this.addSpecForm = [{spec: "",orderby: undefined}]
            this.pid = row.id
        },
        editSku(row){
            this.addSkuVisible = true
            this.addSkuName = row.spec_name
            this.addOrderby = row.orderby
            this.addOrEditSku = 1
            this.id = row.id
        },
        addSpecInput(){
            this.addSpecForm.push({spec:"",orderby:undefined})
        },
        deleteSpecInput(index){
            this.addSpecForm.splice(index,1)
        },
        deleteSku(id){
            this.$confirm('删除规格将会删除此规格下的所有规格值，是否确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                let data = {
                    secret: localStorage.getItem('secretId'),
                    id: id
                }
                this.$axios.post(this.url+'shopapi/default_spec/delDefault',data
                ).then(res=>{
                    if(res.data.code===200){
                        that.$message.success("删除成功")
                        that.getData()
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
        deleteSpec(id){
            this.$confirm('是否确定删除此规格值？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                let data = {
                    secret: localStorage.getItem('secretId'),
                    id: id
                }
                this.$axios.post(this.url+'shopapi/default_spec/delDefault',data
                ).then(res=>{
                    if(res.data.code===200){
                        that.$message.success("删除成功")
                        that.getData()
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
        editSpec(row){
            this.editSpecVisible = true
            this.editSpecName = row.spec_name
            this.editOrderby = row.orderby
            for(let i=0;i<this.tableData.length;i++){
                if(this.tableData[i].id===row.pid){
                    this.edit_sku_name = this.tableData[i].spec_name
                }
            }
            this.edit_son_id = row.id
        },
        addSkuSave(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                spec_name: this.addSkuName
            }
            if(this.addOrderby!=undefined){
                data.orderby = this.addOrderby
            }
            let editUrl = ""
            if(this.addOrEditSku===0){
                editUrl = 'shopapi/default_spec/addDefault'
            }else{
                editUrl = 'shopapi/default_spec/editDefault'
                data.id = this.id
            }
            this.$axios.post(this.url+editUrl,data
            ).then(res=>{
                if(res.data.code===200){
                    that.$message.success("保存成功")
                    that.addSkuVisible = false
                    that.getData()
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        addSpecSave(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                spec_name: this.sku_name,
                pid: this.pid
            }
            let spec = []
            for(let i=0;i<this.addSpecForm.length;i++){
                spec.push({spec_name:this.addSpecForm[i].spec,orderby:this.addSpecForm[i].orderby})
            }
            data.spec = spec
            this.$axios.post(this.url+'shopapi/default_spec/addDefault',data
            ).then(res=>{
                if(res.data.code===200){
                    that.$message.success("保存成功")
                    that.addSpecVisible = false
                    that.getData()
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        },
        editSpecSave(){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                spec_name: this.editSpecName,
                id: this.edit_son_id,
                orderby: this.editOrderby
            }
            this.$axios.post(this.url+'shopapi/default_spec/editDefault',data
            ).then(res=>{
                if(res.data.code===200){
                    that.getData()
                    that.editSpecVisible = false
                    that.$message.success("保存成功")
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员！');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-sku_setting{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
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
    .el-button--text{
        color: #719FF8;
    }
    .el-button--primary{
        background: #719FF8;
    }
    /deep/ .el-dialog{
        .el-dialog__footer{
            text-align: center;
        }
    }
    /deep/ .el-table{
        border-radius: 4px;
        thead{
            color: #333;
            font-weight:400;
        }
        th{
            background: #F8F8F8;
        }
        td{
            font-size:16px;
            font-weight:600;
            padding: 2px 0;
        }
    }
    /deep/ .son-table{
        td{
            color: #666;
            font-weight: 400;
        }
    }
    /deep/ .el-table__expanded-cell[class*=cell]{
        padding: 0 50px;
    }
    /deep/ .el-dialog{
        .el-dialog__header{
            border-bottom: 1px solid #F0F0F0;
        }
        .el-dialog__body{
            padding-top: 10px;
        }
        .wf-gray-title{
            height:40px;
            border-radius:4px;
            background: #F8F8F8;
            padding-left: 20px;
            line-height: 40px;
            margin-bottom: 16px;
        }
        .wf-light-black{
            font-weight:600;
            color: #333;
        }
        .wf-gray-font{
            font-size:12px;
            color: #999;
        }
    }
    /deep/ .el-form{
        margin-top: 16px;
        .el-form-item{
            margin-bottom: 20px;
        }
        .el-form-item__content{
            line-height: 0;
        }
    }
    /deep/ .el-table__empty-text{
        font-weight: 400;
    }
}
</style>