import Vue from 'vue'
import Vuex from 'vuex'
import {setItem , getItem} from'@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前用户的信息 token等数据 
    user:getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser(state,data){
      state.user = data
      // 防止用户数据丢失把数据备份在本地存储
      setItem(TOKEN_KEY , state.user)
    },
  },
  actions: {
  },
  modules: {
  }
})
