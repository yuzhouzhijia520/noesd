<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-imageLabel" :style="{height:newHeight}">
        <img :src="comProps[0].item.srcUrl"/>
    </div>
</template>

<script>
export default {
    name: '',
    props:{
        comProps:Array
    },
    data() {
        return {
            newHeight:this.comProps[1].item.height+'px',
        }
    },
    components: {

    },
    created(){
    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.newHeight=val[1].item.height+'px';
        });
    },
    methods: {

    }
}

</script>


<style lang="scss" scoped>
.wf-DIY-imageLabel{
    img{
        width: 100%;
        height: 100%;
    }
}
</style>