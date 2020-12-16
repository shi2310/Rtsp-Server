import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import moment from 'moment'
import router from './router'
import store from './store'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

Vue.use(Antd);

Vue.use(BaiduMap, {
  ak: 'widpXnOrlqjG12KnYUWdGIA7fYours8C'
});

// 开发环境则引入mockjs
process.env.NODE_ENV === 'development' && require('./mock/index.js')

moment.locale("zh-cn") // 需要汉化
Vue.prototype.$moment = moment // 赋值使用

// 获取环境设置的接口地址
axios.defaults.baseURL = process.env.API
axios.default.timeout = 5000
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('Authorization')
    if (token) {
      config.headers.Authorization = 'Basic ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
// 添加返回拦截器，判断是否401
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 服务器端返回401，说明Token已无效
          localStorage.removeItem('Authorization')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data)
  })
Vue.prototype.$myaxios = axios

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')