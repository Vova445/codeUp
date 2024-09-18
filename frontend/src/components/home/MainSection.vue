<template>
   <section data-watch class="master">
      <div class="master__container">
         <h1 class="master__title title">{{ $t('titles.mainTitle') }}</h1>
         <div class="master__box">
            <div class="master__icons-container">
               <div
                  class="circle-container"
                  :class="course.classAdd"
                  v-for="course in coursesList"
                  :key="course.id"
                  :style="[{ backgroundColor: course.background }, { transform: `scale(${course.scale})` }]"
               >
                  <svg viewBox="0 0 100 100" class="circle-svg">
                     <defs>
                        <path id="circlePath" d="M 50, 51 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                     </defs>
                     <text>
                        <textPath href="#circlePath" startOffset="25%" text-anchor="middle" dominant-baseline="middle">{{ course.title }}</textPath>
                     </text>
                  </svg>
                  <font-awesome-icon :icon="course.image" class="icon-center" />
               </div>
            </div>
            <div class="master__content">
               <div class="master__course-description">
                  <span>CodeUp</span> - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, vero magni? Ullam a ex laboriosam esse
                  quasi recusandae eos natus fugit laudantium obcaecati harum, ipsa soluta tempora quaerat dignissimos nobis? Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Deserunt, nisi?
               </div>
               <button class="master__button button">detailed</button>
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
      margin-bottom: clamp(4.375rem, 1.561rem + 5.871vw, 6.25rem);
   }
   &__title {
      &:not(:last-child) {
         margin-bottom: 40px;
      }
   }
   &__box {
      position: relative;
   }
   &__icons-container {
      display: flex;
      gap: 30px;

      &:not(:last-child) {
         margin-bottom: 50px;
      }
      @media (max-width: 992px) {
         overflow: auto;
         overflow-x: auto;
         -webkit-overflow-scrolling: touch;
         padding-bottom: 15px;
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
      }
   }
   &__content {
      padding: 150px 0;
      max-width: 600px;
      margin: 0 auto;
      color: #e6fefe;
      text-align: center;
      line-height: 1.6;
      letter-spacing: 0.3px;

      @media (max-width: 992px) {
         padding: 0;
      }
      @media (max-width: 630px) {
         text-align: left;
      }
      @media (max-width: 550px) {
         font-size: 14px;
         left: 1.5;
      }
   }
   &__course-description {
      &:not(:last-child) {
         margin-bottom: 30px;
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
      padding: 15px 70px;
      background: linear-gradient(110deg, #3c776f, #6da086, #3c776f);
      background-size: 200% 200%;

      animation: gradientShift 5s ease infinite;
      @keyframes gradientShift {
         0% {
            background-position: 0% 50%;
         }
         50% {
            background-position: 100% 50%;
         }
         100% {
            background-position: 0% 50%;
         }
      }
      @media (any-hover: hover) {
         &:hover {
            background: linear-gradient(110deg, #3c776f, #3c776f, #3c776f);
         }
      }
   }
}

.circle-container {
   color: #fff;
   position: relative;
   position: absolute;
   top: 0;
   left: 0;
   width: 100px;
   height: 100px;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: white;
   border-radius: 50%;
   @media (max-width: 992px) {
      width: clamp(4.375rem, 2.958rem + 4.121vw, 6.25rem);
      height: clamp(4.375rem, 2.958rem + 4.121vw, 6.25rem);
   }
}

.python {
   left: 15%;
   top: 0;
}
.vue {
   left: 40%;
   top: 10%;
}
.react {
   top: 40%;
   left: 5%;
}
.node {
   top: 80%;
   left: 20%;
}
.js {
   top: 85%;
   left: 50%;
}
.html-css {
   top: 80%;
   left: 80%;
}
.c-sharp {
   top: 5%;
   left: 70%;
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
}
text {
   font-family: Arial, sans-serif;
   font-size: 18px;
   fill: #fff;
}

.circle-container {
   @media (max-width: 992px) {
      position: relative;
      top: 0;
      left: 0;
      transform: scale(1) !important;
      flex: 0 0 clamp(4.375rem, 2.958rem + 4.121vw, 6.25rem);
   }
}
.icon-center {
   position: absolute;
   font-size: clamp(1.563rem, 1.09rem + 1.374vw, 2.188rem);
}
</style>
