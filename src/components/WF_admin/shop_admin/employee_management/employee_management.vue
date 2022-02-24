<template>
    <div id="employee_management">
        <div class="login_url">请将以下地址发给员工登录： {{headerHttp+child_url}}</div>
        <el-button  v-clipboard:copy="headerHttp+child_url"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制</el-button>
        <el-row class="jianju">
            <el-button size="mini" @click="addEmployee">添加员工</el-button>
            <el-button size="mini" @click="employeeType">员工类型</el-button>
        </el-row>

        <el-table
        :data="employee_tableData"
        style="width: 100%;margin: 20px 0;">
            <el-table-column
            label="编号"
            type="index">
            </el-table-column>
            <el-table-column
            label="类型"
            prop="type_name">
            </el-table-column>
            <el-table-column
            label="姓名"
            prop="staff_name">
            </el-table-column>
            <el-table-column
            label="登录账户"
            prop="staff_number">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="staff_state">
            </el-table-column>
            <el-table-column label="操作"
            width="220">
            <template slot-scope="scope">
                <el-button size="mini"  @click="editEmployee(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteOne(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :title="add_or_edit==true?'编辑员工':'添加员工'"
            :visible.sync="add_employee"
            width="50%">
            <div class="add_employee">
                <div class="clear">
                    <div>姓名</div>
                    <div>
                        <el-input size="mini" placeholder="请输入姓名" clearable v-model="employeeName"></el-input>
                    </div>
                    <div>*姓名不能包含特殊字符且1-20位</div>
                </div>
                <div class="clear">
                    <div>登录账户</div>
                    <div>
                        <el-input size="mini" placeholder="请输入手机号" clearable v-model="employeeTell"></el-input>
                    </div>
                    <div>*必须为手机号</div>
                </div>
                <div class="clear">
                    <div>登录密码</div>
                    <div>
                        <el-input size="mini" placeholder="请输入密码" type="password" clearable v-model="employeePword"></el-input>
                    </div>
                    <div>*不包括特殊字符且6-20位</div>
                </div>
                <div class="clear">
                    <div>权限类型</div>
                    <div>
                        <el-select size="mini" v-model="employeeTypeName" @change="changeType" clearable placeholder="请选择">
                            <el-option
                            v-for="item in addEmployeePower"
                            :key="item.id"
                            :label="item.type_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div>*必选</div>
                    <div>
                        <el-button size="mini"  @click="addType" style="margin-left: 40px;">添加权限</el-button>
                    </div>
                    
                </div>
                <div class="clear">
                    <div>状态</div>
                    <div>
                        <el-select size="mini" v-model="employeeIf" clearable placeholder="请选择">
                            <el-option
                            v-for="item in addEmployeeIf"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="add_employee = false">取 消</el-button>
                <el-button size="mini"  @click="addEmployeeConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加类型弹出框 -->
        <el-dialog
        title="编辑"
        :visible.sync="employeeType_show"
        width="50%">
            <el-button size="mini" @click="addType">添加类型</el-button>
            <el-table
            :data="employeeType_list"
            style="width: 100%;margin: 20px 0;">
                <el-table-column
                label="类型"
                prop="type_name">
                </el-table-column>
                <el-table-column
                label="权限"
                prop="role_name">
                </el-table-column>
                <el-table-column label="操作"
                width="220">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="editRole(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteRole(scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="employeeType_show = false">取 消</el-button>
                <el-button size="mini"  @click="employeeType_show = false">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog
        title="添加类型"
        :visible.sync="add_type"
        width="30%">
            类型
            <el-input v-model="type_name" class="jianju" size="mini" style="width:200px;margin-left:20px;"></el-input>
            <el-row>
                <p class="jianju">权限区域</p>
            </el-row>
            <el-tree :data="permission" :props="defaultProps" show-checkbox :default-checked-keys="default_id" default-expand-all getCurrentKey node-key="id" ref="tree"
  highlight-current></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="add_type=false,employeeType_show=true">取 消</el-button>
                <el-button size="mini"  @click="saveAddType">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {staffCode} from '@/server/employee';
