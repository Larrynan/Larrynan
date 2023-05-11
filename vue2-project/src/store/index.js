import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: '',
    user: ''
  },
  getters: {
    getToken (state) {
      return state.token || storage.get('token') || ''
    }
  },
  mutations: {
    set_token (state, token) {
      state.token = token
      storage.set('token', token)
      console.log('保存token成功！')
    },
    del_token (state) {
      state.token = ''
      storage.remove('token')
    }
  }

})

export default store
