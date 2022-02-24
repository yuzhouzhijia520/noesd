import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
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
    　　　　　　 $axios.post(domain+"/shopapi/goods/member",data).then((result) => {
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