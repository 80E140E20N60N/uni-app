<template>
  <view>
    <view class="search-box">
      <!-- uni-search-bar -->
      <uni-search-bar :radius="100" cancelButton="none" @input="input"></uni-search-bar>
    </view>
    <!-- 搜索结果列表 -->
    <view class="sugg-list" v-if="searchList.length!==0">
      <view class="sugg-item" v-for="(item,index) in searchList" :key="index" @click="gotoDetail(item.goods_id)">
        <view class="sugg-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history" v-else>
      <view class="history-title">
        <view>搜索历史</view>
        <uni-icons type="trash-filled" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag v-for="(item,index) in rHistoryList" :key="index" :text="item" @click="goToGoodsList(item)">
        </uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchList: [],
        historyList: JSON.parse(uni.getStorageSync('kw')||'[]')
      };
    },
    computed: {
      rHistoryList() {
        return [...this.historyList].reverse()
      }
    },
    methods: {
      clearHistory() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      goToGoodsList(name) {
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?query=${name}`
        })
      },
      saveKw() {
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      input(e) {
        // 搜索框输入防抖处理
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()

        }, 500)
      },
      async getSearchList() {
        if (this.kw === '') {
          this.searchList = []
          return
        }
        const {
          data: {
            message,
            meta
          }
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (meta.status !== 200) return uni.$showMsg()
        this.searchList = message
        this.saveKw()
        // console.log(message, meta)
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history {
    padding: 0 5px;

    .history-title {
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      uni-tag {
        margin-top: 5px;
        margin-left: 5px;
      }
    }
  }
</style>
