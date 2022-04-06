<template>
  <div class="search-container">
    <form action="/" class="search-from">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText"></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-suggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history.vue'
import SearchSuggestion from '@/views/search/components/search-suggestion.vue'
import SearchResult from '@/views/search/components/search-result.vue'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      searchText: '',
      isResultShow: false, //控制搜索结果的展示
    }
  },
  methods: {
    onSearch(val) {
      // console.log(val)
      this.searchText = val
      this.isResultShow = true
    },
    onCancel() {
      // console.log('取消')

      this.$router.back()
    },
  },
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-from{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
