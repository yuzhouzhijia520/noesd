<template>
    <div>
        <el-form class="demo-ruleForm">
            <el-row class="wf-addCoupon-Shop-row">
                <el-col :span="5" class="wf-addCoupon-Shop-col-5">
                    <el-input  size="mini" v-model="coupon_name" placeholder="商品名称"></el-input>
                </el-col>
                <el-col :span="6" class="wf-addCoupon-Shop-col-6">
                    <el-select size="mini" v-model="parentTypeVal" @change="handleChange" placeholder="父分类">
                        <el-option v-for="item in parentType" :key="item.id" :label="item.type_name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="wf-addCoupon-Shop-col-6">
                    <el-select size="mini" v-model="childrenTypeVal" @change="handleChildrenChange" placeholder="子分类">
                        <el-option v-for="item in childrenType" :key="item.id" :label="item.type_name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-button size="mini" type="primary" class="wf-addCoupon-Shop-searchShop" @click="searchShop">搜索</el-button>
            </el-row>
        </el-form>
        <my-table 
        :tableData="tableData" 
        ref="table" 
        :mutiSelect="true" 
        @multipleSelection="multipleSelection" 
        :shopSelecteds="shopSelected"  
        :columns="columns" 
        :totalPage="totalPage" 
        :pageSize="pageSize" 
        :currentPage="currentPage" 
        @currentChange="ShopTableData">
        </my-table>
   </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    props:{
        shopFlag:Boolean,
        selectParams:Array,
        selectedShops:Array,
        selectedCardId:Number,
        limit:Number,
        shopSelectedIdS:String
    },
    data(){
        return {
                coupon_name:'',
                parentType:[],
                parentTypeVal:'',
                childrenType:[],
                childrenTypeVal:'',
                tableData: [],
                totalPage:0,
                currentPage:1,
                currentChange:0,
                pageSize:5,
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
                        label: "名称",
                        align: "center",
                    },
                    {   prop: "type_name", 
                        label: "分类",
                        align: "center",
                    }
                ],
                shopSelected:[],//所有选中的数据包含跨页数据
                shopSelect:[],// 当前页选中的数据
                shopSelectedId:'',
                newShopFlag:false
        }
    },
    components: {
        MyTable
    },
    mounted(){
        this.cleanVal();
        this.newShopFlag=this.shopFlag;
        //获取父分类
        this.getParentType();
        this.getShopTableData(this.currentPage);
        if(this.newShopFlag===true){
            this.getHandleEditShop();
        }

    },
    methods: {
            getHandleEditShop:function(){
                let that=this;
                let data={
                    secret:localStorage.getItem('secretId'),
                    coupon_other_id:this.shopSelectedIdS,
                    page:this.currentPage
                };
                this.$axios.post(this.url+'shopapi/goods/chooseGood',data).then(res=>{
                    if(res.data.code===200){
                        let newShop=[];
                        res.data.data.info.forEach((el,i)=>{
                            if(el.use_state===1){
                                newShop.push(el);
                            }
                        });
                        /**[Array[object]] 合并去重    ---start---*/
                        let hash={};
                        let reduce=[...new Set(that.shopSelected.concat(newShop))];
                        const newArr1 = reduce.reduceRight((item, next) => {
                            hash[next.id] ? '' : hash[next.id] = true && item.push(next);
                            return item
                        }, []);
                        /**[Array[object]] 合并去重    ---end---*/
                        this.shopSelected=newArr1;
                    }else{
                        that.$message.error("网络错误");
                    }
                }).catch(err=>{
                    that.$message.error("网络错误");
                });
            },
            setSelectRow() {
                //初始化的
                if(this.selectParams&&this.shopSelected.length===0){
                    this.shopSelected=this.selectParams;
                }
                //修改后的
                // if(this.updateSelectParams){
                //     this.shopSelected=this.updateSelectParams;
                // }
                if (!this.shopSelected || this.shopSelected.length <= 0) {
                    return;
                }
                // 标识当前行的唯一键的名称
                let idKey = "id";
                let selectAllIds = [];
                let that = this;
                this.shopSelected.forEach(row=>{
                    selectAllIds.push(row[idKey]);
                });
                //多层组件传值
                if(this.$refs.table.$refs){
                    this.$refs.table.$refs.multipleTable.clearSelection();
                    for(var i = 0; i < this.tableData.length; i++) {                    
                        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
                            // 设置选中，记住table组件需要使用ref="table"
                            this.$refs.table.$refs.multipleTable.toggleRowSelection(this.tableData[i], true);
                        }
                    }
                }
                
            },
            // 记忆选择核心方法
            changePageCoreRecordData () {
                // 标识当前行的唯一键的名称
                let idKey = "id";
                let that = this;
                // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
                if (this.shopSelected.length <= 0) {
                    this.shopSelected = this.shopSelect;
                    this.$emit("shopSelectedId",this.shopSelected);
                    return;
                }
                // 总选择里面的key集合
                let selectAllIds = [];
                this.shopSelected.forEach(row=>{
                    selectAllIds.push(row[idKey]);
                })
                let selectIds = []
                // 获取当前页选中的id
                this.shopSelect.forEach(row=>{
                    selectIds.push(row[idKey]);
                    // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
                    if (selectAllIds.indexOf(row[idKey]) < 0) {
                        that.shopSelected.push(row);
                    }
                })
                let noSelectIds = [];
                // 得到当前页没有选中的id
                this.tableData.forEach(row=>{
                    if (selectIds.indexOf(row[idKey]) < 0) {
                        noSelectIds.push(row[idKey]);
                    }
                })
                noSelectIds.forEach(id=>{
                    if (selectAllIds.indexOf(id) >= 0) {
                        for(let i = 0; i< that.shopSelected.length; i ++) {
                            if (that.shopSelected[i][idKey] == id) {
                                // 如果总选择中有未被选中的，那么就删除这条
                                that.shopSelected.splice(i, 1);
                                break;
                            }
                        }
                    }
                });
                // if(this.limit>0){
                //     if(this.shopSelected.length>this.limit){
                //         this.$message.warning('选择已超出限制,限制选择'+this.limit+'条!');
                //         return false;
                //     }
                // }
                this.$emit("shopSelectedId",this.shopSelected);
            },
        //单行选中回调函数
        select:function(selection,row){
            
        },
        //table的checkbok回调
        multipleSelection:function(val){
            
            this.shopSelect = val;
            //实时记录选中的数据
            setTimeout(()=>{
                this.changePageCoreRecordData();
            }, 50);
        },
        ShopTableData:function(current){
            this.changePageCoreRecordData();
            if(this.totalPage>0) {
                this.getShopTableData(current);
                if(this.newShopFlag===true){
                    this.getHandleEditShop();
                }
            }
            // let rows=this.shopSelected;
            // let that =this;
            // if (rows) {
            //     rows.forEach(row => {
            //         that.$refs.multipleTable.toggleRowSelection(row);
            //     });
            // } else {
            //     that.$refs.multipleTable.clearSelection();
            // }
        },
        //清楚历史数据
        cleanVal:function(){
            this.parentTypeVal='';
            this.childrenTypeVal='';
        },
        //子分类钩子
        handleChildrenChange:function(val){
            this.childrenTypeVal=val;
            this.$emit("handleChildrenChangeVal",val);
        },
        //父分类钩子
        handleChange:function(val){
            this.parentTypeVal=val;
            this.$emit("handleChangeVal",val);
            //清空子类历史数据
            this.childrenTypeVal='';
            //获取子分类
            this.getChildrenType();
        },
        //获取子分类
        getChildrenType:function(){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
                type_id:this.parentTypeVal
            };
            this.$axios.post(this.url+'shopapi/goodtype/sonIndex',data).then(res=>{
                if(res.data.code===1){
                    that.childrenType=res.data.data;
                }else{
                   that.$message.error("网络错误");
                }
            }).catch(err=>{
                that.$message.error("网络错误");
            });
        },
        //获取父分类
        getParentType:function(){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId')
            };
            this.$axios.post(this.url+'shopapi/goodtype/fatherIndex',data).then(res=>{
                if(res.data.code===1){
                    that.parentType=res.data.data;
                }else{
                    that.$message.error("网络错误");
                }
            }).catch(err=>{
               that.$message.error("网络错误");
            });
        },
        //搜索商品
        searchShop:function(){
           this.getShopTableData(1);
        },
        //获取选择商品table数据
        getShopTableData:function(current){
            let that=this;
            this.currentPage=current;
            let good_types='';
            if(this.childrenTypeVal){
                good_types=this.childrenTypeVal;
            }else{
                good_types=this.parentTypeVal;
            }
            let data={
                    secret:localStorage.getItem('secretId'),
                    page:current,
                    good_name_keyword:this.coupon_name,
                    good_type:good_types
            };
            this.$axios.post(this.url+'shopapi/goods/chooseGood',data).then(res=>{
                if(res.data.code===200){
                    that.tableData=res.data.data.info;
                    that.totalPage=res.data.data.num;
                    that.currentChange=res.data.data.page;
                    // if(that.editReport){
                    //     res.data.data.info.forEach((itemi,i)=>{
                    //         that.selectedShops.some((itemj,j)=>{
                    //             if(itemi.id==itemj&&!Array.from(that.shopSelected, x => x.id).includes(parseInt(itemj))){
                    //                 that.shopSelected.push(itemi);
                    //                 return true;
                    //             }
                    //         })
                    //     })
                    // }
                    //获取数据后设置默认选择效果
                    setTimeout(()=>{
                        that.setSelectRow();
                    }, 50)
                }else{
                    that.$message.error("网络错误");
                }
            }).catch(err=>{
                that.$message.error("网络错误");
            });
        },
    },
};
</script>

<style >
    
</style>