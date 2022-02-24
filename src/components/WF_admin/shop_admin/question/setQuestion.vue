<template>
    <!-- class="wf-" -->
    <div class="wf-question-setQuestion" >
        <el-steps :active="1" class="wf-steps" simple>
            <el-step title="创建表单" class="one"><div class="icon-active" slot="icon">1</div></el-step>
            <el-step title="设置表单内容" class="two"><div class="icon-active " slot="icon">2</div></el-step>
            <el-step title="编辑分析报告及推荐商品" class="three"><div class="icon-active three" slot="icon">3</div></el-step>
            <el-step title="完成" class="four"><div class="icon-active four" slot="icon">4</div></el-step>
        </el-steps>
        <el-row>
            <el-col :span="16" :offset="4" v-model="subject" v-for="(itemi,indexi) in subject" :key='indexi'>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-col :span="2" class="name">
                            <label>题目标题</label>
                        </el-col>
                        <el-col :span="16">
                            <el-input :maxlength="80" class="wf-textareaVaild-input" size="mini" v-model="itemi.subject"  placeholder="请在这里编辑问卷标题"></el-input>
                            <span class="wf-textareaVaild ">{{(80-itemi.subject.length)}}/80</span>
                        </el-col>
                        <el-col :span="3" :offset="3">
                            <el-col :span="8" >
                                <el-button v-if="indexi!=0" class="button" type="text" @click="moveUpParent(indexi)">上移</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button v-if="indexi!=subject.length-1" class="button" type="text" @click="moveDownParent(indexi)">下移</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="button wf-com-red-text" type="text" @click="deleteQuesParent(indexi)">删除</el-button>
                            </el-col>
                        </el-col>
                    </div>
                    <div class="text item">
                        <el-row class="header">
                            <el-col :span="2" :offset="1">
                                <label>作答选项</label>
                            </el-col>
                            <el-col :span="8" class="wf-right" :push="1">
                                <label>选项内容</label>
                            </el-col>
                            <el-col :span="4" class="wf-right" :push="2">
                                <label>选项分值</label>
                                <label class="help">支持1位小数</label>
                            </el-col>
                            <el-col :span="6" class="wf-right" :push="3">
                                <label>操作</label>
                            </el-col>
                        </el-row>
                        <el-row v-for="(itemj,indexj) in itemi.answer" :key="indexj">
                            <el-col :span="8" :offset="3" class="wf-right" :push="1">
                                <el-input :maxlength="35" class="wf-textareaVaild-input"  size="mini" :controls="false" v-model="itemj.answer"  placeholder="请在这里编辑选项内容"></el-input>
                                <span class="wf-textareaVaild ">{{(35-itemj.answer.length)}}/35</span>
                            </el-col>
                            <el-col :span="4" class="wf-right" :push="2">
                                <el-input v-model="itemj.score"  @keyup.native="upperCase(itemj,indexi,indexj)" size="mini"></el-input>
                                <!-- <el-input-number size="mini" :controls="false"  v-model="itemj.score"  :precision="1"  placeholder="请输入数字"></el-input-number> -->
                            </el-col>
                            <el-col :span="6" class="wf-right" :push="3">
                                <el-button type="text" @click="copyQuesChildren(indexi,itemj)">复制</el-button>
                                <el-button type="text" class="wf-com-red-text" @click="deleteQuesChildren(indexi,indexj)">删除</el-button>
                                <el-button type="text" v-if="indexj!=0||indexj!=itemi.answer.length-1">|</el-button>
                                <el-button type="text" v-if="indexj!=0" @click="moveUpChildren(indexi,indexj)">上移</el-button>
                                <el-button type="text" v-if="indexj!=itemi.answer.length-1" @click="moveDownChildren(indexi,indexj)">下移</el-button>
                            </el-col>
                        </el-row>
                        <el-row class="add-children">
                            <el-col :span="8" :offset="3" class="label" :push="1">
                                <i class="el-icon-plus" @click="addChildrenQues(indexi)"></i>
                                <label @click="addChildrenQues(indexi)">添加选项</label>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16" :offset="4" class="add-parent" >
                <i class="el-icon-plus" @click="addParentQues()"></i>
                <label @click="addParentQues()">单选题</label>
            </el-col>
        </el-row>
        <div class="wf-submit">
            <el-button @click="preSubmit" v-if="$route.query.state==0" size="mini">上一步</el-button>
            <el-button  type="info" v-else-if="$route.query.state==1" disabled size="mini">上一步</el-button>
            <el-button @click="preSubmit"  v-else-if="!$route.query.param"  size="mini">上一步</el-button>
            <el-button type="primary" v-if="$route.query.state==0" @click="nextSubmit" size="mini" :loading="loadingBtnNext">下一步</el-button>
            <el-button type="info" v-else-if="$route.query.state==1" disabled size="mini">下一步</el-button>
            <el-button type="primary" v-else-if="!$route.query.param" @click="nextSubmit"  :loading="loadingBtnNext" size="mini">下一步</el-button>
        </div>
    </div>
