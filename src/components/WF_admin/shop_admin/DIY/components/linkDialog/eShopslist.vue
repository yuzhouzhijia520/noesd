<template>
    <div>
        <!-- <el-button type="text" @click="getShopTableData">商品详情</el-button> -->

        <el-dialog  :visible.sync="eShopslist"
            :before-close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleClick"  >
                <el-tab-pane :label="item.tabname" :name="item.name" v-for="(item,index) in tabList" :key="index">
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
                    v-model="search"
                    size="mini"
                    placeholder="搜索商品名称"/>
                    
                    <my-table :tableData="tableData" :ref="'table'+index" :mutiSelect="true" @multipleSelection="multipleSelection" :shopSelecteds="shopSelected"  :columns="columns" :totalPage="totalPage" :pageSize="pageSize" :currentPage="currentPage" @currentChange="ShopTableData"
                    :selectIdArrFlag="selectIdArrFlag"
                    :selectIdArr="selectParams"></my-table>
                </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="dialogShopVisibleClose">取 消</el-button>
                    <el-button size="mini" type="primary" @click="handleDialogShopVisible">确 定</el-button>
                </div>
        </el-dialog>  
   </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    props:{
        selectParams:Array,
        componetType:String,
        selectIdArrFlag:{type:Boolean,default:false}
    },
    data(){
        return {
            // newSelectParams:[],
            activeName: 'first',
            parentType:[],
            parentTypeVal:'',
            tabindex:0,//选中的下表
            childrenType:[],
            select:'',
            childrenTypeVal:'',
            tableData: [],
            totalPage:0,
            currentPage:1,
            search:'',
            pageSize:5,
            options:[],
            //选择商品
            dialogShopVisible:false,
            tabList:[//表格呗的nav
                {
                    tabname:'全部商品',
                    name:'first'
                },
                {
                    tabname:'推荐商品',
                    name:'second'
                },
                {
                    tabname:'最热商品',
                    name:'three'
                },
                {
                    tabname:'最新商品',
                    name:'four'
                }
            ],
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
                    label: "二级分类",
                    align: "center",
                },
                    {   prop: "concessional_rate", 
                    label: "单价（元）",
                    align: "center",
                },
                    {   prop: "create_time", 
                    label: "创建时间",
                    align: "center",
                }
            ],
            shopSelected:[],//所有选中的数据包含跨页数据
            shopSelect:[],// 当前页选中的数据
            shopSelectedId:'',
            newShopFlag:false,
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
        this.getShopTableData(this.currentPage);
        this.classList()
        if(this.newShopFlag===true){
            this.getHandleEditShop();
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
            handleDialogShopVisible:function(){
                this.dialogShopVisible=false;
                let submitFlag=true;
                this.$emit('handleShopslist',this.dialogShopVisible);
                this.$emit("shopSelectedId",this.shopSelected,this.path,submitFlag);
                this.$emit('editshopgroup',this.shopSelected,false)
                // this.wfSelectShopName="选择商品";
                // this.showShopTage=false;
                // if(this.shopSelectedIdA&&this.shopSelectedIdA.length>0){
                //     this.wfSelectShopNum=this.shopSelectedIdA.length;
                //     this.wfSelectShopName="修改商品";
                //     this.showShopTage=true;
                // }
            },
            getHandleEditShop:function(){
                let that=this;
                let data={
                    secret:localStorage.getItem('secretId'),
                    coupon_other_id:localStorage.getItem('coupon_other_id'),
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
                        that.$message.error('系统出错，请联系管理员!');
                    }
                }).catch(err=>{
                    that.$message.error('系统出错，请联系管理员!');
                });
            },
            setSelectRow() {
                if(this.selectParams&&this.shopSelected.length===0){
                    this.shopSelected=JSON.parse(JSON.stringify(this.selectParams));
                }
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
                this.$refs['table'+this.tabindex][0].$refs.multipleTable.clearSelection();
                for(var i = 0; i < this.tableData.length; i++) {                    
                    if (selectAllIds.includes(this.tableData[i][idKey])) {
                        // 设置选中，记住table组件需要使用ref="table"
                        this.$refs['table'+this.tabindex][0].$refs.multipleTable.toggleRowSelection(this.tableData[i], true);
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
                    this.$emit("shopSelectedId",this.shopSelected,this.path);
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
                this.$emit("shopSelectedId",this.shopSelected,this.path);
            },
        //单行选中回调函数
        // select:function(selection,row){
            
        // },
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
        },
        //清除历史数据
        cleanVal:function(){
            this.parentTypeVal='';
            this.childrenTypeVal='';
        },
        handleClick(tab, event) {
            let that = this
            this.currentPage=1;
            that.tabindex= tab.index
            let data
            if(that.tabindex == 0 || that.tabindex == 1){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    recommend:that.tabindex,
                }
            }else if(that.tabindex == 2){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    sale:1
                 }
            }else if(that.tabindex == 3){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    sale:2
                 }
            }
            
            this.$axios({
                 url:this.url + 'shopapi/shop_decoration/shopMarketing',
                 method:'post',
                 data:data
             }).then(res=>{
                 if(res.data.code === 200){
                    that.tableData=res.data.data.info;
                    that.totalPage=res.data.data.num;
                    that.currentPage=res.data.data.page;
                    //获取数据后设置默认选择效果
                    setTimeout(()=>{
                        this.setSelectRow();
                    }, 50)
                 }else{
                    that.$message.error('系统出错，请联系管理员!');
                }

             })
        },
        handleClose(){
            this.$emit('geturl','',false);
            // this.eShopslist =false;
            this.$emit('handleShopslist',false);
             this.$emit('editshopgroup',false);
        },
        clearFilter(){//刷新页面
            let that = this
            let data
            if(that.tabindex == 0 || that.tabindex == 1){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    recommend:that.tabindex,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                }
            }else if(that.tabindex == 2){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    sale:1,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                 }
            }else if(that.tabindex == 3){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    sale:2,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                 }
            }
            this.$axios({
                 url:this.url + 'shopapi/shop_decoration/shopMarketing',
                 method:'post',
                 data:data
             }).then(res=>{
                 if(res.data.code == 200){
                     that.$message({
                        message: '刷新成功',
                        type: 'success'
                    });
                    that.tableData=res.data.data.info;
                    that.totalPage=res.data.data.num;
                    that.currentPage=res.data.data.page;
                    //获取数据后设置默认选择效果
                    setTimeout(()=>{
                        this.setSelectRow();
                    }, 50)
                 }else{
                    that.$message.error('系统出错，请联系管理员!');
                }

             })
        },
        searchelGoodsList(){//搜索
            let that = this
            let data
            if(that.tabindex == 0 || that.tabindex == 1){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:1,
                    recommend:that.tabindex,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                }
            }else if(that.tabindex == 2){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:1,
                    sale:1,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                 }
            }else if(that.tabindex == 3){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:1,
                    sale:2,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                 }
            }
            this.$axios({
                 url:this.url + 'shopapi/shop_decoration/shopMarketing',
                 method:'post',
                 data:data
             }).then(res=>{
                 if(res.data.code == 200){
                     that.tableData=res.data.data.info;
                    that.totalPage=res.data.data.num;
                    that.currentPage=res.data.data.page;
                    //获取数据后设置默认选择效果
                    setTimeout(()=>{
                        this.setSelectRow();
                    }, 50)
                 }else{
                    that.$message.error('系统出错，请联系管理员!');
                 }

             })
        },
        //获取选择商品table数据
        getShopTableData:function(current){
            let that=this;
            this.currentPage=current;
            let data
            if(that.tabindex == 0 || that.tabindex == 1){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    recommend:that.tabindex,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                }
            }else if(that.tabindex == 2){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    sale:1,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                 }
            }else if(that.tabindex == 3){
                 data={
                    token:localStorage.getItem('userId'),
                    secret:localStorage.getItem('secretId'),
                    id:this.marketing_id,
                    page:this.currentPage,
                    sale:2,
                    type_id:that.type_id,
                    good_name_keyword:that.search
                 }
            }
            this.$axios.post(this.url+'shopapi/shop_decoration/shopMarketing',data).then(res=>{
                if(res.data.code===200){
                    that.path=res.data.data.path;
                    that.tableData=res.data.data.info;
                    that.totalPage=res.data.data.num;
                    that.currentPage=res.data.data.page;
                    //获取数据后设置默认选择效果
                    setTimeout(()=>{
                        this.setSelectRow();
                    }, 50)
                }else{
                    that.$message.error('系统出错，请联系管理员!');
                }
            }).catch(err=>{
                that.$message.error('系统出错，请联系管理员!');
            });
        },
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
    .input_size input{
        // width: 7.5rem;
        // height: 2rem;
    }
    .close{
        text-align: center;margin:0 auto;
        margin-top: 15px;
    }
</style>