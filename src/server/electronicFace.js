import axios from "axios";//无需token的接口
import newdomain from '@/server/newcommonheader';
import $axios from "@/axios";//需token的接口

/**
* @description 电子面单列表
* @document electronicFace.vue
*/
export function electronicFaceIndex(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/electrons/index",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 判断是否开通物流助手
* @document electronicFace.vue
*/
export function electronicModularSwitch(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/Marketing/modularSwitch",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}