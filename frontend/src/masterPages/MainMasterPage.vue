<template>
   <div class="wrapper">
      <header-comp />
      <main class="main">
         <slot></slot>
      </main>
      <footer-comp />
   </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, nextTick, onUnmounted } from 'vue'
import HeaderComp from '../components/header/HeaderComp.vue'
import FooterComp from '../components/footer/FooterComp.vue'
import { useLocales } from '../moduleHelpers/i18n.js'
const { locale } = storeToRefs(useLocales())
const { setLocale } = useLocales()

onMounted(() => {
   const expectedLocale = localStorage.getItem('lastLocale')
   if (expectedLocale !== locale.value) {
      setLocale(expectedLocale)
   }

   nextTick(() => {
      setTimeout(() => {
         document.documentElement.classList.add('loaded')
      }, 100)
   })
   const updateResponsiveClass = () => {
      if (window.innerWidth < 1025) {
         document.documentElement.classList.add('mobile')
         document.documentElement.classList.remove('pc')
      } else {
         document.documentElement.classList.add('pc')
         document.documentElement.classList.remove('mobile')
      }
   }

   updateResponsiveClass()

   window.addEventListener('resize', updateResponsiveClass)
})
onUnmounted(() => {
   document.documentElement.classList.remove('loaded')
})
</script>

<style lang="scss" scoped></style>
