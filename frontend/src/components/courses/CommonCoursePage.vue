<template>
   <main-master-page>
      <section class="course-header">
         <div class="course-header__decor"><img src="@/assets/img/decore/falling-code.webp" alt="" /></div>
         <div class="course-header__container">
            <div class="course-header__content">
               <h1 class="course-header__title title title--big title--gradient">{{ $t('courses.titles.courseWith') }} <slot name="title"></slot></h1>
               <h4 class="course-header__subtitle">{{ $t('courses.titles.startStuddingToday') }}</h4>
               <button class="course-header__button button button--arrow">
                  {{ $t('buttons.startStudding') }}
               </button>
            </div>
            <div class="course-header__image">
               <img class="filter-green" :src="getImgPath" alt="" />
            </div>
         </div>
      </section>
      <section class="course-info">
         <div class="course-info__container">
            <h3 class="course-info__title title title--small">{{ $t('courses.titles.whatIs') }} <slot name="title"></slot> ?</h3>
            <div class="course-info__text">
               <p>{{ $t(courseDescr) }}</p>
            </div>
            <button class="course-info__button button">{{ $t('buttons.startStudding') }}</button>
         </div>
      </section>
      <section class="course-program">
         <div class="course-program__container">
            <h3 class="course-program__title">General <span> program </span> of the course</h3>
            <div class="course-program__body">
               <div class="course-program__column">
                  <ol class="course-program__list">
                     <li v-for="(item, indx) in getFirstHalf(courseProgram)" :key="indx" class="course-program__item">
                        <span class="course-program__number">{{ item.count }}</span>
                        <span class="course-program__text">{{ item.title }}</span>
                     </li>
                  </ol>
               </div>
               <div class="course-program__column">
                  <ol class="course-program__list">
                     <li v-for="(item, indx) in getSecondHalf(courseProgram)" :key="indx" class="course-program__item">
                        <span class="course-program__number">{{ item.count }}</span>
                        <span class="course-program__text">{{ item.title }}</span>
                     </li>
                  </ol>
               </div>
            </div>
         </div>
      </section>
      <section class="studding-with-us">
         <div class="studding-with-us__container">
            <h3 class="studding-with-us__title title">{{ $t('courses.titles.studdingWithUs') }}</h3>
            <div class="studding-with-us__box">
               <button class="studding-with-us__item item-studding item-studding__item--certificate">
                  <div class="item-studding__decor"><img src="@/assets/img/decore/two-stars.svg" alt="" /></div>
                  <h6 class="item-studding__title">Сертифікат</h6>
               </button>
               <div class="studding-with-us__item item-studding item-studding__item--feedback">
                  <div class="item-studding__top">
                     <h6 class="item-studding__title">Фідбек</h6>
                  </div>
                  <div class="item-studding__bottom">
                     <div class="item-studding__descr">Допомога з вирішенням тасків та помилок</div>
                  </div>
               </div>
               <div class="studding-with-us__item item-studding item-studding__item--additionally">
                  <div class="item-studding__decor"><img src="@/assets/img/decore/three-stars.svg" alt="" /></div>
                  <h6 class="item-studding__title">Додатково</h6>
                  <div class="item-studding__descr">Бібілотеки , цікаві практики</div>
               </div>
               <div class="studding-with-us__item item-studding item-studding__item--start">
                  <h6 class="item-studding__title">Коли навчання?</h6>
                  <div class="item-studding__descr">У зручний для вас час</div>
               </div>
               <button class="studding-with-us__item item-studding item-studding__item--price">
                  <div class="item-studding__content">
                     <div class="item-studding__price">
                        <div class="item-studding__text-price">150$</div>
                        <font-awesome-icon :icon="['fas', 'certificate']" />
                     </div>
                     <h6 class="item-studding__title">Ціна за весь курс</h6>
                  </div>
                  <div class="item-studding__image">
                     <img :src="getImgPath" alt="" />
                  </div>
               </button>
            </div>
         </div>
      </section>
      <!--<section class="steps-of-studding">
         <steps-section :steps-list="stepsList" />
      </section>-->
      <div class="pay-section">
         <div class="pay-section__container">
            <div class="pay-section__body">
               <h6 class="pay-section__title">Pay for course</h6>
               <button @click="onPay" class="pay-section__pay">Pay -></button>
            </div>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import { storeToRefs } from 'pinia'
