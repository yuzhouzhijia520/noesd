<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-setPageProps" >
        <div class="wf-DIY-setPageProps-top" >
            <el-row  class="wf-bottom">
                <el-col :span="5" class="wf-setPageProps-right">
                    公告内容:
                </el-col> 
                <el-col :span="16">
                    <el-input size="mini"  v-model="content" placeholder="请输入公告内容" @keyup.native="handleTitleInput"></el-input>
                </el-col>
            </el-row>
            <el-row class="wf-bottom">
                <el-col :span="5" class="wf-setPageProps-right">
                    公告文案颜色:
                </el-col> 
                <el-col :span="16">
                    <el-radio-group v-model="newComProps.item.fontcolor" size="small" @change="handleElFontColor">
                        <el-radio :label="1" >白色</el-radio>
                        <el-radio :label="2" >黑色</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row class="wf-bottom">
                <el-col :span="5" class="wf-setPageProps-right">
                    公告背景色:
                </el-col> 
                <el-col :span="16">
                    <el-radio-group v-model="newComProps.item.radio" size="small" @change="handleChangeRadio">
                        <el-row class="wf-default-color">
                            <el-radio :label="1">推荐颜色:</el-radio>
                            <el-row class="wf-sy-color">
                                 <el-radio-group v-model="newComProps.item.radio1" @change="selectColor">
                                    <el-radio-button :label="1" class="wf-radio1">
                                        <span class="wf-box"></span>
                                    </el-radio-button>
                                    <el-radio-button :label="2" class="wf-radio2">
                                        <span class="wf-box"></span>
                                    </el-radio-button>
                                    <el-radio-button :label="3" class="wf-radio3">
                                        <span class="wf-box"></span>
                                    </el-radio-button>
                                </el-radio-group>
                            </el-row>
                        </el-row>
                        <el-row class="wf-my-color">
                            <el-col :span="12">
                                <el-radio  :label="2">自定义颜色</el-radio>
                            </el-col>
                            <el-col :span="12">
                                <el-color-picker v-model="newComProps.item.bgcolor" @change="handlebgcolor" ></el-color-picker>
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
            newComProps:{},
            content:'',
            // elfontColor:1,
            // radio:1,
            // radio1:1,
            // bgcolor:'#ccc'
        }
    },
    components: {

    },
    computed:{

    },
    created(){

    },
    mounted(){
        let that=this;
        debugger
        this.$watch('comProps',function (val){
            debugger
            this.newComProps=JSON.parse(JSON.stringify(this.comProps));
        });
    },
    methods: {
        handleTitleInput(){
            this.content=widthCheck(this.content,64);
            this.newComProps.item.content=this.content;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        handleElFontColor(val){
            // this.elfontColor=val;
            this.newComProps.item.fontcolor=val;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        handleChangeRadio(val){
            // this.radio=val;
            this.newComProps.item.radio=val;
            debugger
            if(val===1){
                this.newComProps.item.bgcolor='';
            }else if(val===2){
                this.newComProps.item.radio1=0;
            }
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        selectColor(val){
            // this.radio1=val;
            this.newComProps.item.radio1=val;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        handlebgcolor(val){
            // this.bgcolor=val;
            this.newComProps.item.bgcolor=val;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        }
    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps));
                this.newComProps.item.fontcolor=parseInt(this.newComProps.item.fontcolor);
                this.content=this.newComProps.item.content;
                // handleTitleInput();
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
    .wf-default-color{
        .wf-sy-color{
        display: flex;
        /deep/ .el-radio-group{
            margin-left: 20px;
            margin-bottom: 20px;
                .el-radio-button__inner{
                    margin-right: 20px;
                }
                .el-radio__label{
                    width: 50px;
                    height: 20px;
                    padding: 2px 30px 2px 30px;
                    border-radius: 2px;
                    margin-left: 8px;
                }
                .wf-radio1{
                    .el-radio-button__inner{
                        background-color: #faa827;
                        border-color: #faa827;
                        border-radius: 2px;
                    }
                }
                .wf-radio2{
                    .el-radio-button__inner{
                        background-color: #e9473c;
                        border-color: #e9473c;
                        border-radius: 2px;
                    }
                }
                .wf-radio3{
                    .el-radio-button__inner{
                        background-color: #454545;
                        border-color: #454545;
                        border-radius: 2px;
                    }
                }
                .is-active{
                    .el-radio-button__inner{
                      border:1px dashed rgb(39, 121, 230); 
                    } 
                }
            }
        }
    }
}
</style>