import Vue from 'vue'
import axios from 'axios'
import db from './db'
import Vuetify from 'vuetify'
import Gravatar from 'vue-gravatar'

import App from './App'
import router from './router'
import store from './store'
import Auth from '@/components/Auth'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Global Components
Vue.component('Auth', Auth)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('v-gravatar', Gravatar)

Vue.use(Vuetify)

Vue.prototype.$db = db

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
