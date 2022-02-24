<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-linDropDrown">
        <el-select v-model="optionsVal['optionsVal'+indexs]"   placeholder="请选择跳转链接" size="mini" >
            <el-option
            v-for="(itemLink,index) in linkList" :key="index" @click.native="handleClick(itemLink.nameEn,itemLink.linkListId,item)"
            :label="itemLink.nameCh"
            :value="itemLink.linkListId">
            </el-option>
        </el-select>
        <component :is="menuValue" :selectedModalId="selectedModalId"   :selectOrder="selectId" @geturl="geturl" v-if="openModal"></component>
    </div>
</template>

<script>
import elGoodsDetail from "../linkDialog/elGoodsDetail.vue";
import elGoodsList from "../linkDialog/elGoodsList.vue";
import elMarketingDetail from "../linkDialog/elMarketingDetail.vue";
import elMarketingList from "../linkDialog/elMarketingList.vue";
import elGoodsLinks from "../linkDialog/elGoodsLinks.vue";
export default {
    name: '',
    props:{
        comProps:Object,
        selComponentId:Number,
        item:Object,
        indexs:Number,
        uploadImageOrder:Number
    },
    data() {
        return {
            newComProps:{},
            menuValue:'',//跳转链接
            newUploadImageOrder:this.uploadImageOrder,
            openModal:true,
            linkList:[
                    {
                        nameCh:"商品详情",
                        nameEn:"elGoodsDetail",
                        linkListId:0
                    },{
                        nameCh:"商品列表",
                        nameEn:"elGoodsList",
                        linkListId:1
                    },
                    {
                        nameCh:"营销活动列表",
                        nameEn:"elMarketingList",
                        linkListId:2
                    },{
                        nameCh:"营销活动详情",
                        nameEn:"elMarketingDetail",
                        linkListId:3
                    },{
                        nameCh:"商品分类",
                        nameEn:"elGoodsLinks",
                        linkListId:4  
                    }
                ],
            selectId:0,
            optionsVal:{
                optionsVal0:null,
                optionsVal1:null,
                optionsVal2:null,
                optionsVal3:null,
                optionsVal4:null,
            },
            selectedModalId:[],//已选商品分类id集合
        }
    },
    components: {
        elGoodsDetail,
        elGoodsList,
        elMarketingDetail,//营销活动详情
        elMarketingList,//营销活动列表
        elGoodsLinks,//商品列表
    },
    created(){
    },
    mounted(){
    },
    methods: {
        geturl(data,name,closeModal){//获取子组件跳转的地址
            let that=this;
            this.openModal=closeModal;
            //处理商品列表
            if(data&&this.selectId===4){
                this.setComProps(data);
            //营销活动详情和营销活动列表
            }else{
                if(Object.prototype.toString.call(this.newComProps.item)==='[object Array]'){
                    this.newComProps.item.some((el,i) => {
                        if(el.order===that.newUploadImageOrder){
                            that.newComProps.item[i].imgLink=data;
                            that.newComProps.item[i].name=name;
                            that.newComProps.item[i].linkListId=that.selectId;
                            that.$emit('newComPropsChild',that.newComProps,that.selComponentId);
                            return true;
                        }
                    });
                }else{
                    this.newComProps.item.link=data;
                    this.newComProps.item.linkListId=this.selectId;
                    this.$emit('newComPropsChild',this.newComProps);
                }
               
            }
        },
        setComProps(data){
            let that=this;
            if(Object.prototype.toString.call(data.data)==='[object Array]'){
                let arr=[];
                data.data.forEach(element => {
                    if(element.children){
                        element.children.forEach((el)=>{
                            arr.push(el.id);
                        })
                    }
                });
                if(Object.prototype.toString.call(this.newComProps.item)==='[object Array]'){
                    this.newComProps.item.some((el,i) => {
                        if(el.order===that.newUploadImageOrder){
                            if(data.path.includes('?')){
                                that.newComProps.item[i].imgLink=data.path+"&id="+arr;
                            }else{
                                that.newComProps.item[i].imgLink=data.path+"?id="+arr;
                            }
                            
                            // el.name=name;
                            that.newComProps.item[i].linkListId=4;
                            that.$emit('newComPropsChild',that.newComProps,that.selComponentId);
                            return true;
                        }
                    });
                }else{
                    if(data.path.includes('?')){
                        this.newComProps.item.link=data.path+"&id="+arr;
                    }else{
                        this.newComProps.item.link=data.path+"?id="+arr;
                    }
                    
                    // el.name=name;
                    this.newComProps.item.linkListId=4;
                    this.$emit('newComPropsChild',this.newComProps);
                }
            }
        },
        handleClick(el,index,item){
            if(item){
                if(item.imgLink&&Object.prototype.toString.call(item.imgLink)==="[object String]"){
                    this.selectedModalId=item.imgLink.split('id=')[1].split(',');
                }else{
                    this.selectedModalId=[];
                }
                if(item.order){
                    this.newUploadImageOrder=item.order;
                    this.$emit('newOrder',this.newUploadImageOrder);
                }
            }
            this.openModal=true;
            this.menuValue=el;
            this.selectId=index;
        },
    },
    watch:{
        comProps:{
            immediate:true,//初始值执行handler的函数
            handler(val,oldVal){
                this.newComProps=JSON.parse(JSON.stringify(this.comProps));
            },
            deep:true
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-linDropDrown{
    /deep/ .el-card{
        margin-bottom: 10px;
        .el-card__body{
            .el-dropdown{
                .el-button--mini{
                    line-height: normal;
                }
            }
        }
    }
}
</style>