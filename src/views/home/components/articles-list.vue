<template>
  <div class="article-lsit">
    <van-pull-refresh
      v-model="refreshingLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem v-for="(item, index) in list" :key="index" :article="item"></ArticleItem>
        <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getUserArticle } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshingLoading: false, // 控制下拉刷新的状态
    }
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data: res } = await getUserArticle({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), //页码
          with_top: 1,
        })
        // console.log(res)

        const { results } = res.data

        this.list.push(...results)

        this.loading = false

        if (results.length) {
          this.timestamp = results.pre_timestamp
        } else {
          // 没有数据 将 finished 设置为 true
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
        // console.log('请求失败', error)
      }
    },
    async onRefresh() {
      // console.log('123');
      // 获取数据
      try {
        const { data: res } = await getUserArticle({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), //页码
          with_top: 1,
        })
        // 将数据追加到顶部
        const { results } = res.data
        // console.log(results);
        this.list.unshift(...results)
        // 关闭下拉刷新的状态
        this.refreshingLoading = true
      } catch (error) {}
    },
  },
}
</script>

<style scoped lang="less">
.article-lsit {
  height: 79vh;
  overflow: auto;
}
</style>
