// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import titleMixin from './mixins/title-mixin'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.mixin(titleMixin)
Vue.use(Vuetify)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdiSvg'
    }
  }),
  components: { App },
  template: '<App/>'
})
