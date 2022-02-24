import $axios from "@/axios";//需token的接口
import newdomain from '@/server/newcommonheader';
    /**
     * @description Marketing - 后台-定金回显
     * @document depositAdd.vue
     */
    export function  getGoodInfo(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(newdomain+"/shop/v1/products/getGoodInfo",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description - 后台-定金膨胀添加/编辑
     * @document depositAdd.vue
     */
    export function  frontAdd(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(newdomain+"/shop/v1/Marketing/frontAdd",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description - 后台-定金膨胀回显
     * @document depositAdd.vue
     */
    export function  frontShow(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(newdomain+"/shop/v1/Marketing/frontShow",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}