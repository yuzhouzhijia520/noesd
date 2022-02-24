<template>
    <div class="wf_index_login">
        <indexHearder></indexHearder>
        <el-tabs v-model="activeName" class="wf-login" @tab-click="handleClick">
            <el-tab-pane label="用户登录" name="first">
                <div class="form wf-login-pane">
                    <div class="clear">
                        <div>手机号</div>
                        <el-select v-model="value" placeholder="请选择" class="select-list">
                            <el-option
                            v-for="item in options"
                            :key="item.res"
                            :label="item.res"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <div>
                            <input type="text" placeholder="请输入手机号码" @blur="phoneBlur" v-model.number="userPhone" style="width:200px;margin-left:0;">
                        </div>
                        <div class="img" v-show="phoneShow">
                            <img src="../../assets/index_img/error.png" alt="">
                            <span>手机号或密码错误，请正确输入</span>
                        </div>
                        <div class="img" v-show="phoneNull">
                            <img src="../../assets/index_img/error.png" alt="">
                            <span>手机号或密码未填写</span>
                        </div>
                    </div>
                    <div class="clear">
                        <div>密 &nbsp; 码</div>
                        <div>
                            <input type="password"  v-if="this.$store.state.oemFlag" placeholder="请输入您的密码" v-model="userPassword" @blur="passBlur"  @keyup.enter="login(3)">
                            <input type="password" v-else placeholder="请输入您的密码" v-model="userPassword" @blur="passBlur"  @keyup.enter="login(0)">
                        </div>
                        <div class="img" v-show="passShow">
                        </div>
                    </div>
                    <div class="login" @click="login(3)" v-if="this.$store.state.oemFlag">登录</div>
                    <div class="login" @click="login(0)" v-else>登录</div>
                    <div class="clear">
                        <div class="lose"  @click="register(0)"><span style="color:#667790">未有账户？</span>立即注册</div>
                        <div class="register" @click="reset">忘记密码？</div>
                    </div>   
                </div>
            </el-tab-pane>
            <el-tab-pane label="OEM登录" name="second" v-if="this.$store.state.oemFlag">
                 <div class="form wf-login-pane">
                    <div class="clear">
                        <div>手机号</div>
                        <div>
                            <input type="Number" placeholder="请输入手机号码" @blur="phoneBlur" v-model.number="userPhone">
                        </div>
                        <div class="img" v-show="phoneShow">
                            <img src="../../assets/index_img/error.png" alt="">
                            <span>手机号或密码错误，请正确输入</span>
                        </div>
                        <div class="img" v-show="phoneNull">
                            <img src="../../assets/index_img/error.png" alt="">
                            <span>手机号或密码未填写</span>
                        </div>
                        <div class="img" v-show="phoneAgent">
                            <img src="../../assets/index_img/error.png" alt="">
                            <span>{{msgAgent}}</span>
                        </div>
                    </div>
                    <div class="clear">
                        <div>密  &nbsp; 码 </div>
                        <div>
                            <input type="password" placeholder="请输入您的密码" v-model="userPassword" @blur="passBlur" @keyup.enter="login(2)"> 
                        </div>
                        <div class="img" v-show="passShow">
                        </div>
                    </div>
                    <div class="login" @click="login(2)">登录</div>
                    <div class="clear">
                        <div class="register" @click="reset">忘记密码？</div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="代理登录" name="second" v-else>
                 <div class="form wf-login-pane">
                    <div class="clear">
                        <div>手机号</div>
                        <div>
                            <input type="text" placeholder="请输入手机号码" @blur="phoneBlur" v-model.number="userPhone">
                        </div>
                        <div class="img" v-show="phoneShow">
                            <img src="../../assets/index_img/error.png" alt="">
                            <span>手机号或密码错误，请正确输入</span>
                        </div>
                        <div class="img" v-show="phoneNull">
                            <img src="../../assets/index_img/error.png" alt="">
                            <span>手机号或密码未填写</span>
                        </div>
                        <div class="img" v-show="phoneAgent">
                            <img src="../../assets/index_img/error.png" alt="">
                            <span>{{msgAgent}}</span>
                        </div>
                    </div>
                    <div class="clear">
                        <div>密  &nbsp; 码 </div>
                        <div>
                            <input type="password" placeholder="请输入您的密码" v-model="userPassword" @blur="passBlur" @keyup.enter="login(1)"> 
                        </div>
                        <div class="img" v-show="passShow">
                        </div>
                    </div>
                    <div class="login" @click="login(1)" >登录</div>
                    <div class="clear">
                        <div class="lose"  @click="register(1)"><span style="color:#667790">未有账户？</span>立即申请</div>
                        <div class="register" @click="reset">忘记密码？</div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-footer v-if="this.$store.state.oemFlag"> <hr> {{this.$store.state.serverList.data.copyright}}</el-footer>
        <el-footer v-else> <hr>&copy;2016 — 2019 版权所有 万帆集团旗下,拾久商城 杭州万帆集团 浙ICP备16031604号-4</el-footer>
    </div>
    
