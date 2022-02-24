<template>
    <div class="wf-fare">
        <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="handleBeforeLeave" class="wf-fare-tab">
            <el-tab-pane label="店铺统一运费" name="first">
                <freightManagement></freightManagement>
            </el-tab-pane>
            <el-tab-pane label="个性化运费模板" name="second">
                <specialModal></specialModal>
            </el-tab-pane>
            <el-tab-pane label="快递公司" name="third">
                <fastMail></fastMail>
            </el-tab-pane>
        </el-tabs>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>  
    </div>
</template>

<script>
import freightManagement from '@/components/WF_admin/shop_admin/freight_management/freight_management.vue'
import specialModal from '@/components/WF_admin/shop_admin/freight_management/specialModal.vue'
import fastMail from '@/components/WF_admin/shop_admin/freight_management/fastMail.vue'
import { getAuditApplicationList } from '@/server/common';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
export default {
    name: '',
    data() {
        return {
            activeName:'first',
            oldActiveName:'',
            showVersion:false
        }
    },
    components: {
        freightManagement,
        specialModal,
        fastMail,
        versionCom
    },
    created(){
        if(this.$route.query.activeName){
             if(this.$route.query.activeName==='second'){
                 this.activeName='second';
             }
             if(this.$route.query.activeName==='third'){
                 this.activeName='third';
             }
         }
    },
    mounted(){
         
    },
    methods: {
        handleBeforeLeave(activeName, oldActiveName){
            let that=this;
            if(activeName==='third'){
                 getAuditApplicationList(13).then((res)=>{
                    if(res.data.code===200){
                        if(res.data.data===false){
                            that.showVersion = true
                            that.activeName=oldActiveName
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误！');
                })
            }
        },
        handleCloseVersion(){ // 关闭版本更新提示弹框
            this.showVersion=false;
        },
        handleClick(val){
            
        },
       
    }
}
</script>


<style lang="scss" scoped>
.wf-fare{
    background-color: #fff;
    .wf-fare-tab{
        /deep/ .el-tabs__header{
            margin-left: 20px;
        }
    }
}
</style>