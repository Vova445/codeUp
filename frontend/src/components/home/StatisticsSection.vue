<template>
   <section class="statistic">
      <div class="statistic__container">
         <div class="statistic__content statistic__content--one">
            <h4 class="statistic__number">{{ purchasedCourses }}</h4>
            <p class="statistic__description">{{ $t('description.statisticPurchased') }}</p>
         </div>
         <hr class="statistic__separator" />
         <div class="statistic__content statistic__content--two">
            <p class="statistic__description">{{ $t('description.statisticPassed') }}</p>
            <h4 class="statistic__number">{{ completedCourses }}</h4>
         </div>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
const purchasedCourses = ref(0);
const completedCourses = ref(0);

onMounted(async () => {
   try {
      const response = await axios.get(`${apiUrl}/api/statistics`);
      purchasedCourses.value = response.data.purchasedCourses;
      completedCourses.value = response.data.completedCourses;
   } catch (error) {
      console.error('Failed to fetch statistics:', error);
   }
});
</script>

<style lang="scss" scoped>
.statistic {
   margin-bottom: 200px;
   &__container {
   }

   &__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: space-between;
      align-items: center;
      gap: clamp(2rem, 1.5rem + 2vw, 6rem);
      @media (max-width: 34.375rem) {
         grid-template-columns: 1fr;
         text-align: center;
         &--one {
            .statistic__number {
               order: 2;
            }
            .statistic__description {
               order: 1;
            }
         }
      }
      @media (min-width: 34.375rem) {
         &--one {
            // Styles specific to contentOne
            .statistic__number {
               text-align-last: left;
            }
            .statistic__description {
               text-align: right;
            }
         }

         &--two {
            .statistic__number {
               text-align: right;
            }
            .statistic__description {
               text-align: left;
            }
         }
      }
   }

   &__number {
      color: $greenColor;
      font-size: clamp(3.75rem, 2.457rem + 6.466vw, 7.5rem);
      text-shadow: 0 0 9px $greenColor;
   }

   &__description {
      font-weight: 500;
      font-size: clamp(1.375rem, 1.095rem + 1.401vw, 2.188rem);
      color: $whiteColor;
      line-height: 1.2;
   }

   &__separator {
      margin: clamp(1.563rem, 1.024rem + 2.694vw, 3.125rem) 0;
      border: 1px solid rgba(2, 254, 86, 0.5);
   }
}
</style>

