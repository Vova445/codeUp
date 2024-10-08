import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { checkTwoFAStatus } from '../../utils/auth.js'
import Cookies from 'js-cookie'

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
         path: '/all-courses',
         name: 'all-courses',
         component: () => import('../views/CoursesDetailed/AllCoursesPage.vue'),
         redirect: { name: 'languages' },
         children: [
            {
               name: 'languages',
               path: 'languages',
               component: () => import('../views/CoursesDetailed/LanguagesLIst.vue'),
            },
            {
               name: 'frameworks',
               path: 'frameworks',
               component: () => import('../views/CoursesDetailed/FrameworksList.vue'),
            },
            {
               name: 'libraries',
               path: 'libraries',
               component: () => import('../views/CoursesDetailed/LibrariesList.vue'),
            },
            {
               name: 'tools',
               path: 'tools',
               component: () => import('../views/CoursesDetailed/ToolsList.vue'),
            },
            {
               name: 'other',
               path: 'other',
               component: () => import('../views/CoursesDetailed/OtherList.vue'),
            },
         ],
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/web-interfaces',
         name: 'web-interfaces',
         component: () => import('../views/coursesLanguagesPages/WebInterfacesConstruction.vue'),
         meta: {
            requireAuth: false,
         },
         props: (route) => ({ additionalList: route.query.additionalList }),
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
         path: '/two-factor-auth/googleAuth',
         name: 'googleAuth',
         component: () => import('../views/TwoFactorAuth/GoogleAuthPage.vue'),
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
         path: '/reset-password',
         name: 'reset-password',
         component: () => import('../views/TwoFactorAuth/ResetPassword.vue'),
         meta: {
            requireAuth: false,
         },
         props: (route) => ({ token: route.query.token }),
      },
      {
         path: '/twoFactorAuth/loading',
         name: 'loadingEmail',
         component: () => import('../components/twoFactor/LoadingAfterAuth.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/loading',
         name: 'loading',
         component: () => import('../components/login/loading.vue'),
         meta: {
            requireAuth: false,
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
   scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
         return savedPosition
      } else {
         return { left: 0, top: 0, behavior: 'smooth' }
      }
   },
})

router.beforeEach(async (to) => {
   document.documentElement.classList.remove('menu-open')
   document.documentElement.classList.remove('lock')
   if (to.meta?.requireAuth) {
      const userToken = Cookies.get('authToken')
      if (!userToken) {
         return { name: 'login' }
      }
   }
})

export default router
