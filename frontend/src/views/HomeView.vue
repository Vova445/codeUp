<template>
   <main-master-page>
      <main-section :courses-list="mainCourses" />
      <reasons-section :reasons-list="reasonsList" />
      <steps-section :steps-list="stepsList" />
      <carousal-section :courses-list="mainCourses" />
      <questions-section :questions-list="getQuestionsList">
         <div class="faq__footer">
            <router-link :to="{ name: 'faq' }" class="faq__more">
               <div class="faq__text-more">more FAQ</div>
               <font-awesome-icon :icon="['fas', 'arrow-right-long']" />
            </router-link>
         </div>
      </questions-section>
   </main-master-page>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import MainSection from '../components/home/MainSection.vue'
import ReasonsSection from '../components/home/ReasonsSection.vue'
import StepsSection from '../components/home/StepsSection.vue'
//import QuestionsSection from '../components/home/QuestionsSection.vue'
//import CarousalSection from '../components/home/CarousalSection.vue'
import { useMainPageDataStore } from '../stores/mainPageData.js'
const { mainCourses, reasonsList, stepsList, questionsList, carouselCoursesList } = storeToRefs(useMainPageDataStore())
const getQuestionsList = computed(() => {
   return questionsList.value.slice(0, 3)
})
const QuestionsSection = defineAsyncComponent(() => import('../components/home/QuestionsSection.vue'))
const CarousalSection = defineAsyncComponent(() => import('../components/home/CarousalSection.vue'))
</script>

<style lang="scss" scoped>
.faq {
   &__footer {
      text-align: right;
   }
   .fa-arrow-right-long {
      transition: transform 0.3s ease 0s;
   }
   &__more {
      transition: opacity 0.3s ease 0s;
      display: inline-flex;
      justify-content: end;
      align-items: center;
      gap: 20px;
      @media (any-hover: hover) {
         &:hover {
            opacity: 0.8;
            .fa-arrow-right-long {
               transform: translate(10%, 0);
            }
         }
      }
   }
}
</style>
