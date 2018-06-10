import Vue from 'vue'
import axios from 'axios'
import db from './db'
import Vuetify from 'vuetify'
import Gravatar from 'vue-gravatar'
import Web3 from 'web3'
import config from '../../config'
import artifact from '../../contracts/build/contracts/Octopeth'

import App from './App'
import router from './router'
import store from './store'
import Auth from '@/components/Auth'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Global Components
Vue.component('Auth', Auth)

Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('v-gravatar', Gravatar)

Vue.use(Vuetify, {
  theme: {
    primary: '#F7931E',
    secondary: '#222222'
  }
})

// NeDB
Vue.prototype.$db = db

// Web3
Vue.prototype.$web3 = new Web3(config.provider)
Vue.prototype.$contract = new Vue.prototype.$web3.eth.Contract(artifact.abi, config.address)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
