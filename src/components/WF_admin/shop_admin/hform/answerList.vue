<template>
    <div class="wf-answerList">
        <el-form label-width="100px" v-model="forms">
            <el-row>
                <el-col :span="6" >
                    <el-form-item label="表单主题:" size="mini">
                        {{title}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="wf-hform-activename">
                    <el-form-item label="昵称/手机号" size="mini">
                        <el-input v-model="forms.user"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否星标" size="mini">
                        <el-select v-model="forms.status" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button size="mini" type="primary" @click="search" icon="el-icon-search" :loading="searchLoading">搜索</el-button>
                </el-col>
            </el-row>
        </el-form>
        <my-table class="wf-hform-table" :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {userIndex,answerState } from '@/server/hform';
export default {
    name: 'hform',
    data() {
        return {
            showVersion: false, // 控制版本提示
            tableData: [],
            totalPage:1,
            currentPage:1,
            dialogVisible: false,
            searchLoading:false,
            title:localStorage.getItem('hftitle'),
            forms:{
                user:'',
                status:-1
            },
            options:[
                {
                    value:-1,
                    label:'全部'
                },
                {
                    value:1,
                    label:'是'
                },
                {
                    value:0,
                    label:'否'
                }
            ],
            columns: [
                {   prop: "id", 
                    label: "序号",
                    width: "50",
                    align: "center"
                },
                { 
                    label: "昵称/手机号",
                    align: "center",
                    render:(h,param)=>{
                        let render;
                        if(param.row.status===1){
                            render=[h('div',{
                                class:"star-five"
                            }),
                            h('span',{}, param.row.nickName+' / '+param.row.phone)];
                        }else{
                            render=[h('span', param.row.nickName+' / '+param.row.phone)];
                        }
                        return render;
                    }
                },
                { 
                    prop:"created_at",
                    label: "提交时间",
                    align: "center",
                },
                {   
                    label: "状态",
                    align: "center" ,
                    width: "150",
                    render:(h,param)=>{
                        let stateText="";
                        if(param.row.state===0){
                            stateText="已处理";
                        }else if(param.row.state===1){
                            stateText="未处理";
                        }
                        return [h('span', stateText)];
                    }
                },
                {
                    label: "操作",
                    align: "center",
                    render: (h, param) => {
                        let handle;
                        if(param.row.state===0){
                            handle= [h('el-button', {
                                props: {
                                    size: "mini",
                                    type:"text"
                                },
                                on: {
                                    click: () => {
                                        this.updatestates('state',param.row.id,'该操作将把该单标记为已处理状态, 是否继续?',0,1);
                                    }
                                }
                            }, '已处理')];
                        }else if(param.row.state===1){
                            handle= [h('el-button', {
                                style:'color:#ccc;',
                                props: {
                                    type:"text"
                                },
                            }, '已处理')];
                        }

                        let publishText="",tips="",status;
                        if(param.row.status===0){
                            publishText="标记星标";
                            tips="'该操作将把该单标记星标, 是否继续?";
                            status=1;
                        }else if(param.row.status===1){
                            publishText="取消星标";
                            tips="'该操作将把该单取消星标, 是否继续?";
                            status=0;
                        }
                        let flag = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    this.updatestates('status',param.row.id,tips,status,1);
                                }
                            }
                        },publishText)]
                        let  look = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    localStorage.setItem('hfname',param.row.nickName);
                                    localStorage.setItem('hfphone',param.row.phone);
                                    this.$router.push({path:'/wf/admin/shop/markting/hform/answerDetails',name:'answerDetails',query:{id:param.row.id}});
                                }
                            }
                        }, '查看详情')]
                        return h('div', [handle,flag ,look]);
                        
                    }
                }
            ],
            activeTime:[],
        }
    },
    components: {
        MyTable,
    },
    mounted(){
        this.getTableData(this.currentPage);
    },
    methods: {
        updatestates(name,id,text,val1,val2){
            let that=this;
            this.$confirm(text, '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = { 
                    pro_id: parseInt(localStorage.getItem('proId')),
                    token:localStorage.getItem('userId'),
                    id:id
                }
                if(name==='state'||name==='status'){
                    data.state=val1;
                    data.type=val2;
                }
                answerState(data).then((res)=>{
                    if(res.data.code===200){
                        that.getTableData(that.currentPage);
                    }else{
                        that.$message.error(res.data.msg+'600A00235');
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误!'+'600B00236');
                }) 
            }).catch(err=> {
                this.$message.info("已取消删除");          
            });
        },
        handleCloseVersion(){
            this.showVersion = false;
        },
        search(){
            this.getTableData(this.currentPage)
        },
        getTableData: function(currentPage) {
            let that=this;
            this.currentPage=currentPage;
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                form_id:that.$route.query.id,
                page:currentPage,
                user:this.forms.user,
                status:this.forms.status
            }
            userIndex(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData=res.data.data.data;
                    that.totalPage=res.data.data.total;
                }else{
                    that.$message.error(res.data.msg+'600A00233');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!'+'600B00234');
            })
        }
    }
}
</script>

<style lang="scss">
@import "src/styles/mixin.scss";
.wf-answerList{
    background-color: #fff;
    padding: 20px;
    font-size: 16px;
    /deep/ .wf-delete{
        color: #e67e7a;
    }
    @include clearfix;
    .star-five{
        width: 0;
        height: 0;
        position: relative;
        border-bottom: 7px solid rgb(255, 153, 0);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        transform: rotate(35deg);
        margin-top: 8px;
        float: left;
        margin-left: 120px;
        margin-right: -200px;
    }
    .star-five::before {
        content: '';
        width: 0;
        height: 0;
        display: block;
        border-bottom: 7px solid rgb(255, 153, 0);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position: absolute;
        top: 0;
        left: -9.4px;
        transform: rotate(75deg);
    }
    .star-five::after {
        content: '';
        width: 0;
        height: 0;
        color: rgb(255, 153, 0);
        border-bottom: 7px solid rgb(255, 153, 0);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        transform: rotate(-70deg);
        position: absolute;
        left: -10px;
        top: 0;
    }
    .wf-hform-table{
        /deep/ .is-left{
            padding-left: 70px;
            .wf-delete{
                color: rgb(230, 126, 122);
            }
        }
    }
    .wf-hform-activename{
        margin-left: 20px;
    }
    .wf-hform-add{
        margin-bottom: 15px;
    }
    .wf_pagination.el-row{
        margin-top: 40px;
        margin-right: 12.5rem;
        text-align: center;
    }
    .el-pager .number{
        margin: 0 10px;
    }
}
</style>