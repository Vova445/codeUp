<template>
   <main-master-page>
      <section class="course-header">
         <div class="course-header__container">
            <div class="course-header__top">
               <h1 class="course-header__title title title--left">{{ $t('courses.titles.courseWith') }} <slot name="title"></slot></h1>
               <button class="course-header__announcement">
                  <span class="course-header__text-announcement"
                     >{{ $t('courses.titles.start') }} <br />
                     {{ $t('courses.titles.growing') }} <br />
                     {{ $t('courses.titles.today') }}</span
                  >
                  <div class="course-header__bc-announcement"><img src="../../assets/img/decore/circle-decore.svg" alt="" /></div>
               </button>
            </div>
            <div class="course-header__main-image"><img :src="getImgPath()" alt="" /></div>
            <div class="course-header__bottom">
               <div class="course-header__arrow"><img src="@/assets/img/icons/arrow.gif" alt="" /></div>
               <button class="course-header__start-studding">{{ $t('buttons.startStudding') }}</button>
            </div>
         </div>
      </section>
      <section class="course-info">
         <div class="course-info__container">
            <div class="course-info__block">
               <h3 class="course-info__title">what is HTML and CSS</h3>
               <div class="course-info__text">
                  <p>{{ $t('courses.coursesDescriptions.htmlDercr') }}</p>
               </div>
            </div>
            <div class="course-info__block course-info__block--button">
               <button class="course-info__button">{{ $t('buttons.startStudding') }}</button>
            </div>
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
            <h3 class="studding-with-us__title">What is studding with us</h3>
            <div class="studding-with-us__body">
               <div class="studding-with-us__item">
                  <div class="studding-with-us__subtitle">+ Bonuses</div>
                  <div class="studding-with-us__description">Services, libraries, +Js-start</div>
               </div>
               <div class="studding-with-us__item">
                  <div class="studding-with-us__subtitle">When is start ?</div>
                  <div class="studding-with-us__description">Whenever you want</div>
               </div>
               <div class="studding-with-us__item">
                  <div class="studding-with-us__subtitle">Certificate</div>
                  <div class="studding-with-us__description">Services, libraries, +Js-start</div>
               </div>
               <div class="studding-with-us__item">
                  <div class="studding-with-us__subtitle">+ Bonuses</div>
                  <div class="studding-with-us__description">Services, libraries, +Js-start</div>
               </div>
               <div class="studding-with-us__item">
                  <div class="studding-with-us__subtitle">Reviews</div>
               </div>
               <div class="studding-with-us__item studding-with-us__item--price">
                  <div class="studding-with-us__subtitle">150$</div>
                  <div class="studding-with-us__description">const of course</div>
               </div>
            </div>
         </div>
      </section>
      <section class="steps-of-studding">
         <steps-section :steps-list="stepsList" />
      </section>
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
})

function getImgPath() {
   return new URL(`../../assets/img/courses-logs/${props.imgSrc}`, import.meta.url).href
}
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
   &:not(:last-child) {
      margin-bottom: clamp(2.5rem, 0.624rem + 3.914vw, 3.75rem);
   }
   // .course-header__container
   &__container {
   }
   // .course-header__top
   &__top {
      display: grid;
      gap: 25px;
      grid-template-columns: 400px auto;
      justify-content: space-between;

      &:not(:last-child) {
         margin-bottom: 40px;
      }
      @media (max-width: 767.98px) {
         grid-template-columns: 1fr;
      }
   }
   // .course-header__title
   &__title {
      font-size: clamp(1.5rem, 0.75rem + 1.566vw, 2rem);
      font-weight: 600;

      @media (max-width: 767.98px) {
         text-align: center;
      }
   }
   // .course-header__announcement
   &__announcement {
      position: relative;
      width: 220px;
      height: 220px;
      text-align: center;
      @media (any-hover: hover) {
         &:hover {
            .course-header__bc-announcement {
               animation-play-state: paused;
            }
         }
      }
      @media (max-width: 767.98px) {
         width: 190px;
         height: 190px;
         margin: 0 auto;
      }
   }
   // .course-header__text-announcement
   &__text-announcement {
      position: relative;
      z-index: 1;
      font-weight: 600;
      font-size: clamp(1.25rem, 0.781rem + 0.978vw, 1.563rem);
      line-height: 1.4;
   }
   // .course-header__bc-announcement
   &__bc-announcement {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      img {
         width: 100%;
         height: 100%;
      }
      animation: spinInfinite 20s infinite linear;
   }
   // .course-header__main-image
   &__main-image {
      position: relative;
      padding-bottom: 20%;
      &:not(:last-child) {
         margin-bottom: 30px;
      }
      img {
         //max-width: 100%;
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
      }
      @media (max-width: 550px) {
         padding-bottom: 25%;
      }
   }
   // .course-header__bottom
   &__bottom {
      justify-content: center;
      display: flex;
      gap: clamp(0.625rem, -0.001rem + 3.132vw, 2.5rem);
      align-items: end;
   }
   // .course-header__arrow
   &__arrow {
      img {
         max-width: 200px;
      }
      @media (max-width: 767.98px) {
         img {
            max-width: 150px;
         }
      }
      @media (max-width: 550px) {
         img {
            max-width: 100px;
         }
      }
   }
   // .course-header__start-studding
   &__start-studding {
      transition: all 0.3s ease 0s;
      box-shadow: 0 0 10px #4432c9;
      border-radius: 18px;
      padding: 13px clamp(1.125rem, 0.916rem + 1.044vw, 1.75rem);
      font-weight: 500;
      background-color: #4432c9;
      font-size: clamp(1.18rem, 0.875rem + 0.783vw, 1.5rem);
      @media (any-hover: hover) {
         &:hover {
            background-color: #21176a;
         }
      }
   }
}

