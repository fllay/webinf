import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/editmap",
    name: "Editmap",
    component: () =>
      import(/* webpackChunkName: "editmap" */ "../views/EditMapView.vue"),
  },
  {
    path: "/blockly",
    name: "Blockly",
    component: () =>
      import(/* webpackChunkName: "blockly" */ "../views/BlocklyView.vue"),
  },
  {
    path: "/navigation",
    name: "Navigation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "navigation" */ "../views/NavigationView.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
