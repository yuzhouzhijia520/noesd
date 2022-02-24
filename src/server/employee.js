import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
    * @description 子集功能开关更新
    * @document xcx_exchangerate.vue
    */
    export function  staffCode(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(domain+"/shopapi/staff/staffCode",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }
