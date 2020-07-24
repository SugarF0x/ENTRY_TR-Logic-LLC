import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/**
 * Main script where all the magic begins
 *
 * @category client
 * @subcategory root
 * @namespace main
 *
 * @function
 * @param {Object} router - Vue routes
 * @param {Object} store  - Vuex storage
 */
new Vue({
  router,
  store,
  mounted() {
    /**
     * Fetch data from local storage and register it in Vuex<br>
     * Set data to an empty array if none is found<br>
     * This runs on page load
     *
     * @category client
     * @subcategory root
     * @namespace main.getData
     *
     * @function
     */
    let stickers = JSON.parse(localStorage.getItem('stickers')) || [];
    this.$store.commit('setStickers', stickers);
  },
  render: h => h(App)
}).$mount('#app');