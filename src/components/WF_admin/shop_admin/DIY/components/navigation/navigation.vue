<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-navigation">
        <component :is="component" :comProps="comProps"></component>
    </div>
</template>

<script>
import navigation0 from './navigation0.vue'; //
import navigation1 from './navigation1.vue'; //
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
        navigation0,
        navigation1
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
                if(Object.prototype.toString.call(this.comProps[0].item)==='[object Array]'){
                    this.comProps[0].item.some((item,i)=>{
                        if(item.selectShow){
                            this.component=item.parentComponent;
                            return true;
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
.wf-DIY-navigation{
    background-color: #fff;
}
</style>