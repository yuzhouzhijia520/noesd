<template>
    <div id="shop_list">
        <el-row class="search">
            <el-col :span="2" >
                <router-link :to="{path:'/wf/admin/shop/newshop_list/newadd_goods' , query: {otheruuid: otheruuid }}">
                    <el-button type="primary" size="mini" >新建商品</el-button>
                </router-link>
            </el-col>
            <el-col :span="16">
                <!-- 选择器 -->
                <el-select
                v-model="select"
                placeholder="请选择分类"
                class="input_size"
                size="mini"
                @change="changeSelect"
                :props="defaultProps">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.type_name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-select class="input_size" v-model="statu" size="mini" @change="changeStatus">
                    <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input class="search-input" 
                style="width:20rem;margin-right:1.875rem;" 
                v-model="pro_name" size="mini" 
                placeholder="输入您要搜索的商品名称"
                @keyup.enter.native="searchClick"></el-input>
                <el-button type="primary" class="input_size search-btn" size="mini"  @click="searchClick" :loading="loadingSearch">搜索</el-button>
                <el-select
                v-model="settingVal"
                placeholder="批量设置"
                class="input_size"
                size="mini"
                @change="changeSetting"
                @visible-change="handleSelctVis">
                    <el-option
                    v-for="(item,index) in settingState"
                    :key="index"
                    :label="item.label"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <my-table :tableData="tableData" :columns="columnsApp"  :page-size='pageSize' :mutiSelect="true" @multipleSelection="multipleSelection" :totalPage="pageCount"  :currentPage="getPage" @currentChange="search" v-if="flagPage"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {batchGood} from '@/server/addgoods';
