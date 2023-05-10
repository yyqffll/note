import { createStore } from 'vuex'
import { request } from '@/libs/axios'
import {
  getToken,
  setToken,
  setLocalStorage,
  encrypt
} from '@/libs/utils'
export default createStore({
  state: {
    theme: '',
    token: getToken(),
    userId: '',
    userName: '',
    userStatus: '',
    userData: null,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme
      setLocalStorage('theme', theme)
      if (theme === 'light') {
        document.documentElement.style.setProperty('--theme', '#fff')
        document.documentElement.style.setProperty('--theme-color', '#1c1e21')
        document.documentElement.style.setProperty('--navbar-box-shadow', 'rgba(0, 0, 0, 0.1)')
      } else {
        document.documentElement.style.setProperty('--theme', '#000')
        document.documentElement.style.setProperty('--theme-color', '#fff')
        document.documentElement.style.setProperty('--navbar-box-shadow', '#4d4d4d')
      }
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setUserName(state, userName) {
      state.userName = userName
    },
    setUserStatus(state, userStatus) {
      state.userStatus = userStatus
    },
    setUserData(state, userData) {
      state.userData = userData
    },
  },
  actions: {
    login({ commit }, { userName, userPwd }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/noteapi/user/login',
          data: {
            userName,
            userPwd: encrypt(userPwd)
          }
        }).then(res => {
          commit('setToken', 'logined')
          commit('setUserId', res.data.userId)
          commit('setUserName', res.data.userName)
          commit('setUserStatus', res.data.userStatus)
          commit('setUserData', res.data)
          setLocalStorage('userName', res.data.userName)
          resolve(res)
        }).catch(err => {
          reject(err.msg)
        })
      })
    },
    getUserInfo({ commit }, { userName }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/noteapi/user/getUserInfo',
          data: {
            userName
          }
        }).then(res => {
          commit('setUserId', res.data.userId)
          commit('setUserName', res.data.userName)
          commit('setUserStatus', res.data.userStatus)
          commit('setUserData', res.data)
          resolve(res)
        }).catch(err => {
          reject(err.msg)
        })
      })
    },
  },
  modules: {
  }
})
