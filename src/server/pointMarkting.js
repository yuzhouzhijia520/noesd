import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
import newdomain from '@/server/newcommonheader';
    /**
    * @description 积分规则列表
    * @document pointMarkting.vue
    */
    export function  pointMarktingData() {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let data = {
            token: localStorage.getItem("userId"),
            secret: localStorage.getItem("secretId")
        }
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/integral/index",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
    * @description 积分规则开关数据回填
    * @document pointMarkting.vue
    */
   export function  pointMarktingSwitchData() {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let data = {
            token: localStorage.getItem("userId"),
            secret: localStorage.getItem("secretId")
        }
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/program/compile",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
    * @description 积分规则开关
    * @document pointMarkting.vue
    */
   export function  pointMarktingSwitch(val,id) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let state = ""
        if(id!=""){
            if(val===true){
                state = 0
            }else{
                state = 1
            }
        }else{
            if(val===true){
                state = 1
            }else{
                state = 0
            }
        }
        let data = {
            token: localStorage.getItem("userId"),
            secret: localStorage.getItem("secretId"),
            modular_id: 29,
            state: state
        }
        if(id!=""){
            data.id = id
        }
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/integral/switch",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
/**
* @description 判断签到开关
* @document hotTop.vue
*/
export function pointMarktingCheckOpen(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/integral/sign_switch",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}