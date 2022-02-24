<template>
    <div class="wf-evaluation">
        <el-row class="overview-box">
            <el-col class="box-card" :span="6" :offset="2">
                <p>好评率</p>
                <p class="wf-blue"><span class="wf-bigger">{{praise.split("%").join("")}}</span> %</p>
            </el-col>
            <el-col class="box-card" :span="6">
                <p>差评</p>
                <p class="wf-red"><span class="wf-bigger">{{error}}</span> 条</p>
            </el-col>
            <el-col class="box-card" :span="6">
                <p>综合评分(共{{evaluation_num}}条评价)</p>
                <el-rate
                v-model="score"
                disabled
                show-score
                text-color="#F8C65E"
                score-template="{value}">
                </el-rate>
            </el-col>
        </el-row>
        <div class="list-box">
            <div class="filter-box">
                <div>
                    <span class="type-title">评价时间</span>
                    <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div>
                    <span class="type-title">服务评分</span>
                    <el-radio-group v-model="service" size="mini" @change="getData(1)">
                        <el-radio-button :label="-1">全部({{evaluation_num}})</el-radio-button>
                        <el-radio-button :label="1">好评({{good_count}})</el-radio-button>
                        <el-radio-button :label="2">中评({{almost_count}})</el-radio-button>
                        <el-radio-button :label="3">差评({{error}})</el-radio-button>
                    </el-radio-group>
                </div>
                <div>
                    订单编号<el-input v-model="trade_no" class="wf-input-width" size="mini" @keyup.enter.native="getData(1,2)"></el-input>
                    商品名称
                    <el-input v-model="good_name" class="wf-input-width" size="mini" @keyup.enter.native="getData(1,2)"></el-input>
                    星级评价
                    <el-select class="wf-input-width" v-model="star" placeholder="请选择" size="mini" @keyup.enter.native="getData(1,2)" :disabled="starSelectDisabled">
                        <el-option
                        v-for="item in starOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    评价方式
                    <el-select class="wf-input-width" v-model="state" placeholder="请选择" size="mini" @keyup.enter.native="getData(1,2)" @change="stateChange">
                        <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="mini" :loading="searchLoading" @click="getData(1,2)">搜索</el-button>
                </div>
            </div>
            <el-table class="father-table-head" style="width: 100%">
                <el-table-column label="订单编号" align="center"></el-table-column>
                <el-table-column label="评价时间" align="center"></el-table-column>
                <el-table-column label="评价人" align="center"></el-table-column>
                <el-table-column label="星级评价" align="center"></el-table-column>
                <el-table-column label="操作" align="center"></el-table-column>
            </el-table>
            <div v-for="(table, index) in tableData" :key="index">
                <el-table
                    class="son-table-head"
                    ref="sonTable"
                    :data="table"
                    :span-method="arraySpanMethod"
                    style="width: 100%"
                    >
                    <el-table-column
                        v-for="(column, i) in columns[index]"
                        :prop="column.prop"
                        :key="i"
                        :label="column.label"
                        :width="column.width"
                        :align="column.align"
                        :type="column.type"
                        :render-header="column.renderHeader"
                        style="padding:0">
                        <template slot-scope="scope">
                            <my-render v-if="column.render" :index="scope.$index" :row="scope.row" :render="column.render"></my-render>
                            <span v-else>{{scope.row[column.prop]}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="reply-box" v-if="table[0].shop_evaluate">回复：{{table[0].shop_evaluate}}</div>
            </div>
            <el-pagination
            :current-page="currentPage"
            @current-change="getData"
            layout="total, prev, pager, next,jumper"
            :total="totalPage"
            :page-size="pageSize">
            </el-pagination>
            <el-dialog
            title="回复"
            :visible.sync="replyVisible"
            width="30%"
            :close-on-click-modal="false">
                <el-form
                label-position="right">
                    <el-form-item>
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="reply" placeholder="最多可输入200字" :maxlength="200"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="replyVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="saveReply">保 存</el-button>
                </span>
            </el-dialog>
        </div>
        <versionCom v-if="showVersion" @closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import MyRender from "@/commonComponents/table/MyRender.vue";
import { evaluationGetData, evaluationGeneralize, evaluationReply } from "@/server/evaluation.js"
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: "evaluation",
    data() {
        return {
            starSelectDisabled: false,
            showVersion:false,//控制版本提示
            replyVisible: false, // 回复弹框
            reply: "", // 回复内容
            good_name: "", // 商品名称
            trade_no: "", // 订单编号
            almost_count: "", // 中评数
            good_count: "", // 好评数
            evaluation_num: "", // 评价总数
            praise: "", // 好评率
            error: "", // 差评数
            currentPage: 1,
            totalPage: 0,
            pageSize: 5,
            searchLoading: false,
            service: -1, // 评分搜索类型
            score: 0, // 评分值
            date: "", // 时间筛选值
            star: 0, // 星级评价值
            pickerOptions: {
                shortcuts: [{
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
            starOptions: [
                { value: 0, label: "全部" },{ value: 5, label: "五星" },{ value: 4, label: "四星" },
                { value: 3, label: "三星" },{ value: 2, label: "二星" },{ value: 1, label: "一星" }
            ],
            state: 0, // 评价方式值
            stateOptions: [
                { value: 0, label: "全部" },{ value: -1, label: "默认好评" },{ value: 1, label: "买家评价" }
            ],
            tableData: [],
            columns: []
        }
    },
    components: {
        MyTable,
        MyRender,
        versionCom
    },
    mounted(){
        this.version()
        this.getGeneralize()
    },
    methods: {
        stateChange(val){
            if(val===-1){
                this.starSelectDisabled = true
                this.star = 5
            }else{
                this.starSelectDisabled = false
                this.star = 0
            }
        },
        version(){
            let that = this
            getAuditApplicationList(20).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data===false){
                        that.showVersion = true
                    }else{
                        that.getData(1)
                    }
                }else{
                    that.$message.error(res.data.msg+"600A0071");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0072');
            })
        },
        handleCloseVersion(){ // 关闭版本更新提示弹框
            this.showVersion = false;
            this.$router.push({path:"/wf/admin/shop/publish"})
        },
        saveReply(){
            if(this.reply===""){
                this.$message.warning("请填写回复信息")
                return
            }
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId"),
                id: this.replyId,
                shop_evaluate: this.reply
            }
            evaluationReply(data).then((res)=>{
                if(res.data.code===200){
                    that.getData(that.currentPage)
                    that.$message.success("回复成功")
                    that.replyVisible = false
                }else{
                    that.$message.error(res.data.msg+"600A0061");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0062');
            })
        },
        getData(currentPage,type){
            if(!/^\d{0,30}$/.test(this.trade_no)){
                this.$message.warning("请输入正确的订单编号")
            }
            this.currentPage = currentPage
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId"),
                page: this.currentPage,
                limit: this.pageSize,
                start_time: this.date!==''&&this.date!==null?this.date[0]:'',
                end_time: this.date!==''&&this.date!==null?this.date[1]:'',
                trade_no: this.trade_no!==''?this.trade_no:undefined,
                good_name: this.good_name!==''?this.good_name:undefined,
                star: this.star,
                state: this.state,
                score: this.service
            }
            if(type===2){
                this.searchLoading = true
            }
            evaluationGetData(data).then((res)=>{
                that.searchLoading = false
                if(res.data.code===200){
                    that.tableData = []
                    that.columns = []
                    for(let i=0;i<res.data.data.data.length;i++){
                        that.tableData.push([res.data.data.data[i]])
                        that.columns.push([
                            {
                                align: "left",
                                label: res.data.data.data[i].trade_no,
                                renderHeader:(h, param) => {
                                    return [h('el-button',{
                                        props: {
                                            type: "text"
                                        },
                                        on: {
                                            click: () => {
                                                let arr = param._self.tableData.map((item)=>{
                                                    if(item[0].trade_no===param.column.label){
                                                        return  item[0].order_id
                                                    }
                                                })
                                                window.open(this.$router.resolve({
                                                    path:'/wf/admin/shop/order/order_details',
                                                    query:{
                                                        id: parseInt(arr.join(""))
                                                    }
                                                }).href);
                                            }
                                        }
                                    },res.data.data.data[i].trade_no)]
                                },
                                render: (h, param)=> {
                                    let image = []
                                    for(let img=0;img<param.row.image.length;img++){
                                        image.push(
                                            h('img', {
                                                attrs: {
                                                    preview: parseInt(param.row.id*100+img),
                                                    style: param.row.image[img]===''?"display:none;":"width:80px;height:80px;border-radius:2px;margin-right:15px;",
                                                    src: param.row.image[img],
                                                }
                                            })
                                        )
                                    }
                                    let a
                                    a = [
                                        h('p', {
                                            attrs: {
                                                style: "font-size:14px;margin-bottom:10px;"
                                            }
                                        }, param.row.good_name),
                                        h('p', {
                                            attrs: {
                                                style: "font-size:14px;color:#999;margin-bottom:10px;"
                                            }
                                        }, param.row.good_spec),
                                        h('p', {
                                            attrs: {
                                                style: "color:#666;margin-bottom:10px;"
                                            }
                                        }, param.row.evaluate),
                                        h('div',image),
                                        
                                    ]
                                    return h('div',{
                                        attrs: {
                                            style: "text-align:left;margin-left:40px;"
                                        }
                                    }, a)
                                }
                            },
                            {
                                align: "center",
                                label: res.data.data.data[i].created_at
                            },
                            {
                                align: "center",
                                label: res.data.data.data[i].nickName+" "+res.data.data.data[i].phone
                            },
                            {
                                align: "center",
                                label: "",
                                render: (h, param)=> {
                                    return h('el-rate',{
                                        props: {
                                            value: param.row.star,
                                            disabled: true
                                        }
                                    })
                                }
                            },
                            {
                                align: "center",
                                label: "",
                                render: (h, param)=> {
                                    return h('el-button',{
                                        props: {
                                            type: "text"
                                        },
                                        on: {
                                            click: () => {
                                                this.reply = ""
                                                this.replyVisible = true
                                                this.replyId = param.row.id
                                            }
                                        }
                                    }, "回复")
                                }
                            }
                        ])
                    }
                    that.totalPage = res.data.data.total
                }else{
                    that.$message.error(res.data.msg+"600A0055");
                }
            }).catch((err)=>{
                that.searchLoading = false
                that.$message.error('网络错误600B0056');
            })
        },
        getGeneralize(){
            let that = this
            let data = {
                token: localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId")
            }
            evaluationGeneralize(data).then((res)=>{
                if(res.data.code===200){
                    that.praise = res.data.data.praise
                    that.score = parseFloat(res.data.data.score)
                    that.good_count = res.data.data.good_count
                    that.almost_count = res.data.data.almost_count
                    that.error = res.data.data.error
                    that.evaluation_num = res.data.data.good_count*100/100+res.data.data.almost_count*100/100+res.data.data.error*100/100
                }else{
                    that.$message.error(res.data.msg+"600A0053");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0054');
            })
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }){
            if(columnIndex===0){
                return [1,3]
            }else if (columnIndex===1||columnIndex===2) {
                return [0, 0];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-evaluation{
    .overview-box{
        height: 140px;
        border-radius:4px;
        background: #fff;
        color: #333;
        text-align: center;
        box-sizing: border-box;
        padding: 20px;
        .box-card{
            line-height: 40px;
        }
    }
    .el-button--primary{
        background: #719FF8;
    }
    .wf-blue{
        color: #719FF8;
    }
    .wf-red{
        color: #F87171;
    }
    .wf-bigger{
        font-size: 32px;
    }
    .el-rate{
        margin-top: 10px;
    }
    .list-box{
        margin-top: 20px;
        padding: 20px;
        background: #fff;
        border-radius:4px;
    }
    .type-title{
        width: 80px;
        display: inline-block;
    }
    /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        background: #fff;
        border-color: #719FF8;
        color: #719FF8;
    }
    /deep/ .el-radio-button--mini .el-radio-button__inner{
        padding: 9px 15px;
    }
    .filter-box>div{
        margin-bottom: 20px;
    }
    .el-radio-group{
        margin-right: 20px;
    }
    .wf-input-width{
        width: 160px;
        margin-right: 40px;
        margin-left: 20px;
    }
    /deep/ .father-table-head{
        thead{
            th{
                background: #eee;
            }
        }
        .el-table__body-wrapper{
            display: none;
        }
    }
    /deep/ .son-table-head{
        thead{
            th:first-child{
                padding-left: 40px;
            }
            th{
                background: #FAFAFA;
            }
        }
    }
    /deep/ .el-table{
        thead th{
            color: #333;
            font-weight: 500!important;
        }
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
        box-sizing: border-box;
    }
    /deep/ .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
    /deep/ .el-dialog__footer{
        text-align: center;
    }
    .reply-box{
        width: 100%;
        box-sizing: border-box;
        color: #666;
        padding: 20px 20px 20px 50px;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
}
</style>