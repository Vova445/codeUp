<template>
   <header ref="header" class="header">
      <div class="header__container">
         <div class="header__box">
            <router-link :to="{ name: 'home' }" class="header__logo">
               <img src="../../assets/img/logo.svg" alt="" />
            </router-link>
            <div ref="menu" class="header__menu menu-header">
               <nav class="menu-header__body">
                  <div class="menu-header__menu">
                     <ul class="menu-header__list">
                        <li class="menu-header__item">
                           <button class="menu-header__btn-item">
                              {{ $t('header.educationalCourses') }}
                           </button>
                        </li>
                        <li class="menu-header__item">
                           <router-link class="menu-header__btn-item" :to="{ name: 'news' }">{{ $t('header.news') }}</router-link>
                        </li>
                        <li class="menu-header__item">
                           <router-link class="menu-header__btn-item" :to="{ name: 'contacts' }">{{ $t('header.contacts') }}</router-link>
                        </li>
                        <li class="menu-header__item">
                           <button class="menu-header__btn-item" @click="openSubList">
                              {{ $t('header.aboutUs') }} <span><font-awesome-icon :icon="['fas', 'chevron-down']" /></span>
                           </button>
                           <ul class="sub-list">
                              <li class="sub-list__item"><router-link class="sub-list__btn" :to="{ name: 'faq' }">FAQ</router-link></li>
                              <li class="sub-list__item">
                                 <router-link class="sub-list__btn" :to="{ name: 'about' }">{{ $t('header.aboutCodeUp') }}</router-link>
                              </li>
                              <li class="sub-list__item">3</li>
                           </ul>
                        </li>
                        <li class="menu-header__item">
                           <button class="menu-header__btn-item" @click="openSubList">
                              {{ $t('header.languages') }} <span><font-awesome-icon :icon="['fas', 'chevron-down']" /></span>
                           </button>
                           <ul class="sub-list sub-list--small">
                              <li class="sub-list__item"><button @click="setLocale('en')" class="sub-list__btn">en</button></li>
                              <li class="sub-list__item"><button @click="setLocale('ua')" class="sub-list__btn">укр</button></li>
                           </ul>
                        </li>
                     </ul>
                  </div>
               </nav>
            </div>
            <Teleport v-if="isReady" :to="isMobile ? '.menu-header__menu' : '.header__box'">
               <router-link v-if="isUser" :to="{ name: 'user' }" class="header__user-btn">
                  <img v-if="avatar" :src="avatar" alt="User Avatar" class="header__avatar" width="50"/>
                  <font-awesome-icon v-else :icon="['fas', 'user']" />
               </router-link>
               <router-link v-else :to="{ name: 'register' }" class="header__login-btn">
                  {{ $t('buttons.registerLogin') }}
               </router-link>
            </Teleport>
         </div>
         <button @click="onIconMenu" class="icon-menu"><span></span></button>
      </div>
   </header>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import axios from 'axios'
import { useLocales } from '../../moduleHelpers/i18n.js'

const { setLocale } = useLocales()
const isMobile = ref(false)
const avatar = ref('')
const isReady = ref(false)
const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')

const checkWindowSize = () => {
   isMobile.value = window.innerWidth < 501.98
   if (window.innerWidth > 1024) {
      document.documentElement.classList.remove('menu-open')
   }
}

function isAbsoluteURL(url) {
   return /^https?:\/\//i.test(url)
}

function onIconMenu() {
   document.documentElement.classList.toggle('menu-open')
   document.documentElement.classList.toggle('lock')
}

function openSubList(e) {
   const isTouch = document.documentElement.classList.contains('touch')
   if (isTouch) {
      const targetElement = e.target.closest('li')
      document.querySelectorAll('.menu-header__item.open').forEach((item) => {
         if (item !== targetElement) item.classList.remove('open')
      })
      targetElement.classList.toggle('open')
   }
}

function closeSubListOnClickOutside(e) {
   if (!e.target.closest('.menu-header__item')) {
      document.querySelectorAll('.menu-header__item.open').forEach((item) => {
         item.classList.remove('open')
      })
   }
}

const isUser = computed(() => !!localStorage.getItem('authToken'))

