import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 砍价列表
     * eBargain.vue
     */
    export function  marketingInfo(data) {//砍价列表
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {//砍价列表
　　　　　　 $axios.post(domain+"/shopapi/shop_decoration/marketingInfo",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 获取砍价跳转路径
     * eBargain.vue
     */
    export function  getPath(data) {//获取砍价跳转路径
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {//获取砍价跳转路径
　　　　　　 $axios.post(domain+"/shopapi/shop_decoration/shopMarketing",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}