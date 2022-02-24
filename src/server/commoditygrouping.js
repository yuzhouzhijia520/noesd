import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
import newdomain from '@/server/newcommonheader';

    /**
     * @description 版本升级判断
     */
    export function  getgroupinglist(data) {//获取列表
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(newdomain+"/shop/v1/products/goodGroupList",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    export function  dels(data) {//删除分类
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.post(newdomain+"/shop/v1/products/goodGroupDel",data).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}
    export function  addedit(data) {//编辑添加分类
        　　　　 class Processor { 
                    constructor(res) {
                        return res;
                    }
                };
                return new Promise((resolve, reject) => {
        　　　　　　 $axios.post(newdomain+"/shop/v1/products/goodGroupAdd",data).then((result) => {
        　　　　　　　　 resolve(new Processor(result));
        　　　　　　 }).catch((result) => {
        　　　　　　　　 reject(new Processor(result));
        　　　　　　 })
        　　　　});
        　　}
        export function  getonelist(data) {//获取一级分类
            　　　　 class Processor { 
                        constructor(res) {
                            return res;
                        }
                    };
                    return new Promise((resolve, reject) => {
            　　　　　　 $axios.post(newdomain+"/shop/v1/products/aType ",data).then((result) => {
            　　　　　　　　 resolve(new Processor(result));
            　　　　　　 }).catch((result) => {
            　　　　　　　　 reject(new Processor(result));
            　　　　　　 })
            　　　　});
            　　}
            export function  typeBelong(data) {//添加编辑所属分类
                　　　　 class Processor { 
                            constructor(res) {
                                return res;
                            }
                        };
                        return new Promise((resolve, reject) => {
                　　　　　　 $axios.post(newdomain+"/shop/v1/products/typeBelong ",data).then((result) => {
                　　　　　　　　 resolve(new Processor(result));
                　　　　　　 }).catch((result) => {
                　　　　　　　　 reject(new Processor(result));
                　　　　　　 })
                　　　　});
                　　}

