<template>
    <div class="wf-admin-application">
        <div class="wf-search">
            <el-row>
                <el-col :span="4" class="wf-right">
                    <el-input size="mini" placeholder="输入您要搜索的手机号码" v-model="phone_number"></el-input>
                </el-col>
                <el-col :span="4" class="wf-right">
                    <span>状态：</span>
                    <el-select size="mini" class="status_select" v-model="valueAll" @change="search" >
                        <el-option
                        v-for="item in optionsAll"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" class="wf-right">
                    <el-input size="mini"  placeholder="输入您要搜索的应用名称" v-model="app_name" ></el-input>
                </el-col>
                <el-col :span="4" class="wf-right">
                    <el-input size="mini"  placeholder="输入您要搜索的品牌名" v-model="app_brand"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button size="mini" type="primary" @click="search">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <my-table :tableData="tableDataApp" :columns="columnsApp" :totalPage="totalPageApp"  :currentPage="currentPage" @currentChange="getAppList"></my-table>
        <el-dialog title="确认发布" 
            :visible.sync="dialogAddVisible" 
            width="650px" 
            center 
            class="wf-addCoupon-Shop"
            :before-close="handleClose"
            :close="close">
            <el-form label-position="left"
                :model="addAppData" 
                :rules="rules" 
                ref="addAppData" 
                label-width="150px" 
                class="demo-ruleForm">
                <el-form-item label="应用名称：" class="wf-no-required" size="mini" >
                    <el-col :span="12" class="wf-addCoupon-coupon_name" >
                        <label >{{addAppData.name}}</label>
                    </el-col>
                </el-form-item>
                <el-form-item label="应用状态：" class="wf-no-required" size="mini">
                    <el-col :span="24" class="wf-addCoupon-coupon_name">
                        <label >正式版</label>
                    </el-col>
                </el-form-item>
                <el-form-item label="有效期限：" prop="application_release_time" size="mini">
                    <el-col :span="6" class="wf-addCoupon-coupon_name">
                        <el-date-picker
                            v-model="addAppData.application_release_time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="handleDateChange"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                    </el-col>
                </el-form-item>
             </el-form>
            <div slot="footer" class="dialog-footer">  
                <el-button size="mini" @click="dialogAddVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleDialogVersionVisible('addAppData')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from "@/untils/common.js";
