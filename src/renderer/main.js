import Vue from 'vue'
import axios from 'axios'
import db from './js/db'
import Vuetify from 'vuetify'
import Gravatar from 'vue-gravatar'
import Web3 from 'web3'
import config from '../../config'
import abi from '../../contracts/ABI/Octopeth_sol-Octopeth.json'

import App from './App'
import router from './router'
import store from './store'

import Navbar from '@/components/Layout/Navbar/Navbar.vue'
import Auth from '@/components/Layout/Views/Auth/Auth.vue'
import MyDapps from '@/components/Layout/Views/Store/MyDapps.vue'
import Explore from '@/components/Layout/Views/Store/Explore.vue'
import Publisher from '@/components/Layout/Views/Store/Publisher.vue'
import dAppViewer from '@/components/Layout/Views/dAppViewer/dAppViewer.vue'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './styles/main.css'

// Global Components
Vue.component('Navbar', Navbar)
Vue.component('Auth', Auth)
Vue.component('Explore', Explore)
Vue.component('MyDapps', MyDapps)
Vue.component('dAppViewer', dAppViewer)
Vue.component('Publisher', Publisher)

Vue.use(require('vue-electron'))
Vue.use(require('electron-titlebar'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('v-gravatar', Gravatar)

Vue.use(Vuetify, {
  theme: {
    primary: '#ffffff',
    secondary: '#222222'
  }
})

// NeDB
Vue.prototype.$db = db

// Helpers
Vue.prototype.$helpers = require('./js').default

// Web3 and Contract
Vue.prototype.$web3 = new Web3(config.provider)
Vue.prototype.$contract = new Vue.prototype.$web3.eth.Contract(abi, require('../../contracts/addressbook.json').ropsten['Octopeth.sol:Octopeth'], {gas: 6000000, gasPrice: 1})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
