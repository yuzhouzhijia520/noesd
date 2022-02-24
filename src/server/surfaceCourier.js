import axios from "axios";//无需token的接口
import newdomain from '@/server/newcommonheader';
import $axios from "@/axios";//需token的接口

/**
* @description 电子面单快递公司列表
* @document surfaceCourier.vue
*/
export function expressIndex(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/orders/expressIndex",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 电子面单发货地址添加/编辑
* @document surfaceCourier.vue
*/
export function expressAddressAdd(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/orders/expressAddressAdd",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 电子面单发货地址信息/编辑回填
* @document surfaceCourier.vue
*/
export function expressAddressInfo(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/orders/expressAddressInfo",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 电子面单发货地址删除
* @document surfaceCourier.vue
*/
export function expressAddressDel(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/orders/expressAddressDel",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}