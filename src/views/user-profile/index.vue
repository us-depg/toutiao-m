<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />

    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        round
        fit="cover"
        width="30"
        height="30"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    ></van-cell>
    <!-- /个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></update-name>
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
      ></update-gender>
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
        v-model="user.birthday"
      ></update-birthday>
    </van-popup>
    <!-- /编辑生日 -->

    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
    <update-avatar v-if="isUpdatePhotoShow" :img="img" @close="isUpdatePhotoShow = false" @update-photo="user.photo = $event"></update-avatar>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdateAvatar from "./components/update-avatar.vue"
export default {
  name: 'USerProfile',
  props: {},
  components:{UpdateName,UpdateGender,UpdateBirthday,UpdateAvatar},
  data() {
    return {
      user: {}, //个人信息
      isUpdateNameShow: false, //编辑昵称显示和隐藏
      isUpdateGenderShow:false, //编辑性别显示和隐藏
      isUpdateBirthdayShow:false,//编辑生日显示和隐藏
      isUpdatePhotoShow:false,//
      img:null//预览的图片
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data: res } = await getUserProfile()
        // console.log(res)
        this.user = res.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange(){
      // 获取文件对象
      // 基于文章对象获取blob对象
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // 选中同一个文件，change事件不会触发 每次选中后把file的value值清空
      this.$refs.file.value = ''
      // console.log(data);
    }
  },
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
