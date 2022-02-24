<template>
    <!-- class="wf-" 优惠券-->
    <div class="wf-DIY-elCoupon">
            <!-- <el-button type="text" @click="getelCoupon">优惠券</el-button> -->
        <el-dialog  :visible.sync="dialogcoupon">
            <el-tabs v-model="activeName" @tab-click="handleClick"  >
                    <el-tab-pane :label="item.tabname" :name="item.name" v-for="(item,index) in tabList" :key="index">
                        <el-button @click="resetDateFilter">新建</el-button>
                        <el-button @click="clearFilter">刷新</el-button>
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="搜索活动名称"/>
                        <el-table :data="gridData" border style="margin-top:50px;">
                            <el-table-column property="address" label="优惠券名称" align="center" ></el-table-column>
                            <el-table-column property="address" label="有效期至" align="center" ></el-table-column>
                            <el-table-column property="name" label="库存" align="center" ></el-table-column>
                            <el-table-column property="name" label="每人限领" align="center" ></el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                align="center" 
                            >
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">参与赠送</el-button>
                                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">已参与</el-button>
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">不支持</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-tab-pane>
            </el-tabs>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="100"
                 @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogcoupon = false">取 消</el-button>
                <el-button type="primary" @click="dialogcoupon = false">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            activeName: 'first',
            dialogcoupon:false,
            marketing_id:3,
            page:1,
             pagecount:'',//总页数,
             page:1,//第几页
             pagesize:5,
             alltotal:'',//总条数,
             currentpage:1,//当期页数
             gridData: [],
            tabList:[
                 {
                    tabname:'优惠券',
                    name:'first',
                },
            ],
            multipleSelection:[],
            search:'',
            selectLength:0,
            tabname:''
        }
    },
    components: {

    },
    created(){
        
    },
    mounted(){
        this.getelCoupon();
    },
    methods: {
        getelCoupon(){
            let that = this
            this.dialogcoupon = true
            this.$axios({
                 url:this.url + 'shopapi/shop_decoration/shopMarketing',
                 method:'post',
                 data:{
                     token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.page
                 }
             }).then(res=>{
                 console.log(res)
                 if(res.data.code == 200){
                     that.gridData = res.data.data
                     if(res.data.data.num === 0){
                          that.pagecount = 1
                     }else{
                        that.pagecount =  Math.ceil(Number(res.data.data.num) / that.pagesize)

                     }
                     that.alltotal = Number(res.data.data.num) 
                 }

             })
        },
        handleClick(tab, event) {
            console.log(tab.name)
            this.tabname = tab.name
        },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSelectionChange(val) {
        console.log(val.length)
        this.multipleSelection = val;
        this.selectLength = val.length
      },
      resetDateFilter(){},
      clearFilter(){}
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-elCoupon{
    .el-input{
        width: 300px;
        float: right;
        height: 48px;
        line-height: 48px;
        
    }
    .el-pagination{
        text-align: center;
        margin-top: 50px;
    }
    
    .is-active{
        font-size: 16px;
    }
}
</style>