import Vue from 'vue'
import VueRouter from 'vue-router'
import renderContent from '../views/renderContent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'renderContent',
    component: renderContent
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
