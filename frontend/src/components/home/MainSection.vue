<template>
   <section class="master">
      <img class="master__decor" src="../../assets/img/home/decore-codeUp.svg" alt="" />
      <div class="master__container">
         <h1 class="master__title title">{{ $t('titles.mainTitle') }}</h1>
         <div class="master__box">
            <div class="master__icons-container">
               <router-link
                  class="circle-container"
                  :class="course.classAdd"
                  v-for="course in coursesList"
                  :to="{ name: course.toName }"
                  :key="course.id"
                  :style="[{ background: course.background }, { transform: `scale(${course.scale})` }]"
               >
                  <svg viewBox="0 0 100 100" class="circle-svg">
                     <defs>
                        <path id="circlePath" d="M 50, 51 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                     </defs>
                     <text>
                        <textPath href="#circlePath" startOffset="25%" text-anchor="middle" dominant-baseline="middle">{{ course.title }}</textPath>
                     </text>
                  </svg>
                  <img :src="getImagePath(course.image)" class="icon-center" alt="" />
               </router-link>
            </div>
            <div class="master__content text">
               <div class="master__course-description">
                  <span>CodeUp</span> - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, vero magni? Ullam a ex laboriosam esse
                  quasi recusandae eos natus fugit laudantium obcaecati harum, ipsa soluta tempora quaerat dignissimos nobis? Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Deserunt, nisi?
               </div>
               <router-link :to="{ name: 'all-courses' }" class="master__button exit-button">
                  <span class="exit-button__circle" aria-hidden="true">
                     <span class="exit-button__icon">
                        <font-awesome-icon :icon="['fas', 'angle-right']" />
                     </span>
                  </span>
                  <span class="exit-button__text">{{ $t('buttons.allCourses') }}</span>
               </router-link>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
   coursesList: {
      type: Array,
      required: true,
   },
})
const getImagePath = (imgPath) => {
   return new URL(`../../assets/img/courses-logs/${imgPath}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.master {
   position: relative;
   &:not(:last-child) {
      margin-bottom: clamp(3.125rem, 1.249rem + 3.914vw, 4.375rem);
   }

   &__decor {
      position: absolute;
      width: 40%;
      opacity: 0.2;
      height: 100%;
      top: 0;
      left: 50%;
      @media (max-width: 630px) {
         display: none;
      }
   }
   &__title {
      font-weight: 800;
      font-size: clamp(1.375rem, -0.126rem + 3.131vw, 2.375rem);
      &:not(:last-child) {
         margin-bottom: 40px;
      }
   }
   &__box {
      position: relative;
   }
   &__icons-container {
      display: flex;
      gap: 10px;

      @media (max-width: 767.98px) {
         overflow: auto;
         overflow-x: auto;
         -webkit-overflow-scrolling: touch;
         padding-bottom: 10px;
         &::-webkit-scrollbar {
            height: 1.5px;
         }

         &::-webkit-scrollbar-thumb {
            background-color: #333333;
            border-radius: 4px;
         }

         &::-webkit-scrollbar-track {
            background-color: transparent;
         }
         &:not(:last-child) {
            justify-content: space-between;
            margin-bottom: 25px;
            gap: 25px;
         }
      }
   }
   &__content {
      padding: 100px 0;
      max-width: 600px;
      margin: 0 auto;
      color: #e6fefe;
      text-align: center;
      line-height: 1.6;
      letter-spacing: 0.3px;

      @media (max-width: 992px) {
         padding: 200px 0 0 0;
      }
      @media (max-width: 767.98px) {
         padding: 0;
      }

      @media (max-width: 550px) {
         //font-size: 14px;
      }
   }
   &__course-description {
      &:not(:last-child) {
         margin-bottom: 30px;
      }
      @media (max-width: 630px) {
         text-align: left;
      }
      span {
         font-size: 18px;
         font-weight: 600;
         color: #66b2a8;
         @media (max-width: 550px) {
            font-size: 16px;
         }
      }
   }
   &__button {
      //padding: 15px 70px;
      //background: linear-gradient(110deg, #3c776f, #6da086, #3c776f);
      //background-size: 200% 200%;

      //animation: gradientShift 5s ease infinite;
      //@keyframes gradientShift {
      //   0% {
      //      background-position: 0% 50%;
      //   }
      //   50% {
      //      background-position: 100% 50%;
      //   }
      //   100% {
      //      background-position: 0% 50%;
      //   }
      //}
      //@media (any-hover: hover) {
      //   &:hover {
      //      background: linear-gradient(110deg, #3c776f, #3c776f, #3c776f);
      //   }
      //}
      //@media (max-width: 630px) {
      //   width: 100%;
      //}
   }
}

.circle-container {
   color: #fff;
   position: relative;
   position: absolute;
   top: 0;
   left: 0;
   width: 90px;
   height: 90px;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: white;
   border-radius: 50%;
   @media (max-width: 992px) {
      width: clamp(4.375rem, 0.114rem + 8.889vw, 5.625rem);
      height: clamp(4.375rem, 0.114rem + 8.889vw, 5.625rem);
   }
   @media (max-width: 550px) {
      width: clamp(3.438rem, 2.568rem + 4.348vw, 4.063rem);
      height: clamp(3.438rem, 2.568rem + 4.348vw, 4.063rem);
   }
}

.python {
   left: 15%;
   top: 0;
   @media (max-width: 992px) {
      left: 0;
      top: 0;
   }
}
.vue {
   left: 40%;
   top: -3%;
   @media (max-width: 992px) {
      left: 20%;
      top: 5%;
   }
}
.react {
   top: 40%;
   left: 5%;
   @media (max-width: 992px) {
      left: 40%;
      top: 2%;
   }
}
.node {
   top: 80%;
   left: 20%;
   @media (max-width: 992px) {
      left: 7%;
      top: 20%;
   }
}
.js {
   top: 85%;
   left: 50%;
   @media (max-width: 992px) {
      left: 87%;
      top: 3%;
   }
}
.html-css {
   top: 80%;
   left: 80%;
   @media (max-width: 992px) {
      left: 55%;
      top: 20%;
   }
}
.c-sharp {
   top: 2%;
   left: 75%;
   @media (max-width: 992px) {
      left: 65%;
      top: 5%;
   }
}
.circle-svg {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   fill: none;
}
.c-plus {
   left: 85%;
   top: 40%;
   @media (max-width: 992px) {
      left: 76%;
      top: 19%;
   }
}
text {
   font-family: Arial, sans-serif;
   font-size: 18px;
   fill: #fff;
   @media (max-width: 550px) {
      display: none;
   }
}

.circle-container {
   @media (max-width: 992px) {
      flex: 0 0 clamp(4.375rem, 0.114rem + 8.889vw, 5.625rem);
   }
   @media (max-width: 767.98px) {
      position: relative;
      top: 0;
      left: 0;
      transform: scale(1) !important;
   }
   @media (max-width: 550px) {
      flex: 0 0 clamp(3.438rem, 2.568rem + 4.348vw, 4.063rem);
   }
}
.icon-center {
   position: absolute;
   width: 45px;
   height: 45px;
   @media (max-width: 992px) {
      width: clamp(2.188rem, 0.057rem + 4.444vw, 2.813rem);
      height: clamp(2.188rem, 0.057rem + 4.444vw, 2.813rem);
   }
   @media (max-width: 767.98px) {
      width: 30px;
      height: 30px;
   }
   font-size: clamp(1.563rem, 1.09rem + 1.374vw, 2.188rem);
}

.exit-button {
   position: relative;
   //font-size: clamp(1rem, 0.812rem + 0.392vw, 1.125rem);
   padding-right: 30px;

   border-radius: 30px;
   line-height: 1.2;
   display: inline-flex;
   align-items: center;
   gap: 20px;
   overflow: hidden;
   .touch & {
      background-color: #3c776f;
   }
   &::before {
      content: '';
      border-radius: 30px;
      //transition: width 0.3s ease 0s;
      transition: all 0.7s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      z-index: 1;
      width: 0;
      height: 100%;
      background-color: #3c776f;
   }

   // .exit-button__circle
   &__circle {
      display: inline-flex;
      text-align: center;
      align-items: center;
      border-radius: 50%;
      background-color: #3c776f;
      width: 50px;
      height: 50px;
   }
   // .exit-button__icon
   &__icon {
      transition: all 0.5s cubic-bezier(0.65, 0, 0.076, 1);
      position: relative;
      z-index: 2;
      transform: translate(20px, 0);

      &::before {
         content: '';
         transition: all 0.5s ease 0s;
         position: absolute;
         //left: calc(-100% - 2px);
         right: 1px;
         top: calc(50% - 1px);
         transform: translate(0, -50%);
         opacity: 0;
         width: 20px;
         background-color: #fff;
         height: 2px;
         border-radius: 50px;
      }
      .touch & {
         transform: translate(38.75px, 0);
         &::before {
            opacity: 1;
         }
      }
   }
   // .exit-button__text
   &__text {
      transition: all 0.3s ease 0.2s;
      font-weight: 500;
      color: #88c3bb;
      position: relative;
      z-index: 2;
      .touch & {
         color: #fff;
      }
   }
   @media (any-hover: hover) {
      &:hover {
         &::before {
            width: 100%;
         }
         .exit-button__icon {
            transform: translate(38.75px, 0);
            &::before {
               opacity: 1;
            }
         }
         .exit-button__text {
            color: #fff;
         }
      }
   }
}
.touch {
   .exit-button {
      //background-color: #3c776f;
      //.exit-button__text {
      //   color: #fff;
      //}
   }
}
</style>
