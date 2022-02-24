import $axios from "@/axios";
import newdomain from '@/server/newcommonheader';
    /**
    * @description 满减列表
    * @document fullslice.vue
    */
    export function  cutIndex(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/Marketing/cutIndex",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 满减列表
    * @document addFullslice.vue
    */
   export function  cutAdd(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/Marketing/cutAdd",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 满减开始/暂停/终止/删除
    * @document fullslice.vue
    */
   export function  cutEdit(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/Marketing/cutEdit",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 满减回显
    * @document addFullslice.vue
    */
   export function  cutShow(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/Marketing/cutShow",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }