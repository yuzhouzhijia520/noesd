<template>
  <div class="fluid container wf-DIY-addDiy">
        <!-- <el-row class="wf-addDiy-options">
            <div class="wf-addDiy-save">
                <el-row class="icon" >
                    <span  @click="save"><icon name="wf-icon-save" :scale="2.5"></icon></span>
                </el-row>
                <el-row class="text"><label>保存</label></el-row>
            </div>
        </el-row> -->
        <el-row class="wf-addDiy-row demo-content nested">
            <div class="v-row">
            <el-col :span="5" class="wf-addDiy-col-first">
                <el-card class="box-card" :body-style="{ 'background-color':'rgb(248, 248, 248)', 'display': 'flex' }">
                    <div slot="header" class="clearfix">
                        <span>公共组件库</span>
                    </div>
                    <div  class="text item">
                        <el-scrollbar>
                            <el-col :span="10" v-for="(item,index) in conObj" @mouseup.native="handleMouseup(item,index)" :key="item.id" class="wf-addDiy-itemCol">
                                <div class="v-col--auto">
                                    <div class="panel">
                                        <div class="panel__body">
                                            <vddl-draggable class="button"
                                                :draggable="item"
                                                :index="index"
                                                :wrapper="list"
                                                
                                                >
                                                <div class="wf-addDiy-itemDiv">
                                                    <img :src='item.image'/>
                                                </div>
                                                <div class="wf-addDiy-text">{{item.name}}</div>
                                            </vddl-draggable>
                                        </div>
                                    </div>
                                </div>
                                
                            </el-col>
                        </el-scrollbar>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6" class="wf-addDiy-col-second">
                <div  class="text item" v-if="list">
                    <topBar v-on:handleSetPage="handleSetPage"  ></topBar>
                    <!-- <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                        <transition-group type="transition" :name="'flip-list'">
                            <li :class="element.flagClick?'list-group-item list-group-selected':'list-group-item'" :style="element.component==='hideLine'?'':'min-height:30px'"  v-for="(element,index) in list" :key="element.order"  @click="handleComponentsClick(element)"  @mouseover="handleMouseover(element)" @mouseout="handleMouseout(element)">
                                <component 
                                    :is="element.component" 
                                    :comProps="element.props"  
                                    :text="element.name"
                                >
                                </component>
                                <div class="list-group-item-div" 
                                    ref="itemButtonControler" 
                                    v-show="element.active">
                                    <a  v-if="list.length>=2&&index!=0" @click="handleUpMove(element,index)">上移</a>
                                    <a  v-if="list.length>=2&&index!=list.length-1" @click="handleUpDown(element,index)">下移</a>
                                    <a  @click="handleDelete(element,index)">删除</a>
                                </div>
                            </li>
                        </transition-group>
                    </draggable> -->
                    <el-row class="demo-content nested" :style="{'background-color':$store.state.setPageProps.props[0].item.bgPradio===2?$store.state.setPageProps.props[0].item.bgPcolor:'#f5f5f5'}">
                       <div class="v-row">
                            <div class="v-col--40">
                                <div class="panel">
                                    <div class="panel__body">
                                        <vddl-list class="panel__body--list"
                                        :list="list"
                                        :inserted="inserted"
                                        effect-allowed="move"
                                        :disable-if="disable"
                                        :external-sources="true"
                                        >
                                        <listComponent v-for="(item, index) in list"
                                            :key="index"
                                            :item="item"
                                            :list="list"
                                            :index="index"
                                            :selected="handleSelected"
                                            :selected-item="selectedItem"
                                            :disable="disable"
                                            v-on:componentsChild="handleComponentsChild"
                                            v-on:handleList="handleList"
                                            v-on:cleanObject="handleCleanObject"
                                            v-on:dragstart="handleDragstart">
                                        </listComponent>
                                                <!-- <div :class="element.flagClick?'list-group-item list-group-selected':'list-group-item'" :style="element.component==='hideLine'?'':'min-height:30px'"  v-for="(element,index) in list" :key="element.order"  @dblclick="handleComponentsClick(element)"  @mouseover="handleMouseover(element)" @mouseout="handleMouseout(element)">
                                                    <component 
                                                        :is="element.component" 
                                                        :comProps="element.props"  
                                                        :text="element.name"
                                                    >
                                                    </component>
                                                    <div class="list-group-item-div" 
                                                        ref="itemButtonControler" 
                                                        v-show="element.active">
                                                        <a  v-if="list.length>=2&&index!=0" @click="handleUpMove(element,index)">上移</a>
                                                        <a  v-if="list.length>=2&&index!=list.length-1" @click="handleUpDown(element,index)">下移</a>
                                                        <a  @click="handleDelete(element,index)">删除</a>
                                                    </div>
                                                </div> -->
                                        </vddl-list>
                                    </div>
                                </div>
                            </div>
                       </div>
                    </el-row>
                </div>
            </el-col>
            </div>
            <el-col :span="8" class="wf-addDiy-col-third" v-model="collapseComponent">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{optionName}}</span>
                    </div>
                    <div  class="text item" >
                        <!-- <pre>{{componentsData}}</pre> -->
                        <component-props v-bind:component="collapseComponent" v-on:newComponent="handleNewComponent"  :selComponentId="selComponentId"></component-props>
                    </div>
                </el-card>
            </el-col>
            <!-- <el-col :span="12" class="wf-addDiy-col-third">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span> 小程序json</span>
                    </div>
                    <div  class="text item" >
                        <pre>{{listString}}</pre>
                    </div>
                </el-card>
            </el-col> -->
        </el-row>
        <el-row class="wf-addDiy-button">
            <el-button  @click="save" size="mini" :loading="loading">保存</el-button>
        </el-row>
        <versionCom v-if="showVersion" v-on:closeVersion="handleCloseVersion"></versionCom>
    </div>
