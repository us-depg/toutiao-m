<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'FollowUser',
  model:{
      prop:'isFollowed',
      event:'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async onFollow() {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注 ，取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注，关注
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '你不能关注自己'
        }
        this.$toast(message)
      }
      this.loading = false
    },
  },
}
</script>

<style></style>
