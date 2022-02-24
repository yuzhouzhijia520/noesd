<template>
    <div class="wf-DIY-notice" :style="styleSet">
        <el-row>
            <el-col :span="2" class="wf-icon">
                <icon name="wf-icon-notice" :scale="2.5" class="wf-icon-font"></icon>
            </el-col>
            <el-col :span="22" class="wf-content">
                <!-- <span>{{content}}</span> -->
                <vue-seamless-scroll :data="newsList" :class-option="optionLeft" class="seamless-warp2">
                    <ul class="item">
                        <li v-for="(item,index) in newsList" v-text="item.title" :key="index"></li>
                    </ul>
                </vue-seamless-scroll>
            </el-col>
           
        </el-row>
    </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
    name: '',
    props:{
        comProps:Array,
    },
    data() {
        return {
            newComProps:{},
            content:'',
            newsList: [{
                    'title': ''
                },
                {
                    'title': ''
                }]
        }
    },
    components: {
        vueSeamlessScroll
    },
    computed:{
        styleSet:function() {
            let nameFontColor='';
            if(Object.prototype.toString.call(this.newComProps)==='[object Array]'){
                if(parseInt(this.newComProps[0].item.fontcolor)===1){
                    nameFontColor='color:white;';
                }else{
                    nameFontColor='color:black;';
                }
            }else{
                nameFontColor='color:white;';
            }
            
            let bgcolor='';
            if(Object.prototype.toString.call(this.newComProps)==='[object Array]'){
                if(this.newComProps[0].item.radio===2){
                    bgcolor=this.newComProps[0].item.bgcolor;
                }else if(this.newComProps[0].item.radio===1){
                    if(this.newComProps[0].item.radio1===1){
                        bgcolor="#faa827";
                    }else if(this.newComProps[0].item.radio1===2){
                        bgcolor="#e9473c";
                    }else if(this.newComProps[0].item.radio1===3){
                        bgcolor="#454545";
                    }
                }else{
                    bgcolor='#ccc';
                }
            }else{
                bgcolor='#ccc';
            }
            let nameBgColor='background-color:'+bgcolor+';';
            return  nameFontColor + nameBgColor;
        },
        optionLeft () {
            return {
                    direction: 2,
                    limitMoveNum: 2
                }
        }
    },
    created(){
    },
    mounted(){
        
    },
    methods: {

    },
    watch:{
        comProps:{
            immediate:true,//初始值执行handler的函数
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps));
                if(val){
                    if(val[0]){
                        if(val[0].item){
                            if(oldVal){
                                if(oldVal[0].item.content!=val[0].item.content){
                                    this.content=this.newComProps[0].item.content
                                    this.newsList[0].title=this.newComProps[0].item.content
                                }
                            }else{
                                this.content=this.newComProps[0].item.content
                                this.newsList[0].title=this.newComProps[0].item.content
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-notice{
    min-height: 0 !important;
    .wf-icon{
        line-height: 30px;
        padding-left: 15px;
        .wf-icon-font{
            vertical-align: middle;
            line-height: 30px;
            height: 30px;
        } 
    }
    .wf-content{
        padding-left: 20px;
        line-height: 30px;
    }
    .seamless-warp2 {
        overflow: hidden;
        height: 25px;
        width: 380px;
        ul.item {
            width: 580px;
            li {
                float: left;
                margin-right: 10px;
            }
        }
    }
}
</style>