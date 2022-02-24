<template>
    <!-- class="wf-" 自定义链接-->
    <div class="wf-DIY-elDefaultLink">
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
        <el-dialog title="自定义链接" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
            <el-form-item label="标题" :label-width="formLabelWidth" >
                <el-input v-model="form.name" autocomplete="off" placeholder="外链标题"></el-input>
            </el-form-item>
            <el-form-item label="链接" :label-width="formLabelWidth">
                <el-input v-model="form.link" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'elDefaultLink',
    
    data() {
        return {
            dialogFormVisible:false,
            form: {
                name: '',
                link:'http://'
            },
            formLabelWidth: '120px'
        }
    },
    components: {

    },
    created(){
        
    },
    mounted(){

    },
    methods: {

    }
}
</script>


<style lang="scss" scoped>
    .el-dialog{
        width: 30%!important;
    }
    .el-form-item__label{
        width: 66px;
    }
    .el-form-item__content{
        margin-left:0;
    }
    .el-input{
        width: 300px;
    }
</style>