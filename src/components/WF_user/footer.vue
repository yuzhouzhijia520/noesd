<template>
    <div id="user_footer">
        <div class="copy_box">
            <div class="copy" v-if="this.$store.state.oemFlag">
                {{this.$store.state.serverList.data.copyright}}
            </div>
            <div class="copy" v-else>
                ©2016 — 2019 版权所有 万帆集团旗下,拾久商城 杭州万帆集团 浙ICP备16031604号-4
            </div>
        </div>
    </div>
</template>
<script >
export default {
  name: 'footer',
  data () {
      return {
        
      }

  },
  created: function () {
  },
  methods:{

  }
}
</script>

<style lang="scss">
  
/* footer */
#user_footer{
    background: #eeeeee;
    color: #fff;
    position: fixed;
    bottom: 0;
    z-index:100;
    width:100%;
    .copy_box{
        width: 1220px;
        margin: 0 auto;
    }
    .copy{
        width: 100%;
        background: #eeeeee;
        text-align: center;
        color: #999999;
        font-size: 14px;
    }
}
</style>
