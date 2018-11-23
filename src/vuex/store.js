import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default  () => {
  return new Vuex.Store({
    state: {
      nickName: '',
      cartCount: 0
    },
    mutations: {
      updateUserInfo(state, nickName) {
        state.nickName = nickName
      },
      updateCartCount(state, cartcount) {
        state.cartCount += cartcount
      },
      initCartCount(state, cartcount) {
        state.cartCount = cartcount
      }
    }

  })
}

