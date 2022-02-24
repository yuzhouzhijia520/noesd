<template>
    <div class="wf-addCoupon"
    >
        <el-row :gutter="24">
            <el-col :xs="5" :sm="7" :md="9" :lg="10" :xl="11">
                <el-form :label-position="labelPosition" 
                        :model="addnew" 
                        :rules="rules" 
                        ref="addnew" 
                        label-width="100px" 
                        class="demo-ruleForm">
                    <el-form-item label="标题" prop="title" size="mini">
                        <el-col :span="12" class="wf-addCoupon-coupon_name" >
                            <el-input  size="mini" v-model="addnew.title" placeholder="请输入名称" style="width:615px;" :maxlength="40"></el-input>
                            <span class="wf-textareaVaild ">{{(addnew.title.length)}}/40</span>
                        </el-col>
                    </el-form-item>
                        <el-form-item label="分类" prop="stateVal" class="guanli">
                            <el-select size="mini" v-model="stateVal" placeholder="请选择分类" @change="choose(stateVal)"  >
                                <el-option v-for="item in gridData" :key="item.id" :label="item.name" :value="item.id" style="text-align:center;">
                                </el-option>
                            </el-select>
                            <el-button  size="mini"  class="buttonguanli"  @click="dialogFormVisible = true">管理分类</el-button>
                        </el-form-item>
                    <el-form-item label="封面图" prop="cover_image" size="mini">
                        <el-upload
                            class="avatar-uploader"
                            :action="upUrl+'supper/attachment/upfile'"
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :on-success="beforeAvatarUpload"
                            >
                            <img v-if="addnew.cover_image" :src="addnew.cover_image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"  ></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="虚拟阅读量" prop="virtual_read_volume" size="mini" >
                        <el-input-number :precision="0" :controls="false" size="mini" v-model="addnew.virtual_read_volume" :min="1"  :max="100000" style="width:180px;" ></el-input-number>
                    </el-form-item>
                    <!-- <el-form-item label="视频链接" prop="video_url" size="mini">
                        <el-input :precision="0" :controls="false" size="mini" v-model="addnew.video_url" :min="1"  :max="100000" style="width:615px;margin-left:15px;"></el-input>
                        <div class="buttonguanlis"  style="margin-left: 15px;">建议使用腾讯视频下的通用代码<el-button  size="mini"  class="buttonguanli"  @click="dialogFormVisiblesshili = true">查看示例</el-button></div> 
                        
                    </el-form-item> -->
                    <el-form-item label="详情" prop="content" size="mini" style="margin-left: -15px;">
                        <div class="ql-container ql-snow wf-edit">
                            <div class="ql-editor" >
                                 <quill-editor v-model="addnew.content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @ready="onEditorReady($event)">
                                </quill-editor>
                                <input type="file" hidden accept=".jpg,.png" ref="fileBtn" @change="handleChange">
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="状态" prop="statess"  >
                        <el-select size="mini" v-model="statess" placeholder="请选择状态" @change="choosess(statess)"  >
                            <el-option v-for="item in state" :key="item.id" :label="item.id" :value="item.id" style="text-align:center;">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序" prop="order" size="mini">
                        <el-input-number :precision="0" :controls="false" v-model="addnew.order" size="mini" :min="1" :max="100000"  style="width:180px;"></el-input-number>
                    </el-form-item>
                    <el-form-item >
                        <el-button  size="mini" type="primary" @click="save('addnew')" >保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog title="管理分类" :visible.sync="dialogFormVisible" width="572px">
            <el-button  size="mini" type="primary" @click="addlist">新增</el-button>
            <el-form :model="form">
                <el-table :data="gridData">
                    <el-table-column property="name" label="名称" ></el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.row)" size="mini">编辑</el-button>
                            <el-button type="text" style="color:#E36F6B" @click="deleteGoods(scope.row)" size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    layout="prev, pager, next, jumper"
                    :total="pageCount"
                    :page-size='pageSize'
                    @current-change="getPages">
                </el-pagination>
            </el-form>
            
        </el-dialog>
        <el-dialog :title="this.title" :visible.sync="dialogFormVisibles" width="400px">
            <el-form :model="form">
                <el-form-item label="分类名称" size="mini">
                    <el-input  size="mini" v-model="addname" placeholder="请输入名称" style="width:200px;" :maxlength="5"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addfenleisunb" size="mini">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="查看示例" :visible.sync="dialogFormVisiblesshili" width="572px">
            <img src="https://cdn0.19mini.com/2019-03-11%2F4caf174072f62418f4a8f686c5377981.jpg" alt="" class="showlisttxt_img">
            <div class="showlisttxt">建议使用腾讯视频下的通用代码，复制到文本框，部分会员视频可能无法打开。
                        </div>
            <div slot="footer" center>
                <el-button @click="dialogFormVisiblesshili = false" type="primary" size="mini">我知道啦</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { editlist,addlist,delgetmaterialllist,delgetmateriallfenleilist,getmateriallfenleilist,addfenleisunb } from '@/server/add_materiallist.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { imgFormat } from '@/untils/common.js';
