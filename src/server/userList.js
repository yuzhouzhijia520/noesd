import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 用户列表
     * @document @/shop_admin/membership_card/userList.vue
     */
    export function  getUserList(data) {
        　　　　 class Processor { 
                    constructor(res) {
                        return res;
                    }
                };
                return new Promise((resolve, reject) => {
        　　　　　　 $axios.post(domain+"/shopapi/member_card/memberlist",data).then((result) => {
        　　　　　　　　 resolve(new Processor(result));
        　　　　　　 }).catch((result) => {
        　　　　　　　　 reject(new Processor(result));
        　　　　　　 })
        　　　　});
        　　}
    /**
     * @description 充值金额
     * @document @/shop_admin/membership_card/userList.vue
     */
    export function  rechargeSave(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/member_card/balanceUpd",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    /**
     * @description 获取用户列表拥有的营销工具id
     * @document @/shop_admin/membership_card/userList.vue
     */
    export function  getModularSwitch(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/member_card/modularSwitch",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
/**
 * @description 余额操作记录
 * @document @/shop_admin/membership_card/rechargeRecord.vue
 */
export function  rechargeRecordList(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
　　    $axios.post(domain+"/shopapi/member_card/balanceRecord",data).then((result) => {
　　　　    resolve(new Processor(result));
　　　　}).catch((result) => {
　　　　    reject(new Processor(result));
　　　　})
　　});
}