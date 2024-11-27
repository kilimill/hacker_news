import { createRouter, createWebHistory } from 'vue-router'
import indexPage from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage,
    },
    {
      path: '/:id',
      name: 'card',
      component: () => import('../views/[id].vue'),
      props: true,
    },
  ],
})

export default router
