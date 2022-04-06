<template>
  <div class="channelEdit">
    <!-- 头部 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="bianji-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <!-- 格子区域 -->
    <van-grid :gutter="10" class="my-gird">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in edit"
        :key="index"
        @click="deleteChannel(item, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(item.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10" class="recommed-gird">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(item, index) in recommendChannels"
        :key="index"
        :text="item.name"
        @click="addChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannels,
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

export default {
  name: 'ChannelEdit',
  props: {
    edit: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, //控制编辑状态的显示
      fiexChannels: [0], //固定频道,不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      const channelsArray = []
      this.allChannels.forEach((channels) => {
        const ret = this.edit.find((edit) => {
          return edit.id === channels.id
        })
        if (!ret) {
          channelsArray.push(channels)
        }
      })
      return channelsArray
    },
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async addChannel(item) {
      // console.log(item)
      this.edit.push(item)
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannels({
            id: item.id, //频道id
            seq: this.edit.length, //序号
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.edit)
      }
    },
    deleteChannel(item, index) {
      if (this.isEdit) {
        // 如果是固定频道 则不删除
        if (this.fiexChannels.includes(item.id)) {
          return
        }
        // 执行删除频道
        // splice 参数1是元素的索引 参数2是删除的个数
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.edit.splice(index, 1)
        // 处理持久化
        this.ondeleteChannel(item)
      } else {
        this.$emit('update-active', index, false)
        // 执行切换频道
      }
    },
    async ondeleteChannel(item) {
      try {
        if (this.user) {
          // 已登录
          await deleteUserChannels(item.id)
        } else {
          // 未登录
          setItem('TOUTIAO_CHANNELS', this.edit)
        }
      } catch (error) {
        this.$toast('操作失败,请稍后重试')
      }
    },
  },
}
</script>

<style scoped lang="less">
.channelEdit {
  /deep/ .my-gird {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -7px;
        font-size: 32px;
        top: -8px;
        color: #cacaca;
        z-index: 2;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }

  /deep/ .recommed-gird {
    .van-grid-item__content {
      white-space: nowrap;
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 22px;
        color: #222;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  padding-top: 85px;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .bianji-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
  }
}
</style>
