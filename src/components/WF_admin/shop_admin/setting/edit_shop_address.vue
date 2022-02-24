<template>
    <div class="wf-editShopAddress">
        <el-form
        label-position="right"
        :model="editShopAddress"
        :rules="shopAddressRules"
        ref="editShopAddress"
        label-width="110px">
            <el-form-item label="联系人" prop="contacts">
                <el-input class="wf-input-width" size="mini" :maxlength="15" v-model="editShopAddress.contacts">
                    <span slot="suffix">{{editShopAddress.contacts.length}}/15</span>
                </el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input-number class="wf-input-width" size="mini" :controls="false" :precision="0" :min="0" v-model="editShopAddress.phone"></el-input-number>
            </el-form-item>
            <el-form-item label="省市区" prop="addressOptions">
                <el-cascader
                class="wf-input-width"
                size="mini"
                :options="options"
                v-model="editShopAddress.addressOptions">
                </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input class="wf-address-width" :maxlength="50" size="mini" v-model="editShopAddress.address">
                    <span slot="suffix">{{editShopAddress.address.length}}/50</span>
                </el-input>
            </el-form-item>
            <el-form-item label="默认地址" prop="status">
                <el-checkbox-group v-model="editShopAddress.status" @change="checkChange">
                    <el-checkbox :label="1">退货地址</el-checkbox>
                    <el-checkbox :label="2">发货地址</el-checkbox>
                </el-checkbox-group>
                <code v-show="switchShow">
                    <el-switch
                    v-model="addressSwitch"
                    active-color="#719FF8">
                    </el-switch>
                    设为默认退货地址
                </code>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" @click="back">返回</el-button>
                <el-button type="primary" size="mini" @click="save('editShopAddress')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { regionData,CodeToText,TextToCode } from 'element-china-area-data'
import { shopAddressAdd, shopAddressShow, shopAddressEdit } from "@/server/shopAddress.js"
export default {
    name: "editShopAddress",
    data() {
        const phoneValid = (rule, value, callback) => {
            if(value===undefined){
                callback(new Error("请填写手机号"))
            }else if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)){
                callback(new Error("请填写正确的手机号"))
            }else{
                callback()
            }
        };
        return {
            addressSwitch: false,
            options: regionData,
            switchShow: false,
            editShopAddress: {
                pro_id: parseInt(localStorage.getItem("proId")),
                contacts: "",
                phone: undefined,
                address: "",
                addressOptions: [],
                status: [],
            },
            shopAddressRules: {
                contacts: [
                    { required: true, message: '请填写联系人', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: phoneValid, trigger: 'blur' }
                ],
                addressOptions: [
                    { required: true, message: '请选择省市区', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请填写详细地址', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择默认地址', trigger: 'change' }
                ]
            }
        }
    },
    mounted(){
        if(this.$route.query.type==2){
            let that = this
            let data = {
                id: this.$route.query.id,
                pro_id: parseInt(localStorage.getItem("proId"))
            }
            shopAddressShow(data).then((res)=>{
                if(res.data.code===200){
                    that.editShopAddress.contacts = res.data.data.contacts
                    that.editShopAddress.phone = res.data.data.phone
                    let addressOptions = []
                    if(res.data.data.code.length===1){
                        addressOptions = [TextToCode[res.data.data.code[0]].code]
                    }else if(res.data.data.code.length===2){
                        addressOptions = [
                            TextToCode[res.data.data.code[0]].code,
                            TextToCode[res.data.data.code[0]][res.data.data.code[1]].code
                        ]
                    }else if(res.data.data.code.length===3){
                        addressOptions = [
                            TextToCode[res.data.data.code[0]].code,
                            TextToCode[res.data.data.code[0]][res.data.data.code[1]].code,
                            TextToCode[res.data.data.code[0]][res.data.data.code[1]][res.data.data.code[2]].code
                        ]
                    }
                    that.editShopAddress.addressOptions = addressOptions
                    that.editShopAddress.address = res.data.data.address
                    if(res.data.data.status===1){
                        that.editShopAddress.status = [1]
                    }else if(res.data.data.status===2){
                        that.editShopAddress.status = [2]
                    }else if(res.data.data.status===3){
                        that.editShopAddress.status = [1,2]
                    }
                    that.switchShow = that.editShopAddress.status.some((item)=>{
                        return item===1
                    })
                    if(res.data.data.state===0){
                        that.addressSwitch = false
                    }else{
                        that.addressSwitch = true
                    }
                }else{
                    that.$message.error(res.data.msg+"600A0043");
                }
            }).catch((err)=>{
                that.$message.error('网络错误600B0044');
            })
        }
    },
    methods: {
        checkChange(val){
            this.switchShow = val.some((item)=>{
                return item===1
            })
        },
        back(){
            this.$router.push({path: "/wf/admin/shop/shopAddress"})
        },
        save(ruleForm){
            let that = this
            this.$refs[ruleForm].validate((valid) => {
                if(valid){
                    let data = JSON.parse(JSON.stringify(this.editShopAddress))
                    data.code = data.addressOptions.map((item)=>{
                        return CodeToText[item]
                    }).join(",")
                    delete data.addressOptions
                    if(this.addressSwitch===false){
                        data.state = 0
                    }else{
                        data.state = 1
                    }
                    if(data.status.length===1){
                        if(data.status[0]===1){
                            data.status = 1
                        }else if(data.status[0]===2){
                            data.status = 2
                        }
                    }else if(data.status.length===2){
                        data.status = 3
                    }
                    data.token = localStorage.getItem("userId")
                    data.address.replace(/\n|\r\n/g,"")
                    if(this.$route.query.type==2){
                        data.id = this.$route.query.id
                        shopAddressEdit(data).then((res)=>{
                            if(res.data.code===200){
                                that.$message.success("保存成功")
                                that.$router.push({path:"/wf/admin/shop/shopAddress"})
                            }else{
                                that.$message.error(res.data.msg+"600A0039");
                            }
                        }).catch((err)=>{
                            that.$message.error('网络错误600B0040');
                        })
                    }else{
                        shopAddressAdd(data).then((res)=>{
                            if(res.data.code===200){
                                that.$message.success("保存成功")
                                that.$router.push({path:"/wf/admin/shop/shopAddress"})
                            }else{
                                that.$message.error(res.data.msg+"600A0032");
                            }
                        }).catch((err)=>{
                            that.$message.error('网络错误600B0033');
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-editShopAddress{
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    .wf-input-width{
        width: 200px;
    }
    .wf-address-width{
        width: 700px;
    }
    .el-switch{
        margin-right: 10px;
    }
    /deep/ .el-input-number .el-input__inner{
        text-align: left;
    }
}
</style>