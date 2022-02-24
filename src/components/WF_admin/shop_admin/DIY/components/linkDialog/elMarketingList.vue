<template>
  <!-- class="wf-"营销活动列表完成 -->
  <div class="wf-DIY-elMarketingList">
    <!-- <el-button type="text" @click="getellist">营销活动类表</el-button> -->
    <el-dialog title="营销活动列表" :visible.sync="dialogelMarkting"
     :before-close="handleClose">
      <el-table :data="gridData">
        <el-table-column property="marketing_name" label="营销活动列表" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="close">
        <!-- <el-button @click="dialogelMarkting = false">取 消</el-button> -->
        <el-button @click="qudialogelMarkting"  size="mini">关闭</el-button>
      </div>
    </el-dialog>
    <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
  </div>
</template>

<script>
import { getAuditApplicationList } from '@/server/common';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
export default {
  name: "elMarketingList",
  data() {
    return {
      marketing_id: 4, //下拉分类
      dialogelMarkting: false,
      gridData: [], //数据回填列表
      selectId: "", //选中的id,
      pathurl: "", //路劲
      showVersion:false, //控制版本提示
    };
  },
  components: {
    versionCom
  },
  created() {},
  mounted() {
    this.getellist();
  },
  methods: {
    getellist() {
      //获取类表数据
      let that = this;
      this.dialogelMarkting = true;
      this.$axios({
        url: this.url + "shopapi/shop_decoration/shopMarketing",
        method: "post",
        data: {
          token: localStorage.getItem("userId"),
          secret: localStorage.getItem("secretId"),
          id: this.marketing_id
        }
      }).then(res => {
        if (res.data.code == 200) {
          that.gridData = res.data.data;
        }
      });
    },
    async handleClick(val) {
        //选择按钮获取到相应的id
        let that = this;
        if(val.id===9){
          /**
           * @param 10是新闻专题列表对应超级后台管理序号
           */
          getAuditApplicationList(10).then((res)=>{
              if(res.data.code==200){
                  if(res.data.data){
                      that.handleVersion(val);
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
        }else if(val.id===10){
          /**
           * @param 32是活动列表签到对应超级后台管理序号
           */
          getAuditApplicationList(32).then((res)=>{
              if(res.data.code==200){
                  if(res.data.data){
                      that.handleVersion(val);
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
          this.handleVersion(val);
        }
      
    },
    handleCloseVersion(){
        this.showVersion=false;
    },
    handleVersion(val){
        this.selectId = val.id;
        this.pathurl = val.path;
        let path ='';
        /**
         * id===8 处理分享有惠
         */
        if(this.pathurl.includes('?')){
          if(val.id!=8){
            path = this.pathurl + "&id=" + val.id;
          }else{
            path=this.pathurl;
          }
        }else{
          if(val.id!=8){
            path = this.pathurl + "?id=" + val.id;
          }else{
            path=this.pathurl;
          }
        }
        this.$emit("geturl", path,val.marketing_name,false,val);
        this.$message({
          type: "success",
          message: "选择成功!"
        });
        this.dialogelMarkting = false;
    },
    qudialogelMarkting() {
        //点击确定按钮
        let that = this;
        that.dialogelMarkting = false;
        this.$emit('geturl','',false)
    },
    handleClose(){
          this.$emit('geturl','',false)
      },
  }
};
</script>


<style lang="scss" scoped>
.wf-DIY-elMarketingList {
  
  .close {
    text-align: center;
    margin: 0 auto;
    margin-top: 15px;
  }
}
</style>