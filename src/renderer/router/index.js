import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/store',
      name: 'Store',
      component: require('@/components/Store').default
    },
    {
      path: '/dapp',
      name: 'dAppViewer',
      component: require('@/components/dAppViewer').default
    },
    {
      path: '/sign',
      name: 'Sign',
      component: require('@/components/Sign').default
    },
    {
      path: '*',
      redirect: '/sign'
    }
  ]
})
