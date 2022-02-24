<template>
    <div class="wf_index_login">
        <div id="nav_fixed">
            <nav class="clear" style="margin:0 auto;">
                <div class="clear nav_left">
                    <img v-if="this.$store.state.oemFlag" :src="this.$store.state.serverList.data.word_logo" @click="index">
                    <img v-else src="../../../assets/index_img/WF_Logo.png" @click="index">
                </div>     
            </nav>
        </div>
    </div>
</template>

<script>

export default {
    name: '',
    data () {
        return {
        }
    },
    mounted(){
        if(this.$store.state.oemFlag){
            this.$store.dispatch('loadData');
        }else{
            window.document.title='万帆集团';
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = this.url+'favicon.ico';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    },
    methods: {
        index(){
            // this.$router.push({path:'/',name:'index'})
            window.open(this.locUrl);
        }
    }
}
</script>

<style lang="scss">
// 头部
  nav{
      width:1220px;
      height:72px;
      margin:0 auto;
  }

  nav .nav_left{
      padding-top:15px;
  }
  nav .nav_left img{
        display:block;
        cursor:pointer;
        margin-top: 5px;
        max-height: 33px;
        max-width: 182px;
  }
</style>