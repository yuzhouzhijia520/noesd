<template>
    <el-dialog
    class="wf-dialogTable-component"
    title="物流详情"
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    center>
        <my-table
        :tableData='tableData'
        :columns='columns'
        :currentPage='currentPage'
        :totalPage="totalPage"
        @currentChange="currentChange"
        :pagination="pagination">
        </my-table>
    </el-dialog>
</template>

<script>
import MyTable from "@/commonComponents/table/table.vue";
export default {
    props: {
        dialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: "500px" },
        tableData: Array,
        columns: Array,
        currentPage: { type: Number, default: 1 },
        totalPage: { type: Number, default: 0 },
        pagination: { type: Boolean, default: true }
    },
    components: {
        MyTable
    },
    methods: {
        currentChange(val) {
            this.$emit("currentChange", val);
        },
        beforeClose(){
            this.$emit("beforeClose");
        }
    }
}
</script>

<style lang="scss" scoped>
.wf-dialogTable-component{
    /deep/ .el-dialog{
        .el-dialog__header{
            text-align: left;
            border-bottom: 1px solid #F0F0F0;
        }
    }
}
</style>
