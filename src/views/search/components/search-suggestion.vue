<template>
  <div class="search-suggestion">
    <van-cell v-for="(text, index) in suggestion" :key="index" icon="search" @click="$emit('search',text)">
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestion: [],
    }
  },
  props: {
    searchText: {
      Type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      // deep: true,
      immediate: true,
      // handler(newval) {
      //   this.loadSearchSuggestion(newval)
      //   // console.log(newval);
      // },
      // debounce  使用 lodash js工具包
      // @参数1- 函数
      // @参数2- 延迟事件，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (newval) {
        this.loadSearchSuggestion(newval)
      }, 500),
    },
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data: res } = await getSearchSuggestion(q)
        this.suggestion = res.data.options
        // console.log(res)
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText,'gi')
      // `replace(要被替换的字符,用来替换的字符)`
      return text.replaceAll(reg, highlightStr)
    },
  },
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
