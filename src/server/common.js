import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 版本升级判断
     */
    export function  getAuditApplicationList(id) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        let data={
            only_iden: id,
            secret: localStorage.getItem("secretId")
        }
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/edition/editionIndex",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}


