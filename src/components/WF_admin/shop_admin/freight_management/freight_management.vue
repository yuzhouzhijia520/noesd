<template>
    <div id="freight_management">
        <el-button type="primary" class="wf-add" size="mini" @click="addData">新增运费模板</el-button>
        <template>
            <el-popover
            placement="right"
            width="450"
            trigger="hover">
                • 店铺统一运费介绍：对使用店铺统一运费的商品，不同商品数量、金额总和满足条件即可免邮。例：统一运费满3件包邮，则购买使用统一运费的A商品3件，使用统一运费的B商品1件，则包邮。<br>
                •  个性化运费模板介绍：对使用个性化运费模板的商品单品进行免邮设置，必须单品满足条件才可免邮。例：M模板满3件包邮，则购买使用M模板的A商品必须满3件才包邮；若购买使用M模板的A商品2件，使用M模板的B商品1件，则不包邮。<br>
                • 一个订单存在多个商品，若存在包邮商品并满足包邮条件，则整单包邮，不收取运费；若不存在包邮商品，则先将使用店铺统一运费和个性化运费模板的商品分开计算，再取二者较大的值，作为最终运费。
                <span slot="reference" class="el-icon-question wf-question-size">
                    
                </span>
            </el-popover>
        </template>
        
        <el-table
        :data="tableData"
        style="width: 100%;">
            <el-table-column
            label="名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="首件费用"
            prop="first_price">
            </el-table-column>
            <el-table-column
            label="每增加一件费用"
            prop="add_price">
            </el-table-column>
            <el-table-column
            label="优惠类型">
                <template slot-scope="scope">
                    {{scope.row.piece!=0?"满"+scope.row.piece+"件包邮":(scope.row.amount!="0.00"?"满"+scope.row.amount+"元包邮":"")}}
                </template>
            </el-table-column>
            <el-table-column
            label="配送范围"
            prop="region">
            </el-table-column>
            <el-table-column label="操作"
            width="220">
            <template slot-scope="scope">
                <el-button size="mini"  @click="editData(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteData(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
          class="jianju"
          layout="prev, pager, next"
          background
          :total="pageCount"
          :page-size='pageSize'
          @current-change="getPages">
        </el-pagination>

        <el-dialog
        title="新增运费"
        :visible.sync="dialogVisible"
        width="50%">
            <el-form
            label-position="right"
            label-width="110px"
            class="demo-ruleForm">
                <el-form-item label="名称">
                    <el-input  v-model="name" size="mini" style="width:240px;"></el-input>
                </el-form-item>
                <el-form-item label="首件费用">
                    <el-input-number v-model="first_price" :controls="false" :min="0" :precision="2" size="mini" style="width:240px;"></el-input-number>
                </el-form-item>
                <el-form-item label="每增加一件费用">
                    <el-input-number v-model="add_price" :controls="false" :min="0" :precision="2" size="mini" style="width:240px;"></el-input-number>
                </el-form-item>
                <el-form-item label="包邮设置">
                    <div>
                        <el-switch :disabled="amout_dis" @change="switchChange(27)" v-model="amount_switch" active-color="#719FF8" style="margin-right:10px;"></el-switch>满额包邮
                        满<el-input-number :controls="false" :min="0" :precision="2" v-model="amount" size="mini" style="width:100px;margin:0 10px;"></el-input-number>元包邮
                    </div>
                    <div style="margin-top:8px;">
                        <el-switch :disabled="piece_dis" @change="switchChange(28)" v-model="piece_switch" active-color="#719FF8" style="margin-right:10px;"></el-switch>满件包邮
                        满<el-input-number :controls="false" :min="0" :precision="0" v-model="piece" size="mini" style="width:100px;margin:0 10px;"></el-input-number>件包邮
                    </div>
                    <div class="wf-gray-tit">包邮只能开启一个开关，请先关闭正在开启的按钮再选择另一个开关</div>
                </el-form-item>
                <el-form-item label="配送区域">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="changeRegion">
                        <el-checkbox v-for="city in checkedCities1" :label="city.name" :key="city.name">{{city.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button size="mini"  @click="saveTrue">确 定</el-button>
            </span>
        </el-dialog>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
export default {
    name: 'freight_management',
    data () {
        return {
            showVersion:false,//控制版本提示
            amout_dis: false,
            piece_dis: false,
            isIndeterminate: true,
            checkAll: false,
            tableData: [],
            dialogVisible: false,
            pageCount: 1,
            pageSize: 8,
            getPages: 1,
            name: "",
            first_price: undefined,
            add_price: undefined,
            checkedCities1: [],
            changeRegion:[],
            edit: false,
            amount: undefined, // 满额
            piece: undefined, // 满件
            amount_switch: false, // 满额开关
            piece_switch: false, // 满件开关
            selfId: "",
            payId: "",
            closeVersionId:0,
        }
    },
    components:{
        versionCom
    },
    created() {
        if(this.$route.query.activeName==="first"){
            this.dialogVisible = true
        }
        this.getData()
    },
    methods: {
        handleCloseVersion(){
            if(this.closeVersionId===27){
                this.amount_switch=false;
            }
            if(this.closeVersionId===28){
                this.piece_switch=false;
            }
            this.showVersion=false;
        },
        getData(){
            let that = this
            this.$axios.post(this.url + 'shopapi/Freight/showTemplate',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')
            )
            .then(function(res){
                if(res.data.code==200){
                    that.tableData = res.data.data.data
                    that.pageSize = res.data.data.total
                    that.pageCount = res.data.data.data.length
                }else{
                    that.$message({
                        showClose: true,
                        message: '请求失败',
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
        addData(){
            this.piece = undefined
            this.amount = undefined
            this.amount_switch = false
            this.piece_switch = false
            this.name = ''
            this.first_price = undefined
            this.add_price = undefined
            this.changeRegion=[];
            this.dialogVisible = true
            this.edit = false
            let that=this;
            this.$axios.post(this.url + 'shopapi/Freight/showAddress',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')
            )
            .then(function(res){
                if(res.data.code==200){
                    that.checkedCities1 =res.data.data
                }else{
                    that.$message({
                        showClose: true,
                        message: '请求失败',
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
        async switchChange(id){
            this.closeVersionId=id;//标记回调函数id值
            let that = this
            let state
            let dataId = ""
            if(id===27){
                if(this.selfId!=""){
                    dataId = this.selfId
                    if(this.amount_switch===true){
                        state = 0
                    }else{
                        state = 1
                    }
                }else{
                    if(this.amount_switch===true){
                        state = 1
                    }else{
                        state = 0
                    }
                }
            }else if(id===28){
                if(this.payId!=""){
                    dataId = this.payId
                    if(this.piece_switch===true){
                        state = 0
                    }else{
                        state = 1
                    }
                }else{
                    if(this.piece_switch===true){
                        state = 1
                    }else{
                        state = 0
                    }
                }
            }
            let data = {
                secret: localStorage.getItem('secretId'),
                modular_id: id,
                state: state
            }
            if(dataId!=""){
                data.id = dataId
            }
            if(this.amount_switch===this.piece_switch&this.amount_switch===true){
                data.type = 1
                if(id===27){
                    data.type_id = this.payId
                }else{
                    data.type_id = this.selfId
                }
            }
            /**
             * 1是包邮的id
             */
            if(id===27){
                if(this.amount_switch){
                    let newData=await getAuditApplicationList(1);
                    this.$nextTick(()=>{
                        if(newData.data.code==200){
                            if(newData.data.data){
                                that.updateStore(data);
                            }else{
                                that.showVersion=true;
                            }
                        }else{
                            that.$message.error(newData.data.msg);
                        }
                    })
                }else{
                    that.updateStore(data);
                }
            }
            if(id===28){
                if(this.piece_switch){
                    let newData=await getAuditApplicationList(1);
                    this.$nextTick(()=>{
                        if(newData.data.code==200){
                            if(newData.data.data){
                                that.updateStore(data);
                            }else{
                                that.showVersion=true;
                            }
                        }else{
                            that.$message.error(newData.data.msg);
                        }
                    })
                }else{
                    that.updateStore(data);
                }
            }
        },
        updateStore(data){
            const loading = this.$loading({
                lock: true,
                text: '修改中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let that=this;
            this.$axios.post(this.url+'shopapi/freight/store', data)
            .then(function (res) {
                loading.close()
                if(res.data.code===200){
                    that.$message.success("修改成功");
                    that.getCompile();
                }else{
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                loading.close()
                that.$message.error('请联系管理员');
            });
        },
        getCompile(){ // 获取开关数据回填
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axios.post(this.url+'shopapi/program/compile',data
            ).then(res=>{
                if(res.data.code===200){
                    if(res.data.data.length>0){
                        res.data.data.forEach(el => {
                            if(el.modular_id===27){
                                that.selfId = el.id
                            }else if(el.modular_id===28){
                                that.payId = el.id
                            }
                        });
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        saveTrue(){
            let that = this
            if(this.name==''){
                that.$message({showClose: true,message: '名称不能为空',type: 'error'})
            }else if(this.checkedCities1.length==0){
                that.$message({showClose: true,message: '配送区域未选择',type: 'error'})
            }else if(this.amount_switch===true&this.amount===undefined){
                this.$message.warning("请填写满额多少元")
            }else if(this.piece_switch===true&this.piece===undefined){
                this.$message.warning("请填写满件多少件")
            }else if(this.edit==false){
                let amount = ""
                if(this.amount_switch===true){
                    amount = '&amount='+this.amount+'&type=1'+'&modular_id=27'
                }else if(this.piece_switch===true){
                    amount = '&piece='+this.piece+'&type=2'+'&modular_id=28'
                }else{
                    amount = '&type=0'
                }
                this.$axios.post(this.url + 'shopapi/Freight/addTemplate',
                    'token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId')+
                    '&name='+that.name+
                    '&first_price='+that.first_price+
                    '&add_price='+that.add_price+
                    '&region='+that.changeRegion+
                    amount
                )
                .then(function(res){
                    if(res.data.code==200){
                        that.$message.success("添加成功")
                        that.getData()
                        that.dialogVisible=false
                    }else{
                        that.$message.error(res.data.msg)
                    }
                })
                .catch(function (error) {
                    that.$message.error("网络错误")
                })
            }else if(this.edit==true){
                let amount = ""
                if(this.amount_switch===true){
                    amount = '&amount='+this.amount+'&piece='+0+'&type=1'+'&modular_id=27'
                }else if(this.piece_switch===true){
                    amount = '&piece='+this.piece +'&amount='+0.00+'&type=2'+'&modular_id=28'
                }else{
                    amount = '&type=0'
                }
                this.$axios.post(this.url + 'shopapi/Freight/editTemplate',
                    'token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId')+
                    '&name='+that.name+
                    '&first_price='+that.first_price+
                    '&add_price='+that.add_price+
                    '&region='+that.changeRegion+
                    '&id='+that.id+
                    amount
                )
                .then(function(res){
                    if(res.data.code==200){
                        that.$message.success("修改成功")
                        that.getData()
                        that.dialogVisible=false
                    }else{
                        that.$message.error(res.data.msg)
                    }
                })
                .catch(function (error) {
                    that.$message.error("网络错误")
                })
            }
        },
        deleteData(e){
            let that = this
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.url + 'shopapi/Freight/delTemplate',
                    'token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId')+
                    '&id='+e
                )
                .then(function(res){
                    if(res.data.code==1){
                        that.$message.success("删除成功");
                        that.getData()
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
        editData(e){
            if(e.amount!="0.00"){
                this.amount = e.amount
                this.amount_switch = true
                this.piece = undefined
                this.piece_switch = false
            }else if(e.piece!=0){
                this.piece = e.piece
                this.piece_switch = true
                this.amount = undefined
                this.amount_switch = false
            }else{
                this.piece = undefined
                this.amount = undefined
                this.amount_switch = false
                this.piece_switch = false
            }
            this.name = e.name,
            this.id = e.id,
            this.first_price = e.first_price
            this.add_price = e.add_price
            this.changeRegion = e.region.split(",")
            this.dialogVisible=true
            this.edit = true
            let that=this;
            this.$axios.post(this.url + 'shopapi/Freight/showAddress',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+'&freight_id='+e.id
            )
            .then(function(res){
                if(res.data.code==200){
                    that.checkedCities1 =res.data.data
                    that.getCompile()
                }else{
                    that.$message({
                        showClose: true,
                        message: '请求失败',
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
        handleCheckAllChange(val) {
            if(val==true){
                for(var a in this.checkedCities1){
                    this.changeRegion.push(this.checkedCities1[a].name)
                }
            }else{
                this.changeRegion = []
            }
            this.isIndeterminate = false;
        }
    },
    watch: {
        amount_switch(val,oldVal){
            // if(val===true){
            //     this.piece_dis = true
            // }else{
            //     this.piece_dis = false
            // }
            if(this.piece_switch===val){
                this.piece_switch = false
            }
        },
        piece_switch(val,oldVal){
            // if(val===true){
            //     this.amout_dis = true
            // }else{
            //     this.amout_dis = false
            // }
            if(this.amount_switch===val){
                this.amount_switch = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#freight_management{
    padding: 0 20px 20px 20px;
    .wf-add{
        margin-bottom: 20px;
    }
    .jianju{
        margin: 20px 0;
    }
    .wf-gray-tit{
        font-size: 12px;
        color: #999;
    }
    .el-checkbox{
        margin-left: 30px;
        margin-top: 10px;
        width: 80px;
    }
    .el-pagination{
        text-align: center;
    }
    .wf-question-size{
        font-size: 20px;
        margin-left: 10px;
        color: #ccc;
    }
}
</style>
