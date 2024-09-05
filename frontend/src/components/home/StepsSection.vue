<template>
   <div class="steps">
      <div class="steps__container">
         <v-timeline direction="horizontal" v-if="windowWidth > 767">
            <v-timeline-item v-for="stepItem in stepsList" :key="stepItem.id">
               <template v-slot:opposite> </template>
               <div :style="{ backgroundColor: stepItem.color, padding: '10px 10px', borderRadius: '8px', height: '100%' }">
                  <div class="text-h6">{{ stepItem.title }}</div>
                  <p>{{ stepItem.description }}</p>
               </div>
            </v-timeline-item>
         </v-timeline>

         <v-timeline v-else align="start" side="end">
            <v-timeline-item v-for="stepItem in stepsList" dot-color="pink" size="small" :key="stepItem.id">
               <div class="d-flex" :style="{ backgroundColor: stepItem.color, padding: '20px 10px', borderRadius: '8px' }">
                  <strong class="me-4">{{ stepItem.title }}</strong>
                  <div>
                     <div class="text-caption">{{ stepItem.description }}</div>
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
   .v-timeline-item .v-timeline-item__body {
      padding-inline: 0;
      padding-block-end: 0;
   }
   .v-timeline-divider__after,
   .v-timeline-divider__before {
      background-color: rgba(60, 119, 111, 1);
   }
   .v-timeline-divider__dot.v-timeline-divider__dot--size-default {
      width: 30px;
      height: 30px;
      background-color: #294e4a;
   }
   .v-timeline-divider__inner-dot {
      display: none;
   }

   .v-timeline--horizontal.v-timeline .v-timeline-item:nth-child(2n + 1) .v-timeline-item__body,
   .v-timeline--horizontal.v-timeline .v-timeline-item:nth-child(2n) .v-timeline-item__body {
      padding-block-end: 0;
      padding-block-start: 0;
   }
   .v-timeline--horizontal.v-timeline .v-timeline-item:nth-child(2n + 1) .v-timeline-item__body {
      margin-bottom: 20px;
   }

   .v-timeline--horizontal.v-timeline .v-timeline-item:nth-child(2n) .v-timeline-item__body {
      margin-top: 20px;
   }
   .v-timeline--horizontal.v-timeline {
      grid-column-gap: 0;
   }
   .v-timeline-item__body {
      font-family: 'Inter' !important;
      background-color: #3c776f;
      border-radius: 8px;
      //padding: 20px 5px !important;
      box-shadow: 0px 1px 10px #12584d;
      p {
         color: #e6e6e6;
         font-size: clamp(0.75rem, 0.469rem + 0.587vw, 0.938rem);
         line-height: 1.2;
      }
   }
   .text-h6 {
      font-size: 16px !important;
      line-height: 1.3;
      letter-spacing: 1.3px !important;
      font-weight: 500;
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, 0.156rem + 0.978vw, 0.938rem);
      }
   }

   @media (max-width: 767.98px) {
      .v-timeline--vertical.v-timeline.v-timeline--side-end .v-timeline-item .v-timeline-item__body {
         padding-inline-start: 0;
      }
      .v-timeline--vertical.v-timeline .v-timeline-item:nth-child(2n + 1) .v-timeline-item__body {
         padding-inline-start: 0;
      }
   }
   .v-timeline-divider .v-timeline-divider__dot {
      background: #3c776f !important; // Overrides any previous settings
   }
   .d-flex {
      strong {
         font-size: 16px;
         line-height: 1.2;

         font-weight: 500;
      }
      @media (max-width: 767.98px) {
         flex-direction: column;
         gap: 5px;
         text-align: left;
      }
      .text-caption {
         @media (max-width: 767.98px) {
            color: #e6e6e6;
         }
      }
   }
   .v-timeline-item__body {
      @media (max-width: 767.98px) {
         margin-left: 10px;
      }
   }
   .text-caption mb-2 {
      @media (max-width: 767.98px) {
      }
   }
   .v-timeline--vertical.v-timeline .v-timeline-item:first-child .v-timeline-item__body {
      @media (max-width: 767.98px) {
         padding-block-start: 0;
      }
   }
   .v-timeline--vertical.v-timeline .v-timeline-item:last-child .v-timeline-item__body {
      @media (max-width: 767.98px) {
         padding-block-end: 0;
      }
   }
}

.steps {
   &:not(:last-child) {
      margin-bottom: 200px;
   }
}
.steps__container {
   text-align: center;
   .steps__wrapper {
      position: relative;
      .steps__list {
         display: flex;
         justify-content: space-between;
         position: relative;
         .steps__item {
            //width: 20%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            .steps__decore-box {
               position: relative;
               width: 50px;
               height: 50px;
               border-radius: 50%;
               background-color: #0c0b0b;
               color: white;

               font-size: 18px;
               z-index: 29999;
               border: 1px solid #234c5c;
               &::before {
                  content: '';
                  position: absolute;
                  top: 100%;
                  //left: 50%;
                  //transform: translate(-100%, 0);
                  width: 2px;
                  height: 85px;
                  background-color: #234c5c;
                  z-index: 1;
               }
            }
            .steps__line-vertical {
            }

            &:nth-child(odd) {
               .steps__line-vertical {
                  //top: -100%;
               }
               .steps__decore-box {
                  &::before {
                     //top: 0;
                  }
               }
               .steps__circle {
                  //order: 3;
               }

               .steps__title,
               .steps__description {
                  //order: 1;
               }
            }

            &:nth-child(even) {
               .steps__line-vertical {
                  //order: 1;
               }

               .steps__circle {
                  //order: 2;
               }

               .steps__title,
               .steps__description {
                  //order: 3;
               }

               .steps__content {
                  //margin-top: 500px;
               }
            }
         }
      }

      .steps__line-horizontal {
         //width: 100%;
         //height: 2px;
         //background-color: #234c5c;
         //position: absolute;
         //top: 400px;
         //left: 0;
         //z-index: 1;
      }
   }
}
</style>
