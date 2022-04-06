<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            :src="userInfo.photo"
            class="avater"
            fit="cover"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" class="mobile-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav">
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 导航 -->
    <van-cell title="消息通知" is-link></van-cell>
    <van-cell class="mb-9" title="小智同学" is-link></van-cell>
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
      clickable
    ></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data(){
    return {
      userInfo:{}
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created(){
    if(this.user){
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: '确认退出？',
        })
        .then(() => {
          //  清除登录状态 （容器中user + 本地存储的user） 
          this.$store.commit('setUser',null)

        })
        .catch(() => {
        })
    },
    async loadUserInfo(){
      try {
        const { data:res } = await getUserInfo()
        this.userInfo = res.data
        // console.log(res);
      } catch (error) {
        this.$toast('获取用户失败,请稍后重试')
      }
    }
  },
}
</script>

<style lang="less" scoped>
.my-container {
  background-color: #f2ebeb;
  .header {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avater {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          color: #fff;
          font-size: 30px;
          margin-left: 23px;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 3px;

    .grid-item {
      height: 141px;
      .toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
        margin-top: 10px;
      }
    }
  }
  .logout-cell {
    margin-top: 2px;
    text-align: center;
    color: red;
  }
}
</style>
