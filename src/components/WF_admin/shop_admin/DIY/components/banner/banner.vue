<template>
    <!-- class="wf-" 标题-->
    <div class="wf-DIY-banner">
        <el-row v-model="newComProps">
            <div class="wf-banner" :style="'background:url(' + newComProps.background+') 0% 0% / 100% 100%;'">
                <div class="wf-DIY-banner-left">{{newComProps.title}}</div>
                <div class="wf-DIY-banner-right" v-show="newComProps.checked === true">
                    <span class="wf-DIY-banner-right-span">查看更多</span>
                    <img src="@/assets/admin_img/shop_admin_img/right.png" alt="" class="wf-DIY-banner-right-img">
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    name: '',
    props:{
        comProps:Array,
    },
    data() {
        return {
            newComProps:{}
        }
    },
    components: {

    },
    created(){
        this.newComProps=JSON.parse(JSON.stringify(this.comProps[0].item));
    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.newComProps=JSON.parse(JSON.stringify(that.comProps[0].item));
        });
    },
    methods: {
        
    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps[0].item));
            },
            deep:true
        }
    }
}

</script>


<style lang="scss" scoped>
.wf-DIY-banner{
    .wf-banner{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        padding: 0 25px;
        .wf-DIY-banner-left{
            color: #000;
            font-size: 16px;
        }
        .wf-DIY-banner-right{
            display: flex;
            align-items: center;
            justify-content: space-around;
            .wf-DIY-banner-right-span{
                font-size: 10px;
                color: #9a9a9a;
            }
            .wf-DIY-banner-right-img{
                width: 7px;
                height: 10px;
                margin-left: 10px;
            }
        }
    }
}
</style>