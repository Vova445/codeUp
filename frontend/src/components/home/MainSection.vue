<template>
   <section class="master">
      <div class="master__container">
         <h1 class="master__title">{{ $t('titles.mainTitle') }}</h1>
         <div class="master__items">
            <div class="master__item item-master" v-for="courseItem in coursesList" :key="courseItem.id">
               <div class="item-master__content">
                  <h3 class="item-master__title subtitile">{{ courseItem.title }}</h3>
                  <div class="item-master__image"><img :src="getImagePath(courseItem.imgSrc)" alt="" /></div>
                  <ul class="item-master__info">
                     <li class="item-master__item-info" v-for="(infoItem, index) in courseItem.courseInfo" :key="index">
                        {{ $t(`mainCourses.infos.${infoItem.title}`) }}
                     </li>
                  </ul>
               </div>
               <button class="item-master__button button">{{ $t('buttons.detaildedAboutCourse') }}</button>
               <div class="item-master__price">{{ $t('infos.priceFrom') }} - {{ courseItem.price }} $</div>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
   coursesList: {
      type: Array,
      required: true,
   },
})
const getImagePath = (imgPath) => {
   return new URL(`../../assets/img/home/${imgPath}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.master {
   &:not(:last-child) {
      margin-bottom: clamp(4rem, -0.004rem + 11.742vw, 9.375rem);
   }

   &__title {
      text-align: center;
      color: #e0e0e0;
      text-transform: uppercase;
      letter-spacing: 2px;
      line-height: 1.3;
      font-weight: 700;
      font-size: clamp(1.35rem, 0.937rem + 1.174vw, 2rem);
      &:not(:last-child) {
         margin-bottom: clamp(2.5rem, 0.624rem + 3.914vw, 3.75rem);
      }
   }
   &__items {
      display: grid;
      gap: clamp(2.5rem, 0.624rem + 3.914vw, 3.75rem);
      grid-template-columns: repeat(2, 1fr);
      @media (max-width: 700px) {
         grid-template-columns: 1fr;
         gap: 50px;
      }
   }
}

.item-master {
   position: relative;
   background-color: #2b2b2b;
   padding: 20px;
   border-radius: 8px;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   transition:
      transform 0.4s ease,
      box-shadow 0.3s ease;
   @media (any-hover: hover) {
      &:hover {
         transform: translateY(-10px);
         box-shadow: 7px 7px 10px #464646;
      }
   }

   @media (max-width: 700px) {
      width: 100%;
      max-width: 100%;
      margin: auto;
   }

   &__content {
      display: flex;
      flex-direction: column;
      &:not(:last-child) {
         margin-bottom: clamp(1.125rem, 0.187rem + 1.957vw, 1.75rem);
      }
   }

   &__title {
      align-self: center;
      letter-spacing: 3px;
      color: #d3d3d3;
      font-weight: 600;
      &:not(:last-child) {
         margin-bottom: 20px;
      }
   }

   &__image {
      position: relative;
      padding-bottom: 81%;
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, -0.001rem + 1.957vw, 1.563rem);
      }
      img {
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         object-fit: contain;
      }
      @media (max-width: 700px) {
         padding-bottom: 70%;
      }
      @media (max-width: 500px) {
         padding-bottom: 60%;
      }
   }

   &__item-info {
      text-align: left;
      position: relative;
      display: flex;
      align-items: center;
      line-height: 1.25;
      padding-left: 20px;
      color: #a0a0a0;
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, 0.156rem + 0.978vw, 0.938rem);
      }
      &::before {
         content: '';
         flex: 0 0 5px;
         position: absolute;
         background-color: #ffffff;
         border-radius: 50%;
         width: 5px;
         height: 5px;
         left: 0;
      }
      @media (max-width: 425px) {
         font-size: 14px;
      }
   }

   &__button {
      width: 100%;
      font-size: clamp(1rem, 0.812rem + 0.391vw, 1.125rem);
      font-weight: 500;
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, -0.313rem + 1.957vw, 1rem);
      }
   }

   &__price {
      font-size: clamp(1.1rem, 0.468rem + 1.37vw, 1.563rem);
      font-weight: 600;
      color: #ffab00;
      margin-top: 1rem;
   }
}
</style>
