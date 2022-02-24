<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-assemble">
        <component :is="component" :comProps="comProps"></component>
    </div>
</template>

<script>
import assemble0 from './assemble0.vue'; //
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
        assemble0,
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
                if(this.comProps.length>0){
                    this.comProps[0].item.some((item,i)=>{
                        if(item.selectShow){
                            this.component=item.parentComponent;
                        }
                    })
                }
            },
            deep:true
        },
    }
}
</script>


<style lang="scss" scoped>
</style>