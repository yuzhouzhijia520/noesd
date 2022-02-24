<template>
    <div class="wf-markting-memberMenu">
        <!-- <div class="wf-member-nav">
            <el-menu :default-active="type" mode="horizontal" class="el-menu-demo" @select="tabActive">
                <el-menu-item :index="index"  v-for="(item,index) in classData" :name="item.type" :key="index">
                   {{item.type_name}}
                </el-menu-item>
            </el-menu>
        </div> -->
        <div class="wf-markting-content">
            <div v-if="show==='membershipCard'"><membership-card></membership-card></div>
        </div>
    </div>
</template>

<script>
import membershipCard from '../membership_card/membershipCard.vue';
export default {
    name: 'memberMenu',
    data() {
        return {
             classData: {
                membershipCard:{
                    type:"membershipCard",
                    type_name:"会员卡"
                }
            },
            type: 'membershipCard',
            show:'membershipCard'
        }
    },
    components: {
        membershipCard 
    },
    created(){
        this.type = "membershipCard"
        this.show = "membershipCard"
    },
    methods: {
        // tabActive(e,i){
        //     if(e&&e!=null&&e!=undefined){
        //         this.show = e;
        //     }
        // }
    }
}
</script>


<style lang="scss" scoped>
.wf-markting-memberMenu{
    border-radius: 4px;
    .el-menu{
        padding-left: 30px;
        border-radius: 4px;
        border-bottom: none;
        margin-bottom: 20px;
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