import { quillEditor } from 'vue-quill-editor';
import * as hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/atom-one-light.css'
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image']//去除video即可
]

export default {
    name: 'add_materiallist',
    data() {
        return{
            upLoadUrl:this.url+'supper/attachment/upfile', // 上传图片组件的action绑定路径,
            labelPosition: 'right',
            addnew:{
                title:'',
                cover_image:'',
                virtual_read_volume:'',
                stateVal:null,
                statess:null,
                video_url:'',
                content:'',
                order:'',
            },
            editorOption:{
                placeholder:'请输入信息',
                theme: 'snow',  // 主题
                modules: {
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        },
                        toolbar: toolOptions,
                    },
            },
            dialogFormVisible:false,
            dialogFormVisibles:false,
            dialogFormVisiblesshili:false,
            pageSize: 10,
            page:1,
            title:'新增分类',
            getPage: 1,
            pageCount: 1,
            gridData: [],
            last_page:1,
            id:-1,//既可以判断分类编辑添加，
            ids:-1,//还可以区分是否为新闻的编辑或者添加
            addname:'',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            state:[
                {
                    id:'上架',
                    value:1,
                },
                {
                    id:'下架',
                    value:0,
                }
            ],
            stateVal:'',
            statess:'',
            // cover_image: '',//封面图
            upUrl:'',//理由请求地址
            rules: {
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                stateVal: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                statess: [
                    { required: true, message: '请选择是否上架', trigger: 'change' }
                ],
                cover_image: [
                    { required: true, message: '请上传图片', trigger: 'blur' }
                ],
            }
            
        }
    },
    components: {
        quillEditor
    },
    created() {
        this.upUrl=this.url;
        if(this.$route.query.id){
            this.ids = this.$route.query.id
        }
        if(this.ids !==-1){
            this.getdetail()
        }
        
        
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    mounted(){
        this.getfenlei()
        if (this.$refs.myQuillEditor) {
            
            //myQuillEditor改成自己的
            this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", this.imgHandler);
            //这里初始化，劫持toolbar的image的handler方法，在mounted中处理
        }
    },
    methods: {
        onEditorBlur(quill) {//富文本编辑器需要的代码
        },
        onEditorFocus(quill) {},
        onEditorReady(quill) {},
        imgHandler(state) {
            if (state) {
            //触发input的单击 ，fileBtn换成自己的
                this.$refs.fileBtn.click()
            }
        },
        handleChange(e) {
            let that=this;
            const files = Array.prototype.slice.call(e.target.files);
            if (!files) {
                return;
            }
            let form = new FormData();
            form.append("file", files[0]);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            //使用了axios请求
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }); 
            this.$axios.post(this.upLoadUrl,form,config).then((responseData) => {
                loading.close();
                that.$refs.fileBtn.value = "";
                if (responseData.data.code===0) {
                    let selection = that.$refs.myQuillEditor.quill.getSelection();
                    //腾讯图片处理转化
                    let imgUrl = imgFormat(responseData.data.data.src);       
                    that.$refs.myQuillEditor.quill.insertEmbed(selection != null ? selection.index : 0, 'image', imgUrl)   
                    that.$refs.myQuillEditor.quill.setSelection(selection.index + 1);
                } 
            }).catch(err=>{
                  loading.close();
                that.$message.error('网络错误');
            })
        },
        getdetail(){//数据回填
            let that = this
            let data = {  
                    pro_id: parseInt(localStorage.getItem('proId')),
                    id:this.ids
                }
            editlist(data).then(function (res) {
                // that.pageCount = response.data.total
                if(res.data.code === 200){
                    that.addnew.title = res.data.data.data[0].title                   
                    that.addnew.cover_image = res.data.data.data[0].cover_image
                    that.addnew.virtual_read_volume = res.data.data.data[0].virtual_read_volume
                    that.addnew.stateVal = res.data.data.data[0].category_id
                    that.addnew.statess = res.data.data.data[0].state
                    if(res.data.data.data[0].state == 0){
                        that.statess  = '下架'
                    }else{
                        that.statess  = '上架'
                    }
                    if(res.data.data.data[0].video_type == 1){
                       that.addnew.video_url =  '<iframe src='+res.data.data.data[0].video_url +'frameborder="0" allowFullScreen="true"></iframe>'

                    }else{
                        that.addnew.video_url = res.data.data.data[0].video_url
                    }
                    that.addnew.content = res.data.data.data[0].content
                    that.addnew.order = res.data.data.data[0].order
                    that.stateVal =res.data.data.data[0].category_name
                    that.cover_image = res.data.data.data[0].cover_image
                
                }else{
                    that.$message.error('网络错误');
                }
                
              })
              .catch(function (error) {
                  that.$message.error('网络错误');
              });
        },
        save(formName){//添加数据
            
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let that = this
                    const loading = this.$loading({
                        lock: true,
                        text: '新闻保存中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    if(this.ids === -1){//添加数据
                        let str = this.addnew.video_url;//判断视频是否符合后缀
                        if(str == ''){//判断视频为空
                            str = this.addnew.video_url
                            let data={
                                pro_id: parseInt(localStorage.getItem('proId')),
                                title:this.addnew.title,
                                category_id:this.addnew.stateVal,
                                cover_image:this.addnew.cover_image,
                                virtual_read_volume:this.addnew.virtual_read_volume,
                                video_url:linevideo_url,
                                content:this.addnew.content,
                                state:this.addnew.statess,
                                order:this.addnew.order,
                            }
                            addlist(data).then(function (response) {
                                    // that.pageCount = response.data.total
                                if(response.data.code === 200){
                                    loading.close()
                                    if(that.ids === -1 ){
                                        that.$message({
                                            message: '添加成功！',
                                            type: 'success'
                                        });
                                        that.$router.push({
                                            path: '/wf/admin/shop/materiallist'
                                        })
                                    }else{
                                        that.$message({
                                            message: '修改成功！',
                                            type: 'success'
                                        })
                                        that.$router.push({
                                            path: '/wf/admin/shop/materiallist'
                                        })
                                    }
                                }else{
                                    loading.close()
                                }   
                            })
                            .catch(function (error) {
                                that.$message.error('网络错误');
                                loading.close()
                            });
                        }else{//连接不为空
                            var linevideo_url = ''
                            var ars = str.indexOf("</iframe>") != -1 ;  // true带有标签存在 = true不存在等于false
                            if(ars === true){
                                linevideo_url = str
                                let data={
                                    pro_id: parseInt(localStorage.getItem('proId')),
                                    title:this.addnew.title,
                                    category_id:this.addnew.stateVal,
                                    cover_image:this.addnew.cover_image,
                                    virtual_read_volume:this.addnew.virtual_read_volume,
                                    video_url:linevideo_url,
                                    content:this.addnew.content,
                                    state:this.addnew.statess,
                                    order:this.addnew.order,
                                }
                                addlist(data).then(function (response) {
                                        // that.pageCount = response.data.total
                                    if(response.data.code === 200){
                                        loading.close()
                                        if(that.ids === -1 ){
                                            that.$message({
                                                message: '添加成功！',
                                                type: 'success'
                                            });
                                            that.$router.push({
                                                path: '/wf/admin/shop/materiallist'
                                            })
                                        }else{
                                            that.$message({
                                                message: '修改成功！',
                                                type: 'success'
                                            })
                                            that.$router.push({
                                                path: '/wf/admin/shop/materiallist'
                                            })
                                        }
                                        
                                    }else{
                                        loading.close()
                                    }
                                        
                                })
                                .catch(function (error) {
                                    that.$message.error('网络错误');
                                    loading.close()
                                });
                            }else{
                                let getlast = str.indexOf('.Ogg')
                                let getlasts = str.indexOf('.MPEG4')
                                let getlastA = str.indexOf('.WebM')
                                let getlastm = str.indexOf('.webm')
                                let getlasta = str.indexOf('.ogg')
                                let getlastR = str.indexOf('.mp4')
                                let getlastr = str.indexOf('.MP4')
                                let getlastM = str.indexOf('.mpeg4')
                                if(getlast !== -1 || getlasts !== -1 || getlastA !== -1 || getlasta !== -1 || getlastR !== -1|| getlastr !== -1 || getlastM !== -1 || getlastm !== -1){//存在
                                    linevideo_url = str
                                    let data = {
                                        pro_id: parseInt(localStorage.getItem('proId')),
                                        title:this.addnew.title,
                                        category_id:this.addnew.stateVal,
                                        cover_image:this.addnew.cover_image,
                                        virtual_read_volume:this.addnew.virtual_read_volume,
                                        video_url:linevideo_url,
                                        content:this.addnew.content,
                                        state:this.addnew.statess,
                                        order:this.addnew.order,
                                    } 
                                    addlist(data).then(function (response) {
                                        if(response.data.code === 200){
                                            loading.close()
                                            if(that.ids === -1 ){
                                                that.$message({
                                                    message: '添加成功！',
                                                    type: 'success'
                                                });
                                                that.$router.push({
                                                    path: '/wf/admin/shop/materiallist'
                                                })
                                            }else{
                                                that.$message({
                                                    message: '修改成功！',
                                                    type: 'success'
                                                })
                                                that.$router.push({
                                                    path: '/wf/admin/shop/materiallist'
                                                })
                                            }
                                        }else{
                                            loading.close()
                                            that.$message.error('网络错误');
                                        }
                                        
                                    })
                                    .catch(function (error) {
                                        loading.close()
                                        that.$message.error('网络错误');
                                    });
                                    
                                }else{
                                    that.$message({
                                        message: '请正确添加视频格式！',
                                        type: 'warning'
                                    });
                                    that.addnew.video_url = ''
                                    loading.close()
                                }
                            }
                            
                        }
                    }else{//编辑保存
                        let data = {
                            pro_id: parseInt(localStorage.getItem('proId')),
                            title:this.addnew.title,
                            category_id:this.addnew.stateVal,
                            cover_image:this.addnew.cover_image,
                            virtual_read_volume:this.addnew.virtual_read_volume,
                            video_url:this.addnew.video_url,
                            content:this.addnew.content,
                            state:this.addnew.statess,
                            order:this.addnew.order,
                            id:this.ids
                        }
                        addlist(data).then(function (response) {
                            if(response.data.code === 200){
                                loading.close()
                                that.$message({
                                    message: '编辑成功！',
                                    type: 'success'
                                });
                                that.$router.push({
                                    path: '/wf/admin/shop/materiallist'
                                })
                                // that.$router.go(-1)
                                
                            }else{
                                that.$message.error('网络错误');
                                loading.close()
                            }
                        
                        })
                        .catch(function (error) {
                            loading.close()
                            that.$message.error('网络错误');
                        });
                    }
                } else {
                    return false;
                    loading.close()
                }
            });
        },
        beforeUpload(file) {  //图片进行限制
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }else{
                return true
            }
            let size = file.size/1024/1024;
            this.loading  = true
            if(size>2){
                this.$message.warning("图片不能大于2M")
                this.loading  = false
                
            }else{
                return true
            }
        },
        beforeAvatarUpload(res,file) {
           if(res.code==0){
                this.loading  = false
                this.addnew.cover_image = res.data.src
                this.cover_image = res.data.src
            }else{
                this.$message.error("图片上传失败");
            }
        },
        choosess(statess){//是否上架
        console.log(statess)
            for(let i = 0;i<this.state.length;i++){
                if(this.state[i].id === statess){
                    this.statess = this.state[i].id
                    this.addnew.statess = this.state[i].value
                }
            }
            console.log(this.statess)
        },
        addlist(){//添加分类按钮
            this.addname=''
            this.dialogFormVisibles = true
        },
        edit(e){//编辑分类
            this.id = e.id
            this.addname = e.name
            this.title='编辑分类'
            this.dialogFormVisibles = true
        },
        choose(stateVal){//选择分类
            this.stateVal = stateVal
            this.addnew.stateVal = stateVal
        },
       getfenlei(){//获取分类
            let that = this
            let data ={
                pro_id: parseInt(localStorage.getItem('proId')),
                page:this.page
            }
            getmateriallfenleilist(data) .then(function (response) {
                if(response.data.code === 200){
                    that.gridData = response.data.data.data
                    that.pageCount = response.data.data.total
                    that.last_page = response.data.data.last_page
                }else{
                    that.$message.error('网络错误');
                }
            }).catch(function (error) {
                  that.$message.error('网络错误');
            });
        },
        getPages(e){//分页
            this.page = e
            this.getfenlei()
        },
        deleteGoods(id){//删除分类
            let that = this
            let data={
                pro_id: parseInt(localStorage.getItem('proId')),
                id:id.id
            }
            delgetmateriallfenleilist(data).then(function (response) {
                if(response.data.code === 200){
                    that.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    that.getfenlei()
                }else{
                    that.$message.error('网络错误');
                }
            }).catch(function (error) {
                that.$message.error('网络错误');
            });
        },
        addfenleisunb(){
            if(this.id === -1){//添加分类
                let that = this
                let data={
                    pro_id: parseInt(localStorage.getItem('proId')),
                    name:this.addname
                }
                addfenleisunb(data).then(function (response) {
                    if(response.data.code === 200){
                        that.dialogFormVisibles = false
                        that.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        that.getfenlei()
                        if(response.data.total > 0){
                            that.pageCount = response.data.total
                        }else{
                            that.pageCount=1
                        }
                        that.tableData = response.data.data
                    }else{
                        that.$message({
                            message: response.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(function (error) {
                    that.$message.error('网络错误');
                });
            }else{//编辑分类
                let that =this
                let data={
                    pro_id: parseInt(localStorage.getItem('proId')),
                    name:this.addname,
                    id:this.id
                }
                addfenleisunb(data).then(function (response) {
                    if(response.data.code === 200){
                        that.dialogFormVisibles = false
                        that.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        that.getfenlei()
                        if(response.data.total > 0){
                            that.pageCount = response.data.total
                        }else{
                            that.pageCount=1
                        }
                        that.tableData = response.data.data
                    }else{
                        that.$message({
                            message: response.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(function (error) {
                    that.$message.error('网络错误');
                });
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/styles/components/css_WF_admin/shop_admin/add_materiallist/add_materiallist.scss';
    
       
</style>
