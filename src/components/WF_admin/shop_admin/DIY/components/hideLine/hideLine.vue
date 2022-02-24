<template>
    <div class="wf-DIY-hideLine" :style="styleSet">
        
    </div>
</template>

<script>
import { computeScaleM_P } from '@/untils/common.js'
export default {
    name: '',
    props:{
        comProps:Array,
    },
    data() {
        return {
            newComProps:{},
        }
    },
    components: {

    },
    computed:{
        styleSet:function() {
            let nameHeight='height:'+computeScaleM_P(this.newComProps[0].item.height/2)+'px;';
            let nameBgColor='background-color:'+this.newComProps[0].item.bgcolor+';';
            return  nameHeight + nameBgColor;
        }
    },
    created(){
    },
    mounted(){
        
    },
    methods: {

    },
    watch:{
        comProps:{
            immediate:true,//初始值执行handler的函数
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps));
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-hideLine{
    min-height: 0 !important;
}
</style>