<template>
   <section class="master">
      <div class="master__container">
         <div class="master__box">
            <div class="master__content">
               <h1 class="master__title title title--big title--gradient">{{ $t('titles.mainTitle') }}</h1>
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
            <div class="icons-block">
               <router-link
                  class="icons-block__item"
                  :class="course.classAdd"
                  v-for="course in coursesList"
                  :to="{ name: course.toName }"
                  :key="course.id"
                  :style="[{ background: course.background }, { transform: `scale(${course.scale})` }]"
               >
                  <img :src="getImagePath(course.image)" alt="icon-course" />
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

<style lang="scss">
.master {
   position: relative;
   &:not(:last-child) {
      margin-bottom: clamp(5rem, 1.235rem + 7.843vw, 7.5rem);
   }
   // .master__container
   &__container {
   }
   // .master__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, -0.363rem + 3.584vw, 2.5rem);
      }
   }
   // .master__box
   &__box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1.875rem, 0.262rem + 3.584vw, 3.125rem);
      @media (max-width: 62rem) {
         grid-template-columns: 1fr;
      }
      @media (max-width: 47.9988rem) {
         gap: 30px;
      }
   }
   // .master__content
   &__content {
      @media (max-width: 62rem) {
         order: 2;
      }
   }
   // .master__course-description
   &__course-description {
      //font-size: 1.125rem;
      font-size: clamp(0.875rem, 0.791rem + 0.418vw, 1.125rem);

      line-height: 1.35;
      &:not(:last-child) {
         margin-bottom: 2rem;
      }
   }
}
.icons-block {
   @media (max-width: 62rem) {
      order: 1;
      height: 12.5rem;
      display: grid;

      grid-template-rows: 1fr 1fr;
      grid-template-columns: repeat(8, auto);
   }
   @media (max-width: 47.9988rem) {
      height: auto;
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.9375rem;
      gap: 1.875rem;
      overflow-x: auto;
      &::-webkit-scrollbar {
         height: 2px;
      }

      &::-webkit-scrollbar-thumb {
         background-color: $greenColor;
         border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
         background-color: #02521d;
      }

      scroll-behavior: smooth;
   }
   position: relative;
   // .icons-block__item
   &__item {
      position: absolute;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.5rem;
      height: 5.5rem;

      @media (max-width: 62rem) {
         position: relative;
         top: 0 !important;
         left: 0 !important;
         width: 5rem;
         height: 5rem;
         justify-self: center;
         align-self: center;
         &:nth-child(odd) {
            justify-self: start;

            grid-column: span 2;
            grid-row: 1;
            transform: scale(1) !important;
         }

         &:nth-child(even) {
            justify-self: center;
            grid-column: span 2;
            grid-row: 2;
            transform: translate(50%, 0) scale(1) !important;
         }

         &:last-child {
            justify-self: end;
            transform: translate(0, 0) scale(1) !important;
         }
      }
      @media (max-width: 47.9988rem) {
         width: 3.7rem;
         height: 3.7rem;
         flex: 0 0 3.7rem;
         &:nth-child(even) {
            transform: translate(0, 0) scale(1) !important;
         }
      }
      img,
      svg {
         width: 3.5rem;
         height: 3.5rem;
         @media (max-width: 62rem) {
            width: 3rem;
            height: 3rem;
         }
         @media (max-width: 47.9988rem) {
            width: 2rem;
            height: 2rem;
         }
      }
   }
}

.exit-button {
   position: relative;
   padding-right: 1.875rem;
   border-radius: 1.875rem;
   line-height: 1.2;
   display: inline-flex;
   align-items: center;
   gap: 1.25rem;
   overflow: hidden;
   @media (max-width: 47.9988rem) {
      gap: 0.625rem;
      padding-right: 1.5625rem;
   }
   .touch & {
      background-color: $greenColor;
   }
   &::before {
      content: '';
      border-radius: 30px;
      transition: all 0.7s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      z-index: 1;
      width: 0;
      height: 100%;
      background-color: $greenColor;
   }

   // .exit-button__circle
   &__circle {
      display: inline-flex;
      text-align: center;
      align-items: center;
      border-radius: 50%;
      background-color: $greenColor;
      width: 3.125rem;
      height: 3.125rem;
      @media (max-width: 47.9988rem) {
         width: 2.8125rem;
         height: 2.8125rem;
      }
   }
   // .exit-button__icon
   &__icon {
      transition: all 0.5s cubic-bezier(0.65, 0, 0.076, 1);
      position: relative;
      z-index: 2;
      color: #000;
      transform: translate(20px, 0);

      &::before {
         content: '';
         transition: all 0.5s ease 0s;
         position: absolute;
         left: calc(-100% - 2px);
         right: 1px;
         top: calc(50% - 0.5px);
         transform: translate(0, -50%);
         opacity: 0;
         width: 20px;
         background-color: #000;
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
      color: $greenColor;
      position: relative;
      font-size: clamp(1.125rem, 0.964rem + 0.358vw, 1.25rem);
      z-index: 2;
      .touch & {
         color: #000;
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
            color: #000;
         }
      }
   }
}

@media (min-width: 62rem) {
   .python {
      left: 25%;
      top: 5%;
   }
   .vue {
      left: 40%;
      top: 40%;
   }
   .react {
      top: 40%;
      left: 5%;
   }
   .node {
      top: 70%;
      left: 20%;
   }
   .js {
      top: 71%;
      left: 50%;
   }
   .html-css {
      top: 70%;
      left: 75%;
   }
   .c-sharp {
      top: 2%;
      left: 65%;
   }

   .c-plus {
      left: 70%;
      top: 40%;
   }
}
</style>
