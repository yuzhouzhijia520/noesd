<template>
    <div class="wf-printList">
        <el-button @click="addPrinterList" size="mini">添加打印员</el-button>
        <my-table
            :tableData='tableData'
            :columns='columns'
            :currentPage='currentPage'
            :totalPage="totalPage"
            @currentChange="getList"
            :pageSize="pageSize">
        </my-table>
        <el-dialog
        class="wf-dialogTable-component"
        title="添加打印员"
        :visible.sync="printerDialog"
        width="1000px"
        :close-on-click-modal="false"
        top="3vh"
        center>
            昵称
            <el-input v-model="nickName" @keyup.enter.native="dialogGetList(1,2)" class="wf-from-input" size="mini"></el-input>
            手机号
            <el-input-number v-model="phone" :controls="false" :precision="0" :min="0" @keyup.enter.native="dialogGetList(1,2)" class="wf-from-input" size="mini"></el-input-number>
            <el-button type="primary" size="mini" @click="dialogGetList(1,2)" :loading="searchLoading">搜索</el-button>
            <my-table
                :tableData='dialogList'
                :columns='dialogColumns'
                :currentPage='dialogPage'
                :totalPage="dialogTotal"
                @currentChange="dialogGetList"
                :pageSize="dialogPageSize">
            </my-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="printerDialog = false" size="mini">返回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import { printListGet, updatePrintLister } from "@/server/printList.js"
export default {
    name: "printList",
    data() {
        return {
            searchLoading: false,
            nickName: "",
            phone: undefined,
            dialogPage: 1,
            dialogTotal: 0,
            printerDialog: false,
            dialogPageSize: 10,
            dialogList: [],
            dialogColumns: [
                {   
                    label: "头像",
                    align: "center",
                    render: (h, param)=> {
                        return h('img',{
                            attrs: {
                                preview: param.row.id,
                                src: param.row.avatarUrl,
                                style: "width:40px;height:40px;"
                            }
                        })
                    }
                },
                {
                    label: "昵称",
                    align: "center",
                    prop: "nickName"
                },
                {
                    label: "手机号",
                    align: "center",
                    prop: "phone"
                },
                {
                    label: "绑定时间",
                    align: "center",
                    prop: "printer_time"
                },
                {   
                    label: "操作",
                    align: "center",
                    render: (h, param)=> {
                        return h('el-button',{
                            props: {
                                type: "text"
                            },
                            on: {
                                click: () => {
                                    this.unbundling(param.row.id,0)
                                }
                            }
                        },"绑定")
                    }
                }
            ],
            pageSize: 15,
            currentPage: 1,
            totalPage: 0,
            tableData: [],
            columns: [
                {   
                    label: "头像",
                    align: "center",
                    render: (h, param)=> {
                        return h('img',{
                            attrs: {
                                preview: param.row.id,
                                src: param.row.avatarUrl,
                                style: "width:60px;height:60px;"
                            }
                        })
                    }
                },
                {
                    label: "昵称",
                    align: "center",
                    prop: "nickName"
                },
                {
                    label: "手机号",
                    align: "center",
                    prop: "phone"
                },
                {
                    label: "绑定时间",
                    align: "center",
                    prop: "printer_time"
                },
                {   
                    label: "操作",
                    align: "center",
                    render: (h, param)=> {
                        return h('el-button',{
                            props: {
                                type: "text"
                            },
                            on: {
                                click: () => {
                                    this.unbundling(param.row.id,1)
                                }
                            }
                        },"解绑")
                    }
                }
            ]
        }
    },
    components: {
        MyTable
    },
    mounted(){
        this.getList(1)
    },
    methods: {
        getList(currentChange){
            this.currentChange = currentChange
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                page: this.currentChange,
                type: 1,
                limit: this.pageSize
            }
            printListGet(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.totalPage = res.data.data.total
                    that.currentPage = res.data.data.current_page
                }else{
                    that.$message.error(res.data.msg+"600A00127");
                }
            }).catch(err=>{
                that.$message.error('网络错误600B00128');
            });
        },
        unbundling(id,type){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                id: id,
                type: type
            }
            updatePrintLister(data).then((res)=>{
                if(res.data.code===200){
                    that.getList(that.currentChange)
                    if(type===0){
                        that.dialogGetList(that.currentChange)
                        that.$message.success("绑定成功")
                    }else if(type===1){
                        that.$message.success("解绑成功")
                    }
                }else if(res.data.code===403){
                    that.$message.warning("已添加到工作区");
                }else{
                    that.$message.error(res.data.msg+"600A00129");
                }
            }).catch(err=>{
                that.$message.error('网络错误600B00130');
            });
        },
        addPrinterList(){
            this.dialogGetList(1)
        },
        dialogGetList(currentChange,type){
            this.dialogPage = currentChange
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                page: this.dialogPage,
                type: 0,
                limit: this.dialogPageSize,
                nickName: this.nickName===""?undefined:this.nickName,
                phone: this.phone
            }
            if(type===2){
                this.searchLoading = true
            }
            printListGet(data).then((res)=>{
                that.searchLoading = false
                if(res.data.code===200){
                    that.dialogList = res.data.data.data
                    that.dialogTotal = res.data.data.total
                    that.dialogPage = res.data.data.current_page
                    that.printerDialog = true
                }else{
                    that.$message.error(res.data.msg+"600A00127");
                }
            }).catch(err=>{
                that.searchLoading = false
                that.$message.error('网络错误600B00128');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-printList{
    /deep/ .el-table{
        .el-table td, .el-table th{
            text-align: center;
        }
    }
    /deep/ .el-input-number{
        .el-input__inner{
            text-align: left;
        }
    }
    .wf-from-input{
        width: 200px;
        margin: 0 10px;
    }
}
</style>
