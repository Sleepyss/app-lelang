import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import axios from 'axios'
import VueHtml2pdf from 'vue-html2pdf'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false


Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'))
Vue.use(VueSweetalert2)
Vue.use(VueHtml2pdf)

Vue.component('sidebar-component',
  require('./components/Template/SidebarC.vue').default);
Vue.component('navbar-component',
  require('./components/Template/NavbarC.vue').default);
Vue.component('footer-component',
  require('./components/Template/FooterC.vue').default);

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('auth');

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')