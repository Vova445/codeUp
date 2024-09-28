<template>
   <div class="articles-container">
      <div v-for="courseItem in courseList" :key="courseItem.id" class="articles-container__item">
         <div v-if="courseItem.percentDiscount" class="articles-container__discount">{{ courseItem.percentDiscount }}%</div>
         <div class="articles-container__short-infos">
            <div class="articles-container__info articles-container__info--online">Online</div>
         </div>
         <h4 class="articles-container__title">{{ courseItem.title }}</h4>
         <div class="articles-container__price-contain container-price">
            <div class="container-price__box">
               <div class="container-price__price-content">
                  <span>{{ convertUSDtoUAH(courseItem.dollarCurrentPrice) }} Грн</span> / <span>{{ courseItem.dollarCurrentPrice }} USD</span>
               </div>
            </div>
            <div v-if="courseItem.percentDiscount" class="container-price__box container-price__box--ald">
               <div class="container-price__price-content">
                  <span>{{ convertUSDtoUAH(courseItem.dollarAldPrice) }} Грн</span> / <span>{{ courseItem.dollarAldPrice }} USD</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { useGeneralDataStore } from '../../stores/generalData.js'
const { convertUSDtoUAH } = useGeneralDataStore()
const props = defineProps({
   courseList: {
      type: Array,
      required: true,
      default: () => [],
   },
})
</script>

<style lang="scss" scoped>
.articles-container {
   display: grid;
   gap: 20px;
   grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
   // .articles-container__item
   &__item {
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease 0s;
      background-color: #2b2b2b;
      padding: 50px 10px 30px 10px;
      border-radius: 8px;
      box-shadow: 4px 10px 10px #595959;
      @media (any-hover: hover) {
         &:hover {
            transform: translate(2px, 5px);
            box-shadow: 2px 5px 10px #595959;
         }
      }
   }
   // .articles-container__discount
   &__discount {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(0, -50%);
      padding: 5px 10px;
      font-size: 14px;
      border-radius: 8px;
      background-color: #e68a00;
   }
   // .articles-container__short-infos
   &__short-infos {
      font-size: 12px;
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(5px, -5px);
      border-radius: 8px;
      background-color: #0066ff;
      writing-mode: vertical-rl;
      text-orientation: upright;
      letter-spacing: -2px;
   }
   &__info {
      padding: 5px;
      &--online {
      }
   }
   &__title {
      font-size: 20px;
      margin-bottom: 30px;
      color: #cce6ff;
   }
   // .articles-container__price-contain
   &__price-contain {
   }
}
.container-price {
   font-size: 20px;
   // .container-price__box
   &__box {
      &:not(:last-child) {
         margin-bottom: 10px;
      }
   }
   // .container-price__price-content
   &__price-content {
      line-height: 1.2;
      span {
         letter-spacing: 0.5px;
      }
   }
   // .container-price__box--ald
   &__box--ald {
      color: #808080;
      font-size: 18px;
      span {
         text-decoration: line-through;
      }
   }
}
</style>
