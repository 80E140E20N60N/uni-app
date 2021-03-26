import Vue from 'vue'
import App from './App'
// 导入store实例对象
import store from './store/store.js'
import {$http} from '@escook/request-miniprogram'
uni.$http=$http
$http.baseUrl='https://www.uinav.com'

$http.beforeRequest=function(options){
    uni.showLoading({
      title:'加载中...'
    })
}

$http.afterRequest=function(){
  uni.hideLoading()
}

uni.$showMsg=function(title='数据请求失败！',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}





Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    // 将store挂载在Vue实例上
    store
})
app.$mount()
