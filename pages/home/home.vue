<template>
	<view>
		<swiper  indicator-dots autoplay circular :interval="3000" indicator-active-color="#b80101" class="swiper">
		     <swiper-item v-for="(item,index) in swiperList" :key="index">
            <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
             <image :src="item.image_src" mode=""></image>
            </navigator>
        </swiper-item>      
    </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[]
			};
		},
    onLoad() {
      this.getSwiperList()
    },
    methods:{
      async getSwiperList(){
        const {data:{message,meta}}=await uni.$http.get('./api/public/v1/home/swiperdata')
        console.log(message,meta)
        if(meta.status!==200) return uni.$showMsg()
        this.swiperList=message
      }
    }
	}
</script>

<style lang="scss">
  .swiper{
    height: 330rpx;
    .swiper-item,image{
      width: 100%;
      height: 100%;
    }
  }
</style>
