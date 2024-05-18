import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePageView.vue'
import GalleriePage from '../views/GalleryPage.vue'
import EventsPage from '@/views/EventsPage.vue'
// import BookingPage from '@/views/BookingPage.vue'
import MatchPage from '@/views/MatchPage.vue'
import ScorePage from '@/views/ScorePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'
import AdminLogin from '@/views/AdminLogin.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
  { path: '/admin/dashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, isAdmin: true } },
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'Login' });
    } else if (to.matched.some(record => record.meta.isAdmin) && role !== 'admin') {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router
