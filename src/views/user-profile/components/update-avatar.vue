<template>
  <div class="update-avatar">
    <img class="img" :src="img" alt="" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'UpdateAvatar',
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在图片区域拖拽
      dragMode: 'move', //拖动模式
      aspectRatio: 1, //截图的比例
      autoCropArea: 1, //自动截图的区域
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    })
  },
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        // 如果 Content-Type 要求是	application/json	，则 data 传普通对象 {}
        // 如果 Content-Type 要求是	multipart/form-data	，则 data 传 FormData 对象
        // 纵观所有数据接口，你会发现大多数的接口都要求 Content-Type 要求是	application/json
        // 一般只有涉及到文件上传的数据接口才要求Content-Type 要求是	multipart/form-data
        // 这个时候传递一个 FormData 对象
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0,
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data: res } = await updateUserPhoto(formData)
        // 关闭弹出层
        this.$emit('close')
        //更新视图
        this.$emit('update-photo', res.data.photo)
          this.$toast.success('更新成功')
        
      } catch (err) {
          this.$toast.fail('更新失败')
      }
    },
  },
}
</script>
<style lang="less" scoped>
.update-avatar {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
