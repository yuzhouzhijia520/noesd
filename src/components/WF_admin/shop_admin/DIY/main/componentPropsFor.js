const componentPropsFor = {
    swiper: [
        {
            title: '轮播图图片设置',
            component: 'wfCard',
            item: [
                {
                    srcUrl: `http://cdn3.19mini.com/2018-12-07%2Fc325aa7f0a95fb270b176cd79c552538.png`, //轮播图地址
                    order: 0, //排序
                    imgLink: '', //轮播图跳转路径
                    name: '', //跳转链接地址名称
                    linkListId:0
                },
                {
                    srcUrl: `http://cdn1.19mini.com/2018-12-07%2Fac2d8afd7e99306450c37a864abc49bd.png`, //轮播图地址
                    order: 1, //排序
                    imgLink: '', //轮播图跳转路径
                    name: '', //跳转链接地址名称
                    linkListId:0
                },
                {
                    srcUrl: `http://cdn2.19mini.com/2018-12-07%2F65b3f32a62ba8d0c17a6fc02b6f4f881.png`, //轮播图地址
                    order: 2, //排序
                    imgLink: '', //轮播图跳转路径
                    name: '', //跳转链接地址名称
                    linkListId:0
                }
            ]
        },
        {
            title: '基础属性设置',
            component: 'wfCardProps',
            item: {
                height: '210'
            }
        }
    ],
    imageLabel: [
        {
            title: '图片广告图片设置',
            component: 'imageUpload',
            item: 
                {
                    srcUrl: `http://cdn0.19mini.com/2018-12-10%2F062443e59793bad32efc1fae71cc440a.png`, //图片广告图片地址
                    link:'', //“更多” 跳转链接
                    linkListId:0
                }
        },
        {
            title: '基础属性设置',
            component: 'wfCardProps',
            item: {
                height: '100'
            }
        }
    ],
    search: [
        {
            title: '搜索设置',
            component: 'searchProps',
            item: []
        }
    ],
    goods: [
        {
            title: '商品列表样式设置',
            component: 'wfGoodsListStyle',
            item: [
                {
                    title: '商品图片设置',
                    component: 'wfGoods0',
                    parentComponent: 'goods0',
                    selectShow: true,
                    order: 0,
                    props: []
                },
                {
                    title: '商品图片设置',
                    component: 'wfGoods1',
                    parentComponent: 'goods1',
                    selectShow: false,
                    order: 1,
                    props: []
                },
                {
                    title: '商品图片设置',
                    component: 'wfGoods2',
                    parentComponent: 'goods2',
                    selectShow: false,
                    order: 2,
                    props: []
                },
                {
                    title: '商品图片设置',
                    component: 'wfGoods3',
                    parentComponent: 'goods3',
                    selectShow: false,
                    order: 3,
                    props: []
                }
            ]
        },
        {
            title: '基础属性设置',
            component: 'wfGoodsProps',
            item: {
                goodsName:true,//默认显示商品名称
                goodsPrice:true//默认显示商品价格
            }
        }
    ],
    navigation: [
        {
            title: '图文导航设置',
            component: 'wfNavigationStyle',
            childrenItem:[],
            item: [
                {
                    title: '图文导航图片设置',
                    component: 'wfNavigation4',
                    parentComponent: 'navigation0',
                    selectShow: true,
                    order: 0,
                    item: [
                        {
                            srcUrl: `http://cdn0.19mini.com/2018-12-17%2Fe00129d243cd48c8bf61e179b22b078d.png`, //图文导航地址
                            order: 0, //排序
                            imgLink: '', //图文导航跳转路径
                            name: '', //跳转链接地址名称
                            goodsName:'导航一', //标题
                            linkListId:'0'
                        },
                        {
                            srcUrl: ``, //图文导航地址
                            order: 1, //排序
                            imgLink: '', //图文导航跳转路径
                            name: '', //跳转链接地址名称
                            goodsName:'导航二', //标题
                            linkListId:'0'
                        },
                        {
                            srcUrl: ``, //图文导航地址
                            order: 2, //排序
                            imgLink: '', //图文导航跳转路径
                            name: '', //跳转链接地址名称
                            goodsName:'导航三', //标题
                            linkListId:'0'
                        },
                        {
                            srcUrl: ``, //图文导航地址
                            order: 3, //排序
                            imgLink: '', //图文导航跳转路径
                            name: '', //跳转链接地址名称
                            goodsName:'导航四', //标题
                            linkListId:'0'
                        }
                    ]
                },
                {
                    title: '图文导航图片设置',
                    component: 'wfNavigation5',
                    parentComponent: 'navigation1',
                    selectShow: false,
                    order: 1,
                    item: [
                        {
                            srcUrl: `http://cdn3.19mini.com/2018-12-07%2Fc325aa7f0a95fb270b176cd79c552538.png`, //轮播图地址
                            order: 0, //排序
                            imgLink: '', //轮播图跳转路径
                            name: '',//跳转链接地址名称
                            goodsName:'', //标题
                            linkListId:'0'
                        }
                    ]
                },
                {
                    title: '图文导航图片设置',
                    component: 'wfNavigation5',
                    parentComponent: 'navigation1',
                    selectShow: false,
                    order: 1,
                    item: [
                        {
                            srcUrl: `http://cdn3.19mini.com/2018-12-07%2Fc325aa7f0a95fb270b176cd79c552538.png`, //轮播图地址
                            order: 0, //排序
                            imgLink: '', //轮播图跳转路径
                            name: '',//跳转链接地址名称
                            goodsName:'', //标题
                            linkListId:'0'
                        }
                    ]
                }
            ]
        }

    ],//图文导航模拟数据
    banner:[
        {
            title: '标题设置',
            component: 'bannerProps',
            item:{
                    title:'热卖商品',
                    checked:true,
                    background:'', //背景图
                    link:'', //“更多” 跳转链接
                    linkListId:0
                }
            
        }
    ],
    //魔方组件
    cube:[
        {
            title: '选择模板',
            component: 'wfCubeStyle',
            item: [
                {
                    title: '图片管理',
                    component: 'wfCube0',
                    parentComponent: 'cube0',
                    selectShow: true,
                    type:2,
                    order: 0,
                    item: [
                        {
                            srcUrl: ``, //轮播图地址
                            order: 0, //排序
                            imgLink: '', //轮播图跳转路径
                            name: '', //跳转链接地址名称
                            linkListId:0
                        },
                        {
                            srcUrl: ``, //轮播图地址
                            order: 1, //排序
                            imgLink: '', //轮播图跳转路径
                            name: '', //跳转链接地址名称
                            linkListId:0
                        },
                        {
                            srcUrl: ``, //轮播图地址
                            order: 2, //排序
                            imgLink: '', //轮播图跳转路径
                            name: '', //跳转链接地址名称
                            linkListId:0
                        },
                        {
                            srcUrl: ``, //轮播图地址
                            order: 3, //排序
                            imgLink: '', //轮播图跳转路径
                            name: '', //跳转链接地址名称
                            linkListId:0
                        }
                    ]
                },
                {
                    title: '图片管理',
                    component: 'wfCube0',
                    parentComponent: 'cube1',
                    selectShow: false,
                    type:3,
                    order: 1,
                    item: []
                },
                {
                    title: '图片管理',
                    component: 'wfCube0',
                    parentComponent: 'cube2',
                    selectShow: false,
                    type:4,
                    order: 2,
                    item: []
                },
                {
                    title: '图片管理',
                    component: 'wfCube0',
                    parentComponent: 'cube3',
                    selectShow: false,
                    type:3,
                    order: 3,
                    item: []
                },
                {
                    title: '图片管理',
                    component: 'wfCube0',
                    parentComponent: 'cube4',
                    selectShow: false,
                    type:3,
                    order: 4,
                    item: []
                },
                {
                    title: '图片管理',
                    component: 'wfCube0',
                    parentComponent: 'cube5',
                    selectShow: false,
                    type:4,
                    order: 5,
                    item: []
                }
            ]
        }
    ],
    //辅助空白线
    hideLine:[
        {
            title: '基础属性设置',
            component: 'heightLine',
            item: {
                height: '10',
                bgcolor:'#fff'
            }
        }
    ],
    //公告
    notice:[
        {
            title: '基础属性设置',
            component: 'noticeSet',
            item: {
                content: '',
                fontcolor:1,
                radio:1,
                radio1:1,
                bgcolor:'#ccc'
            }
        }
    ],
    //视频
    videos:[
        {
            title: '基础属性设置',
            component: 'videoSet',
            item: {
                videosrc: '',
                type:'',
                imgsrc:'',
                autoplay:false,
            }
        }
    ],
    //砍价
    bargain:[
        {
            title: '砍价活动选择',
            component: 'bargainStyle',
            item:[
                {
                    title: '活动设置',
                    component: 'bargainSet0',
                    parentComponent: 'bargain0',
                    selectShow: true,
                    order: 0,
                    props: []
                }
            ]
        }
    ],
    //拼团
    assemble:[
        {
            title: '拼团活动选择',
            component: 'assembleStyle',
            item: [
                {
                    title: '活动设置',
                    component: 'assembleSet0',
                    parentComponent: 'assemble0',
                    selectShow: true,
                    order: 0,
                    props: []
                }
            ]
        }
    ],
    //秒杀
    spike:[
        {
            title: '秒杀活动选择',
            component: 'spikeStyle',
            item: [
                {
                    title: '活动设置',
                    component: 'spikeSet0',
                    parentComponent: 'spike0',
                    selectShow: true,
                    order: 0,
                    props: []
                }
            ]
        }
    ],
}

export default componentPropsFor;