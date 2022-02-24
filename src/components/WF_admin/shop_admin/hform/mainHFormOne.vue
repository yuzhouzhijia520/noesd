<template>
    <!-- class="wf-" -->
    <div class="">
        <div class="wf-mainHForm">
        <el-steps :active="1" class="wf-steps" simple>
            <el-step title="创建表单" class="one"><div class="icon-active" slot="icon">1</div></el-step>
            <el-step title="设置表单内容" class="two"><div class="icon-active " slot="icon">2</div></el-step>
            <el-step title="完成" class="four"><div class="icon-active four" slot="icon">3</div></el-step>
        </el-steps>
 
        <el-row>
            <el-col :span="16" :offset="4" class="wf-main-form">
                <el-form ref="form" v-model="item.ebody" :rules="rules"  class="wf-form" label-width="120px">
                    <el-row v-for="(items, index) in item.ebody" :key="index">
                        <el-col v-if="items.eltype===1">
                            <!-- v-for="(items1, index1) in items.obj.arrType" :key="index1"  -->
                            <renders 
                                @HFdelete="() => HFdelete(index,indexe)"  
                                @HFDeleteCh="(i) => HFDeleteCh(index,indexe,i)" 
                                @HFCopyCh="(i) => HFCopyCh(index,indexe,i)"
                                @HFDeleteOth="() => HFDeleteOth(index,indexe)"
                                :ele="items.ele" v-if="show" :obj="items.obj" 
                                @handleChangeVal="(val,name,i) => handleChangeVal(val,items.obj,i,name,index,indexe)">
                            </renders>
                        </el-col>
                        <el-col v-else>
                            <renders 
                                @HFdelete="() => HFdelete(index,indexe)"  
                                @HFDeleteCh="(i) => HFDeleteCh(index,indexe,i)" 
                                @HFCopyCh="(i) => HFCopyCh(index,indexe,i)"
                                @HFDeleteOth="() => HFDeleteOth(index,indexe)"
                                :ele="items.ele" v-if="show" :obj="items.obj" 
                                @handleChangeVal="(val,name,i) => handleChangeVal(val,items.obj,i,name,index,indexe)">
                            </renders>
                        </el-col>
                        <el-col>
                            <el-form-item label="类型:" v-if="item.ebody.length>0">
                                <el-col :span="4" class="label WF-add-form" :push="1" v-for="(itemC,indexC) in item.etype" :key="indexC" >
                                    <i class="el-icon-plus" @click="addChildrenQues(itemC.val,indexe)"></i>
                                    <label @click="addChildrenQues(itemC.val,indexe)">{{itemC.name}}</label>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="类型:" v-if="item.ebody.length===0">
                        <el-col :span="4" class="label WF-add-form" :push="1" v-for="(itemC,indexC) in item.etype" :key="indexC" >
                            <i class="el-icon-plus" @click="addChildrenQues(itemC.val,indexe)"></i>
                            <label @click="addChildrenQues(itemC.val,indexe)">{{itemC.name}}</label>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div class="wf-submit">
            <router-link to="/wf/admin/shop/markting/hform/addHForm"> 
                <el-button size="mini">上一步</el-button>
            </router-link>
            <el-button type="primary" @click="submit('form')" :loading="loadingBtnNext" size="mini">下一步</el-button>
        </div>
    </div>
    </div>
</template>

<script>
//Render core engine
import form_list from "./components/FormList";
import renders from "./components/Render";

//http server
import {contentUpdate,hfEdit} from '@/server/hform';

//render components
import { inputConf } from "./components/com/Input";
import { textareaConf } from "./components/com/textarea";
import { selectConf } from "./components/com/select";
import { selectCBoxConf } from "./components/com/selectCBox";
import { addressConf } from "./components/com/address";