export default {
    name: 'shop_employee_management',
    data() {
        return {
            headerHttp:'',
            userUrl:'',
            employee_tableData: [],
            add_employee: false,
            employeeType_show: false,
            employeeType_list: [],
            add_type: false,
            add_or_edit: true,
            addEmployeePower:[],
            addEmployeeIf:[
                {
                    value: 1,
                    label: '有效'
                },
                {
                    value: 0,
                    label: '无效'
                },
            ],
            employeeName:'',
            employeeTell:'',
            employeePword:'',
            employeePower:'',
            employeeTypeName: '',
            employeeIf:1,
            // 添加类型弹出框数据
            type_name: '',
            permission: [],
            defaultProps: {
                children: 'children',
                label: 'mall_name'
            },
            default_id:[],//默认张开选项
            role_id:-1,
            child_url:''
        }
    },
    created(){
        /**
         * 处理OEM协议头
         */
        let that = this
        if(this.locUrl===this.url){
            this.headerHttp='https://'
        }else{
            this.headerHttp='http://'
        }
        this.employeeList();
        let data = { 
            token:localStorage.getItem("userId"),
            pro_id: localStorage.getItem("proId")
        }
        staffCode(data).then((res)=>{
            if(res.data.code===200){
                 that.child_url=window.location.host+'/wf/admin/shop/shop_login?pro_token='+res.data.data.invite_code;
            }else{
                that.$message.error(res.data.msg+"600A0018");
            }
        }).catch((err)=>{
            that.$message.error('系统出错，请联系管理员！600B0017');
        })
        this.$axios.post(this.url+'shopapi/staff/staffType',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            ).then(function (res) {
                if(res.data.code==200){
                    that.addEmployeePower = res.data.data
                }else{
                    that.$message.error('查询失败');
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误，请重新添加');
            });
    },
    methods:{
        changeType(e){
            this.employeePower = e
        },
        employeeList(){
            var that=this;
            this.$axios.post(this.url+'shopapi/staff/staffIndex',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId'))
            .then(function (res) {
                if(res.data.code==200){
                    that.employee_tableData=res.data.data
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误，请重新添加');
            });
        },
        addEmployee(){
            let that=this;
            this.employeeName = '';
            this.employeePword = '';
            this.employeeTell = '';
            this.employeePower = '';
            this.employeeTypeName = ''
            this.employeeIf =1;
            this.add_employee=true;
            this.add_or_edit = false
            this.$axios.post(this.url+'shopapi/staff/staffType',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            ).then(function (res) {
                if(res.data.code==200){
                    that.addEmployeePower = res.data.data
                }else{
                    that.$message.error('查询失败');
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误，请重新添加');
            });
        },
        employeeType(){
            let that = this
            this.$axios.post(this.url+'shopapi/auth_Role/roleIndex',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            ).then(function (res) {
                if(res.data.code==200){
                    that.employeeType_list = res.data.data
                    that.employeeType_show = true
                }else{
                    that.$message.error('查询失败');
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误，请重新添加');
            });
            
        },
        addEmployeeConfirm(){
            var that=this;
            if(this.employeeIf=='无效'){
                this.employeeIf = 0
            }else if(this.employeeIf=='有效'){
                this.employeeIf = 1
            }
            if(!(/^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/.test(this.employeeName))){
                this.$message.error('姓名格式错误，请重写');
            }else if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.employeeTell))){
                this.$message.error('登录账户手机号格式错误，请重写');
            }else if(this.employeePword==''||this.employeePword==undefined||this.employeePword==null){
                this.$message.error('请填写密码');
            }else if(!(/^[A-Za-z0-9]{6,20}$/.test(this.employeePword))){
                this.$message.error('密码格式错误，请重写');
            }else{
                if(this.add_or_edit==false){
                    let urls='&staff_name='+this.employeeName+
                    '&staff_number='+this.employeeTell+
                    '&staff_password='+this.employeePword+
                    '&staff_type='+this.employeePower+
                    '&staff_state='+this.employeeIf
                    this.$axios.post(this.url+'shopapi/staff/staffAdd',
                    'token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId')+urls).then(function (res) {
                        
                        if(res.data.code==200){
                            that.employeeList()
                            that.add_employee=false;
                            that.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                        }else if(res.data.code==0){
                           
                            that.$message.error('手机号已存在，请重写');
                        }
                    })
                    .catch(function (error) {
                        that.$message.error('网络错误，请重新添加');
                    });
                }else{
                    let urls='&id='+this.editId+
                    '&staff_name='+this.employeeName+
                    '&staff_number='+this.employeeTell+
                    '&staff_password='+this.employeePword+
                    '&staff_type='+this.employeePower+
                    '&staff_state='+this.employeeIf
                    this.$axios.post(this.url+'shopapi/staff/staffEdit',
                    'token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId')+
                    urls).then(function (res) {
                        if(res.data.code==200){
                            that.employeeList()
                            that.add_employee=false;
                            that.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                        }else{
                            
                            that.$message.error('修改失败');
                        }
                    })
                    .catch(function (error) {
                        that.$message.error('网络错误，请重新添加');
                    });
                }
            }
        },
        editEmployee(e){
            console.log(e)
            this.editId = e.id
            this.employeeName = e.staff_name;
            this.employeePword = e.staff_password;
            this.employeeTell = e.staff_number;
            this.employeePower = e.staff_type;
            this.employeeIf = e.staff_state;
            this.employeeTypeName = e.type_name
            this.add_employee = true;
            this.add_or_edit = true
        },
        deleteOne(e){ // 删除员工
            var that=this;
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$axios.post(
                    that.url+'shopapi/staff/staffDel','id='+e  
                )
                .then(function (res) {
                    if(res.data.code==200){
                        that.employeeList();
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        that.$message({
                            type: 'info',
                            message: '删除失败'
                        });
                    }
                })
                .catch(function (error) {
                });
            }).catch(() => {
                that.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        },
        handleNodeClick(e) {
            
            this.propId = e;
        },
        addType(){ // 添加类型
            let that = this
            that.role_id=-1;
            this.default_id=[];
            this.add_employee=false;
            this.$axios.post(this.url+'shopapi/auth_Role/allRole',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            ).then(function (res) {
                if(res.data.code==200){
                    that.employeeType_show = false
                    that.add_type = true
                    that.type_name = ''
                    that.permission = res.data.data
                }else{
                    
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误，请重新添加');
            });
        },
        saveAddType(){
            let that = this
            
            if(this.role_id==-1){
                var roleUrl='token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')+
            '&type_name='+that.type_name+
            '&type_role='+this.$refs.tree.getCheckedKeys().join(',')
            var roleUrls =this.url+'shopapi/auth_Role/roleAdd';
            }else{
                var roleUrl='token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')+
            '&type_name='+that.type_name+
            '&type_role='+this.$refs.tree.getCheckedKeys().join(',')+'&id='+this.role_id;
            var roleUrls=this.url+'shopapi/auth_Role/roleEdit';
            }
           
            this.$axios.post(roleUrls,roleUrl
            ).then(function (res) {
                if(res.data.code==200){
                    that.employeeType()
                    that.role_id=-1;
                    that.default_id=[];
                    that.add_type=false;
                    that.employeeType_show=true
                    that.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                }else{
                    
                    that.$message.error(res.data.msg);
                    that.role_id=-1;
                    this.default_id=[];
                }
            })
            
        },
        editRole(e){ //编辑权限
            

            let that=this;
            // this.employeeType_show = false
            this.add_type=true;
            
            this.$axios.post(this.url+'shopapi/auth_Role/allRole',
            'token='+localStorage.getItem('userId')+
            '&secret='+localStorage.getItem('secretId')
            ).then(function (res) {
                if(res.data.code==200){
                    that.employeeType_show = false
                    that.add_type = true
                    that.type_name =e.type_name;
                    that.default_id=e.type_role.split(',')
                    that.permission = res.data.data
                    that.role_id=e.id;
                }else{
                    
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                that.$message.error('网络错误，请重新添加');
            });
        },
        deleteRole(e){//删除权限
            var that=this;
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$axios.post(
                    that.url+'shopapi/auth_Role/roleDel',
                'token='+localStorage.getItem('userId')+
                '&secret='+localStorage.getItem('secretId')+'&id='+e.id 
                )
                .then(function (res) {
                    if(res.data.code==200){
                         that.employeeType();
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        that.$message({
                            type: 'error',
                            message:res.data.msg
                        });
                    }
                })
                .catch(function (error) {
                });
            }).catch(() => {
                that.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        },
        onCopy(){
            this.$message.success("复制成功")
        },
        onError(){
            this.$message.error("复制失败")
        }
    }
}
</script>

<style lang="scss">
#employee_management{
    background-color: #fff;
    padding: 20px;
    .login_url{
        margin-right: 20px;
        height:40px;
        line-height:40px;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        padding:0 20px;
    }
    .jianju{
        margin: 20px 0;
    }
    .add_employee .clear{
        margin-bottom:20px;
    }
    .add_employee .clear>div:first-child{
        height:40px;
        line-height:40px;
        width:80px;
    }
    .add_employee .clear>div:nth-child(3){
        height:40px;
        line-height:40px;
        // width:80px;
        margin-left:20px;
         color:#ff7477;
    }
}
</style>
