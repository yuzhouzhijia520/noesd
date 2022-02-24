<template>
    <!-- class="wf-" -->
    <div class="wf-question-editReport">
        <el-steps :active="2" class="wf-steps" simple>
            <el-step title="创建表单" class="one"><div class="icon-active" slot="icon">1</div></el-step>
            <el-step title="设置表单内容" class="two"><div class="icon-active " slot="icon">2</div></el-step>
            <el-step title="编辑分析报告及推荐商品" class="three"><div class="icon-active three" slot="icon">3</div></el-step>
            <el-step title="完成" class="four"><div class="icon-active four" slot="icon">4</div></el-step>
        </el-steps>
        <el-row>
            <el-col :span="16" :offset="4" v-for="(item,index) in data" :key='index'>
                <el-card class="box-card" >
                    <div slot="header" class="clearfix">
                        <el-col :span="2" :offset="1" class="name">
                            <label>分析报告</label>
                        </el-col>
                        <el-col :span="3" :offset="18" class="name">
                            <el-col :span="8">
                                <el-button class="button" v-if="index!=0" @click="moveUp(index)"  type="text">上移</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="button" v-if="index!=data.length-1" @click="moveDown(index)" type="text">下移</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="button wf-com-red-text"  type="text" @click="deleteReport(index)">删除</el-button>
                            </el-col>
                        </el-col>
                    </div>
                    <div class="text item" @click="getIndex(index)">
                         <el-row>
                            <el-col :span="20">
                                <el-form  :model="item" label-width="120px" >
                                    <el-form-item label="总分值">
                                        <el-col :span="4">
                                             <el-input v-model="item.min_score" size="mini" placeholder="请输入最小分值"></el-input>
                                        </el-col>
                                        <el-col :span="1" class="wf-label">
                                             <label>-</label>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-input v-model="item.max_score" size="mini" placeholder="请输入最大分值"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="分析结论">
                                        <el-input :maxlength="30" v-model="item.conclusion" size="mini"  placeholder="请在这里编辑结论"></el-input>
                                        <span class="wf-textareaVaild ">{{(30-item.conclusion.length)}}/30</span>
                                    </el-form-item>
                                    <el-form-item label="详细解说及建议">
                                        <el-input :maxlength="500" type="textarea"  :rows="4" v-model="item.detailed" size="mini"  placeholder="请在这里编辑分析详细解说及建议等"></el-input>
                                        <span class="wf-textareaVaild ">{{(500-item.detailed.length)}}/500</span>
                                    </el-form-item>
                                    <el-form-item label="推荐商品">
                                        <el-tag
                                            :key="i"
                                            v-for="(tag,i) in item.goods"
                                            closable
                                            :disable-transitions="false"
                                            @close="handleClose(i,index)"
                                            color="#fff">
                                            {{tag.good_name}}
                                            </el-tag>
                                        <el-button type="text"  size="mini" @click="addShop(index)">添加</el-button>
                                    </el-form-item>
                                    <el-form-item label="推荐按钮说明" size="mini" prop="fileListImg" class="share-img">
                                        <el-input :maxlength="20" v-model="item.button" size="mini"  placeholder="推荐好物"></el-input>
                                        <span class="wf-textareaVaild ">{{(20-item.button.length)}}/20</span>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16" :offset="4" class="add-parent" >
                <i class="el-icon-plus" @click="addReport()"></i>
                <label @click="addReport()">添加分析报告</label>
            </el-col>
        </el-row>
        <div class="wf-submit">
            <el-button @click="preSubmit" v-if="$route.query.state==0" size="mini">上一步</el-button>
            <el-button  type="info" v-else-if="$route.query.state==1" disabled size="mini">上一步</el-button>
            <el-button type="primary"  v-if="$route.query.state==0" @click="nextSubmit" size="mini" :loading="loadingBtnNext">下一步</el-button>
            <el-button type="info" v-else-if="$route.query.state==1" disabled  size="mini" >下一步</el-button>
        </div>
        <el-dialog title="选择商品" 
            :visible.sync="dialogShopVisible" 
            width="950px" 
            center 
            class="wf-addCoupon-Shop"
            v-if="dialogShopVisible==true">
            <select-shop 
                @shopSelectedId="handleShopSelectedId"
                :selectedShops="selectedShops"
                :selectedCardId="cardId"
                :limit="10"
                :selectParams="selectParams"
                ref="selectShop"
                ></select-shop>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="handleCancel">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleDialogShopVisible">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import SelectShop from "../markting/SelectShop.vue";
