<template>
  <!-- class="wf-" 营销活动详情 完成-->
  <div class="wf-DIY-elMarketingDetail">
    <!-- <el-button type="text" @click="getelMarktingDetail">营销活动详情</el-button> -->
    <el-dialog :visible.sync="dialogelMarktingDetail"
     :before-close="handleClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.marketing_name"
          :name="(item.id).toString()"
          :path="item.path"
          :paths="item.marketing_path"
          v-for="(item,index) in tabList"
          :key="index"
        >
          <router-link tag="a" target="_blank" :to="{path:pathurls}">
            <el-button size="mini">新建</el-button>
          </router-link>
          <el-button @click="clearFilter" size="mini">刷新</el-button>
          <el-button @click="searchelGoodsList" style="float:right" size="mini">搜索</el-button>
          <el-input v-model="search" size="mini" placeholder="搜索活动名称"/>
        </el-tab-pane>
      </el-tabs>
      <el-table :data="gridData" border style="margin-top:15px;">
        <el-table-column property="master_graph" label="活动图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.master_graph" alt style="width: 25px;height: 25px">
          </template>
        </el-table-column>
        <el-table-column property="activity_name" label="活动名称" align="center"></el-table-column>
        <el-table-column property="start_time" label="创建时间" align="center"></el-table-column>
        <el-table-column property="end_time" label="结束时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClicks(scope.row)" type="text" size="small" >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="Number(pagecount)"
        :current-page="Number(currentpage)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <div class="close">
        <!-- <el-button @click="dialogelMarktingDetail = false">取 消</el-button> -->
        <el-button @click="qudialogelMarktingDetail"  size="mini">关闭</el-button>
      </div>
    </el-dialog>
    <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
  </div>
</template>

