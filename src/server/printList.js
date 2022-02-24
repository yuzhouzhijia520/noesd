import axios from "axios";//无需token的接口
import newdomain from '@/server/newcommonheader';
import $axios from "@/axios";//需token的接口

/**
* @description 打印员列表
* @document printList.vue
*/
export function printListGet(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/users/printerUsers",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 打印员列表更新打印员
* @document printList.vue
*/
export function updatePrintLister(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/orders/printerUpd",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}