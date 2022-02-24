import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
import newdomain from '@/server/newcommonheader';
    /**
     * @description 小程序发布申请list
     * @document newadd_goods.vue
     */
    export function  getTypeindex(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Goodtype/typeindex",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
     * @description 淘宝采集
     * @document newadd_goods.vue
     */
    export function  getTBGoodInfo(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/common/getTBGoodInfo",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 淘宝采集图片后传入万帆cdn服务器
     * @document newadd_goods.vue
     */
    export function  putObject(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/common_api/qcloud/putObject",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
     * @description 规格名称
     * @document newadd_goods.vue
     */
    export function getSpec(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/default_spec/fatherIndex",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 规格值
     * @document newadd_goods.vue
     */
    export function getSpecVal(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/default_spec/sonIndex",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 交易积分
     * @document newadd_goods.vue
     */
    export function getPointMarkting(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/integral/index",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 保存
     * @document newadd_goods.vue
     */
    export function save(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Goods/newAddGood",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 编辑回显数据
     * @document newadd_goods.vue
     */
    export function getEditData(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/goods/getFormatInfo",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
   /**
    * @description 商品——添加商品——获取会员等级前三个
    * @document shop_list/add_shop.vue
    */
    export function  addGoodGetMemberPrice(data) {
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.get(domain+"/shopapi/goods/member?pro_id="+data.pro_id).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}
        /**
        * @description 商品——添加商品——获取分销设置数据
        * @document shop_list/add_shop.vue
        */
        export function  addGoodGetDisSetting(data) {
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.post(domain+"/distributionhome/Distributionlist/disSetting",data).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}
        /**
        * @description 商品——添加商品——获取店铺统一运费
        * @document shop_list/add_shop.vue
        */
        export function  addGoodGetShowTemplate(data) {
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.post(domain+"/shopapi/Freight/showTemplate",data).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}
        /**
        * @description 商品——添加商品——获取个性化运费模板
        * @document shop_list/add_shop.vue
        */
        export function  addGoodGetFreightShow(data) {
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.post(domain+"/shopapi/Freight/show",data).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}

        /**
        * @description 	批量设置状态 0:批量下架 1:批量上架 2:批量删除 3:批量设置积分
        * @document shop_list/shop_list.vue
        */
       export function  batchGood(data) {
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.post(domain+"/shopapi/goods/batchGood",data).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}

        /**
        * @description 	商品分组列表无分页
        * @document shop_list/shop_list.vue
        */
       export function  goodGroupUnPage(data) {
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            return new Promise((resolve, reject) => {
                $axios.post(newdomain+"/shop/v1/products/goodGroupUnPage",data).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}
        
