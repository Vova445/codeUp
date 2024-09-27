<template>
   <main-master-page>
      <section class="courses-all">
         <div class="courses-all__navigation navigation-courses-all">
            <nav class="navigation-courses-all__container">
               <router-link class="navigation-courses-all__link" :to="{ name: 'test-one' }">go to route 1</router-link>
               <router-link class="navigation-courses-all__link" :to="{ name: 'test-two' }">go to route 2</router-link>
               <router-link class="navigation-courses-all__link" :to="{ name: 'test-three' }">go to route 3</router-link>
            </nav>
         </div>
         <div class="courses-all__content content-courses">
            <div class="content-courses__container">
               <router-view />
            </div>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../../masterPages/MainMasterPage.vue'
</script>

<style lang="scss" scoped>
.navigation-courses-all {
   &:not(:last-child) {
      margin-bottom: 80px;
   }
   // .navigation-courses-all__container
   &__container {
      padding: 0;
      background-color: #2b2b2b;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      @media (any-hover: hover) {
         &:hover {
            .router-link-active {
               color: #fff;
               background-color: transparent;
            }
         }
      }
   }
   &__link {
      text-wrap: nowrap;
      transition: all 0.5s ease 0s;
      font-size: 15px;
      font-weight: 500;
      padding: 15px 20px;
      border-radius: 12px;

      &.router-link-active {
         background-color: #d9d9d9;
         color: #000;
         @media (any-hover: hover) {
            &:hover {
               background-color: #d9d9d9;
               color: #000;
            }
         }
      }
      @media (any-hover: hover) {
         &:hover {
            background-color: #d9d9d9;
            color: #000;
         }
      }
   }
}
</style>
