<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-cube">
        <component :is="component" :comProps="comProps"></component>
    </div>
</template>

<script>
import cube0 from './cube0.vue'; //
import cube1 from './cube1.vue'; //
import cube2 from './cube2.vue'; //
import cube3 from './cube3.vue'; //
import cube4 from './cube4.vue'; //
import cube5 from './cube5.vue'; //
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
        cube0,
        cube1,
        cube2,
        cube3,
        cube4,
        cube5
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