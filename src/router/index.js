import Vue from 'vue'
import Router from 'vue-router'
import IndexHome from '@/source/index.vue'
import AssetManage from '@/source/assetManage/assetManage.vue'
import DemoForum from '@/source/demoForum/demoForum.vue'
import DemoForm from '@/source/demoForm/demoForm.vue'

import TransferParameters from '@/source/transferParameters/transferParameters.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexHome',
      component: IndexHome
    },
    {
      path: '/assetManage',
      name: 'assetManage',
      component: AssetManage
    },
    {
      path: '/demoForum',
      name: 'demoForum',
      component: DemoForum
    },
    {
      path: '/demoForm',
      name: 'demoForm',
      component: DemoForm
    },
    {
      path: '/transferParameters',
      name: 'transferParameters',
      component: TransferParameters
    }
  ]
})
