<template>
   <section data-watch class="reaons">
      <div class="reaons__container">
         <h3 class="reaons__title title">{{ $t('titles.whyCodeUp') }}</h3>
         <div class="reaons__list list-reasons">
            <div class="list-reasons__item item-reason" v-for="(reasonItem, index) in reasonsList" :key="reasonItem.id">
               <div class="item-reason__number">{{ index + 1 }}</div>
               <div class="item-reason__content">
                  <h4 class="item-reason__title subtitile">{{ $t(reasonItem.title) }}</h4>
                  <div class="item-reason__text text">
                     <p>{{ $t(reasonItem.description) }}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
   reasonsList: {
      type: Array,
      required: true,
   },
})
</script>

<style lang="scss" scoped>
.reasons {
   &:not(:last-child) {
      margin-bottom: clamp(4rem, -0.004rem + 11.742vw, 7rem);
   }
   background-color: #1a1a1a;
   padding: clamp(1.25rem, 0.447rem + 2.571vw, 2.5rem) clamp(0rem, -0.803rem + 2.571vw, 1.25rem);
   border-radius: 12px;
   box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);

   &__title {
      text-align: center;
      color: #f0f0f0;
      text-transform: uppercase;
      letter-spacing: 2px;
      line-height: 1.2;
      font-weight: 700;
      &:not(:last-child) {
         margin-bottom: clamp(1.875rem, 0.67rem + 3.856vw, 3.75rem);
      }
   }

   &__list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: clamp(1.25rem, 0.045rem + 3.856vw, 3.125rem);

      @media (max-width: 500px) {
         grid-template-columns: 1fr;
      }
   }
}

.list-reasons {
   &__item {
      display: flex;
      gap: 20px;
      align-items: start;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background-color: #2b2b2b;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.8);

      @media (any-hover: hover) {
         &:hover {
            transform: translateY(-10px);
            box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.9);
         }
      }

      @media (max-width: 500px) {
         gap: 15px;
         font-size: 16px;
         padding: 10px;
      }
   }
}

.item-reason {
   &__number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      flex: 0 0 50px;
      background-color: #1e59a0;
      color: #ffffff;
      font-weight: 700;
      border-radius: 50%;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.6);

      @media (max-width: 500px) {
         width: 40px;
         height: 40px;
         flex: 0 0 40px;
      }
   }

   &__content {
      max-width: 400px;
   }

   &__title {
      color: #ffffff;
      font-weight: 600;
      &:not(:last-child) {
         margin-bottom: 15px;
      }

      @media (max-width: 767px) {
         &:not(:last-child) {
            margin-bottom: 8px;
         }
      }
   }

   &__text {
      color: #b0b0b0;
      line-height: 1.5;
   }
}
</style>