import StepsSection from '../../components/home/StepsSection.vue'
import { useMainPageDataStore } from '../../stores/mainPageData.js'
import { computed } from 'vue'
const { stepsList } = storeToRefs(useMainPageDataStore())
const props = defineProps({
   imgSrc: {
      type: String,
      default: 'logo.svg',
   },
   courseProgram: {
      type: Array,
      required: true,
   },
   courseDescr: {
      type: String,
   },
})

const getImgPath = computed(() => {
   return new URL(`../../assets/img/courses-logs/${props.imgSrc}`, import.meta.url).href
})
function getFirstHalf(arr) {
   const half = Math.ceil(arr.length / 2)
   return arr.slice(0, half)
}
function getSecondHalf(arr) {
   const half = Math.ceil(arr.length / 2)
   return arr.slice(half)
}
function onPay() {}
</script>

<style lang="scss" scoped>
.course-header {
   position: relative;
   overflow: hidden;

   &__decor {
      transform: translate(0, -100px);
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      left: 0;
      img {
         //position: absolute;
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
   &:not(:last-child) {
      padding-bottom: clamp(6.25rem, 5.415rem + 4.175vw, 8.75rem);
   }
   // .course-header__container
   &__container {
      display: flex;
      gap: 1.25rem;
      @media (max-width: 57rem) {
         flex-direction: column;
         gap: 3.75rem;
      }
      @media (max-width: 28.125rem) {
         text-align: center;
      }
   }

   // .course-header__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, 0.312rem + 1.957vw, 1.875rem);
      }
      @media (max-width: 28.125rem) {
         text-align: center;
      }
   }
   // .course-header__subtitle
   &__subtitle {
      color: $whiteGrayColor;
      font-size: clamp(1.25rem, 0.999rem + 1.253vw, 2rem);
      font-weight: 500;
      line-height: 1.21;
      &:not(:last-child) {
         margin-bottom: 1.875rem;
      }
   }
   // .course-header__image
   &__image {
      width: 100%;
      position: relative;
      flex: 0 0 39.2%;
      padding-bottom: 10%;
      .filter-green {
         filter: invert(43%) sepia(98%) saturate(1351%) hue-rotate(93deg) brightness(107%) contrast(101%);
      }
      img {
         pointer-events: none;
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
      }
      @media (max-width: 57rem) {
         margin: 0 auto;
         padding-bottom: 25%;
      }
   }
}

.course-info {
   color: #000;
   background: linear-gradient(142.34deg, rgb(2, 254, 86) -0.91%, rgb(79, 251, 136) 94.761%);
   padding: clamp(1.75rem, 1.499rem + 1.253vw, 2.5rem) 0;
   // .course-info__container
   &:not(:last-child) {
      margin-bottom: clamp(5.625rem, -0.022rem + 11.765vw, 9.375rem);
   }
   // .course-info__title
   &__title {
      color: #000;
      &:not(:last-child) {
         margin-bottom: clamp(1.063rem, 0.791rem + 1.357vw, 1.875rem);
      }
   }
   // .course-info__text
   &__text {
      font-weight: 500;
      line-height: 1.2;
      font-size: clamp(0.875rem, 0.75rem + 0.626vw, 1.25rem);
      &:not(:last-child) {
         margin-bottom: clamp(1.75rem, 1.499rem + 1.253vw, 2.5rem);
      }
   }
   // .course-info__button
   &__button {
      display: block;
      background-color: #000;
      color: #fff;
      margin: 0 auto;
      transition: all 0.3s ease 0s;
      @media (any-hover: hover) {
         &:hover {
            background-color: #134d14;
         }
      }
   }
}

