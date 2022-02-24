<template>
    <div id="WF_footer" class="WF_footer">
        <div class="min_width_footer">
            <div class="WF_footer_box clear">
                <div class="contact">
                    <h3>联系我们</h3>
                    <p>咨询热线：<span style="display:inline-table;">0571-88731107</span></p>
                    <p>地址：杭州市余杭区富力天贸广场26幢708</p>
                </div>
                <div class="ewm_img">
                    <img src="../../../assets/index_img/srp.png" alt="">
                </div>
                <div>
                    <h3>关注我们</h3>
                    <p>掌握拾久最新动态</p>
                </div>
            </div>
        </div>
        <div class="copy_box">
            <div class="copy">
                &copy;2018 版权所有 万帆集团旗下,拾久商城 杭州万帆集团 浙ICP备16031604号-4
            </div>
        </div>
    </div>
</template>
<script >
export default {
  name: 'footer',
  data () {
      return {
        
      }

  },
  created: function () {
        
  },
  methods:{

  }
}
</script>

<style lang="scss">
  
/* footer */
#WF_footer{
    background: #2D3237;
    color: #fff;
    .clear{
        clear: both;
    }
    .min_width_footer{
        width: 1220px;
        margin: 0 auto;
    }
    .WF_footer_box{
        width: 646px;
        padding: 30px 0;
        margin: 0 auto;
        div{
            float: left;
        }
        h3{
            margin-bottom: 20px;
            font-size: 20px;
        }
        .contact{
            padding-right: 30px;
            border-right: 1px solid #7E7E7E;
        }
        p{
            margin-bottom: 12px;
            color: #D8D8D8;
        }
        span{
            font-weight: 600;
            font-size: 24px;
            color: #fff;
        }
        .ewm_img{
            width: 124px;
            height: 124px;
            background: #fff;
            margin: 0 30px;
        }
    }
    .copy_box{
        width: 100%;
        background: #232323;
    }
    .copy{
        width: 1220px;
        margin: 0 auto;
        text-align: center;
        color: #5D5D5D;
        padding: 10px 0;
        font-size: 14px;
    }
}
</style>