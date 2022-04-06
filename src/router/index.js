import Vue from 'vue'
import VueRouter from 'vue-router'
// import LoginIndex from '@/views/login/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login'), name: 'login' },
  {
    path: '/',
    component: () => import('@/views/layout'),
    name: 'layout',
    children: [
      { path: '', component: () => import('@/views/home'), name: 'home' },
      { path: '/my', component: () => import('@/views/my'), name: 'my' },
      {
        path: '/quest',
        component: () => import('@/views/quest'),
        name: 'quest',
      },
      {
        path: '/video',
        component: () => import('@/views/video'),
        name: 'video',
      },
    ],
  },
  {
    path: '/search',
    component: () => import('@/views/search/'),
    name: 'search',
  },
  {
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    name: 'article',
    props: true,//开启路由props传值
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user-profile'),
    name: 'user-profile',
  },
]

const router = new VueRouter({
  routes,
})

export default router
