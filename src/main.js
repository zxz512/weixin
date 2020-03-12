import Vue from 'vue'
import App from './App'
// import request from '@/utils/request.js'
// const plugin = request()
// Vue.use(plugin)

import MyPlugin from '@/utils/request.js'
Vue.use(MyPlugin, {
  // 后台接口的基准路径
  baseURL: 'https://api-ugo-dev.itheima.net/api/public/v1/'
})

// Vue.prototype.$request = async ({path}) => {
//   const baseURL = 'https://api-ugo-dev.itheima.net/api/public/v1/'
//   // 实现发送请求
//   // uni-app对部分小程序原生API进行了封装，可以支持Promise
//   const [error, res] = await uni.request({
//     url: baseURL + path
//   })
//   // 返回异步接口的结果
//   return res.data
// }

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
