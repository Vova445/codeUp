<template>
   <main-master-page>
      <section class="courses-all">
         <div class="courses-all__navigation navigation-courses-all">
            <nav class="navigation-courses-all__container">
               <router-link
                  v-for="navigationItem in coursesData.coursesNavigationList"
                  :key="navigationItem.id"
                  class="navigation-courses-all__link"
                  :to="{ name: navigationItem.routeName }"
                  >{{ navigationItem.title }}</router-link
               >
               <div class="navigation-courses-all__select-navigation">
                  <custom-select v-model="selectedOptionId" :options-list="coursesData.coursesNavigationList" />
               </div>
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
import { ref } from 'vue'
import coursesData from '../../data/coursesList/index.json'
import CustomSelect from '../../components/customModules/CustomSelect.vue'
import MainMasterPage from '../../masterPages/MainMasterPage.vue'
const selectedOptionId = ref('4355fg34m3m345gfp4lfgb554bllmdfl4o5')
</script>

<style lang="scss" scoped>
.courses-all {
   &:not(:last-child) {
      margin-bottom: 60px;
   }
}
.navigation-courses-all {
   &:not(:last-child) {
      margin-bottom: 80px;
   }
   // .navigation-courses-all__container
   &__container {
      display: flex;
      justify-content: center;
      @media (min-width: 767.98px) {
         border-radius: 12px;
         padding: 0;
         background-color: #2b2b2b;
         flex-wrap: wrap;
         align-items: center;
         @media (any-hover: hover) {
            &:hover {
               .router-link-active {
                  color: #fff;
                  background-color: transparent;
               }
            }
         }
      }
      @media (max-width: 767.98px) {
         max-width: 500px;
      }
      @media (max-width: 450px) {
         display: block;
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
      @media (max-width: 767.98px) {
         display: none;
      }
   }
   &__select-navigation {
      display: none;
      @media (max-width: 767.98px) {
         display: block;
      }
   }
}
</style>
