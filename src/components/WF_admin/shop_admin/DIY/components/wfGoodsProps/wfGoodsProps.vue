<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-wfGoodsProps">
        <el-form  label-width="120px" v-if="flagShow">
            <el-form-item label="显示内容：">
                <el-checkbox v-model="newComProps.item.goodsName" label="商品名称" name="selectShow" @change="handleChangeGoodsName"></el-checkbox>
                <el-checkbox v-model="newComProps.item.goodsPrice" label="商品价格" name="selectShow" @change="handleChangeGoodsPrice"></el-checkbox>
            </el-form-item>
        </el-form>
        <div v-else class="wf-bottom">无需设置</div>
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
            newComProps:this.comProps,
            flagShow:true
        }
    },
    components: {

    },
    created(){
        //操作新对象,深度拷贝对象
        this.newComProps=JSON.parse(JSON.stringify(this.comProps));
        if(this.selComponentId!=0){
            this.flagShow=false
        }else{
            this.flagShow=true
        }
        
    },
    mounted(){
        // let that=this;
        // this.$watch('comProps',function (val){
        //     this.newComProps=JSON.parse(JSON.stringify(this.comProps));
        // });
      
    },
    methods: {
        handleChangeGoodsName(val){
            this.newComProps.item.goodsName=val;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        handleChangeGoodsPrice(val){
            this.newComProps.item.goodsPrice=val;
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        }
    },
     watch:{
        selComponentId:{
            handler(val,oldVal){
                if(this.selComponentId!=0){
                    this.flagShow=false
                }else{
                    this.flagShow=true
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-wfGoodsProps{
    .wf-bottom{
        color:#ccc;
    }
}
</style>