<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-wfCardProps">
        <el-form  label-width="100px" >
            <el-form-item label="高度设置：">
                <el-radio-group v-model="radio" @change="handleChange">
                        <el-radio :label="3">小图</el-radio>
                        <el-radio :label="6">中图</el-radio>
                        <el-radio :label="9">大图</el-radio>
                        <el-radio :label="0">自定义</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="wf-slider" v-if="showDefault">
                 <!-- {{width}} -->
               <el-slider v-model="value" :format-tooltip="formatTooltip" @change="handleSilder"></el-slider>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { computeScaleP_M } from '@/untils/common.js'
export default {
    name: '',
    props:{
        comProps:Object,
        selComponentId:Number
    },
    data() {
        return {
            radio:0,
            value:parseInt(this.comProps.item.height)/667*100,
            showDefault:false,
            newComProps:{},
        }
    },
    components: {

    },
    computed:{

    },
    created(){
        //操作新对象,深度拷贝对象
        this.newComProps=JSON.parse(JSON.stringify(this.comProps));
        //初始化图片高度
        this.initHeight(0);
    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.newComProps=JSON.parse(JSON.stringify(that.comProps));
        });
    },
    methods: {
        formatTooltip(val){
            return (computeScaleP_M(val*667/100)).toFixed(2)+"px";
        },
        initHeight(val){
            if(val===0){
                if(this.radio===0){
                    this.radio=0;
                    this.showDefault=true;
                }
            }else if(val===1){
                if(this.newComProps.item.height==='151'){
                    this.showDefault=false;
                    this.radio=3;
                }else if(this.newComProps.item.height==='167'){
                    this.showDefault=false;
                    this.radio=6;
                }else if(this.newComProps.item.height==='199'){
                    this.showDefault=false;
                    this.radio=9;
                }else{
                    this.value=parseInt(this.newComProps.item.height)/667*100;
                    this.radio=0;
                    this.showDefault=true;
                }
            }
        },
        //图片高度设置
        handleChange(val){
            this.newComProps=JSON.parse(JSON.stringify(this.comProps));
            if(val===3){
                this.showDefault=false;
                this.newComProps.item.height='151';
            }else if(val===6){
                this.showDefault=false;
                this.newComProps.item.height='167';
            }else if(val===9){
                this.showDefault=false;
                this.newComProps.item.height='199';
            }else if(val===0){
                this.showDefault=true;
                this.newComProps.item.height=(this.value/100*667).toString();
            }
            this.value=parseInt(this.newComProps.item.height)/667*100;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        //图片滑动条改变事件处理
        handleSilder(val){
            this.newComProps=JSON.parse(JSON.stringify(this.comProps));
            this.newComProps.item.height=(val*667/100).toString();
            this.value=parseInt(this.newComProps.item.height)/667*100;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        }
    },
    watch:{
        comProps:{
            handler(val,oldVal){
                if(val.item.height!=oldVal.item.height){
                    this.newComProps=JSON.parse(JSON.stringify(this.comProps));
                    this.initHeight(1)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-wfCardProps{
    /deep/ .el-form{
        .el-form-item{
            margin-bottom: 0;
        }
        .wf-slider{
            width: 80%;
        }
    }
}
</style>