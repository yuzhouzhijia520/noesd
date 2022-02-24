<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-cube4">
        <el-row v-if="textShow===false" class="wf-cube4-row" >
            <el-col  class="wf-cube4-top">
                <div class="wf-cube4-img" >
                    <img :src="list[0].srcUrl" v-if="list[0].srcUrl" />
                </div>
            </el-col>
            <el-col :span='12' class="wf-cube4-bottom first">
                 <div class="wf-cube4-img" >
                    <img :src="list[1].srcUrl" v-if="list[1].srcUrl" />
                </div>
            </el-col>
            <el-col :span='12' class="wf-cube4-bottom second">
                <div class="wf-cube4-img" >
                    <img :src="list[2].srcUrl" v-if="list[2].srcUrl" />
                </div>
            </el-col>
        </el-row>
        <el-row v-if="textShow" class="wf-cube4-tip">
            <el-row class="top">

            </el-row>
            <el-row class="bottom">
                <el-col :span="10">
                </el-col>
                <el-col :span="10">
                </el-col>
            </el-row>
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
.wf-DIY-cube4{
    padding-left: 10.6px;
    padding-right: 10.6px;
    .wf-cube4-tip{
        margin: 0 -10.6px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background-color: #ededed;
        height: 151px;
        /deep/ .top{
            width: 300px;
            height: 60px;
            background-color: #fff;
            margin: 10px 0 10px 10px;
            border-radius: 4px;
        }
        .bottom{
            /deep/ .el-col{
                width: 144px;
                height: 60px;
                background-color: #fff;
                border-radius: 4px;
                margin-left: 11px;
            }
        }
    }
    .wf-cube4-row{
        text-align: center;
        .wf-cube4-top{
            width: 298.67px;
            margin-right: 3.4px;
            .wf-cube4-img{
                img{
                    width: 100%;
                    border-radius: 4px;
                    height: 117.76px;
                }
            }
        }
        .wf-cube4-bottom{
            width:147px;
            height: 89px;
            .wf-cube4-img{
                img{
                    width: 100%;
                    border-radius: 4px;
                    height: 89px;
                }
            }
        }
        .first{
            margin-right: 3.4px;
        }
    }
}
</style>