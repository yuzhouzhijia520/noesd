import $axios from "@/axios";//需token的接口
import newdomain from '@/server/newcommonheader';
    /**
     * @description 小程序发布申请list
     * @document newadd_goods.vue
     */
    export function  gettablelist(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(newdomain+"/shop/v1/products/groupChildList",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}

    /**
     * @description 商品组下的商品分类添加

     * @document editshopgroup.vue
     */
    export function  goodTypeAdd(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(newdomain+"/shop/v1/products/goodTypeAdd",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
export function  del(data) {//删除接口
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(newdomain+"/shop/v1/products/groupChildDel",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
export function  addshop(data) {//添加商品接口
    　　　　 class Processor { 
                constructor(res) {
                    return res;
                }
            };
            return new Promise((resolve, reject) => {
    　　　　　　 $axios.post(newdomain+"/shop/v1/products/goodAdd",data).then((result) => {
    　　　　　　　　 resolve(new Processor(result));
    　　　　　　 }).catch((result) => {
    　　　　　　　　 reject(new Processor(result));
    　　　　　　 })
    　　　　});
    　　}
    /**
     * 
     * @param {data} 查询已添加商品接口参数 
     */
    export function  VendorTradeGoods(data) {
　　　　 class Processor { 
            constructor(res) {
                return res;
            }
        };
        return new Promise((resolve, reject) => {
　　　　　　 $axios.post(newdomain+"/shop/v1/products/groupChildListUnPage",data).then((result) => {
　　　　　　　　 resolve(new Processor(result));
　　　　　　 }).catch((result) => {
　　　　　　　　 reject(new Processor(result));
　　　　　　 })
　　　　});
　　}
    
        
