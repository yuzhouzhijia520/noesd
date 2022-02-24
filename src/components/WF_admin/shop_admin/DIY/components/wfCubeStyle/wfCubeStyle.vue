<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-wfCubeStyle" >
        <el-row class="wf-wfCubeStyle-row">
            <el-col :span="6" :offset="2" :class="newComProps.selectShow&&newComProps.order===0?'active wf-wfCubeStyle-col':'wf-wfCubeStyle-col'">
                <div class="wf-wfCubeStyle-one" @click="handleWfGoods(0)">
                     <el-row>
                        <el-col :span="10"  :offset="1">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                     </el-row>
                     <el-row>
                        <div class="wf-wfCubeStyle-text">1行2个</div>
                     </el-row>
                </div>
            </el-col>
            <el-col :span="6" :offset="2" :class="newComProps.selectShow&&newComProps.order===1?'active wf-wfCubeStyle-col':'wf-wfCubeStyle-col'">
                <div class="wf-wfCubeStyle-one" @click="handleWfGoods(1)">
                     <el-row>
                        <el-col :span="6" :offset="1">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                        <el-col :span="6"  :offset="2">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                        <el-col :span="6"  :offset="2">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                     </el-row>
                     <el-row>
                        <div class="wf-wfCubeStyle-text">1行3个</div>
                     </el-row>
                </div>
            </el-col>
             <el-col :span="6" :offset="2" :class="newComProps.selectShow&&newComProps.order===2?'active wf-wfCubeStyle-col':'wf-wfCubeStyle-col'">
                <div class="wf-wfCubeStyle-one" @click="handleWfGoods(2)">
                     <el-row>
                        <el-col :span="4"  :offset="2">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                        <el-col :span="4"  :offset="1">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                        <el-col :span="4"  :offset="1">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                     </el-row>
                     <el-row>
                        <div class="wf-wfCubeStyle-text">1行4个</div>
                     </el-row>
                </div>
            </el-col>
             <el-col :span="6" :offset="2" :class="newComProps.selectShow&&newComProps.order===3?'active wf-wfCubeStyle-col wf-two':'wf-wfCubeStyle-col wf-two'" >
                <div class="wf-wfCubeStyle-two" @click="handleWfGoods(3)" >
                     <el-row>
                        <el-col :span="7" class="wf-left">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                        <el-col :span="12" class="wf-left">
                            <el-row>
                                <el-col  class="wf-bottom">
                                     <div class="wf-wfCubeStyle-header wf-cube1"></div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                     <div class="wf-wfCubeStyle-header wf-cube1"></div>
                                </el-col>
                            </el-row>
                        </el-col>
                     </el-row>
                     <el-row>
                        <div class="wf-wfCubeStyle-text">1左2右</div>
                     </el-row>
                </div>
            </el-col>
             <el-col :span="6" :offset="2" :class="newComProps.selectShow&&newComProps.order===4?'active wf-wfCubeStyle-col wf-two':'wf-wfCubeStyle-col wf-two'" >
                <div class="wf-wfCubeStyle-two" @click="handleWfGoods(4)" >
                      <el-row>
                        <el-col :span="20" class="wf-left wf-bottom">
                            <div class="wf-wfCubeStyle-header wf-five-cube"></div>
                        </el-col>
                        <el-col :span="21" class="wf-left">
                            <el-col :span="10">
                                    <div class="wf-wfCubeStyle-header wf-cube1"></div>
                            </el-col>
                            <el-col :span="10" class="wf-left">
                                    <div class="wf-wfCubeStyle-header wf-cube1"></div>
                            </el-col>
                        </el-col>
                     </el-row>
                     <el-row>
                        <div class="wf-wfCubeStyle-text">1上2下</div>
                     </el-row>
                </div>
            </el-col>
            <el-col :span="6" :offset="2" :class="newComProps.selectShow&&newComProps.order===5?'active wf-wfCubeStyle-col wf-two':'wf-wfCubeStyle-col wf-two'" >
                <div class="wf-wfCubeStyle-two" @click="handleWfGoods(5)" >
                     <el-row>
                        <el-col :span="4" class="wf-six-left first">
                            <div class="wf-wfCubeStyle-header"></div>
                        </el-col>
                        <el-col :span="13" class="wf-six-left wf-six-bottom">
                            <div class="wf-wfCubeStyle-header wf-five-cube"></div>
                        </el-col>
                        <el-col :span="13" class="wf-six-left">
                            <el-col :span="10">
                                    <div class="wf-wfCubeStyle-header wf-cube1"></div>
                            </el-col>
                            <el-col :span="10" class="wf-left">
                                    <div class="wf-wfCubeStyle-header wf-cube1"></div>
                            </el-col>
                        </el-col>
                     </el-row>
                     <el-row>
                        <div class="wf-wfCubeStyle-text">1左3右</div>
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
import wfCube0 from '../wfCube/wfCube0.vue'; //魔方属性面板
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
        wfCube0,
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
            //深度拷贝对象
            this.newComponent=JSON.parse(JSON.stringify(this.comProps));
            if(Object.prototype.toString.call(this.newComponent.item)==='[object Array]'){
                this.newComponent.item.some((item,index) => {
                    if(item.parentComponent===val.parentComponent&&that.selComponentId==selComponentId){
                        that.newComponent.item[index]=val;
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
@import '@/styles/components/css_WF_admin/shop_admin/DIY/components/wfCubeStyle/wfCubeStyle.scss';
</style>