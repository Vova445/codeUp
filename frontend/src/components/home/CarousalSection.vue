<template>
   <div class="courses-carousal">
      <div class="courses-carousal__container">
         <div class="courses-carousal__slider swiper">
            <div class="courses-carousal__wrapper swiper-wrapper">
               <div v-for="courseItem in coursesList" :key="courseItem.id" class="courses-carousal__slide swiper-slide">
                  <router-link :to="{ name: courseItem.toName }" class="courses-carousal__link">
                     <!--<font-awesome-icon :icon="image.icon" :style="{ color: image.color }" />-->
                     <img :src="getImagePath(courseItem.image)" alt="" />
                  </router-link>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
import { initSliderCarousal } from '../../moduleHelpers/swiper.js'
const props = defineProps({
   coursesList: {
      type: Array,
      required: true,
   },
})
const getImagePath = (imgPath) => {
   return new URL(`../../assets/img/courses-logs/${imgPath}`, import.meta.url).href
}
onMounted(() => {
   initSliderCarousal()
})
</script>

<style lang="scss" scoped>
.courses-carousal {
   &:not(:last-child) {
      margin-bottom: clamp(4.375rem, 1.561rem + 5.871vw, 6.25rem);
   }
   // .courses-carousal__container
   &__container {
      position: relative;
      max-width: 900px;
   }
   // .courses-carousal__wrapper
   &__wrapper {
      transition-timing-function: linear;
      justify-content: space-between;
   }
   &__slide {
      position: relative;
      &::after {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         background-color: #0c0b0b;
         opacity: 0.3;
      }
   }
   &__link {
      img {
         width: 40px;
         height: 40px;
      }
   }
}
</style>
