import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
    * @description 会员管理——会员列表给积分保存接口
    * @document @/shop_admin/membership_card/memberList.vue
    */
    export function  memberListGivePoint(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/member_card/changeIntegral",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
    * @description 会员管理——会员列表改等级保存接口
    * @document @/shop_admin/membership_card/memberList.vue
    */
   export function  memberListChangeLevel(data) {
    class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/member_card/changeRank",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}