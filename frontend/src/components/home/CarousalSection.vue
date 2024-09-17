<template>
   <div class="courses-carousal">
      <div class="courses-carousal__container">
         <div class="courses-carousal__slider swiper">
            <div class="courses-carousal__wrapper swiper-wrapper">
               <div v-for="courseItem in coursesList" :key="courseItem.id" class="courses-carousal__slide swiper-slide">
                  <router-link :to="{ name: courseItem.toName }" class="courses-carousal__link">
                     <span v-for="image in courseItem.images" :key="image.id">
                        <font-awesome-icon :icon="image.icon" :style="{ color: image.color }" />
                     </span>
                  </router-link>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
   coursesList: {
      type: Array,
      required: true,
   },
})
</script>

<style lang="scss" scoped>
.courses-carousal {
   &:not(:last-child) {
      margin-bottom: clamp(6.25rem, 1.559rem + 9.785vw, 9.375rem);
   }
   // .courses-carousal__container
   &__container {
      max-width: 900px;
   }
   // .courses-carousal__slider
   &__slider {
   }
   // .courses-carousal__wrapper
   &__wrapper {
      transition-timing-function: linear;
      justify-content: space-between;
   }
   // .courses-carousal__slide
   &__slide {
      font-size: 40px;
      //width: 40px;
      height: 40px;
   }
   // .courses-carousal__link
   &__link {
   }
}
</style>
