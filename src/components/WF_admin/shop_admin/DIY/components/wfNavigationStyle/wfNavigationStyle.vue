<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-wfNavigationStyle" >
        <el-row class="wf-wfNavigationStyle-row">
             <el-col :span="8" :class="newComProps.selectShow&&newComProps.order===0?'active wf-wfNavigationStyle-col':'wf-wfNavigationStyle-col'">
                <div class="wf-wfNavigationStyle-one" @click="handleWfGoods(0)">
                     <el-row>
                        <el-col :span="5" v-for="(item,index) in 4" :key="index" :offset="1">
                            <div class="wf-wfNavigationStyle-header"></div>
                        </el-col>
                     </el-row>
                     <el-row>
                        <div class="wf-wfNavigationStyle-text">一行四个排版</div>
                     </el-row>
                </div>
            </el-col>
              <el-col :span="8" :class="newComProps.selectShow&&newComProps.order===1?'active wf-wfNavigationStyle-col wf-two':'wf-wfNavigationStyle-col wf-two'" >
                <div class="wf-wfNavigationStyle-two" @click="handleWfGoods(1)" >
                     <el-row>
                        <el-col :span="4" v-for="(item,index) in 5" :key="index" >
                            <div class="wf-wfNavigationStyle-header"></div>
                        </el-col>
                     </el-row>
                     <el-row>
                        <div class="wf-wfNavigationStyle-text">一行五个排版</div>
                     </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row v-if="newComProps.selectShow">
            <component  :is="newComProps.component" :comProps="newComProps"  v-on:newComProps="handleNewConProps" :selComponentId="selComponentId"></component>
        </el-row>
    </div>
</template>

<script>
import wfNavigation4 from '../wfNavigation/wfNavigation4.vue'; //图文导航属性面板
import wfNavigation5 from '../wfNavigation/wfNavigation5.vue'; //图文导航属性面板
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
        wfNavigation4,
        wfNavigation5,
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
         *          selComponentId:图文导航order
         *          i：列表样式指针
         *      }
         */
        handleNewConProps(val,selComponentId){
            let that=this;
            let changeComponentName='';
            //深度拷贝对象
            this.newComponent=JSON.parse(JSON.stringify(this.comProps));
            if(Object.prototype.toString.call(this.newComponent.item)==='[object Array]'){
                this.newComponent.item.some((item,index) => {
                    if(item.component===val.component&&that.selComponentId==selComponentId){
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
                    newSelectProps=that.newComponent.item[index].item;
                    that.newComponent.item[index].item=[];
                    that.newComponent.item[index].selectShow=false;
                    that.newComponent.item[i].selectShow=true;
                    that.newComponent.item[i].item=newSelectProps;
                }else{
                    that.newComponent.item[index].item=[];
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
                    this.comProps.item.some((item,i)=>{
                        if(item.selectShow){
                             that.newComProps=item;
                             that.selectId=item.order;
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
@import '@/styles/components/css_WF_admin/shop_admin/DIY/components/wfNavigationStyle/wfNavigationStyle.scss';
</style>