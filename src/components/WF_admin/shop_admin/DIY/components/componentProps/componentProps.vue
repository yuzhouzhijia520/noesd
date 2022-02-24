<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-wfCollapse" >
        <el-collapse  v-model="activeName" v-if="newComponent.flagClick">
            <el-collapse-item   :title="item.title" :name="index" v-for="(item,index) in newComponent.props" :key="index" v-model="newComponent" >
                <!-- <pre>{{component}}</pre> -->
                <component :is="item.component" v-bind:comProps="item"  v-on:newComProps="handleNewConProps" v-on:newAllComProps="handleNewAllComProps" v-on:otherProps="handleOtherProps"  :selComponentId="selComponentId"></component>
            </el-collapse-item>
            
        </el-collapse>
    </div>
</template>

<script>
//属性面板控制器
import setPageProps from '../setPage/setPageProps.vue'; //基础商品属性面板
import wfCard from '../wfCard/wfCard.vue'; //轮播图属性面板
import imageUpload from '../imageUpload/imageUpload.vue'; //图片广告面板
import searchProps from '../search/searchProps.vue'; //搜索框属性面板
import wfGoodsListStyle from '../wfGoodsListStyle/wfGoodsListStyle.vue'; //商品属性面板
import wfCardProps from '../wfCardProps/wfCardProps.vue'; //基础轮播图属性面板
import heightLine from '../heightLine/heightLine.vue'; //基础辅助空白线属性面板
// import navigationEdit from '../navigationEdit/navigationEdit.vue';
import wfNavigationStyle from '../wfNavigationStyle/wfNavigationStyle.vue';
import bannerProps from '../banner/bannerProps.vue'//标题编辑
import wfGoodsProps from '../wfGoodsProps/wfGoodsProps.vue'; //基础商品属性面板
import wfCubeStyle from '../wfCubeStyle/wfCubeStyle.vue'; //基础魔方属性面板
import noticeSet from '../noticeSet/noticeSet.vue'; //基础公告属性面板
import videoSet from '../videoSet/videoSet.vue'; //基础视频属性面板
import bargainStyle from '../bargainStyle/bargainStyle.vue'; //基础砍价属性面板
import spikeStyle from '../spikeStyle/spikeStyle.vue'; //基础秒杀属性面板
import assembleStyle from '../assembleStyle/assembleStyle.vue'; //基础拼团属性面板
export default {
    name: '',
    props:{
        component:Object,
        selComponentId:Number
    },
    data() {
        return {
            activeName: [],
            newComponent:{},
            flag:false
        }
    },
    components: {
        setPageProps,
        wfCard,
        wfCardProps,
        heightLine,
        imageUpload,
        searchProps,
        wfGoodsListStyle,
        // navigationEdit,
        wfNavigationStyle,
        bannerProps,
        wfGoodsProps,
        wfCubeStyle,
        noticeSet,
        videoSet,
        bargainStyle,
        spikeStyle,
        assembleStyle
    },
    created(){
    },
    mounted(){
        let that=this;
        this.$watch('component',function (val){
            that.newComponent=JSON.parse(JSON.stringify(that.component));
            if(that.newComponent.props){
                that.newComponent.props.forEach((v,index)=>{
                    if(!that.activeName.includes(index)){
                        that.activeName.push(index);
                    }
                })
            }
        });
    },
    methods: {
        //属性面板与属性面板数据交互回调函数
        /**
         * @params （param1,param2） 
         * param1:需要处理的属性
         * parma2：需要改变的面板名称
         */
        handleOtherProps(val,name,propsName){
            let that=this;
            this.newComponent=JSON.parse(JSON.stringify(this.component));
            if(Object.prototype.toString.call(this.newComponent.props)==='[object Array]'){
                this.newComponent.props.some((item,index) => {
                    if(item.component===name){
                        that.newComponent.props[index].item[propsName]=val
                        that.$emit("newComponent",that.newComponent,name);
                        return true;  
                    }
                })
            }
        },
        //多种切换模式
        handleNewAllComProps(val,i){
            let that=this;
            let changeComponentName='';
            //深度拷贝对象
            this.newComponent=JSON.parse(JSON.stringify(this.component));
            this.newComponent.props.some((item,index) => {
                if(item.component===val.component){
                    that.newComponent.props[index]=val;
                    changeComponentName=val.component;
                    that.$emit("newComponent",that.newComponent,changeComponentName);
                    return true;
                }
            });
        },
        //单模式
        handleNewConProps(val,selComponentId){
            let that=this;
            let changeComponentName='';
            //深度拷贝对象
            this.newComponent=JSON.parse(JSON.stringify(this.component));
            if(Object.prototype.toString.call(this.newComponent.props)==='[object Array]'){
                this.newComponent.props.some((item,index) => {
                    // &&that.selComponentId==selComponentId
                    if(item.component===val.component){
                        that.newComponent.props[index]=val;
                        changeComponentName=val.component;
                        that.$emit("newComponent",that.newComponent,changeComponentName);
                        return true;
                    }
                });
            }
            
        }
    },
    //监听component变化
    watch:{
        component:{
            immediate:true,
            handler(val,oldVal){
                let that=this;
                this.newComponent=val;
                if(this.newComponent.props){
                    this.newComponent.props.forEach((v,index)=>{
                        if(!that.activeName.includes(index)){
                            that.activeName.push(index);
                        }
                    })
                }
            },
            deep:true
        },
        // newComponent:{
        //     handler(val,oldVal){
        //         debugger
        //         let that=this;
        //         if(val.flagClick){
        //             this.newComponent.flagClick=false;
        //             this.flag=true;
        //         }
        //         if(this.flag){
        //             this.$nextTick(()=>{
        //                 that.flag=false;
        //                 that.$set(that.newComponent,'flagClick',true);
        //             });
        //         }
        //         return this.newComponent;
        //     },
        // }
    }
}
</script>


<style lang="scss" scoped>

</style>