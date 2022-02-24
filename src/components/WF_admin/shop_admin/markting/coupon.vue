<template>
    <div class="wf-coupon">
        <el-button type="primary" @click="addCoupon" size="mini" class="wf-coupon-add">新增优惠券</el-button>
        <my-table :tableData="tableData" :columns="columns" :totalPage="totalPage" :currentPage="currentPage" @currentChange="getTableData"></my-table>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {dateFormat} from '@/untils/common.js';
export default {
    name: 'coupon',
    data() {
        return {
            tableData: [],
            totalPage:1,
            currentPage:1,
            dialogVisible: false,
            columns: [
                {   prop: "coupon_name", 
                    label: "名称",
                    align: "center"
                },
                { prop: "start_time", 
                    label: "有效期",
                    align: "center",
                    width: "240",
                    render:function(h,param){
                        let time = ''
                        if(param.row.expire_type==0){
                            time = dateFormat(param.row.start_time,'{y}/{m}/{d}') + " 至 " + dateFormat(param.row.end_time,'{y}/{m}/{d}');
                        }else{
                            time = param.row.expire_time + '天'
                        }
                        return [h('span', time)];
                    }
                },
                { 
                    label: "面额",
                    align: "center", 
                    width: "120" ,
                    render:function(h,param){
                        let a = "减" + param.row.coupon_price + "元"
                        return [h('span', a)];
                    }
                },
                {
                    label: "订单金额",
                    align: "center",
                    width: "160",
                    render:function(h,param){
                        let a = "满" + param.row.subtraction_price + "元"
                        return [h('span', a)];
                    }
                },
                {   prop: "coupon_num",
                    label: "已领取/已使用",
                    align: "center" ,
                    width: "160",
                    render:function(h,param){
                        let num=  param.row.user_num + '/' + param.row.use_user_num;
                        return [h('span', num)];
                    }
                },
                {
                    prop: "state",
                    label: "状态",
                    width: "80",
                    align: "center",
                    render: function(h, param) {
                        let stateText='';
                        if(param.row.state===0){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: "info"
                                }
                            }, '无效')];
                        }else if(param.row.state===1){
                            stateText = [h('el-tag', {
                                props: {
                                    size: "mini",
                                    type: "primary"
                                }
                            }, '有效')];
                        }
                        return h('div', stateText);
                    }
                },
                {
                    prop: "",
                    label: "操作",
                    align: "center",
                    render: (h, param) => {
                        let a = ''
                        if(param.row.state===1){
                            a = [
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "primary",
                                    disabled: true
                                },
                                on: {
                                    click: () => {
                                         
                                    }
                                }
                            }, '编辑'),
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "danger"
                                },
                                on: {
                                    click: () => {
                                        this.deleteData(param.row.id)
                                    }
                                }
                            }, '删除')];
                        }else if(param.row.state===0){
                            a = [
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "primary"
                                },
                                on: {
                                    click: () => {
                                        localStorage.setItem("id",param.row.id);
                                        localStorage.setItem("coupon_name",param.row.coupon_name);
                                        localStorage.setItem("coupon_price",param.row.coupon_price);
                                        localStorage.setItem("subtraction_price",param.row.subtraction_price);
                                        localStorage.setItem("coupon_num",param.row.coupon_num);
                                        localStorage.setItem("classify",param.row.classify);
                                        localStorage.setItem("state",param.row.state);
                                        if(param.row.user_num||param.row.user_num===0){
                                            localStorage.setItem("user_num",param.row.user_num);
                                        }
                                        if(param.row.use_user_num||param.row.use_user_num===0){
                                            localStorage.setItem("use_user_num",param.row.use_user_num);
                                        }
                                        
                                         //使用限制
                                        if(param.row.classify===0){
                                            localStorage.setItem("coupon_other_id",param.row.classify);
                                        }else if(param.row.classify===1||param.row.classify===2||param.row.classify===3){
                                            localStorage.setItem("coupon_other_id",param.row.coupon_other_id);
                                        }
                                        localStorage.setItem("expire_type",param.row.expire_type);
                                        //期效方式
                                        if(param.row.expire_type===0){
                                            localStorage.setItem("start_time",param.row.start_time);
                                            localStorage.setItem("end_time",param.row.end_time);
                                        }else if(param.row.expire_type===1){
                                            localStorage.setItem("expire_time",param.row.expire_time);
                                        }
                                        if(param.row.grant){
                                            localStorage.setItem("grant",param.row.grant);
                                            let val=Array.from(param.row.grant,x=>parseInt(x));
                                            let validgrant=val.includes(4);
                                            if(validgrant){
                                                localStorage.setItem("fullSelect",param.row.fullSelect);
                                                if(param.row.fullSelect===0){
                                                    localStorage.setItem("full_price",param.row.full_price);
                                                }else if(param.row.fullSelect===1){
                                                    localStorage.setItem("full_order",param.row.full_order);
                                                }
                                            }
                                        }
                                        
                                       
                                        // localStorage.setItem("coupon_name",param.row.coupon_name);
                                        // localStorage.setItem("coupon_name",param.row.coupon_name);
                                        // localStorage.setItem("coupon_name",param.row.coupon_name);
                                        if(param.row.classify===2){
                                            this.$store.commit({
                                                type:'getCouponList',
                                                couponList:param.row.good_list,
                                            });
                                        }else if(param.row.classify===3){
                                            this.$store.commit({
                                                type:'getCouponNotList',
                                                couponNotList:param.row.good_list,
                                            });
                                        }
                                        this.$router.push({path:'/wf/admin/shop/markting/coupon/couponEdit',name:'couponEdit',query:{param:'edit'}});
                                        
                                    }
                                }
                            }, '编辑'),
                            h('el-button', {
                                props: {
                                    size: "mini",
                                    type: "danger"
                                },
                                on: {
                                    click: () => {
                                        this.deleteData(param.row.id)
                                    }
                                }
                            }, '删除')];
                        }
                        return h('div', a);
                    }
                }
            ],
        }
    },
    components: {
        MyTable
    },
    mounted(){
        this.getTableData(this.currentPage);
    },
    methods: {
        getTableData: function(currentPage) {
            let that=this;
            //根据getTableData传入的参数设置位全局变量中的当前页，入参有两种情况：
            //1、将默认设置的当前页（currentPage=1）
            //2、公共组件table中回调当前页
            that.currentPage=currentPage;
            //本地调试采用mock
            // this.$axios.get('/api/mockjs/agentAddGroup').then(res=>{
            let data={
                page:currentPage
            };
            this.$axios.post(this.url+'shopapi/coupon/couponIndex',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')+
            '&page='+data.page
            ).then(res=>{
                if(res.data.code===200){
                    that.tableData = res.data.data.data;
                    that.currentChange = res.data.data.current_page;
                    that.totalPage = res.data.data.total
                }else{
                    this.$message.error({
                        title: 'error',
                        message: '系统出错，请联系管理员！',
                        duration: 2000
                    });
                }
            }).catch(err=>{
                that.$message.error({
                    title: 'error',
                    message: '系统出错，请联系管理员！',
                    duration: 2000
                });
            });
        },
        addCoupon:function(){
            this.$router.push({path:'/wf/admin/shop/markting/coupon/addCoupon',name:'addCoupon'})
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
                        this.$message.error({
                            title: 'error',
                            message: '系统出错，请联系管理员！',
                            duration: 2000
                        });
                    }
                }).catch(err=>{
                    this.$message.error({
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
.wf-coupon{
    background-color: #fff;
    padding: 20px;
    font-size: 16px;
    .wf-coupon-add{
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