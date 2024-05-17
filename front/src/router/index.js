import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePageView.vue'
import GalleriePage from '../views/GalleryPage.vue'
import EventsPage from '@/views/EventsPage.vue'
// import BookingPage from '@/views/BookingPage.vue'
import MatchPage from '@/views/MatchPage.vue'
import ScorePage from '@/views/ScorePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gallerie',
      name: 'gallerie',
      component: GalleriePage
    },
    {
      path: '/evenements',
      name: 'evenements',
      component: EventsPage
    },
    {
      path: '/matchs',
      name: 'matchs',
      component: MatchPage
    },
    {
      path: '/score',
      name: 'scores',
      component: ScorePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: RegistrationPage
    },
    // {
    //   path: '/reservation',
    //   name: 'reservation',
    //   component: BookingPage
    // },
  ]
})

export default router
