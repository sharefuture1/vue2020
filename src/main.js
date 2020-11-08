import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import ViewUI from 'view-design'
import '../my-themes/index.less'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(ViewUI)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

