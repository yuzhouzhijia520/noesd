import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
import newdomain from '@/server/newcommonheader';
/**
 * @description 评价列表
 * @document @/shop_admin/order/evaluation.vue
 */
export function  evaluationGetData(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
        $axios.post(newdomain+"/shop/v1/orders/evaluateIndex",data).then((result) => {
            resolve(new Processor(result));
        }).catch((result) => {
            reject(new Processor(result));
        })
    });
}
/**
 * @description 评价概括信息
 * @document @/shop_admin/order/evaluation.vue
 */
export function  evaluationGeneralize(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
        $axios.post(newdomain+"/shop/v1/orders/generalize",data).then((result) => {
            resolve(new Processor(result));
        }).catch((result) => {
            reject(new Processor(result));
        })
    });
}
/**
 * @description 订单评价回复
 * @document @/shop_admin/order/evaluation.vue
 */
export function  evaluationReply(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
        $axios.post(newdomain+"/shop/v1/orders/shopReply",data).then((result) => {
            resolve(new Processor(result));
        }).catch((result) => {
            reject(new Processor(result));
        })
    });
}