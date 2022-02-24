<template>
    <div class="wf-DIY-emailSet">
        <el-dialog :visible.sync="mailSet"
            :title="title"   
            :before-close="handleClose" 
            center
            width="40%">
            <el-form :label-position="labelPosition"  
                        :model="emailSetData"
                        ref="emailSetData"
                        label-width="10rem"
                        class="demo-ruleForm">
                    <el-form-item label="包邮设置">
                        <div>
                            <el-switch :disabled="amout_dis" @change="switchChange(27)" v-model="emailSetData.amount_switch" active-color="#719FF8" style="margin-right:10px;"></el-switch>满额包邮
                            满<el-input-number :controls="false" :min="0.01" :precision="2" v-model="emailSetData.amount" size="mini" style="width:100px;margin:0 10px;"></el-input-number>元包邮
                        </div>
                        <div style="margin-top:8px;">
                            <el-switch :disabled="piece_dis" @change="switchChange(28)" v-model="emailSetData.piece_switch" active-color="#719FF8" style="margin-right:10px;"></el-switch>满件包邮
                            满<el-input-number :controls="false" :min="1" :precision="0" v-model="emailSetData.piece" size="mini" style="width:100px;margin:0 10px;"></el-input-number>件包邮
                        </div>
                        <div class="wf-gray-tit">包邮只能开启一个开关，请先关闭正在开启的按钮再选择另一个开关</div>
                    </el-form-item>
            </el-form>
            <div class="close">
                <el-button type="primary" @click="submit"  size="mini">确定</el-button>
                <el-button @click="close"  size="mini">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: '',
    props:{
        uuid:String,
        amount:Number,
        piece:Number,
        modular_id:Number,
        eltype:Number
    },
    data() {
        
        return {
            title:'包邮设置',
            labelPosition:'right',
            mailSet: true,
            emailSetData:{
                amount_switch:false,
                piece_switch:false,
                amount:this.amount,
                piece:this.piece
            },
            amout_dis:false,
            piece_dis:false,

        }
    },
    components: {
    },
    created(){
    },
    mounted(){
        if(this.eltype==0){
            this.emailSetData.amount_switch=false;
            this.emailSetData.piece_switch=false;
            this.emailSetData.amount=undefined;
            this.emailSetData.piece=undefined;
        }else{
            if(this.amount&&this.modular_id==27){
                this.emailSetData.amount_switch=true;
            }else if(this.piece&&this.modular_id==28){
                this.emailSetData.piece_switch=true;
            }
        }
    },
    methods: {
        submit(){
            if(this.emailSetData.amount_switch){
                if(!this.emailSetData.amount){
                    this.$message.error('请输入包邮金额');
                    return false;
                }
                this.$emit('getCount',27,this.emailSetData.amount,1,this.uuid);
            }else if(this.emailSetData.piece_switch){
                if(!this.emailSetData.piece){
                    this.$message.error('请输入包邮件数');
                    return false;
                }
                this.$emit('getCount',28,this.emailSetData.piece,2,this.uuid);
            }else{
                this.$emit('getCount',NaN,false,0,this.uuid);
            }
            this.mailSet = false;
        },
        close() {
            //确定按钮
            this.mailSet = false;
            this.$emit('getCount','',false);
        },
        handleClose(){
            this.mailSet = false;
        },
        switchChange(id){
            if(id==27){
                if(!this.emailSetData.amount_switch&&this.emailSetData.piece_switch){
                    this.emailSetData.amount_switch=true;
                    this.emailSetData.piece_switch=false;
                    this.emailSetData.piece=undefined;
                }else if(!this.emailSetData.amount_switch&&!this.emailSetData.piece_switch){
                    this.emailSetData.amount=undefined;
                    this.emailSetData.piece=undefined;
                    this.emailSetData.amount_switch=false;
                    this.emailSetData.piece_switch=false;
                }else if(this.emailSetData.amount_switch&&this.emailSetData.piece_switch){
                    // this.emailSetData.amount_switch=true;
                    this.emailSetData.piece_switch=false;
                    this.emailSetData.piece=undefined;
                }
            }
            if(id==28){
                if(!this.emailSetData.piece_switch&&this.emailSetData.amount_switch){
                    this.emailSetData.piece_switch=true;
                    this.emailSetData.amount_switch=false;
                    this.emailSetData.amount=undefined;
                }else if(!this.emailSetData.piece_switch&&!this.emailSetData.amount_switch){
                    this.emailSetData.piece_switch=false;
                    this.emailSetData.piece=undefined;
                    this.emailSetData.amount_switch=false;
                    this.emailSetData.amount=undefined;
                }else if(this.emailSetData.piece_switch&&this.emailSetData.amount_switch){
                    // this.emailSetData.amount_switch=true;
                    this.emailSetData.amount_switch=false;
                    this.emailSetData.amount=undefined;
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-emailSet{
    /deep/ .el-dialog__body{
        .transfer{
            .transfer-left{
                border-top:none;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        }
    }
    .close{
        text-align: center;
        width: 200px;
        margin: 0 auto;
        margin-top: 20px;
    }
}
</style>