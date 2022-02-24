<template>
    <div class="wf-specialModal">
        <el-button type="primary" class="wf-add" size="mini" @click="addData">新增运费模板</el-button>
        <template>
            <el-popover
            placement="right"
            width="450"
            trigger="hover">
            • 店铺统一运费介绍：对使用店铺统一运费的商品，不同商品数量、金额总和满足条件即可免邮。例：统一运费满3件包邮，则购买使用统一运费的A商品3件，使用统一运费的B商品1件，则包邮。<br>
                •  个性化运费模板介绍：对使用个性化运费模板的商品单品进行免邮设置，必须单品满足条件才可免邮。例：M模板满3件包邮，则购买使用M模板的A商品必须满3件才包邮；若购买使用M模板的A商品2件，使用M模板的B商品1件，则不包邮。<br>
                • 一个订单存在多个商品，若存在包邮商品并满足包邮条件，则整单包邮，不收取运费；若不存在包邮商品，则先将使用店铺统一运费和个性化运费模板的商品分开计算，再取二者较大的值，作为最终运费。
                <span slot="reference" class="el-icon-question wf-question-size"></span>
            </el-popover>
        </template>
        <my-table class="wf-table-parent" 
        ref="table" 
        :tableData="tableDataApp" 
        :columns="columnsApp" 
        :totalPage="totalPageApp"  
        :currentPage="currentPage" 
        @currentChange="getShow" 
        :expand="expand"
        :getRowKeys="getRowKeys"
        :expands="expands"
        >
             <template slot="expandRow" slot-scope="scope">
                <my-table class="wf-table-children" 
                :pagination="pagination" 
                :tableData="scope.row.list"
                :columns="columnsExp">
                </my-table>
            </template>
        </my-table>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
import {getShowTemplate, getShowlist, deleteList ,getAllProvince, copyFare} from "@/server/fare";
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';

