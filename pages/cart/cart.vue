<template>
  <view>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <uni-swipe-action>
      <block v-for="(item,index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="deleteGoods(item)">
          <my-goods :show-radio="true" :show-num="true" :goods="item" @radio-change="radioChange"
            @numChange="numChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
  import TabBarBadge from '../../mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [TabBarBadge],
    data() {
      return {
        options:[
          {
            text:'删除',
            style:{
              backgroundColor:'#c00000'
            }
          }
        ]
      };
    },
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','updateDeleteGoods']),
      radioChange(goods) {
        this.updateGoodsState(goods)
      },
      numChange(goods) {
        this.updateGoodsCount(goods)
      },
      deleteGoods(goods){
        this.updateDeleteGoods(goods)
      }
    }
  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid #efefef;
    padding-left: 5px;

    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>