export default {
    name: 'shop_edit_goods',
    data() {
        return {
            otheruuid:require('uuid/v1')(),
            loadingSearch:false,
            selectedOptions: [], //分类级联选择器
            options: [],
            settingState:[
                {
                    label:'批量下架',
                    id:0
                },
                {
                    label:'批量上架',
                    id:1
                },
                {
                    label:'批量删除',
                    id:2
                },
                // {
                //     label:'批量设置积分',
                //     id:3
                // }
            ],
            defaultProps: { // 分类级联选择器配置选项
                value: 'id',
                label: 'type_name',
                children: 'children'
            },
            select: '',
            settingVal:'',
            pageSize: 10,
            getPage: 1,
            pageCount: 0,
            statu: '全部状态',
            prop_statu: '2',
            columnsApp: [
                { 
                    label: "商品",
                    width: "100",
                    align: "center",
                    renderHeader:(h, {column,$index}) => {
                        return (h('span', [
                                    h('span', {slot: 'reference', trigger: 'hover'}, '商品'),
                                    h('el-popover', {
                                    props: {
                                        placement: 'top-start',
                                        width: '200',
                                        trigger: 'hover',
                                        content: '点击商品图片可预览',
                                    }
                                    }, [
                                    h('i', {
                                        slot: 'reference',
                                        class: 'el-icon-question',
                                        style: {
                                        display: 'inline-block' 
                                        },
                                    }, '')
                                    ]),
                                ])
                            )   
                    },
                    render:(h, param) => {
                        let b = h("div",{
                            class: "wf-presale-type"
                        },"预售")
                        let a = [
                            h('img', {
                                attrs: {
                                    'src':param.row.master_graph,
                                    preview: param.row.id,
                                    style:"width:60px;height:60px;border:1px solir #333;box-sizing:border-box;"
                                }
                            }),
                            param.row.advance_sale===1?b:""
                        ];
                        return a;
                    }
                },
                { 
                    prop: "good_name", 
                    label: "商品名称",
                    align: "left"
                },
                { 
                    prop: "price_range", 
                    label: "成交价",
                    align: "left"
                },
                { 
                    prop: "type_name", 
                    label: "分类",
                    align: "center"
                },
                {
                    prop: "status", 
                    label: "状态",
                    align: "center",
                    render:(h, param) => {
                        if(param.row.state===1){
                            return [h('div', {}, '已上架')];
                        }else{
                            return [h('div', {}, '已下架')];
                        }
                    }
                },
                { 
                    prop: "good_stock", 
                    label: "库存",
                    align: "center"
                },
                { 
                    prop: "good_sales", 
                    label: "销量",
                    align: "center"
                },
                { 
                    prop: "orderby", 
                    label: "排序",
                    width:'50',
                    align: "center"
                },
                { 
                    prop: "create_time", 
                    label: "时间",
                    align: "center"
                },
                {
                    label: "操作",
                    align: "left",
                    width: "300",
                    render:(h, param) => {
                        let that=this;
                        let state=[];
                        if(param.row.state===1){
                            state=h('el-button', {
                                class:'gray',
                                attrs:{
                                    style:"font-size:14px;margin-left: 50px;padding:0;"
                                },
                                props: {
                                    size: "mini",
                                    type: "text",
                                },
                                on:{
                                    click:()=>{
                                        that.changeState(param.row)
                                    }
                                }
                            }, '下架');
                        }else{
                            state=h('el-button', {
                                class:'gray',
                                attrs:{
                                    style:"font-size:14px;margin-left:50px;padding:0;"
                                },
                                props: {
                                    size: "mini",
                                    type: "text",
                                },
                                on:{
                                    click:()=>{
                                        that.changeState(param.row)
                                    }
                                }
                            }, '上架');
                        }
                        let editg=h('el-button', {
                            class:'gray',
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs: {
                                style: "padding:0;font-size:14px;"
                            },
                            on:{
                                click:()=>{
                                    that.edit(param.row);
                                }
                            }
                        }, '编辑');
                        let deleteBtn=h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(230, 126, 122);font-size:14px;padding:0;"
                            },
                            on:{
                                click:()=>{
                                    that.deleteGoods(param.row);
                                }
                            }
                        }, '删除');
                        return [state,editg,deleteBtn];
                    }
                }
            ],
            status: [
                {
                value: '2',
                label: '全部状态'
            },{
                value: '1',
                label: '已上架'
            },{
                value: '0',
                label: '已下架'
            }
            ],
            tableData: [],
            pro_name: '',
            goodSelectedId:[],//批量设置被选择的ID的集合
            flagPage:true
        }
    },
    components: {
        MyTable
    },
    created: function(){
        this.classList();
        if(localStorage.getItem('page')){
            if(localStorage.getItem('goodListPage')){
                this.getPage=localStorage.getItem('goodListPage');
            }
            if(localStorage.getItem('goodListGood_type')){
                this.selectedOptions=localStorage.getItem('goodListGood_type');
            }
            if(localStorage.getItem('goodListRecommend')){
                this.prop_statu=localStorage.getItem('goodListRecommend');
            }
            if(localStorage.getItem('goodListGood_name')){
                this.pro_name=localStorage.getItem('goodListGood_name');
            }
        }else{
            if(localStorage.getItem('goodListPage')){
                localStorage.removeItem('goodListPage');
            }
            if(localStorage.getItem('goodListGood_type')){
                localStorage.removeItem('goodListGood_type');
            }
            if(localStorage.getItem('goodListRecommend')){
                localStorage.removeItem('goodListRecommend');
            }
            if(localStorage.getItem('goodListGood_name')){
                localStorage.removeItem('goodListGood_name');
            }
        }
        this.search(this.getPage);
    },
    methods: {
        searchClick(){
            this.loadingSearch=true;
            this.search(1);
        },
        handleSelctVis(e){
            if(e){
                this.changeSetting(this.settingVal)
            }
        },
        //批量设置
        changeSetting(val){
            if(Object.prototype.toString.call(this.goodSelectedId)==='[object Array]'){
                debugger
                if(this.goodSelectedId.length>0){
                    debugger
                    if(val===0){
                        this.$confirm('此操作将下架所选商品, 是否继续?', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            localStorage.setItem("good_shelf",val)
                            this.handleSetting(val);
                        }).catch(() => {
                            if(localStorage.getItem("good_shelf")){
                                this.settingVal = parseInt(localStorage.getItem("good_shelf"))
                            }
                            this.$message.info("已取消下架");          
                        });
                    }else if(val===2){
                        this.$confirm('此操作将删除所选商品, 是否继续?', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            localStorage.setItem("good_shelf",val)
                            this.handleSetting(val);
                        }).catch(() => {
                            if(localStorage.getItem("good_shelf")){
                                this.settingVal = parseInt(localStorage.getItem("good_shelf"))
                            }
                            this.$message.info("已取消删除");          
                        });
                    }else if(val===3){
                        //处理批量设置积分
                    }else if(val===1){
                        //状态1 批量上架
                        this.settingVal = ""
                        localStorage.setItem("good_shelf",val)
                        this.handleSetting(val);
                    }else{
                        this.settingVal = "";
                    }
                }else if(val===0||val===1||val===2){
                    this.settingVal = ""
                    this.$message.warning('请选择商品');
                }
            }
            
        },
        handleSetting(val){
            let that=this;
            let goods_id=this.goodSelectedId.map(item=>item.id).join(',');
            let data={
                secret:localStorage.getItem('secretId'),
                type:val,
                goods_id:goods_id
            }
            // if(val==3){
            //     data.integral_type=
            // }
            batchGood(data).then((item)=>{
                if(item.data.code===200){
                    that.settingVal = ""
                    that.goodSelectedId=[]
                    that.search(1);
                    that.$message.success(item.data.msg);
                }
            }).catch((err)=>{
                that.$message.error('网络错误');
            })
            
        },
        multipleSelection:function(val){
             this.goodSelectedId=val;
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
        changeSelect(e){
            this.selectedOptions = e
        },
        edit(e){  //商品编辑
            this.$router.push({path:"/wf/admin/shop/shop_list/newadd_goods",name:'newadd_goods',query:{param:'edit',id:e.id,page:this.getPage,otheruuid: this.otheruuid}})
        },
        stateFormatter(row) {
            if(row.state==1){
                return '已上架';
            }else{
                return '已下架'
            }
        },
        changeStatus(e){
            this.prop_statu = e
        },
        changeState(e){ //改变商品上下架状态
            let that = this
            if(e.state==0){
                e.state = 1
            }else{
                e.state = 0
            }
            this.$axios.post(this.url + 'shopapi/Goods/grounding',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')+
            '&id='+e.id+
            '&state='+e.state
            )
            .then(function(res){
                if(res.data.code==1){
                    that.search(that.getPage)
                    that.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                }else{
                    that.$message({
                        showClose: true,
                        message: '修改失败',
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
            })
        },
        deleteGoods(e){
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                this.$axios.post(this.url + 'shopapi/Goods/delGood', //删除商品接口
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&id='+e.id
                )
                .then(function(res){
                    if(res.data.code==1){
                        that.search(that.getPage)
                        that.$message.success("删除成功");
                    }else{
                        that.$message.error("删除失败")
                    }
                })
                .catch(function (error) {
                    that.$message.error("网络错误")
                })
            }).catch(() => {
                this.$message.info("已取消删除");          
            });
        },
        search(current){ // 搜索接口
            this.getPage=current;
            if(localStorage.getItem('page')){
                this.getPage=parseInt(localStorage.getItem('page'));
                localStorage.removeItem('page');
            }
            localStorage.setItem("goodListPage",this.getPage);
            localStorage.setItem("goodListGood_type",this.selectedOptions);
            localStorage.setItem("goodListRecommend",this.prop_statu);
            localStorage.setItem("goodListGood_name",this.pro_name);
            let that = this
            this.$axios.post(this.url + 'shopapi/Goods/index',
            '&secret='+localStorage.getItem('secretId')+
            '&page='+that.getPage+
            '&good_type='+that.selectedOptions+
            '&recommend='+that.prop_statu+
            '&good_name='+that.pro_name
            )
            .then(function(res){
                that.loadingSearch=false;
                if(res.data.code==1){
                    that.tableData = res.data.data
                    that.flagPage=false;
                    that.$nextTick(()=>{
                        that.flagPage=true;
                    })
                    if(res.data.count<1){
                        that.pageCount = 0
                    }else{
                        that.pageCount = res.data.count
                    }
                }else{
                }
            })
            .catch(function (error) {
                that.loadingSearch=false;
                that.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                })
            })
        }
    },
    destroyed() {
        localStorage.removeItem("good_shelf")
    }
}
</script>

<style lang="scss">
#shop_list{
    background-color: #fff;
    padding: 20px;
    .td.el-table_1_column_1{
        padding:7px 0;
    }
    .input_size{
        margin-right: 1.875rem;
    }
    .input_size input{
        width: 7.5rem;
        height: 2.125rem;
    }
    .search-input input{
        height:2.125rem;
    }
    .search{
        margin-bottom: 30px;
        clear: both;
    }
    .el-pagination{
        background: white;
        text-align: center;
        padding: 20px 0;
    }
    .el-table{
        border-radius: 4px;
    }
    .search-btn{
        width:88px;
        height:2rem;
        margin-top:1px;
        margin-right: 1.875rem ;
    }
    .el-button--primary{
        background: #719FF8;
    }
    .wf-presale-type{
        width: 28px;
        height: 22px;
        background: #E9473C;
        border-radius: 4px 0px 6px 0px;
        color: #fff;
        font-size: 12px;
        position: relative;
        top: -66px;
        left: 8px;
    }
}
</style>
