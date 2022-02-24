import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';
Vue.use(Vuex)

let flag=false;
if( window.location.origin==='https://www.19mini.com'
    ||window.location.origin==='http://www.19mini.com'
    ||window.location.origin==='http://www2.19mini.com'
    ||window.location.origin==='http://cloud.1919app.com'
    ||window.location.origin==='https://dev.19mini.com'
    ||window.location.origin==='http://dev.19mini.com'
    ||window.location.origin==='https://m.19mini.com'
    ||window.location.origin==='https://dev.m.19mini.com'
    ||window.location.origin==='http://localhost:8080'
    ||window.location.origin==='http://localhost:8081'
    ){
    flag=false;
}else{
    flag=true;
}

const state={
    // domain:'devpsd.dev.19mini.com',
    domain:window.location.origin,
    oemFlag:flag, //是否是OEM标记
    serverList:{
        data:{
            brand:'', //品牌名
            word_logo:'', //带字logo
            load_logo:'', //灰色LOGO
            logo:'', //彩色LOGO
            ico_logo:'', //icon
            copyright:'', //footer
        }
    }, //OemIndex - 全局设置
    showRole:true, //shop_admin/mainLayout/header.vue 登录状态
    imageUrl:'', //shop_admi/mainLayout/submenu.vue 用户信息图片url
    proName:'', //shop_admin/mainLayout/submenu.vue 用户信息
    publishStatus:'', //shop_admin/mainLayout/submenu.vue 用户信息发布状态
    proVersion:'', //shop_admin/mainLayout/submenu.vue 用户使用的版本   用于营销页面
    type_id:'', //shop_admin/mainLayout/submenu.vue 用户使用的版本号   用于营销页面
    fromDataFare:[],//shop_admin/freight_management/addSpecialModal.vue 运费区域存储
    fromDataAllFare:[],//shop_admin/freight_management/addSpecialModal.vue 运费总区域存储
    setPageProps:{
        name: '页面设置',
        fixed: false,
        component:'setPage',
        flagClick:false,
        props:[
            {
                title: '基础设置',
                component: 'setPageProps',
                item:{
                    title:'首页',
                    bgradio:1,
                    bgcolor:'#fff',
                    textRadio:1,
                    bgPradio:1,
                    bgPcolor:'#f5f5f5'
                }
            }
        ]
    }, //DIY 页面设置
    skuInfo:{}, //商品编辑
    skuInfoFlag:false, //是否触发商品skuInfo变化
    skuEditFlag:false, //是否是编辑商品
    weightMust:false, //新建商品快递邮费
    member_type:0, //会员价选项
    couponList:[], //优惠卷商品选择
    couponNotList:[], //优惠卷不可用商品选择
}
export default new Vuex.Store({
    state, //共同维护的一个状态，可以设置多个全局状态
    getters, //获取数据并渲染
    actions, //数据异步操作
    mutations, //处理数据的唯一途径，在这里修改state的变量
})
