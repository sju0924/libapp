import Vue from 'vue'
// vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


import App from './App.vue'


Vue.use(Vuetify);

Vue.config.productionTip = false

new Vue({
    vuetify: new Vuetify(),
    render: h => h(App)
}).$mount('#app')