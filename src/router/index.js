import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ServicesView from '@/views/ServicesView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import BlogsView from '@/views/BlogsView.vue'
import ArticleView from '@/views/ArticleView.vue'
import ContactView from '@/views/ContactView.vue'
import ProjectView from '@/views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogsView,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/project/:id',
      name: 'project',
      component: ProjectView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有 savedPosition (使用瀏覽器的前進/後退按鈕)，則使用它
    if (savedPosition) {
      return savedPosition
    }

    // 如果目標路由有指定滾動位置的 hash，則滾動到該元素
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    // 否則滾動到頁面頂部
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
