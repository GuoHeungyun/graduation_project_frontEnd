import { createStore } from 'vuex'
//可以让vuex数据持久化的插件，设置存放在sessionStorage中
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    //用户信息
    userInfo: {
      username: '',
      phone: '',
      password: '',
      introduction: '',
      avatar: ''
    }
  },
  getters:{
    //拼接头像地址
    getAvatarUrl(state){
      const url = 'http://127.0.0.1:7001/' + state.userInfo.avatar
      return url
    },
    //获取头像存储路径
    getAvatarPath(state){
      return state.userInfo.avatar
    },
    //获取用户信息
    getUserInfo(state){
      return state.userInfo
    },
  },
  mutations: {
    //设置用户信息
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    //设置用户的头像
    setAvatarUrl(state, url){
      state.userInfo.avatar = url
    },
    setUsername(state,payload) {
      state.userInfo.username = payload
    },
    setPhone(state, payload) {
      state.userInfo.phone = payload
    },
    setPassword(state,payload) {
      state.userInfo.password = payload;
    },
    setIntroduction(state,payload) {
      state.userInfo.introduction = payload
    }
  },
  actions: {

  },
  modules: {

  },
  plugins:[
      createPersistedState({
        storage:window.sessionStorage
      })
  ]
})