import {getAuditApplicationList ,getWechatReview ,submitConfirmRelease} from '@/server/proxy';
export default {
    name: 'seckill',
    data() {
        return {
            dialogAddVisible:false,//确认发布弹窗打开关闭控制
            tableDataApp:[],//列表数据
            totalPageApp:0,
            currentPage:1,
            columnsApp: [
                { 
                    prop: "id", 
                    label: "编号",
                    align: "center",
                    width:'80'
                },
                { 
                    prop: "name", 
                    label: "用户",
                    align: "center"
                },
                { 
                    prop: "phone", 
                    label: "手机号",
                    align: "center"
                },
                {
                    label: "应用状态",
                    align: "center",
                    width:'80',
                    render:(h, param) => {
                        let str="";
                        if(param.row.app_status===0){
                            str='试用期';
                        }else if(param.row.app_status===1){
                            str='正式版';
                        }else if(param.row.app_status===2){
                            str='已过期';
                        }
                        return [h('div', {}, str)];
                    }
                },
                { 
                    prop: "pro_name", 
                    label: "应用名称",
                    align: "center"
                },
                { 
                    prop: "brand", 
                    label: "品牌名",
                    align: "center"
                },
                { 
                    prop: "type_name", 
                    label: "应用类型",
                    align: "center"
                },
                { 
                    label: "申请时间",
                    align: "center",
                    render:(h, param) => {
                        return [h('div', {}, dateFormat(param.row.application_release_time,"{y}-{m}-{d}"))];
                    }
                },
                { 
                    label: "审核状态",
                    align: "center",
                    width:'80',
                     render:(h, param) => {
                        let str="";
                        if(param.row.state===0){
                            str='未发布';
                        }else if(param.row.state===1){
                            str='审核中';
                        }else if(param.row.state===2){
                            str='未通过';
                        }else if(param.row.state===3){
                            str='已上线';
                        }else if(param.row.state===4){
                            str='已到期';
                        }else if(param.row.state===7){
                            str='待确认';
                        }else if(param.row.state===8){
                            str='已拒绝';
                        }
                        return [h('div', {}, str)];
                    }
                },
                {
                    label: "操作",
                    align: "center",
                    width:'300',
                    render:(h, param) => {
                        let that=this;
                        let a = [
                             h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "text"
                                },
                                on: {
                                    click: () => {
                                        that.dialogAddVisible=true;
                                        that.addAppData.name=param.row.name;
                                        that.addAppData.app_status=param.row.app_status;that.addAppData.id=param.row.id;
                                    }
                                }
                            }, '确认发布'),
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "text"
                                },
                                attrs:{
                                    style:"color:rgb(255, 35, 35);"
                                },
                                on: {
                                    click: () => {
                                        this.handleReject(param.row.id);
                                    }
                                }
                            }, '拒绝通过')];
                        return h('div', a);
                    }
                }
            ],
            phone_number:'',//手机号搜索
            app_name: '',//应用名称搜索
            app_brand:'',//品牌名搜索
            valueAll:'',//状态搜索
            options: [{
                value: 0,
                label: '试用期'
            },{
                value: 1,
                label: '正式版'
            },{
                value: 2,
                label: '已过期'
            }],
            optionsAll: [{
                value: '',
                label: '全部'
            },{
                value: 0,
                label: '试用期'
            },{
                value: 1,
                label: '正式版'
            },{
                value: 2,
                label: '已过期'
            }],
            addAppData:{
                id:0,
                name:'',
                app_status:'',
                application_release_time:[
                    dateFormat(new Date(),"{y}-{m}-{d}"),
                    dateFormat((new Date()).setFullYear((new Date()).getFullYear()+1),"{y}-{m}-{d}")
                ], //默认值设置
            },
            checkList:[],
            rules:{
                app_status: [
                    { required: true, message: '请选择应用状态', trigger: 'change' }
                ],
                application_release_time: [
                    { required: true, message: '请选择有效期限', trigger: 'change' }
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
        //初始化页面数据
        this.getAppList(this.currentPage);
    },
    methods: {
        close(){
        },
        handleClose(done){
            this.addAppData.application_release_time=[dateFormat(new Date(),"{y}-{m}-{d}"),dateFormat((new Date()).setFullYear((new Date()).getFullYear()+1),"{y}-{m}-{d}")];
            done();
        },
        async getAppList(currentPage,phone,status,appname,brandname){
            let that = this;
            this.currentPage=currentPage;
            let data={
                get_page:this.currentPage,
            }
            if(phone){
                data.tel=phone
            }
            if(status){
                data.type_id=status
            }
            if(appname){
                data.title=appname
            }
            if(brandname){
                data.brand=brandname
            }
            const loading = this.$loading({
                lock: true,
                text: '正在加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let newData=await getAuditApplicationList(data);
            this.$nextTick(()=>{
                loading.close();
                if(newData.data.code==200){
                    that.tableDataApp=newData.data.data.data;
                    that.totalPageApp=newData.data.total;
                }else{
                    that.$message.error(newData.data.msg);
                }
            })
        },
        add(){
            
        },
        search(){
            this.getAppList(this.currentPage,this.phone_number,this.valueAll,this.app_name,this.app_brand);
        },
        handleDialogVersionVisible(formName){
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data={
                        id:that.addAppData.id,
                        app_status:that.addAppData.app_status,
                        start_time:that.addAppData.application_release_time[0],
                        expire_time:that.addAppData.application_release_time[1],
                    }
                    const perform = async()=>{
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        let newData=await getWechatReview(data);
                        that.$nextTick(()=>{
                            loading.close();
                            if(newData.data.code===200){
                                that.$message.success('发布成功');
                                that.dialogAddVisible=false;
                                that.getAppList(that.currentPage);
                            }else if(newData.data.code===403){
                                that.$message.error(newData.data.msg);
                            }else{
                                that.$message.error(newData.data.msg);
                            }
                        })
                    }
                    perform();
                   
                } else {
                    that.$message.error('请选择参数！');
                }
            });
        },
        handleDateChange(val){
            this.addAppData.application_release_time=val;
        },
        handleReject(id){
            this.$confirm('此操作将驳回该申请, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this;
                let data={
                    id:id,
                }
                const perform = async()=>{
                let newData=await submitConfirmRelease(data);
                    that.$nextTick(()=>{
                        if(newData.data.code==200){
                            that.$message.success('已驳回');
                            that.getAppList(that.currentPage);
                        }else{
                            that.$message.error(newData.data.msg);
                        }
                    })
                }
                perform();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消驳回'
                });          
            });
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-admin-application{
    background-color: #fff;
    padding: 20px;
    .wf-search{
        margin-bottom: 20px;
        .wf-right{
            margin-right: 15px;
        }
    }
    .wf-no-required{
        /deep/ .el-form-item__label{
            padding-left: 10px;
        }
    }
    .tel{
        border-radius: 20px;
        padding: 9px 0 9px 20px;
        width: 220px;
        background: #F8F8F8;
        outline:none;
        margin-right: 40px;
    }
    .search{
        display: inline-block;
        background: #3A82F8;
        padding: 6px 26px;
        border-radius: 20px;
        color: #fff;
        cursor: pointer;
        margin-right: 20px;
    }
    /deep/ .gray{
        color: #ccc;
        cursor: auto;
    }
    /deep/ .cell{
        img{
            max-width: 40px;
            max-height: 40px;
        }
    }
    /deep/ .wf-publish{
        color: rgb(131, 171, 249);
    }
}
</style>