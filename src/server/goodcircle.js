import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 版本升级判断
     */
    export function  getbutton(data) {//获取是否开启按钮
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {//好物圈是否开启
　　　　　　 $axios.post(domain+"/shopapi/marketing/marketingGood",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    export function  open(data) {//开启关闭好物圈
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {//好物圈是否开启
　　　　　　 $axios.post(domain+"/shopapi/marketing/storeMarketing",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
    }
    export function  opens(data) {//开启关闭推荐
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {//好物圈是否开启
　　　　　　 $axios.post(domain+"/shopapi/marketing/marketingGood",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
    }