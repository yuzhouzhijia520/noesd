<template>
    <div id="grouporder">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="4" style="margin-right: 25px;">
                <el-input size="small" placeholder="输入团长" v-model="seach_input" @keyup.enter.native="seach"></el-input></el-col>
            <el-col :span="4"  size="small" class="pay_time">付款时间</el-col>
            <el-col :span="6">
                <el-date-picker
                v-model="value4"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                 size="small"
                @change="gettime"
                :picker-options="pickerOptions">
                </el-date-picker>
            </el-col>
            <el-col :span="6" style="margin-left:100px">
                <el-button size="small" type="primary" @click="seach" :loading="loadingSearch">搜索</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="(item,index) in status_list"
                :key="index"
                :label="item.label"
                :name="item.name">
                </el-tab-pane>
            </el-tabs>
        </el-row>
        <el-table
                :data="tableData"
                style="width: 100%;"
                >
            <el-table-column
                label="商品图片"
                prop="master_graph"
                width="200"
                >
                <template slot-scope="scope">            
                    <img :src="scope.row.master_graph" class="wf-grouporder-img"  preview="0"/>
                </template>  
                </el-table-column>
                <el-table-column
                label="商品名称"
                prop="group_name">
                </el-table-column>
                <el-table-column
                label="状态"
                prop="group_state">
                </el-table-column>
                <el-table-column
                label="团长"
                prop="nickName">
                </el-table-column>
                <el-table-column
                label="当前人数"
                prop="member">
                </el-table-column>
                <el-table-column
                label="发起时间"
                prop="create_time"
                width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
             
                    
            </el-table>

        <el-pagination
        layout="prev, pager, next, jumper, total"
        :total="total"
        :current-page="getPage"
        :pageCount="pageCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size='pageSize'>
        </el-pagination>
        <!--查看详情列表开始-->
        <el-dialog title="查看详情" :visible.sync="dialogTableVisible" center >
              <el-table
                ref="multipleTable"
                :data="tabledetail"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="订单编号"
                prop="trade_no">
                </el-table-column>
                <el-table-column
                label="下单客户"
                >
                <template slot-scope="scope">
                     <div class="span_list">
                    {{scope.row.nickName}}

                     </div>
                     <div class="span_list">
                    {{scope.row.phone}}

                     </div>
                </template>
                </el-table-column>
                 <el-table-column
                prop="collection_name"
                label="收货人信息"
                >
                 <template slot-scope="scope">
                    <div class="span_list">
                    {{scope.row.collection_name}}
                    </div>
                    <div class="span_list">
                    {{scope.row.collection_phone}}
                    </div>
                    <div class="span_list">
                    {{scope.row.collection_address}}
                    </div>
                </template>
                </el-table-column>
                 <el-table-column
                prop="total_price"
                label="总金额"
                >
                </el-table-column>
                 <el-table-column
                prop="create_time"
                label="下单时间"
                >
                </el-table-column>
                 <el-table-column
                prop="group_state"
                label="状态"
                >
                </el-table-column>-
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        v-if="scope.row.status !=='申请退款'"
                        @click="wantrefund(scope.row)">查看</el-button>
                        <el-button
                        size="mini"
                        v-if="scope.row.status==='申请退款'"
                        @click="allprice(scope.row.id)" :loading='loading'>订单退款</el-button>
                    </template>
                </el-table-column>
                
            </el-table>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totall"
                    :pageCount="pageCountl"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChangel"
                    :page-size='pageSize'
                    :current-page="page"
                    v-if="this.total > 10"
                    >
                </el-pagination>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false"  v-if="this.groupstatus === '2'">确 定</el-button>
                <el-button type="primary" @click="allreft" v-if="this.groupstatus === '1'"> 订单退款</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import tablelist from "@/commonComponents/table/table";
