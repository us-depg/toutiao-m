import store from '@/store/index'
import axios from 'axios'
// import JSONBig from 'json-bigint'
// 调用 axios.create() 方法，创建 axios 的实例对象
const request = axios.create({
  // 请求根路径
  baseURL: 'http://toutiao.itheima.net',

  // transformResponse 允许自定义原始的响应数据（字符串）
  // transformResponse: [
  //   function (data) {
  //     try {
  //       // 如果转换成功则返回转换的数据结果
  //       return JSONBig.parse(data)
  //     } catch (err) {
  //       // 如果转换失败，则包装为统一数据格式并返回
  //       return data
  //     }
  //   },
  // ],
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // config:本次请求配置的对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
