<template>
    <!-- class="wf-" 商品详情-->
    <div class="wf-DIY-elGoodsDetail">
        <!-- <el-button type="text" @click="toelGoodsDetail">商品详情</el-button> -->
        <el-dialog  :visible.sync="elGoodsDetail"
        :before-close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleClick"  >
                    <el-tab-pane :label="item.tabname" :name="item.name" v-for="(item,index) in tabList" :key="index">
                        <router-link tag="a" target="_blank" :to="{path:'/wf/admin/shop/newshop_list/newadd_goods'}">
                            <el-button  size="mini">新建</el-button>
                        </router-link>
                        <el-button @click="clearFilter"  size="mini">刷新</el-button>
                        <el-button @click="searchelGoodsList" style="float:right"  size="mini">搜索</el-button>
                        <el-input
                        v-model="search"
                         size="mini"
                        placeholder="搜索商品名称"/>
                        <el-table :data="gridData" border style="margin-top:15px;">
                            <el-table-column property="master_graph" label="活动图片" align="center" >
                                <template slot-scope="scope">
                                    <img  :src="scope.row.master_graph" alt="" style="width:20px;height:20px;">
                                </template>
                            </el-table-column>
                            <el-table-column property="good_name" label="商品名称" align="center" ></el-table-column>
                            <el-table-column property="concessional_rate" label="单价（元）" align="center"></el-table-column>
                            <el-table-column property="create_time" label="创建时间" align="center"></el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                align="center" 
                            >
                                <template slot-scope="scope">
                                    <el-button @click="handleClicks(scope.row)" type="text" size="small" >选择</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        
                    </el-tab-pane>
            </el-tabs>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-count='Number(pagecount)'
                :current-page='Number(currentpage)'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
                
            <!-- <el-button @click="delelGoodsList">取 消</el-button> -->
            <div class="close">
                <el-button  @click="qelGoodsList"  size="mini">关闭</el-button>
            </div>
                
            </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            pathUrl:'',//路径
            activeName: 'first',
            allmultipleSelection:[],
            marketing_id:'1',//下拉选中选项所返回的id
            elGoodsDetail:false,//dilog关闭开启
             gridData:[],//表格数据
             pagecount:'',//总页数,
             page:1,//第几页
             pagesize:5,
             alltotal:'',//总条数,
             currentpage:1,//当期页数
            tabList:[//表格呗的nav
                {
                    tabname:'全部商品',
                    name:'first'
                },
                 {
                    tabname:'推荐商品',
                    name:'second'

                }
            ],
            search:'',//搜索的内容
            selectId:''//选中的id
        }
    },
    components: {

    },
    created(){
    },
    mounted(){
        this.toelGoodsDetail();
    },
    methods: {
        toelGoodsDetail(){//打开dilog
            let that = this
            this.elGoodsDetail =true
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
                 if(res.data.code == 200){
                     that.pathUrl = res.data.data.path
                     that.gridData = res.data.data.info
                     if(res.data.data.num === 0){
                          that.pagecount = 1
                     }else{
                        that.pagecount =  Math.ceil(Number(res.data.data.num) / that.pagesize)

                     }
                     that.alltotal = Number(res.data.data.num) 
                 }

             })
        },
        searchelGoodsList(){//搜索
        let that = this
             this.$axios({
                 url:this.url + 'shopapi/shop_decoration/shopMarketing',
                 method:'post',
                 data:{
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.page,
                    good_name_keyword:that.search,
                    sale:1
                 }
             }).then(res=>{
                 console.log(res.data.data)
                 if(res.data.code == 200){
                     that.gridData = res.data.data.info
                      if(res.data.data.num === 0){
                          that.pagecount = 1
                     }else{
                        that.pagecount =  Math.ceil(Number(res.data.data.num) / that.pagesize)

                     }
                     that.alltotal = Number(res.data.data.num) 
                 }

             })
        },
        handleClicks(val){//选择按钮
            this.selectId = val.id;
            let path ='';
            if(this.pathUrl){
                if(this.pathUrl.includes('?')){
                    path = this.pathUrl + "&id=" + val.id;
                }else{
                    path = this.pathUrl + "?id=" + val.id;
                }
            }
            this.$emit('geturl',path,val.good_name,false,val)
            this.elGoodsDetail = false;
            this.$message({
                type: 'success',
                message: '选择成功!'
            });
        },
        handleClick(tab, event) {
            let that = this;
            this.$axios({
                 url:this.url + 'shopapi/shop_decoration/shopMarketing',
                 method:'post',
                 data:{
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.page,
                    recommend:tab.index
                 }
             }).then(res=>{
                 if(res.data.code == 200){
                     that.gridData = res.data.data.info;
                     if(res.data.data.num === 0){
                          that.pagecount = 1;
                     }else{
                        that.pagecount =  Math.ceil(Number(res.data.data.num) / that.pagesize);

                     }
                     that.alltotal = Number(res.data.data.num);
                 }

             })
        },
      handleSizeChange(val) {

      },
      qelGoodsList(){//确认按钮
            this.elGoodsDetail =false
            this.$emit('geturl','',false)
      },
      handleClose(){
          this.$emit('geturl','',false)
      },
      delelGoodsList(){
          this.elGoodsDetail =false
      },
      handleCurrentChange(val) {//分页
      let that =this
      that.currentpage = val
           this.$axios({
                 url:this.url + 'shopapi/shop_decoration/shopMarketing',
                 method:'post',
                 data:{
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:val,
                 }
             }).then(res=>{
                 console.log(res.data.data)
                 if(res.data.code == 200){
                     that.gridData = res.data.data.info
                      if(res.data.data.num === 0){
                          that.pagecount = 1
                     }else{
                        that.pagecount =  Math.ceil(Number(res.data.data.num) / that.pagesize)

                     }
                     that.alltotal = Number(res.data.data.num) 
                 }

             })
        },
        clearFilter(){//刷新页面
            let that = this
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
                 console.log(res.data.data)
                 
                 if(res.data.code == 200){
                     that.$message({
                        message: '刷新成功',
                        type: 'success'
                    });
                     that.gridData = res.data.data.info
                     if(res.data.data.num === 0){
                          that.pagecount = 1
                     }else{
                        that.pagecount =  Math.ceil(Number(res.data.data.num) / that.pagesize)

                     }
                     that.alltotal = Number(res.data.data.num) 
                 }

             })
      }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-elGoodsDetail{
    
    .el-input{
        width: 200px;
        float: right;
    }
    .el-pagination{
        text-align: center;
        margin-top: 15px;
    }
    .is-active{
        font-size: 16px;
    }
    .close{
        text-align: center;margin:0 auto;
        margin-top: 15px;
    }
   
}
</style>