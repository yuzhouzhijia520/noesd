<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-cube1">
        <el-row v-if="textShow===false" class="wf-cube1-row" >
            <el-col :span="8" v-for="(item,index) in list" :key="index"  :class="(index+1)%3!=0?'wf-cube1-right':''">
                <div class="wf-cube1-img" v-if="index<3">
                    <img :src="item.srcUrl" v-if="item.srcUrl" />
                </div>
            </el-col>
        </el-row>
        <el-row v-if="textShow" class="wf-cube1-tip">
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
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
.wf-DIY-cube1{
    padding-left: 10.6px;
    padding-right: 10.6px;
    .wf-cube1-tip{
        margin: 0 -10.6px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background-color: rgb(237, 237, 237);
        height: 107px;
        /deep/ .el-col{
            width: 90px;
            height: 90px;
            background-color: #fff;
            margin: 8px;
            border-radius: 4px;
        }
    }
    .wf-cube1-row{
        text-align: center;
        .wf-cube1-img{
            img{
                width: 100%;
                border-radius: 4px;
                height: 128px;
            }
        }
        .el-col{
            width:97.28px;
            &:last-child{
                margin-right:0;
            }
            .wf-cube1-img{
                height: 128px;
            }
        }
        .wf-cube1-right{
            margin-right: 3.4px;
        }
    }
}
</style>