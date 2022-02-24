<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-goods0">
        <el-row  v-for="(item,index) in list" :key="index" class="wf-goods-row" >
            <el-col :span="24" >
                <el-row class="wf-goods-img" >
                    <span class="wf-text-left" v-if="item.advance_sale===1">预售</span>
                    <img :src="item.master_graph" v-if="item.master_graph" />
                </el-row>
                <el-row class="bottom">
                    <div class="wf-goods-name" v-if="comProps[1].item.goodsName">
                        {{item.good_name}}
                    </div>
                    <div class="wf-goods-price"  v-if="comProps[1].item.goodsPrice">
                        <el-row>
                            <el-col :span="4" class="wf-newPrice">
                                {{item.concessional_rate}}
                            </el-col>
                            <el-col :span="4" class="wf-price">
                                {{item.original_price}}
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
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
.wf-DIY-goods0{
    padding-top: 5px;
    .wf-goods-tip{
        margin-top: -5px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
        background-color: rgb(237, 237, 237);
        height: 200px;
        /deep/ .el-col{
            width: 280px;
            height: 159px;
            background-color: #fff;
            margin: 20px;
            border-radius: 4px;
        }
    }
    .wf-goods-row{
        text-align: center;
        width: 94%;
        margin: 0 auto 10px auto;
        .bottom{
            background-color: #fff;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
        .wf-goods-img{
            height: 300px;
            img{
                width: 302px;
                height: 300px;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
            }
            .wf-text-left{
                float: left;
                width: 40px;
                background-color: #e9473c;
                position: absolute;
                color: #fff;
                border-bottom-right-radius: 4px;
                padding: 2px;
            }
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
            padding: 10px 8px;
            .wf-newPrice{
                color:rgb(233, 71, 60);
            }
            .wf-price{
                text-decoration:line-through;
                color:rgb(184, 184, 184);
                float: right;
            }   
        }
    }
}
</style>