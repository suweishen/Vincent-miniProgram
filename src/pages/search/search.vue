<template>
  <div>
    <view class="page-top">
      <van-search
        placeholder="请输入搜索关键词"
        shape="round"
        @search="toSearch($event)"
      />
    </view>

    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="tags"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
    />

    <TagGroup
      header-text="历史搜索"
      btn-text="清除"
      :value="historySearch"
      @onBtnClick="clearHistorySearch"
      @onTagClick="showBookDetail"
    />
  </div>
</template>

<script>
import TagGroup from '@/components/TagGroup'
import SearchBar from '@/components/TagGroup'
export default {
  name: 'search',
  components: {
    SearchBar,
    TagGroup
  },
  data () {
    return {
      tags: [
        '我哈哈哈',
        'vvvvvvvvv',
        'ccccccccccccc',
        'dddddddddddddddddd'
      ],
      historySearch: [],
    }
  },
  methods: {
    toSearch (e) {
      let searchKeys = e.mp.detail
      this.historySearch.push(searchKeys)
    },
    changeHotSearch () {
      this.tags.push('iphone XI')
    },
    clearHistorySearch () {
      this.historySearch = []
    },
  },
}
</script>

<style lang="less" scoped>
  @import 'search';
</style>
