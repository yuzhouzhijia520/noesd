import axios from "axios";//无需token的接口
import $axios from "@/axios";//需token的接口
import  domain from '@/server/commonheader';
import { computeScaleM_P } from '@/untils/common.js'; //屏幕大小转换 
import componentPropsFor from '@/components/WF_admin/shop_admin/DIY/main/componentPropsFor.js';  //初始化组件属性
// const domain='http://devpsd.dev.19mini.com';
    /**
     * @description  oem动态参数
     * @document actions.js
     */
    export function  getOemDataList() {
　　　　 class Processor { 
            constructor(result) {
                if(result){
                    if(result.data){
                        window.document.title=result.data.data.brand;
                        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                        link.type = 'image/x-icon';
                        link.rel = 'shortcut icon';
                        link.href = result.data.data.ico_logo;
                        document.getElementsByTagName('head')[0].appendChild(link);
                    }else{
                        window.document.title='';
                    }
                }
                return result 
            }
        };
        let data={
            domain:window.location.origin
            // domain:'devpsd.dev.19mini.com'
        };
        return new Promise((resolve, reject) => {
　　　　　　 axios.post(domain+"/agent_api/oem_index/globalSet",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 });
　　　　});
　　}
    /**
         * @description  将后台参数初始化后能够给予可视化页面可使用的数据结构
         * @date 20190125
         * @param {指针} that 
         * @param {编辑页面的id} id 
         * @document addDiy.vue 
         */
    export function initPageEdit(that,id) {
　　　　 class Processor { 
            constructor(res) {
                if(res){
                    if(res.data){
                        if(res.data.code==200){
                            let newEditList=JSON.parse(JSON.stringify(res.data.data));
                            newEditList.forEach((item,i)=>{
                                newEditList[i].flagClick=false;
                                if(item.component==='title'){
                                    //处理标题
                                    let setPageProps=that.$store.state.setPageProps
                                    setPageProps.props[0].item=item.props[0].item;
                                    that.$store.commit({
                                        type:'setPageProps',
                                        setPageProps:setPageProps
                                    });
                                    newEditList.splice(i,1);
                                }
                                if(item.component==='swiper'){
                                    //处理轮播图图片高度
                                    item.props[1].item.height=computeScaleM_P(item.props[1].item.height);
                                }
                                if(item.component==='imageLabel'){
                                    //处理图片广告图片高度
                                    item.props[1].item.height=computeScaleM_P(item.props[1].item.height);
                                }
                                if(item.component==='search'){
                                    //重组搜索数据结构
                                    newEditList[i].props=[
                                            {
                                                "title": "搜索设置",
                                                "component": "searchProps",
                                                "item": []
                                            }
                                        ];
                                }
                                if(item.component==='goods'){
                                    //重组商品数据结构
                                    newEditList[i].props[0].item=[];
                                    for(let j=0;j<4;j++){
                                            newEditList[i].props[0].item.push({
                                            component:'wfGoods'+j,
                                            parentComponent:'goods'+j,
                                            order:j,
                                            selectShow:false,
                                            props:[]
                                        })
                                        if(newEditList[i].props[0].parentComponent==='goods'+j){
                                                newEditList[i].props[0].item[j].props=res.data.data[i].props[0].item;
                                                newEditList[i].props[0].item[j].selectShow=true;
                                        }
                                    }
                                }
                                if(item.component==='navigation'){
                                    //重组图文导航数据结构
                                    newEditList[i].props[0].childrenItem=[];
                                    newEditList[i].props[0].item=[];
                                    newEditList[i].props[0].item.push({
                                        component:'wfNavigation4',
                                        parentComponent:'navigation0',
                                        order:0
                                    })
                                    newEditList[i].props[0].item.push({
                                        component:'wfNavigation5',
                                        parentComponent:'navigation1',
                                        order:1
                                    })
                                    
                                    if(newEditList[i].props[0].parentComponent==='navigation0'){
                                        newEditList[i].props[0].item[0].selectShow=true;
                                        newEditList[i].props[0].item[1].selectShow=false;
                                        newEditList[i].props[0].item[0].item=res.data.data[i].props[0].childrenItem;
                                        newEditList[i].props[0].item[1].childrenItem=[];
                                    }else if(newEditList[i].props[0].parentComponent==='navigation1'){
                                        newEditList[i].props[0].item[0].selectShow=false;
                                        newEditList[i].props[0].item[1].selectShow=true;
                                        newEditList[i].props[0].item[0].childrenItem=[];
                                        newEditList[i].props[0].item[1].item=res.data.data[i].props[0].childrenItem;
                                    }
                                }
                                if(item.component==='cube'){
                                    //重组魔方数据结构
                                    res.data.data[i].props[0].item[0].item.forEach((el,k)=>{
                                        el.order=k;
                                    })
                                    for(let m=res.data.data[i].props[0].item[0].type;m<4;m++){
                                        res.data.data[i].props[0].item[0].item.push({
                                            srcUrl: ``, //轮播图地址
                                            order: m, //排序
                                            imgLink: '', //轮播图跳转路径
                                            name: '', //跳转链接地址名称
                                            linkListId:0
                                        })
                                    }
                                    newEditList[i].props[0].item=JSON.parse(JSON.stringify(componentPropsFor['cube'][0].item));
                                    newEditList[i].props[0].item[0]={
                                        "title": "图片管理",
                                        "component": "wfCube0",
                                        "parentComponent": "cube0",
                                        "selectShow": false,
                                        "type": 2,
                                        "order": 0,
                                        "props": []
                                    };
                                    newEditList[i].props[0].item.every((el,k)=>{
                                        if(el.order===res.data.data[i].props[0].item[0].order){
                                            newEditList[i].props[0].item[k]=res.data.data[i].props[0].item[0];
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    })
                                }
                                if(item.component==='notice'){
                                    newEditList[i].props[0].item=res.data.data[i].props[0].item
                                }
                                if(item.component==='bargain'){
                                    //重组数据结构
                                    if(newEditList[i].props[0]){
                                        newEditList[i].props[0].item=[];
                                        newEditList[i].props[0].item.push({
                                            component:'bargainSet0',
                                            parentComponent:'bargain0',
                                            order:0,
                                            selectShow:false,
                                            props:[]
                                        })
                                        if(newEditList[i].props[0].parentComponent==='bargain0'){
                                            newEditList[i].props[0].item[0].props=res.data.data[i].props[0].item;
                                            //判断是否已超期
                                            newEditList[i].props[0].item[0].props=newEditList[i].props[0].item[0].props.filter(item=>item.state===1)
                                            newEditList[i].props[0].item[0].selectShow=true;
                                        }
                                    }
                                }
                                if(item.component==='assemble'){
                                    //重组数据结构
                                    if(newEditList[i].props[0]){
                                        newEditList[i].props[0].item=[];
                                        newEditList[i].props[0].item.push({
                                            component:'assembleSet0',
                                            parentComponent:'assemble0',
                                            order:0,
                                            selectShow:false,
                                            props:[]
                                        })
                                        if(newEditList[i].props[0].parentComponent==='assemble0'){
                                            newEditList[i].props[0].item[0].props=res.data.data[i].props[0].item;
                                            //判断是否已超期
                                            newEditList[i].props[0].item[0].props=newEditList[i].props[0].item[0].props.filter(item=>item.state===1)
                                            newEditList[i].props[0].item[0].selectShow=true;
                                        }
                                    }
                                }
                                if(item.component==='spike'){
                                    //重组数据结构
                                    if(newEditList[i].props[0]){
                                        newEditList[i].props[0].item=[];
                                        newEditList[i].props[0].item.push({
                                            component:'spikeSet0',
                                            parentComponent:'spike0',
                                            order:0,
                                            selectShow:false,
                                            props:[]
                                        })
                                        if(newEditList[i].props[0].parentComponent==='spike0'){
                                            newEditList[i].props[0].item[0].props=res.data.data[i].props[0].item;
                                            //判断是否已超期
                                            newEditList[i].props[0].item[0].props=newEditList[i].props[0].item[0].props.filter(item=>item.state===1)
                                            newEditList[i].props[0].item[0].selectShow=true;
                                        }
                                    }
                                }
                            })
                             //过滤脏数据
                             newEditList=newEditList.filter((item,i)=>{
                                if(item.component==='banner'){
                                    if(res.data.data[i].props.length<=0){
                                        return false;
                                    }else{
                                        if(res.data.data[i].props[0].length<=0){
                                            return false;
                                        } 
                                    }
                                }
                                if(item.component==='bargain'){
                                    if(res.data.data[i].props.length<=0){
                                        return false;
                                    }
                                }
                                if(item.component==='assemble'){
                                    if(res.data.data[i].props.length<=0){
                                        return false;
                                    }
                                }
                                if(item.component==='spike'){
                                    if(res.data.data[i].props.length<=0){
                                        return false;
                                    }
                                }
                                return true;
                            })
                            return newEditList;
                        }else{
                            return res;
                        }
                    }
                    return res;
                }
            }
        }
        let data={
            secret:localStorage.getItem('secretId'),
            id:id
        }
        return new Promise((resolve, reject) => {
            $axios.post(domain+'/shopapi/decoration/getInfo',data).then((res) => {
　　　　　　　　 resolve(new Processor(res));
　　　　　　 }).catch((res) => {
　　　　　　　　 reject(new Processor(res));
　　　　　　 })
　　　　});
    }
    /**
     * @description 商品分类
     * @param {分类} id //必填
     * @param {分页} page //根据实际情况选填
     * @document elGoodsLinks.vue
     */
    export function  getGoodsLinksData(id,page) {
　　　　 class Processor { 
            constructor(result) {
                return result 
            }
        };
        let data={
            secret: localStorage.getItem("secretId"),
            id: id
        };
        if(page){
            data.page=page;
        }
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/shop_decoration/shopMarketing",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}