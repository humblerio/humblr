import Vue from 'vue'

import Vuetify from 'vuetify'

//import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'

// Managed packages
import Axios from './packages/axios/Axios'
import Auth from './packages/auth/Auth'

Vue.use(Vuetify, { theme: {
  primary: '#42b983',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(Auth)
Vue.use(Axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})