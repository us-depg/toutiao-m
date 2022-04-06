<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>

    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type == 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image :src="img" fit="cover"/>
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </div>

    <div slot="default">
      <van-image
        fit="cover"
        v-if="article.cover.type == 1"
        class="right-cover"
        :src="article.cover.images[0]"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap{
    display: flex;
    .cover-item{
      flex: 1;
      height: 146px;
    }
  }
}
</style>
