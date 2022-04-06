<template>
  <div class="home-container">
    <!-- 头部 搜索 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 导航 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="items.name" v-for="items in channels" :key="items.id">
        <!-- 列表内容 -->
        <ArticleList :channel="items"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChnnelShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChnnelShow"
      close-icon-position="top-left"
      closeable
      position="bottom"
      :style="{ height: '90%' }"
    >
      <ChannelEdit
        :edit="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserList } from '@/api//user'
import ArticleList from '@/views/home/components/articles-list.vue'
import ChannelEdit from '@/views/home/components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 0,
      channels: [],
      isChnnelShow: false, //控制频道编辑显示的状态
    }
  },
  created() {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user']),
  },

  methods: {
    async loadChannels() {
      try {
        let channels = []
        if (this.user) {
          const { data: res } = await getUserList()
          // console.log('请求成功', res)
          channels = res.data.channels
        } else {
          const loadChannels = getItem('TOUTIAO_CHANNELS')
          if (loadChannels) {
            channels = loadChannels
          } else {
            const { data: res } = await getUserList()
            // console.log('请求成功', res)
            channels = res.data.channels
          }
        }
        this.channels = channels


      } catch (error) {
        this.$toast('获取文章失败', error)
      }
    },
    onUpdateActive(index, isChnnelShow = true) {
      this.active = index
      this.isChnnelShow = isChnnelShow
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      width: 200px;
      height: 82px;
      border: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
      padding-left: 0;
      padding-right: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        width: 1px;
        height: 100%;
        background: url('@/assets//gradient-gray-line.png');
        position: absolute;
        left: 0;
        background-size: contain;
      }
    }
  }
}
</style>
