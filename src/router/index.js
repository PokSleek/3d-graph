import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main/Main.vue'
import { ROUTES } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.home.path,
      name: ROUTES.home.name,
      component: Main
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: ROUTES.home.name }
    }
  ]
})

export default router