//function library
import _ from 'lodash'
export default {
    name: '',
    data() {
        return {
            loadingBtnNext:false,
            form:{

            },
            showTab:true,
            show:true,
            editableTabsValue2: '1',
            editableTabs2: [
                {
                    title: '第1页',
                    id:1,
                    name: '1',
                    ebody: [],
                    etype:[
                        {
                            id:100,
                            name:'单行填空',
                            val:'input'
                        },{
                            id:101,
                            name:'多行填空',
                            val:'textarea'
                        },{
                            id:102,
                            name:'单选',
                            val:'select'
                        },{
                            id:103,
                            name:'多选',
                            val:'selectCBox'
                        },{
                            id:104,
                            name:'地址',
                            val:'address'
                        }
                    ],
                }
            ],
            //总共多少页
            total:0,
            //编辑时需要删除的ID集合
            editDeleteId:[],
            formData: [],
            formDataIndex:0,
            rules:{}
           
        }
    },
    components: {
        renders
    },
    created(){

    },
    mounted(){
        if(this.$route.query.param&&this.$route.query.id){
            if(this.$route.query.param=='edit'){
                this.initEditPage(0);
            }
        }
    },
    methods: {
        initEditPage(key){
            let that=this;
            let data = { 
                pro_id: parseInt(localStorage.getItem('proId')),
                token:localStorage.getItem('userId'),
                id:this.$route.query.id,
                page:parseInt(this.editableTabsValue2)
            }
            hfEdit(data).then((res)=>{
                    if(res.data.code===200){
                        //添加页数
                        //page_max 共有多少页
                        that.total=res.data.data.page_max;
                        if(res.data.data.page_max>1&&key===0){
                            for(let i=0;i<res.data.data.page_max-1;i++){
                                this.editableTabs2.push({
                                    title: '第'+(i+2)+'页',
                                    id:(i+2),
                                    name:(i+2)+'',
                                    ebody:[],
                                    etype:[
                                        {
                                            id:100,
                                            name:'单行填空',
                                            val:'input'
                                        },{
                                            id:101,
                                            name:'多行填空',
                                            val:'textarea'
                                        },{
                                            id:102,
                                            name:'单选',
                                            val:'select'
                                        },{
                                            id:103,
                                            name:'多选',
                                            val:'selectCBox'
                                        },{
                                            id:104,
                                            name:'地址',
                                            val:'address'
                                        }
                                    ]
                                });
                            }
                        }
                        // while
                        that.editableTabs2[parseInt(this.editableTabsValue2)-1].ebody=[];
                        res.data.data.problem.forEach((item,index)=>{
                            let objitem={},newInputCopy,status,radioComType,radioOthComType,nameText,nameTextOth;
                            if(item.state===2){
                                radioComType="radioInput";
                                radioOthComType="radioInputOth";
                                nameText='inputRI';
                                nameTextOth='inputRC';
                            }else if(item.state===3){
                                radioComType="checkBoxInput";
                                radioOthComType="checkInputOth";
                                nameText='inputRIC';
                                nameTextOth='inputRCC';
                            }
                            let radioCom={
                                    // 对应数据库内类型
                                    type: radioComType,
                                    // 是否可配置
                                    config: true,
                                    // 控件左侧label内容
                                    label: '',
                                    name: nameText,
                                    placeholder: '请在这里编辑选项内容',
                                    // 最大长度
                                    maxlength:35,
                                    value: '',
                                    option:[
                                        {
                                            // 对应数据库内类型
                                            type: 'button',
                                            label: '复制'
                                        },{
                                            // 对应数据库内类型
                                            type: 'button',
                                            label: '删除'
                                        }
                                    ]
                                };
                            let radioOthCom= [{
                                // 对应数据库内类型
                                type: radioOthComType,
                                // 是否可配置
                                config: true,
                                // 控件左侧label内容
                                label: '',
                                name: nameTextOth,
                                placeholder: '请在这里编辑选项内容',
                                // 最大长度
                                maxlength:35,
                                value: '',
                                option:[
                                    {
                                        // 对应数据库内类型
                                        type: 'button',
                                        label: '删除'
                                    }
                                ]
                            },
                            {
                                // 对应数据库内类型
                                type: 'radioInputOthText',
                                // 是否可配置
                                config: true,
                                // 控件左侧label内容
                                label: '',
                                name: 'inputRCT',
                                placeholder: '请在这里编辑选项内容',
                                // 最大长度
                                maxlength:35,
                                value: ''
                            }];
                            switch(item.state){
                                case 0:
                                    newInputCopy=_.cloneDeep(inputConf);
                                    newInputCopy.arrType[0].arrType[0].value=item.data_type+"";
                                    if(item.status===0){
                                        status=false;
                                    }else if(item.status===1){
                                        status=true;
                                    }
                                    newInputCopy.arrType[0].arrType[1].value=status;
                                    newInputCopy.arrType[1].value=item.title;
                                    newInputCopy.arrType[2].value=item.answer[0].content;
                                    newInputCopy.arrType[2].key=item.answer[0].id;
                                    newInputCopy.key=item.id;
                                    objitem={
                                        ele: 'input',
                                        obj: newInputCopy
                                    }
                                break;
                                case 1:
                                    newInputCopy=_.cloneDeep(textareaConf);
                                    newInputCopy.arrType[0].arrType[0].value=item.data_type+"";
                                    if(item.status===0){
                                        status=false;
                                    }else if(item.status===1){
                                        status=true;
                                    }
                                    newInputCopy.arrType[0].arrType[1].value=status;
                                    newInputCopy.arrType[1].value=item.title;
                                    newInputCopy.arrType[2].value=item.answer[0].content;
                                    newInputCopy.arrType[2].key=item.answer[0].id;
                                    newInputCopy.key=item.id;
                                    objitem={
                                        ele: 'textarea',
                                        obj: newInputCopy
                                    }
                                break;
                                case 2:
                                    newInputCopy=_.cloneDeep(selectConf);
                                    if(item.status===0){
                                        status=false;
                                    }else if(item.status===1){
                                        status=true;
                                    }
                                    newInputCopy.arrType[0].arrType[1].value=status;
                                    newInputCopy.arrType[1].value=item.title;
                                    newInputCopy.key=item.id;
                                    item.answer.forEach((itemm,i)=>{
                                        if(itemm.state===0){
                                            if(i===0){
                                                newInputCopy.arrType[2].arrType[1].arrType[0].value=itemm.content;
                                                newInputCopy.arrType[2].arrType[1].arrType[0].key=itemm.id;
                                            }else{
                                                radioCom.value=itemm.content;
                                                radioCom.key=itemm.id;
                                                newInputCopy.arrType[2].arrType[1].arrType.push(radioCom);
                                            }
                                        
                                        }else if(itemm.state===1){
                                            radioOthCom[0].value=itemm.content;
                                            radioOthCom[0].key=itemm.id;
                                            radioOthCom[1].value=itemm.tips;
                                            newInputCopy.arrType[2].arrType[2].arrType=radioOthCom;
                                        }
                                    })
                                    objitem={
                                        ele: 'select',
                                        obj: newInputCopy
                                    }
                                break;
                                case 3:
                                    newInputCopy=_.cloneDeep(selectCBoxConf);
                                    if(item.status===0){
                                        status=false;
                                    }else if(item.status===1){
                                        status=true;
                                    }
                                    newInputCopy.arrType[0].arrType[1].value=status;
                                    newInputCopy.arrType[1].value=item.title;
                                    newInputCopy.key=item.id;
                                    item.answer.forEach((itemm,i)=>{
                                        if(itemm.state===0){
                                            if(i===0){
                                                newInputCopy.arrType[2].arrType[1].arrType[0].value=itemm.content;
                                                newInputCopy.arrType[2].arrType[1].arrType[0].key=itemm.id;
                                            }else{
                                                radioCom.value=itemm.content;
                                                radioCom.key=itemm.id;
                                                newInputCopy.arrType[2].arrType[1].arrType.push(radioCom);
                                            }
                                        }else if(itemm.state===1){
                                            radioOthCom[0].value=itemm.content;
                                            radioOthCom[0].key=itemm.id;
                                            radioOthCom[1].value=itemm.tips;
                                            newInputCopy.arrType[2].arrType[2].arrType=radioOthCom;
                                        }
                                    })
                                    objitem={
                                        ele: 'selectCBox',
                                        obj: newInputCopy
                                    }
                                break;
                                case 4:
                                    newInputCopy=_.cloneDeep(addressConf);
                                    if(item.status===0){
                                        status=false;
                                    }else if(item.status===1){
                                        status=true;
                                    }
                                    newInputCopy.arrType[0].arrType[1].value=status;
                                    newInputCopy.arrType[1].value=item.title;
                                    newInputCopy.key=item.id;
                                    objitem={
                                        ele: 'address',
                                        obj: newInputCopy
                                    }
                                break;
                            }
                            that.editableTabs2[parseInt(this.editableTabsValue2)-1].ebody.push(objitem);
                        })
                    }else{
                        that.$message.error(res.data.msg+'600A00241');
                    }
                }).catch((err)=>{
                    that.$message.error('网络错误!'+'600B00242');
                })
        },
        submit(name){
            let that=this;
            // this.$refs[name][0].validate((valid) => {
            //     debugger
            //     if (valid) {
                    let data = { 
                        pro_id: parseInt(localStorage.getItem('proId')),
                        token:localStorage.getItem('userId'),
                        form_id:that.$route.query.id,
                        problem:[],
                    }
                    that.editableTabs2.forEach((item)=>{
                        item.ebody.forEach((iteme)=>{
                            // iteme.forEach((itemj)=>{
                                let state,status;
                                if(iteme.obj.arrType[0].arrType[1].value){
                                    status=1;
                                }else{
                                    status=0;
                                }
                                //单行填空
                                switch(iteme.ele){
                                    case 'input':
                                        state=0;
                                        let problem0={
                                            state:state,
                                            page:item.id,
                                            data_type:iteme.obj.arrType[0].arrType[0].value,
                                            title:iteme.obj.arrType[1].value,
                                            status:status,
                                            answer:[
                                                {
                                                    state:1,
                                                    content:iteme.obj.arrType[2].value
                                                }
                                            ]
                                        };
                                        if(iteme.obj.arrType[2].key){
                                            problem0.answer[0].id=iteme.obj.arrType[2].key;
                                        }
                                        if(iteme.obj.key){
                                            problem0.id=iteme.obj.key;
                                        }
                                        data.problem.push(problem0);
                                    break;
                                    case 'textarea':
                                        state=1;
                                        let problem1={
                                            state:state,
                                            page:item.id,
                                            data_type:iteme.obj.arrType[0].arrType[0].value,
                                            title:iteme.obj.arrType[1].value,
                                            status:status,
                                            answer:[
                                                {
                                                    state:1,
                                                    content:iteme.obj.arrType[2].value
                                                }
                                            ]
                                        };
                                        if(iteme.obj.arrType[2].key){
                                            problem1.answer[0].id=iteme.obj.arrType[2].key;
                                        }
                                        if(iteme.obj.key){
                                            problem1.id=iteme.obj.key;
                                        }
                                        data.problem.push(problem1);
                                        
                                    break;
                                    case 'select':
                                        state=2;
                                        let problem2={
                                            state:state,
                                            page:item.id,
                                            title:iteme.obj.arrType[1].value,
                                            status:status,
                                            answer:[]
                                        };

                                         if(iteme.obj.arrType[2].arrType[1].arrType.length>0){
                                            iteme.obj.arrType[2].arrType[1].arrType.forEach((itemse,index)=>{
                                                problem2.answer.push({
                                                    state:0,
                                                    content:itemse.value
                                                })
                                                if(itemse.key){
                                                    problem2.answer[index].id=itemse.key;
                                                }
                                            })
                                        }
                                        if(iteme.obj.arrType[2].arrType[2].arrType.length>0){
                                            problem2.answer.push({
                                                state:1,
                                                content:iteme.obj.arrType[2].arrType[2].arrType[0].value,
                                                tips:iteme.obj.arrType[2].arrType[2].arrType[1].value
                                            })
                                            if(iteme.obj.arrType[2].arrType[2].arrType[0].key){
                                                problem2.answer[problem2.answer.length-1].id=iteme.obj.arrType[2].arrType[2].arrType[0].key;
                                            }
                                        }
                                        if(iteme.obj.key){
                                            problem2.id=iteme.obj.key;
                                        }
                                        data.problem.push(problem2);
                                    break;
                                    case 'selectCBox':
                                        state=3;
                                        let problem3={
                                            state:state,
                                            page:item.id,
                                            title:iteme.obj.arrType[1].value,
                                            status:status,
                                            answer:[]
                                        };
                                        if(iteme.obj.arrType[2].arrType[1].arrType.length>0){
                                            iteme.obj.arrType[2].arrType[1].arrType.forEach((itemse, index)=>{
                                                problem3.answer.push({
                                                    state:0,
                                                    content:itemse.value
                                                })
                                                 if(itemse.key){
                                                    problem3.answer[index].id=itemse.key;
                                                }
                                            })
                                        }
                                        if(iteme.obj.arrType[2].arrType[2].arrType.length>0){
                                            problem3.answer.push({
                                                state:1,
                                                content:iteme.obj.arrType[2].arrType[2].arrType[0].value,
                                                tips:iteme.obj.arrType[2].arrType[2].arrType[1].value
                                            })
                                            if(iteme.obj.arrType[2].arrType[2].arrType[0].key){
                                                problem3.answer[problem3.answer.length-1].id=iteme.obj.arrType[2].arrType[2].arrType[0].key;
                                            }
                                        }
                                        if(iteme.obj.key){
                                            problem3.id=iteme.obj.key;
                                        }

                                        data.problem.push(problem3);
                                    break;
                                    case 'address':
                                        state=4;
                                        data.problem.push({
                                            state:state,
                                            status:status,
                                            page:item.id,
                                            title:iteme.obj.arrType[1].value
                                        });
                                        if(iteme.obj.key){
                                            data.problem[data.problem.length-1].id=iteme.obj.key;
                                        }
                                    break;
                                }
                        })
                    })
                    // })
                    contentUpdate(data).then((res)=>{
                        if(res.data.code===200){
                            if(that.$route.query.param&&that.$route.query.id){
                                if(that.$route.query.param=='edit'){
                                    that.$router.push({path:'/wf/admin/shop/markting/hform/finishForm',name:'finishForm',query:{param:'edit'}});
                                }
                            }else{
                                that.$router.push({path:'/wf/admin/shop/markting/hform/finishForm',name:'finishForm'});
                            }
                        }else{
                            that.$message.error(res.data.msg+'600A00227');
                        }
                    }).catch((err)=>{
                        that.$message.error('网络错误!'+'600B00228');
                    })
            //     } else {
            //         that.$message.error('表单校验不通过');
            //         return false;
            //     }
            // })
        },
        // 控件回填数据
        handleChangeVal(val, element,i,name,index,indexe) {
            /**indexe 第几页
             * index 第几题
             */
            let that=this;
            element.arrType.forEach((item,j)=>{
                if(item.eltype===1){
                    item.arrType.some(item1=>{
                        if(item1.name===name){
                            that.editableTabs2=_.cloneDeep(that.editableTabs2);
                            return true;
                        }else if(name==='addOption'&&val==='addOption'){
                            //添加
                            let typeText,nameText;
                            if(item1.key===0){
                                typeText='radioInput';
                                nameText='inputRI';
                            }else if(item1.key===1){
                                typeText='checkBoxInput';
                                nameText='inputRIC';
                            }
                            that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[1].arrType.push({
                                // 对应数据库内类型
                                type: typeText,
                                // 是否可配置
                                config: true,
                                // 控件左侧label内容
                                label: '',
                                name: nameText,
                                placeholder: '请在这里编辑选项内容',
                                // 最大长度
                                maxlength:35,
                                value: '',
                                option:[
                                    {
                                        // 对应数据库内类型
                                        type: 'button',
                                        label: '复制'
                                    },{
                                        // 对应数据库内类型
                                        type: 'button',
                                        label: '删除'
                                    }
                                ]
                            });
                            return true;
                        }else if(name==='addOtherOption'&&val==='addOtherOption'){
                            let typeTextC,nameTextC;
                            if(item1.key===0){
                                typeTextC='radioInputOth';
                                nameTextC='inputRC';
                            }else if(item1.key===1){
                                typeTextC='checkInputOth';
                                nameTextC='inputRCC';
                            }
                            //子项添加
                            let arr= that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[2].arrType;
                            if(arr.length>0){
                                 that.$message.warning('最多添加一项填空选项');
                            }else{
                                arr.push(
                                    {
                                        // 对应数据库内类型
                                        type: typeTextC,
                                        // 是否可配置
                                        config: true,
                                        // 控件左侧label内容
                                        label: '',
                                        name: nameTextC,
                                        placeholder: '请在这里编辑选项内容',
                                        // 最大长度
                                        maxlength:35,
                                        value: '',
                                        option:[
                                            {
                                                // 对应数据库内类型
                                                type: 'button',
                                                label: '删除'
                                            }
                                        ]
                                    },
                                    {
                                        // 对应数据库内类型
                                        type: 'radioInputOthText',
                                        // 是否可配置
                                        config: true,
                                        // 控件左侧label内容
                                        label: '',
                                        name: 'inputRCT',
                                        placeholder: '请在这里编辑选项内容',
                                        // 最大长度
                                        maxlength:35,
                                        value: ''
                                    }
                                );
                            }
                            return true;
                        }
                    })
                }else if(item.eltype===2){
                    if(item.type==='addradio'){
                        let newname1,newname2,newname3;
                        if(that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[1].arrType.length>0){
                            newname1=that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[1].arrType[0].name;
                        }
                        if(that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[2].arrType.length>0){
                            newname2=that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[2].arrType[0].name;
                        }
                        if(that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[2].arrType.length>1){
                            newname3=that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[2].arrType[1].name;
                        }
                        if(newname1===name){
                            that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[1].arrType[i].value=val;
                        }else if(newname2===name){
                            that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[2].arrType[0].value=val;
                        }else if(newname3===name){
                            that.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[2].arrType[1].value=val;
                        }
                    }
                }else{
                    if(item.name===name){
                        that.editableTabs2[indexe].ebody[index].obj.arrType.some((items,k)=>{
                            if(items.name===name){
                                 that.editableTabs2=_.cloneDeep(that.editableTabs2);
                                return true;
                            }
                        })
                    }
                }
            })
        },
        addChildrenQues(index,indexe){
            //深度拷贝
            //待优化进行部分你深度拷贝
            let newlist=_.cloneDeep(this.editableTabs2[indexe]);
            debugger
            let arr={};
            if(index==='input'){
                let newInputCopy=_.cloneDeep(inputConf);
                newInputCopy.arrType[0].arrType[0].value='';
                arr={
                    ele: index,
                    obj: newInputCopy
                }
            }else if(index==='textarea'){
                let newInputCopy=_.cloneDeep(textareaConf);
                newInputCopy.arrType[0].arrType[0].value='';
                arr={
                    ele: index,
                    obj: newInputCopy
                }
            }else if(index==='select'){
                let newInputCopy=_.cloneDeep(selectConf);
                newInputCopy.arrType[0].arrType[0].value='';
                arr={
                    ele: index,
                    obj: newInputCopy
                }
            }else if(index==='selectCBox'){
                let newInputCopy=_.cloneDeep(selectCBoxConf);
                newInputCopy.arrType[0].arrType[0].value='';
                arr={
                    ele: index,
                    obj: newInputCopy
                }
            }else if(index==='address'){
                let newInputCopy=_.cloneDeep(addressConf);
                newInputCopy.arrType[0].arrType[0].value='';
                arr={
                    ele: index,
                    obj: newInputCopy
                }
            }
            newlist.ebody.push(arr);
            this.editableTabs2.splice(indexe,1,newlist);
        },
        //单选删除
        HFdelete(index,indexe){
            this.editableTabs2[indexe].ebody.splice(index,1);
        },
        //单选子项删除
        HFDeleteCh(index,indexe,i){
            this.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[1].arrType.splice(i,1);
        },
        //单选子项复制
        HFCopyCh(index,indexe,i){
            this.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[1].arrType.push(
                this.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[1].arrType[i]
            )
        },
        //单选其他删除
        HFDeleteOth(index,indexe){
            this.editableTabs2[indexe].ebody[index].obj.arrType[2].arrType[2].arrType.splice(0,2);
        },
        addTab(targetName) {
            debugger
            if(this.$route.query.param&&this.$route.query.id){
                if(this.$route.query.param=='edit'){
                    if(parseInt(this.editableTabsValue2)){
                        this.initEditPage();
                    }
                    
                }
            }
            if(targetName==='last'){
                this.editableTabs2.push({
                    title: '第'+(this.editableTabs2.length+1+'')+'页',
                    id:this.editableTabs2.length+1,
                    name: this.editableTabs2.length+1+'',
                    ebody:[],
                    etype:[
                        {
                            id:100,
                            name:'单行填空',
                            val:'input'
                        },{
                            id:101,
                            name:'多行填空',
                            val:'textarea'
                        },{
                            id:102,
                            name:'单选',
                            val:'select'
                        },{
                            id:103,
                            name:'多选',
                            val:'selectCBox'
                        },{
                            id:104,
                            name:'地址',
                            val:'address'
                        }
                    ],
                });
                this.editableTabsValue2 = this.editableTabs2.length+1+'';
                console.log(this.editableTabsValue2)
                console.log(this.editableTabs2)
                debugger
            }
        },
        removeTab(targetName) {
            let tabs = this.editableTabs2;
            let activeName = this.editableTabsValue2;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                    }
                });
            }
            this.editableTabsValue2 = activeName;
            this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-mainHForm{
    background-color: #fff;
    padding: 20px;
    min-height: 750px;
    .wf-main-form{
        padding: 20px;
        border: 1px solid #f1f1f1;
        margin-top: 20px;
        .wf-form{
            border: 1px solid #e2e2e2;
            padding-top: 20px;
            .WF-add-form{
                color: #2a94ff;
                width: auto;
                border: 1px dashed #ccc;
                margin: 12px 0;
                cursor: pointer;
                padding: 0 6px;
                margin-top: 5px;
                margin-right: 28px;
                label{
                    cursor: pointer;
                }
            }
            /deep/ .hf-header{
                background-color: rgb(248, 248, 248);
                padding: 10px 0 5px 0;
            }
        }
    }
    .wf-submit{
        text-align: center;
        margin-top: 50px;
    }
}
</style>