import $axios from "@/axios";
import newdomain from '@/server/newcommonheader';
    /**
    * @description 高级表单创建表单第一步
    * @document hformlist.vue
    */
    export function  initialUpdate(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/initialUpdate",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 高级表单创建表单第二步
    * @document hformlist.vue
    */
    export function  contentUpdate(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/contentUpdate",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 高级表单列表
    * @document hformlist.vue
    */
    export function  hformlist(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/index",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 高级表单状态修改
    * @document hformlist.vue
    */
   export function  updateState(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/updateState",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 高级表单编辑第一步回显
    * @document addHForm.vue
    */
   export function  initialEdit(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/initialEdit ",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

    /**
    * @description 高级表单编辑第二步回显
    * @document mainHForm.vue
    */
   export function  hfEdit(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/edit",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }


     /**
    * @description 高级表单作答列表
    * @document answerList.vue
    */
   export function  userIndex(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/userIndex",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }

     /**
    * @description 高级表单作答详情
    * @document answerDetails.vue
    */
   export function  userDetail(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/userDetail",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }
    

    /**
    * @description 高级表单作答列表状态更新
    * @document answerList.vue
    */
   export function  answerState(data) {
        class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
            $axios.post(newdomain+"/shop/v1/forms/answerState",data).then((result) => {
                resolve(new Processor(result));
            }).catch((result) => {
                reject(new Processor(result));
            })
        });
    }