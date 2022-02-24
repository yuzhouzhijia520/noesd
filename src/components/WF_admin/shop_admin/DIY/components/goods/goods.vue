<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-goods">
        <component :is="component" :comProps="comProps"></component>
    </div>
</template>

<script>
import goods0 from './goods0.vue'; //
import goods1 from './goods1.vue'; //
import goods2 from './goods2.vue'; //
import goods3 from './goods3.vue'; //
export default {
    name: '',
    props:{
        comProps:Array,
    },
    data() {
        return {
            component:'',
        }
    },
    components: {
        goods0,
        goods1,
        goods2,
        goods3,
    },
    created(){
        
    },
    mounted(){

    },
    methods: {

    },
    watch:{
        comProps:{
            immediate:true,//
            handler(val,oldVal){
                this.comProps[0].item.some((item,i)=>{
                    if(item.selectShow){
                        this.component=item.parentComponent;
                    }
                })
            },
            deep:true
        },
    }
}
</script>


<style lang="scss" scoped>
</style>