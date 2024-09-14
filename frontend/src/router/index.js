import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { checkTwoFAStatus } from '../../utils/auth.js'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomeView,
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/news',
         name: 'news',
         component: () => import('../views/NewsPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/contacts',
         name: 'contacts',
         component: () => import('../views/ContactsPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/register',
         name: 'register',
         component: () => import('../views/RegisterPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/login',
         name: 'login',
         component: () => import('../views/LoginPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/about',
         name: 'about',
         component: () => import('../views/AboutCodeUp.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/user',
         name: 'user',
         component: () => import('../views/UserPage.vue'),
         meta: {
            requireAuth: true,
         },
      },
      {
         path: '/two-factor-auth',
         name: 'twoFactorAuth',
         component: () => import('../views/TwoFactorAuth/TwoFactorAuthPage.vue'),
         meta: {
            requireAuth: true,
         },
         beforeEnter: async (to, from, next) => {
            const isTwoFAEnabled = await checkTwoFAStatus()
            if (isTwoFAEnabled) {
               next({ name: 'user' })
            } else {
               next()
            }
         },
      },
      {
         path: '/two-factor-auth/qr-code',
         name: 'qrCode',
         component: () => import('../views/TwoFactorAuth/QrCodePage.vue'),
         meta: {
            requireAuth: false,
         },
         beforeEnter: async (to, from, next) => {
            const isTwoFAEnabled = await checkTwoFAStatus()
            if (isTwoFAEnabled) {
               next({ name: 'user' })
            } else {
               next()
            }
         },
      },
      {
         path: '/two-factor-auth/phone',
         name: 'phoneAuth',
         component: () => import('../views/TwoFactorAuth/PhonePage.vue'),
         meta: {
            requireAuth: false,
         },
         beforeEnter: async (to, from, next) => {
            const isTwoFAEnabled = await checkTwoFAStatus()
            if (isTwoFAEnabled) {
               next({ name: 'user' })
            } else {
               next()
            }
         },
      },
      {
         path: '/two-factor-auth/email',
         name: 'email',
         component: () => import('../views/TwoFactorAuth/EmailPage.vue'),
         meta: {
            requireAuth: false,
         },
         beforeEnter: async (to, from, next) => {
            const isTwoFAEnabled = await checkTwoFAStatus()
            if (isTwoFAEnabled) {
               next({ name: 'user' })
            } else {
               next()
            }
         },
      },
      {
         path: '/twoFactorAuth/loading',
         name: 'loadingEmail',
         component: () => import('../components/twoFactor/LoadingAfterAuth.vue'),
         meta: {
            requireAuth: true,
         },
      },
      {
         path: '/faq',
         name: 'faq',
         component: () => import('../views/FaqPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/:pathMatch(.*)*',
         name: 'notFound',
         component: () => import('../components/error/ErrorComp.vue'),
         meta: {
            requireAuth: false,
         },
      },
   ],
})

router.beforeEach(async (to) => {
   document.documentElement.classList.remove('menu-open')
   document.documentElement.classList.remove('lock')
   if (to.meta?.requireAuth) {
      const userToken = localStorage.getItem('authToken')
      if (!userToken) {
         return { name: 'login' }
      }
   }
})

export default router