</template>

<script>
import indexHearder from './index_components/icon_header';
import indexFooter from './index_components/footer';
import axios from "axios";
export default {
    name: 'index',
    components:{
        indexHearder,
        indexFooter
      },
    data () {
        return {
            userPhone:'',
            userPassword:'',
            phoneShow:false,
            passShow:false,
            phoneNull: false,
            activeName: 'first',
            phoneAgent:false,
            msgAgent:'',
            options: [],
            value: '+86中国',
        }
    },
    created(){
        
    },
    mounted(){
        this.initPage();
        this.getcounrlist()
    },
    methods: {
        
        getcounrlist(){
            axios.post(this.url+'shopsmall/Verification/areaCode').then(res=> {
                if(res.data.code===200){
                    this.options = res.data.data
                
                }else{
                    //系统异常
                    that.$message.error(res.data.msg);
                }
            })
    
        },
        initPage(){
            let activeName=localStorage.getItem('activeName');
            if(this.$route.query.name){
                //优先地址栏
                activeName=this.$route.query.name;
            }
            if(activeName){
                this.activeName=activeName;
            }
        },
        login(is_agent){
            let that=this;
            if(this.userPhone&&this.userPassword){
                    let data={};
                    let  phone=this.userPhone
                    let phone_type = 0
                    for(var i = 0;i<this.options.length;i++){
                        if(this.value == 1){
                            phone=this.userPhone
                        }else{
                            if(this.options[i].id == this.value){
                            phone=String(this.options[i].code) +  this.userPhone
                        }
                        }
                    }
                    if(is_agent===3){
                        data={
                            phone:phone,
                            password:this.userPassword,
                            is_agent:0,
                            domain:this.$store.state.domain
                        };
                    }else if(is_agent===2){
                        data={
                           phone:phone,
                            password:this.userPassword,
                            is_agent:2,
                            domain:this.$store.state.domain
                        };
                    }else{
                        data={
                            phone:phone,
                            password:this.userPassword,
                            is_agent:is_agent
                        };
                    }
                    axios.post(this.url+'user/platform_user/login',data).then(res=> {
                        if(res.data.code===200){
                            if(is_agent===0||is_agent===3){
                                localStorage.setItem('activeName','first');
                                if(localStorage.getItem('userId')){
                                    localStorage.removeItem('is_agent');
                                    localStorage.removeItem('agentId');
                                    localStorage.removeItem('agentPhone');
                                    localStorage.removeItem('userId');
                                    localStorage.removeItem('userPhone');
                                }
                                localStorage.setItem('userId',res.data.data.token);
                                localStorage.setItem('userPhone',res.data.data.phone);
                                that.$router.push({path:'/wf/user/management',name:'user_management'})
                            }else if(is_agent===1||is_agent===2){
                                that.$message({
                                    type: 'success',
                                    message: '登录成功！'
                                });
                                localStorage.setItem('is_agent',res.data.data.is_agent);
                                localStorage.setItem('agentId',res.data.data.token);
                                localStorage.setItem('agentPhone',res.data.data.phone);
                                localStorage.removeItem('userId');
                                localStorage.removeItem('userPhone');
                                if(is_agent===2){
                                    that.$store.dispatch('loadData');
                                }
                                that.$router.push({path:'/wf/user/bkmanagement'})
                            }else{
                                //系统异常
                                that.$message.error(res.data.msg+'600A0005');
                            }
                        
                        }else{
                            //系统异常
                            that.$message.error(res.data.msg+'600A0004');
                        }
                    })
                    .catch(function (error) {
                        //接口调用异常
                        that.$message({
                                type: 'error',
                                message:'网络错误!600B0003'
                            });
                    });
            }else{
                this.phoneNull=true;
                this.phoneShow=false;
            }
            
        },
        phoneBlur(){
            this.yzError=false;
            if(this.userPhone==''){
                this.phoneNull=true;
                this.phoneShow=false;
            }else{
                if(typeof(this.userPhone) == "number"){
                    this.phoneShow=false;
                    this.phoneNull=false;
                } else{
                    this.phoneShow=true;
                    this.phoneNull=false;
                }
            }
        },
        passBlur(){
            if(this.userPassword==''){
                this.phoneNull=true;
                this.phoneShow=false;
            }else{

            }
        },
        register(id){
            if(id===0){
                //设置跳转普通用户登录页面
                localStorage.setItem('activeNameReg','first');
            }else if(id===1){
                //设置跳转代理商登录页面
                localStorage.setItem('activeNameReg','second');
            }
             this.$router.push({path:'/wf/index/register',name:'register'})
            
        },
        index(){
            // this.$router.push({path:'/',name:'index'})
        },
        reset(){
            this.$router.push({path:'/wf/index/resetsuccessful',name:'reset_successful'})
        },
        handleClick(tab, event){
            this.activeName=tab.name;
            localStorage.setItem('activeName',tab.name);
        }
    }
}
</script>

