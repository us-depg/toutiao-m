<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginFrom">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="rules.mobile"
        type:number
        maxlength:11
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="rules.code"
        type:number
        maxlength:6
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down class="timeCount" :time="1000 * 60" format="ss s" v-if="isCountShow" @finish="isCountShow = false"/>
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            v-else
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="log-btn-warp">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login , sendSms } from '@/api/user'
export default {
  // name 是当前组件的名称（建议为每个组件都指定唯一的 name 名称）
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      rules: {
        // 手机号的校验规则
        mobile: [
          { required: true, message: '请填写您的手机号', trigger: 'onBlur' },
          {
            pattern: /^1\d{10}$/,
            message: '请填写正确的手机号',
            trigger: 'onBlur',
          },
        ],
        // 验证码的校验规则
        code: [
          { required: true, message: '请填写验证码', trigger: 'onBlur' },
          { pattern: /^\d{6}$/, message: '验证格式错误', trigger: 'onBlur' },
        ],
      },
      isCountShow:false

      
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, //禁用背景点击
        duration: 0,
      })

      try {
        const { data: res } = await login(user)
        // 判断是否登录成功了
        if (res.message === 'OK') {
          this.$toast.success('登录成功')

          // TODO1：把登录成功的结果，存储到 vuex 中
          this.$store.commit('setUser',res.data)
          // console.log(res.data);
          // this.$router.back()
          this.$router.push('/')
          // TODO2：登录成功后，跳转到主页
          
          // console.log('登录成功', res)
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败')
        }
      }
      // 根据请求响应的结果处理后续操作
    },
    async onSendSms () {
      // 验证手机号是否正确
      try {
      await this.$refs.loginFrom.validate('mobile')
      } catch (err) {
        // 验证失败
        return this.$toast('验证失败')
      }
      // 验证成功显示 倒计时时间
      this.isCountShow = true
      // 发送请求验证码
      try {
          const res =  await sendSms(this.user.mobile)
          this.$toast('发送成功')
          // console.log(res);
      } catch (err) {
        // 发送失败,关闭倒计时
        this.isCountShow = false
        if(err.response.status == 429){
          this.$toast('发送太频繁了,请稍后重试')

        }else{
          this.$toast('发送失败,请稍后重试')
        }
        
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 48px;
    color: #ccc;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 156px;
    height: 46px;
    font-size: 22px;
    color: #666;
    vertical-align: top;
  }
  .log-btn-warp {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .timeCount{
    font-size: 13px;
    padding-right: 25px;
    padding-top: 10px;
    // line-height: 0.64rem;
  }
  
}
</style>
