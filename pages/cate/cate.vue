<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <view :class="['left-scroll-view-item',active===index?'active':'']" v-for="(item,index) in cateList"
          :key="index" @click="activeChanged(index)">
          {{item.cat_name}}
        </view>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2, i2) in cateList2" :key="i2">
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
          <view class="cate-lv3-list">
            <!-- 三级分类 Item 项 -->
            <navigator class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
              <!-- 图片 -->
              <image :src="item3.cat_icon"></image>
              <!-- 文本 -->
              <text>{{item3.cat_name}}</text>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        active: 0,
        // 滚动条距离顶部的距离
        scrollTop:0,
        cateList: [],
        cateList2: []
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: {
            message,
            meta
          }
        } = await uni.$http.get('./api/public/v1/categories')
        console.log(message, meta)
        if (meta.status !== 200) return uni.$showMsg()
        this.cateList = message
        this.cateList2 = message[0].children
      },
      // 选中项改变的事件处理函数
      activeChanged(i) {
        this.active = i
        this.cateList2 = this.cateList[i].children
        this.scrollTop=this.scrollTop===0?1:0
      },
      // 点击三级分类项跳转到商品列表页面
      gotoGoodsList(item3) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .cate-lv2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    
    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;
    
      .cate-lv3-item {
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    
        image {
          width: 60px;
          height: 60px;
        }
    
        text {
          font-size: 12px;
        }
      }
    }
  }
</style>
