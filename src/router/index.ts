import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/WayStonePage.vue'),
        name: 'WayStone',
      },
      {
        path: 'table',
        component: () => import('@/views/TablePage.vue'),
        name: 'Table',
      },
      {
        path: 'relics',
        component: () => import('@/views/RelicsPage.vue'),
        name: 'Relics',
      },
      {
        path: 'vendor',
        component: () => import('@/views/VendorPage.vue'),
        name: 'Vendor',
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
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue'),
        name: 'Home',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
