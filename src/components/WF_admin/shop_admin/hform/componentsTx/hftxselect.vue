<template>
    <!-- class="wf-" -->
    <div class="hftxselect">
        <el-row v-for="(item,index) in comProps.option" :key="index">
            <i class="el-icon-check" v-if="item.id==comProps.answer"></i>{{item.content}}
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
        }
    },
    components: {

    },
    created(){

    },
    mounted(){
    },
    methods: {

    }
}
</script>


<style lang="scss" scoped>
.hftxselect{
    padding-left: 25px;
    .el-icon-check{
        margin-left: -20px;
        margin-right: 6px;
        font-weight: 900;
    }
}
</style>