.course-program {
   &:not(:last-child) {
      margin-bottom: clamp(5.625rem, -0.022rem + 11.765vw, 9.375rem);
   }

   // .course-program__container
   &__container {
   }
   // .course-program__title
   &__title {
      text-align: center;
      font-weight: 700;
      span {
         color: $greenColor;
      }
      font-size: clamp(1.375rem, -0.314rem + 3.523vw, 2.5rem);
      line-height: 1.3;
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, -0.626rem + 3.914vw, 2.5rem);
      }
   }
   // .course-program__body
   &__body {
      display: grid;
      justify-content: space-between;
      grid-template-columns: auto auto;
      gap: 20px;
      @media (max-width: 37.5rem) {
         grid-template-columns: 1fr;
         gap: 0.3125rem;
      }
   }
   // .course-program__column
   &__column {
   }
   // .course-program__list
   &__list {
      list-style-type: none;
   }
   // .course-program__item
   &__item {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 0.625rem;
      &::marker {
         display: none;
      }
      &:not(:last-child) {
         margin-bottom: 0.625rem;
      }
      @media (max-width: 47.9988rem) {
         font-size: 0.875rem;
         margin-bottom: 0.3125rem;
      }
   }
   // .course-program__number
   &__number {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      background-color: $greenColor;
      border-radius: 0.625rem;
      font-weight: 700;
      padding: 0.625rem;
      width: 1.875rem;
      height: 1.875rem;
      @media (max-width: 47.9988rem) {
         font-size: 0.9375rem;
         width: 1.75rem;
         height: 1.75rem;
      }
   }
   // .course-program__text
   &__text {
      line-height: 1.3;
   }
}

.studding-with-us {
   // .studding-with-us__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(1.875rem, 0.934rem + 1.961vw, 2.5rem);
      }
   }
   // .studding-with-us__box
   &__box {
      display: grid;
      gap: 1.25rem;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
   }
}

