<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-bargain0">
        <el-row v-for="(item,index) in list" :key="index" class="wf-goods-row" >
            <el-col :span="8" class="wf-pic">
                  <img :src="item.master_graph" v-if="item.master_graph" class="wf-goods-row-img"/>
            </el-col>
            <el-col :span="16" class="wf-goods-row-right">
                <el-row>
                    <div class="wf-goods-name" >
                        {{item.name}}
                    </div>
                </el-row>
                <el-row class="wf-middle">
                    <el-col :span="10" class="wf-newPrice">
                        仅剩 {{item.stock||0}}件
                    </el-col>
                    <el-col :span="10" class="wf-price">
                        {{item.sum||0}}人已砍
                    </el-col>
                </el-row>
                <el-row>
                    <div class="wf-goods-price" >
                        <el-row>
                            <el-col :span="8" class="wf-newPrice">
                                ￥{{item.price||0}}
                            </el-col>
                            <el-col :span="10" class="wf-price">
                                原价:{{item.original_price||0}}
                            </el-col>
                            <el-col :span="6" class="wf-bargain">
                                立即砍价
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
            </el-col>
        </el-row>
        <el-row v-if="list.length===0" class="wf-goods-tip">暂未添加活动，请在右侧面板添加活动</el-row>
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
                this.comProps[0].item.forEach((element,i) => {
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
.wf-DIY-bargain0{
    .wf-pic{
        width: 95px;
    }
    .wf-goods-tip{
        color: #ccc;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background-color: #f5f5f5;
    }
    .wf-middle{
        font-size: 12px;
        color:#ccc;
        margin-left: 16px;
        text-align: left;
    }
    .wf-goods-row-right{
        margin-top: 8px;
    }
    .wf-goods-row{
        border-bottom:1px solid #f3f3f3;
        padding: 5px 0 5px 5px;
        text-align: center;
        background-color: #fff;
        .wf-goods-row-img{
            width: 95px;
            height: 95px;
            border-radius: 4px;
            margin-top: 5px;
        }
        .wf-goods-name{
            text-align: left;
            padding:0 15px 3px 15px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
            height: 42px;
        }
        .wf-goods-price{
            margin-top: 5px;
            font-size: 14px;
            margin-left: 14px;
            text-align: left;
            .wf-newPrice{
                color:rgb(233, 71, 60);
                font-size: 14px;
            }
            .wf-price{
                text-decoration:line-through;
                color:rgb(184, 184, 184);
                font-size: 12px;
                margin-top: 2px;
                padding-right: 3px;
                width: 74px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .wf-bargain{
                background-color: rgb(233, 71, 60);
                border-radius: 25px;
                color: rgb(249, 209, 207);
                padding: 1px;
                cursor: pointer;
                font-size: 12px;
                width: 28%;
                text-align: center;
            }
        }
    }
}
</style>