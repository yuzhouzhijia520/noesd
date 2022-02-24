<template>
    <div class="wf-waybillList">
        <p class="wf-title">生成运单后请联系快递员上门取件</p>
        <el-form label-position="right" label-width="80px">
            <el-form-item label="打印时间">
                <el-date-picker
                v-model="printTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                size="mini"
                :default-time="['00:00:00','23:59:59']"
                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="运单号">
                <el-input v-model="awb" class="wf-search-input" size="mini" @keyup.enter.native="getList(1,2)"></el-input>
                <span class="wf-search-space">快递公司</span>
                <el-select class="wf-search-input" v-model="express_id" placeholder="请选择" size="mini" @keyup.enter.native="getList(1,2)">
                    <el-option
                    v-for="item in courierOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <span class="wf-search-space">运输状态</span>
                <el-select class="wf-search-input" v-model="waybill_state" placeholder="请选择" size="mini" @keyup.enter.native="getList(1,2)">
                    <el-option
                    v-for="item in cargoOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单编号">
                <el-input v-model="trade_no" class="wf-search-input" size="mini" @keyup.enter.native="getList(1,2)"></el-input>
                <el-button class="wf-search-space" type="primary" size="mini" @click="getList(1,2)" :loading="searchLoading">搜索</el-button>
                <el-button type="text" @click="clearAll">清空搜索条件</el-button>
            </el-form-item>
        </el-form>
        <my-table :tableData='tableData' :columns='columns' :currentPage='currentPage' :totalPage="totalPage" @currentChange="getList" :pageSize="pageSize"></my-table>
        <dialog-table
        :dialogVisible="dialogVisible"
        :tableData='logisticsData'
        :columns='logisticsColumns'
        dialogWidth="800px"
        @beforeClose="beforeClose"
        :pagination="false">
        </dialog-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import DialogTable from "@/commonComponents/dialogTable/dialogTable.vue";
