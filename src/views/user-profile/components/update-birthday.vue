<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    }
  },
  methods:{
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0,
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        
        await updateUserProfile({
          birthday: currentDate,
        })
        // 更新视图
        this.$emit('input', currentDate)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    },
  }
}
</script>

<style lang="less" scoped></style>
