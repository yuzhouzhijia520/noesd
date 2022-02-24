import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 版本升级判断
     */
    export function  getmaterialllist(data) {//获取列表接口
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/special_topic/special/index",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    export function  getmateriallfenleilist(data) {//获取分类接口
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.post(domain+"/special_topic/category/index",data).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}
    export function  delgetmaterialllist(data) {//删除文章接口
        　　　　 class Processor { 
                    constructor(res) {
                        return res;
                    }
                };
                
                return new Promise((resolve, reject) => {
        　　　　　　 $axios.post(domain+"/special_topic/special/destroy",data).then((result) => {
        　　　　　　　　 resolve(new Processor(result));
        　　　　　　 }).catch((result) => {
        　　　　　　　　 reject(new Processor(result));
        　　　　　　 })
        　　　　});
        　　}

