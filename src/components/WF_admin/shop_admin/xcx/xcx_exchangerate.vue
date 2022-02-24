<template>
    <div id="xcx_exchangerate">
        <div class="xcx_exchangerate_tip">人民币不变，外币根据人民币兑换汇率展示外币</div>
        <el-form>
            <el-form-item label="外币展示:" label-width="100px">
                <el-checkbox v-model="checked1" :disabled="disabledChecked" @change="handleChangeChecked1">商品首页</el-checkbox>
                <el-checkbox v-model="checked2" :disabled="disabledChecked" @change="handleChangeChecked2">商品列表</el-checkbox>
                <el-checkbox v-model="checked3" :disabled="disabledChecked" @change="handleChangeChecked3">商品详情</el-checkbox>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                label="币种"
                prop="name">
                </el-table-column>
                <el-table-column
                label="货币符号"
                prop="currency_symbol">
                </el-table-column>
                <el-table-column
                label="兑人民币汇率"
                prop="price">
                </el-table-column>
                <el-table-column
                label="状态"
                prop="is_show">
                </el-table-column>
                 <el-table-column
                label="默认展示"
                prop="state"
                >
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.state === 1 ? true:false" 
                        active-color="#719FF8"
                        inactive-color="#ccc"
                        @change="changereadio(scope.row)"
                        >
                    </el-switch>
                </template>
                </el-table-column>
                <el-table-column
                label="操作"
                width="260"
                align="center">
                <template slot-scope="scope">
                    <span  @click="delchangeState(scope.row)" class="changestate" v-if="scope.row.is_show==='已展示'">取消展示</span>
                    <span  @click="changeState(scope.row)" class="changestate" v-else>展示在小程序</span>
                </template>
                </el-table-column>
        </el-table>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
