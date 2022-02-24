<template>
    <div class="wf-main-header">
        <span class="header_left">欢迎您，{{pro_name}}</span>
        <span class="header_right">
            <span style="cursor:pointer" @click="quite">退出登录</span>
        </span>
    </div>
</template>

<script>

export default {
    data(){
        return {
             pro_name: localStorage.getItem('agentPhone'), // 用户名称
        }
    },
    created(){

    },
    mounted(){
    },
    methods:{
        quite(){
            localStorage.setItem('activeName','second');
            this.$router.push({path:'/wf/index/login'});
            localStorage.removeItem('agentId');
            localStorage.removeItem('is_agent');
            localStorage.removeItem('agentPhone');
        }
    }
}
</script>

<style lang="scss">
.header_left{
    float: left;
}
</style>

