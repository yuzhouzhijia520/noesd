import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
import newdomain from '@/server/newcommonheader';
    /**
     * @description 小程序设置
     * @document xcx_setting.vue
     */
    export function  getCountry(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Application/countryList",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}