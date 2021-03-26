// 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车vuex模块
import moduleCart from './cart.js'
Vue.use(Vuex)

// 创建store实例对象
const store = new Vuex.Store({
  modules:{
    m_cart:moduleCart
  }
})

// 暴露
export default store