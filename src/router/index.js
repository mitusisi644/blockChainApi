import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexHome from '@/source/index.vue'
import AssetManage from '@/source/assetManage/assetManage.vue'
import DemoForum from '@/source/demoForum/demoForum.vue'
import DemoForm from '@/source/demoForm/demoForm.vue'

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
    }
  ]
})
