import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/newraid',
    name: 'newraid',
    component: () => import('../views/NewRaidView.vue')
  },
  {
    path: '/playerstats',
    name: 'playerstats',
    component: () => import('../views/PlayerStats.vue')
  },
  {
    path: '/dini',
    name: 'dini',
    component: () => import('../views/DiniPlayground.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
