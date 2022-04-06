<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, //禁用背景点击
        duration: 0,
      })
      try {
        const { data: res } = await addComment({
          target: this.target,
          content: this.message,
          art_id: null,
        })
        console.log(res)
        // 关闭弹出层

        // 将发布的内容显示在列表顶部
        this.$emit('post-success', res.data)
        // 清空文本框
        this.message = ''
        this.$toast.success('发布成功')


      } catch (err) {
        this.$toast.fail('发布失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