</template>

<script>
// import "@/mockjs/index.js";
import topBar from '../components/topBar/topBar.vue'; //顶部提示
import draggable from 'vuedraggable';

import componentProps from '../components/componentProps/componentProps.vue'; //可视化设计器操作面板
import componentPropsFor from './componentPropsFor.js';  //初始化组件属性
import { computeScaleP_M  } from '@/untils/common.js';
import { initPageEdit } from '@/server/adapter';
import versionCom from '@/components/WF_admin/shop_admin/version/version';
import { getAuditApplicationList } from '@/server/common';
import Vue from "vue";


import listComponent from '../components/vddl/nested-list.vue';
export default {
    name: "hello",
    components: {
        draggable,
        componentProps,
        topBar,
        listComponent,
        versionCom
    },
    data() {
        return {
            otheruuid:require('uuid/v1')(),
            active:false,
            showVersion:false,
            flagShowV:false,
            list: [],
            newListInsert:[],
            flagInsert:false,
            componentsData:{},
            collapseComponent:{},
            editable: true,
            delayedDragging: false,
            conObj:[],
            selComponentId:0,
            newListString:{},
            componentPropsFor:componentPropsFor,
            optionName:'操作面板',
            loading:false,
            disable: false,
            selectedItem:null,
            flagMouseup:false,
            flagdragstart:false
        };
    },
    created(){
        /**
         * @description  判断是否是编辑页面，如果是编辑状态，则进行初始化，在页面初始化后给list赋值重新渲染
         * @date 20190125
         */
        let that=this;
        if(this.$route.query.param&&this.$route.query.id){
            if(this.$route.query.param=='edit'){
                let newData=[];
                (async () => {
                    newData=await initPageEdit(this,this.$route.query.id);
                    that.$nextTick(()=>{
                        if(newData.data){
                            that.$message.error(newData.data.msg);
                        }else{
                            that.list= newData;
                        }
                    })
                })();
            }
        }
    },
    mounted(){
        //初始化组件
        this.initComponents();
    },
    methods: {
        handleCloseVersion(){
            this.showVersion=false;
        },
        handleDragstart(el){
            this.flagdragstart=el;
        },
        handleMouseup(item,index){
            let newItem={}
            newItem.item=JSON.parse(JSON.stringify(item));
            newItem.list=this.list;
            newItem.index=index;
            this.flagMouseup=true;
            this.inserted(newItem)
        },
        //清理数据
        handleCleanObject(componentsData,collapseComponent){
            this.collapseComponent=collapseComponent;
            this.componentsData=componentsData;
        },
        handleList(list){
            this.list=list;
        },
        //回调
        handleComponentsChild(optionName,list,selComponentId,item){
            this.optionName=optionName;
            this.list=list;
            this.selComponentId=selComponentId;
            //给属性面板赋值
            this.componentsData=item;
            //给操作面板赋值
            this.collapseComponent=item;
        },
        //回调
        handleComponents(optionName, list,selComponentId,componentsData){
            this.optionName=optionName;
            this.list=list;
            this.selComponentId=selComponentId;
            this.componentsData=componentsData;
        },
        //插入和拖拽数据处理
        inserted(datas){
            /***
             * 过滤vddl-list 回调函数callback的值
             * ---start---
             */
            let that=this;
            setTimeout(()=>{
                let newDatas=[];
                if(datas.list.length>0){
                    newDatas=datas.list.filter((item,i)=>{
                        if((i===datas.index)||item.order!=datas.item.order){
                            return item;
                        }
                    })
                }
                that.list=newDatas;
                /**---end---*/
                that.optionName=datas.item.name;
                if(datas.item.state === 0){
                    that.$confirm('功能开发中，敬请期待~', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        
                    }).catch(() => {
                                
                    });
                }else{
                    if((datas.item.component==="bargain"||
                    datas.item.component==="assemble"||
                    datas.item.component==="spike"||
                    datas.item.component==="notice"||
                    datas.item.component==="videos")&&that.flagShowV){
                        that.showVersion=true;
                        return false;
                    }
                    let arrId=[];
                    let nextNum=null;
                    //list有值
                    let i=null;
                    if(that.list&&that.list.length!=0){
                        that.list.forEach((item,index)=>{
                            if(item.flagClick){
                                i=index;
                            }
                            that.list[index].flagClick=false;
                            if(item.id){
                                arrId.push(item.id);
                            }
                            if(item.order||item.order===0){
                                arrId.push(item.order);
                            }
                        })
                        nextNum=Math.max(... Array.from( new Set(arrId) ))+1;
                    }else{
                    //list为空
                        nextNum=0;
                    }
                    let data={};
                    if(that.flagdragstart){
                        that.flagdragstart=false;
                        data= {
                            "name":datas.item.name,
                            "order":nextNum,
                            "fixed": false,
                            "component":datas.item.component,
                            "flagClick":true,
                            "props":datas.item.props
                        };
                    }else{
                        data= {
                            "name":datas.item.name,
                            "order":nextNum,
                            "fixed": false,
                            "component":datas.item.component,
                            "flagClick":true,
                            "props":that.componentPropsFor[datas.item.component]
                        };
                    }
                    
                    //推入到总列表中
                    if(!that.flagMouseup){
                        that.list.some((el,j)=>{
                            if(el.id){
                                if(el.id===datas.item.id){
                                    that.list[j]=data;
                                    return true;
                                }
                            }
                        })
                    }else{
                        that.flagMouseup=false;
                        if(that.selComponentId!=-1&&i!=null){
                            that.list.splice(i+1,0,data);
                        }else{
                            that.list.push(data);
                        }
                    }
                
                    that.selComponentId=nextNum;
                    //给属性面板赋值
                    that.componentsData=data;
                    //给操作面板赋值
                    that.collapseComponent=data;
                }
            },0)
        },
        handleSelected(item) {
            this.selectedItem = item;
        },
        handleSetPage(){
            this.list.forEach((item,i)=>{
                item.flagClick=false;
            });
            this.collapseComponent=this.$store.state.setPageProps;
            let setPageProps=this.$store.state.setPageProps;
            setPageProps.flagClick=true;
            this.$store.commit({
                type:'setPageProps',
                setPageProps:setPageProps
            });
            this.optionName='页面设置';
            this.selComponentId=-1;
        },
        save(){
            let that=this;
            //商品接口单独处理
            let saveData=JSON.parse(JSON.stringify(this.list));
            //校验标识 valideFlag
            let valideFlag=true;
            let valideText='';
            saveData.forEach((item,i)=>{
                if(item.component==='swiper'){
                    //处理轮播图图片高度
                    item.props[1].item.height=computeScaleP_M(item.props[1].item.height);
                }
                if(item.component==='imageLabel'){
                    //处理图片广告图片高度
                    item.props[1].item.height=computeScaleP_M(item.props[1].item.height);
                }
                if(item.component==='goods'||item.component==='bargain'||item.component==='assemble'||item.component==='spike'){
                    item.props[0].item.some((itemj,j)=>{
                        if(itemj.selectShow){
                            if(itemj.props.length>0){
                                saveData[i].props[0].item=[];
                                saveData[i].props[0].parentComponent=itemj.parentComponent;
                                itemj.props.forEach((itemk,k)=>{
                                    if(itemk.id){
                                        saveData[i].props[0].item.push(itemk.id);
                                    }
                                })
                            }else{
                                valideFlag=false;
                                valideText='请选择商品';
                            }
                            return true;
                        }
                    })
                }
                if(item.component==='navigation'){
                    item.props[0].item.some((itemj,j)=>{
                        if(itemj.selectShow){
                            if(itemj.item.length>0){
                                saveData[i].props[0].item=[];
                                saveData[i].props[0].parentComponent=itemj.parentComponent;
                                itemj.item.forEach((itemk,k)=>{
                                    saveData[i].props[0].childrenItem[k]=itemk;
                                })
                            }else{
                                valideFlag=false;
                                valideText='请添加导航';
                            }
                            return true;
                        }
                    })
                }
                if(item.component==='cube'){
                    item.props[0].item.some((itemj,j)=>{
                        if(itemj.selectShow){
                            if(itemj.item.length>0){
                                itemj.item.forEach((itemk,k)=>{
                                   delete itemk.order;
                                })
                                if(itemj.item.length>itemj.type){
                                   itemj.item.splice(itemj.type,itemj.item.length-itemj.type)
                                }
                                itemj.item.some((itemp,p)=>{
                                    if(!itemp.srcUrl){
                                        valideFlag=false;
                                        valideText='请将魔方图片上传完整';
                                        return true;
                                    }
                                })
                            }else{
                                valideFlag=false;
                                valideText='请将魔方图片上传完整';
                            }
                            return true;
                        }
                    })
                }
                if(item.component==='hideLine'){
                    if(item.props[0].item.bgcolor===null){
                        item.props[0].item.bgcolor='';
                    }
                }
                if(item.component==='notice'){
                    if(!item.props[0].item.content){
                        valideFlag=false;
                        valideText='请输入公告内容';
                    }
                    saveData[i].props[0].item.content=item.props[0].item.content;
                    saveData[i].props[0].item.fontcolor=item.props[0].item.fontcolor;
                    saveData[i].props[0].item.radio=item.props[0].item.radio;
                    saveData[i].props[0].item.radio1=item.props[0].item.radio1;
                    saveData[i].props[0].item.bgcolor=item.props[0].item.bgcolor; 
                }
            })
            let data={};
            if(this.$route.query.param&&this.$route.query.id){
                if(this.$route.query.param=='edit'){
                    data={
                        secret:localStorage.getItem('secretId'),
                        data:saveData,
                        id:this.$route.query.id
                    }
                }
            }else{
                data={
                    secret:localStorage.getItem('secretId'),
                    data:saveData
                }
            }
            /**
             * 临时处理秒杀组件
             * ---start---
             */
            let spikeLength=[];
            spikeLength=saveData.filter((item)=>{
                if(item.component==='spike'){
                    return item;
                }
            })
            if(spikeLength.length>1){
                that.$message.warning('秒杀组件暂时只支持一个!');
                return false;
            }
            /**
             * ---end---
             */
            
            if(!valideFlag){
                that.$message.warning(valideText);
            }else{
                this.loading=true;
                this.$axios.post(this.url+'shopapi/decoration/add',data).then(res=>{
                    if(res.data){
                        if(res.data.code==200){
                            this.saveTitle(res.data.data.id);
                        }else if(res.data.msg){
                            that.loading=false;
                            that.$message.error(res.data.msg);
                        }else{
                            that.loading=false;
                            that.$message.error('网络错误!');
                        }
                    }else{
                        that.loading=false;
                        that.$message.error('网络错误!');
                    }
                }).catch(err=>{
                    that.loading=false;
                    that.$message.error('网络错误!');
                });
            }
        },
        saveTitle(id){
            let that=this;
            debugger
            let data={
                secret:localStorage.getItem('secretId'),
                id:id,
                title:this.$store.state.setPageProps.props[0].item.title,
                bgradio:this.$store.state.setPageProps.props[0].item.bgradio,
                textRadio:this.$store.state.setPageProps.props[0].item.textRadio,
                bgcolor:this.$store.state.setPageProps.props[0].item.bgcolor,
                bgPradio:this.$store.state.setPageProps.props[0].item.bgPradio,
                bgPcolor:this.$store.state.setPageProps.props[0].item.bgPcolor,
            };
            this.$axios.post(this.url+'/shopapi/decoration/setTitle',data).then(res=>{
                that.loading=false;
                if(res.data){
                    if(res.data.code==200){
                        that.$message.success('保存成功!');
                        that.$router.push({path:'/wf/admin/shop/diy/addDiy',name:'addDiy',query:{param:'edit',id:id,otheruuid:that.otheruuid}});
                    }else if(res.data.msg){
                        that.$message.error(res.data.msg);
                    }else{
                        that.$message.error('网络错误!');
                    }
                }else{
                    that.$message.error('网络错误!');
                }
            }).catch(err=>{
                that.loading=false;
                that.$message.error('网络错误!');
            });
        },
        handleNewComponent(val,changeComponentName){
            let that=this;
            let newList=JSON.parse(JSON.stringify(this.list));
            newList.forEach((item,index)=>{
                if(item.flagClick){
                    item.props.some((item1,index1)=>{
                        if(item1.component===changeComponentName){
                            newList[index].props[index1]=val.props[index1];
                            that.collapseComponent=newList[index];
                            if(Object.prototype.toString.call(newList[index].props[index1].item)==='[object Array]'){
                                newList[index].props[index1].item.some((item,i)=>{
                                    if(item.selectShow){
                                        that.selComponentId=item.order;
                                        return true;
                                    }
                                })
                            }
                            return true;
                        }
                    })
                }
            })   
            this.list=newList;   
        },
        handleEdit(element,index){
            //调用编辑页面
        },
        handleMouseover(element){
            //鼠标移入组件
            this.$set(element,'active',true);
        },
        handleMouseout(element){
            //鼠标移出组件
            this.$set(element,'active',false);
        },
        initComponents(){
            let that=this;
            getAuditApplicationList(21).then((resA)=>{
                if(resA.data.code===200){
                    if(resA.data.data===false){
                        that.flagShowV = true;
                    }else{
                        that.flagShowV = false;
                    }
                    that.$store.state.setPageProps.props[0].item={
                        title:'首页',
                        bgradio:1,
                        bgcolor:'#fff',
                        textRadio:1, 
                        bgPradio:1,
                        bgPcolor:'#f5f5f5',
                    };
                    let data={
                        secret:localStorage.getItem('secretId')
                    }
                    that.$axios.post(that.url+'/shopapi/shop_decoration/shopModular',data).then(res=>{
                        if(res.data){
                            if(res.data.code==200){
                                that.conObj=res.data.data;
                                that.conObj.forEach((item,index)=>{
                                    item.type=item.component;
                                    for(let com in that.componentPropsFor){
                                        if(item.component==com){
                                            that.conObj[index].conProps=that.componentPropsFor[com];
                                        }
                                    }
                                })
                                that.initEdit();
                            }else{
                                that.$message.error('网络错误！');
                            }
                        }else{
                            that.$message.error('网络错误!');
                        }
                        that.handleSetPage();
                    }).catch(err=>{
                        that.$message.error('网络错误！');
                    });
                }else{
                    that.$message.error(resA.data.msg+'600A0069');
                }
            }).catch((err)=>{
                that.$message.error('系统出错，请联系管理员!600B0070');
            })
            
        },
        initEdit(){
            /**
             * @description  判断是否是编辑页面，如果是编辑状态，则进行初始化，在页面初始化后给list赋值重新渲染
             * @date 20190125
             */
            let that=this;
            if(this.$route.query.param&&this.$route.query.id){
                if(this.$route.query.param=='edit'){
                    initPageEdit(this,this.$route.query.id).then(newData=>{
                        if(newData.data){
                            that.$message.error('网络错误');
                        }else{
                            that.list= newData;
                        }
                    })
                }
            }
        }
    },
    computed: {
        listString() {
            return JSON.stringify(this.list, null, 2);
        }
    },
    watch: {
    }
};
</script>

