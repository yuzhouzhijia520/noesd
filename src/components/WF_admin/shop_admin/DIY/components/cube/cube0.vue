<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-cube0">
        <el-row v-if="textShow===false" class="wf-cube0-row" >
            <el-col :span="12" v-for="(item,index) in list" :key="index"  :class="index%2===0?'wf-cube0-right':''" >
                <div class="wf-cube0-img" v-if="index<2">
                    <img :src="item.srcUrl" v-if="item.srcUrl" />
                </div>
            </el-col>
        </el-row>
        <el-row v-if="textShow" class="wf-cube0-tip">
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: '',
    props:{
        comProps:Array,
    },
    data() {
        return {
            list:[],
            textShow:true
        }
    },
    components: {

    },
    created(){
        
    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.comProps[0].item.forEach(element => {
                if(element.selectShow){
                    that.list=JSON.parse(JSON.stringify(element.item));
                }
            });
        });
    },
    methods: {

    },
    watch:{
        comProps:{
            immediate:true,
            handler(val,oldVal){
                let that=this;
                this.comProps[0].item.forEach(element => {
                    if(element.selectShow){
                        that.list=JSON.parse(JSON.stringify(element.item));
                        that.list.some((el,i)=>{
                            if(el.srcUrl){
                                that.textShow=false;
                                return true;
                            }
                        })
                    }
                });
            },
            deep:true
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-cube0{
    padding-left: 10.6px;
    padding-right: 10.6px;
    .wf-cube0-tip{
        margin: 0 -10.6px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background-color: rgb(237, 237, 237);
        height: 176px;
        /deep/ .el-col{
            width: 136px;
            height: 156px;
            background-color: #fff;
            margin: 10px;
            border-radius: 4px;
        }
    }
    .wf-cube0-row{
        text-align: center;
        .wf-cube0-img{
            img{
                width: 100%;
                border-radius: 4px;
                height: 182px;
            }
        }
        .el-col{
            .wf-cube0-img{
                height: 182px;
            }
        }
        .wf-cube0-right{
            padding-right: 3.4px;
        }
    }
}
</style>