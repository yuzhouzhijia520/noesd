// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import preview from 'vue-photo-preview'
import VueWechatTitle from 'vue-wechat-title';
import BaseInput from "@/commonComponents/BaseInput/BaseInput.vue";
import Vddl from 'vddl';
import formCreate from 'form-create/element'


import 'vue-photo-preview/dist/skin.css';

import 'element-ui/lib/theme-chalk/index.css';
import './public/public.css';
import "babel-polyfill";
import promise from 'es6-promise';
promise.polyfill();
import axios  from './axios';
// import echarts from 'echarts';

//动态加载注册 ./svg/*.svg
import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);  
Vue.component('BaseInput', BaseInput);  

// axios.interceptors.request.use(      
//    config => {
    
//   },    
//   err => {      
//     return Promise.reject(err);   
//   });

// 这样就可以通过$axios发起请求了（个人使用喜好）

//动态组件
Vue.use(formCreate);

//组件懒加载
Vue.use(VueLazyload);
// axios.defaults.withCredentials=true;

//添加echarts
// Vue.use(echarts);

//原始响应式UI展示库
// import BootstrapVue from 'bootstrap-vue';
// Vue.use(BootstrapVue);

//新响应式展示也UI库
// import Vuetify from 'vuetify'  
//vuetify 样式库
// import 'vuetify/dist/vuetify.min.css' 
//Material Design图标样式
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// Vue.use(Vuetify);

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);
Vue.use(VueWechatTitle);

Vue.prototype.$axios = axios
Vue.prototype.domain=window.location.origin
Vue.config.productionTip = false
Vue.use(ElementUI,axios)

//图片预览
Vue.use(preview)

//拖拽
Vue.use(Vddl); 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
