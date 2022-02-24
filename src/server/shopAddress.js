import $axios from "@/axios";//需token的接口
import axios from "axios";//无需token的接口
import domain from '@/server/commonheader';
/**
 * @description 店铺地址列表
 * @document @/shop_admin/setting/shop_address.vue
 */
export function  shopAddressGetData(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
        $axios.post(domain+"/shopapi/fan_address/index",data).then((result) => {
            resolve(new Processor(result));
        }).catch((result) => {
            reject(new Processor(result));
        })
    });
}
/**
 * @description 添加店铺地址
 * @document @/shop_admin/setting/edit_shop_address.vue
 */
export function  shopAddressAdd(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
        axios.post(domain+"/shopapi/fan_address/add",data).then((result) => {
            resolve(new Processor(result));
        }).catch((result) => {
            reject(new Processor(result));
        })
    });
}
/**
 * @description 编辑店铺地址数据回填
 * @document @/shop_admin/setting/edit_shop_address.vue
 */
export function  shopAddressShow(data) {
    　　class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(domain+"/shopapi/fan_address/show",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }
/**
 * @description 编辑店铺地址
 * @document @/shop_admin/setting/edit_shop_address.vue
 */
export function  shopAddressEdit(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
        axios.post(domain+"/shopapi/fan_address/edit",data).then((result) => {
            resolve(new Processor(result));
        }).catch((result) => {
            reject(new Processor(result));
        })
    });
}
/**
 * @description 删除店铺地址
 * @document @/shop_admin/setting/edit_shop_address.vue
 */
export function  shopAddressDelete(data) {
　　class Processor { 
        constructor(res) {
            return res;
        }
    };
    return new Promise((resolve, reject) => {
        axios.post(domain+"/shopapi/fan_address/delete",data).then((result) => {
            resolve(new Processor(result));
        }).catch((result) => {
            reject(new Processor(result));
        })
    });
}