<template>
    <el-row class="tac wf-mainLayout-submenu">
        <el-col :span="24">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
                <template v-for="(item,index) in menuList">
                    <el-menu-item :index="item.path" v-if="item.children.length==0" :key="index">
                        <img style="width:1rem;height:1rem;" :src="item.icon" alt="">
                        <span class="item_name" slot="title">{{item.mall_name}}</span>
                    </el-menu-item>
                    <el-submenu  v-else :index="index+''" :key="index">
                        <template slot="title">
                            <img style="width:1rem;height:1rem;" :src="item.icon" alt="">
                            <span class="item_name" slot="title">{{item.mall_name}}</span>
                        </template>
                        <el-menu-item-group id="son_item">
                            <el-menu-item :index="list.path" v-for="(list,i) in item.children" :key="i">{{list.mall_name}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data(){
        return {
            menuList:[], 
        }
    },
    created(){
        this.getMenu() // 获取用户信息
        this.getUser()
    },
    mounted(){

    },
    methods:{
        getUser(){ // 获取用户信息
            let that = this
            this.$axios.post(this.url+'shopapi/Program/show',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            )
            .then(function(res){
                if(res.data.code==1){
                    that.pro_name = res.data.data.proName
                    if(res.data.data.proImg&&res.data.data.proImg!=null&&res.data.data.proImg!=''&&res.data.data.proImg!=undefined){
                        that.imageUrl = res.data.data.proImg
                    }else{
                        that.imageUrl = 'http://cdn1.19mini.com/2018-10-27%2Fe6577dbd533f86258c449c6a9206fffa.jpg'
                    }
                    that.id = res.data.data.id
                    let status = res.data.data.proStatus
                    if(status==0){
                        status = '未发布'
                    }else if(status==1){
                        status = '审核中'
                    }else if(status==2){
                        status = '未通过'
                    }else if(status==3){
                        status = '已上线'
                    }else if(status==4){
                        status = '未上线'
                    }else{

                    }
                    that.status = status
                }else{
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
        getMenu(){ // 获取左侧导航栏菜单
            var that=this;
            if(localStorage.getItem('is_agent')==2){
                var userUrl='token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')+'&type=1';
            this.showRole=true;
            }else{
                 var userUrl='token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId');
            this.showRole=false;
            }

            this.$axios.post(this.url+'shopapi/auth_role/roleCatalog',userUrl
            ).then(function (res) {
                if(res.data.code==1){
                    that.menuList=res.data.data;
                }
            })
            .catch(function (error) {

            });
        }
    }
}
</script>

<style lang="scss" scoped>
/*导航皮肤*/
.wf-mainLayout-submenu{
    height: 100%;
    color: #fff;
    background-color: #3D3D3D;
    .el-menu-item{
        color: #fff;
        background-color: #3D3D3D;
    }   
    
}
</style>
<style lang="scss">
/*导航皮肤*/
.wf-mainLayout-submenu{
    .el-submenu{
        .el-submenu__title{
            color: #fff;
            background-color: #3D3D3D;
        }
    }
    li.el-menu-item.is-active{
            color: #3D3D3D;
            background-color: #fff;
        }
    .el-menu-item-group__title{
        padding: 0;
    } 
    
    
}
</style>

