<template>
    <div class="markting-list clear">
        <div class="markting" v-for="(item,index) in list" :key="index">
            <div class="name">{{item.name}}</div>
            <div class="markting-lists" v-for="(items,i) in item.children" :key="i" >
                <div class="markting-list-top clear">
                    <img :src='items.image' class="markting-list-img">
                    <div class="markting-list-content">
                        <div class="markting-switch-top clear">
                            <div class="markting-list-content-title">{{items.name}}</div>
                            <el-switch
                                v-model="items.state"
                                active-color="#719FF8"
                                inactive-color="#CCCCCC"
                                class="markting-switch"
                                :disabled="items.term===1?false:true"
                                :active-text=" items.state===false?'禁用':'启用' "
                                @change="changereadio(items,index,i)">
                            </el-switch>
                        </div>
                        <div class="markting-list-content-txt">{{items.introduce}}</div>
                    </div>
                </div>
                <div class="markting-list-bottom clear">
                    <div class="markting-list-bottom-left left">{{items.due_time}}</div>
                    <el-button size="mini" class="right"  @click="watchtooldetail(items)" style="color:#999;"  v-if="items.forever == 0"> <img src="@/assets/admin_img/shop_admin_img/chakan.png" alt="" class="markting-icons left">  查看</el-button>
                    <el-button size="mini" @click="orgin(items)" class="right watchlist" style="color:#719FF8;border:1px solid #b8cffc;"> <img src="@/assets/admin_img/shop_admin_img/shezhi.png" alt="" class="markting-icon left" v-if="items.term == 1">  管理</el-button>
                </div>
            </div>
        </div>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
    
</template>

<script>
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
import { getmylist,select } from '@/server/mymarkting.js'
export default {
    data(){
        return {
            //列表
            list:[
               
            ],
            showVersion:false,//控制版本提示
             value2: true,
        }
    },
    components: {
        versionCom
    },
    created(){
        this.getmylist()

    },
    methods: {
        handleCloseVersion(){
            this.showVersion=false;
        },
        orgin(e){
            if(e.term===0){
                this.$confirm('该工具已到期，请重新购买。', '提示', {
                    confirmButtonText: '马上购买',
                    cancelButtonText: '暂不购买',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({path:'/wf/admin/shop/markting/watchtooldetail',query:{id:e.id}});
                })
            }else{
                if(e.path !==''){
                    this.$router.push({path:e.path});
                }else{
                    this.$message.warning("此功能正在开发中！");
                }
            }
        },
        watchtooldetail(e){
            let that =this
            that.$router.push({path:'/wf/admin/shop/markting/watchtooldetail',query:{id:e.id}});
        },
        changereadio(e,index,i){
            let that =this
            let state 
            if(e.state == false){//选中的变成警用的
                state = 0
                let data={
                    pro_id: parseInt(localStorage.getItem('proId')),
                    sid:e.sid,
                    state:state
                }
                getAuditApplicationList(14).then((res)=>{
                if(res.data.code===200){
                    if(res.data.data == false){//版本不够出现提示
                            that.showVersion = true
                            that.list[index].children[i].state = true
                    }else{
                        select(data).then(function(res){
                            if(res.data.code == 200){
                                that.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                            }
                        })
                    }
                }
            })
            }else{
                state = 1
                let data={
                    pro_id: parseInt(localStorage.getItem('proId')),
                    sid:e.sid,
                    state:state
                }
                select(data).then(function(res){
                    if(res.data.code == 200){
                        that.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                })
            }
            
            
        },  
        getmylist(){
            let that = this
            const loading = this.$loading({
                lock: true,
                text: '拼命加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let data={
                pro_id: parseInt(localStorage.getItem('proId')),
            }
            getmylist(data).then(function (res) {
                    if(res.data.code ==200){
                        that.list = res.data.data
                        loading.close()
                        that.list.forEach(el => {
                            el.children.forEach(item => {
                                if(item.state===0||item.term===0){
                                    item.state = false
                                }else{
                                    item.state = true
                                }
                            });
                        });
                    }
            })
        }
        
    }
};
</script>
<style lang="scss" >
@import "src/styles/mixin.scss";
.clear{
    clear: both;
}
.markting-list{
    margin-top: -20px;
        .markting{
        // padding:21px 0;
        float: left;
        width: 100%;
        .name{
            height:60px;
            width: 100%;
            padding-left:16px;
            font-size:24px;
            color:rgba(0,0,0,1);
            line-height: 60px;

        }
        .markting-lists{
            // width: 384px;
            cursor: pointer;
            // height:95px;
            background: #fff;
            border-radius: 2px;
            box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.06);
            // padding: 22px 0;
            float: left;
            margin: 0 40px 35px 14px;
            .markting-list-top{
                border-bottom: 1px solid #EEEEEE;
                .markting-list-img{
                width: 60px;
                height: 60px;
                box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.06);
                border-radius:8px;
                margin-left: 20px;
                // background: red;
                display: block;
                float: left;
                margin-top: 15px;
            }
            .markting-list-content{
                float: left;
                margin-left:20px;
                // width: 256px;
                // height: 120px;
                padding:10px 0 0 0;
                // width: 60%;
                
                .markting-list-content-txt{
                    height: 35px;
                    width: 256px;
                    font-size:15px;
                    color:rgba(102,102,102,1);
                    text-align: left;
                    line-height: 30px;
                }
                .markting-switch-top{
                    padding-right: 17px;
                    .markting-list-content-title{
                        // width: 88px;
                        font-size:22px;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        height: 40px;
                        line-height: 40px;
                        text-align: left;
                    }
                    .markting-switch{
                        float: right;
                        margin-top: 10px;
                    }
                }
            }
            }
            .markting-list-bottom{
                padding: 10px 16px 10px 16px;
                // height: 30px;
                .markting-list-bottom-left{
                    font-size:14px;
                    line-height: 34px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                .watchlist{
                    margin-right: 12px;
                }
                .markting-icon{
                    width: 14px;
                    height: 14px;
                    display: block;
                    margin-right: 6px;
                }
                .markting-icons{
                    width: 14px;
                    height: 14px;
                    display: block;
                    margin-right: 6px;
                }
            }
           
        }
        .markting-list{
             @include floatHover
        }
    }
}
    
</style>