// import Viewer from 'viewerjs';
export default {
    name: 'shop_grouporder',
    data() {
      return {
        loading:false,
        loadingSearch:false,
        istablist:false,
        dialogTableVisible:false,//开启弹窗
        value4: [],//选择时间
        pickerOptions: {
            disabledDate: (time) => {
                return time.getTime() > Date.now();//减去一天的时间代表可以选择同一天;
            },
            shortcuts: [
            {
                text: '最近一天',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }]
        },
        status_list: [//团购订单切换列表头
            {
                id: -1,
                label: '全部',
                name: 'state=-1',
            },
            {
                id: 1,
                label: '拼团中',
                name: 'state=0',
            },
            {
                id: 2,
                label: '拼团成功',
                name: 'state=1',
            },
            {
                id: 3,
                label: '拼团失败',
                name: 'state=2',
            }
        ],
        tableData:[],//团购订单列表扶植
        tabledetail:[],//列表详情赋值
        activeName: 'state=-1',//全部，团购失败等状态
        getPage: 1,
        pageSize: 10,//每页显示条数
        page:1,
        total:0,
        pageCount: 1,
        totall:0,
        pageCountl: 1,
        list_id:'',
        state: '-1',//全部，团购失败等状态
        seach_input:'',//搜索的条件
        currentPage:1,
         multipleSelection: [],//选中,
         start_time:'',//开始时间
         end_time:'',//结束时间,
         groupstatus:''//退款订单状态判断申请退款按钮,1显示蓝色的退款按钮2：不显示
      };
    },

    created: function(){
       let that = this
            that.$axios.post(this.url +'shopapi/group_order/groupIndex',{
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                limit:10,
                page:this.page,
                state: this.state,
                keyword:this.seach_input,
                start_time:this.start_time,
                end_time:this.end_time
            })
              .then(function (response) {
                if(response.data.code ===200){
                    if(response.data.data.total > 0){
                         that.pageCount = response.data.data.last_page
                        that.total  = response.data.data.total

                    }else{
                         that.pageCount = 1
                    }
                    that.tableData = response.data.data.data
                }
              })
              .catch(function (error) {
              });
    },
    components: {
        tablelist
      },
    methods: {
        //获取团购订单列表方法
        getgroup(){
            let that = this
            that.$axios.post(this.url +'shopapi/group_order/groupIndex',{
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                limit:10,
                page:this.page,
                state: this.state,
                keyword:this.seach_input,
                start_time:this.start_time,
                end_time:this.end_time
            })
              .then(function (response) {
                if(response.data.code ===200){
                    if(response.data.data.total > 0){
                        that.pageCount = response.data.data.last_page
                        that.total  = response.data.data.total
                        
                    }else{
                         that.pageCount = 1
                         that.total = 1
                    }
                   
                    that.tableData = response.data.data.data
                }
                
              })
              .catch(function (error) {
              });
        },
         handleSizeChange(val) {//切换分页数据
        // console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {//切换分页数据
            let that = this
            this.getPage = val
            that.$axios.post(this.url +'shopapi/group_order/groupIndex',{
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                limit:10,
                page:val,
                state: this.state
            })
              .then(function (response) {
                if(response.data.code ===200){
                    if(response.data.data.total > 0){
                         that.pageCount = response.data.data.last_page
                        that.total  = response.data.data.total

                    }else{
                         that.pageCount = 1
                    }
                   
                    that.tableData = response.data.data.data
                }
                
              })
              .catch(function (error) {
              });
          },
           handleCurrentChangel(val) {//切换详情分页数据
            let that = this
            that.$axios.post(this.url +'shopapi/group_order/groupOrderDetail',{
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                list_id:this.list_id,
                limit:10,
                page:val,
                state: this.state
            })
              .then(function (response) {
                if(response.data.code ===200){
                    if(response.data.data.total > 0){
                         that.pageCountl = response.data.data.last_page
                        that.totall  = response.data.data.total

                    }else{
                         that.pageCountl = 1
                    }
                    that.tabledetail = response.data.data.data
                    for(var i = 0;i<that.tabledetail.length;i++){
                        if(that.tabledetail[i].status === '申请退款'){
                            this.groupstatus === '1'//显示蓝色退款按钮
                        }else{
                            this.groupstatus === '2'//不显示蓝色退款按钮
                        }
                    }
                }
                
              })
              .catch(function (error) {
              });
          },
        handleClick(tab) {//获取切换的全部，团购失败等
            let arr = tab.name.split('=')
            this.state = arr[1]
            this.getgroup()
        },
        seach(){//查询
            let that = this
            this.loadingSearch=true;
            this.getPage = 1
            that.$axios.post(this.url +'shopapi/group_order/groupIndex',{
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                limit:10,
                page:1,
                state: this.state,
                keyword:this.seach_input,
                start_time:this.start_time,
                end_time:this.end_time
            })
              .then(function (response) {
                that.loadingSearch=false;
                if(response.data.code ===200){
                    if(response.data.data.total > 0){
                        that.pageCount = response.data.data.last_page
                        that.total  = response.data.data.total
                    }else{
                         that.pageCount = 1
                         that.total  =1
                    }
                    that.tableData = response.data.data.data
                }
              })
              .catch(function (error) {
                   that.loadingSearch=false;
              });
        },
       handleEdit(row){//查看团购订单详情
           let that = this
            that.$axios.post(this.url +'shopapi/group_order/groupOrderDetail',{
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId'),
                list_id:row.id,
                limit:10,
                page:this.page,
                state: this.state
            })
              .then(function (response) {
                if(response.data.code ===200){
                    that.dialogTableVisible=!that.dialogTableVisible
                    if(response.data.data.total > 0){
                         that.pageCountl = response.data.data.last_page
                        that.totall  = response.data.data.total
                        that.list_id=row.id
                    }else{
                        that.pageCountl =1
                            that.totall =1

                    }
                    that.tabledetail = response.data.data.data
                     for(var i = 0;i<that.tabledetail.length;i++){
                        if(that.tabledetail[i].status === '申请退款'){
                            that.groupstatus = '1'//显示蓝色退款按钮
                        }else{
                            that.groupstatus = '2'//不显示蓝色退款按钮
                        }
                    }
                    // that.zone_state = response.data.data.zone_state
                    
                }
                
              })
              .catch(function (error) {
              });
       },
        handleSelectionChange(val) {//多数据退款选中
            // console.log(val)
            var list=[];
            for(var i = 0;i<val.length ;i++){
                list.push(val[i].id);
            }
            this.multipleSelection=list;
            // console.log(this.multipleSelection)
      },
      gettime(){
         var stare_time = this.value4[0]
         var end_time = this.value4[1]
         var date = stare_time;  
         var end_time = end_time
         var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' ;
         var date_valuel=end_time.getFullYear() + '-' + (end_time.getMonth() + 1) + '-' + end_time.getDate() + ' ' ;
         this.start_time = date_value,
         this.end_time = date_valuel
      },
    allreft(){//退款
        if(this.multipleSelection.length === 0){
            this.$message({
                message: '请选择数据'
            });
        }else{
             this.$confirm('即将退款, 是否继续?', '退款提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    
                    for(var i =0;i<this.multipleSelection.length;i++){
                        this.allprice(this.multipleSelection[i])
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            
        }
    },
    allprice(id){//多个用户的退款方法
        let that = this
        this.loading = true
        that.$axios.post(this.url +'shopapi/order/update',{
            token:localStorage.getItem('userId'),
            secret:localStorage.getItem('secretId'),
            id:id
        })
        .then(function (res) {
            that.loading = false
            if(res.data.code === 1){
                that.$message({
                    message: '退款成功',
                    type: 'success'
                });
                that.dialogTableVisible = false
            }else{
                that.$message('退款失败，请检查商户号及退款证书并确保商户号余额充足!');
            }
        })
        .catch(function (error) {
            that.loading = false
        });
    },
    wantrefund(row){//查看团购订单详情列表跳转订单详情页
        this.$router.push({
                path:'/wf/admin/shop/grouporder/order_details_group',
                query: { 
                    id:row.id
                }
            })
    }
    }
}
</script>

<style lang="scss" scoped>
#grouporder{
    background-color: #fff;
    padding: 20px;
    .wf-grouporder-img{
        max-width: 40px;
        max-height: 40px;
    }
    .el-pagination{
        background: white;
        text-align: center;
        padding: 20px 0;
    }
    .cell{
        text-align: center;
    }
    .pay_time{
        width:100px;
        height: 44px;
        line-height: 30px;
    }
    .span_list{
        width:100%;
        text-align: center;

    }
}
</style>
