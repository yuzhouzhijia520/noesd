<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-heightLine">
        <el-form  label-width="100px" >
            <el-form-item label="高度设置：">
                <el-input-number v-model="value" :min="1" @change="handleSilder"></el-input-number><span class="wf-left">px</span>
                <el-slider v-model="value" @change="handleSilder"></el-slider>
            </el-form-item>
            <el-form-item label="背景颜色：">
                 <el-color-picker v-model="bgcolor"  @change="handleBgColor"></el-color-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: '',
    props:{
        comProps:Object,
        selComponentId:Number
    },
    data() {
        return {
            value:parseInt(this.comProps.item.height),
            bgcolor:this.comProps.item.bgcolor,
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
        this.initHeight();
    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.newComProps=JSON.parse(JSON.stringify(that.comProps));
        });
    },
    methods: {
        initHeight(){
            this.value=parseInt(this.newComProps.item.height);
        },
        //图片高度设置
        handleChange(val){
            this.newComProps.item.height=(this.value/100*50).toString();
            this.value=parseInt(this.newComProps.item.height);
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        //图片滑动条改变事件处理
        handleSilder(val){
            this.newComProps.item.height=val.toString();
            this.value=parseInt(this.newComProps.item.height);
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        //颜色设置
        handleBgColor(val){
            if(val===null){
                val='';
            }
            this.newComProps.item.bgcolor=val;
            this.bgcolor=this.newComProps.item.bgcolor;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
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
.wf-DIY-heightLine{
    /deep/ .el-form{
        .el-form-item{
            margin-bottom: 0;
        }
    }
    .wf-left{
        margin-left: 5px;
    }
}
</style>