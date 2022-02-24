<template>
    <!--*************页面布局***********-->
    <el-container>
        <!--*************header***********-->
        <el-header>
            <wf-header></wf-header>
        </el-header>
        <bread-crumb></bread-crumb>
        <el-container class="wf-el-container-header">
            <!--*************nav***********-->
            <el-aside width="200px" class="wf-el-aside">
                <sub-menu></sub-menu>
            </el-aside>
            <!--*************content***********-->
            <el-container class="wf-el-container-content">
                <!--*************main***********-->  
                <!-- <breadcrumb class="breadcrumb-container"/> -->
                <el-main>
                    <el-scrollbar class="wf-main-scrollbar">
                        <div class="wf-el-border">
                            <router-view></router-view>
                        </div>
                    </el-scrollbar>
                </el-main>
                <!--*************footer***********-->
                <el-footer v-if="this.$store.state.oemFlag"> {{this.$store.state.serverList.data.copyright}}</el-footer>
                <el-footer v-else> &copy;2016 — 2019 版权所有 万帆集团旗下,拾久商城 杭州万帆集团 浙ICP备16031604号-4</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import wfHeader from './mainLayout/header';
import subMenu from './mainLayout/submenu';
import breadCrumb from "@/commonComponents/breadCrumb/breadCrumbShop.vue";
    export default {
        data(){
            return {
                menuList:[], 
            }
        },
        components:{
            subMenu,
            wfHeader,
            breadCrumb
        },
        create(){
        }
    }
</script>

<style lang="scss" scoped>
    .el-header {
        background-color: #292929;
        color: #fff;
        text-align: right;
        line-height: 34px;
        height: 34px !important;
    }
    .el-footer{
        background-color: #fff;
        color: #8a8a8a;
        line-height: 34px;
        min-height: 34px !important;
    }
  
    //左侧导航
    .el-aside {
        -webkit-transition: width 0.28s;
        transition: width 0.28s;
        top: 34px;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        color: #fff;
        background-color: #3D3D3D;
    }
    
    //右侧内容
    .el-main {
        background-color: #F3F3F3;
        color: #333;
        -webkit-transition: margin-left .28s;
        transition: margin-left .28s;
        position: relative;
    }
  
    body > .el-container {
        margin-bottom: 40px;
        font-size: 12px;
        z-index: 1031;
        position: relative;
    }
  
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
  
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .el-footer{
        height: 30px !important;
        width: 100%;
        bottom: 0;
        background-color: #e2e2e2;
    }
    /deep/ .el-breadcrumb{
        margin-left: 220px;
        line-height: 40px;
    }
    /deep/ .el-aside{
        margin-top: -40px;
    }
    .wf-el-container-header{
        display: flex;
        position: absolute;
        top: 33px;
        bottom: 0;
        overflow: hidden;
        width: 100%;
        .wf-el-container-content{
            overflow: hidden;
            margin-top: 33px;
            .el-main{
                padding: 0;
                display: flex;
                .wf-main-scrollbar{
                    flex: 1;
                    .el-scrollbar__wrap{
                        overflow-x:hidden;
                    }
                    .wf-el-border{
                        margin: 20px;
                    }
                }
            }
        }
        .el-aside{
            // overflow: scroll;
            display: flex;
        }
    }
</style>
