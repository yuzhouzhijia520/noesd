import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';

    export function  getmylist(data) {//获取列表接口
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {//营销工具市场获取类表
　　　　　　 $axios.post(domain+"/shopapi/marketing/index",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    export function  select(data) {//获取列表接口
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {//营销工具市场获取类表
　　　　　　 $axios.post(domain+"/shopapi/marketing/switchState",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}