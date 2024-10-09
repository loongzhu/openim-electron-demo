import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    // redirect: "/login",
    component: () => import("../pages/login/index.vue"),
  },
  // {
  //   path: "/layout",
  //   name: "baselayout",
  //   component: () => import("../layouts/BaseLayout.vue"),
  //   children: [
  //     {
  //       path: "/login",
  //       name: "login",
  //       component: () => import("../pages/login/index.vue"),
  //     },
  //   ],
  // },
  // {
  //     path: '/login',
  //     name: 'layout',
  //     redirect: '/chat',
  //     component: () => import('../pages/layout/index.vue'),
  //     children: [
  //         {
  //             path: '/chat',
  //             name: 'chat',
  //             component: () => import('../pages/chat/index.vue'),
  //         },
  //         {
  //             path: '/addressBook',
  //             name: 'addressBook',
  //             component: () => import('../pages/addressBook/index.vue'),
  //         }
  //     ]
  // },
];

// 创建Router实例
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
