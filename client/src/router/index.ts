import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/index.vue")
  },
  {
    path: "/category",
    name: "category",
    component: () => import("../views/category/index.vue")
  },
  {
    path: "/pigeonhole",
    name: "pigeonhole",
    component: () => import("../views/pigeonhole/index.vue")
  },

  {
    path: "/about",
    name: "about",
    component: () => import("../views/about/index.vue")
  }, {
    path: "/details",
    name: "details",
    component: () => import("../views/details/index.vue")
  },
  {
    path: "/",
    redirect: '/home'
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;