export default {
    name: '',
    data() {
        return {
            showVersion:false,//控制版本提示
            loadingCopy:false,//加载复制按钮
            expand:true,
            pagination:false,
            tableDataApp:[],
            totalPageApp:0,
            currentPage:1,
            columnsApp: [
                 {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h('div',this.$refs.table.$scopedSlots.expandRow({ row: params.row }))
                    }
                },
                { 
                    prop: "name", 
                    label: "模板名称",
                    align: "center",
                },
                { 
                    label: "计算方式",
                    align: "center",
                    render:(h, param) => {
                        let renderText='';
                        if(param.row.state==0){
                            renderText="按件数";
                        }else if(param.row.state==1){
                            renderText="按重量";
                        }
                        return h('span', renderText);
                        
                    }
                },
                { 
                    prop: "create_time", 
                    label: "创建时间",
                    align: "center"
                },
                {
                    label: "操作",
                    align: "center",
                    render:(h, param) => {
                        let copy=h('el-button', {
                            props: {
                                size: "mini",
                                type: "text"
                            },
                            attrs:{
                                style:"color:rgb(131, 171, 249);font-size:14px;padding-left: 50px;"
                            },
                            on:{
                                click:()=>{
                                   this.handleCopy(param.row.id);
                                }
                            }
                        }, '复制');
                        let edit=h('el-button', {
                            props: {
                                size: "mini",
                                type: "text",
                            },
                            attrs:{
                                style:"color:rgb(131, 171, 249);font-size:14px;"
                            },
                            on:{
                                click:()=>{
                                    this.$router.push({path:'/wf/admin/shop/freight_management/addSpecialModal',query:{param:'edit',id:param.row.id}});   
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
                                    this.$confirm('你要删除'+param.row.name+'这个模板么?', '温馨提示', {
                                        confirmButtonText: '删除',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        this.deleteSpecialList(param.row.id);
                                    }).catch(() => {
                                        this.$message({
                                            type: 'info',
                                            message: '已取消删除'
                                        });          
                                    });
                                    
                                }
                            }
                        }, '删除');
                        return [copy,edit,deleteBtn];
                    }
                }
            ],
            columnsExp:[
                { 
                    label: "可配送区域",
                    align: "center",
                    render:(h, param) => {
                        const regionArr=param.row.regionZH.split(',');
                        const regionText=this.$store.state.fromDataAllFare.filter((item)=>{
                            if(regionArr.some(element => {
                                if(item.base_areaid==element){
                                    return true;
                                }
                            })){
                                return item;
                            }
                        }).map((item)=>item.name).join(',');
                        return [h('span',regionText)];
                    }
                },
                { 
                    prop: "first_number", 
                    label: "首(件/重)",
                    align: "center"
                },
                { 
                    prop: "first_price", 
                    label: "运费（元）",
                    align: "center"
                },
                { 
                    prop: "add_number", 
                    label: "续（件/重）",
                    align: "center"
                },
                { 
                    prop: "add_price", 
                    label: "续费（元）",
                    align: "center"
                },
                { 
                    label: "包邮",
                    align: "center",
                    render:(h, param) => {
                         if(param.row.type==0){
                            return [h('span','未设置')]
                        }else{
                            if(param.row.modular_id==27){
                                return [h('span','满'),h('span',param.row.amount+'元包邮')]
                            }else if(param.row.modular_id==28){
                                return [h('span','满'),h('span',param.row.piece+'件包邮')]
                            }
                        }
                     }
                }
            ],
            // 获取row的key值
            getRowKeys(row) {
                return row.id;
            },
            // 要展开的行，数值的元素是row的key值
            expands: []
        }
    },
    components: {
        MyTable,
        versionCom
    },
    created(){

    },
    mounted(){
        this.getShow(this.currentPage);
        this.initAddress();
    },
    methods: {
        //复制个性化模板
        handleCopy(id){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
                id:id
            }    
            const loading = this.$loading({
                lock: true,
                text: '正在复制中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            copyFare(data).then((res)=>{
                loading.close();
                if(res.data.code===200){
                    that.getShow(that.currentPage);
                    that.$message.success('复制成功');
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                loading.close();
                that.$message.error('网络错误！');
            });
        },
        //关闭版本校验
        handleCloseVersion(){
            this.showVersion=false;
        },
        //初始化所有省区域地址
        initAddress(){
            let that=this;
            let data1={
                secret:localStorage.getItem('secretId')
            }    
            getAllProvince(data1).then((res)=>{
                    if(Object.prototype.toString.call(res.data.data)==='[object Array]'){
                        that.$store.commit({
                            type:'getFromDataAllFare',
                            fromDataAllFare:res.data.data
                        })
                    }else{
                        that.$message.error('数据类型错误!');
                    }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        addData(){
            //判断版本兼容
            let that=this;
            getAuditApplicationList(8).then((res)=>{
                if(res.data.code==200){
                    if(res.data.data){
                        that.$router.push({path:'/wf/admin/shop/freight_management/addSpecialModal'});
                    }else{
                        that.showVersion=true;
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((item)=>{
                that.$message.error(res.data.msg);
            })
        },
        //删除运费模板
        deleteSpecialList(id){
            let that=this;  
            let data={
                id:id,
                secret:localStorage.getItem('secretId')
            }    
            deleteList(data).then((res)=>{
                if(res.data){
                    if(res.data.code===200){     
                        that.flagP=true;
                        that.$message.success(res.data.msg);
                        that.getShow(that.currentPage);
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }else{
                    that.$message.error('网络错误！');
                }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
        //查询个性化运费模板列表
        getShow(currentPage){
            let that=this;  
            that.currentPage=currentPage;
            let data={
                page:currentPage,
                secret:localStorage.getItem('secretId')
            }     
            getShowTemplate(data).then((res)=>{
                if(res.data){
                    if(res.data.code===200){
                        that.tableDataApp=res.data.data.detail;
                        that.totalPageApp=res.data.data.total;
                    }else{
                        that.$message.error('网络错误！');
                    }
                }else{
                    that.tableDataApp=null;
                }
            }).catch(err=>{
                that.$message.error('网络错误！');
            });
        },
    }
}
</script>


<style lang="scss" scoped>
.wf-specialModal{
    padding: 0 20px 20px 20px;
    .wf-add{
        margin-bottom: 20px;
    }
    /deep/ .wf-table-parent{
        .el-table th,.el-table tr{
            background: #fafafa;
            
            &:hover>td{
                background: #e6f7ff;
            }
        }
        .el-table td, .el-table th{
            padding: 8px 0;
        }
        .el-table__expanded-cell{
            padding: 0 0 0 50px !important;
            &:hover{
                background-color: #fff !important;
            }
        }
        .wf-table-children{
            /deep/ .el-table {
                &::before{
                    height:0;
                }
                th,tr{
                    background-color: #fff;
                }
                
            }
        }
    }
    .wf-question-size{
        font-size: 20px;
        margin-left: 10px;
        color: #ccc;
    }
}
</style>