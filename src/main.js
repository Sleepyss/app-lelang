import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth");

Vue.use(VueAxios, axios)

Vue.component('sidebar-component',
  require('./components/Template/SidebarC.vue').default);
Vue.component('navbar-component',
  require('./components/Template/NavbarC.vue').default);
Vue.component('footer-component',
  require('./components/Template/FooterC.vue').default);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')