<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/DIY/main/addDiy.scss';

.nested{
    .vddl-list{
        min-height: 20px;
        overflow-y: scroll;
        max-height: 554px;
        -ms-overflow-style: none;
        /deep/ .vddl-placeholder{
            border: 1px dashed #1774ff;
            min-height: 80px;
        }
        /**
        * For the correct positioning of the placeholder element, the vddl-list and
        * it's children must have position: relative
        */
        .vddl-list, .vddl-draggable {
            position: relative;
        }

        /**
        * The vddl-list should always have a min-height,
        * otherwise you can't drop to it once it's empty
        */
        .vddl-list {
            padding-left: 0px;
        }

        .vddl-dragging{
            opacity: 0.7;
        }

        /**
        * The vddl-dragging-source class will be applied to
        * the source element of a drag operation. It makes
        * sense to hide it to give the user the feeling
        * that he's actually moving it.
        */
        // .vddl-dragging-source {
        //     display: none;
        // }
    }
}
.vddl-placeholder {
  width: 100%;
  min-height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  padding: 0 15px;
  background: #f5f5f5;
}

/* new-elements */
.new-elements .button{
  border: 1px solid #42B983;
  text-align: center;
  height: 40px;
  border-radius: 4px;
  line-height: 40px;
  background-color: #42B983;
  color: #fff;
  cursor: move;
  font-size: 14px;
}

.new-elements .vddl-dragging-source {
  display: block;
}

.disable-element .button{
  background-color: #E32822;
  border: 1px solid #E32822;
  cursor: pointer;
}

.selected-item .panel__body {
  line-height: 40px;
}

.ashcan{
  .ashcan-logo{
    display: block;
    width: 40px;
    margin: 10px auto;
  }
  .vddl-placeholder {
    display: none;
  }
}
</style>
