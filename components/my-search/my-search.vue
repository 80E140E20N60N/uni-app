<template>
	<view>
		<view class="search-container" @click="toSearch">
		  <view class="search-bar">
        <uni-icons type="search" size="17"></uni-icons>
		    <text class="placeholder">搜索</text>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
    methods:{
      toSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
	}
</script>

<style lang="scss">
  .search-container{
    height: 45px;
    line-height: 45px;
    padding: 0 10px;
    background-color: #c00000;
    .search-bar{
      width: 100%;
      height: 36px;
      padding-left:10px;
      box-sizing: border-box;
      line-height: 36px;
      background-color: #FFFFFF;
      border-radius: 15px;
    }
    .placeholder{
      font-size: 15px;
      margin-left: 5px;
    }
  }
</style>
