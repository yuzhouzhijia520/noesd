import axios from "axios";//无需token的接口
import newdomain from '@/server/newcommonheader';
import domain from '@/server/commonheader';
import $axios from "@/axios";//需token的接口

/**
* @description 获取砸金蛋列表
* @document goldenEgg.vue
*/
export function goldenEggList(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/eggs/index",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 金蛋活动状态更新/删除
* @document goldenEgg.vue
*/
export function goldenEggDelete(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/eggs/updateState",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 金蛋活动编辑/添加
* @document goldenEgg.vue
*/
export function goldenEggUpdate(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/eggs/update",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 金蛋活动编辑数据回填
* @document goldenEgg.vue
*/
export function goldenEggEdit(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/eggs/edit",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}