<template>
  <div class="layout-container">
    <!-- <h1>LAYOUT组件</h1> -->
    <!-- 标签路由出口 -->
    <router-view></router-view>

    <!-- tabbar标签导航栏 -->
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <van-tabbar-item icon="home-o" to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/quest">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{$store.state.user? '我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {
      active: 0,
    }
  },
}
</script>
<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
     i.toutiao{
      font-size: 40px;
    }
    span.text{
      font-size: 20px;
    }
  }
}
</style>

