<template>
   <div class="steps">
      <div class="steps__container">
         <h2 class="steps__title title">Як відбуватемется навчання</h2>
         <div class="steps__box">
            <div class="steps__item item-step">
               <div class="item-step__title subtitile">Lorem ipsum dolor sit.</div>
               <div class="item-step__text">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus nobis a numquam est dolorem nostrum omnis facere repellat consectetur molestias!</p>
               </div>
            </div>
            <div class="steps__item item-step">
               <div class="item-step__title">Lorem ipsum dolor sit.</div>
               <div class="item-step__text">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus nobis a numquam est dolorem nostrum omnis facere repellat consectetur molestias!</p>
               </div>
            </div>
            <div class="steps__item item-step">
               <div class="item-step__title">Lorem ipsum dolor sit.</div>
               <div class="item-step__text">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus nobis a numquam est dolorem nostrum omnis facere repellat consectetur molestias!</p>
               </div>
            </div>
            <div class="steps__item item-step">
               <div class="item-step__title">Lorem ipsum dolor sit.</div>
               <div class="item-step__text">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus nobis a numquam est dolorem nostrum omnis facere repellat consectetur molestias!</p>
               </div>
            </div>
            <div class="steps__item item-step">
               <div class="item-step__title">Lorem ipsum dolor sit.</div>
               <div class="item-step__text">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus nobis a numquam est dolorem nostrum omnis facere repellat consectetur molestias!</p>
               </div>
            </div>
            <div class="steps__item item-step">
               <div class="item-step__title">Lorem ipsum dolor sit.</div>
               <div class="item-step__text">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus nobis a numquam est dolorem nostrum omnis facere repellat consectetur molestias!</p>
               </div>
            </div>

         </div>
      </div>
   </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
   stepsList: {
      type: Array,
      required: true,
   },
})
</script>

<style lang="scss" scoped>
.steps__box {
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(7, 1fr);
grid-column-gap: 10px;
grid-row-gap: 10px;
}
.item-step {
   padding: 5px;
   border-radius: 5px;
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, 0.156rem + 0.978vw, 0.938rem);
      }
   }
   &__text {

   } 
  &:nth-child(1) {
   background-color: #5a5a5a;
   color: #fff;
      grid-area: 1 / 2 / 3 / 4;
   }
   &:nth-child(2) {
      background-color: #60ab50;
       grid-area: 3 / 2 / 5 / 4;
   }
   &:nth-child(3) {
      background-color: #331781;
     grid-area: 1 / 1 / 4 / 2;
   }
   &:nth-child(4) {
      background-color: #952f80;
      grid-area: 4 / 1 / 7 / 2;
   }
   &:nth-child(5) {
      background-color: #1d2b6f;
    grid-area: 5 / 3 / 8 / 4;
   }
   &:nth-child(6) {
      background-color: #aec134;
      grid-area: 5 / 2 / 8 / 3;
   }
}
</style>