import { dateFormat } from "@/untils/common.js";
import { waybillIndex, waybillCompany, cancelLogistics, waybillListLogistics } from "@/server/waybillList.js"
export default {
    name: "waybillList",
    data() {
        return {
            table_id: 1,
            // 弹框组件开始
            logisticsData: [], // 列表数据
            logisticsColumns: [
                {   
                    label: "时间",
                    align: "center",
                    render: (h, param)=> {
                        return h('span',{
                            attrs: {
                                style: param.index===0?"color:#719FF8;":""
                            }
                        },dateFormat(param.row.action_time))
                    }
                },
                {   
                    label: "内容",
                    align: "center",
                    render: (h, param)=> {
                        return h('span',{
                            attrs: {
                                style: param.index===0?"color:#719FF8;":""
                            }
                        },param.row.action_msg)
                    }
                },
                {   
                    label: "状态",
                    align: "center",
                    render: (h, param)=> {
                        return h('span',{
                            attrs: {
                                style: param.index===0?"color:#719FF8;":""
                            }
                        },param.row.action_name)
                    }
                },
            ],
            dialogVisible: false,
            // 弹框组件结束
            cancelLoading: false,
            searchLoading: false,
            trade_no: "", // 订单编号
            awb: "", // 运单号
            waybill_state: -1, // 运输状态
            cargoOption: [
                { value: -1, label: "全部" },{ value: 0, label: "待揽件" },{ value: 1, label: "运输中" },
                { value: 2, label: "派件中" },{ value: 3, label: "已签收" },{ value: 4, label: "异常签收" }
            ],
            express_id: "", // 快递公司
            courierOption: [],
            printTime: [], // 打印时间
            pickerOptions: {
                shortcuts: [{
                    text: '昨天',
                    onClick(picker) {
                        const myDate = new Date();
                        myDate.setTime(myDate.getTime() - 3600 * 1000 * 24)
                        const start = new Date((myDate.getFullYear()),myDate.getMonth(),myDate.getDate(),0,0,0);
                        const end = new Date((myDate.getFullYear()),myDate.getMonth(),myDate.getDate(),23,59,59);
                        start.setTime(start.getTime());
                        end.setTime(end.getTime());
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '今天',
                    onClick(picker) {
                        const myDate = new Date();
                        const start = new Date((myDate.getFullYear()),myDate.getMonth(),myDate.getDate(),0,0,0);
                        const end = new Date((myDate.getFullYear()),myDate.getMonth(),myDate.getDate(),23,59,59);
                        start.setTime(start.getTime());
                        end.setTime(end.getTime());
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            pageSize: 10,
            currentPage: 1,
            totalPage: 0,
            tableData: [],
            columns: [
                {   
                    label: "生成时间",
                    align: "center",
                    prop: "waybill_time"
                },
                {   
                    label: "运单号/订单号",
                    align: "center",
                    width: "400",
                    render: (h, param)=> {
                        return h('span',param.row.waybill_id+" / "+param.row.trade_no)
                    }
                },
                {   
                    label: "快递公司",
                    align: "center",
                    prop: "name"
                },
                {   
                    label: "发货状态",
                    align: "center",
                    prop: "state"
                },
                {   
                    label: "运输状态",
                    align: "center",
                    prop: "waybill_brief"
                },
                {   
                    label: "操作",
                    align: "center",
                    render: (h, param)=> {
                        let a =[];
                        if(param.row.waybill_state===0){
                            a = [
                                h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8"
                                    },
                                    on: {
                                        click: () => {
                                            this.logisticsGetList(param.row.id)
                                        }
                                    }
                                }, "查看物流"),
                                h('el-button', {
                                    props: {
                                        type: "text",
                                        loading: this.cancelLoading
                                    },
                                    attrs: {
                                        style: "color:#719FF8"
                                    },
                                    on: {
                                        click: () => {
                                            this.$confirm('取消运单，则本运单作废，订单需要重新发货', '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                type: 'warning',
                                                center: true
                                            }).then(() => {
                                                this.cancelLogistics(param.row)
                                            }).catch(() => {
                                                this.$message.info("已取消删除");          
                                            });
                                        }
                                    }
                                }, "取消运单")
                            ];
                        }else{
                            a= [
                                h('el-button', {
                                    props: {
                                        type: "text"
                                    },
                                    attrs: {
                                        style: "color:#719FF8"
                                    },
                                    on: {
                                        click: () => {
                                            this.logisticsGetList(param.row.id)
                                        }
                                    }
                                }, "查看物流"),
                                h('el-button', {
                                    props: {
                                        type: "text",
                                        loading: this.cancelLoading
                                    },
                                    attrs: {
                                        style: "color:#ccc"
                                    },
                                }, "取消运单")
                            ];
                        }
                        return a;
                    }
                },
            ],
        }
    },
    components: {
        MyTable,
        DialogTable
    },
    mounted(){
        this.getList(this.currentPage)
        this.waybillCompany()
    },
    methods: {
        beforeClose(){
            this.dialogVisible = false
        },
        logisticsGetList(id){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                order_id: id
            }
            waybillListLogistics(data).then((res)=>{
                if(res.data.code===200){
                    that.logisticsData = res.data.data.path_item_list
                    that.dialogVisible = true
                }else{
                    that.$message.error(res.data.msg+"600A00119");
                }
            }).catch(err=>{
                that.$message.error('网络错误600B00120');
            });
        },
        waybillCompany(){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId"))
            }
            waybillCompany(data).then((res)=>{
                if(res.data.code===200){
                    that.courierOption = res.data.data
                    that.courierOption.unshift({id:"",name:"全部"})
                }else{
                    that.$message.error(res.data.msg+"600A00109");
                }
            }).catch(err=>{
                that.$message.error('网络错误600B00110');
            });
        },
        getList(currentPage,type){
            this.currentPage = currentPage
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                page: type===2?1:this.currentPage,
                limit: this.pageSize,
                express_id: this.express_id!==""?this.express_id:undefined,
                waybill_id: this.awb!==""?this.awb:undefined,
                trade_no: this.trade_no!==""?this.trade_no:undefined,
                waybill_state: this.waybill_state,
                start_time: this.printTime===null?"":this.printTime[0]?this.printTime[0]:"",
                end_time: this.printTime===null?"":this.printTime[1]?this.printTime[1]:""
            }
            if(type===2){
                if(this.trade_no!==""&&!/^[0-9a-zA-Z]+$/.test(this.trade_no)){
                    this.$message.warning("请输入正确的订单号")
                    return
                }else if(this.awb!==""&&!/^[0-9a-zA-Z]+$/.test(this.awb)){
                    this.$message.warning("请输入正确的运单号")
                    return
                }
                this.searchLoading = true
            }
            waybillIndex(data).then((res)=>{
                that.searchLoading = false
                if(res.data.code===200){
                    that.tableData = res.data.data.data
                    that.currentPage = res.data.data.current_page
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg+"600A00107");
                }
            }).catch(err=>{
                that.searchLoading = false
                that.$message.error('网络错误600B00108');
            });
        },
        clearAll(){
            this.printTime = []
            this.express_id = ""
            this.waybill_state = -1
            this.awb = ""
            this.trade_no = ""
        },
        cancelLogistics(row){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: parseInt(localStorage.getItem("proId")),
                order_id: row.id
            }
            this.cancelLoading = true
            cancelLogistics(data).then((res)=>{
                that.cancelLoading = false
                if(res.data.code===200){
                    that.getList(1)
                    that.$message.success("取消成功")
                }else{
                    that.$message.error(res.data.msg+"");
                }
            }).catch(err=>{
                that.cancelLoading = false
                that.$message.error('网络错误');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-waybillList{
    .wf-search-input{
        width: 200px;
    }
    .wf-search-space{
        margin: 0 20px;
    }
}
</style>
