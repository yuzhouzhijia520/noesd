<template>
    <div class="wf-markting-bargainMenu">
        <div class="wf-bargain-nav">
            <el-menu :default-active="type" mode="horizontal" class="el-menu-demo" @select="tabActive">
                <el-menu-item :index="index"  v-for="(item,index) in classData"   :name="item.type" :key="index">
                   {{item.type_name}}
                </el-menu-item>
            </el-menu>
        </div>
        <div class="wf-markting-content">
            <div v-if="show==='bargainGoods'"><bargain-goods></bargain-goods></div>
            <div v-if="show==='activityRecord'"><activity-record></activity-record></div>
        </div>
    </div>
</template>

<script>
import bargainGoods from '../bargain/bargainGoods.vue';
import activityRecord from '../bargain/activityRecord.vue';
export default {
    name: '',
    data() {
        return {
             classData:{
                bargainGoods:{
                    type:"bargainGoods",
                    type_name:"砍价列表"
                },
                activityRecord:{
                    type:"activityRecord",
                    type_name:"活动记录"
                }
            },
            type: 'bargainGoods',
            show:'bargainGoods',
        }
    },
    components: {
        bargainGoods,
        activityRecord
    },
    created(){

    },
    mounted(){

    },
    methods: {
        tabActive:function(e,i){
            if(e&&e!=null&&e!=undefined){
                this.show = e;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-markting-bargainMenu{
    border-radius: 4px;
    .el-menu{
        padding-left: 30px;
        border-radius: 4px;
        border-bottom: none;
        .el-menu-item{
            font-size: 16px;
        }
        .el-menu-item.is-active{
            border-bottom: 4px solid #719FF8;
            color: #719FF8;
            font-weight: bold;
        }
    }
    
}
</style>