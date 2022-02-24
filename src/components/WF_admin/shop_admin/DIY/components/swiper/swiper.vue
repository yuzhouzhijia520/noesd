<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-wfCarousel">
        <!-- <swiper :options="swiperOption" ref="mySwiper" :style="{height:newHeight}" v-model="list">
            <swiper-slide  v-for="(item,index) in list" :key="index">
                <img :src="item.srcUrl" v-if="item.srcUrl"/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper> -->
        <el-carousel trigger="click" ref="mySwiper" :style="{height:newHeight}"  v-model="list">
            <el-carousel-item v-for="(item,index) in list" :key="index">
                 <img :src="item.srcUrl"  v-if="item.srcUrl"/>
            </el-carousel-item>
        </el-carousel>
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
            list:[],
            newHeight:this.comProps[1].item.height+'px',
        }
    },
    components: {
        
    },
    computed: {
    },
    created(){
    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.newHeight=val[1].item.height+'px';
            that.list=JSON.parse(JSON.stringify(that.comProps[0].item));
        })
    },
    methods: {
    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                // let that=this;
                this.list=JSON.parse(JSON.stringify(this.comProps[0].item));   
                // this.$nextTick(()=>{
                //     that.list=JSON.parse(JSON.stringify(that.comProps[0].item)); 
                //     // that.swiper();    
                // });
            },
            deep:true
        }
    }
}
</script>


<style lang="scss" scoped>

    .wf-DIY-wfCarousel{

        /deep/ .el-carousel__container{
            width: 100%;
            height: 100%;
            .el-carousel__item{
                    img{
                        height: 100%;
                        width: 100%;
                    }
            }
        }
        /deep/ .el-carousel__indicators{
            .el-carousel__indicator{
                .el-carousel__button{
                    height: 8px;
                    display: inline-block;
                    border-radius: 100%;
                    background: #000;
                    opacity: 0.2;
                    width: 8px;
                    cursor: pointer;
                }
            }
            .el-carousel__indicator.is-active{
                .el-carousel__button{
                    opacity: 1;
                    background: rgb(233, 71, 60);
                }
            }
        }
    }
</style>