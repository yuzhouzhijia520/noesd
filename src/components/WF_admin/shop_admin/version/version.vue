<template>
    <!-- class="wf-" -->
    <div class="wf-version" >
        <el-dialog :visible.sync="dialogFlag"
            :before-close="handleClose" 
            title="温馨提示"
            width="20%"
            :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-row>
                <el-col :span="4" class="wf-icon">
                    <i class="el-icon-warning"></i>
                </el-col>
                <el-col :span="20" class="wf-text">
                    <label>请升级小程序到最新版本</label>
                </el-col>
            </el-row>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="go" size="mini">立即升级</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
/**
 * @event handleCloseVersion()
 * 关闭窗口回调函数
 */
export default {
    name: '',
    data() {
        return {
            dialogFlag:true
        }
    },
    components: {

    },
    created(){
        
    },
    mounted(){

    },
    methods: {
        handleClose(){
            this.dialogFlag = false;
            this.$emit('closeVersion');
        },
        go(){
            this.dialogFlag = false;
            this.$emit('closeVersion');
            this.$router.push({path:'/wf/admin/shop/publish',name:'publish'});
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-version{
    /deep/ .el-dialog__body{
        padding: 10px 20px;
        .wf-icon{
            text-align: right;
            color: rgb(245, 189, 0);
            font-size: 30px;
        }
        .wf-text{
            padding-left: 12px;
            line-height: 40px;
        }
    }
}
</style>