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
import HeaderComp from '../components/header/HeaderComp.vue'
import FooterComp from '../components/footer/FooterComp.vue'
import { onMounted, nextTick, onUnmounted } from 'vue'

onMounted(() => {
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
