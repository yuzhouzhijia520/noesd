<template>
    <div class="wf-add_self_point">
        <el-form label-position="right"
        :model="placeData"
        :rules="rules"
        ref="placeData"
        label-width="100px"
        class="demo-ruleForm">
            <el-form-item label="自提点名称" prop="name">
                <el-input style="width:360px;" placeholder="请填写自提点名称便于买家理解" v-model="placeData.name" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="自提点地址" prop="address">
                <el-cascader
                size="mini"
                :options="options"
                v-model="addressOptions">
                </el-cascader>
                <div style="margin-top:20px;">
                    <el-input v-model="placeData.address" id="address" size="mini" style="width:340px;margin-right:23px;" placeholder="请填写自提点的具体地址，最少2个字"></el-input>
                    <el-button @click="codeAddress" size="mini" type="primary">搜索地图</el-button>
                </div>
            </el-form-item>
            <el-form-item label="地图定位" prop="Tmap">
                <div id="container" style="width:500px;height:300px"></div>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="placeData.phone" style="width:440px;" size="mini" placeholder="请填写联系电话"></el-input>
                <div class="wf-gray-tit">请填写准确的联系电话，便于买家联系。固定电话需加区号：区号、分机号均用"-"连接</div>
            </el-form-item>
            <el-form-item label="自提时间" prop="time">
                <div class="wf-time-bg">
                    <el-time-picker
                        v-model="start_time"
                        size="mini"
                        value-format="HH:mm"
                        format="HH:mm"
                        placeholder="开始时间">
                    </el-time-picker>
                    至
                    <el-time-picker
                        v-model="end_time"
                        size="mini"
                        value-format="HH:mm"
                        format="HH:mm"
                        placeholder="结束时间">
                    </el-time-picker>
                </div>
            </el-form-item>
            <el-form-item label="预约自提" prop="">
                <div class="wf-gray-tit">天数为自然天，如：提前1天，买家只能预约第二天自提</div>
                <el-radio-group v-model="placeData.bespeak_type" @change="handleRadio">
                    <div><el-radio :label="0">无需预约</el-radio></div>
                    <div>
                        <el-radio :label="1">提前</el-radio>
                        <el-select v-model="day" size="mini" :disabled="day_disabled">
                            <el-option
                            v-for="item in day_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-radio :label="2">提前</el-radio>
                        <el-select v-model="hour" size="mini" :disabled="hour_disabled">
                            <el-option
                            v-for="item in hour_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="wf-upload" label="自提点照片" prop="picture">
                <el-upload
                class="avatar-uploader"
                :action="upfileUrl"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload">
                    <img v-if="placeData.picture" :src="placeData.picture" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="save('placeData')">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { TMap } from "@/untils/common.js";
