import axios from "axios";//无需token的接口
import newdomain from '@/server/newcommonheader';
import domain from '@/server/commonheader';
import $axios from "@/axios";//需token的接口

/**
* @description 获取进店有礼列表
* @document enterStore.vue
*/
export function enterStoreList(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/shop_come/index",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 进店有礼删除
* @document enterStore.vue
*/
export function enterStoreDel(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/shop_come/del",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 进店有礼暂停、开启
* @document enterStore.vue
*/
export function enterStoreStop(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/shop_come/stop",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 进店有礼终止
* @document enterStore.vue
*/
export function enterStoreSuspend(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/shop_come/suspend",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 新建、编辑进店有礼保存
* @document enterStore.vue
*/
export function enterStoreSave(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/shop_come/store",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}
/**
* @description 进店有礼编辑回填数据
* @document enterStore.vue
*/
export function enterStoreEdit(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/shop_come/Info",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}