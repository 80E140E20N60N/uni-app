<template>
  <view>
   <view class="goods-list">
     <block v-for="(item,index) in goodsList" :key="index" >
      <my-goods :goods="item" @click="goToGoodsDetail"></my-goods>
     </block>    
   </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        params:{
          query:'',//关键词
          cid:'',//商品的分类id
          pagesize:10,//每页请求多少数据
          pagenum:1,//请求第几页
        },
        total:0, //商品总数
        goodsList:[],
        isLoading:false
      };
    },
    onLoad() {
      this.getGoodsList()
    },
    onReachBottom() {
      if(this.params.pagenum*this.params.pagesize>=this.total) return uni.$showMsg('数据加载完毕！')
      if(!this.isLoading){
        this.params.pagenum++
        this.getGoodsList()
      }
    },
    methods:{
      async getGoodsList(){
        this.isLoading=true
        const {data:{message,meta}}=await uni.$http.get('/api/public/v1/goods/search',this.params)
        this.isLoading=false
        // console.log(message,meta)
        if (meta.status !== 200) return uni.$showMsg()
        this.goodsList =[ ...this.goodsList,...message.goods]
        this.total= message.total
      },
      goToGoodsDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' +id
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
