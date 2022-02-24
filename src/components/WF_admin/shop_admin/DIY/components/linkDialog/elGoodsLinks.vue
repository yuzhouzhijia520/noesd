
<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-elGoodsLinks">
        <el-dialog :visible.sync="dialogelGoodsLinks"
            :before-close="handleClose" >
            <tree-transfer :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'type_name',pid:'id'}" @addBtn='add' @removeBtn='remove' :mode='mode' height='540px' filter ></tree-transfer>
            <div class="close">
                <el-button type="primary" @click="submit"  size="mini">确定</el-button>
                <!-- <el-button @click="close"  size="mini">取消</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>
/**
 * @description 跳转，多级选择
 */
import {getGoodsLinksData} from '@/server/adapter';
import treeTransfer from '@/commonComponents/elTreeTransfer'; 
export default {
    name: '',
    props:{
        selectedModalId:Array
    },
    data() {
        
        return {
            mode: "transfer",
            title:['选择商品分类','已选商品分类'],
            dialogelGoodsLinks: false,
            value:'',
            fromData: [],
            path:'',
            toData:[],
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
        this.defaultToDataArr=this.selectedModalId;
    },
    mounted(){
        this.dialogelGoodsLinks = true;
        let that=this;
        let newData=[];
        (async () => {
            newData=await getGoodsLinksData(6);
            that.$nextTick(()=>{
                if(newData.data.code===200){
                    // this.setKeyVal(newData.data.data.data);
                    //深度拷贝未选择分类列表
                    that.fromData= JSON.parse(JSON.stringify(newData.data.data.data));
                    //赋值已选择分类列表
                    if(that.defaultToDataArr){
                        newData.data.data.data.forEach((item,i)=>{
                            let flag=false;
                            item.children.forEach((itemj,j)=>{
                                that.defaultToDataArr.forEach((itemk)=>{
                                    if(itemk==itemj.id){
                                        if(flag===false){
                                            that.toData.push(item);
                                            item.children=[];
                                            flag=true;
                                        }
                                        item.children.push(itemj);
                                    }
                                })
                            })
                        })
                        if(this.flagOld){
                            that.oldToData=that.toData;
                            this.flagOld=false;
                        }
                        
                        //移除已选分类列表
                        that.fromData.forEach((item,i)=>{
                            that.fromData[i].children= item.children.filter((items)=>{
                                return !that.defaultToDataArr.includes(items.id.toString())
                            })
                        })
                        //移除空一级菜单
                        that.fromData=that.fromData.filter((item)=>{
                            return item.children.length!=0
                        })
                    }
                    that.path=newData.data.data.path;
                }else{
                    that.$message.error('网络错误!');
                }
            })
        })();
    },
    methods: {
        submit(){
            this.dialogelGoodsLinks = false;
            let newDatas={};
            newDatas.data=this.toData;
            newDatas.path=this.path;
            this.$emit('geturl',newDatas,'',false);
        },
        close() {
            //确定按钮
            this.dialogelGoodsLinks = false;
            let newDatas={};
            newDatas.data=this.oldToData;
            newDatas.path=this.path;
            this.$emit('geturl','','',false);
        },
        handleClose(){
            let newDatas={};
            newDatas.data=this.oldToData;
            newDatas.path=this.path;
            this.$emit('geturl',newDatas,'',false);
        },
        // 监听穿梭框组件添加
        add(fromData,toData,obj){
            this.fromData=fromData;
            this.toData=toData;
        },
        // 监听穿梭框组件移除
        remove(fromData,toData,obj){
            this.fromData=fromData;
            this.toData=toData;
        },
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-elGoodsLinks{
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
    }
}
</style>