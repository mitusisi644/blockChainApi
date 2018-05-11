// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'configPath'
import HeaderNav from './components/headerNav/headerNav'
import RightMenu from './components/rightMenu/rightMenu'
import axios from './components/data-transport/index.js'
import  VueResource  from 'vue-resource'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.prototype.$axios = axios
Vue.component("HeaderNav",HeaderNav)
Vue.component("RightMenu",RightMenu)
Vue.prototype.$loading.hasOwnProperty("background","rgba(0,0,0,0.8)")
Vue.config.productionTip = false

/* eslint-disable no-new */
global.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//Vue.prototype.$notify = Notification
