import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 版本升级判断
     */
    export function  getdetail(data) {//获取列表接口
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {//营销工具市场获取类表
　　　　　　 $axios.post(domain+"/shopapi/marketing/show",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    export function  paymoney(data) {//获取列表接口
        　　　　 class Processor { 
                    constructor(res) {
                        return res;
                    }
                };
                
                return new Promise((resolve, reject) => {//营销工具市场获取类表
        　　　　　　 $axios.post(domain+"/shopapi/marketing/add",data).then((result) => {
        　　　　　　　　 resolve(new Processor(result));
        　　　　　　 }).catch((result) => {
        　　　　　　　　 reject(new Processor(result));
        　　　　　　 })
        　　　　});
    　　}