<script>
import { getAuditApplicationList } from '@/server/common';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
export default {
  name: "",
  data() {
    return {
      marketing_id: 5,
      search: "",
      pagecount: "", //总页数,
      page: 1, //第几页
      pagesize: 5,
      alltotal: "", //总条数,
      currentpage: 1, //当期页数
      activeName: "1",
      marketing_nameid: "",
      dialogelMarktingDetail: false,
      gridData: [],
      tabList: [],
      selectId: "", //选择的商品id,
      pathurl: "", //路有链接,page
      pathurls: "", //wf
      showVersion:false, //控制版本提示
    };
  },
  components: {
     versionCom
  },
  created() {},
  mounted() {
    this.getelMarktingDetail();
  },
  methods: {
    qudialogelMarktingDetail() {
      //确认按钮
      let that = this;
      this.dialogelMarktingDetail = false;
      this.$emit('geturl','',false)
    },
    handleCloseVersion(){
        this.showVersion=false;
    },
    handleClose(){
          this.$emit('geturl','',false)
      },
    handleClicks(val) {
      let that=this;
      if(this.activeName==='11'){
          /**
           * @param 33是砸金蛋对应超级后台管理序号
           */
          getAuditApplicationList(33).then((res)=>{
              if(res.data.code==200){
                  if(res.data.data){
                       //选择按钮
                      that.selectId = val.id;
                      let path ='';
                      if(that.pathurl.includes('?')){
                        path = that.pathurl + "&id=" + val.id;
                      }else{
                        path = that.pathurl + "?id=" + val.id;
                      }
                      that.$emit("geturl", path,val.activity_name,false,val);
                      that.$message({
                        type: "success",
                        message: "选择成功!"
                      });
                      that.dialogelMarktingDetail = false;
                  }else{
                      that.showVersion=true;
                       return false;
                  }
              }else{
                  that.$message.error(res.data.msg);
              }
          }).catch((item)=>{
              that.$message.error(res.data.msg);
          });
      }else{
        //选择按钮
        this.selectId = val.id;
        let path ='';
        if(this.pathurl.includes('?')){
          path = this.pathurl + "&id=" + val.id;
        }else{
          path = this.pathurl + "?id=" + val.id;
        }
        this.$emit("geturl", path,val.activity_name,false,val);
        this.$message({
          type: "success",
          message: "选择成功!"
        });
        this.dialogelMarktingDetail = false;
      }
     
    },
    searchelGoodsList() {
      //搜索
      let that = this;
      this.$axios({
        url: this.url + "shopapi/shop_decoration/marketingInfo",
        method: "post",
        data: {
          token: localStorage.getItem("userId"),
          secret: localStorage.getItem("secretId"),
          marketing_id: that.marketing_nameid,
          num: 5,
          page: that.page,
          activity_name: that.search
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.gridData = res.data.data.data;
          if (res.data.data.total === 0) {
            that.pagecount = 1;
          } else {
            that.pagecount = res.data.data.last_page;
          }
        }
      });
    },
    getelMarktingDetail() {
        //获取数据类表
        let that = this;
        this.selectId = "";
        this.dialogelMarktingDetail = true;
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
            console.log(res.data.data);
            if (res.data.code == 200) {
            that.tabList = res.data.data;
            for (var i = 0; i < res.data.data.length; i++) {
                that.pathurl = res.data.data[0].path;
                that.pathurls = res.data.data[0].marketing_path;
            }
            console.log(that.pathurl);
            let marketing_name = "";
            let marketing_nameid = "";
            for (var i = 0; i < res.data.data.length; i++) {
                marketing_name = res.data.data[0].marketing_name;
                marketing_nameid = res.data.data[0].id;
                that.marketing_nameid = marketing_nameid;
            }
            this.$axios({
                url: this.url + "shopapi/shop_decoration/marketingInfo",
                method: "post",
                data: {
                token: localStorage.getItem("userId"),
                secret: localStorage.getItem("secretId"),
                marketing_id: marketing_nameid,
                num: 5,
                page: that.page
                }
            }).then(res => {
                console.log(res.data);
                if (res.data.code == 200) {
                that.gridData = res.data.data.data;
                if (res.data.data.total === 0) {
                    that.pagecount = 1;
                } else {
                    that.pagecount = res.data.data.last_page;
                }
                }
            });
            }
        });
    },

    clearFilter() {
      //刷新
      let that = this;
      this.$axios({
        url: this.url + "shopapi/shop_decoration/marketingInfo",
        method: "post",
        data: {
          token: localStorage.getItem("userId"),
          secret: localStorage.getItem("secretId"),
          marketing_id: that.marketing_nameid,
          num: 5,
          page: that.page
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.$message({
            message: "刷新成功",
            type: "success"
          });
          that.gridData = res.data.data.data;
          if (res.data.data.total === 0) {
            that.pagecount = 1;
          } else {
            that.pagecount = res.data.data.last_page;
          }
        }
      });
    },
    handleClick(tab, event) {
      //点击切花nav
      let that = this;
      console.log(tab);
      this.pathurl = tab.$attrs.path;
      this.pathurls = tab.$attrs.paths;
      that.marketing_nameid = tab.name;
      this.$axios({
        url: this.url + "shopapi/shop_decoration/marketingInfo",
        method: "post",
        data: {
          token: localStorage.getItem("userId"),
          secret: localStorage.getItem("secretId"),
          marketing_id: tab.name,
          num: 5,
          page: that.page
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.gridData = res.data.data.data;
          if (res.data.data.total === 0) {
            that.pagecount = 1;
          } else {
            that.pagecount = res.data.data.last_page;
          }
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //分页
      let that = this;
      this.$axios({
        url: this.url + "shopapi/shop_decoration/marketingInfo",
        method: "post",
        data: {
          token: localStorage.getItem("userId"),
          secret: localStorage.getItem("secretId"),
          marketing_id: that.marketing_nameid,
          page: val,
          num: 5
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          that.gridData = res.data.data.data;
          if (res.data.data.total === 0) {
            that.pagecount = 1;
          } else {
            that.pagecount = res.data.data.last_page;
          }
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.wf-DIY-elMarketingDetail {
    
  .el-input {
    width: 200px;
    float: right;
  }
  .el-pagination {
    text-align: center;
    margin-top: 15px;
  }

  .is-active {
    font-size: 16px;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .close {
    text-align: center;
    margin: 0 auto;
    margin-top: 15px;
  }
}
</style>