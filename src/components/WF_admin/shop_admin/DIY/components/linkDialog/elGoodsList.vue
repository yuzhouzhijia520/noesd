<template>
  <!-- class="wf-" 商品列表-->
  <div class="wf-DIY-elGoodsList">
    <!-- <el-button type="text" @click="toelGoodsList">商品列表</el-button> -->
    <el-dialog :visible.sync="dialogelGoodsList"
     :before-close="handleClose">
      <el-tabs v-model="activeName">
        <el-tab-pane
          :label="item.tabname"
          :name="item.name"
          v-for="(item,index) in tabList"
          :key="index"
        >
          <router-link
            tag="a"
            target="_blank"
            :to="{path:'/wf/admin/shop/class_management'}"
          >
            <el-button size="mini">新建</el-button>
          </router-link>
          <el-button @click="clearFilter" size="mini">刷新</el-button>
          <el-table :data="gridData" border style="margin-top:15px;">
              <el-table-column property="type_img" label="商品二级分类图片" align="center">
              <template slot-scope="scope" style="padding:0;">
                <img :src="scope.row.type_img" alt style="width: 30px;height: 30px">
              </template>
            </el-table-column>
            <el-table-column property="type_name" label="商品二级分类" align="center"></el-table-column>
            <el-table-column property="parent_img" label="商品一级分类图片" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.parent_img" alt style="width: 30px;height: 30px">
              </template>
            </el-table-column>
            <el-table-column property="parent_name" label="商品一级分类名称" align="center"></el-table-column>
            
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small" >选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :current-page="Number(currentpage)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="alltotal"
        :page-size="pageSize"
      ></el-pagination> -->
      <el-pagination
                :current-page="currentpage"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next,jumper"
                :total="alltotal"
                :page-size="5">
                </el-pagination>
      <!-- <el-button @click="dialogelGoodsList = false">取 消</el-button> -->
      <div class="close">
        <el-button @click="quelGoodsList"  size="mini">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      marketing_id: 2,
      dialogelGoodsList: false,
      page: 1,
      pagecount: "", //总页数,
      page: 1, //第几页
      alltotal: 0, //总条数,
      currentpage: 1, //当期页数
      gridData: [],
      tabList: [
        {
          tabname: "商品列表",
          name: "first"
        }
      ],
      search: "",
      selectLength: 0,
      tabname: "",
      elGoodsListId: "", //选中的id,
      pathurl: ""
    };
  },
  components: {},
  created() {},
  mounted() {
    this.toelGoodsList();
  },
  methods: {
    quelGoodsList() {
        //确定按钮
        this.dialogelGoodsList = false;
        this.$emit('geturl','',false)
    },
        handleClose(){
            this.$emit('geturl','',false)
        },
    handleClick(val) {
        //选择按钮
        this.elGoodsListId = val.id;
        let path ='';
        if(this.pathurl.includes('?')){
          path = this.pathurl + "&id=" + this.elGoodsListId;
        }else{
          path = this.pathurl + "?id=" + this.elGoodsListId;
        }
        this.$emit("geturl", path,val.parent_name+'/'+val.type_name,false,val);
        this.$message({
            type: "success",
            message: "选择成功!"
        });
        this.dialogelGoodsList = false;
    },
    toelGoodsList() {
        //获取数据列表
        let that = this;
        this.elGoodsListId = "";
        this.dialogelGoodsList = true;
        this.$axios({
            url: this.url + "shopapi/shop_decoration/shopMarketing",
            method: "post",
            data: {
            token: localStorage.getItem("userId"),
            secret: localStorage.getItem("secretId"),
            id: this.marketing_id,
            page: this.page
            }
        }).then(res => {
            console.log(res.data.data.path);
            let arr = [];
            if (res.data.code == 200) {
              this.pathurl = res.data.data.path;
              for (let i in res.data.data.data) {
                  arr.push(res.data.data.data[i]);
              }
              that.gridData = arr;
              if(res.data.data.count === 0){
                      that.pagecount = 1
              }else{
                  that.pagecount =res.data.data.last_page
              }
              that.alltotal = parseInt(res.data.data.total)
            }
        });
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let that = this
        this.$axios({
            url: this.url + "shopapi/shop_decoration/shopMarketing",
            method: "post",
            data: {
            token: localStorage.getItem("userId"),
            secret: localStorage.getItem("secretId"),
            id: this.marketing_id,
            page: val
            }
        }).then(res => {
            console.log(res.data.data.path);
            let arr = [];
            if (res.data.code == 200) {
              this.pathurl = res.data.data.path;
              for (let i in res.data.data.data) {
                  arr.push(res.data.data.data[i]);
              }
              that.gridData = arr;
              if(res.data.data.count === 0){
                      that.pagecount = 1
              }else{
                  that.pagecount =res.data.data.last_page
              }
              that.alltotal = parseInt(res.data.data.total);

            }
        });
    },
    clearFilter() {
        //刷新
        let that = this;
        this.$axios({
            url: this.url + "shopapi/shop_decoration/shopMarketing",
            method: "post",
            data: {
            token: localStorage.getItem("userId"),
            secret: localStorage.getItem("secretId"),
            id: this.marketing_id,
            page: this.page
            }
        }).then(res => {
            console.log(res.data);
            let arr = [];
            if (res.data.code == 200) {
            this.$message({
                message: "刷新成功",
                type: "success"
            });
            for (let i in res.data.data.data) {
                arr.push(res.data.data.data[i]);
            }
            that.gridData = arr;
            that.pagecount = 1;
            //  if(res.data.data.count === 0){
            //       that.pagecount = 1
            //  }else{
            //     that.pagecount =  Math.ceil(Number(res.data.data.count) / that.pagesize)
            //  }
            //  that.alltotal = Number(res.data.data.count)
            }
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.wf-DIY-elGoodsList {
    
  .el-input {
    width: 300px;
    float: right;
    height: 48px;
    line-height: 48px;
  }
  .el-pagination {
    text-align: center;
    margin-top: 15px;
  }

  .is-active {
    font-size: 16px;
  }
  .close {
    text-align: center;
    margin: 0 auto;
    margin-top: 15px;
  }
}
</style>