.item-studding {
   display: flex;
   flex-direction: column;
   border-radius: 0.9375rem;
   padding: clamp(0.938rem, -0.004rem + 1.961vw, 1.563rem) clamp(0.625rem, -0.316rem + 1.961vw, 1.25rem);
   background: rgba(255, 255, 255, 0.1);
   // .item-studding__item--certificate
   &__item--certificate {
      border: 0.1875rem solid rgba(0, 255, 170, 0.72);
      background: linear-gradient(177.08deg, rgb(0, 0, 0) 56.737%, rgba(0, 255, 170, 0.72) 158.813%);
      grid-column-start: 1;
      grid-column-end: 4;
      //justify-self: start;
      .item-studding__decor {
         img {
            max-width: 12.5rem;
            @media (max-width: 47.9988rem) {
               max-width: 6.25rem;
            }
         }
         &:not(:last-child) {
            margin-bottom: 0.3125rem;
         }
         justify-self: end;
      }
      display: grid;
      .item-studding__title {
         font-size: clamp(1.75rem, 1.071rem + 2.415vw, 3rem);
         color: #3ed771;
         justify-self: start;
      }
      @media (any-hover: hover) {
         &:hover {
         }
      }
   }

   // .item-studding__title
   &__title {
      font-size: clamp(1.375rem, 1.035rem + 1.208vw, 2rem);
      line-height: 1.2;
      font-weight: 700;
   }
   &__descr {
      line-height: 1.2;
      font-size: clamp(0.875rem, 0.671rem + 0.725vw, 1.25rem);
   }
   // .item-studding__item--feedback
   &__item--feedback {
      grid-row-start: 2;
      grid-row-end: 4;
      gap: 0.625rem;
      justify-content: space-between;
      .item-studding__title {
         text-align: center;
         font-size: clamp(1.875rem, 1.365rem + 1.812vw, 2.813rem);
         &:not(:last-child) {
            margin-bottom: 0.4375rem;
         }
      }
      .item-studding__descr {
         font-size: clamp(1rem, 0.796rem + 0.725vw, 1.375rem);
         text-align: center;
         color: #c2c2c2;
      }
      @media (max-width: 47.9988rem) {
         grid-row-start: 2;
         grid-row-end: 2;
         grid-column-start: 1;
         grid-column-end: 4;
      }
      //@media (max-width: e){

      //}
   }
   // .item-studding__item--additionally
   &__item--additionally {
      border: 0.1875rem solid rgba(0, 255, 170, 0.72);
      background: linear-gradient(141.17deg, rgb(0, 0, 0) 7.828%, rgba(0, 255, 170, 0.91) 80.502%);
      .item-studding__decor {
         text-align: right;
         &:not(:last-child) {
            margin-bottom: 0.3125rem;
         }
         img {
            max-width: 6.25rem;
            @media (max-width: 47.9988rem) {
               max-width: 4.375rem;
            }
         }
      }
      .item-studding__title {
         font-size: clamp(1.563rem, 1.053rem + 1.812vw, 2.5rem);

         &:not(:last-child) {
            margin-bottom: 0.625rem;
         }
      }
      .item-studding__descr {
         font-weight: 600;
         color: #000;
      }
      @media (max-width: 47.9988rem) {
         grid-column-start: 1;
         grid-column-end: 3;
      }
      @media (max-width: 29.6875rem) {
         grid-column-start: 1;
         grid-column-end: 4;
      }
   }
   // .item-studding__item--start
   &__item--start {
      justify-content: end;
      .item-studding__title {
         font-size: clamp(1.563rem, 1.053rem + 1.812vw, 2.5rem);
         &:not(:last-child) {
            margin-bottom: clamp(1.875rem, 1.535rem + 1.208vw, 2.5rem);
         }
      }
      .item-studding__descr {
         color: #c2c2c2;
      }
      @media (max-width: 29.6875rem) {
         grid-column-start: 1;
         grid-column-end: 4;
         text-align: center;
      }
   }
   // .item-studding__item--price
   &__item--price {
      background: linear-gradient(177.08deg, rgb(0, 0, 0) 56.737%, rgba(0, 255, 170, 0.72) 158.813%);
      border: 0.1875rem solid rgba(0, 255, 170, 0.72);
      grid-column-start: 2;
      grid-column-end: 4;
      flex-direction: row;
      align-items: center;
      gap: 0.625rem;
      justify-content: space-between;
      .item-studding__content {
         height: 100%;
         display: grid;
         align-items: end;
      }
      .item-studding__price {
         position: relative;
         display: flex;
         align-items: center;
         justify-content: center;
         font-weight: 700;
         font-size: 3.75rem;
         &:not(:last-child) {
            margin-bottom: 1.25rem;
         }

         svg {
            position: absolute;
            width: clamp(6.25rem, 4.552rem + 6.039vw, 9.375rem);
            height: clamp(6.25rem, 4.552rem + 6.039vw, 9.375rem);
            //opacity: 0.9;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: $greenColor;

            animation: spinInfinite 30s infinite linear;
            @media (any-hover: hover) {
               &:hover {
                  animation-play-state: paused;
               }
            }
         }
         .item-studding__text-price {
            font-size: clamp(1.75rem, 1.342rem + 1.449vw, 2.5rem);
            text-align: center;
            position: relative;
            z-index: 2;
            color: #000;
         }
      }
      .item-studding__title {
         align-self: end;
         position: relative;
         z-index: 2;
         font-size: clamp(1.125rem, 0.887rem + 0.845vw, 1.563rem);
      }
      .item-studding__image {
         flex: 0 1 25%;
         img {
            max-width: 100%;
         }
      }
      @media (max-width: 47.9988rem) {
         min-height: 12.5rem;
         grid-column-start: 1;
         grid-column-end: 4;
      }
   }
}

.steps-of-studding {
   &:not(:last-child) {
      margin-bottom: clamp(3.75rem, 1.874rem + 3.914vw, 5rem);
   }
}
.pay-section {
   // .pay-section__container

   &__container {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 540px;
      padding: 30px;
      border-radius: 20px;
      background-color: #000;
   }
   // .pay-section__title
   &__title {
      font-weight: 700;
      &:not(:last-child) {
         margin-bottom: 30px;
      }
      font-size: clamp(1.563rem, 1.093rem + 0.978vw, 1.875rem);
   }
   // .pay-section__pay
   &__pay {
      padding: 20px 40px;
      background-color: #4432c9;
      border-radius: 0 0 20px 0;
   }
}

@keyframes spinInfinite {
   0% {
      transform: translate(-50%, -50%) rotate(0);
   }
   100% {
      transform: translate(-50%, -50%) rotate(360deg);
   }
}
</style>
