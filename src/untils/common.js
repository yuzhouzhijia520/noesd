/**
时间戳转换
*/
export function dateFormat(time, cFormat) {

    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

 /**
   * 函数去抖，保证在一段时间内，被调用函数只是执行一次
   * @param {*} func 调用用的函数，function
   * @param {*} wait 等待的时间，单位ms
   * @param {*} immediate  当immediate为true时，第一次调用该函数的时候，就调用func函数；false表示超时之后再调用
   */
  export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
  
    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp
  
      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
  
    return function(...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
  
      return result
    }
  }

/**
 * 大图压缩url转换
 * @params url:cdn地址 type:图片质量类型(w、h、format、q、rq、lq) param:(quality、png格式等)
 * 
 */
export function imgFormat(url,type,param) {
  let urlParamsData=url.split('.');
  let newCdnData=urlParamsData[0].split('//');
  newCdnData.splice(0,1,'https:');
  newCdnData.splice(1,1,'cdn4');
  urlParamsData[0]=newCdnData.join('//');
  let urlParamsStr=urlParamsData.join('.');
  return urlParamsStr+"?imageView2/"+type+'/'+param;
}

 /**
   * 输入框输入内容长度限制
   * @param str 内容
   * @param maxLength 长度
   */
  export function widthCheck(str, maxLenth) {
    let w = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
        if (w > maxLenth) {
            str = str.substr(0, i);
            break;
        }
    }
    return str;
}

/**
   * DIY 处理pc->mobile比例 
   * @param num 内容
   * @description 
   * 1.以宽*高 375 * 667 px为mobile基准
   * 2.宽320px为PC基准
   */
  export function computeScaleP_M(num) {
    return 375/320*parseInt(num);
  }

/**
   * DIY 处理mobile->pc比例 
   * @param num 内容
   * @description 
   * 1.以宽*高 375 * 667 px为mobile基准
   * 2.宽320px为PC基准
   */
  export function computeScaleM_P(num) {
    return 320/375*parseInt(num);
  }

  /**
   *腾讯地图js加载
   */
  export function TMap(key) {
    return new Promise((resolve, reject) =>{
      window.init=function() {
          resolve(qq)
      }
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://map.qq.com/api/js?v=2.exp&callback=init&key="+key;
      script.onerror = reject;
      document.head.appendChild(script);
    })
 }

  /**
  * 利用笛卡儿积算法算出商品组合
  * @param 多维数组对象组合，e.g. calcDescartes([[1,2,3],['a','b','c','d'],['q','w']])
  * 
  */
 export function calcDescartes (array) {
  if(Object.prototype.toString.call(array)==='[object Array]'){
    if (array.length < 2&&array.length>0) {
      let res = [];
      if(array[0].Children){
        if(Object.prototype.toString.call(array[0].Children)==='[object Array]'){
          array[0].Children.forEach((item,i)=>{
            res.push([item]);
          })
          return res;
        }else{
          return res;
        }
      }else{
        return res;
      }
    }else if(array.length===0){
      let res = [
        {
          Children:[]
        }
      ];
      return res;
    }
    return [].reduce.call(array, (col, r)=> {
        let res = [];
        if(col.Children&&Object.prototype.toString.call(col.Children)==='[object Array]'){
          col.Children.forEach((c)=> {
              r.Children.forEach((s)=> {
                let t = [].concat(Array.isArray(c) ? c : [c]);
                t.push(s);
                res.push(t);
              });
          });
        }else if(col&&Object.prototype.toString.call(col)==='[object Array]'){
          col.forEach((c)=> {
              r.Children.forEach((s)=> {
                let t = [].concat(Array.isArray(c) ? c : [c]);
                t.push(s);
                res.push(t);
              });
          });
        }
        return res;
    });
  }
}
/**
 *  @param data typeof object
 * xhr post请求格式转换
 *  
 **/
export function encodeFormData (data){  
    let pairs = [];  
    let regexp = /%20/g;  
    for (let name in data){  
      let value = data[name].toString();  
      let pair = encodeURIComponent(name).replace(regexp, "+") + "=" +  
        encodeURIComponent(value).replace(regexp, "+");  
        pairs.push(pair);  
    }  
    return pairs.join("&");  
};  