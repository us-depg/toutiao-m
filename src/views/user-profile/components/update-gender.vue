<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateGender',
  props:{
    value:{
      type:Number,
      required:true
    }
  },
  data() {
    return {
      columns: ['男','女'],
      localGender:this.value
    };

  },
  methods: {
    // picker：组件对象
    // value：选中的值
    // index：选中的索引
    onChange(picker,value,index){
        this.localGender = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0,
      })
      try {
        const localGender = this.localGender
        
        await updateUserProfile({
          gender: localGender,
        })
        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    },
    
   
  },
};
</script>

<style></style>
