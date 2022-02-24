<template>
    <div class="wf-membershipCard">
        <p class="wf-title">添加储值卡、折扣卡后，小程序即开通卡服务，开通后不可关闭。多种优惠不能同时使用，下单时的优惠券、储值卡、折扣卡只能使用其中一种优惠。</p>
        <!-- 储值卡 -->
        <div class="wf-card-type radius">储值卡</div>
        <el-row class="clear">
            <div class="wf-vip-card" v-for="(list,index) in saveCardList" :key="index">
                <div class="wf-card radius" :style="'background:'+list.cover+';color:'+list.word_cover">
                    <div class="clear">
                        <div class="card-left">
                            <div class="first-font h1">{{list.title}}</div>
                            <div>首充<span class="second-font">{{list.first_impulse_amount}}</span><template v-if="list.give_amount!='0.00'">送<span class="second-font">{{list.give_amount}}</span>元</template></div>
                            <div>
                                <template v-if="list.give_coupon_price!='0'">
                                    送
                                    <span class="second-font">{{list.give_coupon_price}}</span>
                                    元优惠券 <span v-if="list.give_coupon_price!='0'&&list.give_integral!='0'">·</span> 
                                </template>
                                <span v-if="list.give_integral!='0'">
                                    送
                                    <span class="second-font">{{list.give_integral}}</span>
                                    积分
                                </span>
                            </div>
                            <div class="h2">每次续充都得{{list.charge_multiplier}}倍金额</div>
                        </div>
                        <div class="card-right">
                            <div>
                                <div>用卡须知</div>
                                <img :src="list.logo" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <!-- <el-button class="wf-textBtn-primary" type="text" @click="seeVip">查看会员</el-button> -->
                    <el-button class="wf-textBtn-primary" type="text" @click="editSaveCard(list.id)">编辑</el-button>
                    <el-button class="wf-textBtn-danger" type="text" @click="deleteSaveCard(list.id)">删除</el-button>
                </div>
            </div>
            <div class="wf-vip-card" @click="addCard(0)">
                <div class="wf-add_card radius">
                    <i class="el-icon-plus"></i>
                    <p class="wf-addCard-text">添加会员卡</p>
                </div>
            </div>
        </el-row>
        <!-- 折扣卡 -->
        <div class="wf-card-type radius">按年/月购买的折扣卡</div>
        <el-row class="clear">
            <div class="wf-vip-card" v-for="(list,index) in discountCardList" :key="index">
                <div class="wf-card radius" :style="'background:'+list.cover+';color:'+list.word_cover">
                    <div class="clear">
                        <div class="card-left">
                            <div class="first-font h1">{{list.title}}</div>
                            <div><span class="second-font">￥{{list.price}}/{{list.price_type}}</span></div>
                            <div>折扣<span class="second-font">{{list.discount}}</span>折 <span v-if="list.integral_multiple!='0'">· 积分<span class="second-font">{{list.integral_multiple}}</span>倍</span></div>
                            <div class="h2" v-if="list.give_integral!='0'">办卡赠送{{list.give_integral}}积分</div>
                        </div>
                        <div class="card-right">
                            <div>
                                <div>用卡须知</div>
                                <img :src="list.logo" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <!-- <el-button class="wf-textBtn-primary" type="text" @click="seeVip">查看会员</el-button> -->
                    <el-button class="wf-textBtn-primary" type="text" @click="editDiscountCard(list.id)">编辑</el-button>
                    <el-button class="wf-textBtn-danger" type="text" @click="deleteDiscountCard(list.id)">删除</el-button>
                </div>
            </div>
            <div class="wf-vip-card" @click="addCard(1)">
                <div class="wf-add_card radius">
                    <i class="el-icon-plus"></i>
                    <p class="wf-addCard-text">添加会员卡</p>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    class: "membershipCard",
    data() {
        return {
            saveCardList: [], // 储值卡列表
            discountCardList: [], // 折扣卡列表
        }
    },
    mounted() {
        this.getCardList()
        this.getDiscountCardList()
    },
    methods: {
        getCardList(){ // 储值卡列表接口
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axios.post(this.url+'shopapi/member_card/index',data
            ).then(res=>{
                if(res.data.code===200){
                    that.saveCardList = res.data.data;
                    that.saveCardList.forEach(el => {
                        if(el.cover_type===1){
                            el.cover = 'url("' + el.cover + '")'
                        }
                    });
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        getDiscountCardList(){ // 折扣卡列表接口
            let that = this
            let data = {
                secret: localStorage.getItem('secretId')
            }
            this.$axio
            this.$axios.post(this.url+'shopapi/member_card/disindex',data
            ).then(res=>{
                if(res.data.code===200){
                    that.discountCardList = res.data.data;
                    that.discountCardList.forEach(el => {
                        if(el.cover_type===1){
                            el.cover = 'url("' + el.cover + '")'
                        }
                        if(el.price_type===0){
                            el.price_type = "月"
                        }else if(el.price_type===1){
                            el.price_type = "季"
                        }else if(el.price_type===2){
                            el.price_type = "半年"
                        }else if(el.price_type===3){
                            el.price_type = "年"
                        }
                    });
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                that.$message.error('请联系管理员！');
            });
        },
        deleteSaveCard(id){ // 删除储值卡
            this.$confirm('确定删除此会员卡吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                let data = {
                    secret: localStorage.getItem('secretId'),
                    id: id
                }
                this.$axios.post(this.url+'shopapi/member_card/destroy',data
                ).then(res=>{
                    if(res.data.code===200){
                        that.getCardList()
                        that.$message.success("删除成功");
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch(err=>{
                    that.$message.error('请联系管理员！');
                });
            }).catch(() => {
                this.$message.info("已取消删除");          
            });
        },
        deleteDiscountCard(id){ // 删除折扣卡
            this.$confirm('确定删除此会员卡吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let that = this
                let data = {
                    secret: localStorage.getItem('secretId'),
                    id: id
                }
                this.$axios.post(this.url+'shopapi/member_card/disdestroy',data
                ).then(res=>{
                    if(res.data.code===200){
                        that.getDiscountCardList()
                        that.$message.success("删除成功");
                    }else{
                        that.$message.error(res.data.msg);
                    }
                }).catch(err=>{
                    that.$message.error('请联系管理员！');
                });
            }).catch(() => {
                this.$message.info("已取消删除");          
            });
        },
        addCard(type){ // 判断添加哪种类型的卡
            this.card_type = type
            if(type===0){
                this.$router.push({path:"/wf/admin/shop/markting/memberMenu/addSaveCard"})
            }else{
                this.$router.push({path:"/wf/admin/shop/markting/memberMenu/addDiscountCard"})
            }
        },
        editSaveCard(id){ // 编辑储值卡数据回填
            this.$router.push({path:"/wf/admin/shop/markting/memberMenu/addSaveCard",query:{id:id}})
        },
        editDiscountCard(id){ // 编辑折扣卡数据回填
            this.$router.push({path:"/wf/admin/shop/markting/memberMenu/addDiscountCard",query:{id:id}})
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/css_WF_admin/shop_admin/membership_card/membershipCard.scss'
</style>