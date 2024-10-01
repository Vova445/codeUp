<template>
   <div class="articles-container">
      <div v-for="courseItem in courseList" :key="courseItem.id" class="articles-container__item">
         <div v-if="courseItem.percentDiscount" class="articles-container__discount">{{ courseItem.percentDiscount }}%</div>
         <div class="articles-container__short-infos">
            <div class="articles-container__info articles-container__info--online">Online</div>
         </div>
         <div class="articles-container__header-decor">
            <div class="articles-container__background-decor" :style="{ background: courseItem.backgroundGrad }"></div>
            <img :src="getImagePath(courseItem.imgSrc)" alt="" />
         </div>
         <div class="articles-container__body">
            <h4 class="articles-container__title subtitile">{{ courseItem.title }}</h4>
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
const getImagePath = (imgPath) => {
   return new URL(`../../assets/img/courses-logs/${imgPath}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.articles-container {
   display: grid;
   gap: 30px;
   grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
   @media (max-width: 992px) {
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
   }
   @media (max-width: 500px) {
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
   }
   // .articles-container__item
   &__item {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease 0s;
      background-color: #2b2b2b;
      padding: 0px 0px clamp(1.25rem, 0.472rem + 2.262vw, 1.875rem) 0px;
      border-radius: 8px;
      box-shadow: 2px 5px 10px #595959;
      @media (any-hover: hover) {
         &:hover {
            transform: translate(1px, 3px);
            box-shadow: 1px 3px 10px #595959;
         }
      }
      @media (any-hover: hover) {
         &:hover {
            .articles-container__background-decor {
               transform: scale(1.1);
            }
            .articles-container__header-decor {
               img {
                  transform: scale(1.05);
               }
            }
         }
      }
   }
   &__header-decor {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.3s ease 0s;
      overflow: hidden;
      border-radius: 8px;
      text-align: center;
      padding: 25px 0px;
      img {
         transition: all 0.3s ease 0s;
         position: relative;
         z-index: 1;
         width: 40px;
         height: 40px;
         max-width: 100%;
      }
      &:not(:last-child) {
         margin-bottom: clamp(1.125rem, 0.581rem + 1.584vw, 1.25rem);
      }
   }
   &__background-decor {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: transform 0.3s ease;
   }
   &__body {
      padding: 0 10px;
   }
   // .articles-container__discount
   &__discount {
      position: absolute;
      z-index: 1;
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
      z-index: 1;
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
      color: #cce6ff;
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, 0.549rem + 1.131vw, 1.25rem);
      }
   }
}
.container-price {
   font-size: clamp(1rem, 0.937rem + 0.391vw, 1.1rem);
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
      span {
         text-decoration: line-through;
      }
   }
}
</style>
