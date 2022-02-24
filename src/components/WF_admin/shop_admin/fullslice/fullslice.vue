<template>
    <div class="wf-fullslice">
        <el-form label-width="100px" >
            <el-row>
                <el-col :span="1">
                    <el-button  @click="addFullslice" type="primary" size="mini" icon="el-icon-plus">新增满减</el-button>
                </el-col>
                <el-col :span="6" class="wf-fullslice-activename">
                    <el-form-item label="活动名称" size="mini">
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3" >
                    <el-form-item label="状态" size="mini">
                        <el-select class="input_size" v-model="statu" size="mini" @change="changeStatus">
                            <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动时间" size="mini">
                        <el-date-picker
                        v-model="activeTime"
                        type="daterange"
                        align="right"
                        size="mini"
                        range-separator="至"
                        start-placeholder="选择日期时间"
                        end-placeholder="选择日期时间"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button size="mini" type="primary" @click="search" icon="el-icon-search" :loading="searchLoading">搜索</el-button>
                </el-col>
            </el-row>
        </el-form>
        <my-table class="wf-fullslice-table" :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {cutIndex,cutEdit} from '@/server/fullslice';
import {dateFormat} from '@/untils/common.js';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: 'fullslice',
    data() {
        return {
            showVersion: false, // 控制版本提示
            tableData: [],
            totalPage:1,
            currentPage:1,
            dialogVisible: false,
            searchLoading:false,
            name:"",
            columns: [
                {   prop: "name", 
                    label: "活动名称",
                    align: "center"
                },
                { prop: "state", 
                    label: "状态",
                    align: "center",
                    width: "120",
                    render:(h,param)=>{
                        let stateText="";
                        if(param.row.cut_state===0){
                            stateText="未开始";
                        }else if(param.row.cut_state===1){
                            stateText="进行中";
                        }else if(param.row.cut_state===2){
                            stateText="已暂停";
                        }else if(param.row.cut_state===3){
                            stateText="已结束";
                        }
                        return [h('span', stateText)];
                    }
                },
                { 
                    label: "活动时间",
                    align: "center", 
                    render:(h,param)=>{
                        let time = dateFormat(param.row.start_time,'{y}/{m}/{d}') + " 至 " + dateFormat(param.row.end_time,'{y}/{m}/{d}');
                        return [h('span', time)];
                    }
                },
                {   
                    label: "成交额/满减额",
                    align: "center" ,
                    width: "160",
                    render:(h,param)=>{
                        let num=  param.row.turnover + '/' + param.row.cut_price;
                        return [h('span', num)];
                    }
                },
                {
                    label: "操作",
                    align: "left",
                    render: (h, param) => {
                        let  look= [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    this.$router.push({path:'/wf/admin/shop/markting/fullslice/addFullslice',name:'addFullslice',query:{param:'views',id:param.row.id}});
                                }
                            }
                        }, '查看')]
                        let  edit = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    this.$router.push({path:'/wf/admin/shop/markting/fullslice/addFullslice',name:'addFullslice',query:{param:'edit',id:param.row.id}});
                                }
                            }
                        }, '编辑')]
                        let  Open = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    let that=this;
                                    let data = { 
                                        pro_id: parseInt(localStorage.getItem('proId')),
                                        token:localStorage.getItem('userId'),
                                        id:param.row.id,
                                        state:1
                                    }
                                    cutEdit(data).then((res)=>{
                                        if(res.data.code===200){
                                            that.$message.success("已开启");
                                            that.getTableData(that.currentPage);
                                        }else{
                                            that.$message.error(res.data.msg+'600A00157');
                                        }
                                    }).catch((err)=>{
                                        that.$message.error('网络错误!'+'600B00158');
                                    })
                                }
                            }
                        }, '开启使用')]
                        let  suspended = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    let that=this;
                                    let data = { 
                                        pro_id: parseInt(localStorage.getItem('proId')),
                                        token:localStorage.getItem('userId'),
                                        id:param.row.id,
                                        state:2
                                    }
                                    cutEdit(data).then((res)=>{
                                        if(res.data.code===200){
                                            that.$message.success("已暂停");
                                            that.getTableData(that.currentPage);
                                        }else{
                                            that.$message.error(res.data.msg+'600A00157');
                                        }
                                    }).catch((err)=>{
                                        that.$message.error('网络错误!'+'600B00158');
                                    }) 
                                }
                            }
                        }, '暂停')]
                        let  termination = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            on: {
                                click: () => {
                                    let that=this;
                                    this.$confirm('终止则这个活动马上结束,结束后不能再开启,也不可编辑，可查看、删除。是否确定终止该活动?', '温馨提示', {
                                        confirmButtonText: '确定终止',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        let data = { 
                                            pro_id: parseInt(localStorage.getItem('proId')),
                                            token:localStorage.getItem('userId'),
                                            id:param.row.id,
                                            state:3
                                        }
                                        cutEdit(data).then((res)=>{
                                            if(res.data.code===200){
                                                that.$message.success("已终止");
                                                that.getTableData(that.currentPage);
                                            }else{
                                                that.$message.error(res.data.msg+'600A00157');
                                            }
                                        }).catch((err)=>{
                                            that.$message.error('网络错误!'+'600B00158');
                                        })
                                    }).catch(() => {
                                        that.$message.info("已取消终止");          
                                    });
                                }
                            }
                        }, '终止')]
                        let  deletes = [h('el-button', {
                            props: {
                                size: "mini",
                                type:"text"
                            },
                            class:"wf-delete",
                            on: {
                                click: () => {
                                    let that=this;
                                    this.$confirm('此操作将删除该活动, 是否继续?', '温馨提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        let data = { 
                                            pro_id: parseInt(localStorage.getItem('proId')),
                                            token:localStorage.getItem('userId'),
                                            id:param.row.id,
                                            state:4
                                        }
                                        cutEdit(data).then((res)=>{
                                            if(res.data.code===200){
                                                that.$message.success("已删除");
                                                that.getTableData(that.currentPage);
                                            }else{
                                                that.$message.error(res.data.msg+'600A00157');
                                            }
                                        }).catch((err)=>{
                                            that.$message.error('网络错误!'+'600B00158');
                                        }) 
                                    }).catch(() => {
                                        this.$message.info("已取消删除");          
                                    });
                                }
                            }
                        }, '删除')]
                        if(param.row.cut_state===0){
                            return h('div', [edit,termination]);
                        }else if(param.row.cut_state===1){
                            return h('div', [look,suspended,termination]);
                        }else if(param.row.cut_state===2){
                            return h('div', [edit,Open,deletes]);
                        }else if(param.row.cut_state===3){
                            return h('div', [look,deletes]);
                        }
                        
                    }
                }
            ],
            statu:-1,
            status: [
                {
                    value: -1,
                    label: '全部'
                },{
                    value: 0,
                    label: '未开始'
                },{
                    value: 1,
                    label: '进行中'
                },{
                    value: 2,
                    label: '已暂停'
                },{
                    value: 3,
                    label: '已结束'
                }
            ],
            activeTime:[],
            pickerOptions: {
                shortcuts: [
                {
                    text: '最近一天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    components: {
        MyTable,
        versionCom
    },
    mounted(){
        this.getTableData(this.currentPage);
    },
    methods: {
        handleCloseVersion(){
            this.showVersion = false;
        },
        search(){
            this.getTableData(this.currentPage)
        },
        changeStatus(val){

        },
        getTableData: function(currentPage) {
            let that=this;
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            this.currentPage=currentPage;
            //本地调试采用mock
            // this.$axios.get('/api/mockjs/agentAddGroup').then(res=>{
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                name:this.name,
                cut_state:this.statu,
                page:currentPage
            }
            if(this.activeTime){
                if(this.activeTime.length===2){
                    data.start_time=this.activeTime[0];
                    data.end_time=this.activeTime[1];
                }
            }
            cutIndex(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData=res.data.data.data;
                    that.totalPage=res.data.data.total;
                }else{
                    that.$message.error(res.data.msg+'600A00156');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!'+'600B00155');
            })

            // let data={
            //     page:currentPage
            // };
            // this.$axios.post(this.url+'shopapi/coupon/couponIndex',
            // 'token='+localStorage.getItem('userId')+
            // '&secret='+localStorage.getItem('secretId')+
            // '&page='+data.page
            // ).then(res=>{
            //     if(res.data.code===200){
            //         that.tableData = res.data.data.data;
            //         that.currentChange = res.data.data.current_page;
            //         that.totalPage = res.data.data.total
            //     }else{
            //         this.$notify.error({
            //             title: 'error',
            //             message: '系统出错，请联系管理员！',
            //             duration: 2000
            //         });
            //     }
            // }).catch(err=>{
            //     that.$notify.error({
            //         title: 'error',
            //         message: '系统出错，请联系管理员！',
            //         duration: 2000
            //     });
            // });
        },
        addFullslice:function(){
            let that = this
            getAuditApplicationList(31).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data){
                        that.$router.push({path:'/wf/admin/shop/markting/fullslice/addFullslice',name:'addFullslice'})
                    }else{
                        that.showVersion = true;
                    }
                }else{
                    that.$message.error(res.data.msg+"");
                }
            }).catch((item)=>{
                that.$message.error(res.data.msg+"");
            })
        },
        deleteData(id){ // 刪除表格当前行数据
            this.$confirm('删除活动不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.url+'shopapi/coupon/couponDel',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+
                '&id='+id
                ).then(res=>{
                    if(res.data.code===200){
                        this.getTableData()
                        this.$message.success('删除成功');
                    }else{
                        this.$notify.error({
                            title: 'error',
                            message: '系统出错，请联系管理员！',
                            duration: 2000
                        });
                    }
                }).catch(err=>{
                    this.$notify.error({
                        title: 'error',
                        message: '系统出错，请联系管理员！',
                        duration: 2000
                    });
                });
            }).catch(() => {
                this.$message.info('已取消删除');          
            });
        }
    }
}
</script>

<style lang="scss">
.wf-fullslice{
    background-color: #fff;
    padding: 20px;
    font-size: 16px;
    .wf-fullslice-table{
        /deep/ .is-left{
            padding-left: 175px;
            .wf-delete{
                color: rgb(230, 126, 122);
            }
        }
    }
    .wf-fullslice-activename{
        margin-left: 20px;
    }
    .wf-fullslice-add{
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