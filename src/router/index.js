import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/services',
      name: 'Services',
      component: () => import('@/views/ServicesView.vue'),
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: PortfolioView,
    },
    {
      path: '/project/:id',
      name: 'ProjectDetail',
      component: ProjectDetailView,
      props: true,
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: () => import('@/views/BlogsView.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/views/ContactView.vue'),
    },
  ],
})

export default router
