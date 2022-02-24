<template>
    <div class="wf-fastMail">
        <el-button type="primary" class="wf-add" size="mini" @click="addFare">新增快递公司</el-button>
        <my-table 
        :tableData="tableData" 
        :columns="columnsApp" 
        :totalPage="pageCount"  
        :currentPage="currentPage" 
        @currentChange="handleCurrentChange">
        </my-table>
        <el-dialog :visible.sync="dialogFare"
            :before-close="handleClose" 
            width="450px">
            <el-form ref="save" v-model="form" :label-position="labelPosition" class="demo-ruleForm">
                <el-form-item props="fareName" label="快递">
                    <el-input :maxlength="15" size="mini" style="width: 70%;" v-model="form.fareName"></el-input>
                    <span class="wf-textareaVaild ">{{(15-form.fareName.length)}}/15</span>
                </el-form-item>
                <el-form-item class="wf-fastMail-bottom">
                    <el-button type="primary" @click="submit"  size="mini">确定</el-button>
                    <el-button @click="close"  size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {expressIndex, expressDel ,expressState ,expressEdit } from "@/server/fare";
export default {
    name: '',
    data() {
        return {
            currentPage:1,
            pageCount:0,
            tableData:[],
            dialogFare:false,
            labelPosition:'right',
            id:-1,
            form:{
                fareName:''
            },
            columnsApp:[
                { 
                    prop:'name',
                    label: "快递",
                    align: "center"
                },
                {  
                    label: "常用",
                    align: "center",
                    render:(h, param) => {
                        let a='';
                        let that=this;
                        if(param.row.state===0){
                            a="否";
                        }else if(param.row.state===1){
                            a="是";
                        }
                        return [h('el-switch',{
                            props:{
                                value:that.tableData[param.index].state===0?false:true
                            },
                            on:{
                                'change':(val)=>{
                                    that.handleChange(param.row.id,param.row.state);
                                }
                            }
                        }),h('span',a)];
                    }
                },
                { 
                    label: "操作",
                    align: "center",
                     render:(h, param) => {
                        let that=this;
                        let editg=h('el-button', {
                            class:'gray',
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            on:{
                                click:()=>{
                                    that.handleEdit(param.row.id);
                                    that.form.fareName=param.row.name;
                                }
                            }
                        }, '编辑');

                        let deleteBtn=h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(230, 126, 122);font-size:14px"
                            },
                            on:{
                                click:()=>{
                                    that.handleDelete(param.row.id);
                                }
                            }
                        }, '删除');
                        if(param.row.pro_id===0){
                            return
                        }else{
                            return [editg,deleteBtn];
                        }
                        
                    }
                }
            ],
            rules:
                {
                    fareName:[
                            { required: true, message: "请输入快递名称", trigger: 'blur' }
                    ],
                }
        }
    },
    components: {
        MyTable
    },
    created(){

    },
    mounted(){
        this.handleFastMail(this.currentPage);
    },
    methods: {
        submit(){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
                name:this.form.fareName
            }   
            if(this.id>0){
                data.id=this.id;
            } 
            expressEdit(data).then((res)=>{
                that.id=-1;
                that.dialogFare=false;
                if(res.data.code===200){
                    that.$message.success(res.data.msg);
                    that.form.fareName='';
                    that.handleFastMail(that.currentPage);
                }else{
                    that.$message.error('网络错误!');
                }
            }).catch(err=>{
                that.id=-1;
                that.dialogFare=false;
                that.$message.error('网络错误！');
            });
        },
        close(){
            this.dialogFare=false;
        },
        handleClose(){
            this.dialogFare=false;
        },
        handleChange(id,state){
            let that=this;
            let data={
                id:id,
                secret:localStorage.getItem('secretId'),
                state:state===0?1:0
            }    
            expressState(data).then((res)=>{
                    if(res.data.code===200){
                        that.$message.success(res.data.msg);
                        that.handleFastMail(that.currentPage);
                    }else{
                        that.$message.error('网络错误!');
                    }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        addFare(){
            this.dialogFare=true;
        },
        handleEdit(id){
            this.dialogFare=true;
            this.id=id;
        },
        handleDelete(id){
            let that=this;
            let data={
                id:id,
                secret:localStorage.getItem('secretId')
            }    
            expressDel(data).then((res)=>{
                    if(res.data.code===200){
                        that.$message.success(res.data.msg);
                        that.handleFastMail(that.currentPage);
                    }else{
                        that.$message.error('网络错误!');
                    }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        handleFastMail(currentPage){
            let that=this;
            that.currentPage=currentPage;
            let data={
                page:currentPage,
                secret:localStorage.getItem('secretId'),
            }    
            expressIndex(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData=res.data.data.data;
                    that.pageCount=res.data.data.total;
                    that.currentPage=res.data.data.current_page;
                }else{
                    that.$message.error('网络错误!');
                }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        handleCurrentChange(current){
            this.currentPage=current;
            this.handleFastMail(this.currentPage);
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-fastMail{
    padding: 0 20px 20px 20px;
    .wf-fastMail-bottom{
        text-align: center;
        margin-bottom: 0;
    }
    .wf-textareaVaild {
        right: 90px;
        top: 0;
    }
}
</style>