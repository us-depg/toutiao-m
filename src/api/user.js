// 用户请求相关模块
import request from '@/utils/request'
// import store from '@/store'
// 登录接口
export const login = (data) => {
  return request.post('/v1_0/authorizations', data)
}
// 发送验证码
export const sendSms = (mobile) => {
  return request.get(`/v1_0/sms/codes/${mobile}`)
}
// 获取用户信息
export const getUserInfo = () => {
  return request({ 
    method: 'GET',
    url: '/v1_0/user'
    // headers:{
    //   Authorization:`Bearer ${store.state.user.token}`
    // }
  })
}
// 获取频道导航
export const getUserList = () => {
  return request.get('/v1_0/user/channels')
}

// 关注用户
export const addFollow = (target) => {
  return request({ 
    method: 'POST',
    url: '/v1_0/user/followings',
    data:{
      target
    }
  })
}
// 取消关注
export const deleteFollow = (target) => {
  return request({ 
    method: 'DELETE',
    url: `/v1_0/user/followings/:${target}`,
    
  })
}

// 获取当前用户的个人资料
export const getUserProfile = () => {
  return request({ 
    method: 'GET',
    url: '/v1_0/user/profile',
    
  })
}
// 更新用户资料
export const updateUserProfile = (data) => {
  return request({ 
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 更新用户头像
export const updateUserPhoto = (data) => {
  return request({ 
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}