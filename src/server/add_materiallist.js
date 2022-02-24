import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 版本升级判断
     */
    export function  editlist(data) {//编辑回填数据
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
    export function  addlist(data) {//添加数据
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.post(domain+"/special_topic/special/store",data).then((result) => {
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
        export function  delgetmateriallfenleilist(data) {//删除分类接口
            　　　　 class Processor { 
                        constructor(res) {
                            return res;
                        }
                    };
                    
                    return new Promise((resolve, reject) => {
            　　　　　　 $axios.post(domain+"/special_topic/category/destroy",data).then((result) => {
            　　　　　　　　 resolve(new Processor(result));
            　　　　　　 }).catch((result) => {
            　　　　　　　　 reject(new Processor(result));
            　　　　　　 })
            　　　　});
            　　}
            export function  addfenleisunb(data) {//删除分类接口
                　　　　 class Processor { 
                            constructor(res) {
                                return res;
                            }
                        };
                        
                        return new Promise((resolve, reject) => {
                　　　　　　 $axios.post(domain+"/special_topic/category/store",data).then((result) => {
                　　　　　　　　 resolve(new Processor(result));
                　　　　　　 }).catch((result) => {
                　　　　　　　　 reject(new Processor(result));
                　　　　　　 })
                　　　　});
                　　}
            
       
