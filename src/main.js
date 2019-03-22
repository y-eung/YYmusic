// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' //引入store
import axios from 'axios' //原型模式给VUE构造函数添加一个axios方法
// import $ from 'jquery'
import 'lib-flexible/flexible.js'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
Vue.use(MuseUI);
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  // render (h) {
  //   return h('mu-button', {}, );
  // },
  template: '<App/>'
})