onMounted(async () => {
   document.addEventListener('click', closeSubListOnClickOutside)
   isReady.value = true
   checkWindowSize()
   window.addEventListener('resize', checkWindowSize)

   const token = localStorage.getItem('authToken')
   if (token) {
      try {
         const response = await axios.get(`${apiUrl}/api/user-profile`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         avatar.value = response.data.avatar || ''
      } catch (err) {
         console.error('Error fetching avatar:', err)
      }
   }

   window.addEventListener('avatar-updated', async () => {
      const token = localStorage.getItem('authToken')
      if (token) {
         try {
            const response = await axios.get(`${apiUrl}/api/user-profile`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            })
            avatar.value = response.data.avatar || ''
         } catch (err) {
            console.error('Error updating avatar:', err)
         }
      }
   })
})

onUnmounted(() => {
   document.removeEventListener('click', closeSubListOnClickOutside)
   window.removeEventListener('resize', checkWindowSize)
})
</script>


<style lang="scss" scoped>
.header {
   position: fixed;
   z-index: 90;
   background-color: #0c0b0b;
   top: 0;
   left: 0;
   width: 100%;
   transition: opacity 1s ease;

   &__container {
      min-height: clamp(3.75rem, 0.936rem + 5.871vw, 5.625rem);
      display: grid;
      align-items: center;
      grid-template-columns: 1fr auto;
      @media (max-width: 1024px) {
         gap: 20px;
         grid-template-columns: 1fr auto;
      }
      @media (max-width: 500px) {
         justify-content: space-between;
         grid-template-columns: 1fr auto;
      }
   }
   &__box {
      display: grid;
      align-items: center;
      grid-template-columns: auto 1fr auto;
      @media (max-width: 1024px) {
         gap: 5px;
      }
      @media (max-width: 500px) {
         grid-template-columns: 1fr;
      }
   }
   &__logo {
      transition: opacity 0.3s ease 0s;
      position: relative;
      z-index: 50;
      img {
         width: 43px;
         height: 43px;
         @media (max-width: 1024px) {
            width: 36px;
            height: 36px;
         }
      }
      @media (any-hover: hover) {
         &:hover {
            opacity: 0.8;
         }
      }
   }

   &__user-btn,
   &__login-btn {
   }

   &__user-btn {
      transition: all 0.3s ease 0s;
      font-size: 20px;
      transition: all 0.4s ease;
      @media (max-width: 500px) {
         font-size: clamp(2.5rem, 1.036rem + 0.447vw, 3.2rem);
         text-align: center;
         padding: 20px 5px;
      }
      @media (any-hover: hover) {
         &:hover {
            opacity: 0.8;
            transform: scale(1.1);
         }
      }
      img{
         /* width: 50px; */
         /* height: 50px; */
         border-radius: 50%;
      }
   }

   &__login-btn {
      transition: background-color 0.3s ease;
      position: relative;
      z-index: 50;
      background-color: #3c776f;
      border-radius: 12px;
      line-height: 1.2;
      padding: 10px 20px;
      @media (any-hover: hover) {
         &:hover {
            background-color: #2c5852;
         }
      }
      @media (max-width: 500px) {
         font-size: clamp(1.125rem, 1.036rem + 0.447vw, 1.25rem);
         text-align: center;
         padding: 20px 5px;
      }
   }
}

