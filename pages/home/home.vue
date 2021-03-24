<template>
	<view>
     <!-- 轮播图区域 -->
		<swiper  indicator-dots autoplay circular :interval="3000" indicator-active-color="#b80101" class="swiper">
		     <swiper-item v-for="(item,index) in swiperList" :key="index">
            <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
             <image :src="item.image_src" mode=""></image>
            </navigator>
        </swiper-item>      
    </swiper>
      <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
         <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view> 
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view v-for="(item,index) in floorList" :key="index"> 
        <image class="floor-title" :src="item.floor_title.image_src"></image>   
        <view class="floor-img-box">
          <navigator class="floor-img-left" :url="item.product_list[0].navigator_url">
            <image :style="{width: item.product_list[0].image_width + 'rpx'}" :src="item.product_list[0].image_src" mode="widthFix"></image>
          </navigator>
          <view class="floor-img-right">
            <navigator class="right-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !==0" :url="item2.navigator_url">
              <image :style="{width: item2.image_width+'rpx'}" :src="item2.image_src" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
</view>
 
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
        navList:[],
        floorList:[]
			};
		},
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      // 获取楼层列表
      async getFloorList(){
        const {data:{message,meta}}=await uni.$http.get('./api/public/v1/home/floordata')
        // console.log(message,meta)
        if(meta.status!==200) return uni.$showMsg()
        this.floorList=message.map((e,i)=>{
          return{
            product_list:e.product_list.map((c,j)=>{
              return{
                ...c,
                navigator_url:'/subpkg/goods_list/goods_list?'+c.navigator_url.split('?')[1]
              }
            }),
            floor_title:e.floor_title
          }
        })
      },
      // 获取轮播图数据
      async getSwiperList(){
        const {data:{message,meta}}=await uni.$http.get('./api/public/v1/home/swiperdata')
        // console.log(message,meta)
        if(meta.status!==200) return uni.$showMsg()
        this.swiperList=message
      },
      // 获取导航列表数据
      async getNavList(){
        const{data:res}=await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status!==200) return uni.$showMsg()
        this.navList=res.message
        // console.log(this.navList)
      },
      // 导航列表点击跳转
      navClickHandler(item){
        // console.log(item)
        if(item.name=='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
          }
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
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  
    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  .floor-title{
    height: 60rpx;
    width: 100%;
    display: flex;
  }
  .floor-img-box{
    display: flex;
    padding-left: 10rpx;
  }
  .floor-img-right{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
