export default {
  namespaced: true,

  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  mutations: {
    addCart(state, goods) {
      // 在数组中找是否有传过来的商品对象
      const findRes = state.cart.find(e => e.goods_id === goods.goods_id)
      if (!findRes) {
        state.cart.push(goods)
      } else {
        findRes.goods_count++
      }
      console.log(state.cart)
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateGoodsState(state, goods) {
      const findRes = state.cart.find(e => e.goods_id === goods.goods_id)
      if (findRes) {
        findRes.goods_state = goods.goods_state
      }
      this.commit('m_cart/saveToStorage')
    },
    // 更新购物车中商品的数量
    updateGoodsCount(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id) 
      if(findResult) {
        // 更新对应商品的数量
        findResult.goods_count = goods.goods_count
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    // 删除购物车中的商品
    updateDeleteGoods(state,goods){
      state.cart=state.cart.filter(e=>e.goods_id!=goods.goods_id)
      this.commit('m_cart/saveToStorage')
    }
  },

  getters: {
    total(state) {
      let count = 0
      state.cart.forEach(e => {
        count += e.goods_count
      })
      return count
    }
  }

}
