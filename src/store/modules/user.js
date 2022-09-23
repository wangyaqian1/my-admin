import { login } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userName: '',
  passWord: '',
}
const actions = {
  login({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((res) => {
          commit('SET_USERINFO', userInfo)
          const { message, token } = res.data
          commit('SET_TOKEN', { token })
          setToken(token)
          resolve()
        })
        .catch((err) => {
          reject()
        })
    })
  },
}

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload.token
  },
  SET_USERINFO: (state, payload) => {
    state.userName = payload.userName
    state.passWord = payload.passWord
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
