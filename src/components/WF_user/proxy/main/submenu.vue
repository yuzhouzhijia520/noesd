<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
       <el-row class="tac wf-mainLayout-submenu">
            <el-col :span="24">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
                    <template v-for="(item,index) in menuList">
                        <el-menu-item :index="item.path" v-if="item.children.length==0"  :key="index">
                            <img v-if="$route.path===item.path" style="width:1rem;height:1rem;" :src="item.icon" >
                            <img v-else style="width:1rem;height:1rem;" :src="item.show_icon" >
                            <span class="item_name" slot="title">{{item.oem_name}}</span>
                        </el-menu-item>
                        <el-submenu  v-else :index="index+''" :key="index">
                            <template slot="title">
                                <img v-if="$route.path===item.path" style="width:1rem;height:1rem;" :src="item.icon" >
                                <img v-else style="width:1rem;height:1rem;" :src="item.show_icon" >
                                <span class="item_name" slot="title">{{item.oem_name}}</span>
                            </template>
                            <el-menu-item-group id="son_item">
                                <el-menu-item :index="list.path" v-for="(list,i) in item.children" :key="i">{{list.oem_name}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </el-scrollbar>

 
</template>

<script>
export default {
    data(){
        return {
            // menuList:[
            //     {
            //         children: [],
            //         icon: "https://cdn4.19mini.com/2019-01-07%2F2151d4666bd781d253e1fc221dd4d1af.png",
            //         iconHover:'https://cdn4.19mini.com/2019-01-07%2F545f7b4d92c17c0ddace97f245660d28.png',
            //         mall_name: "代理概况",
            //         name: "bkmanagement",
            //         path: "/wf/user/bkmanagement",
            //     },
            //     {
            //         children: [],
            //         icon: "https://cdn4.19mini.com/2019-01-07%2Fc096b484157fbe59e1d5f0fbf710114c.png",
            //         iconHover:'https://cdn4.19mini.com/2019-01-07%2F14aa299bef7f8db4eeaf6ad7f8c0c3de.png',
            //         mall_name: "小程序列表",
            //         name: "proxy_app_list",
            //         path: "/wf/user/bkmanagement/proxy_app_list",
            //     },
            //     {
            //         children: [],
            //         icon: "https://cdn4.19mini.com/2019-01-07%2Fc3d10d10fecc13f0cfda1c4e4ecc0ef9.png",
            //         iconHover:'https://cdn4.19mini.com/2019-01-07%2F5d0ab79e0c93598be30b4118ca374670.png',
            //         mall_name: "客户管理",
            //         name: "proxy_customer",
            //         path: "/wf/user/bkmanagement/proxy_customer",
            //     },
            //     {
            //         icon: "https://cdn4.19mini.com/2019-01-07%2Fb29f620a3220680763d792a0cdf9a337.png",
            //         iconHover:'https://cdn4.19mini.com/2019-01-07%2F62d9872bfb4641f97c8b1d5a95e39630.png',
            //         mall_name: "平台配置",
            //         name: "oem",
            //         path: "/",
            //         children:[
            //             {
            //                 children: [],
            //                 path: '/wf/user/bkmanagement/oem/setOem',  
            //                 mall_name: '全局设置',
            //                 name: 'setOem'
            //             },{
            //                 children: [],
            //                 path: '/wf/user/bkmanagement/oem/indexBanner',  
            //                 mall_name: '官网首页',
            //                 name: 'indexBanner'
            //             },{
            //                 children: [],
            //                 path: '/wf/user/bkmanagement/oem/indexFooter',  
            //                 mall_name: '官网底栏',
            //                 name: 'indexFooter'
            //             },{
            //                 children: [],
            //                 path: '/wf/user/bkmanagement/oem/indexRight',  
            //                 mall_name: '右侧栏',
            //                 name: 'indexRight'
            //             },{
            //                 children: [],
            //                 path: '/wf/user/bkmanagement/oem/indexWe',  
            //                 mall_name: '关于我们',
            //                 name: 'indexWe'
            //             },
            //         ]
            //     }
            // ], 
            menuList:[]
        }
    },
    components:{
    },
    created(){
            if(this.$store.state.oemFlag){
                this.$store.dispatch('loadData');
            }else{
                window.document.title='万帆集团';
                let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                    link.type = 'image/x-icon';
                    link.rel = 'shortcut icon';
                    link.href = this.url+'favicon.ico';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
    },
    mounted(){
        this.getMenueList();
    },
    methods:{
        getMenueList(){
            let that=this;
            let data={};
            this.$axios.post(this.url+'agent_api/auth_Role/roleCatalog', data).then(res=> {
                if(res.data.code===1){
                    that.menuList=res.data.data;
                }else{
                    that.$message({
                        type: 'error',
                        message: err
                    });
                }
            }).catch(err=>{
                that.$message({
                    type: 'error',
                    message: err
                });
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
    &:hover{
        background-color: #2f2f2f;
    }
    .el-menu-vertical-demo{
        border:none;
    }
    .el-menu-item{
        color: #b0b0b0;
        background-color: #3D3D3D;
        &:hover{
            background-color: #2f2f2f;
        }
    }   
    .el-submenu{
        .item_name{
            color: #b0b0b0;
        }
    }
    .el-menu-item {
        .item_name{
            color: #b0b0b0;
        }
    }
    .el-menu-item .is-active{
        background-color: #e4e4e4 !important;
        .item_name{
            color: #333;
            font-weight: 600;
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
                color: #333;
                // background-color: #7a7a7a;
                background-color:#868686
            }
        .el-menu-item-group__title{
            padding: 0;
        } 
    }
}

</style>

