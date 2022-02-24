<template>
    <!-- class="wf-" -->
    <div class="wf-DIY-select" >
         <!-- <el-button type="text" @click="centerDialogVisible = true">选择店铺首页模版</el-button> -->
         <!-- :visible.sync="centerDialogVisible" -->
        <el-dialog
            title="选择店铺首页模版"
            :visible.sync="centerDialogVisible"
            :before-close="handleClose"
            width="1239px"
            center>
            <div class="wf-DIY-select-content clear">
                <div class="wf-DIY-select-content-one" v-for="(item,index) in list" :key="index">
                    <img :src="item.img" alt="" class="wf-DIY-select-content-one-img">
                    <div class="wf-DIY-select-content-one-txt">
                        <div class="wf-DIY-select-content-one-t">{{item.txt}}<span class="wf-tip" v-if="item.tip">&nbsp;&nbsp;({{item.tip}})</span></div>
                        <el-button  class="wf-DIY-select-content-one-b" @click="selectID(item,index)" :loading="btn==index">立即应用</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            otheruuid:require('uuid/v1')(),
            btn:-1,
            centerDialogVisible: true,
            list:[
                {
                    img:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/moban.jpg'),
                    txt:'自定义模版',
                    baseUrl:"/wf/admin/shop/diy/addDiy"
                }
            ],
        }
            
    },
    components:{

    },
    created(){
        
    },
    mounted(){

        this.newPageData();
        
    },
    methods: {
        codeSeckill(id,index){
            let that=this;  
            let data={
                id:id,
                token:localStorage.getItem('userId'),
                secret:localStorage.getItem('secretId')
            }      
            this.btn=index;
            // this.$refs['btn'+index][0].loading = true;
            this.$axios.post(this.url+'shopapi/decoration/copy',data).then(res=>{
                // that.$refs['btn'+index][0].loading = false; 
                this.btn=-1; 
                if(res.data){
                    if(res.data.code===200){
                        if(Object.prototype.toString.call(that.list)==='[object Array]'){
                            that.list.some(element => {
                                if(element.baseUrl.includes(id)){
                                    
                                    element.baseUrl="/wf/admin/shop/diy/addDiy?param=edit&id="+res.data.data.id+'&otheruuid='+that.otheruuid;
                                    that.$router.push({path:element.baseUrl,query:{otheruuid:that.otheruuid}});
                                }
                            });
                        }
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
        newPageData(){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
            }
            this.$axios.post(this.url+'/shopapi/decoration/commonTemplate',data).then(res=>{
                if(res.data){
                    if(res.data.code==200){
                        if(Object.prototype.toString.call(res.data.data)==='[object Array]'){
                            res.data.data.forEach(element => {
                                that.list.push({
                                    img:element.index_image,
                                    txt:element.title,
                                    baseUrl:"/wf/admin/shop/diy/addDiy?param=edit&id="+element.id+'&otheruuid='+that.otheruuid,
                                    tip:"模板内容为测试数据"
                                })
                            });
                        }
                    }else{
                        that.$message.error('网络错误!');
                    }
                }else{
                    that.$message.error('网络错误!');
                }
            }).catch(err=>{
                that.$message.error('网络错误!');
            });
        },
        getUrlParams(url,name) { 
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
            var r = url.substr(1).match(reg);  
            if (r != null) return unescape(r[2]); 
            return null; 
        },
        selectID(val,index){
            if(val.baseUrl.includes('id')){
                this.codeSeckill(this.getUrlParams(val.baseUrl,'id'),index);
            }else{
                this.$router.push({path:val.baseUrl,query:{otheruuid:this.otheruuid}});
            }
        },
        handleClose(){
            this.centerDialogVisible = false
            this.$emit("dialogVisible",false);           
        }
    }
}

</script>


<style lang="scss" scoped>
.clear{
    clear: both;
}
.el-button{
}
.wf-DIY-select{
    width: 770px;
    .wf-DIY-select-content{
        .wf-DIY-select-content-one{
            width: 270px;
            height: 581px;
            margin: 10px 7px;
            float: left;
            box-shadow:0px 2px 2px 2px rgba(0, 0, 0, 0.08);
            .wf-DIY-select-content-one-img{
                width: 270px;
                display: block;
                height: 480px;
                // background: red;
            }
            .wf-DIY-select-content-one-txt{
                width: 194px;
                // height: 100px;
                background: #fff;
                padding: 16px 14px;
                .wf-DIY-select-content-one-t{
                    color: #333333;
                    width: 190px;
                    margin-bottom:10px;
                    .wf-tip{
                        color: #9e9e9e;
                        font-size: 12px;
                    }
                }
                
            }
       }
    }
}
</style>