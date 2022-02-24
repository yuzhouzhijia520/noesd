
<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-areaDialog">
        <el-dialog :visible.sync="dialogelArea"
            :before-close="handleClose" >
            <tree-transfer :title="title" :from_data='fromData' :to_data='newToData' :defaultProps="{label:'name'}" pid='parentid' node_key='base_areaid' @addBtn='add' @removeBtn='remove' :mode='mode' height='540px' filter ></tree-transfer>
            <div class="close">
                <el-button type="primary" @click="submit"  size="mini">确定</el-button>
                <el-button @click="close"  size="mini">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
/**
 * @description 跳转，多级选择
 */
import { getShowAddress } from "@/server/fare";
import treeTransfer from '@/commonComponents/elTreeTransfer'; 
export default {
    name: '',
    props:{
        editFlag:Boolean,
        toData:Array,
        uuid:String
    },
    data() {
        
        return {
            mode: "transfer",
            title:['选择区域','已选区域'],
            dialogelArea: false,
            value:'',
            fromData: this.$store.state.fromDataFare,
            newToData:[],
            oldToData:[],
            flagOld:true,
            defaultToDataArr:[],
            elformOpenAll:false, //是否全部展开
            eltoOpenAll:false, //是否全部展开

        }
    },
    components: {
        treeTransfer
    },
    created(){
    },
    mounted(){
        this.dialogelArea = true;
        if(this.editFlag){
            this.newToData=this.toData;
        }
    },
    methods: {
        submit(){
            this.dialogelArea = false;
            let newDatas={};
            newDatas.data=this.newToData;
            this.fromData=this.fromData.filter((item)=>{
                if(!this.newToData.some((itemi)=>itemi.base_areaid===item.base_areaid)){
                    return item;
                }
            });
            this.$store.commit({
                type:'getFromDataFare',
                fromDataFare:this.fromData
            });
            if(this.editFlag){
                this.$emit('geturl',newDatas,false,true,this.uuid);
            }else{
                this.$emit('geturl',newDatas,false,false);
            }
           
           
        },
        close() {
            //确定按钮
            this.dialogelArea = false;
            let newDatas={};
            newDatas.data=[];
            this.$emit('geturl',newDatas,false,false);
        },
        handleClose(){
            this.dialogelArea = false;
            let newDatas={};
            newDatas.data=[];
            this.$emit('geturl',newDatas,false,false);
        },
        // 监听穿梭框组件添加
        add(fromData,toData,obj){
            this.fromData=this.$store.state.fromDataAllFare.filter((item)=>{
                if(fromData.some((itemi)=>itemi.base_areaid===item.base_areaid)){
                    return item;
                }
            });
            this.fromData=this.fromData.filter((item)=>{
                if(!toData.some((itemi)=>itemi.base_areaid===item.base_areaid)){
                    return item;
                }
            });
            let newToData=toData;
            newToData=this.$store.state.fromDataAllFare.filter((item)=>{
                if(toData.some(element =>element.base_areaid===item.base_areaid)){
                    return item;
                }
            })
            this.newToData=newToData.sort(this.compareKey('vieworder'));
            this.fromData=this.fromData.sort(this.compareKey('vieworder'));
            // this.$store.commit({
            //     type:'getFromDataFare',
            //     fromDataFare:this.fromData
            // });
        },
        // 监听穿梭框组件移除
        remove(fromData,toData,obj){
            this.newToData=toData.filter((item)=>{
                if(!obj.nodes.some((itemi)=>itemi.base_areaid===item.base_areaid)){
                    return item;
                }
            });
            this.newToData=this.$store.state.fromDataAllFare.filter((item)=>{
                if(this.newToData.some((itemi)=>itemi.base_areaid===item.base_areaid)){
                    return item;
                }
            });
            this.newToData=this.newToData.sort(this.compareKey('vieworder'));
            this.fromData=this.$store.state.fromDataAllFare.filter((item)=>{
                if(fromData.some((itemi)=>itemi.base_areaid===item.base_areaid)){
                    return item;
                }
            });
            this.fromData=this.fromData.sort(this.compareKey('vieworder'));
            // this.$store.commit({
            //     type:'getFromDataFare',
            //     fromDataFare:this.fromData
            // });
        },
        compareKey(propName){
            return function(obj1,obj2){
                if(parseInt(obj1[propName])<parseInt(obj2[propName])){
                    return -1;
                }else if(parseInt(obj1[propName])>parseInt(obj2[propName])){
                    return 1;
                }
                return 0;
            };
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-areaDialog{
    /deep/ .el-dialog__body{
        .transfer{
            .transfer-left{
                border-top:none;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        }
    }
    .close{
        text-align: center;
        width: 200px;
        margin: 0 auto;
        margin-top: 20px;
    }
}
</style>