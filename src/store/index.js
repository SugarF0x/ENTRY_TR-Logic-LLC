import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stickers: []
  },
  mutations: {
    setStickers(state, payload) {
      state.stickers = payload;
      localStorage.setItem('stickers', JSON.stringify(payload));
    }
  },
  actions: {
  },
  modules: {
  }
})
