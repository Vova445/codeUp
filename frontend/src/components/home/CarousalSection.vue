<template>
   <div class="courses-carousal">
      <div class="courses-carousal__container">
         <div class="courses-carousal__list">
            <div class="courses-carousal__item" v-for="courseItem in coursesList" :key="courseItem.id">
               <router-link :to="{ name: courseItem.toName }" class="courses-carousal__link" >
                  <template v-for="image in courseItem.images" :key="image.id">
                     <font-awesome-icon :icon="image.icon" loading="lazy" :style="{ color: image.color }" />
                  </template>
               </router-link>
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
    margin-bottom: clamp(4rem, -0.004rem + 11.742vw, 7rem);
  }

  &__container {
    max-width: 900px;
  }

  &__list {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    padding-bottom: 10px;

    @media (max-width: 899.98px) {
      overflow: auto;
      display: flex;
      gap: 70px;
      justify-content: space-between;

      &::-webkit-scrollbar {
        height: 2px;
      }

      &::-webkit-scrollbar-track {
        background-color: #2b2b2b;
        border-radius: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #555;
        border-radius: 8px;

        &:hover {
          background-color: #888;
        }
      }
    }
  }

  &__item {
    justify-self: center;
    align-self: center;
    font-size: 50px;
    border-radius: 20px;

    @media (min-width: 900px) {
      &:nth-child(1) {
        font-size: 70px;
        grid-area: 1 / 1 / 2 / 2;
      }

      &:nth-child(2) {
        font-size: 90px;
        grid-area: 1 / 3 / 2 / 4;
      }

      &:nth-child(3) {
        font-size: 60px;
        grid-area: 2 / 2 / 3 / 3;
      }

      &:nth-child(4) {
        font-size: 70px;
        grid-area: 2 / 4 / 3 / 5;
      }

      &:nth-child(5) {
        grid-area: 3 / 1 / 4 / 2;
      }

      &:nth-child(6) {
        grid-area: 3 / 3 / 4 / 4;
      }
    }
  }

  &__link {
    display: flex;
    gap: 5px;
  }
}
</style>
