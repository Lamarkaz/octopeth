import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/store',
      name: 'Store',
      component: require('@/components/Layout/Views/Store.vue').default
    },
    {
      path: '/dapp',
      name: 'dAppViewer',
      component: require('@/components/Layout/Views/dAppViewer/dAppViewer.vue').default
    },
    {
      path: '*',
      redirect: '/store'
    }
  ]
})
