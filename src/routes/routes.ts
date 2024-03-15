import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
// const routes = [
  {
    path: '/chat',
    name: 'root',
    redirect: '/chat/auth',
    // component: () => import('../views/login/Login.vue'),
    children: [
      {
        path: 'client',
        name: 'chat',
        component: () => import('../views/chat/ChatApp.vue'),
      },
      {
        path: 'auth',
        name: 'authentication',
        component: () => import('../views/auth/Auth.vue'),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
