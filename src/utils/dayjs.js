import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter('relativeTime',value=>{
  return dayjs().to(dayjs(value))
})
// 全局引用
dayjs.locale('zh-cn')