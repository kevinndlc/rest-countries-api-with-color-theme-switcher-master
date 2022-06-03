import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/CountriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/countries',
    },
    {
      path: '/countries',
      name: 'countries',
      component: () => import('@/views/CountriesView.vue'),
    },
    {
      path: '/country/:code',
      name: 'country',
      component: () => import('@/views/CountryView.vue'),
    },
    {
      path: '/:notfound(.*)*',
      redirect: '/countries'
    }
  ],
});

export default router
