<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="err"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      Type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      err:false,
      page: 1,
      per_page: 10,
    }
  },
  methods: {
    async onLoad() {
      try {
        // 请求获取数据
        // 将数据添加到列表中
        // 判断是否还有数据
        // 如果还有，则更新下一个数据的页码
        // 如果没有则将加载状态finished设置为结束
        const { data : res } = await getSearchResult({
          page: this.page, //页码
          per_page: this.per_page, //每页大小
          q: this.searchText, //查询关键词
        })
        const { results } = res.data
        this.list.push(...results)
        // 将本次加载中的loading 关闭
        this.loading = false
        console.log(this.list);
        if(results.length){
          this.page++
        }else{
          this.finished = true
        }
      } catch (err) {
        this.err = true
        this.loading = false
        // this.$toast('数据获取失败，请稍后重试')
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
