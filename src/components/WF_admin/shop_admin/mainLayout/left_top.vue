<template>
    <div class="small_box">
        <div class="card-panel">
            <div class="icon-people">
                <img class="user_img"  v-if="this.$store.state.oemFlag&&this.$store.state.imageUrl===''" :src="this.$store.state.serverList.data.logo" alt="">
                <img class="user_img" v-else :src="this.$store.state.imageUrl" alt="">
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">{{this.$store.state.proName}}</div>
              <span class="card-panel-span">
                <el-tag type="success" v-if="this.$store.state.publishStatus==='已上线'" size="small">{{this.$store.state.publishStatus}}</el-tag>
                <el-tag type="info" v-else size="small">{{this.$store.state.publishStatus}}</el-tag>
              </span>
              <span class="app_status">
                <el-tag type="info" size="small">
                {{this.$store.state.proVersion}}
                </el-tag>
              </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    created(){
    },
    mounted(){
      this.$store.dispatch('loadData')
    },
    methods:{
    }
}
</script>

<style lang="scss">
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.small_box {
  .card-panel {
    font-size: 12px;
    padding: 60px 0;
    text-align: center;
    color: #f8f8f8;
    .card-panel-text{
      margin: 12px 0 24px 0;
      font-size: 18px;
      font-weight:400;
      overflow-wrap: break-word;
      padding: 0 5px;
    }
    .card-panel-span{
      margin-right: 12px;
    }
    .el-tag--info{
      color: #f8f8f8;
      border-color: #f8f8f8;
    }
    .user_img{
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
  }
}
</style>