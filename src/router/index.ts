import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailedWordView from '@/views/DetailedWordView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/word/:word/:id',
      name: 'detailed-word',
      component: DetailedWordView
    }
  ]
})

export default router
