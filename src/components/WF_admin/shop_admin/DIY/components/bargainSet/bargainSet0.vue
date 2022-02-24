<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-bargainSet0">
        <div class="wf-bargainSet0-title">活动选择</div>
        <div class="wf-bargainSet0-body">
            <el-row>
                <draggable class="list-group" element="ul" v-model="newComProps.props" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <li v-for="(item,index) in newComProps.props" :key="index">
                           
                            <img :src="item.master_graph"/>
                            
                            <div class="upload-icon">
                                <el-row>
                                    <el-col :span="12" class="upload-icon-img">
                                        <i class="el-icon-view" ></i> <img v-if="item.master_graph" :preview="index" :src="item.master_graph" class="avatar"/>
                                    </el-col>
                                    <el-col :span="12">
                                        <i class="el-icon-delete" @click="handleRemove(index)"></i>
                                    </el-col>
                                </el-row>
                            </div>
                        </li>
                    </transition-group>
                </draggable>
                <div class="wf-bargainSet0-add" @click="selectGoods">
                    {{name}}
                </div>
            </el-row>
            <div class="wf-tooltip">
                <label class="wf-tooltip-label">拖动选中的商品可对其排序</label>
            </div>
        </div>
        <e-bargain 
        v-if="showSelectGoods" 
        v-on:handleShopslist="handleShopslist"  
        v-on:shopSelectedId="handleShopSelectedId" 
        :componetType="componetType" 
        :selectParams="selectParams"
        :title="title"></e-bargain>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import eBargain from "../linkDialog/eBargain.vue";
export default {
    name: '',
    props:{
        comProps:Object,
        // selComponentId:Number
    },
    data() {
        return {
            componetType:'bargain',////根据传入的不同类型处理传出数据
            title:"砍价活动",
            showSelectGoods:false,
            isDragging: false,
            delayedDragging: false,
            newComProps:{},
            name:"点击添加活动",
            selectParams:{},
            newSelComponentId:0
        }
    },
    components: {
        eBargain,
        draggable
    },
    created(){
        
    },
    computed: {
        //拖拽操作
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                ghostClass: "ghost"
            };
        },
    },
    mounted(){

    },
    methods: {
        handleShopSelectedId:function(seleted,path,submitFlag){
            if(submitFlag){
                let that=this;
                this.newComProps.props=seleted;
                this.newComProps.props.map((item,i)=>{
                    that.newComProps.props[i].imgLink=path+'?id='+item.id;
                });
                if(Object.prototype.toString.call(this.newComProps.props)==='[object Array]'){
                    if(this.newComProps.props.length>0){
                        this.name="点击修改商品";
                    }else{
                        this.name="点击添加商品";
                    }
                }
                this.$emit('newComProps',this.newComProps,this.selComponentId);
            }
        },
        handleShopslist(val){
            this.showSelectGoods=val;
        },
        selectGoods(){
            this.selectParams=this.newComProps.props;
            this.showSelectGoods=true;
            
        },
        handleRemove(index) {  //轮播图删除
            this.newComProps.props.splice(index,1);
            this.$emit('newComProps',this.newComProps,this.selComponentId);
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return ((!relatedElement || !relatedElement.fixed) && !draggedElement.fixed);
        },
    },
    
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
                this.$emit('newComProps',this.newComProps,this.selComponentId);
            });
        },
        comProps:{
            immediate:true,//初始值执行handler的函数
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps));
            }
        },
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-bargainSet0{
    border: 1px solid #e2e2e2;
    min-height: 139px;
    padding-left: 20px;
    padding-top: 20px;
    border-radius: 4px;
    .wf-bargainSet0-body{
        margin-top: 15px;
        .upload-icon{
            text-align: center;
            width: 80px;
            margin-bottom: 10px;
            .el-icon-delete{
                cursor: pointer;
            }
            .upload-icon-img{
                position: relative;
                img{
                    width: 14px;
                    height: 14px;
                    opacity: 0;
                    position: absolute;
                    left: 14px;
                    top: 5px;
                    cursor: pointer;
                }
            }
        }
        li{
            float: left;
            margin-right: 10px;
            img{
                width: 80px;
                height: 80px;
                cursor: all-scroll;
                border: 1px dashed rgb(206, 206, 206);
                &:hover{
                    box-shadow: 0 2px 8px rgba(0,0,0,.09);
                    border-color: rgba(0,0,0,.09);
                    border: 1px dashed #00a9ff;
                }
            }
        }
        .wf-bargainSet0-add{
                background-color: #fff;
                border-radius: 4px;
                width: 80px;
                height: 80px;
                line-height: 80px;
                text-align: center;
                display: inline-block;
                cursor: pointer;
                border: 1px dashed rgb(206, 206, 206);
                color: #bbb;
                &:hover{
                    box-shadow: 0 2px 8px rgba(0,0,0,.09);
                    border-color: rgba(0,0,0,.09);
                    border: 1px dashed #00a9ff;
                }
        }
        .wf-tooltip{
            margin: 10px 0;
            .wf-tooltip-label{
                cursor: help;
                color: #bbb;
                font-size: 12px;
            }
        }
    }
}
</style>