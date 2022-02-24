<template>
    <div id="shop_list">
        <el-row class="search">
            <el-col>
                <!-- 选择器 -->
                <el-col :span="4">
                    <el-col  class="titlelist">
                        商品分类
                    </el-col>
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
                </el-col>
                
                <!-- <el-select class="input_size" v-model="statu" size="mini" @change="changeStatus">
                    <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                <el-col :span="9">
                    <el-col  class="titlelist">
                            商品名称
                        </el-col>
                    <el-input class="search-input" 
                    style="width:20rem;margin-right:1.875rem;" 
                    v-model="pro_name" size="mini" 
                    placeholder="输入商品名称"
                    @keyup.enter.native="searchClick"></el-input>
                    <el-button type="primary" class="input_size search-btn" size="mini"  @click="searchClick" :loading="loadingSearch">搜索</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" class="input_size search-btn" size="mini"  @click="handleSetting" :loading="loadingSearch">批量删除</el-button>
                </el-col>
                <el-col :span="2">
                    <!-- <el-button type="primary" class="input_size search-btn" size="mini"  @click="searchClick" :loading="loadingSearch">添加商品</el-button> -->
                     <!-- <el-col  class="titlelist">
                        
                    </el-col> -->
                    <el-select
                        v-model="addselect"
                        placeholder="添加商品"
                        class="input_size"
                        size="mini"
                        @change="changeSelects"
                        @visible-change="handleSelctVis"
                        >
                        <el-option
                        v-for="item in optionss"
                        :key="item.id"
                        :label="item.type_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                
                
                
            </el-col>
        </el-row>
        <my-table :tableData="tableData" :columns="columnsApp"  :page-size='pageSize' :mutiSelect="true" @multipleSelection="multipleSelection" :totalPage="pageCount"  :currentPage="getPage" @currentChange="gettablelists" v-if="flagPage"></my-table>
        <elGoodsLinks :selectedModalId="selectedModalId"   @geturl="geturl" v-if="openModal"></elGoodsLinks>
        <eShopslist v-if="openeShopslist" :selectshoplist="selectshoplist" @editshopgroup="editshopgroup"
        :selectParams="selectParams"
        @handleShopslist="handleShopslist"
        :selectIdArrFlag="selectIdArrFlag"></eShopslist>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {gettablelist ,goodTypeAdd,del,addshop ,VendorTradeGoods } from '@/server/editshopgroup';