import { regionData,CodeToText,TextToCode } from 'element-china-area-data'
export default {
    name: "add_self_point",
    data() {
        let validAddress=(rule, value, callback) => {
            if(this.placeData.address) {
                callback();
            }else{
                callback(new Error('自提点地址不能为空'));
            }
        };
        let validTmap=(rule, value, callback) => {
            if(this.placeData.longitude&&this.placeData.latitude) {
                callback();
            }else{
                callback(new Error('请搜索地图定位'));
            }
        };
        let validPhone=(rule, value, callback) => {
            if(value!=""){
                callback();
            }else{
                callback(new Error('请填写手机号'));
            }
        };
        let validTime=(rule, value, callback) => {
            if(this.start_time!==""&&this.start_time!==null&&this.end_time!==""&&this.end_time!==null){
                callback();
            }else{
                callback(new Error('请选择自提时间'));
            }
        };
        return {
            options: regionData,
            addressOptions: [],
            day_disabled: true,
            hour_disabled: true,
            day: 1,
            // time: "", // 自提时间
            start_time: "",
            end_time: "",
            day_options: [
                { value: 1, label: "1天" },{ value: 2, label: "2天" },{ value: 3, label: "3天" },{ value: 4, label: "4天" },
                { value: 5, label: "5天" },{ value: 6, label: "6天" },{ value: 7, label: "7天" },{ value: 8, label: "8天" },
                { value: 9, label: "9天" },{ value: 10, label: "10天" },{ value: 11, label: "11天" },{ value: 12, label: "12天" },
                { value: 13, label: "13天" },{ value: 14, label: "14天" },{ value: 15, label: "15天" },{ value: 16, label: "16天" },
                { value: 17, label: "17天" },{ value: 18, label: "18天" },{ value: 19, label: "19天" },{ value: 20, label: "20天" },
                { value: 21, label: "21天" },{ value: 22, label: "22天" },{ value: 23, label: "23天" },{ value: 24, label: "24天" },
                { value: 25, label: "25天" },{ value: 26, label: "26天" },{ value: 27, label: "27天" },{ value: 28, label: "28天" },
                { value: 29, label: "29天" },{ value: 30, label: "30天" },{ value: 31, label: "31天" }
            ],
            hour: 24,
            hour_options: [
                { value: 1, label: "1小时" },{ value: 2, label: "2小时" },{ value: 3, label: "3小时" },{ value: 4, label: "4小时" },
                { value: 5, label: "5小时" },{ value: 6, label: "6小时" },{ value: 7, label: "7小时" },{ value: 8, label: "8小时" },
                { value: 9, label: "9小时" },{ value: 10, label: "10小时" },{ value: 11, label: "11小时" },{ value: 12, label: "12小时" },
                { value: 13, label: "13小时" },{ value: 14, label: "14小时" },{ value: 15, label: "15小时" },{ value: 16, label: "16小时" },
                { value: 17, label: "17小时" },{ value: 18, label: "18小时" },{ value: 19, label: "19小时" },{ value: 20, label: "20小时" },
                { value: 21, label: "21小时" },{ value: 22, label: "22小时" },{ value: 23, label: "23小时" },{ value: 24, label: "24小时" },
                { value: 25, label: "25小时" },{ value: 26, label: "26小时" },{ value: 27, label: "27小时" },{ value: 28, label: "28小时" },
                { value: 29, label: "29小时" },{ value: 30, label: "30小时" },{ value: 31, label: "31小时" },{ value: 32, label: "32小时" },
                { value: 33, label: "33小时" },{ value: 34, label: "34小时" },{ value: 35, label: "35小时" },{ value: 36, label: "36小时" },
                { value: 37, label: "37小时" },{ value: 38, label: "38小时" },{ value: 39, label: "39小时" },{ value: 40, label: "40小时" },
                { value: 41, label: "41小时" },{ value: 42, label: "42小时" },{ value: 43, label: "43小时" },{ value: 44, label: "44小时" },
                { value: 45, label: "45小时" },{ value: 46, label: "46小时" },{ value: 47, label: "47小时" },{ value: 48, label: "48小时" },
            ],
            upfileUrl: this.url+'supper/attachment/upfile?token='+localStorage.getItem('userId'), // 上传图片接口地址
            placeData: {
                secret: localStorage.getItem('secretId'),
                name: "",
                picture: "",
                phone: "", // 手机号
                bespeak_type: 0,
                longitude: "", // 经度
                latitude: "", // 纬度
                address: "",
            },
            rules: {
                name: [
                    { required: true, message: "自提点名称不能为空", trigger: 'blur' }
                ],
                address: [
                    { required: true, validator: validAddress, trigger: 'change' }
                ],
                Tmap: [
                    { required: true, validator: validTmap, trigger: 'blur' }
                ],
                phone: [
                     { required: true, validator: validPhone, trigger: 'blur' }
                ],
                picture: [
                    { required: true, message: "自提点照片不能为空", trigger: 'blur' }
                ],
                time:[
                    { required: true, validator: validTime, trigger: 'change' }
                ],
            }
        }
    },
    mounted() {
        this.initTmap()
        if(this.$route.query.id!=-1){
            this.editData(this.$route.query.id)
        }
    },
    methods: {
        initTmap(){
            TMap('E2UBZ-ORCK5-7K6IG-Q3UVL-WZF7O-O5FO5').then(qq => {
                let map = new qq.maps.Map(document.getElementById("container"), {
                    // 地图的中心地理坐标。
                    center: new qq.maps.LatLng(39.916527, 116.397128),
                    zoom: 8
                });
                let marker = new qq.maps.Marker({
                    map: map,
                    position: new qq.maps.LatLng(39.916527, 116.397128)
                })
            })
        },
        codeAddress(){
            //地址和经纬度之间进行转换服务
            let that = this
            let addressOptions = CodeToText[this.addressOptions[0]]+CodeToText[this.addressOptions[1]]+CodeToText[this.addressOptions[2]]
            let geocoder = new qq.maps.Geocoder();
            let map = new qq.maps.Map(document.getElementById("container"), {
                // 地图的中心地理坐标。
                center: new qq.maps.LatLng(39.916527, 116.397128),
                zoom: 8
            });
            //设置服务请求成功的回调函数
            geocoder.setComplete(function(result){
                that.placeData.longitude = result.detail.location.lng
                that.placeData.latitude = result.detail.location.lat
                map.setCenter(result.detail.location)
                let marker = new qq.maps.Marker({
                    map: map,
                    position: result.detail.location
                })
            })
            //若服务请求失败，则运行以下函数
            geocoder.setError(function() {
                that.$message.warning("未能识别，请输入正确或者详细的地址！")
            });
            geocoder.getLocation(addressOptions+this.placeData.address)
        },
        handleRadio(val){
            if(val===1){
                this.day_disabled = false
                this.hour_disabled = true
            }else if(val===2){
                this.day_disabled = true
                this.hour_disabled = false
            }else{
                this.day_disabled = true
                this.hour_disabled = true
            }
        },
        editData(id){
            let that = this
            let data = {
                secret: localStorage.getItem('secretId'),
                id: id
            }
            this.$axios.post(this.url+'shopapi/address/show',data
            ).then(res=>{
                if(res.data.code===200){
                    that.placeData.address = res.data.data.address
                    let addressOptions = []
                    if(res.data.data.city===""&&res.data.data.area===""){
                        addressOptions = [TextToCode[res.data.data.province].code]
                    }else if(res.data.data.area===""){
                        addressOptions = [
                            TextToCode[res.data.data.province].code,
                            TextToCode[res.data.data.province][res.data.data.city].code
                        ]
                    }else{
                        addressOptions = [
                            TextToCode[res.data.data.province].code,
                            TextToCode[res.data.data.province][res.data.data.city].code,
                            TextToCode[res.data.data.province][res.data.data.city][res.data.data.area].code
                        ]
                    }
                    that.addressOptions = addressOptions
                    that.codeAddress()
                    that.placeData.name = res.data.data.name
                    that.placeData.phone = res.data.data.phone
                    that.start_time = res.data.data.extract_time.split("-")[0]
                    that.end_time = res.data.data.extract_time.split("-")[1]
                    that.placeData.bespeak_type = res.data.data.bespeak_type
                    if(res.data.data.bespeak_type===1){
                        that.day = res.data.data.bespeak_time
                    }else if(res.data.data.bespeak_type===2){
                        that.hour = res.data.data.bespeak_time
                    }
                    that.placeData.picture = res.data.data.picture
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        handleSuccess(response, file, fileList){
            this.placeData.picture = response.data.src
        },
        beforeUpload(file){
            let testmsg=/^image\/(jpeg|png|jpg|gif|bmp|tiff)$/.test(file.type)
            if(!testmsg){
                this.$message.warning("请上传正确的图片格式")
                return false
            }else{
                return true
            }
            if(file.size/1024/1024>2){
                this.$message.warning("上传图片大小不能超过2M")
                return false
            }
        },
        save(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if(valid) {
                    let that = this
                    let data = JSON.parse(JSON.stringify(this.placeData))
                    if(data.bespeak_type===1){
                        data.bespeak_time = this.day
                    }else if(data.bespeak_type===2){
                        data.bespeak_time = this.hour
                    }
                    data.start_time = this.start_time
                    data.end_time = this.end_time
                    data.province = CodeToText[this.addressOptions[0]]
                    if(this.addressOptions[1]!=undefined){
                        data.city = CodeToText[this.addressOptions[1]]
                    }else{
                        data.city = ""
                    }
                    if(this.addressOptions[2]!=undefined){
                        data.area = CodeToText[this.addressOptions[2]]
                    }else{
                        data.area = ""
                    }
                    let urlType
                    if(this.$route.query.id!=-1){
                        urlType = 'shopapi/address/edit'
                        data.id = this.$route.query.id
                        data.extract_time = this.start_time+"-"+this.end_time
                        delete data.start_time
                        delete data.end_time
                    }else{
                        urlType = 'shopapi/address/store'
                    }
                    this.$axios.post(this.url+ urlType,data)
                    .then(function (res) {
                        if(res.data.code===200){
                            that.$message.success("保存成功")
                            that.$router.push({path:"/wf/admin/shop/self_point_management"})
                        }else{
                            that.$message.error(res.data.msg);
                        }
                    })
                    .catch(function (error) {
                        that.$message.error('请联系管理员');
                    });
                }
            })
        }
    },
    watch: {
        placeData: {
            handler(val,oldVal){
                if(val.bespeak_type===1){
                    this.day_disabled = false
                    this.hour_disabled = true
                }else if(val.bespeak_type===2){
                    this.day_disabled = true
                    this.hour_disabled = false
                }else{
                    this.day_disabled = true
                    this.hour_disabled = true
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-add_self_point{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    .el-button--primary{
        background: #719FF8;
    }
    .wf-gray-tit{
        color: #999;
        font-size: 12px;
    }
    .wf-time-bg{
        width: 568px;
        line-height: 60px;
        height: 60px;
        padding: 0 18px;
        border-radius:4px;
        background: #F8F8F8;
        .el-date-editor{
            width: 140px;
            margin: 0 10px;
        }
    }
    .el-select{
        width: 140px;
        margin-right: 20px;
    }
    .el-radio-group>div{
        margin: 10px 0;
    }
    /deep/ .el-radio__label{
        margin-right: 12px;
    }
    /deep/ .wf-upload{
        .el-form-item__label{
            line-height: 80px;
        }
    }
    // 图片上传样式
    .avatar-uploader .el-upload {
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon{
        border-radius: 4px;
        background: #F3F3F3;
        font-size: 28px;
        color: #999;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border: none;
    }
    .avatar{
        border-radius: 4px;
        width: 80px;
        height: 80px;
        display: block;
    }
}
</style>