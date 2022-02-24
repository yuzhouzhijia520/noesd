<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-setPageProps" >
        <div class="wf-DIY-setPageProps-top" >
            <el-row>
                <el-col :span="5" class="wf-setPageProps-right">
                    页面名称:
                </el-col> 
                <el-col :span="16">
                    <el-input size="mini" v-model="title" placeholder="请输入页面名称" @keyup.native="handleTitleInput"></el-input>
                </el-col>
            </el-row>
            <el-row class="wf-help wf-bottom">
                <el-col :span="6" :offset="5">
                    <span >作为小程序页面标题</span>
                </el-col>
            </el-row>
            <el-row class="wf-bottom">
                <el-col :span="5" class="wf-setPageProps-right">
                    标题栏文案颜色:
                </el-col> 
                <el-col :span="16">
                    <el-radio-group v-model="$store.state.setPageProps.props[0].item.textRadio" size="small" >
                        <el-radio :label="1" >黑色</el-radio>
                        <el-radio :label="2" >白色</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row class="wf-bottom">
                <el-col :span="5" class="wf-setPageProps-right">
                    标题栏背景色:
                </el-col> 
                <el-col :span="16">
                    <el-radio-group v-model="$store.state.setPageProps.props[0].item.bgradio" size="small" >
                        <el-row class="wf-default-color">
                            <el-radio :label="1">默认颜色</el-radio>
                        </el-row>
                        <el-row class="wf-my-color">
                            <el-col :span="12">
                                <el-radio  :label="2">自定义颜色</el-radio>
                            </el-col>
                            <el-col :span="12">
                                <el-color-picker v-model="$store.state.setPageProps.props[0].item.bgcolor" ></el-color-picker>
                            </el-col>
                        </el-row>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row class="wf-bottom">
                <el-col :span="5" class="wf-setPageProps-right">
                    页面背景色:
                </el-col> 
                <el-col :span="16">
                    <el-radio-group v-model="$store.state.setPageProps.props[0].item.bgPradio" size="small" >
                        <el-row class="wf-default-color">
                            <el-radio :label="1">默认颜色</el-radio>
                        </el-row>
                        <el-row class="wf-my-color">
                            <el-col :span="12">
                                <el-radio  :label="2">自定义颜色</el-radio>
                            </el-col>
                            <el-col :span="12">
                                <el-color-picker v-model="$store.state.setPageProps.props[0].item.bgPcolor" ></el-color-picker>
                            </el-col>
                        </el-row>
                    </el-radio-group>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { widthCheck } from "@/untils/common.js";
export default {
    name: '',
    props:{
        comProps:Object,
        selComponentId:Number
    },
    data() {
        return {
            title:this.$store.state.setPageProps.props[0].item.title?this.$store.state.setPageProps.props[0].item.title:'首页'
        }
    },
    components: {

    },
    computed:{

    },
    created(){
        
    },
    mounted(){
    },
    methods: {
        handleTitleInput(){
            this.title=widthCheck(this.title,15);
            this.$store.state.setPageProps.props[0].item.title=this.title;
        }
    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                this.title=val.item.title;   
                let pageProps=this.$store.state.setPageProps;
                pageProps.props[0].item.title=val.item.title;
                this.$store.commit({
                    type:'setPageProps',
                    setPageProps:pageProps
                });
            },
            deep:true
        }
    }
}

</script>


<style lang="scss" scoped>
.wf-DIY-setPageProps{
    text-align: left;
    .wf-help{
        text-align: left;
        span{
            color: #a7a7a7;
            font-size: 12px;
        }
    }
    .wf-bottom{
        margin-bottom: 15px;
        .wf-default-color{
            line-height: 38px;
        }
        .wf-my-color{
            min-width: 250px;
            line-height: 38px;
        }
    }
    /deep/ .el-color-picker__trigger{
        width: 62px;
        height: 26px;
        padding: 3px;
        .el-color-picker__color{
            .el-icon-close{
                display: none;
            }
        }
        .el-icon-arrow-down{
            display: none;
        }
    }
}
</style>