<template>
   <section class="reaons">
      <div class="reaons__container">
         <h3 class="reaons__title title">{{ $t('titles.whyCodeUp') }}</h3>
         <div class="reaons__list list-reasons">
            <div class="decores-item decores-item__01 decore-circle"></div>
            <div class="decores-item decores-item__02 decore-circle"></div>
            <div class="decores-item decores-item__03 decore-circle"></div>
            <div class="decores-item decores-item__04 decore-circle"></div>
            <div v-for="(reasonItem, index) in reasonsList" :key="reasonItem.id" class="list-reasons__item item-reason">
               <div class="item-reason__number">{{ index + 1 }}</div>
               <div class="item-reason__content">
                  <h4 class="item-reason__title">{{ $t(reasonItem.title) }}</h4>
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
.reaons {
   &:not(:last-child) {
      margin-bottom: clamp(4rem, -0.004rem + 11.742vw, 7rem);
   }
   padding: clamp(1.25rem, 0.447rem + 2.571vw, 2.5rem) clamp(0rem, -0.803rem + 2.571vw, 1.25rem);
   border-radius: 12px;
   box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
   position: relative;

   &__title {
      text-align: center;
      color: $whiteColor;
      text-transform: uppercase;
      letter-spacing: 2px;
      line-height: 1.14;
      font-weight: 700;
      &:not(:last-child) {
         margin-bottom: clamp(1.875rem, 0.67rem + 3.856vw, 3.75rem);
      }
   }
   &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: clamp(1.25rem, 0.045rem + 3.856vw, 3.125rem);
      //grid-auto-rows: 1fr;
      position: relative;
      @media (min-width: 28.125rem) {
         grid-auto-rows: 1fr;
      }
      @media (max-width: 31.25rem) {
         grid-template-columns: 1fr;
      }
   }
}

.list-reasons {
   &__item {
      &:last-child {
         grid-column: span 2;
      }
      @media (max-width: 800px) {
         &:last-child {
            grid-column: auto;
         }
      }
      display: flex;
      gap: 20px;
      transition:
         transform 0.3s ease,
         box-shadow 0.3s ease;
      background-color: rgba($color: $whiteColor, $alpha: 0.1);
      border-radius: 8px;
      padding: 20px;

      box-shadow: -20px 20px 20px 0px rgba(0, 0, 0, 0.35);
      transition: all 0.5s ease;
      border: 1px solid transparent;
      &:hover {
         border: 1px solid $greenColor;
      }
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
      width: clamp(2.188rem, 1.864rem + 1.616vw, 3.125rem);
      height: clamp(2.188rem, 1.864rem + 1.616vw, 3.125rem);
      flex: 0 0 clamp(2.188rem, 1.864rem + 1.616vw, 3.125rem);
      background-color: $greenLightColor;
      color: #000;
      font-weight: 700;
      font-size: clamp(1.125rem, 0.823rem + 1.509vw, 2rem);
      border-radius: 50%;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.6);
   }
   &__content {
      max-width: 500px;
   }
   &__title {
      color: $greenColor;
      font-size: clamp(1.125rem, 1.082rem + 0.216vw, 1.25rem);
      font-weight: 700;
      line-height: 1.14;
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
      color: $whiteColor;
      line-height: 1.2;
      font-size: 15px;
   }
}
.decores-item {
   position: absolute;
   &__01 {
      transform: translate(-13.4%, -13.4%);
      width: 20.1%;
      padding-bottom: 20.1%;
   }
   &__02 {
      transform: translate(0, 20.5%);
      left: 19.47%;
      bottom: 0;
      padding-bottom: 18.85%;
      width: 18.9%;
   }
   &__03 {
      left: 59.31%;
      width: 13.2%;
      padding-bottom: 13.2%;
   }
   &__04 {
      right: 0;
      top: 0;
      width: 17.2275%;
      padding-bottom: 17.2275%;
   }
}
</style>
