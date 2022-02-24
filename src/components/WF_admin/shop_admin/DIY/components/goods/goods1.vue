<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-goods1">
        <el-row v-for="(item,index) in list" :key="index" class="wf-goods-row" >
            <el-col :span="8" >
                <span class="wf-text-left" v-if="item.advance_sale===1">预售</span>
                <img :src="item.master_graph" v-if="item.master_graph" class="wf-goods-row-img"/>
            </el-col>
            <el-col :span="16" class="wf-goods-row-right">
                    <div class="wf-goods-name" >
                        {{item.good_name}}
                    </div>
                    <div class="wf-goods-price" >
                        <el-row>
                            <el-col :span="8" class="wf-newPrice" v-if="item.concessional_rate">
                                ￥{{item.concessional_rate}}
                            </el-col>
                            <el-col :span="8" class="wf-price" v-if="item.original_price">
                                ￥{{item.original_price}}
                            </el-col>
                            <!-- <el-col :span="10" class="wf-pricel">
                                {{item.orderline}}已购买
                            </el-col> -->
                        </el-row>
                    </div>
            </el-col>
        </el-row>
        <el-row v-if="list.length===0" class="wf-goods-tip">
            <el-col></el-col>
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
                        debugger
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
.wf-DIY-goods1{
    .wf-goods-tip{
        margin-top: -5px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
        background-color: rgb(237, 237, 237);
        height: 100px;
        /deep/ .el-col{
            width: 280px;
            height: 58px;
            background-color: #fff;
            margin: 20px;
            border-radius: 4px;
        }
    }
    .wf-goods-row{
        border-bottom:1px solid #f3f3f3;
        padding: 10px 13px;
        text-align: center;
        background-color: #fff;
        .wf-text-left{
            float: left;
            width: 30px;
            background-color: #e9473c;
            position: absolute;
            color: #fff;
            border-bottom-right-radius: 4px;
            padding: 2px;
            font-size: 12px;
        }
        .wf-goods-row-img{
            width: 90px;
            height: 90px;
            border-radius: 4px;
        }
        .wf-goods-name{
            text-align: left;
            padding: 0 12px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
        }
        .wf-goods-price{
            padding: 0 8px;
            margin-top: 25px;
            .wf-newPrice{
                color:rgb(233, 71, 60);
            }
            .wf-price{
                text-decoration:line-through;
                color:rgb(184, 184, 184);
                margin-left: 20px;
                float: right;

            }
            .wf-pricel{
                color:rgb(184, 184, 184);
                margin-left: 20px;
            }
        }
    }
}
</style>