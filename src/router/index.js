import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login'),
    children: [
      {
        path: 'login',
        component: () => import('@/views/login'),
        name: 'login',
      },
    ],
  },
]

const router = new Router({
  history: process.env.VUE_APP_BASE_API,
  routes,
})

export default router
