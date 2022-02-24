<template>
    <div class="wf-modelView">
        <!-- <el-button type="text" @click="getShopTableData">商品详情</el-button> -->

        <el-dialog  :visible.sync="eShopslist"
            :before-close="handleClose"
            center
            title="定金预售商品">
                    <router-link tag="a" target="_blank" :to="{path:'/wf/admin/shop/newshop_list/newadd_goods'}">
                        <el-button  size="mini">新建</el-button>
                    </router-link>
                    <el-button @click="clearFilter"  size="mini">刷新</el-button>
                    <el-button @click="searchelGoodsList" style="float:right"  size="mini">搜索</el-button>
                    <el-select
                        style="float:right;margin-right:10px;margin-left:20px;width:7rem;"
                        v-model="select"
                        placeholder="请选择分类"
                        size="mini"
                        @change="changeSelect"
                        >
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.type_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input
                    v-model="good_name_keyword"
                    size="mini"
                    placeholder="搜索商品名称"/>
                    
                    <my-table :tableData="tableData" ref="table"  :shopSelecteds="shopSelected"  :columns="columns" :totalPage="totalPage" :pageSize="pageSize" :currentPage="currentPage" @currentChange="ShopTableData"
                    :selectIdArrFlag="selectIdArrFlag"
                    :selectIdArr="selectParams"></my-table>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="dialogShopVisibleClose">关闭</el-button>
                </div>
        </el-dialog>  
   </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from "@/untils/common.js";
export default {
    props:{
        selectParams:Array,
        componetType:String,
        selectIdArrFlag:{type:Boolean,default:false}
    },
    data(){
        return {
            // newSelectParams:[],
            parentType:[],
            parentTypeVal:'',
            tabindex:0,//选中的下表
            childrenType:[],
            select:'',
            childrenTypeVal:'',
            tableData: [],
            totalPage:0,
            currentPage:1,
            good_name_keyword:'',
            pageSize:5,
            options:[],
            //选择商品
            dialogShopVisible:false,
            columns: [
                {   prop: "master_graph", 
                    label: "图片",
                    align: "center",
                    render:(h, param) => {
                        let a = [h('img', {
                                attrs: {
                                    'src':param.row.master_graph,
                                    'alt':"万帆",
                                    style:"width:50px;height:50px"
                                }
                            })];
                        return h('div', a);
                    }
                },
                {   prop: "good_name", 
                    label: "商品",
                    align: "center",
                },{   
                    prop: "original_price", 
                    label: "单价(元)",
                    align: "center",
                },
                {   prop: "type_name", 
                    label: "二级分类",
                    align: "center",
                },
                {   
                    label: "创建时间",
                    align: "center",
                    render:(h,param)=>{
                        let a=dateFormat(param.row.create_time,"{y}-{m}-{d} {h}:{m}");
                        return h('div', a);
                    }
                },
                {   
                    label: "操作",
                    align: "center",
                    render:(h, param) => {
                        let a = [h('el-button', {
                            props:{
                                size:'mini'
                            },
                            on:{
                                click:()=>{
                                    this.dialogShopVisible=false;
                                    let goods={
                                        name:param.row.good_name,
                                        price:param.row.original_price,
                                        id:param.row.id
                                    }
                                    
                                    this.$emit('handleShopslist',this.dialogShopVisible,goods);
                                }
                            }
                        },'选择')];
                        return h('div', a);
                    }
                }
            ],
            shopSelected:[],//所有选中的数据包含跨页数据
            shopSelect:[],// 当前页选中的数据
            shopSelectedId:'',
            newShopFlag:true,
            eShopslist:true,
            marketing_id:1,
            path:'',
            type_id:0,
        }
    },
    components: {
        MyTable
    },
    mounted(){
        this.cleanVal();
        // this.newShopFlag=this.shopFlag;
        this.classList()
        if(this.newShopFlag===true){
            this.getHandleEditShop(this.currentPage);
        }

    },
    methods: {
        changeSelect(e){
            this.type_id=e
        },
        classList(){ // 查询所有分类
            var that=this;
            this.$axios.post(this.url+'shopapi/Goodtype/typeindex',
                'secret='+localStorage.getItem('secretId')+
                '&token='+localStorage.getItem('userId')+
                '&page=' + 1
            ).then(function (res) {
                if(res.data.code==1){
                    let data = res.data.data
                    var list=[]
                    for(var da in data){
                        if(data[da].children.length!=0){
                            for(var i in data[da].children){
                                list.push(data[da].children[i])
                            }
                        }
                        for(var child in data[da].children){
                            if(data[da].children[child].children.length==0){
                                data[da].children[child].children = ''
                            }
                        }
                    }
                    that.options = list
                }else{
                    that.$message.error('请求数据失败，请重新刷新页面');
                }
            })
            .catch(function (error) {
                that.$message.error('请联系管理员');
            });
        },
            dialogShopVisibleClose(){
                this.dialogShopVisible=false;
                this.$emit('handleShopslist',this.dialogShopVisible);
            },
            //选择商品确定事件
            // handleDialogShopVisible:function(){
            //     this.dialogShopVisible=false;
            //     this.$emit('handleShopslist',this.dialogShopVisible);
            //     this.$emit("shopSelectedId",this.shopSelected,this.path);
            //     this.$emit('editshopgroup',this.shopSelected,false)
            //     // this.wfSelectShopName="选择商品";
            //     // this.showShopTage=false;
            //     // if(this.shopSelectedIdA&&this.shopSelectedIdA.length>0){
            //     //     this.wfSelectShopNum=this.shopSelectedIdA.length;
            //     //     this.wfSelectShopName="修改商品";
            //     //     this.showShopTage=true;
            //     // }
            // },
            getHandleEditShop(current){
                let that=this;
                this.currentPage=current;
                let data={
                    secret:localStorage.getItem('secretId'),
                    coupon_other_id:localStorage.getItem('coupon_other_id'),
                    page:this.currentPage,
                    front:1,
                    good_name_keyword:this.good_name_keyword,
                };
                if(this.select){
                    data.good_type=this.select;
                }
                this.$axios.post(this.url+'shopapi/goods/chooseGood',data).then(res=>{
                    if(res.data.code===200){
                        that.tableData=res.data.data.info;
                        that.totalPage=res.data.data.num;
                        that.currentPage=res.data.data.page;
                    }else{
                        that.$message.error('系统出错，请联系管理员!');
                    }
                }).catch(err=>{
                    that.$message.error('系统出错，请联系管理员!');
                });
            },
        ShopTableData:function(current){
            this.getHandleEditShop(current);
        },
        //清除历史数据
        cleanVal:function(){
            this.parentTypeVal='';
            this.childrenTypeVal='';
        },
        handleClose(){
            this.$emit('geturl','',false);
            // this.eShopslist =false;
            this.$emit('handleShopslist',false);
             this.$emit('editshopgroup',false);
        },
        clearFilter(){//刷新页面
            this.getHandleEditShop(1);
        },
        searchelGoodsList(){//搜索
            this.getHandleEditShop(this.currentPage);
        },
        //获取选择商品table数据
        getShopTableData:function(current){
           this.getHandleEditShop(this.currentPage);
        }
  }
};
</script>

<style lang="scss" scoped>
        .el-input{
        width: 200px;
        float: right;
    }
    .el-pagination{
        text-align: center;
        margin-top: 15px;
    }
    .is-active{
        font-size: 16px;
    }
    .close{
        text-align: center;margin:0 auto;
        margin-top: 15px;
    }
</style>