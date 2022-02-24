<template>
    <div class="wf-waybillManagement">
        <el-tabs v-model="type" @tab-click="tabActive">
            <el-tab-pane v-for="(item,index) in classData" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
        <waybillList class="wf-main" v-if="show==='waybillList'"></waybillList>
        <surfaceCourier class="wf-main" v-if="show==='surfaceCourier'"></surfaceCourier>
        <printList class="wf-main" v-if="show==='printList'"></printList>
    </div>
</template>

<script>
import waybillList from "./waybillList.vue";
import surfaceCourier from "./surfaceCourier.vue";
import printList from "./printList.vue"
export default {
    name: "waybillManagement",
    data() {
        return {
            classData: [
                {
                    label: "运单列表",
                    name:"first"
                },
                {
                    label: "电子面单快递公司",
                    name:"second"
                },
                {
                    label: "打印员列表",
                    name:"third"
                }
            ],
            type: 'first',
            show: 'waybillList'
        }
    },
    components: {
        waybillList,
        surfaceCourier,
        printList
    },
    mounted(){
        let type = parseInt(this.$route.query.type)
        if(type===2){
            this.type = 'second'
            this.show = "surfaceCourier"
        }else if(type===3){
            this.type = 'third'
            this.show = "printList"
        }
    },
    methods: {
        tabActive(tab, event) {
            if(tab.index==='0'){
                this.type = 'first'
                this.show = 'waybillList'
            }else if(tab.index==='1'){
                this.type = 'second'
                this.show = 'surfaceCourier'
            }else if(tab.index==='2'){
                this.type = 'third'
                this.show = 'printList'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-waybillManagement{
    /deep/ .el-tabs{
        .el-tabs__header{
            background: #fff;
            border-radius: 4px;
            padding-left: 20px;
            .el-tabs__item{
                height: 60px;
                line-height: 60px;
                &:hover{
                    color: #719FF8;
                }
            }
            .el-tabs__item.is-active{
                color: #719FF8;
                font-weight: bold;
            }
            .el-tabs__active-bar{
                background-color: #719FF8;
                height: 4px;
            }
            .el-tabs__nav-wrap::after{
                display: none;
            }
        }
    }
    .wf-main{
        background: #fff;
        padding: 20px;
        border-radius: 4px;
    }
    /deep/ .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
    /deep/ .el-button--primary{
        background-color: #719FF8;
        border-color: #409EFF;
    }
    /deep/ .el-button--text{
        padding: 0;
        color: #719FF8;
    }
    /deep/ .el-dialog{
        .el-dialog__header{
            text-align: left;
            border-bottom: 1px solid #F0F0F0;
        }
    }
    /deep/ .wf-title{
        margin-bottom: 20px;
    }
}
</style>
