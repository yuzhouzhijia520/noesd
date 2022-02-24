<template>
    <!-- class="wf-" -->
    <div class="wf-markting-disMenu">
        <div class="wf-distribution-nav">
            <el-menu :default-active="type" mode="horizontal" class="el-menu-demo" @select="tabActive">
                <el-menu-item :index="index"  v-for="(item,index) in classData"   :name="item.type" :key="index">
                   {{item.type_name}}
                </el-menu-item>
            </el-menu>
        </div>
       <!-- <router-view name='shop_markting_distribution'> </router-view> -->
        <!-- <router-view ></router-view> -->
        <div class="wf-markting-content">
            <div v-if="show==='disList'"> <distributor-list></distributor-list></div>
            <div v-if="show==='disOrder'"> <distribution-order></distribution-order></div>
            <div v-if="show==='cashManagement'"> <withdraw-management></withdraw-management></div>
            <div v-if="show==='disSetting'"> <distribution></distribution></div>
        </div>
    </div>
</template>

<script>
import distributorList from '../distribution/distributor_list.vue';
import distributionOrder from '../distribution/distribution_order.vue';
import withdrawManagement from '../distribution/withdraw_management.vue';
import distribution from './distribution.vue';
export default {
    name: '',
    data() {
        return {
             classData:{
                disList:{
                    type:"disList",
                    type_name:"分销商列表",
                    
                },
                disOrder:{
                    type:"disOrder",
                    type_name:"分销订单"
                },
                cashManagement:{
                    type:"cashManagement",
                    type_name:"提现管理"
                },
                disSetting:{
                    type:"disSetting",
                    type_name:"分销设置"
                }
            },
            type: 'disList',
            show:'disList',
        }
    },
    components: {
        distributorList,
        distributionOrder,
        withdrawManagement,
        distribution
        
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

</style>