export default {
    name: '',
    data() {
        return {
            data:[
                {
                    min_score:null,
                    max_score:null,
                    conclusion:'',
                    detailed:'',
                    recommend_goods:[],
                    button:'推荐好物',
                    goods:[],
                }
            ],
            selectParams:[],
            newdata:[],
            //选择商品
            dialogShopVisible:false,
            //点击卡片项
            cardId:0,
            loadingBtnNext:false,
            selectedShops:[],
            submitSelected:[]
        }
    },
    components: {
        SelectShop
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
        initPageEdit(id){
            let that=this;
            let data={
                secret:localStorage.getItem('secretId'),
                id:id
            }
            this.$axios.post(this.url+'shopapi/Question/questionConclusion',data).then(res=>{
                if(res.data){
                    if(res.data.code==200){
                        let newData=res.data.data;
                        if(res.data.data.length>0){
                            let newRecommend_goods=[];
                            newData.forEach((item,index)=>{
                                // item.goods.push(item.goods);
                                if(item.recommend_goods){
                                    item.recommend_goods=item.recommend_goods.split(",");
                                    // that.selectedShops.push(item.recommend_goods);
                                }else{
                                    item.recommend_goods=[];
                                }
                            })
                            that.data=newData;
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
        getIndex(index){
            this.cardId=parseInt(index);
        },
        moveUp(index){
            let that=this;
            this.data.some((item,i)=>{
                if(i===index){
                    that.data[i]=that.data[i-1];
                    //采用splice，触发vue双向绑定，动态更新view
                    that.data.splice(i-1,1,item);
                    return true;
                }
            }) 
        },
        moveDown(index){
            let that=this;
            this.data.some((item,i)=>{
                if(i===index){
                    that.data[i]=that.data[i+1];
                    //采用splice，触发vue双向绑定，动态更新view
                    that.data.splice(i+1,1,item);
                    return true;
                }
            }) 
        },
        //删除标签
        handleClose(i,index) {
            this.cardId=parseInt(index);
            this.data[this.cardId].goods.splice(i, 1);
        },
        addReport(){
            this.data.push(
                {
                    min_score:0,
                    max_score:100,
                    conclusion:'',
                    detailed:'',
                    recommend_goods:[],
                    button:'',
                    goods:[]
                })
        },
        deleteReport(index){
            if(this.data.length===1){
                this.$message({
                        type: 'info',
                        message: '已是最后一个卡片，不能删除'
                    });  
            }else{
                this.data.splice(index,1);
            }
        },
        preSubmit(){
            this.$router.push({path:'/wf/admin/shop/markting/question/setQuestion',query:{param:'edit',id:this.$route.query.id,state:this.$route.query.state}});
        },
        nextSubmit(){
            let that=this;  
            let newData=JSON.parse(JSON.stringify(this.data));
            this.data.forEach((item,index)=>{
                let newArr=[];
                if(Object.prototype.toString.call(that.data[index].goods)==='[object Array]'){
                    that.data[index].goods.forEach((itemi,indexi)=>{
                        newArr.push(itemi.id);
                    })
                    newData[index].recommend_goods=newArr.join(",");
                }
            })
            let data={
                secret:localStorage.getItem('secretId'),
                conclusion:newData,
                question_id:this.$route.query.id
            }       
            this.loadingBtnNext=true;
            this.$axios.post(this.url+'shopapi/Question/conclusionAdd',data).then(res=>{
                this.loadingBtnNext=false;
                if(res.data){
                    if(res.data.code==200){
                        that.$router.push({path:'/wf/admin/shop/markting/question/previewQuestion',name:'previewQuestion',query:{id:that.$route.query.id,state:that.$route.query.state}});
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }else{
                    that.$message.error('网络错误！');
                }
            }).catch(err=>{
                this.loadingBtnNext=false;
                that.$message.error('网络错误！');
            });
        },
        addShop(index){
            this.cardId=parseInt(index);
            this.selectedShops=JSON.parse(JSON.stringify(this.data[this.cardId].recommend_goods));
            this.selectParams=JSON.parse(JSON.stringify(this.data[this.cardId].goods));
            this.dialogShopVisible=true;
        },
        //已选择的商品回调函数
        handleShopSelectedId:function(selected){
            this.submitSelected=selected;
            // this.newdata=JSON.parse(JSON.stringify(this.data));
            // this.newdata[that.cardId].goods=[];
            // selected.forEach(element => {
            //     that.newdata[that.cardId].goods.push({
            //         id:element.id,
            //         good_name:element.good_name
            //     });
            //     that.newdata[that.cardId].recommend_goods=Array.from(that.newdata[that.cardId].goods,x=>x.id);
            // });
        },
        //选择商品确定事件
        handleDialogShopVisible:function(){
            let that=this;
            this.newdata=JSON.parse(JSON.stringify(this.data));
            this.newdata[this.cardId].goods=[];
            this.submitSelected.forEach(element => {
                that.newdata[that.cardId].goods.push({
                    id:element.id,
                    good_name:element.good_name
                });
                that.newdata[that.cardId].recommend_goods=Array.from(that.newdata[that.cardId].goods,x=>x.id);
            });
            this.data=JSON.parse(JSON.stringify(this.newdata));
            this.dialogShopVisible=false;
        },
        handleCancel(){
            this.dialogShopVisible = false
        }
    }
}
</script>


<style lang="scss" scoped>
.wf-question-editReport{
    background-color: #fff;
    padding: 20px;
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
            .el-form{
                .el-form-item{
                    .el-form-item__content{
                        .el-tag{
                            margin-right: 10px;
                            margin-bottom: 5px;
                        }
                    }
                }
            }
            .header{
                margin-bottom: 20px;
            }
            .wf-label{
                text-align: center;
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