import elGoodsLinks from "@/components/WF_admin/shop_admin/DIY/components/linkDialog/elGoodsLinks.vue";
import eShopslist from "@/components/WF_admin/shop_admin/DIY/components/linkDialog/eShopslist.vue";
export default {
    name: 'editshopgroup',
    data() {
        return {
            optionss:[
                {
                    type_name:"添加商品",
                    id:0
                },
                {
                    type_name:"添加商品分类",
                    id:1
                }
            ],
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
            addselect:'',
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
                    render:(h, param) => {
                        let a = [h('img', {
                                attrs: {
                                    'src':param.row.master_graph,
                                    preview: param.row.id,
                                    style:"width:50px;height:50px"
                                }
                            })];
                        return h('div', a);
                    }
                },
                { 
                    prop: "good_name", 
                    label: "商品名称",
                    align: "center"
                },
                { 
                    prop: "price_range", 
                    label: "成交价",
                    align: "center"
                },
                { 
                    prop: "type_name", 
                    label: "分类",
                    align: "center"
                },
                { 
                    prop: "created_at", 
                    label: "时间",
                    align: "center"
                },
                {
                    label: "操作",
                    align: "center",
                     render: (h, param)=> {
                        let a = [
                            h('el-button', {
                                props: {
                                    type: "text"
                                },
                                attrs: {
                                    style: "color:#f56c6c"
                                },
                                on: {
                                    click: () => {
                                        this.del(param.row)
                                    }
                                }
                            }, "删除"),
                        ];
                        return h('div', a);
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
            flagPage:true,
            openModal:false,
            openeShopslist:false,
            good_type:-1,
            selectedModalId:[],//已选商品分类id集合
            selectshoplist:[],
            selectParams:[],
            selectIdArrFlag:true,
        }
    },
    components: {
        MyTable,
        elGoodsLinks,
        eShopslist
    },
    created: function(){
        let that = this
        this.classList();
        this.groupid = that.$route.query.id
        this.$route.meta.title=that.$route.query.groupname//修改董涛metr标签
        this.gettablelist()
    },
    methods: {
        geturl(data,name,closeModal){//获取子组件跳转的地址
            let that=this;
            //关闭弹窗
            this.openModal=closeModal;
            let arr=[];
            //判断是否是array，后遍历处理
            if(Object.prototype.toString.call(data.data)==='[object Array]'){
                data.data.forEach(element => {
                    if(element.children){
                        element.children.forEach((el)=>{
                            arr.push(el.id);
                        })
                    }
                });
            }
            //判断是否有选择值
            if(arr.length>0){
                this.addType(arr.join(','));
            }
        },
        editshopgroup(datas,name,closeModal){
            this.openeShopslist=closeModal;
            let that = this
            let arr=[]
            if(datas.length>0){
                datas.forEach((e,i)=>{
                    console.log(e.id)
                    arr.push(e.id)
                })
                let good_id = JSON.stringify(arr).replace("[","").replace("]","")
                let data={
                    pro_id: parseInt(localStorage.getItem('proId')),
                    token:localStorage.getItem('userId'),
                    id:this.groupid,
                    good_id:good_id
                }
                addshop(data).then((res)=>{
                    console.log(res)
                    if(res.data.code===200){
                        that.$message.success(res.data.msg);
                        that.gettablelist()
                    }else{
                        that.$message.error(res.data.msg+'600A00113');
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误!600B00114');
                })
            }
            
        },
        addType(type_id){
            let that=this;
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                id:this.groupid,
                type_id:type_id
            }
            //商品组下的商品分类添加
            goodTypeAdd(data).then((res)=>{
                if(res.data.code===200){
                    that.$message.success(res.data.msg);
                    //刷新       
                    that.gettablelist();
                }else{
                    that.$message.error(res.data.msg+'600A0094');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!600B0093');
            })
        },
        searchClick(){
            // this.loadingSearch=true;
            this.gettablelist(this.getPage);
        },
        gettablelists(e){
            let that = this
            that.getPage = e
            that.gettablelist()
        },
        gettablelist(currentPage){//获取列表
            let that =this
                if(currentPage){
                    this.getPage=currentPage;
                }
                
                const loading = this.$loading({
                    lock: true,
                    text: '数据加载中~',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let  good_type = that.good_type
                if(good_type == -1){
                    good_type=''
                }else{
                    good_type = good_type
                }
                let data={
                    id:that.groupid,
                    token:localStorage.getItem('userId'),
                    pro_id:parseInt(localStorage.getItem('proId')),
                    page:that.getPage,
                    bar:that.pageSize,
                    good_name:that.pro_name,
                    good_type:good_type
                }
                gettablelist(data).then((res)=>{
                    loading.close();
                    if(res.data.code===200){
                        console.log(res)
                        that.tableData = res.data.data.data
                        that.pageCount = res.data.data.total
                    }else{
                        that.$message.error(res.data.msg+'600A00115');
                    }
                }).catch((err)=>{
                    loading.close();
                    that.$message.error('网络错误!600B00116');
                })
        },
        del(item){
            let that =this
            let data={
                id:item.id,
                token:localStorage.getItem('userId'),
                pro_id:parseInt(localStorage.getItem('proId')),
            }
            del(data).then((res)=>{
                // loading.close();
                console.log(res)
                if(res.data.code===200){
                    that.gettablelist()
                    that.$message.success(res.data.msg);
                }else{
                    that.$message.error(res.data.msg+'600A00117');
                }
            }).catch((err)=>{
                // loading.close();
                that.$message.error('网络错误!600B00118');
            })
        },
        handleSetting(){
            this.$confirm('请确认是否批量删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that=this;
                if(this.goodSelectedId.length===0){
                    this.$message.warning('请选择商品');
                    return false;
                }
                /**
                 * 暂未考虑同步删除情况
                 * 当前页数据删完跳转到第一页
                 */
                if(this.goodSelectedId.length===this.tableData.length){
                    this.getPage=this.getPage-1;
                }
                let goods_id=this.goodSelectedId.map(item=>item.id).join(',');
                let data={
                    token:localStorage.getItem('userId'),
                    pro_id:parseInt(localStorage.getItem('proId')),
                    id:goods_id
                }
                const loading = this.$loading({
                    lock: true,
                    text: '正在处理中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                del(data).then((item)=>{
                    loading.close();
                    if(item.data.code===200){
                        that.gettablelist()
                        that.$message.success(item.data.msg);
                    }else{
                        that.$message.error(res.data.msg+'600A00117');
                    }
                }).catch((err)=>{
                    loading.close();
                    that.$message.error('网络错误!600B00118');
                })
            }).catch(() => {
                this.$message.info("已取消删除");          
            });
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
            console.log(e)
            this.good_type=e
        },
        changeStatus(e){
            this.prop_statu = e
        },
        handleSelctVis(e){
            if(e){
                this.changeSelects(this.addselect)
            }
        },
        changeSelects(e){
            let that=this;
            this.addselect="";
            if(e===0){  
                this.openeShopslist = true
                let data = {
                    token: localStorage.getItem('userId'),
                    pro_id: parseInt(localStorage.getItem("proId")),
                    id:this.groupid
                }
                VendorTradeGoods(data).then((res)=>{
                    if(res.data.code===200){
                       that.selectParams=res.data.data;
                    }else{
                        that.$message.error(res.data.msg+"600A00132");
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误!600B00131');
                })
            }else if(e===1){
                this.openModal=true;
            }
        },
        //取消回调函数
        handleShopslist(e){
            this.openeShopslist=false;
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
    .titlelist{
        line-height: 34px;
        font-size: 16px;
        width: 100px;
        text-align: center;
        margin-right: 20px;
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
}
</style>
