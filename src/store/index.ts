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
    token: getToken(),
    userId: '',
    userName: '',
    userStatus: '',
    userData: null,
  },
  mutations: {
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
          url: '/note/user/login',
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
          url: '/note/user/getUserInfo',
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
    }
  },
  modules: {
  }
})