.course-info {
   background: linear-gradient(280deg, rgba(37, 27, 111, 1) 0%, rgba(71, 51, 211, 1) 100%);
   padding: clamp(1.125rem, -0.001rem + 2.348vw, 1.875rem) 0;
   &:not(:last-child) {
      margin-bottom: 30px;
   }
   // .course-info__container
   &__container {
      display: grid;
      gap: 30px;
      grid-template-columns: 1fr auto;
      @media (max-width: 767.98px) {
         grid-template-columns: 1fr;
      }
   }
   // .course-info__block
   &__block {
      background-color: #170f50;
      border-radius: 30px;

      padding: 14px 20px;
      &--button {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }
   // .course-info__title
   &__title {
      font-weight: 600;
      font-size: clamp(1.25rem, 0.312rem + 1.957vw, 1.875rem);
      line-height: 1.3;
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, 0.156rem + 0.978vw, 0.938rem);
      }
   }
   // .course-info__text
   &__text {
      line-height: 1.4;
   }
   &__button {
      transition: all 0.3s ease 0s;
      box-shadow: 0 0 10px #4432c9;
      background-color: #4834d4;
      padding: 18px 30px;
      border-radius: 0 0 20px 0;
      @media (any-hover: hover) {
         &:hover {
            background-color: #21176a;
         }
      }
   }
}
.course-program {
   &:not(:last-child) {
      margin-bottom: clamp(2.5rem, 0.624rem + 3.914vw, 3.75rem);
   }
   @media (min-width: 601px) {
      position: relative;
      z-index: 2;
      &::before {
         content: '';
         z-index: 1;
         position: absolute;
         top: 5%;
         left: 0;
         width: 90%;
         padding-top: 48%;
         transform: translate(-10%, 0);
         background: url('../../assets/img/decore/line-decore.svg') 0 0 / 100% no-repeat;
      }
   }
   // .course-program__container
   &__container {
   }
   // .course-program__title
   &__title {
      text-align: center;
      font-weight: 700;
      span {
         color: #4b37d5;
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
      @media (max-width: 600px) {
         grid-template-columns: 1fr;
         gap: 5px;
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
      gap: 10px;
      &::marker {
         display: none;
      }
      &:not(:last-child) {
         margin-bottom: 5px;
      }
      @media (max-width: 767.98px) {
         font-size: 14px;
      }
   }
   // .course-program__number
   &__number {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      background-color: #4b37d5;
      border-radius: 10px;
      font-weight: 700;
      padding: 10px;
      width: 35px;
      height: 35px;
      @media (max-width: 767.98px) {
         font-size: 12px;
         width: 28px;
         height: 28px;
      }
   }
   // .course-program__text
   &__text {
      line-height: 1.3;
   }
}

.studding-with-us {
   padding: clamp(1.25rem, -0.626rem + 3.914vw, 2.5rem) 0;

   background: linear-gradient(229deg, rgba(164, 28, 28, 1) 0%, rgba(23, 21, 111, 1) 100%);
   // .studding-with-us__container
   &__container {
   }
   // .studding-with-us__title
   &__title {
      position: relative;
      z-index: 2;
      text-align: center;
      font-size: clamp(1.375rem, -0.314rem + 3.523vw, 2.5rem);
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, 0.312rem + 1.957vw, 1.875rem);
      }
   }
   // .studding-with-us__body
   &__body {
      position: relative;
      z-index: 2;
      display: grid;
      gap: 20px;
      justify-content: space-between;
      grid-template-columns: auto auto;
      @media (max-width: 650px) {
         grid-template-columns: auto;
         align-items: center;
         justify-content: center;
      }
   }
   // .studding-with-us__item
   &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      text-align: center;
      padding: clamp(1.875rem, 0.937rem + 1.957vw, 2.5rem) clamp(2.5rem, 1.562rem + 1.957vw, 3.125rem);

      &::before {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         opacity: 0.35;
         background-color: #2c143a;
      }
      &--price {
         .studding-with-us__subtitle {
            font-size: 30px;
         }
         width: 200px;
         height: 200px;
         &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('../../assets/img/decore/circle-decore.svg') 0 0/ 100% no-repeat;
            animation: spinInfinite 20s infinite linear;
         }
         @media (max-width: 650px) {
            margin: 0 auto;
         }
      }
   }
   // .studding-with-us__subtitle
   &__subtitle {
      position: relative;
      z-index: 2;
      line-height: 1.3s;
      font-size: clamp(1.375rem, 1rem + 0.783vw, 1.625rem);
      font-weight: 600;
      &:not(:last-child) {
         margin-bottom: clamp(0.563rem, 0rem + 1.174vw, 0.938rem);
      }
   }
   // .studding-with-us__description
   &__description {
      position: relative;
      z-index: 2;
      line-height: 1.3;
      font-size: clamp(0.875rem, 0.687rem + 0.391vw, 1rem);
   }
   // .studding-with-us__price
   &__price {
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
      transform: rotate(0);
   }
   100% {
      transform: rotate(360deg);
   }
}
</style>
