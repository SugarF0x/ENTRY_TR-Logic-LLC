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

// const gay =
// JSON.stringify(
//   [
//     {
//       title: 'Dummy title 1',
//       id: '1',
//       tasks: [
//         {
//           state: false,
//           text:  'Dummy checkbox 1'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 2'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 3'
//         }
//       ]
//     },{
//       title: 'Dummy title 2',
//       id: '2',
//       tasks: [
//         {
//           state: false,
//           text:  'Dummy checkbox 1'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 2'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 3'
//         }
//       ]
//     },{
//       title: 'Dummy title 3',
//       id: '3',
//       tasks: [
//         {
//           state: false,
//           text:  'Dummy checkbox 1'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 2'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 3'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 4'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 5'
//         },
//         {
//           state: false,
//           text:  'Dummy checkbox 6'
//         },
//       ]
//     },
//   ]
// );