.menu-header {
   &__body {
      transition: all 0.3s ease 0.1s;
      @media (max-width: 1024px) {
         position: fixed;
         width: 100%;
         height: 100%;
         z-index: 9;
         left: -100%;
         top: 0;
         overflow: auto;
         background-color: #000000d8;
         padding: 180px 20px 20px 20px;
         
         &::before {
            content: '';
            position: fixed;
            z-index: 10;
            transition: left 0.3s ease 0s;
            background-color: #000;
            top: 0;
            left: -100%;
            width: 100%;
            height: 60px;
         }
         .menu-open & {
            left: 0;
            top: 0;
            &::before {
               transition: all 0.3s ease 0.1s;
               left: 0;
               top: 0;
            }
         }
      }
   }
   &__menu {
      @media (max-width: 1024px) {
         height: 100%;
         text-align: center;
      }
      @media (max-width: 500px) {
         display: flex;
         gap: 40px;
         flex-direction: column;
         justify-content: space-between;
      }
   }

   &__list {
      display: flex;
      flex-wrap: wrap;
      line-height: 1.2;
      gap: 15px;
      align-items: center;
      justify-content: center;
      @media (max-width: 1024px) {
         flex-direction: column;

         text-align: center;
         font-size: clamp(1.438rem, 1.124rem + 1.566vw, 1.875rem);
         gap: clamp(2.5rem, 0.98rem + 4.474vw, 3.125rem);
      }
   }

   &__item {
      cursor: pointer;
      position: relative;
      transition: color 0.3s ease 0s;
      position: relative;
      @media (any-hover: hover) {
         &:hover {
            color: #f9cf39;
         }
      }
      &.open {
         color: #f9cf39;
      }
   }
   &__btn-item {
      display: flex;
      align-items: center;
      gap: 5px;
      span {
         transition: all 0.3s ease 0s;
      }
   }
}
.icon-menu {
   display: none;
   @media (max-width: 1024px) {
      display: block;
      position: relative;
      width: 25px;
      height: 20px;
      z-index: 50;
      @media (any-hover: none) {
         cursor: default;
      }
      span,
      &::before,
      &::after {
         content: '';
         transition: all 0.3s ease 0s;
         right: 0;
         position: absolute;
         width: 100%;
         height: 2px;
         background-color: #ffffff;
      }
      &::before {
         top: 0;
      }
      &::after {
         width: 70%;
         bottom: 0;
      }
      span {
         top: 50%;
         width: 90%;
         transform: translate(0, -50%);
      }
   }
   .menu-open & {
      span {
         width: 0;
      }
      &::before,
      &::after {
         width: 100%;
      }
      &::before {
         transform: rotate(-45deg) translate(0, -50%);
         top: calc(50% - 1px);
      }
      &::after {
         transform: rotate(45deg) translate(0, 50%);
         bottom: calc(50% - 0px);
      }
   }
}
.menu-header__list {
   @media (any-hover: hover) {
      & > li:hover {
         .sub-list {
            pointer-events: auto;
            opacity: 1;
            visibility: visible;
            transform: translate(0, 0);
            box-shadow: 0 10px 20px #000;
            @media (max-width: 1024px) {
               transform: translate(-50%, 0);
            }
         }
         span {
            transform: rotate(180deg);
         }
      }
   }
   & > li.open {
      .sub-list {
         pointer-events: auto;
         opacity: 1;
         visibility: visible;
         transform: translate(0, 0);
         //box-shadow: 0 10px 20px #6b6b6b;
         
         @media (max-width: 1024px) {
            transform: translate(-50%, 0);
         }
      }
      span {
         transform: rotate(180deg);
      }
   }
}

.sub-list > li {
}
.sub-list {
   transition: all 0.3s ease 0s;
   overflow: hidden;
   pointer-events: none;
   opacity: 0;
   visibility: hidden;
   transform: translate(0, -20%);
   border-radius: 8px;
   min-width: 300px;
   padding: 10px 0 0 0;
   position: absolute;
   z-index: 50;
   top: 80%;
   left: 0;
   color: #fff;
   min-width: 150px;
   @media (max-width: 1024px) {
      padding: 15px 0 0 0;

      min-width: clamp(15.625rem, 9.969rem + 28.281vw, 31.25rem);
      left: 50%;
      transform: translate(-50%, -20%);
   }
   &--small {
      min-width: 80px;
      .sub-list__item {
         padding: 5px 8px;
         &:first-child {
            padding-top: 5px;
         }
         &:last-child {
            padding-bottom: 5px;
         }
      }
       @media (max-width: 1024px) {
         min-width: 120px;
       }
   }
   &__item {
      padding: 7px 5px;
      transition: all 0.3s ease 0s;
      background-color: #2b2b2b;
      &:first-child {
         border-radius: 8px 8px 0px 0;
      }
      @media (any-hover: hover) {
         &:hover {
            background-color: #1e1e1e;
         }
      }
      &:not(:last-child) {
         border-bottom: 1px solid #474747;
      }
      @media (max-width: 1024px) {
         font-size: 20px;
      }
      
   }
   &__btn {
      display: inline-block;
      text-align-last: left;
      width: 100%;
      height: 100%;
   }
}


</style>
