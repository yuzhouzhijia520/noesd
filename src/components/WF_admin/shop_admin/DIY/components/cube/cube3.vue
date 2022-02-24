<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-cube3">
        <el-row v-if="textShow===false"  class="wf-cube3-row" >
            <el-col  class="wf-cube3-left">
                <div class="wf-cube3-img" >
                    <img :src="list[0].srcUrl" v-if="list[0].srcUrl" />
                </div>
            </el-col>
            <el-col  class="wf-cube3-right">
                <el-row>
                     <div class="wf-cube3-img" >
                        <img :src="list[1].srcUrl" v-if="list[1].srcUrl" />
                    </div>
                </el-row>
                <el-row>
                     <div class="wf-cube3-img" >
                        <img :src="list[2].srcUrl" v-if="list[2].srcUrl" />
                    </div>
                </el-row>
               
            </el-col>
        </el-row>
        <el-row v-if="textShow" class="wf-cube3-tip">
            <el-row class="Outside">
                <el-col :span="12" class="left"></el-col>
                <el-col :span="12" class="right">
                    <el-row class="Inside">
                        <el-col :span="12"></el-col>
                        <el-col :span="12"></el-col>
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
.wf-DIY-cube3{
    padding-left: 10.6px;
    padding-right: 10.6px;
    .wf-cube3-tip{
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
            .Inside{
                /deep/ .el-col{
                    width: 152px;
                    height: 64px;
                    background-color: #fff;
                    margin-top: 11px;
                    border-radius: 4px;
                }
            }
        }
        
    }
    .wf-cube3-row{
        text-align: center;
        .wf-cube3-left{
            width:147px;
            height: 182px;
            margin-right: 3.4px;
            .wf-cube3-img{
                img{
                    width: 100%;
                    border-radius: 4px;
                    height: 182px;
                }
            }
        }
        .wf-cube3-right{
            width:147px;
            height: 182px;
            .wf-cube3-img{
                img{
                    width: 100%;
                    border-radius: 4px;
                    height: 89px;
                }
            }
        }
    }
}
</style>