</template>

<script>
import {imgFormat} from '@/untils/common.js';
export default {
    name: '',
    data() {
        return {
            subject:[{
                answer:[{
                    answer:'',
                    score:null
                }],
                subject:''
            }],
            loadingBtnNext:false
        }
    },
    components: {

    },
    created(){
        if(this.$route.query.param&&this.$route.query.id){
            if(this.$route.query.param=='edit'){
                this.initPageEdit(this.$route.query.id);
            }
        }
    },
    mounted(){

    },
    methods: {
        upperCase(itemj,indexi,indexj){//用户只能输入正负数与小数
            if(isNaN(itemj.score) && !/^-$/.test(itemj.score)){
                this.subject[indexi].answer[indexj].score=0;
            }
            if(!/^[+-]?\d*\.{0,1}\d{0,1}$/.test(itemj.score)){
                if(itemj.score===0){
                    this.subject[indexi].answer[indexj].score=0;
                }else{
                    this.subject[indexi].answer[indexj].score=itemj.score.replace(/\.\d{2,}$/,itemj.score.substr(itemj.score.indexOf('.'),2));
                }
            }
        },
        initPageEdit(id){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
                id:id
            }
            this.$axios.post(this.url+'shopapi/Question/questionSubject',data).then(res=>{
                if(res.data){
                    if(res.data.code==200){
                        if(res.data.data.length>0){
                            that.subject=res.data.data;
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }else{
                    that.$message.error('网络错误!');
                }
            }).catch(err=>{
                that.$message.error('网络错误!');
            });
        },
        addParentQues(){
            this.subject.push({
                answer:[{
                    answer:'',
                    score:null
                }],
                subject:''
            })
        },
        moveUpParent(indexi){
            let that=this;
            this.subject.some((item,i)=>{
                if(i===indexi){
                    that.subject[i]=that.subject[i-1];
                    //采用splice，触发vue双向绑定，动态更新view
                    that.subject.splice(i-1,1,item);
                    return true;
                }
            })  
        },
        moveDownParent(indexi){
            let that=this;
            this.subject.some((item,i)=>{
                if(i===indexi){
                    that.subject[i]=that.subject[i+1];
                    //采用splice，触发vue双向绑定，动态更新view
                    that.subject.splice(i+1,1,item);
                    return true;
                }
            })  
        },
        deleteQuesParent(index){
            if(this.subject.length===1){
                this.$message({
                    type: 'info',
                    message: '已是最后一个卡片，不能删除'
                });  
            }else{
                this.subject.splice(index,1);
            }
        },
        moveUpChildren(indexi,indexj){
            let that=this;
            this.subject[indexi].answer.some((item,i)=>{
                if(i===indexj){
                    that.subject[indexi].answer[indexj]=that.subject[indexi].answer[i-1];
                    //采用splice，触发vue双向绑定，动态更新view
                    that.subject[indexi].answer.splice(i-1,1,item);
                    return true;
                }
            })  
        },
        moveDownChildren(indexi,indexj){
            let that=this;
            this.subject[indexi].answer.some((item,i)=>{
                if(i===indexj){
                    that.subject[indexi].answer[indexj]=that.subject[indexi].answer[i+1];
                    //采用splice，触发vue双向绑定，动态更新view
                    that.subject[indexi].answer.splice(i+1,1,item);
                    return true;
                }
            })  
        },
        addChildrenQues(index){
            this.subject[index].answer.push({
                    answer:'',
                    score:null
                })
        },
        copyQuesChildren(indexi,itemj){
            this.subject[indexi].answer.push({
                answer:itemj.answer,
                score:itemj.score
            })
        },
        deleteQuesChildren(indexi,indexj){
             if(this.subject[indexi].answer.length===1){
                this.$message({
                        type: 'info',
                        message: '已是最后一个选项，不能删除'
                    });  
            }else{
                this.subject[indexi].answer.splice(indexj,1);
            }
        },
        preSubmit(){
            this.$router.push({path:'/wf/admin/shop/markting/question/addQuestion',query:{param:'edit',id:this.$route.query.id,state:this.$route.query.state}});   
        },
        nextSubmit(){
            let that=this;  
            let data={
                secret:localStorage.getItem('secretId'),
                subject:this.subject,
                question_id:this.$route.query.id
            }       
            this.loadingBtnNext=true;
            this.$axios.post(this.url+'shopapi/Question/subjectAnswer',data).then(res=>{
                that.loadingBtnNext=false;
                if(res.data){
                    if(res.data.code==200){
                        if(that.$route.query.param&&that.$route.query.id){
                            if(that.$route.query.param=='edit'){
                                that.$router.push({path:'/wf/admin/shop/markting/question/editReport',name:'editReport',query:{param:'edit',id:this.$route.query.id,state:that.$route.query.state}});
                            }
                        }else{
                            that.$router.push({path:'/wf/admin/shop/markting/question/editReport',name:'editReport',query:{id:that.$route.query.id,state:that.$route.query.state}});
                        }
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }else{
                    that.$message.error('网络错误！');
                }
            }).catch(err=>{
                that.loadingBtnNext=false;
                that.$message.error('网络错误！');
            });
        },
    },
}
</script>


<style lang="scss" scoped>
.wf-question-setQuestion{
    background-color: #fff;
    padding: 20px;
    .wf-textareaVaild{
        top:-27px;
    }
    .add-parent{
        cursor: pointer;
        width: auto;
        color: #719ff8;
        label{
            cursor: pointer;
        }
    }
    .wf-submit{
        text-align: center;
    }
    /deep/ .wf-steps{
        @media screen and (max-width: 1365px)  {
            padding: 0;
        }
        @media screen and (min-width: 1366px)  {
            padding: 0;
        }
        @media screen and (min-width: 1600px)  {
            padding: 0 200px;
        }
        background: #fff;
        margin-bottom:50px;
        .el-step__icon.is-text {
                border-radius: 4px;
                background:rgba(243,243,243,1);
                color: #999999;
                border: none;
                width: 24px;
                height: 24px;
                font-size: 14px;
        }
        .is-process {
            .el-step__icon.is-text {
                background-color: #719FF8;
                color: #fff;
            }
        }
        .is-finish{
            .el-step__icon.is-text {
                background-color: #719FF8;
                color: #fff;
            }
        }
        .el-step__main{
            .el-step__arrow{
                &:before{
                    height: 2px;
                    top: 11px;
                    right: 20px;
                    transform: none;
                    background-color: #c0c4cc;
                    width: auto;
                }
                &:after{
                    display: none;
                }
            }
        }
        .one{
            .el-step__main{
                .el-step__arrow{
                    &:before{
                         left: 80px;
                    }
                }
            }
        }
        .two{
            .el-step__main{
                .el-step__arrow{
                    &:before{
                         left: 110px;
                    }
                }
            }
        }
        .three{
            .el-step__main{
                .el-step__arrow{
                    &:before{
                         left: 190px;
                    }
                }
            }
        }
    }
    /deep/ .el-card{
        margin-bottom: 15px;
        .el-card__header{
            background-color: rgb(248, 248, 248);
            .clearfix{
                margin-bottom: 30px;
            }
        }
        .item{
            .header{
                margin-bottom: 20px;
            }
            .add-children{
                div{
                    cursor: pointer;
                    width: auto;
                    color:rgba(113,159,248,1);
                    label{
                        cursor: pointer;
                    }
                }
            }
            .help{
                font-size:12px; 
                color:rgba(153,153,153,1);
            }
        }
        .name {
            line-height: 32px;
        }
        .button{
            float: right;
            padding: 3px 0px;
            line-height: 32px;
        }
    }
}
</style>