import Mock from 'mockjs';
/**
 * @description seckill 秒杀列表
 * @type get
 * @author ps
 * @date 2018/11/26
 */
    const seckill = Mock.mock(
    '/api/mockjs/seckill','get', (req, res) =>{
        return  {
            code:200,
            data:[
                {
                    agentNum:1,
                    agentTel:'阿斯顿发放',
                    agentName:'ceshi',
                    agentType:'tupe',
                    agentMoney:'1223$',
                    date:'2018-09-09',
                    agentStatus:'开启'
                }],
                message:'success'
            }
        })

/**
 * @description diyLists 模板列表
 * @type get
 * @author ps
 * @date 2018/11/29
 */
    const diyLists = Mock.mock(
        '/api/mockjs/diyLists','get', (req, res) =>{
           return  {
                code:200,
                current_page:1,
                last_page: 1,
                per_page: 10,
                total: 1,
                data:[
                   {
                        agentNum:'阿斯顿发放',
                        agentTel:1,
                        agentName:'ceshi',
                        agentType:'tupe',
                        agentMoney:'201812031149',
                        startTime:'2018-09-09',
                        endTime:'2018-11-26',
                        agentMain: true, 
                        agentStatus:'开启'
                   }, {
                        agentNum:'cesss',
                        agentTel:32,
                        agentName:'ceshi',
                        agentType:'tupe',
                        agentMoney:'201812031149',
                        startTime:'2018-09-09',
                        endTime:'2018-11-26',
                        agentMain: false, 
                        agentStatus:'开启'
                    }],
                   message:'success'
                }
        })

/**
 * @description componentProps 视图可视化设计器-小程序json
 * @type get
 * @author ps
 * @date 2018/12/03
 */
     const componentProps = Mock.mock(
        '/api/mockjs/componentProps','get', (req, res) =>{
           return  {
                code:200,
                data:[
                    {
                        conId:1,
                        conImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/conponents1.png'),
                        text:'轮播图',
                        component:'swiper',
                        conProps:[
                              {
                                  title:'轮播图图片设置',
                                  component:'wfCard',
                                  item:[
                                        {
                                            srcUrl:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg1.png'), //轮播图地址
                                            order:0, //排序
                                            imgLink:'', //轮播图跳转路径
                                        },
                                        {
                                            srcUrl:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg2.png'), //轮播图地址
                                            order:1, //排序
                                            imgLink:'', //轮播图跳转路径
                                        },
                                        {
                                            srcUrl:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg3.png'), //轮播图地址
                                            order:2, //排序
                                            imgLink:'', //轮播图跳转路径
                                        }
                                  ]
                              },
                              {
                                title:'基础属性设置',
                                component:'wfCardProps',
                                item:{
                                    height:'210'
                                }
                            }
                          ]
                    },
                    {
                        conId:2,
                        conImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/conponents1.png'),
                        text:'图片广告',
                        component:'imageLabel',
                        conProps:[
                                {
                                    title:'图片广告图片设置',
                                    component:'imageUpload',
                                    item:[
                                        {
                                            imageUrl:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg7.png')
                                        }
                                    ]
                                },
                                {
                                        title:'图片属性设置',
                                        component:'imageUpload',
                                        item:[
                                            {
                                                srcUrl:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg0.png')
                                            },
                                            {
                                                srcUrl:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg1.png')
                                            },
                                            {
                                                srcUrl:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg2.png')
                                            }
                                        ]
                                }
                          ]
                    },
                    {
                        conId:2,
                        conImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/conponents1.png'),
                        text:'搜索',
                        component:'search',
                        conProps:[
                                {
                                    title:'搜索设置',
                                    component:'wfCard',
                                    item:[
                                        {
                                            imageUrl:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg6.png')
                                        }
                                    ]
                                }
                          ]
                    },
                    {
                        conId:3,
                        conImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/conponents1.png'),
                        text:'商品列表',
                        component:'b-component',
                        conProps:[
                              {
                                  title:'图片设置',
                                  component:'wfCard',
                                  item:[
                                      {
                                          srcImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg1.png')
                                      }
                                  ]
                              }
                          ]
                    },
                    {
                        conId:4,
                        conImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/conponents1.png'),
                        text:'图文导航',
                        component:'b-component',
                        conProps:[
                              {
                                  title:'图片设置',
                                  component:'wfCard',
                                  item:[
                                      {
                                          srcImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg1.png')
                                      }
                                  ]
                              }
                          ]
                    },
                    {
                        conId:5,
                        conImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/conponents1.png'),
                        text:'营销',
                        aComponent:'b-component',
                        conProps:[
                              {
                                  title:'图片设置',
                                  component:'wfCard',
                                  item:[
                                      {
                                          srcImg:require('@/assets/admin_img/shop_admin_img/DIY/shopImg/wfImg1.png')
                                      }
                                  ]
                              }
                          ]
                    }
                   ],
                   message:'success'
                }
        })

 export default { seckill,diyLists,componentProps }