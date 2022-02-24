<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-indx">
        <!-- <div class="wf-index-nav">
            <el-menu :default-active="type" mode="horizontal" class="el-menu-demo" @select="tabActive">
                <el-menu-item :index="index"  v-for="(item,index) in classData"   :name="item.type" :key="index">
                   {{item.type_name}}
                </el-menu-item>
            </el-menu>
        </div> -->
        <div class="wf-index-content">
            <div v-if="show==='disList'"> <diy-list></diy-list></div>
            <!-- <div v-if="show==='disOrder'"> <distribution-order></distribution-order></div> -->
        </div>
    </div>
</template>

<script>
import diyList from './main/diyList.vue';
export default {
    name: '',
    data() {
        return {
             classData:{
                disList:{
                    type:"diyList",
                    type_name:"店铺主页",
                    
                },
                disOrder:{
                    type:"diyType",
                    type_name:"店铺分类页"
                },
                diyConponent:{
                    type:"diyType",
                    type_name:"贡献组件"
                },
                diyExample:{
                    type:"diyType",
                    type_name:"案例学习"
                },
                diyDoc:{
                    type:"diyType",
                    type_name:"店铺装修手册"
                },
                diyAsk:{
                    type:"diyType",
                    type_name:"我要咨询"
                }
            },
            type: 'disList',
            show:'disList',
        }
    },
    components: {
        diyList
        
    },
    created(){

    },
    mounted(){

    },
    methods: {
        tabActive:function(e,i){
            if(e&&e!=null&&e!=undefined){
                this.show=e;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-indx{
    .wf-index-content{
        background-color: #fff;
        padding: 20px 10px;
        .el-button{
            margin-left: 10px;
        }
    }
}

</style>