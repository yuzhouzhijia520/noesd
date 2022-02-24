import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
import newdomain from '@/server/newcommonheader';
import axios from "axios";//无需token的接口

/**
* @description 子集功能开关更新
* @document order.vue
*/
export function modularsUpdate(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/modulars/update",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 子集功能开关展示
* @document order.vue
*/
export function modularsIndex(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/modulars/index",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}