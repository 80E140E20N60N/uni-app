<template>
	<view>
		<!-- 轮播图区域 -->
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
        <swiper-item v-for="(item,index) in goods_info.pics" :key="index">
            <image :src="item.pics_big" @click="preview(index)"></image>
        </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods-info">
      <view class="goods-price">
        ¥{{goods_info.goods_price}}        
      </view>
      <view class="goods-info-box">
        <view class="goods-name">
          {{goods_info.goods_name}}
        </view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">
        快递：免运费 
      </view>      
    </view>
    <!-- 商品详情 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
    </view>
	</view>
</template>

<script>
 import {mapGetters,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				goods_info:{},
        options:[
          {
            icon:'shop',
            text:'店铺',
          },
          {
            icon:'cart',
            text:'购物车',
            info:0
          }          
        ],
        buttonGroup:[
          {
            text:'加入购物车',
            backgroundColor:'#ff0000',
            color:'#fff'
          },
          {
            text:'立即购买',
            backgroundColor:'#ffa200',
            color:'#fff'
          }
        ]
			};
		},
    computed:{
     ...mapGetters('m_cart', ['total'])
    },
    onLoad(options) {
      const {goods_id} = options
      this.getGoodsDetail(goods_id)
    },
    methods:{
      ...mapMutations('m_cart',['addCart']),
      buttonClick(e){
        console.log(e)
        if(e.content.text==='加入购物车'){
          const goods={
            goods_id:this.goods_info.goods_id,
            goods_name:this.goods_info.goods_name,
            goods_price:this.goods_info.goods_price,
            goods_small_logo:this.goods_info.goods_small_logo,
            goods_count:1,
            goods_state:true,            
          }
          this.addCart(goods)
        }
        if(e.content.text==='立即购买'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      onClick(e){
        // console.log(e)
        if(e.content.text==='购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      preview(index){
        uni.previewImage({
          urls:this.goods_info.pics.map(e=>e.pics_big),
          current:index
        })
      },
      async getGoodsDetail(goods_id){
        const {data:{message,meta}} =await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        // console.log(message,meta)
        if(meta.status!==200) return uni.$showMsg()
        this.goods_info=message
      }
    },
    watch:{
      total:{
        handler(newVal){
          const findRes = this.options.find(e=>e.text==='购物车')
          findRes.info=newVal
        },
        immediate:true
      }
    }
	}
</script>

<style lang="scss">
.goods-container {
		padding-bottom: 50px;
	}

	.swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info {
		padding: 10px;
		padding-right: 0;

		.goods-price {
			font-size: 16px;
			color: #c00000;
			margin: 10px 0;
		}

		.goods-info-box {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 12px;
			}

			.favi {
				border-left: 1px solid #efefef;
				width: 120px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: gray;
				font-size: 12px;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
