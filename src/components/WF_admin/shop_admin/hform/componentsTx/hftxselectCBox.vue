<template>
    <!-- class="wf-" -->
    <div class="hftxselectCBox">
        <el-row v-for="(item,index) in comProps.option" :key="index">
            <i class="el-icon-check" v-if="answer.includes(item.id)"></i>{{item.content}}
            <pre v-if="item.state===1">{{comProps.answer_prompts}}</pre>
        </el-row>
    </div>
</template>

<script>
export default {
    name: '',
    props:{
        comProps:Object
    },
    data() {
        return {
            answer:[]
        }
    },
    components: {

    },
    created(){

    },
    mounted(){
        this.answer=this.comProps.answer.split(',');
        this.answer=Array.from(this.answer,x=>parseInt(x));
    },
    methods: {

    }
}
</script>


<style lang="scss" scoped>
.hftxselectCBox{
    padding-left: 25px;
    .el-icon-check{
        margin-left: -20px;
        margin-right: 6px;
        font-weight: 900;
    }
}
</style>