// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'configPath'
import HeaderNav from './components/header-nav'
import RightMenu from './components/right-menu'
import axios from './components/data-transport/index.js'
import VueResource  from 'vue-resource'
import lssPlugin from './components/pluginInstall'
import AutomatedForm from './components/automated-form'

Vue.component("HeaderNav",HeaderNav)
Vue.component("RightMenu",RightMenu)
Vue.component('AutomatedForm', AutomatedForm)

Vue.use(Vuex)
Vue.use(lssPlugin)
Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
/* eslint-disable no-new */
global.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
