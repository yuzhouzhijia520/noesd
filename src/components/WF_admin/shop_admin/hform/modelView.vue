<template>
    <!-- class="wf-" -->
    <div class="wf-modelView" >
         <!-- <el-button type="text" @click="centerDialogVisible = true">选择店铺首页模版</el-button> -->
         <!-- :visible.sync="centerDialogVisible" -->
        <el-dialog
            title="选择高级表单模版"
            :visible.sync="centerDialogVisible"
            :before-close="handleClose"
            width="800px"
            center>
            <div class="wf-modelView-content clear">
               
                <div class="wf-modelView-content-one" v-for="(item,index) in list" :key="index">
                    <p class="wf-modelView-text">{{item.txt}}</p>
                    <img :src="item.img" alt="" class="wf-modelView-content-one-img">
                    <div class="wf-modelView-content-one-txt">
                        <p class="wf-modelView-textbtn">点击创建，马上添加您的板式</p>
                        <el-button  class="wf-modelView-content-one-b" type="primary" size="mini" @click="selectID(item,index)" :loading="btn==index">立即创建</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            otheruuid:require('uuid/v1')(),
            btn:-1,
            centerDialogVisible: true,
            list:[
                {
                    img:'https://cdn3.19mini.com/2019-06-25%2F0fab7f141e283a9403df6bbdc49784ec.png',
                    txt:'左右结构、无序号',
                    id:0,
                    baseUrl:"/wf/admin/shop/markting/hform/addHForm"
                },
                {
                    img:'https://cdn3.19mini.com/2019-06-25%2Fe1a9b2bad782ecf4a0bdb202e3c322c0.png',
                    txt:'上下结构、有序号',
                    id:1,
                    baseUrl:"/wf/admin/shop/markting/hform/addHForm"
                }
            ],
        }
            
    },
    components:{

    },
    created(){
        
    },
    mounted(){
        
    },
    methods: {
        selectID(val,index){
            this.$router.push({path:val.baseUrl,query:{type:val.id}});
        },
        handleClose(){
            this.centerDialogVisible = false
            this.$emit("dialogVisible",false);           
        }
    }
}

</script>


<style lang="scss" scoped>
.clear{
    clear: both;
}
.el-button{
}
.wf-modelView{
    .wf-modelView-content{
        .wf-modelView-content-one{
            width: 360px;
            height: 450px;
            margin: 10px 7px;
            float: left;
            box-shadow:0px 2px 2px 2px rgba(0, 0, 0, 0.08);
            text-align: center;
            padding-top: 50px;
            .wf-modelView-text{
                margin-bottom: 20px;
            }
            .wf-modelView-content-one-img{
                // width: 270px;
                // display: block;
                // height: 480px;
                // background: red;
            }
            .wf-modelView-content-one-txt{
                background: #fff;
                text-align: center;
                margin-top: 50px;
                p{
                    margin-bottom: 20px;
                }
                .wf-modelView-content-one-t{
                    color: #333333;
                    width: 190px;
                    margin-bottom:10px;
                    .wf-tip{
                        color: #9e9e9e;
                        font-size: 12px;
                    }
                }
                
            }
       }
    }
}
</style>