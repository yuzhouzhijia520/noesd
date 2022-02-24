import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/wf/index/login',
      name: 'login',
      meta: {
        title: '万帆集团'
      },
      component:(resolve) => require(['@/components/WF_index/login.vue'], resolve)
    },
    {
      path: '/wf/index/register',
      name: 'register',
      meta: {
        title: '万帆集团',
      },
      component:(resolve) => require(['@/components/WF_index/register.vue'], resolve)
    },
    {
      path: '/wf/index/resetsuccessful',
      name: 'reset_successful',
      meta: {
        title: '万帆集团',
      },
      component:(resolve) => require(['@/components/WF_index/reset_successful.vue'], resolve)
    },
    {
      path: '*',
      name: 'Page404',
      meta: { title: 'page404', noCache: true },
      component: () => import('@/components/errorPage/404'),
    },
    // {
    //   path: '/wf/index/cooperate',
    //   name: 'cooperate',
    //   meta: {
    //     title: '万帆集团',
    //   },
    //   component:(resolve) => require(['@/components/WF_index/cooperate.vue'], resolve)
    // },
    // {
    //   path: '/wf/index/contact',
    //   name: 'contact',
    //   meta: {
    //     title: '万帆集团',
    //   },
    //   component:(resolve) => require(['@/components/WF_index/contact.vue'], resolve)
    // },
    // WF_user 页面组成
    {
      path: '/wf/user/login',
      name: 'user_Login',
      meta: {
        title: '万帆集团',
      },
      component:(resolve) => require(['@/components/WF_user/user_Login.vue'], resolve)
    },
    {
      path: '/wf/user/index',
      name: 'user_index',
      meta: {
        title: '万帆集团',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_user/index.vue'], resolve)
    },
    // {
    //   path: '/wf/user/model',
    //   name: 'user_model',
    //   meta: {
    //     title: '万帆集团',
    //   },
    //   component:(resolve) => require(['@/components/WF_user/model.vue'], resolve)
    // },
    {
      path: '/wf/user/management',
      name: 'user_management',
      meta: {
        title: '万帆集团',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_user/management.vue'], resolve)
    },
    // {
    //   path: '/wf/user/bkmanagement',
    //   name: 'user_bkmanagement',
    //   meta: {
    //     title: '代理商',
    //   },
    //   component:(resolve) => require(['@/components/WF_user/bkManagement.vue'], resolve)
    // },
    {
      path: '/wf/user/bkmanagement',
      name: 'bkmanagement',
      meta: {
        title: '代理概况',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_user/proxy/index.vue'], resolve),
      children: [
        {
          path: '/wf/user/bkmanagement',   //代理概况
          name: 'bkmanagement',
          meta: {
            title: '代理概况',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/proxy/overview.vue'], resolve),
        },
        {
          path: '/wf/user/bkmanagement/proxy_app_list',   //小程序
          name: 'proxy_app_list',
          meta: {
            title: '小程序',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/proxy/app_list.vue'], resolve),
        },
        {
          path: '/wf/user/bkmanagement/proxy_app_list/applist',   //小程序列表
          name: 'applist',
          meta: {
            title: '小程序列表',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/proxy/app_list.vue'], resolve),
        },
        {
          path: '/wf/user/bkmanagement/proxy_app_list/application',   //发布申请
          name: 'application',
          meta: {
            title: '发布申请',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/proxy/application.vue'], resolve),
        },
        {
          path: '/wf/user/bkmanagement/proxy_customer',   //客户管理
          name: 'proxy_customer',
          meta: {
            title: '客户管理',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/proxy/customer.vue'], resolve),
        },{
          path: '/wf/user/bkmanagement/oem',   //客户管理
          name: 'oem',
          meta: {
            title: '平台配置'
          },
          component:(resolve) => require(['@/components/WF_user/oem/setOem.vue'], resolve),
        },{
          path: '/wf/user/bkmanagement/oem/setOem',  
          name: 'setOem',
          meta: {
            title: '全局设置',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/oem/setOem.vue'], resolve),
        },{
          path: '/wf/user/bkmanagement/oem/indexBanner',  
          name: 'indexBanner',
          meta: {
            title: '官网首页',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/oem/indexBanner.vue'], resolve),
        },{
          path: '/wf/user/bkmanagement/oem/indexfooter',  
          name: 'indexfooter',
          meta: {
            title: '官网底栏',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/oem/indexfooter.vue'], resolve),
        },{
          path: '/wf/user/bkmanagement/oem/indexRight',  
          name: 'indexRight',
          meta: {
            title: '右侧栏',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/oem/indexRight.vue'], resolve),
        },{
          path: '/wf/user/bkmanagement/oem/indexWe',  
          name: 'indexWe',
          meta: {
            title: '关于我们',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_user/oem/indexWe.vue'], resolve),
        },
      ]
    },
    // WF_admin  eat_admin 餐饮后台
    // {
    //   path: '/wf/admin/eat_admin',
    //   name: 'eatAdmin_index',
    //   meta: {
    //     title: '万帆集团',
    //   },
    //   component:(resolve) => require(['@/components/WF_admin/eat_admin/index.vue'], resolve),
    //   children:[]
    // }
    // 电商后台页面组件
    {
      path: '/',   //概括页面
      name: 'shop_overview',
      meta: {
        title: '商品',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children:[
        {
          path: '/wf/admin/shop/newshop_list',   //商品列表
          name: 'newshop_list',
          meta: {
            title: '商品列表',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_list/shop_list.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/class_management',   //分类管理
          name: 'class_management',
          meta: {
            title: '分类管理',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/class_management/class_management.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/newshop_list/newadd_goods',   //商品列表——添加商品
          name: 'newadd_goods',
          meta: {
            title: '新建商品',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_list/add_goods.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/newshop_list/commoditygrouping',   //商品列表——商品分组列表
          name: 'commoditygrouping',
          meta: {
            title: '商品分组',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_list/commoditygrouping.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/newshop_list/editshopgroup',   //商品列表——编辑商品
          name: 'editshopgroup',
          meta: {
            title: '列表中隐藏or自定义商品分组',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_list/editshopgroup.vue'], resolve),
        }
        // {
        //   path: '/wf/admin/shop/shop_list/shop_edit',   //商品列表——修改商品
        //   name: 'shop_edit',
        //   meta: {
        //     title: '修改商品',
        //     requireAuth:true
        //   },
        //   component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_list/shop_edit.vue'], resolve),
        // }
      ]
    },
    {
      path: '/',   //店铺装修
      name: 'diy',
      meta: {
        title: '店铺装修',
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children:[
            {
              path: '/wf/admin/shop/diy',   //店铺装修
              name: 'diy',
              meta: {
                title: '店铺主页',
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/DIY/index.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/diy/addDiy',   //新增模板
              name: 'addDiy',
              meta: {
                title: '新增模板',
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/DIY/main/addDiy.vue'], resolve),
            },
    ]
    },
    {
      path: '/',   //订单
      name: 'order',
      meta: {
        title: '订单',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children:[
        {
          path: '/wf/admin/shop/order',   //普通订单
          name: 'order',
          meta: {
            title: '普通订单',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/order/order.vue'], resolve),
          
        },
        {
          path: '/wf/admin/shop/grouporder',   //全部订单
          name: 'grouporder',
          meta: {
            title: '团购订单',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/order/grouporder.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/order/order_details',   //订单—普通订单—订单详情
          name: 'order_details',
          meta: {
            title: '订单详情',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/order/order_details.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/grouporder/order_details_group',   //订单—普通订单—订单详情
          name: 'order_details_group',
          meta: {
            title: '订单详情',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/order/order_details.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/evaluation',   //订单—评价概况
          name: 'evaluation',
          meta: {
            title: '评价概况',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/order/evaluation.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/waybillManagement',   //订单—运单管理
          name: 'waybillManagement',
          meta: {
            title: '运单管理',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/order/waybillManagement.vue'], resolve),
        },
      ]
    },
    {
      path: '/',   //店铺
      name: 'shop_shops',
      meta: {
        title: '店铺',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children:[
            {
              path: '/wf/admin/shop/shop_shops',   //店铺
              name: 'shop_shops',
              meta: {
                title: '店铺',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_shops/shop_shops.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/shop_shops/add_lunbo',   //店铺——添加轮播
              name: 'add_lunbo',
              meta: {
                title: '添加轮播',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_shops/add_lunbo.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/shop_shops/add_classify',   //店铺——添加首页分类
              name: 'add_classify',
              meta: {
                title: '添加首页分类',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_shops/add_classify.vue'], resolve),
            }
          ]
    },
    {
      path: '/',   //素材列表
      name: 'materiallist',
      meta: {
        title: '素材列表',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children: [
        {
          path: '/wf/admin/shop/materiallist',   //素材列表
          name: 'materiallist',
          meta: {
            title: '专题中心',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/materiallist/materiallist.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/materiallist/add_materiallist',   //素材列表
          name: 'add_materiallist',
          meta: {
            title: '新增专题/编辑专题',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/materiallist/add_materiallist.vue'], resolve),
        }
      ]
    },
    {
      path: '/',   //营销
      name: 'markting',
      meta: {
        title: '营销',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children:[
            {
              path: '/wf/admin/shop/markting',   // 营销工具市场
              name: 'markting',
              meta: {
                title: '营销工具市场',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/markting.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/watchtooldetail',   // 营销工具详情
              name: 'watchtooldetail',
              meta: {
                title: '营销工具详情',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/watchtooldetail.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/mymarkting',   // 我的营销工具市场
              name: 'mymarkting',
              meta: {
                title: '我的营销工具市场',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/mymarkting.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/coupon',   // 营销——优惠券
              name: 'coupon',
              meta: {
                title: '优惠券',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/coupon.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/fullslice',   // 营销——满减
              name: 'fullslice',
              meta: {
                title: '满减',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/fullslice/fullslice.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/depositAdd',   // 营销——定金膨胀
              name: 'depositAdd',
              meta: {
                title: '定金膨胀',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/deposit/depositAdd.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/deposit',   // 营销——定金膨胀
              name: 'deposit',
              meta: {
                title: '定金膨胀列表',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/deposit/deposit.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/seckill',   // 营销——秒杀
              name: 'seckill',
              meta: {
                title: '秒杀',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/seckill.vue'], resolve),
              
            },
            {
              path: '/wf/admin/shop/markting/disMenu',   // 营销——分销设置
              name: 'disMenu',
              meta: {
                title: '分销',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/disMenu.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/seckill/addSeckill',   // 营销——新增秒杀
              name: 'addSeckill',
              meta: {
                title: '新增秒杀',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/addSeckill.vue'], resolve),
              
            },
            {
              path: '/wf/admin/shop/markting/seckill/seckillEdit',   // 营销——新增秒杀
              name: 'seckillEdit',
              meta: {
                title: '编辑',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/addSeckill.vue'], resolve),
              
            },
            {
              path: '/wf/admin/shop/markting/group',   // 营销——团购
              name: 'group',
              meta: {
                title: '团购',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/group.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/coupon/addCoupon',   // 营销——添加优惠券
              name: 'addCoupon',
              meta: {
                title: '新增优惠券',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/addCoupon.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/fullslice/addFullslice',   // 营销——新增满减
              name: 'addFullslice',
              meta: {
                title: '新增满减',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/fullslice/addFullslice.vue'], resolve),
            }
            ,
            {
              path: '/wf/admin/shop/markting/coupon/couponEdit',   // 营销——编辑
              name: 'couponEdit',
              meta: {
                title: '编辑',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/addCoupon.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/group/addGroup',   // 营销——添加团购
              name: 'addGroup',
              meta: {
                title: '新增团购',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/addGroup.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/disMenu/distributor_list',   // 分销——分销商列表
              name: 'distributor_list',
              meta: {
                title: '分销',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/distribution/distributor_list.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/question',   // 分销——问卷调查
              name: 'question',
              meta: {
                title: '问卷调查',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/question/list.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/question/addQuestion',   // 分销——新增问卷调查
              name: 'addQuestion',
              meta: {
                title: '新增问卷调查',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/question/addQuestion.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/question/resultList',   // 分销——用户作答结果
              name: 'resultList',
              meta: {
                title: '用户作答结果',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/question/resultList.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/question/setQuestion',   // 分销—— 设置问卷调查
              name: 'setQuestion',
              meta: {
                title: '设置问卷调查',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/question/setQuestion.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/question/editReport',   // 分销—— 编辑分析报告及推荐商品
              name: 'editReport',
              meta: {
                title: '编辑分析报告及推荐商品',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/question/editReport.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/question/previewQuestion',   // 分销—— 完成
              name: 'previewQuestion',
              meta: {
                title: '完成',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/question/previewQuestion.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/disMenu/distributor_detail',   // 分销——分销商详情
              name: 'distributor_detail',
              meta: {
                title: '查看详情',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/distribution/distributor_detail.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/bargainMenu',   // 分销——砍价
              name: 'bargainMenu',
              meta: {
                title: '砍价',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/bargainMenu.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/bargain/bargainGoods',   // 分销——砍价商品
              name: 'bargainGoods',
              meta: {
                title: '砍价商品',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/bargain/bargainGoods.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/bargain/activityRecord',   // 分销——活动记录
              name: 'activityRecord',
              meta: {
                title: '活动记录',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/bargain/activityRecord.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/bargainMenu/addBargain',   // 分销——新增砍价
              name: 'addBargain',
              meta: {
                title: '新增砍价',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/bargain/addBargain.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/memberMenu',   // 分销——会员管理
              name: 'memberMenu',
              meta: {
                title: '会员管理',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/memberMenu.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/memberMenu/addSaveCard',   // 分销——会员管理——添加、编辑储值卡
              name: 'addSaveCard',
              meta: {
                title: '编辑储值卡',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/addSaveCard.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/memberMenu/addDiscountCard',   // 分销——会员管理——添加、编辑折扣卡
              name: 'addDiscountCard',
              meta: {
                title: '编辑折扣卡',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/addDiscountCard.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/membershipLevel',   // 营销——会员等级
              name: 'membershipLevel',
              meta: {
                title: '会员等级',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_level/membershipLevel.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/hform',   // 营销——高级表单
              name: 'hform',
              meta: {
                title: '高级表单',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/hform/hformList.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/hform/addHForm',   // 营销——新增高级表单
              name: 'addHForm',
              meta: {
                title: '新增高级表单',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/hform/addHForm.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/hform/finishForm',   // 营销——新增高级表单
              name: 'finishForm',
              meta: {
                title: '新增高级表单',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/hform/finishForm.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/hform/mainHForm',   // 营销——编辑表单内容上下排版
              name: 'mainHForm',
              meta: {
                title: '编辑表单内容',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/hform/mainHForm.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/hform/mainHFormOne',   // 营销——编辑表单内容左右排版
              name: 'mainHFormOne',
              meta: {
                title: '编辑表单内容',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/hform/mainHFormOne.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/hform/answerList',   // 营销——高级表单作答列表
              name: 'answerList',
              meta: {
                title: '作答列表',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/hform/answerList.vue'], resolve),
            },{
              path: '/wf/admin/shop/markting/hform/answerDetails',   // 营销——高级表单详情
              name: 'answerDetails',
              meta: {
                title: '报告',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/hform/answerDetails.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/pointsMall',   // 营销——积分商城
              name: 'pointsMall',
              meta: {
                title: '积分商城',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/points_mall/pointsMall.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/pointsMall/addRedeemGoods',   // 营销——新增兑换商品
              name: 'addRedeemGoods',
              meta: {
                title: '编辑兑换商品',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/points_mall/addRedeemGoods.vue'], resolve)
            },
            {
              path: '/wf/admin/shop/markting/pointMarkting',   // 营销——积分营销
              name: 'pointMarkting',
              meta: {
                title: '积分营销',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/point_markting/pointMarkting.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/pointMarkting/editRules',   // 营销——积分营销——编辑规则
              name: 'editRules',
              meta: {
                title: '编辑规则',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/point_markting/editRules.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/crossBorderPurchase',   // 跨境购
              name: 'crossBorderPurchase',
              meta: {
                title: '跨境购',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/crossBorderPurchase/crossBorderPurchase.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/electronicFace',   // 电子面单
              name: 'electronicFace',
              meta: {
                title: '电子面单',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/electronicFace/electronicFace.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/goodcircle',   // 好物圈
              name: 'goodcircle',
              meta: {
                title: '好物圈',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/markting/goodcircle.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/checkIn',   // 签到
              name: 'checkIn',
              meta: {
                title: '签到',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/checkIn/checkIn.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/goldenEgg',   // 砸金蛋
              name: 'goldenEgg',
              meta: {
                title: '砸金蛋',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/goldenEgg/goldenEgg.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/goldenEgg/editGoldenEgg',   // 新增、编辑砸金蛋
              name: 'editGoldenEgg',
              meta: {
                title: '编辑砸金蛋',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/goldenEgg/editGoldenEgg.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/enterStore',   // 进店有礼
              name: 'enterStore',
              meta: {
                title: '进店有礼',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/enterStore/enterStore.vue'], resolve),
            },
            {
              path: '/wf/admin/shop/markting/enterStore/editEnterStore',   // 新增、编辑进店有礼
              name: 'editEnterStore',
              meta: {
                title: '编辑进店有礼',
                requireAuth:true
              },
              component:(resolve) => require(['@/components/WF_admin/shop_admin/enterStore/editEnterStore.vue'], resolve),
            }
      ]
    },
    {
      path: '/',   //用户列表
      name: 'userList',
      meta: {
        title: '用户列表',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children: [
        {
          path: '/wf/admin/shop/userList',   //用户列表
          name: 'userList',
          meta: {
            title: '用户列表',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/userList.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/userList/pointsDetails',   // 用户列表——积分明细
          name: 'pointsDetails',
          meta: {
            title: '积分明细',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/pointsDetails.vue'], resolve)
        },
        {
          path: '/wf/admin/shop/userList/accountDetails',   // 用户列表——账目明细
          name: 'accountDetails',
          meta: {
            title: '账目明细',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/accountDetails.vue'], resolve)
        },
        {
          path: '/wf/admin/shop/userList/memberInformation',   // 用户列表——会员信息
          name: 'memberInformation',
          meta: {
            title: '会员信息',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/memberInformation.vue'], resolve)
        },
        {
          path: '/wf/admin/shop/userList/memberInformation/givePointRecord',   // 用户列表——会员信息——给积分操作记录
          name: 'givePointRecord',
          meta: {
            title: '积分操作记录',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/givePointRecord.vue'], resolve)
        },
        {
          path: '/wf/admin/shop/userList/memberInformation/changeLevelRecord',   // 用户列表——会员信息——改等级操作记录
          name: 'changeLevelRecord',
          meta: {
            title: '等级操作记录',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/changeLevelRecord.vue'], resolve)
        },
        {
          path: '/wf/admin/shop/userList/memberInformation/rechargeRecord',   // 用户列表——会员信息——改余额操作记录
          name: 'rechargeRecord',
          meta: {
            title: '余额操作记录',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/membership_card/rechargeRecord.vue'], resolve)
        },
      ]
    },
    {
      path: '/',   //设置
      name: 'setting',
      meta: {
        title: '设置',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children:[
        {
          path: '/wf/admin/shop/shop_settings',   // 店铺设置
          name: 'shop_settings',
          meta: {
            title: '店铺设置',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/setting/shop_settings.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/employee_management',   //员工管理
          name: 'shop_employee_management',
          meta: {
            title: '员工管理',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/employee_management/employee_management.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/freight_management',   //运费管理
          name: 'freight_management',
          meta: {
            title: '运费管理',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/freight_management/fare.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/freight_management/addSpecialModal',   //新增运费模板
          name: 'addSpecialModal',
          meta: {
            title: '新增运费模板',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/freight_management/addSpecialModal.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/xcx_exchangerate',   //小程序——实时汇率
          name: 'shop_xcx_exchangerate',
          meta: {
            title: '实时汇率',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/xcx/xcx_exchangerate.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/self_point_management',   // 自提点管理
          name: 'self_point_management',
          meta: {
            title: '自提点管理',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/setting/self_point_management.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/self_point_management/add_self_point',   // 新增自提点
          name: 'add_self_point',
          meta: {
            title: '编辑自提点',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/setting/add_self_point.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/sku_setting',   // 常用规格设置
          name: 'sku_setting',
          meta: {
            title: '常用规格设置',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/setting/sku_setting.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/shopAddress',   // 店铺地址
          name: 'shopAddress',
          meta: {
            title: '店铺地址',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/setting/shop_address.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/shopAddress/editShopAddress',   // 编辑店铺地址
          name: 'editShopAddress',
          meta: {
            title: '编辑店铺地址',
            requireAuth: true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/setting/edit_shop_address.vue'], resolve),
        }
      ]
    },
    {
      path: '/',   // 小程序
      name: 'xcx',
      meta: {
        title: '小程序',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children:[
        {
          path: '/wf/admin/shop/xcx_setting',   //小程序——小程序设置
          name: 'xcx_setting',
          meta: {
            title: '小程序设置',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/xcx/xcx_setting.vue'], resolve),
        },
        {
          path: '/wf/admin/shop/xcx_experience',   //小程序——小程序体验
          name: 'shop_xcx_experience',
          meta: {
            title: '小程序体验',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/xcx/xcx_experience.vue'], resolve),
        },
        // {
        //   path: '/wf/admin/shop/xcx_experience/xcx_release',   //小程序——小程序设置
        //   name: 'xcx_release',
        //   meta: {
        //     title: '小程序设置',
        //   },
        //   component:(resolve) => require(['@/components/WF_admin/shop_admin/xcx/xcx_release.vue'], resolve),
        // },
        {
          path: '/wf/admin/shop/template_message',   //小程序——模板消息
          name: 'template_message',
          meta: {
            title: '模板消息',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/xcx/template_message.vue'], resolve),
        },{
          path: '/wf/admin/shop/publish',   //小程序——小程序发布
          name: 'publish',
          meta: {
            title: '小程序发布',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/xcx/publish.vue'], resolve),
        },
      ]
    },
    {
      path: '/',   //概括页面
      name: 'shop_index',
      meta: {
        title: '概览',
        requireAuth:true
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/index.vue'], resolve),
      children:[
        {
          path: '/wf/admin/newshop',   //概括页面
          name: 'newshop',
          meta: {
            title: '概览',
            requireAuth:true
          },
          component:(resolve) => require(['@/components/WF_admin/shop_admin/overview/overview.vue'], resolve),
        },
      ]
    },
    {
      path: "/wf/admin/shop/shop_login",
      meta: {
        title: '万帆集团',
      },
      component:(resolve) => require(['@/components/WF_admin/shop_admin/shop_login.vue'], resolve)
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


//路由拦截处理
router.beforeEach((to, from, next) => {
  let userToken = localStorage.getItem('userId');
  let agentToken = localStorage.getItem('agentId');
  /* 路由发生变化修改页面meta */
  if(window.location.origin==='https://source1.19mini.com'
  ||window.location.origin==='https://source.19mini.com'
  ||window.location.origin==='https://www.19mini.com'
  ||window.location.origin==='https://dev.19mini.com'
  ||window.location.origin==='https://m.19mini.com'
  ||window.location.origin==='https://dev.m.19mini.com'
  ||window.location.origin==='http://localhost:8080'
  ||window.location.origin==='http://localhost:8081'
  ){
    Vue.prototype.url=process.env.BASE_API+'/';
  }else{
    Vue.prototype.url=process.env.OEM_BASE_API+'/';
  }
  Vue.prototype.newurl=process.env.BASE_NEWAPI+'/';
  // Vue.prototype.url_no=process.env.BASE_API;
  Vue.prototype.locUrl=window.location.origin+'/';
  // Vue.prototype.url='http://dev.19mini.com/';
  //是否有必要对路由拦截处理标识requireAuth===true
  if(to.meta.requireAuth){
    //代理商
    if(to.path.includes('bkmanagement')){
      if(agentToken){
          next();
      }else{
          localStorage.setItem('activeName','second');
          localStorage.removeItem('agentId');
          localStorage.removeItem('is_agent');
          localStorage.removeItem('agentPhone');
          next({
            path: '/wf/index/login',
          })
      }
    }else if(to.path.includes('shop_login')){
        next();
    }else{
      if(userToken){
        next();
      }else{
          localStorage.setItem('activeName','first');
          localStorage.removeItem('userId');
          localStorage.removeItem('secretId');
          localStorage.removeItem('is_agent');
          localStorage.removeItem('userPhone');
          next({
            path: '/wf/index/login',
          })
      }
    }
  }
  if(userToken&&sessionStorage.getItem("super")&&sessionStorage.getItem("super").includes('super')){
    sessionStorage.removeItem("super")
    next();
  }else{
    next()
  }
})



export default router;

