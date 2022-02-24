<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-bargain">
        <component :is="component" :comProps="comProps"></component>
    </div>
</template>

<script>
import bargain0 from './bargain0.vue'; //
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
        bargain0,
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