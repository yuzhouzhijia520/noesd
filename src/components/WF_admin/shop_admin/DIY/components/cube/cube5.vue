<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-cube5">
        <el-row v-if="textShow===false" class="wf-cube5-row" >
             <el-col  class="wf-cube5-left">
                <div class="wf-cube5-img" >
                    <img :src="list[0].srcUrl" v-if="list[0].srcUrl" />
                </div>
            </el-col>
            <el-col  class="wf-cube5-right">
                <el-col  class="wf-cube5-top">
                    <div class="wf-cube5-img" >
                        <img :src="list[1].srcUrl" v-if="list[1].srcUrl" />
                    </div>
                </el-col>
                <el-col :span='12' class="wf-cube5-bottom first">
                    <div class="wf-cube5-img" >
                        <img :src="list[2].srcUrl" v-if="list[2].srcUrl" />
                    </div>
                </el-col>
                <el-col :span='12' class="wf-cube5-bottom second">
                    <div class="wf-cube5-img" >
                        <img :src="list[3].srcUrl" v-if="list[3].srcUrl" />
                    </div>
                </el-col>
            </el-col>
        </el-row>
        <el-row v-if="textShow" class="wf-cube5-tip">
            <el-row class="Outside">
                <el-col :span="12" class="left"></el-col>
                <el-col :span="12" class="right">
                    <el-row>
                        <el-col :span="10" class="InsideTop"></el-col>
                    </el-row>
                    <el-row class="InsideBottom">
                        <el-col :span="10"></el-col>
                        <el-col :span="10"></el-col>
                    </el-row>
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
.wf-DIY-cube5{
    padding-left: 10.6px;
    padding-right: 10.6px;
    .wf-cube5-tip{
        margin: 0 -10.6px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background-color: #ededed;
        height: 160px;
        .Outside{
            /deep/ .left{
                width: 143px;
                height: 140px;
                background-color: #fff;
                margin: 10px 0 10px 10px;
                border-radius: 4px;
            }
            /deep/ .InsideTop{
                width: 152px;
                height: 64px;
                background-color: #fff;
                margin-top: 11px;
                border-radius: 4px;
            }
            /deep/ .InsideBottom{
                .el-col{
                    width: 70px;
                    height: 64px;
                    background-color: #fff;
                    margin-top: 10px;
                    border-radius: 4px;
                    margin-right: 10px;
                }
            }
        }
    }
    .wf-cube5-row{
        text-align: center;
        .wf-cube5-left{
            width: 147px;
            margin-right: 4.8px;
            .wf-cube5-img{
                height: 182px;
                img{
                    width: 100%;
                    border-radius: 4px;
                    height: 182px;
                }
            }
        }
        .wf-cube5-right{
            width: 147px;
            .wf-cube5-top{
                margin-right: 3.4px;
                .wf-cube5-img{
                    img{
                        width: 100%;
                        border-radius: 4px;
                        height: 89px;
                    }
                }
            }
            .wf-cube5-bottom{
                width:70px;
                height: 89px;
                .wf-cube5-img{
                    img{
                        width: 100%;
                        border-radius: 4px;
                        height: 89px;
                    }
                }
            }
            .first{
                margin-right: 5.4px;
            }
        }
    }
}
</style>