<template>
    <div id="xcx_experience">
        <el-row class="jianju">
            <el-button  size="mini" @click="open3">添加体验者</el-button>
            <el-button  size="mini" @click="open">小程序预览</el-button>
        </el-row>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
            prop="wechat_name"
            label="体验者微信">
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button  type="danger" size="mini" @click="handleClick(scope.row)">解绑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="pageCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size='pageSize'>
        </el-pagination>
        <el-dialog
                title="小程序预览"
                :visible.sync="demo_img"
                width="30%">
                    <el-row>
                          <img :src="img_list" alt="" class="img_demo_img">
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                        <el-button  @click="close">确 定</el-button>
                    </span>
         </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'shop_xcx_experience',
    data() {
        return {
          tableData:[],//小程序体验者列表
          getPage: 1,
          pageSize: 10,
          page:1,
          pageCount: 1,
          demo_img:false,//小程序体验码是否显示
          img_list:''
        }
    },
    created(){
      let that = this
        that.$axios.post(that.url + 'shopapi/Application/getBindList', //小程序授权
            '&secret='+localStorage.getItem('secretId') + "&page=" + 1
            )
            .then(function(res){
                if(res.data.code === 1){
                    that.tableData = res.data.data.data
                }else{
                   
                }
            })
            .catch(function (error) {
               
            })
    },
    methods:{
        handleSizeChange(val) {
            
        },
        handleCurrentChange(val) {
            let that = this
            that.$axios.post(this.url +'shopapi/Application/getBindList',{
                secret:localStorage.getItem('secretId'),
                limit:10,
                page:val
            })
              .then(function (response) {
                if(response.data.total > 0){
                    that.pageCount = response.data.total
                }
                that.tableData = response.data.data
              })
              .catch(function (error) {
                  
              });
          },  
    open3() {
        let that = this
        that.$prompt('请输入微信号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
           that.$axios.post(that.url +'shopapi/Application/bindExperience',{
                secret:localStorage.getItem('secretId'),
                name:value
            })
              .then(function (response) {
                if(response.data.code ===1){
                   that.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                   that.$axios.post(that.url + 'shopapi/Application/getBindList', //小程序授权
                    // 'token='+localStorage.getItem('userId')+
                    '&secret='+localStorage.getItem('secretId') + "&page=" + 1
                    )
                    .then(function(res){
                        if(res.data.code === 1){
                            that.tableData = res.data.data.data
                        }else{
                        
                        }
                    })
                    .catch(function (error) {
                    
                    })
                }else if(response.data.code === 0){
                     that.$message({
                      message: response.data.msg,
                      type: 'error'
                    });
                }
                
                
              })
              .catch(function (error) {
                  
              });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      open() {
        let that = this
         that.$axios.post(that.url +'shopapi/Application/getQr',{
                secret:localStorage.getItem('secretId')
            })
              .then(function (response) {
                  
                if(response.data.code ===1){
                    that.demo_img = true
                    
                    that.img_list= 'data:' + response.data.data
                }else if(response.data.code ===0){
                    that.$message({
                      message: response.data.msg,
                      type: 'error'
                    });
                }
              })
              .catch(function (error) {
                  
              });
      },
      close(){
        this.demo_img = false
      },
      handleClick(e){
          let that = this
          
        that.$axios.post(that.url +'shopapi/Application/removeBindList',{
                secret:localStorage.getItem('secretId'),
                id:e.id
            })
              .then(function (response) {
                if(response.data.code ===1){
                     that.$message({
                      message: response.data.msg,
                      type: 'success'
                    });
                    that.$axios.post(that.url + 'shopapi/Application/getBindList', //小程序授权
                        // 'token='+localStorage.getItem('userId')+
                        '&secret='+localStorage.getItem('secretId') + "&page=" + 1
                        )
                        .then(function(res){
                            if(res.data.code === 1){
                                that.tableData = res.data.data.data
                            }else{
                            
                            }
                        })
                        .catch(function (error) {
                        
                        })
                }
                
              })
              .catch(function (error) {
                  
              });
      }
    }
}
</script>

<style lang="scss">
#xcx_experience{
    background-color: #fff;
    padding: 20px;
    .jianju{
        margin: 20px 0;
    }
     .el-pagination{
        background: white;
        text-align: center;
        padding: 20px 0;
    }
    .img_demo_img{
            width: 200px;
            height: 200px;
            display: flex;
            margin: 0 auto;
        }
}
</style>
