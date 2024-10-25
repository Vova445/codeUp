<template>
   <div class="steps">
      <div class="steps__container">
         <h2 class="steps__title title">{{ $t('titles.stepsSection') }}</h2>
         <v-timeline v-if="windowWidth > 767" direction="horizontal">
            <v-timeline-item v-for="stepItem in stepsList" :key="stepItem.id">
               <template #opposite> </template>
               <div :style="{ backgroundColor: stepItem.color, padding: '10px 10px', borderRadius: '8px', height: '100%' }">
                  <div class="text-h6">{{ $t(stepItem.title) }}</div>
                  <p>{{ $t(stepItem.description) }}</p>
               </div>
            </v-timeline-item>
         </v-timeline>

         <v-timeline v-else align="start" side="end">
            <v-timeline-item v-for="stepItem in stepsList" :key="stepItem.id" dot-color="pink" size="small">
               <div class="d-flex" :style="{ backgroundColor: stepItem.color, padding: '20px 10px', borderRadius: '8px' }">
                  <strong class="me-4">{{ $t(stepItem.title) }}</strong>
                  <div>
                     <div class="text-caption">{{ $t(stepItem.description) }}</div>
                  </div>
               </div>
            </v-timeline-item>
         </v-timeline>
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
:deep() {
   .v-timeline-item__body {
      //width: 110%;
      padding-inline: 0;
      padding-block-end: 0;
      font-family: 'Inter' !important;
      background-color: #3c776f;
      border-radius: 8px;
      //box-shadow: 4px 4px 7px #5b5b5b;
      box-shadow: -7px 8px 20px -6px rgba(91, 91, 91, 1);
      

      p {
         color: #e6e6e6;
         font-size: clamp(0.75rem, 0.469rem + 0.587vw, 0.938rem);
         line-height: 1.2;
      }

      @media (max-width: 767.98px) {
         margin-left: 10px;
      }
   }

   .v-timeline-divider__after,
   .v-timeline-divider__before {
      background-color: rgba(60, 119, 111, 1);
   }

   .v-timeline-divider__dot--size-default {
      width: 30px;
      height: 30px;
      background-color: #294e4a;
   }

   .v-timeline-divider__inner-dot {
      display: none;
   }

   .v-timeline--horizontal .v-timeline-item:nth-child(2n + 1) .v-timeline-item__body {
      padding-block-end: 0;
      margin-bottom: 20px;
   }
   .v-timeline--horizontal.v-timeline--align-center .v-timeline-item__body {
      padding-inline: 0;
   }
   .v-timeline--horizontal .v-timeline-item:nth-child(2n) .v-timeline-item__body {
      padding-block-start: 0;
      margin-top: 20px;
   }

   .v-timeline--horizontal {
      grid-column-gap: 0;
   }

   .text-h6 {
      font-size: clamp(0.75rem, 0.687rem + 0.391vw, 1rem) !important;
      line-height: 1.3;
      letter-spacing: 1px !important;
      font-weight: 600;

      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, 0.156rem + 0.978vw, 0.938rem);
      }
   }

   @media (max-width: 767.98px) {
      .v-timeline--vertical .v-timeline-item:first-child .v-timeline-item__body,
      .v-timeline--vertical .v-timeline-item:last-child .v-timeline-item__body {
         padding-block-start: 0;
         padding-block-end: 0;
      }

      .v-timeline--vertical.v-timeline.v-timeline--side-end .v-timeline-item__body,
      .v-timeline--vertical .v-timeline-item:nth-child(2n + 1) .v-timeline-item__body {
         padding-inline-start: 0;
      }

      .v-timeline-divider {
         padding-block-start: 0 !important;
      }

      .d-flex {
         flex-direction: column;
         gap: 5px;
         text-align: left;

         strong {
            font-size: 16px;
            line-height: 1.2;
            font-weight: 500;
         }

         .text-caption {
            color: #e6e6e6;
         }
      }
   }

   .v-timeline-divider .v-timeline-divider__dot {
      background-color: #3c776f !important;
   }
}
.steps {
   &:not(:last-child) {
      margin-bottom: clamp(4.375rem, 1.561rem + 5.871vw, 6.25rem);
   }
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(2.188rem, 0.78rem + 2.935vw, 3.125rem);
      }
   }
   &__container {
      text-align: center;
      &__wrapper {
         position: relative;

         &__list {
            display: flex;
            justify-content: space-between;
            position: relative;

            &__item {
               position: relative;
               display: flex;
               flex-direction: column;
               align-items: center;

               &__decore-box {
                  position: relative;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  background-color: #0c0b0b;
                  color: white;
                  font-size: 18px;
                  border: 1px solid #234c5c;

                  &::before {
                     content: '';
                     position: absolute;
                     top: 100%;
                     width: 2px;
                     height: 85px;
                     background-color: #234c5c;
                     z-index: 1;
                  }
               }
            }
         }
      }
   }
}
</style>
