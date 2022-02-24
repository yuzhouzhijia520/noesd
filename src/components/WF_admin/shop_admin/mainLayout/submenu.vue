<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
       <left-top></left-top>
       <el-row class="tac wf-mainLayout-submenu">
            <el-col :span="24">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
                    <template v-for="(item,index) in menuList">
                        <el-menu-item :index="item.path" v-if="item.children.length==0" :key="index">
                            <img style="width:1rem;height:1rem;" :src="$route.path ==item.path? item.show_icon:item.icon" alt="">
                            <span class="item_name" slot="title">{{item.mall_name}}</span>
                        </el-menu-item>
                        <el-submenu v-else :index="index+''" :key="index">
                            <template slot="title">
                                <img style="width:1rem;height:1rem;" :src="item.icon" alt="">
                                <span class="item_name" slot="title">{{item.mall_name}}</span>
                            </template>
                            <el-menu-item-group id="son_item"  v-for="(list,i) in item.children" :key="i">
                                <el-menu-item :index="list.path" v-if="!(list.id==28&&$store.state.type_id==6)">
                                    {{list.mall_name}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </el-scrollbar>
</template>

<script>
import leftTop from './left_top';
export default {
    data(){
        return {
            menuList:[]
        }
    },
    components:{
        leftTop
    },
    created(){
        this.getMenu() // 获取用户信息
        this.getUser()
    },
    computed:{

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
                //    that.$store.state.proName = res.data.data.proName
                    that.$store.commit({
                        type:'getProName',
                        proName:res.data.data.proName
                    })
                    that.$store.commit({
                        type:'getProVersion',
                        proVersion:res.data.data.typeName,
                        type_id:res.data.data.type_id
                    })
                    if(res.data.data.proImg&&res.data.data.proImg!=null&&res.data.data.proImg!=''&&res.data.data.proImg!=undefined){
                        // that.$store.state.imageUrl= res.data.data.proImg;
                        that.$store.commit({
                            type:'getImageUrl',
                            imageUrl:res.data.data.proImg
                        })
                    }else{
                        that.$store.commit({
                            type:'getImageUrl',
                            imageUrl:'http://cdn2.19mini.com/2018-11-14%2F03b6fcb5036feb510d9e20cedc401ddc.png'
                        })
                        // that.$store.state.imageUrl= 'http://cdn0.19mini.com/2018-11-05%2F7153ad43eb702f77f11f3902b92c9a83.jpg'
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
                    }else if(status==7){
                        status = "待审核"
                    }else if(status==8){
                        status = "平台拒绝"
                    }
                   that.$store.commit({
                        type:'getPublishStatus',
                        publishStatus:status
                    })
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
            if(localStorage.getItem('is_agent')==-1){
                var userUrl='token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId')+'&type=1';
                this.$store.commit({
                    type:'getShowRole',
                    showRole:true
                })
            }else{
                var userUrl='token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId');
                this.$store.commit({
                    type:'getShowRole',
                    showRole:false
                })
            }
            this.$axios.post(this.url+'shopapi/auth_role/roleCatalog',userUrl
            ).then(function (res) {
                if(res.data.code==1){
                    that.menuList=res.data.data;
                    //临时
                    //  that.menuList.push(
                    //      {
                    //         "id": 12,
                    //         "mall_name": "我的店铺",
                    //         "path": "/wf/admin/shop/diy",
                    //         "icon": "http://cdn1.19mini.com/2018-11-10%2Ff016ada72b306bec719061fdd58c5360.png",
                    //         "state": 1,
                    //         "create_time": "2018-10-09 10:34:13",
                    //         "update_time": "2018-10-09 10:34:18",
                    //         "name": "diy",
                    //         "orderby": 7,
                    //         "pid": 0,
                    //         "show": 1,
                    //         "show_icon": "http://cdn2.19mini.com/2018-11-10%2F7253a7230903095215489a4e67f0b24e.png",
                    //         "level": 0,
                    //         "children": []
                    //     })
                }else{
                    that.$message({
                        showClose: true,
                        message: '网络错误!600A0007',
                        type: 'error'
                    })
                }
            })
            .catch(function (error) {
                that.$message({
                    showClose: true,
                    message: '网络错误!600B0006',
                    type: 'error'
                })
            });
        }
    }
}
</script>

<style lang="scss" scoped>
/*导航皮肤*/
.item_name{
    color: #B0B0B0;
    font-size:16px;
}
.scrollbar-wrapper .wf-mainLayout-submenu li.el-menu-item{
    font-size:16px;
    color: #B0B0B0;

}
.scrollbar-wrapper .wf-mainLayout-submenu li.el-menu-item.is-active{
        color: #333;
    background-color: #E4E4E4;
    .item_name{
        color: #333;
        font-weight: 600;
    }
    #son_item{
        color: #333;

    }
}
.scrollbar-wrapper .wf-mainLayout-submenu .el-submenu .el-submenu__title{
    color: #B0B0B0;
    .wf-mainLayout-submenu .el-menu-item{
        color: #B0B0B0;
    }
}
.wf-mainLayout-submenu .el-menu-item{
    color: #B0B0B0;
}
.wf-mainLayout-submenu{
    height: 100%;
    color: #fff;
    background-color: #3D3D3D;
    &:hover{
        background-color: #2f2f2f;
    }
    .el-menu-vertical-demo{
        border:none;
    }
    .el-menu-item{
        color: #fff;
        background-color: #3D3D3D;
        &:hover{
            background-color: #2f2f2f;
        }
    }   
    
}
</style>
<style lang="scss">
/*导航皮肤*/
.scrollbar-wrapper{
    min-width: 201px;
    .wf-mainLayout-submenu{
    .el-submenu{
        .el-submenu__title{
            color: #fff;
            background-color: #3D3D3D;
        }
    }
    li.el-menu-item.is-active{
            color: #fff;
            // background-color: #7a7a7a;
            background-color:#868686
        }
    .el-menu-item-group__title{
        padding: 0;
    } 
}
}

</style>

