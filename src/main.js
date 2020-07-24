import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  mounted() {
    let stickers = JSON.parse(localStorage.getItem('stickers')) || [];
    this.$store.commit('setStickers', stickers);
  },
  render: h => h(App)
}).$mount('#app');