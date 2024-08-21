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
                        <li class="menu-header__item">{{ $t('header.educationalCourses') }}</li>
                        <li class="menu-header__item">
                           <router-link :to="{ name: 'news' }">{{ $t('header.news') }}</router-link>
                        </li>
                        <li class="menu-header__item">
                           <router-link :to="{ name: 'contacts' }">{{ $t('header.contacts') }}</router-link>
                        </li>
                        <li class="menu-header__item">
                           <button>{{ $t('header.languages') }}</button>
                        </li>
                     </ul>
                  </div>
               </nav>
            </div>
            <Teleport v-if="isReady" :to="isMobile ? '.menu-header__menu' : '.header__box'">
               <router-link v-if="isUser" :to="{ name: 'user' }" class="header__user-btn">
                  <img
                     v-if="avatar"
                     :src="isAbsoluteURL(avatar) ? avatar : `${apiUrl}/${avatar}`"
                     alt="User Avatar"
                     class="header__avatar"
                  />
                  <font-awesome-icon v-else :icon="['fas', 'user']" />
               </router-link>
               <router-link v-else :to="{ name: 'register' }" class="header__login-btn button">
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
// variables
const isMobile = ref(false)
const avatar = ref('')
const isReady = ref(false)
const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
// functions
const checkWindowSize = () => {
   isMobile.value = window.innerWidth < 501.98

   if (window.innerWidth > 767) {
      document.documentElement.classList.remove('menu-open')
   }
}
function isAbsoluteURL(url) {
   return /^https?:\/\//i.test(url)
}
function onIconMenu() {
   document.documentElement.classList.toggle('menu-open')
}

//=computeds
const isUser = computed(() => localStorage.getItem('authToken'))

onMounted(async () => {
   isReady.value = true
   checkWindowSize()
   window.addEventListener('resize', checkWindowSize)
   const token = isUser.value
   if (token) {
      try {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
         console.log('Fetching user profile for avatar:', `${apiUrl}/api/user-profile`)
         const response = await axios.get(`${apiUrl}/api/user-profile`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
         })
         avatar.value = response.data.avatar || ''
         console.log('Avatar fetched:', avatar.value)
      } catch (err) {
         console.error('Error fetching avatar:', err)
      }
   }
   window.addEventListener('avatar-updated', async () => {
      const token = localStorage.getItem('authToken')
      if (token) {
         try {
            const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
            const response = await axios.get(`${apiUrl}/api/user-profile`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            })
            avatar.value = response.data.avatar || ''
            console.log('Avatar updated:', avatar.value)
         } catch (err) {
            console.error('Error updating avatar:', err)
         }
      }
   })
})
onUnmounted(() => {
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
   opacity: 0;
   transition: opacity 1s ease;

   &__container {
      min-height: clamp(3.75rem, 0.936rem + 5.871vw, 5.625rem);
      display: grid;
      align-items: center;
      grid-template-columns: 1fr auto;
      @media (max-width: 767.98px) {
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
      @media (max-width: 767.98px) {
         gap: 5px;
      }
      @media (max-width: 500px) {
         grid-template-columns: 1fr;
      }
   }
   &__logo {
      position: relative;
      z-index: 50;

      transform: translateX(-20px);
      opacity: 0;
      transition:
         transform 0.8s ease,
         opacity 0.8s ease;
      transition-delay: 0.2s;

      img {
         //width: 100%;
         width: 43px;
         height: 43px;
         @media (max-width: 767.98px) {
            width: 36px;
            height: 36px;
         }
      }
   }

   &__user-btn,
   &__login-btn {
      transform: translateY(-20px);
      opacity: 0;
      transition:
         transform 0.8s ease,
         opacity 0.8s ease;
   }

   &__user-btn {
      font-size: 20px;
      transition: all 0.4s ease;
      @media (max-width: 500px) {
         font-size: clamp(1.5rem, 1.036rem + 0.447vw, 2rem);
         text-align: center;
         padding: 20px 5px;
      }
   }

   &__login-btn {
      position: relative;
      z-index: 50;
      background-color: #234c5c;
      border-radius: 12px;
      line-height: 1.2;
      padding: 10px 20px;
      @media (any-hover: hover) {
         &:hover {
            background-color: #1b3a47;
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
      transition: all 0.3s ease 0s;
      @media (max-width: 767.98px) {
         position: fixed;
         z-index: 9;
         left: -100%;
         top: 0;
         overflow: auto;
         background-color: #000000d8;
         padding: 100px 20px 20px 20px;
         width: 100%;
         height: 100%;

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
               left: 0;
            }
         }
      }
   }
   &__menu {
      @media (max-width: 767.98px) {
         height: 100%;
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
      @media (max-width: 767.98px) {
         text-align: center;
         font-size: clamp(1.438rem, 1.124rem + 1.566vw, 1.875rem);
         gap: clamp(2.5rem, 0.98rem + 4.474vw, 3.125rem);
         //font-size: ;
      }
   }

   &__item {
      transform: translateY(-20px);
      opacity: 0;
      transition:
         transform 0.8s ease,
         opacity 0.8s ease;
      transition-delay: 0.4s;
      position: relative;

      &::before {
         content: '';
         transition: height 0.3s ease;
         position: absolute;
         width: 100%;
         left: 0;
         bottom: 0;
         height: 0;
         background-color: #fff;
      }
      @media (any-hover: hover) {
         &:hover {
            &::before {
               height: 2px;
            }
         }
      }
      @media (max-width: 767.98px) {
         width: 100%;
      }
   }
}
.icon-menu {
}
.icon-menu {
   display: none;
   @media (max-width: 767.98px) {
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
         //top: 50%;
         //transform: rotate(-45deg) translate(0, -50%);
         transform: rotate(-45deg) translate(0, -50%);
         top: calc(50% - 1px);
      }
      &::after {
         //bottom: 50%;
         //transform: rotate(45deg) translate(0, 50%);
         transform: rotate(45deg) translate(0, 50%);
         bottom: calc(50% - 0px);
      }
   }
}

.loaded {
   .header {
      opacity: 1;

      &__logo {
         transform: translateX(0);
         opacity: 1;
      }

      .menu-header__item {
         transform: translateY(0);
         opacity: 1;
      }

      .menu-header__item:nth-child(1) {
         transition-delay: 0.4s;
      }
      .menu-header__item:nth-child(2) {
         transition-delay: 0.5s;
      }
      .menu-header__item:nth-child(3) {
         transition-delay: 0.6s;
      }
      .menu-header__item:nth-child(4) {
         transition-delay: 0.7s;
      }

      &__user-btn {
         transform: translateY(0);
         opacity: 1;
         transition-delay: 1s;
      }

      &__login-btn {
         transform: translateY(0);
         opacity: 1;
         transition-delay: 1.1s;
      }
   }
   .header__avatar {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      object-fit: cover;
   }
}
</style>
