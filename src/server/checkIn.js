import axios from "axios";//无需token的接口
import newdomain from '@/server/newcommonheader';
import domain from '@/server/commonheader';
import $axios from "@/axios";//需token的接口

/**
* @description 获取优惠券列表
* @document checkIn.vue
*/
export function getCuponList(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/member_card/choose",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 签到保存
* @document checkIn.vue
*/
export function checkSave(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/Marketing/signOperate",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 签到数据回填
* @document checkIn.vue
*/
export function checkEditInfo(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/Marketing/signInfo",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}