import {modularSetting ,modularUpstate ,} from '@/server/publish';
export default {
    name: 'xcx_exchangerate',
     data() {
        return {
            otheruuid:require('uuid/v1')(),
            tableData:[],
            checked1:false,
            checked2:false,
            checked3:true,
            showVersion:false,//控制版本提示
            disabledChecked:false //是否可修改
        }
    },
    components:{
        versionCom  
    },
    created: function(){
         this.getexchangerate()
    },
    mounted(){
        this.handleChangeSetting();
    },
    methods:{
        handleCloseVersion(){
            this.showVersion=false;
        },
         handleChangeChecked1(val){
             //判断版本兼容
            let that=this;
            getAuditApplicationList(15).then((res)=>{
                if(res.data.code==200){
                    if(res.data.data){
                        that.handleChangeUpdate(0);
                    }else{
                        that.showVersion=true;
                        if(that.checked1){
                            that.checked1=false;
                        }else{
                            that.checked1=true;
                        }
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((item)=>{
                that.$message.error(res.data.msg);
            })
         },
         handleChangeChecked2(val){
             //判断版本兼容
            let that=this;
            getAuditApplicationList(15).then((res)=>{
                if(res.data.code==200){
                    if(res.data.data){
                        that.handleChangeUpdate(1);
                    }else{
                        that.showVersion=true;
                        if(that.checked2){
                            that.checked2=false;
                        }else{
                            that.checked2=true;
                        }
                    }
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch((item)=>{
                that.$message.error(res.data.msg);
            })
         },
         handleChangeChecked3(val){
            this.handleChangeUpdate(2);
         },
         handleChangeSetting(){
            let that = this
              const loading = this.$loading({
                lock: true,
                text: '正在载入数据...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let data = { 
                modular_id:33,
                token:localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId")
             }
            modularSetting(data).then((res)=>{
                loading.close();
                if(res.data.code===200){
                    if(res.data.msg){
                        if(res.data.msg.info){
                            if(Object.prototype.toString.call(res.data.msg.info)==='[object Array]'){
                                let count=0;
                                res.data.msg.info.forEach((item)=>{
                                    if(item.type===0){
                                        that.checked1=true
                                        count+=1;
                                    }
                                    if(item.type===1){
                                        that.checked2=true
                                        count+=4;
                                    }
                                    if(item.type===2){
                                        that.checked3=true
                                        count+=7;
                                    }
                                })
                                if(count===1){
                                    that.checked1=true;
                                    that.checked2=false;
                                    that.checked3=false;
                                }else if(count===4){
                                    that.checked1=false;
                                    that.checked2=true;
                                    that.checked3=false;
                                }else if(count===5){
                                    that.checked1=true;
                                    that.checked2=true;
                                    that.checked3=false;
                                }else if(count===7){
                                    that.checked1=false;
                                    that.checked2=false;
                                    that.checked3=true;
                                }else if(count===8){
                                    that.checked1=true;
                                    that.checked2=false;
                                    that.checked3=true;
                                }else if(count===11){
                                    that.checked1=false;
                                    that.checked2=true;
                                    that.checked3=true;
                                }else if(count===0){
                                    that.checked1=false;
                                    that.checked2=false;
                                    that.checked3=false;
                                }
                            }
                        }else{
                            that.checked1=false;
                            that.checked2=false;
                            that.checked3=false;
                        }
                    }
                    if(res.data.msg.state===0){
                        that.disabledChecked=true;
                    }else{
                        that.disabledChecked=false;
                    }
                }else{
                    that.$message.error(res.data.msg+'600A0027');
                }
            }).catch((err)=>{
                loading.close();
                that.$message.error('系统出错，请联系管理员!600B0026');
            })
         },
         handleChangeUpdate(id){
            let that = this
            const loading = this.$loading({
                lock: true,
                text: '正在修改中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let data = { 
                token:localStorage.getItem("userId"),
                pro_id: localStorage.getItem("proId"),
                modular_id:33,
                type:id,
                otheruuid:this.otheruuid
            }
            modularUpstate(data).then((res)=>{
                loading.close();
                if(res.data.code===200){
                    
                }else{
                    that.$message.error(res.data.msg+"600A0029");
                }
            }).catch((err)=>{
                loading.close();
                that.$message.error('系统出错，请联系管理员!600B0028');
            })
         },
         changereadio(val){//是否默认显示
            let that = this
             if(val.state === 0){//不是默认
                 this.$confirm(val.state === 0 ? "是否设为默认":"是否取消默认", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method:'post',
                        url: this.url+'shopapi/exchange_rate/setMaster',
                        data:{
                            secret:localStorage.getItem('secretId'),
                            token:localStorage.getItem('userId'),
                            id:val.aid
                        }
                    }).then(function(res){
                            if(res.data.code === 200){
                                that.$message({
                                                type: 'success',
                                                message: '修改成功!'
                                            });
                                that.$axios({
                                    method:'post',
                                    url: that.url+'shopapi/exchange_rate/index',
                                    data:{
                                        secret:localStorage.getItem('secretId'),
                                        token:localStorage.getItem('userId')
                                    }
                                }).then(function(res){
                                        if(res.data.code === 200){
                                            that.tableData = res.data.data
                                            
                                        }else{
                                            that.$message({
                                                showClose: true,
                                                message: '网络错误，请联系管理员!',
                                                type: 'error'
                                            });
                                        }
                                })
                            }else{
                                that.$message({
                                    showClose: true,
                                    message: '请先选择是否展示小程序!',
                                    type: 'error'
                                });
                            }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已放弃修改'
                    });          
                });
             }else{
                 this.$message({
                        type: 'info',
                        message: '请取消展示'
                    }); 
             }
            
         },
         changeState(val){//展示按钮
            let that = this
            this.$confirm('是否展示在小程序', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios({
                    method:'post',
                    url: this.url+'shopapi/exchange_rate/setShow',
                    data:{
                        secret:localStorage.getItem('secretId'),
                        token:localStorage.getItem('userId'),
                        id:val.id
                    }
                }).then(function(res){
                        if(res.data.code === 200){
                            that.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            that.$axios({
                                method:'post',
                                url: that.url+'shopapi/exchange_rate/index',
                                data:{
                                    secret:localStorage.getItem('secretId'),
                                    token:localStorage.getItem('userId')
                                }
                            }).then(function(res){
                                    if(res.data.code === 200){
                                        that.tableData = res.data.data
                                         
                                    }else{
                                        that.$message({
                                            showClose: true,
                                            message: '网络错误，请联系管理员!',
                                            type: 'error'
                                        });
                                    }
                            })
                        }else{
                            that.$message({
                                showClose: true,
                                message: '网络错误，请联系管理员!',
                                type: 'error'
                            });
                        }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已放弃修改'
                });          
            });
         },
         delchangeState(val){//取消展示按钮
            let that = this
            this.$confirm('是否取消展示', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios({
                    method:'post',
                    url: this.url+'shopapi/exchange_rate/delShow',
                    data:{
                        secret:localStorage.getItem('secretId'),
                        token:localStorage.getItem('userId'),
                        id:val.aid
                    }
                }).then(function(res){
                        if(res.data.code === 200){
                            that.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            that.$axios({
                                method:'post',
                                url: that.url+'shopapi/exchange_rate/index',
                                data:{
                                    secret:localStorage.getItem('secretId'),
                                    token:localStorage.getItem('userId')
                                }
                            }).then(function(res){
                                    if(res.data.code === 200){
                                        that.tableData = res.data.data
                                         
                                    }else{
                                        that.$message({
                                            showClose: true,
                                            message: '网络错误，请联系管理员!',
                                            type: 'error'
                                        });
                                    }
                            })
                        }else{
                            that.$message({
                                showClose: true,
                                message: '网络错误，请联系管理员!',
                                type: 'error'
                            });
                        }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已放弃修改'
                });          
            });
         },
         getexchangerate(){//获取实时汇率类表
         let that = this
            this.$axios({
                method:'post',
                url: this.url+'shopapi/exchange_rate/index',
                data:{
                    secret:localStorage.getItem('secretId'),
                    token:localStorage.getItem('userId')
                }
            }).then(function(res){
                    if(res.data.code === 200){
                        that.tableData = res.data.data
                    }else{
                        that.$message({
                            showClose: true,
                            message: '网络错误，请联系管理员!',
                            type: 'error'
                        });
                    }
            })
         }
     }
}
</script>

<style lang="scss" scoped>
    #xcx_exchangerate{
        background: #fff;
        padding: 20px;
        .xcx_exchangerate_tip{
            // width: 90%;
            height:40px;
            background:rgba(252,252,217,1);
            border:1px solid rgba(249,224,162,1);
            border-radius:4px;
            line-height: 40px;
            font-size:16px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            text-indent: 2em;
        }
        .changestate{
            cursor: pointer;
            color: #719FF8;
        }
        .el-table{
            padding: 0 20px 20px 20px;
        }
        .el-form{
            padding-top: 20px;
        }
    }
</style>
