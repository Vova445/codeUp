<template>
   <section class="reaons">
      <div class="reaons__container">
         <h3 class="reaons__title title">{{ $t('titles.whyCodeUp') }}</h3>
         <div class="reaons__list list-reasons">
            <div class="decores-item decores-item__01 decore-circle"></div>
            <div class="decores-item decores-item__02 decore-circle"></div>
             <div class="decores-item decores-item__03 decore-circle">
               </div>
            <div v-for="(reasonItem, index) in reasonsList" :key="reasonItem.id" class="list-reasons__item item-reason">
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
.reaons {
   &:not(:last-child) {
      margin-bottom: clamp(4rem, -0.004rem + 11.742vw, 7rem);
   }
   /* background-color: #1a1a1a; */
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
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: clamp(1.25rem, 0.045rem + 3.856vw, 3.125rem);
      position: relative;
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
      width: 50px;
      height: 50px;
      flex: 0 0 50px;
      background-color: $greenLightColor;
      color: #000;
      font-weight: 700;
      font-size: 32px;
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
      color: $greenColor;
      font-size: 20px;
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
      line-height: 1.14;
      font-size: 15px;
   }
}
.decores-item {
   position: absolute;
   /* left: -2.8%; */ 

   &__01 {
      transform: translate(-13.4%, -13.4%);
      width: 20.1%;
      height: 50.3%;
   }
   &__02 {
      left: 19.01%;
      left: 19.47%; /* 24300/1248 */
      //top: 55.6%;
      bottom: 0;
      height: 55.6%;
      width: 18.9%;
      transform: translate(0, 20.5%);
   }
   &__03 {
      left: 59.31%;
      width: 13.2%;
      height: 38.7%;

   }
}
</style>
