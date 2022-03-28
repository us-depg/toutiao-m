import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 vant 组件
import Vant from 'vant'

// 引入 Vant 样式表
import 'vant/lib/index.css'

// 引入 Less 全局样式表
import '@/styles/index.less'

// 导入 rem 布局适配 文件
import 'amfe-flexible'

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
