import axios from "axios";//无需token的接口
import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
import newdomain from '@/server/newcommonheader';
    /**
    * @description 首页图表
    * @document echartCount.vue
    */
    export function  echartcount(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            axios.post(domain+"/shopapi/order/echartcount",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 获取概览页数据
    * @document realdata.vue
    */
    export function  count(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            axios.post(domain+"/shopapi/order/count",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }


    /**
    * @description 后台-热销商品排行榜
    * @document likeness.vue
    */
    export function  goodRank(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/data/goodRank",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }
