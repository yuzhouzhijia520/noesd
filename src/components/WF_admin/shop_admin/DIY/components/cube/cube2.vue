<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-cube2">
        <el-row v-if="textShow===false" class="wf-cube2-row" >
            <el-col :span="6" v-for="(item,index) in list" :key="index"  >
                <div class="wf-cube2-img" >
                    <img :src="item.srcUrl" v-if="item.srcUrl" />
                </div>
            </el-col>
        </el-row>
        <el-row v-if="textShow" class="wf-cube2-tip">
            <el-col :span="4"></el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4"></el-col>
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
.wf-DIY-cube2{
    padding-left: 10.6px;
    padding-right: 10.6px;
    .wf-cube2-tip{
        margin: 0 -10.6px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background-color: #ededed;
        height: 77px;
        /deep/ .el-col{
            width: 60px;
            height: 60px;
            background-color: #fff;
            margin: 10px;
            border-radius: 4px;
        }
    }
    .wf-cube2-row{
        text-align: center;
        .wf-cube2-img{
            img{
                width: 100%;
                border-radius: 4px;
                height: 102.4px;
            }
        }
        .el-col{
            margin-right: 3.4px;
            width:72.1px;
            &:last-child{
                margin-right:0;
            }
            .wf-cube2-img{
                height: 102.4px;
            }
        }
    }
}
</style>