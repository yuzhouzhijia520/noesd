<template><!--图文导航-->
    <!-- class="wf-" -->
    <div class="wf-DIY-navigation0">
        <el-row>
            <el-col :span="5"  class="navigation-list" v-for="(item,index) in navigation" :key="index" align="center">
                <img :src="item.srcUrl" alt="" class="navigation-list-img">
                <div class="navigation-list-txt">{{item.goodsName}}</div>
            </el-col>
       </el-row>
    </div>
</template>

<script>

export default {
    name: 'navigation',
    props:{
        comProps:Array,
    },
    data() {
        return {
             navigation:[]
        }
    },
    components: {
        
    },
    created(){

    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.comProps[0].item.forEach(element => {
                if(element.selectShow){
                    that.navigation=JSON.parse(JSON.stringify(element.item));
                }
            });
        });
    },
    methods: {
       
    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                let that=this;
                this.comProps[0].item.forEach(element => {
                    if(element.selectShow){
                        that.navigation=JSON.parse(JSON.stringify(element.item));
                    }
                });
            },
            deep:true
        }
    }
}
</script>


<style lang="scss" scoped>
    .wf-DIY-navigation0{
        padding: 10px 0;
        .navigation-list{
            margin-left: 10px;
            min-height: 75px;
            .navigation-list-img{
                width: 40px;
                height: 40px;
                margin-top: 8px;
                // background: red;
            }
            .navigation-list-txt{
                width: 56px;
                text-align: center;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2;
                word-break:break-all;
                font-size: 12px;
                overflow: hidden;
                margin-top: 5px;
            }
        }
    }
</style>