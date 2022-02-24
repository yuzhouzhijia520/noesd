import axios from "axios";//无需token的接口
import newdomain from '@/server/newcommonheader';
import domain from '@/server/commonheader';
import $axios from "@/axios";//需token的接口

/**
* @description 定金膨胀列表
* @document checkIn.vue
*/
export function getDepositList(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/Marketing/frontIndex",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 定金膨胀开始/暂停/终止/删除
* @document checkIn.vue
*/
export function depositFrontEdit(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/Marketing/frontEdit",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}