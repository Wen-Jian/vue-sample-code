import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
// const routes = [
  {
    path: '/chat',
    name: 'root',
    redirect: '/chat/login',
    // component: () => import('../views/login/Login.vue'),
    children: [
      {
        path: 'client',
        name: 'chat',
        component: () => import('../views/chat/ChatApp.vue'),
      },
      {
        path: 'login',
        name: 'lv2',
        component: () => import('../views/login/Login.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
