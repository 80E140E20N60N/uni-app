<template>
  <view>
    <view class="goods-item" @click="clickHandler">
      <view class="goods-item-left">
        <radio v-if="showRadio" :checked="goods.goods_state" color="#c00000" @click="changeRadio"></radio>
        <image class="goods-img" :src="goods.goods_small_logo||defaultPic"></image>
      </view>
      <view class="goods-item-right">
        <view class="goods-title">
          {{goods.goods_name}}
        </view>
        <view class="goods-info-box">
          <view class="goods-price">¥{{goods.goods_price | price }}</view>
          <uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numChangeHandler"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    data() {
      return {
        defaultPic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2696926016,3434204952&fm=26&gp=0.jpg'
      };
    },
    props: {
      goods: {
        type: Object,
        default: () => {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum:{
        type: Boolean,
        default: false
      }
    },
    filters: {
      price(val) {
        return Number(val).toFixed(2)
      }
    },
    methods: {
      numChangeHandler(e){
        // console.log(e)
        this.$emit('numChange',{
          goods_id:this.goods.goods_id,
          goods_count:Number(e)
        })
      },
      changeRadio() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      clickHandler() {
        this.$emit('click', this.goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    padding: 10px 5px;
    display: flex;
    border-bottom: 1px solid #efefef;

    .goods-item-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 5px;

      .goods-img {
        width: 100px;
        height: 100px;
      }
    }

    .goods-item-right {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 12px;
      .goods-info-box{
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }

  }
</style>
