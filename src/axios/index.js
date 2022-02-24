import axios from 'axios'
import router from '../router'



//设置全局axios默认值
axios.defaults.timeout = 1000*60;
axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//创建一个axios实例
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.newBaseURL = process.env.BASE_NEWAPI;
// instance.defaults.headers.post['Cache-Control'] = 'no-cache';
axios.interceptors.request.use = instance.interceptors.request.use;
/*设置全局拼接url参数*/

const UserProfile="UserProfile";/*判断是登录前的接口*/
const notUrl="Login";/*排除不需要拼接的url*/
const notUrlMock="mockjs";/*排除不需要拼接的url*/
const agenturl="agent_api";/*判断是代理商接口，给代理商接口添加对应代理商接口所需token*/
const notUrlLog="login";/*排除不需要拼接的url*/
const fundebug='fundebug';
//request拦截器
instance.interceptors.request.use(
    config => {
        if (!config.url.includes(fundebug)&&!config.url.includes(notUrl)&&!config.url.includes(notUrlMock)&&!config.url.includes(UserProfile)&&!config.url.includes(notUrlLog)) {
            if(config.url.includes(agenturl)){
                config.url = config.url+'&token='+localStorage.getItem('agentId');   //除了login接口外其余的都添加token  
                // config.url = config.url+'&token=9507fa6978a38dfc39055b0ad2fbd2d3';   //本地测试防伪token、防抓包、防攻击用
            }else if(!config.url.includes(agenturl)){
                if(config.url.includes('api.')){
                    config.url = config.newBaseURL+config.url.substr(4, config.url.length);
                }else{
                    config.url = config.url+'&token='+localStorage.getItem('userId');   //除了login接口外其余的都添加token   
                    // config.url = config.url+'&token=9507fa6978a38dfc39055b0ad2fbd2d3';     //本地测试防伪token、防抓包、防攻击用
                }
            }
        }     
        return config;  
    },
    err => {
        return Promise.reject(err);
    }
);
//respone拦截器
instance.interceptors.response.use(
    response => {
        if(response.data.code===403001){
            //普通用户
            localStorage.setItem('activeName','first');
            router.replace({ //跳转到登录页面
                path: '/wf/index/login'
            });
            response.data.msg='请重新登录!600A0001';
            return response;
        }else if(response.data.code===403002){
            //代理商
            localStorage.setItem('activeName','second');
            router.replace({ //跳转到登录页面
                path: '/wf/index/login'
            });
            response.data.msg='请重新登录!600A0002';
            return response;
        }else{
            return response;
        }
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        return Promise.reject(error.response);
    }
);


export default instance;
   