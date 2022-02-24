import $axios from "@/axios";//需token的接口
import domain from '@/server/commonheader';
    /**
     * @description 省份城市查询
     * @document addSpecialModal.vue
     */
    export function  getShowAddress(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/freight/address",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 省份所有城市查询
     * @document addSpecialModal.vue
     */
    export function  getAllProvince(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/freight/allprovince",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

     /**
     * @description 查询全部后台个性化运费单列表
     * @document specialModal.vue
     */
    export function  getShowTemplate(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Freight/show",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}


     /**
     * @description 可配送区域列表获取
     * @document addSpecialModal.vue
     */
    export function  addTemplate(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Freight/add",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}


    /**
     * @description 查询全部后台个性化运费单列表
     * @document specialModal.vue
     */
    export function  getShowlist(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/Freight/showlist",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}


    /**
     * @description 删除个性化模版内列表数据
     * @document specialModal.vue
     */
    export function  deleteList(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/freight/del",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 复制个性化模板
     * @document  specialModal.vue
     */
    export function  copyFare(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/freight/copy",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 快递公司
     * @document  fastMail.vue
     */
    export function  expressIndex(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/address/expressIndex",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 删除快递公司
     * @document  fastMail.vue
     */
    export function  expressDel(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/address/expressDel",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 商家后台物流公司常用设置
     * @document  fastMail.vue
     */
    export function  expressState(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/address/expressState",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 商家后台物流公司添加/编辑
     * @document  fastMail.vue
     */
    export function  expressEdit(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(domain+"/shopapi/address/expressEdit",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}