import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookie from 'js-cookie'
import '@/icons'

if (process.env.NODE_ENV !== 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookie.get('size') || 'medium', //组件大小
  //locale: enlang, 设置语言，中文无需设置
})

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
})
