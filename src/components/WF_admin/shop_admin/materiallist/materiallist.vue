<template>
    <div id="materiallist">
        <el-row class="search">
            <el-col :span="2" style="margin-right:2.5rem;">
                <el-button type="primary" size="mini"  @click="add">新建专题</el-button>
            </el-col>
            <el-col class="right-search">
                <!-- 选择器 -->
                <div style="width:420px;display:inline-block;float:left;margin-right:21px;"> 标题名称
                    <el-input class="search-input" 
                    style="width:20rem;margin-right:1.875rem;" 
                    v-model="title" size="mini" 
                    placeholder="输入您要搜索的标题名称"
                    @keyup.enter.native="getnewlist(1)"></el-input></div>
                分类:
                <el-select
                v-model="select"
                placeholder="请选择分类"
                class="input_size"
                size="mini"
                @change="changeSelect"
                props="state">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
               
                <el-button type="primary" class="input_size search-btn" size="mini"  @click="getnewlist(1)" :loading="selectlist">搜索</el-button>
            </el-col>
        </el-row>
        
        <my-table :tableData="tableData" :columns="columns" :totalPage="pageCount" :currentPage="currentPage" @currentChange="getnewlist"></my-table>
    
    </div>
</template>

<script>
import { getmaterialllist,getmateriallfenleilist,delgetmaterialllist } from '@/server/materiallist.js'
import MyTable from "@/commonComponents/table/table.vue";
export default {
    name: 'materiallist',
    data() {
      return {
        select:'',//搜索分类
        options:[],
        pro_name:'',
        pageSize: 10,
        pageCount: 0,
        currentPage:1,
        title:'',
        selectlist:false,
        category_id:'',
        stateid:0,
        // stateFormatter:[],
        // formatter:'left',
        tableData:[],
        columns: [
                {   label: "封面图",
                    align: "center",
                    render: function(h, param) {
                        let img='';
                        img = [h('img', {
                            attrs: {
                                src: param.row.cover_image,
                                preview: param.row.id,
                                style: 'width:44px;height:44px;'
                            }
                        })];
                        return h('div', img);
                    }
                },
                {   prop: "title", 
                    label: "标题",
                    align: "center"
                },
                {   prop: "category_name",
                    label: "分类",
                    align: "center"
                },
                {
                    prop: "state",
                    label: "状态",
                    align: "center",
                    render: function(h, param) {
                        let stateText='';
                        if(param.row.state===0){
                            stateText = [h('p', {
                                props: {
                                    size: "mini",
                                    type: "success"
                                }
                            },'下架')];
                        }else{
                            stateText = [h('p', {
                                props: {
                                    size: "mini",
                                    type: ""
                                }
                            }, '上架')];
                        }
                        return h('div', stateText);
                    }
                },
                { prop: "create_time", label: "时间",align: "center" },
                {
                    prop: "",
                    label: "操作",
                    align: "center",
                    render: (h, param) => {
                        let a = [
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "text"
                                },
                                on: {
                                    click: () => { // 点击新建时传参param的值为edite
                                        this.edit(param.row)
                                    }
                                }
                            }, '编辑'),
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "text"
                                },
                                on: {
                                    click: () => {
                                        this.deleteGoods(param.row)
                                    }
                                }
                            }, '删除')];
                        return h('div', a);
                    }
                }
            ]
      };
    },
    created: function(){
        let that = this
        
    },
    components: {
        MyTable
    },
    mounted:function(){
        let that = this
        // let currentPage = sessionStorage.getItem("currentPage");
        // if(currentPage !== null){
        //      that.currentPage  = Number(currentPage)
        //     sessionStorage.removeItem("currentPage");
             
        // }else{
        //     that.currentPage  = Number(1)
        // }
        that.getfenlei()
        that.getnewlist(1)
    },
    methods: {
        edit(id){//编辑页面
        let that = this
            that.$router.push({
                path: '/wf/admin/shop/materiallist/add_materiallist', 
                query:{
                    id:id.id
                }
            })
            // sessionStorage.setItem("currentPage", that.currentPage);//写进去
        },
        add(){//添加页面
             this.$router.push({
                path: '/wf/admin/shop/materiallist/add_materiallist'
             })
        },
        deleteGoods(e){//删除文章数据
            let that = this
            let data={ 
                pro_id: parseInt(localStorage.getItem('proId')),
                id:e.id
            }
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delgetmaterialllist(data).then(function (response) {
                    if(response.data.code === 200){
                        that.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                        that.getnewlist(that.currentPage)
                    }else{
                        that.$message({
                            message: response.data.msg,
                            type: 'warning'
                        });
                    }
                    
                })
                .catch(function (error) {
                    that.$message.error('网络错误');
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
             
        },
        changeSelect(state){//改变状态
            this.stateid= state
        },
        getfenlei(){//获取分类
             let that = this
             let data = {pro_id: parseInt(localStorage.getItem('proId'))}
             getmateriallfenleilist(data).then(function (response) {
                if(response.data.code === 200){
                    that.options = response.data.data.data
                }else{
                     that.$message({
                        message: response.data.msg,
                        type: 'warning'
                    });
                }
                
              })
              .catch(function (error) {
                  that.$message.error('网络错误');
              });
        },
        getnewlist(currentPage){//获取文章列表
             this.currentPage = currentPage
             let that = this
             this.selectlist = true
             this.tableData= []
             let data = {
                pro_id: parseInt(localStorage.getItem('proId')),
                title:this.title,
                category_id:this.stateid,
                page:parseInt(this.currentPage)
             }
             getmaterialllist(data).then(function (response) {
                if(response.data.code === 200){
                     that.selectlist = false
                    if(response.data.data.total > 0){
                    that.pageCount = response.data.data.total
                }else{
                    that.pageCount=1
                }
                that.tableData = response.data.data.data
                }else{
                    that.$message({
                        message: response.data.msg,
                        type: 'warning'
                    });
                }
              })
              .catch(function (error) {
                  that.$message.error('网络错误');
              });
        }
    }
}
</script>
<style lang="scss">
#materiallist{
    background-color: #fff;
    padding:20px;
    .td.el-table_1_column_1{
        padding:7px 0;
    }
    .input_size{
        margin-right: 1.875rem;
        margin-left: 21px;
    }
    .input_size input{
        width: 7.5rem;
        height: 2.125rem;
    }
    .search-input input{
        height:2.125rem;
        margin-left: 21px;
        margin-right: 40px;
        
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
    .right-search{
        width: 50rem;
        float: left;
    }
    .el-button--primary{
        background: #719FF8;
    }
}
</style>
