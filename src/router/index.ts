import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/HomePage.vue'),
        name: 'Home',
      },
      {
        path: 'test',
        component: () => import('@/views/TestPage.vue'),
        name: 'Test',
      },
      {
        path: 'demo',
        component: () => import('@/views/NewTableTest.vue'),
        name: 'TestDemo',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
