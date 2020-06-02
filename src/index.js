import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'babel-polyfill'
// import "bulma/sass/utilities/_all.sass"
// import "bulma/sass/grid/columns.sass"

export const vue = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
