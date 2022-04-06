<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error="error"
      error-text="加载失败，请点击重试"
    >
      <CommentItem v-for="(item,index) in list" :key="index"
        :comment="item"
       />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from "@/views/article/components/comment-item.vue";
export default {
  name: 'CommentList',
  components:{
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error:false
    }
  },
  created(){
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        // 请求获取获取
        const { data: res } = await getComment({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        })
        // console.log(res)
        // 将数据添加到列表中
        const { results } = res.data
        this.$emit('total-count',res.data)
        this.list.push(...results)
        // 将loading设置为false
        this.loading = false

        // 判断是否还有数据
        if (results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
        // 有数据就更新下一页的数据
        // 没有就将finished设置结束
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
