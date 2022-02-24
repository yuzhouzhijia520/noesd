import axios from "axios";//无需token的接口
import newdomain from '@/server/newcommonheader';
import domain from '@/server/commonheader';
import $axios from "@/axios";//需token的接口

/**
* @description 获取用户购买力排行
* @document hotTop.vue
*/
export function hotTopImg(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(newdomain+"/shop/v1/data/userRank",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　　　reject(new Processor(result));
　　　　})
　　});
}