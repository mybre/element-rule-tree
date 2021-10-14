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
  {
    path: '/scopedSlot',
    name: 'scopedSlot',
    // route level code-splitting
    // this generates a separate chunk (scopedSlot.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "scopedSlot" */ '../views/scopedSlot.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
