<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-topBar" @click="handleSetPage"  :style="{
        'color':$store.state.setPageProps.props[0].item.textRadio===2?'white':'black',
        'background-color':$store.state.setPageProps.props[0].item.bgradio===2?$store.state.setPageProps.props[0].item.bgcolor:'#fff'}">
        <el-row class="wf-topBar-top">
            <el-col :span="8" class="left">
                BELL<icon name="wfwifi" :scale="1.25"></icon>
            </el-col>
            <el-col :span="8" class="center">
                09:00 AM
            </el-col>
            <el-col :span="8" class="right">
                <el-col :span="20">
                    100%
                </el-col>
                <el-col :span="4">
                    <icon name="wfbattery"  :scale="1.5"></icon>
                </el-col>
            </el-col>
        </el-row>
        <el-row class="wf-topBar-bottom">
            <el-col :span="10" :offset="7" class="center">
                <div class="wf-DIY-topBar-txt" v-if="$store.state.setPageProps"><span v-if="$store.state.setPageProps.props">{{$store.state.setPageProps.props[0].item.title}}</span></div>
            </el-col>
            <el-col :span="7" class="right" >
                <div class="box">
                    <div class="line"></div>
                </div>
                <div class="icon">
                    <icon name="logout1"  class="icon-logout" :scale="2" ></icon>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {

        }
    },
    created(){
        
    },
    mounted(){
    },
    methods: {
        handleSetPage(){
            this.$emit('handleSetPage');
        }
    }
}

</script>


<style lang="scss" scoped>
.wf-DIY-topBar{
    margin-top: -32px;
    cursor: pointer;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    .wf-topBar-top{
        font-size: 12px;
        .left{
            padding-left: 5px;
            font-family: fantasy;
        }
        .center{
            text-align: center;
            font-family: fantasy;
        }
        .right{
            text-align: right;
            padding-right: 5px;
            /deep/ div{
                font-family: fantasy;
            }
        }
    }
    .wf-topBar-bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        cursor: pointer;
        .wf-DIY-topBar-left{
            height: 22px;
            width: 65px;
        }
        .wf-DIY-topBar-txt{
            font-size: 18px;
            text-align: center;
        }
        .wf-DIY-topBar-right{
            height: 22px;
            width: 65px;
        }
        .right{
            padding-right: 15px;
            height: 26px;
            line-height: 40px;
            text-align: right;
            .box{
                position: absolute;
                width: 75px;
                height: 25px;
                border: 1px solid #e6e6e6;
                border: 1px solid #e6e6e654;/*支持边框透明度的颜色色值*/  
                border-radius: 20px;
                .line{
                    width: 1px;
                    height: 18px;
                    background: #e6e6e6;
                    background: #e6e6e654;/*支持边框透明度的颜色色值*/
                    position: relative;
                    margin-left: 38px;
                    margin-top: 3px;
                }
            }
            .icon{
                margin: 0 auto;
                width: 55px;
                line-height: 34px;
            }
        }
    }
}
</style>