<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-goods2 clean">
        <el-row v-for="(item,index) in list" :key="index" :class="index>1?'wf-goods-row  lines':'wf-goods-row'">
            <el-col :span="24" >
                <el-row class="wf-goods-img">
                    <span class="wf-text-left" v-if="item.advance_sale===1">预售</span>
                    <img :src="item.master_graph" v-if="item.master_graph"/>
                </el-row>
                <el-row class="bottom">
                    <div class="wf-goods-name">
                        {{item.good_name}}
                    </div>
                    <div class="wf-goods-price" >
                        <el-row>
                            <el-col :span="12" class="wf-newPrice">
                                ￥{{item.concessional_rate}}
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
            </el-col>
        </el-row>
         <el-row v-if="list.length===0" class="wf-goods-tip">
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
            newHeight:this.comProps[1].item.height+'px',
        }
    },
    components: {

    },
    created(){
        
    },
    mounted(){
        let that=this;
        this.$watch('comProps',function (val){
            that.newHeight=val[1].item.height+'px';
            that.comProps[0].item.forEach(element => {
                if(element.selectShow){
                    that.list=JSON.parse(JSON.stringify(element.props));
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
                this.newHeight=val[1].item.height+'px';
                this.comProps[0].item.forEach(element => {
                    if(element.selectShow){
                        that.list=JSON.parse(JSON.stringify(element.props));
                    }
                });
            },
            deep:true
        }
    }
}
</script>


<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.clean{
    clear: both;
}
.wf-DIY-goods2{
     @include clearfix;
     padding: 0 5px 0 5px;
     .wf-goods-tip{
        margin: -5px -5px 0 -5px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
        background-color: rgb(237, 237, 237);
        height: 176px;
        /deep/ .el-col{
            width: 140px;
            height: 156px;
            background-color: #fff;
            margin: 10px;
            border-radius: 4px;
        }
    }
    .wf-goods-row{
        // text-align: center;
        float: left;
        width: 145px;
        margin: 10px 4px;
        .bottom{
            background-color: #fff;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            font-size: 12px;
            padding: 8px;
        }
        .wf-goods-img{
           width: 145px;
            height: 145px;
            img{
                width: 145px;
                height: 145px;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
            }
            .wf-text-left{
                float: left;
                width: 30px;
                background-color: #e9473c;
                position: absolute;
                color: #fff;
                border-bottom-right-radius: 4px;
                padding: 2px;
                font-size: 12px;
                text-align: center;
            }
        }
        .wf-goods-name{
            text-align: left;
            // padding: 0 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
            height: 32px;
            margin-top: 10px;
        }
        .wf-goods-price{
            // padding: 10px 16px;
            width: 137px;
            margin-top: 10px;
            .wf-newPrice{
                color:rgb(233, 71, 60);
                text-align: left;
            }
            .wf-price{
                text-decoration:line-through;
                color:rgb(184, 184, 184);
                text-align: left;

            }   
        }
        .wf-goods-price-double{
            width: 145px;
            margin-top: 10px;
            .wf-newPrice{
                color:rgb(233, 71, 60);
                text-align: left;
            }
            .wf-price{
                text-decoration:line-through;
                color:rgb(184, 184, 184);
                text-align: left;

            } 
        }
    }
    .lines{
        margin-top: 0;
    }
}
</style>