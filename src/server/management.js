import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 小程序分类管理---控制开关 开启/关闭
     * @document class_management.vue
     */
    export function  setMasterSwitch() {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let data={
            secret: localStorage.getItem("secretId"),
            modular_id:31,
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/function_switch/masterSwitch",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
     * @description 小程序分类管理--数据回填
     * @document class_management.vue
     */
    export function  getCompile() {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let data={
            secret: localStorage.getItem("secretId"),
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/program/compile",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
