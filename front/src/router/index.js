import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomePageView.vue';
import GalleryPage from '../views/GalleryPage.vue';
 import MatchsPage from '@/views/MatchsPage.vue';
import LoginPage from '@/views/LoginPage.vue';
 import RegistrationPage from '@/views/RegistrationPage.vue';
 import AdminLogin from '@/views/AdminLogin.vue';
 import AdminDashboard from '@/views/AdminDashboard.vue';
import ScoresPage from '@/views/ScoresPage.vue';
import EntrainementPage from '@/views/EntrainementPage.vue';
import AdminReservations from '@/views/AdminReservations.vue';
 import EventsPage from '@/views/EventsPage.vue';
 import ReservationBoard from '@/views/ReservationsBoard.vue'
 import MesReservations from '@/views/MesReservations.vue'
import ContactForm from '@/views/ContactPage.vue'
import TarifPage from '@/views/TarifPage.vue';
import AccesPage from '@/views/AccesPage.vue';
import conditiongenerale from '../views/CgvPage.vue';
import BlogPage from '@/views/BlogPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogPage
    },
    {
      path: '/acces',
      name: 'acces',
      component: AccesPage
    },
    {
      path: '/conditiongenerale',
      name: '/conditiongenerale',
      component: conditiongenerale,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactForm
    },
    {
      path: '/tarif',
      name: 'tarif',
      component: TarifPage
    },

    {
       path: '/evenements',
      name: 'evenments',
      component: EventsPage
     },
     {
      path: '/entrainement',
       name: 'EntrainementPage',
       component: EntrainementPage
     },
    {
       path: '/admin/login',
       name: 'AdminLogin',
       component: AdminLogin
     },
     {
       path: '/admin/dashboard',
   name: 'AdminDashboard',
       component: AdminDashboard,
       meta: { requiresAuth: true, isAdmin: true }
     },
     {
      path: '/mes-reservations',
       name: 'mesreservations',
       component: MesReservations,
     },
     {
       path: '/admin/reservations',
       name: 'ReservationBoard',
       component: ReservationBoard,
       meta: { requiresAuth: true, isAdmin: true }
     },
     {
     path: '/gallerie',
       name: 'GalleryPage',
      component: GalleryPage
     },
     {
       path: '/matchs',
       name: 'MatchsPage',
      component: MatchsPage
     },
   
     {
      path: '/scores',
      name: 'ScoresPage',
      component: ScoresPage
    },
      {
      path: '/login',
       name: 'Login',
       component: LoginPage
     },
     {
      path: '/inscription',
       name: 'RegistrationPage',
       component: RegistrationPage
     },
     {
       path: '/admin/reservations',
       name: 'AdminReservations',
       component: AdminReservations,
       meta: { requiresAuth: true, isAdmin: true }, 
     },
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'Login' });
    } else if (to.matched.some(record => record.meta.isAdmin) && role !== 'admin') {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
