<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-bargainStyle">
        <el-row class="wf-wfGoodsListStyle-row">
             <el-col :span="6" :class="newComProps.selectShow&&newComProps.order===1?'active wf-wfGoodsListStyle-col':'wf-wfGoodsListStyle-col'">
                <div class="wf-wfGoodsListStyle-two" @click="handleWfGoods(1)">
                     <el-row>
                        <div class="wf-wfGoodsListStyle-header"></div>
                     </el-row>
                     <el-row>
                        <div class="wf-wfGoodsListStyle-header"></div>
                     </el-row>
                     <el-row>
                        <div class="wf-wfGoodsListStyle-header"></div>
                     </el-row>
                     <el-row>
                        <div class="wf-wfGoodsListStyle-text">一行一个左右排版</div>
                     </el-row>
                </div>
            </el-col>
        </el-row>
        <!-- <el-row > -->
            <component v-if="newComProps.selectShow" :is="newComProps.component" :comProps="newComProps"  v-on:newComProps="handleNewConProps" :selComponentId="selComponentId"></component>
        <!-- </el-row> -->
    </div>
</template>

<script>
import bargainSet0 from '../bargainSet/bargainSet0.vue'; //商品属性面板
export default {
    name: '',
    props:{
        comProps:Object,
        selComponentId:Number
    },
    data() {
        return {
            newComProps:{},
            selectId:0,
            newComponent:{}
        }
    },
    components: {
        bargainSet0,
    },
    created(){
        //操作新对象,深度拷贝对象
        this.newComProps=JSON.parse(JSON.stringify(this.comProps.item[this.selectId]));
    },
    mounted(){
    },
    methods: {
        /**
         * params 
         *      {
         *          val:改变的值
         *          selComponentId:商品order
         *          i：列表样式指针
         *      }
         */
        handleNewConProps(val,selComponentId){
            let that=this;
            let changeComponentName='';
            //深度拷贝对象
            this.newComponent=JSON.parse(JSON.stringify(this.comProps));
            if(Object.prototype.toString.call(this.newComProps.props)==='[object Array]'){
                this.newComponent.item.some((item,index) => {
                    // &&that.selComponentId==selComponentId
                    if(item.component===val.component){
                        that.newComponent.item[index]=val;
                        changeComponentName=val.component;
                        that.$emit("newComProps",that.newComponent,selComponentId);
                        return true;
                    }
                });
            }
        },
        handleWfGoods(i){
            let that=this;
            this.newComponent=JSON.parse(JSON.stringify(this.comProps));
            let newSelectProps=[];
            this.selectId=i;
            this.newComponent.item.forEach((element,index) => {
                if(element.selectShow){
                    newSelectProps=that.newComponent.item[index].props;
                    that.newComponent.item[index].props=[];
                    that.newComponent.item[index].selectShow=false;
                    that.newComponent.item[i].selectShow=true;
                    that.newComponent.item[i].props=newSelectProps;
                }else{
                    that.newComponent.item[index].props=[];
                }
            })
            this.newComProps=JSON.parse(JSON.stringify(this.newComponent.item[this.selectId]));
            this.$emit("newAllComProps",this.newComponent);
        }
    },
     watch:{
        comProps:{
            immediate:true,//初始值执行handler的函数
            handler(val,oldVal){
                let that=this;
                if(Object.prototype.toString.call(this.comProps.item)==='[object Array]'){
                    this.comProps.item.some((el,i)=>{
                        if(el.selectShow){
                            that.newComProps=el;
                            that.selectId=el.order;
                            return true;
                        }
                    })
                }
            },
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/DIY/components/bargainStyle/bargainStyle.scss';
</style>