<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <i slot="left" @click="$router.back()">
        <van-icon name="arrow-left" />
      </i>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <follow-user
            v-model="article.is_followed"
            class="follow-btn"
            :user-id="article.aut_id"
          ></follow-user>
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading = "followLoading"
            @click="onFollow"
            >关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading = "followLoading"
            >已关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <comment-list
          :list="commentList"
          :source="article.art_id"
          @total-count="totalCommentCount = $event.total_count"
        ></comment-list>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
          @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
          <!-- 收藏icon图标 -->
          <collect-article
            color="#777"
            v-model="article.is_collected"
            :article-id="article.art_id"
          ></collect-article>
          <like-article
            color="#777"
            v-model="article.attitude"
            :article-id="article.art_id"
          ></like-article>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="isPostShow" position="bottom" :style="{ height: '20%' }">
          <comment-post :target="article.art_id" @post-success="onPostSuccess"></comment-post>
        </van-popup>
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
// import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from '@/views/article/components/comment-list.vue'
import CommentPost from "./components/comment-post.vue";
export default {
  name: 'ArticleIndex',
  components: { FollowUser, CollectArticle, LikeArticle, CommentList ,CommentPost},
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      article: {}, //文章啊详情
      loading: true, //加载中的loading状态
      errStatus: 0, //失败的状态码
      followLoading: false,
      totalCommentCount: 0,
      isPostShow:false, //控制发布评论按钮的显示状态
      commentList:[]// 评论列表
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        const { data: res } = await getArticleById(this.articleId)
        this.article = res.data
        // console.log(res)
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        console.log(err.response)
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    previewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelector('img')
      const images = []
      // console.log(imgs);
      // imgs.forEach((img, index) => {
      //   console.log(img);
      //   images.push(img.src)
      //   img.onclick = () => {
      //     ImagePreview({
      //       images,
      //       startPosition: index,
      //     })
      //   }
      // })
    },
    // async onFollow() {
    //   this.followLoading = true
    //   try {
    //     if (this.article.is_followed) {
    //       // 已关注 ，取消关注
    //       await deleteFollow(this.article.aut_id)
    //     } else {
    //       // 未关注，关注
    //       await addFollow(this.article.aut_id)
    //     }
    //     this.article.is_followed = !this.article.is_followed
    //   } catch (err) {
    //     let message = '操作失败，请重试！'
    //     if (err.response && err.response.status === 400) {
    //       message = '你不能关注自己'
    //     }
    //     this.$toast(message)
    //   }
    //   this.followLoading = false
    // },
    onPostSuccess(data){
      // 关闭弹出层
      this.isPostShow = false
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  },
}
</script>

<style scoped lang="less">
@import url('./github-markdown.css');
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
