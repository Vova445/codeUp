<template>
   <section class="purpose">
      <div class="purpose__list">
         <div class="purpose__box-item purpose__box-item--main odd">
            <div class="purpose__item">
               <h3 class="purpose__title">{{ $t('titles.purposeTitle') }}</h3>
            </div>
         </div>
         <div
            v-for="(purpose, index) in purposeList"
            :key="purpose.id"
            :style="{ color: purpose.color, backgroundColor: purpose.bcColor }"
            class="purpose__box-item"
            :class="['purpose__box-item', index % 2 === 0 ? 'even' : 'odd', index % 2 === 1 && index === purposeList.length - 1 ? 'last-odd' : '']"
         >
            <div class="purpose__item">
               <div :style="{ color: purpose.numColor, textShadow: `1px 1px 10px ${purpose.numColor}` }" class="purpose__num">
                  {{ '0' + (index + 1) }}
               </div>
               <h6 class="purpose__title">{{ $t(`${purpose.title}`) }}</h6>
               <div class="purpose__text">
                  <p>
                     {{ $t(`${purpose.text}`) }}
                  </p>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
const props = defineProps({
   purposeList: {
      type: Array,
      required: true,
   },
})
</script>

<style lang="scss" scoped>
.purpose {
   &:not(:last-child) {
      margin-bottom: clamp(4.375rem, 1.561rem + 5.871vw, 6.25rem);
   }
   // .purpose__list
   &__list {
      display: grid;
      justify-content: center;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 1fr;
      @media (max-width: 47.9988rem) {
         grid-template-columns: 1fr;
         grid-auto-rows: inherit;
      }
   }
   //__box-item
   &__box-item {
      &--main {
         background-color: $greenColor;
         color: #000;
         display: flex;
         align-items: center;
         justify-content: center;
         .purpose__title {
            font-size: clamp(2.375rem, 1.707rem + 3.34vw, 4.375rem);
         }
      }
      @media (min-width: 48rem) {
         &.last-odd {
            grid-column: span 2;
            .purpose__item {
               max-width: 88rem;
               margin: 0 auto;
            }
         }
      }
   }
   // .purpose__item
   &__item {
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
      padding-left: clamp(0.938rem, -5.18rem + 12.745vw, 5rem);
      padding-right: clamp(0.938rem, -5.18rem + 12.745vw, 5rem);
      @media (min-width: 48rem) {
         max-width: 44rem;
         .odd & {
            margin: 0 0 0 auto;
         }
         .even & {
            margin: 0 auto 0 0;
         }
      }

      &--main {
         background-color: $greenLightColor;
         color: #000;
      }
   }

   // .purpose__num
   &__num {
      text-align: right;
      font-size: clamp(2.188rem, 1.561rem + 3.132vw, 4.063rem);
      &:not(:last-child) {
         margin-bottom: clamp(2.125rem, 1.499rem + 3.132vw, 4rem);
      }
   }
   // .purpose__title
   &__title {
      font-size: clamp(1.125rem, 0.979rem + 0.731vw, 1.563rem);
      font-weight: 700;
      letter-spacing: 0.125rem;
      line-height: 1.2;
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, 0.416rem + 1.044vw, 1.25rem);
      }
   }
   // .purpose__text
   &__text {
      line-height: 1.25;
      @media (max-width: 29.6875rem) {
         font-size: 0.875rem;
      }
   }
}
</style>
