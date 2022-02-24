<template>
    <el-row>
        <el-row>
            <el-table
                :data="tableData"
                :header-cell-style="headerStyle"
                 @selection-change="handleSelectionChange"
                 @select="handleSelect"
                 @expand-change="handleExpandChange"
                 :row-key="getRowKeys"
                 :expand-row-keys="expands"
                 ref="multipleTable"
                 :border="border"
                 :show-header="showHeader"
                :empty-text="emptyText"
                :span-method="spanMethod"
                >
                <el-table-column v-if="mutiSelect" type="selection" :reserve-selection="reserveSelection" class="selection" :selectable="selectable">
                </el-table-column>
                <!-- <el-table-column type="expand"   class="wf-expand" v-if="expand" ></el-table-column> -->
                <el-table-column
                    v-for="(column, index) in columns"
                    :prop="column.prop"
                    :key="index"
                    :label="column.label"
                    :width="column.width"
                    :align="column.align"
                    :type="column.type"
                    :fixed="column.fixed"
                    :render-header="column.renderHeader"
                    style="padding:0">
                    <template slot-scope="scope">
                        <my-render v-if="column.render" :index="scope.$index" :row="scope.row" :render="column.render" ></my-render>
                        <span v-else>
                        {{scope.row[column.prop]}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="wf_pagination" v-if="pagination">
            <div class="block">
                <el-pagination
                :current-page="currentPage"
                @current-change="currentChange"
                layout="total, prev, pager, next,jumper"
                :total="totalPage"
                :page-size="pageSize">
                </el-pagination>
            </div>
        </el-row>
    </el-row>
</template>

<script>
import MyRender from "./MyRender";
export default {
  props: {
    tableData: Array,
    columns: Array,
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    totalPage: { type: Number, default: 0 },
    pagination: { type: Boolean, default: true },
    border: { type: Boolean, default: false },
    showHeader: { type: Boolean, default: true },
    mutiSelect:{ type: Boolean, default: false },
    shopSelecteds:Array,
    expand:{ type: Boolean, default: false },
    // 获取row的key值
    getRowKeys:{
        type:Function,
        default:(row)=> {
            return row.id;
        }
    },
    // 要展开的行，数值的元素是row的key值
    expands: Array,
    selectIdArrFlag:{type:Boolean,default:false}, //禁用选项标识符
    selectIdArr:{type:Array}, //禁用选项
    selectIdArrKey:{type:String,default:'id'}, //禁用选项标志key
    emptyText: { type: String, default: '暂无数据' }, // 空数据时显示的文本内容
    reserveSelection: { type: Boolean, default: false }, // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    spanMethodFlag: { type: Boolean, default: false }, // 判断是否需要开启合并行、列
    rowspan: { type: Number, default: 0 }, // 接受要合并的行数
  },
   data(){
        return {
            multipleSelection: [], // 多行选中
        }
    },
  methods: {
    spanMethod({ row, column, rowIndex, columnIndex }){
        if(this.spanMethodFlag){
            if (columnIndex !== 0) {
                if (rowIndex === 0) {
                    return {
                        rowspan: this.rowspan,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    },
    headerStyle() {
      return { "text-align": "center" };
    },
    currentChange(val) {
        this.$emit("currentChange", val);
    },
    handleSelectionChange(val) {
        this.multipleSelection = val
        this.$emit("multipleSelection", val);
    },
    handleSelect(selection,row){
        this.$emit("select", selection,row);
    },
    handleExpandChange(row, expandedRows){
        this.$emit("expandChange", row,expandedRows);
    },
    selectable(row, index) {
        //是否需要禁用
        if(this.selectIdArrFlag){
            //遍历禁用数据
            if(this.selectIdArr.length>0&&this.selectIdArrFlag===true){
                if(this.selectIdArr.some((item)=>item[this.selectIdArrKey]===row[this.selectIdArrKey])){
                    return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }else{
            return true;
        }
    }
  },
  components: {
    MyRender
  }
};
</script>

<style lang="scss">
    .el-table__body .el-table__row{
        .cell{
            margin-left: 4px;
        }
    }
    
</style>