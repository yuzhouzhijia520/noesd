import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
import newdomain from '@/server/newcommonheader';
    /**
         * @description 小程序发布
         * @document publish.vue
         */
    export function  getPublishData() {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let data={
            secret: localStorage.getItem("secretId"),
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Application/versionManage",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
     * @description 小程序发布 提交审核
     * @document publish.vue
     */
    export function  submitPublish() {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let data={
            secret: localStorage.getItem("secretId"),
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Application/submitVersion",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
     * @description 小程序发布 重新发布体验版
     * @document publish.vue
     */
    export function  againSubmitPublish() {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let data={
            secret: localStorage.getItem("secretId"),
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Application/releaseSubmitVersion",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    

    /**
    * @description 子集功能开关展示
    * @document xcx_exchangerate.vue
    */
   export function  modularSetting(data) {
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


    /**
    * @description 子集功能开关更新
    * @document xcx_exchangerate.vue
    */
    export function  modularUpstate(data) {
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
