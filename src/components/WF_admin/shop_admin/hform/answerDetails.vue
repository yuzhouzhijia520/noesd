<template>
    <!-- class="wf-" -->
    <div class="wf-answerDetails">
        <el-form label-width="150px" 
        :model="answerDetails"  
        >
            <!--*******************基本信息****************-->
            <el-form-item label="表单主题:" size="mini" >
                <el-col :span="5">
                    <span>{{answerDetails.title}}</span>
                </el-col>
            </el-form-item>
            <el-form-item label="作答用户:" size="mini" >
                <el-col :span="5">
                    <span>{{answerDetails.user}}</span>
                </el-col>
            </el-form-item>

            <!--*******************详情****************-->
            <el-form-item label="作答情况:" size="mini" >
                <!-- <el-col :span="5">
                    <span>{{answerDetails.user}}</span>
                </el-col> -->
                <el-row v-for="(item,index) in tableData" :key="index" style="padding-bottom: 10px;">
                    <el-col>
                        <label>Q{{index+1}}   {{item.title}}</label>
                    </el-col>
                    <component :is="item.comName" :comProps="item"></component>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {userDetail} from '@/server/hform';
import hftxinput from './componentsTx/hftxinput.vue'
import hftxtextarea from './componentsTx/hftxtextarea.vue'
import hftxselect from './componentsTx/hftxselect.vue'
import hftxselectCBox from './componentsTx/hftxselectCBox.vue'
import hftxaddress from './componentsTx/hftxaddress.vue'
export default {
    name: '',
    data() {
        return {
            answerDetails:{
                title:localStorage.getItem('hftitle'),
                user:localStorage.getItem('hfname')+'/'+localStorage.getItem('hfphone')
            },
            tableData:[],
            pages:1,

        }
    },
    components: {
        hftxinput,
        hftxtextarea,
        hftxselect,
        hftxselectCBox,
        hftxaddress
    },
    created(){

    },
    mounted(){
        this.initPage();
    },
    methods: {
        initPage(){
            let that=this;
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                id:that.$route.query.id,
                token:localStorage.getItem('userId')
            }
            userDetail(data).then((res)=>{
                if(res.data.code===200){
                    that.tableData=res.data.data;
                    that.tableData.forEach((item,index)=>{
                        if(item.state===0){
                            that.tableData[index].comName='hftxinput';
                        }else  if(item.state===1){
                            that.tableData[index].comName='hftxtextarea';
                        }else  if(item.state===2){
                            that.tableData[index].comName='hftxselect';
                        }else  if(item.state===3){
                            that.tableData[index].comName='hftxselectCBox';
                        }else  if(item.state===4){
                            that.tableData[index].comName='hftxaddress';
                        }
                    })
                }else{
                    that.$message.error(res.data.msg+'600A00277');
                }
            }).catch((err)=>{
                that.$message.error('网络错误!'+'600A00278');
            })
        }
    }
}
</script>


<style lang="scss" scoped>
    .wf-answerDetails{
        background-color: #fff;
        padding: 20px;
    }
</style>