<style lang="scss" >

.wf_index_login{
    background: #fff;;
    background-size: 100% 100%;
    padding-top:75px;
    height: 100%;
    .select-list{
        width: 120px;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
        border-bottom: none;
        border-right: 1px solid #eee;
        /deep/.el-input__inner{
           width: 110px!important;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;border-bottom: none;
        }
    }
    .el-tabs__nav-wrap.is-top{
        margin: 0 auto;
        max-width: 155px!important;

        .el-tabs__nav.is-top{
            font-size: 20px;
        }
    }
    .el-footer{
        height: 20px !important;
        text-align: center;
        color: #a5a5a5;
        position: absolute;
        width: 100%;
        bottom: 0;
        hr{
            border: 1px solid #ececec;
        }
    }
}
// 中间
.wf_index_login .form{
    width: 830px;
    margin: 0 auto;
    border-top: 2px solid #0878F9;
    padding-top: 80px;
    padding-bottom: 50px;
    box-shadow:0 6px 20px 0px rgba(40, 120, 255, 0.1), 0 2px 3px -1px rgba(0, 0, 0, 0.03);
    margin-bottom: 70px;
    transition: box-shadow 0.3s ease-in-out, -webkit-box-shadow 0.3s ease-in-out;
    border-radius: 10px;
    &:hover{
        box-shadow:  0 0 0 0 rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
    }
}
.wf_index_login .form .clear>div:first-child{
    margin-left:235px;
    height: 36px;
    line-height: 36px;
    font-weight:400;
    font-size: 14px;
    color: #738299;
}
.wf_index_login .form .clear input{
    height: 36px;
    line-height: 36px;
    border: 0;
    border-radius: 0;
    outline: 0;
    padding: 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    padding-left: 10px;
    margin-left: 16px;
    width: 300px;
}
.wf_index_login .form .clear{
    margin-bottom:45px;
}
.wf_index_login .form .clear .img{
    height:36px;
    padding-left: 15px;
}
.wf_index_login .form .clear img{
    width:16px;
    height:16px;
    display:inline-block;
    margin-top:-5px;
}
.wf_index_login .form .clear .img span{
    margin-top:10px;
    height:16px;
    line-height:16px;
    font-size:12px;
    color:#fa5b5b;
    display:inline-block;
    position: relative;
    top: -3px;
}
.wf_index_login .lose{
    font-size: 16px!important;
    color: #0075ff!important;
    text-align:right;
    cursor:pointer;
}
.wf_index_login .login{
    width:250px;
    height: 50px;
    line-height: 50px;
    background-color: #0075ff;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    outline: 0;
    border: 0;
    cursor: pointer;
    margin: 30px auto;
    margin-bottom: 20px;
    
}
.copy_box{
        width: 100%;
        background: #232323;
        margin-top: 10px;
        color: #fff;
        text-align: center;
    }
.wf_index_login .login:hover{
    background:#2288fe;
}
.wf_index_login .register{
    color: #0075ff;
    height: 17px;
    text-decoration: none;
    margin: 0 auto;
    text-align:right;
    cursor:pointer;
    margin-left: 230px;
    margin-top: 6px;
}
.wf_index_login .register:hover,
.wf_index_login .lose:hover{
    color: #56a4ff!important;
}

    .el-tabs__item{
        padding: 0 18px;
    }
    .el-tabs__item:hover{
        color: #409EFF;
    }
    .el-tabs__item.is-active{
        color: #409EFF;
    }
    .el-tabs__nav{
        width: 100%;
        .el-tabs__active-bar.is-top{
        width: 58px;

    }
    }
    .el-tabs__active-bar{
        // left:1px;
    }
    .wf_index_login .el-footer{
        position: static;

    }
    .wf-login{
    min-height:761px;
    .wf-login-pane{
        background: #fff;
    }
    
}
    </style>
