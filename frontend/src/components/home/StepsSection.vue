<template>
   <div class="steps">
      <div class="steps__container">
         <h2 class="steps__title title">{{ $t('titles.stepsSection') }}</h2>
         <div class="steps__box">
            <div class="steps__item item-steps item-steps--top-left">
               <div class="item-steps__content">
                  <div class="item-steps__bc">
                     <svg viewBox="0 0 244 244" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M2 22V222C2 233.046 10.9543 242 22 242H222C233.046 242 242 233.046 242 222V142C242 130.954 233.046 122 222 122H142C130.954 122 122 113.046 122 102V22C122 10.9543 113.046 2 102 2H22C10.9543 2 2 10.9543 2 22Z"
                           fill="url(#paint0_linear_301_3)"
                           stroke="rgb(255, 255, 255);"
                           stroke-width="1"
                        />
                        <defs>
                           <linearGradient id="paint0_linear_301_3" x1="242" y1="21.6144" x2="52.9557" y2="262.393" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#072515" />
                              <stop offset="1" stop-color="#000C02" />
                           </linearGradient>
                        </defs>
                     </svg>
                  </div>
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
   width: 28.125rem;
   height: 28.125rem;

   &__bc {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      svg {
         width: 100%;
         height: 100%;
         path {
            width: 100%;
            height: 100%;
         }
      }
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
      position: relative;
      z-index: 2;
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
      .item-steps__bc {
         transform: rotate(-90deg);
      }
   }
   &--top-right {
   }
   &--bottom-left {
   }
   &--bottom-right {
   }
}
</style>
