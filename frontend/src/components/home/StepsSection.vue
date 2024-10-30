<template>
   <div class="steps">
      <div class="steps__container">
         <h2 class="steps__title title">{{ $t('titles.stepsSection') }}</h2>
         <div class="steps__box">
            <div class="steps__item item-steps item-steps--top-left">
               <div class="item-steps__content">
                  <div class="item-steps__letter">F</div>
                  <h6 class="item-steps__title">Title</h6>
                  <div class="item-steps__text">
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt perferendis, debitis autem impedit quis rem excepturi
                        molestiae nihil vero minus quod accusamus laborum doloremque pariatur dolor unde magnam deleniti. Dolorem.
                     </p>
                  </div>
               </div>
            </div>
            <div class="steps__item item-steps item-steps--top-right">
               <div class="item-steps__content">
                  <h6 class="item-steps__title">Title</h6>
                  <div class="item-steps__text">
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt perferendis, debitis autem impedit quis rem excepturi
                        molestiae nihil vero minus quod accusamus laborum doloremque pariatur dolor unde magnam deleniti. Dolorem.
                     </p>
                  </div>
               </div>
            </div>
            <div class="steps__item item-steps item-steps--bottom-left">
               <div class="item-steps__content">
                  <h6 class="item-steps__title">Title</h6>
                  <div class="item-steps__text">
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt perferendis, debitis autem impedit quis rem excepturi
                        molestiae nihil vero minus quod accusamus laborum doloremque pariatur dolor unde magnam deleniti. Dolorem.
                     </p>
                  </div>
               </div>
            </div>
            <div class="steps__item item-steps item-steps--bottom-right">
               <div class="item-steps__content">
                  <h6 class="item-steps__title">Title</h6>
                  <div class="item-steps__text">
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt perferendis, debitis autem impedit quis rem excepturi
                        molestiae nihil vero minus quod accusamus laborum doloremque pariatur dolor unde magnam deleniti. Dolorem.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
const props = defineProps({
   stepsList: {
      type: Array,
      required: true,
   },
})

const windowWidth = ref(window.innerWidth)
onMounted(() => {
   window.addEventListener('resize', () => (windowWidth.value = window.innerWidth))
})
</script>

<style lang="scss" scoped>
.steps {
   // .steps__container
   &__container {
   }
   // .steps__title
   &__title {
   }
   // .steps__box
   &__box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.125rem;
   }
}

.item-steps {
   position: relative;
   padding: 1.25rem 2.5rem;
   &::before {
      content: '';

      border: 0.0625rem solid rgb(255, 255, 255);
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      backdrop-filter: blur(3.125rem);
      background: linear-gradient(-38.77deg, rgba(2, 254, 86, 0.1) 29.123%, rgba(0, 0, 0, 0.1) 84.51%);
   }
   &__letter {
      font-size: 15.625rem;
   }
   // .item-steps__content
   &__content {
      position: relative;
      z-index: 2;
   }
   // .item-steps__title
   &__title,
   &__text {
      text-align: center;
   }
   &__title {
      font-size: 1.5rem;
      margin-bottom: 1.9375rem;
   }
   // .item-steps__text
   &__text {
   }
   &--top-left {
   }
   &--top-right {
   }
   &--bottom-left {
   }
   &--bottom-right {
   }
}
</style>
