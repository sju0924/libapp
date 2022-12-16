import Vue from 'vue'
// vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'


import App from './App.vue'

Vue.prototype.$eventBus = new Vue();
Vue.prototype.$axios = axios
export default new Vuetify({
  icons: {
    iconfont: 'md' // 'md' || 'mdi' || 'fa' || 'fa4'
  }
})

Vue.use(Vuetify);

Vue.config.productionTip = false

new Vue({
    vuetify: new Vuetify(),
    render: h => h(App)
}).$mount('#app')