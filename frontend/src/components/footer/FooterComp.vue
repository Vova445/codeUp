<template>
   <footer class="footer">
      <div class="footer__container">
         <div class="footer__main-box">
            <div class="footer__header">
               <button class="footer__up button button--transparent" @click="goUp">
                  <span class="button__text">
                     {{ $t('footer.goUp') }} <span><font-awesome-icon :icon="['fas', 'arrow-up']" /></span
                  ></span>
               </button>
            </div>
            <div class="footer__content">
               <div class="footer__item item-footer">
                  <h6 class="item-footer__title">{{ $t('footer.courses') }}</h6>
                  <ul class="item-footer__list">
                     <li class="item-footer__item"><router-link to="/">course 1</router-link></li>
                     <li class="item-footer__item"><router-link to="/">course 2</router-link></li>
                     <li class="item-footer__item"><router-link to="/">course 3</router-link></li>
                     <li class="item-footer__item"><router-link to="/">course 4</router-link></li>
                     <li class="item-footer__item"><router-link to="/">course 5</router-link></li>
                  </ul>
               </div>
               <div class="footer__item item-footer">
                  <h6 class="item-footer__title">{{ $t('header.aboutUs') }}</h6>
                  <ul class="item-footer__list">
                     <li class="item-footer__item"><router-link :to="{ name: 'faq' }">FAQ</router-link></li>
                     <li class="item-footer__item">
                        <router-link to="/">{{ $t('header.aboutCodeUp') }}</router-link>
                     </li>
                  </ul>
               </div>
               <div class="footer__item item-footer">
                  <h6 class="item-footer__title">{{ $t('footer.usingConditions') }}</h6>
                  <ul class="item-footer__list">
                     <li class="item-footer__item">
                        <router-link to="/">{{ $t('footer.privacyPolicy') }}</router-link>
                     </li>
                  </ul>
               </div>
               <div class="footer__item item-footer">
                  <h6 class="item-footer__title">{{ $t('header.contacts') }}</h6>
                  <ul class="item-footer__list">
                     <li class="item-footer__item">
                        <a href="tel:7777777777">+1234567890</a>
                     </li>
                     <li class="item-footer__item">
                        <a href="tel:666666666666">+1234567890</a>
                     </li>
                     <li class="item-footer__item item-footer__item--flex">
                        <span><font-awesome-icon :icon="['far', 'envelope']" /></span> <a href="mailto:mycodup@gmail.com">mycodup@gmail.com</a>
                     </li>
                  </ul>

                  <div class="block-actions__actions">
                     <a href="#"><img src="@/assets/img/icons/socials/instagram.svg" alt="" /></a>
                     <a href="#"><img src="@/assets/img/icons/socials/telegram.svg" alt="" /></a>
                     <a href="#"><img src="@/assets/img/icons/socials/youTube.svg" alt="" /></a>
                  </div>
               </div>
            </div>
         </div>
         <div class="footer__bottom bottom-footer">
            <div class="footer__action-block block-actions">
               <div class="block-actions__info">
                  All rights reserved <br />
                  CodeUp, {{ new Date().getFullYear() }}
               </div>
            </div>
            <button class="bottom-footer__button">
               {{ $t('header.educationalCourses') }} <span><font-awesome-icon :icon="['fas', 'arrow-right']" /></span>
            </button>
         </div>
      </div>
   </footer>
</template>

<script setup>
function goUp() {
   window.scrollTo({
      top: 0,
      behavior: 'smooth',
   })
}
</script>

<style lang="scss" scoped>
.footer {
   font-size: clamp(0.875rem, 0.687rem + 0.391vw, 1rem);
   padding: 20px 0;
   background: transparent;

   &__header {
      text-align: right;
      &:not(:last-child) {
         margin-bottom: clamp(1.125rem, -0.001rem + 2.348vw, 1.875rem);
      }
   }

   &__content {
      display: grid;
      gap: clamp(0.938rem, -0.474rem + 2.941vw, 1.875rem);
      justify-content: space-between;
      grid-template-columns: auto auto auto auto;
      border-bottom: 1px solid $greenColor;
      padding-bottom: 30px;
      margin-bottom: 1.25rem;
      @media (max-width: 46.875rem) {
         grid-template-columns: auto auto;
      }
      @media (max-width: 23.75rem) {
         grid-template-columns: 1fr;
         gap: 20px;
      }
   }
}
.item-footer {
   &__title {
      font-weight: 600;
      color: $greenColor;
      font-size: 1rem;
      line-height: 1.21;

      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, -0.316rem + 1.961vw, 1.25rem);
      }
   }
   &__item {
      font-size: clamp(0.875rem, 0.687rem + 0.392vw, 1rem);
      line-height: 1.2;
      &:not(:last-child) {
         margin-bottom: 15px;
      }
      a {
         position: relative;
         &::before {
            content: '';
            transition: all 0.3s ease 0s;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
            background-color: #fff;
            height: 1px;
            width: 0;
         }
         @media (any-hover: hover) {
            &:hover {
               &::before {
                  width: 100%;
               }
            }
         }
      }
   }
}
.bottom-footer {
   display: flex;
   align-items: center;
   gap: 0.625rem;
   justify-content: space-between;
   &__image {
      font-size: 40px;
   }
   &__button {
      display: flex;
      font-size: 16px;
      align-items: center;
      gap: 5px;
      position: relative;
      span {
         transition: all 0.3s ease 0s;
         font-size: 12px;
      }
      @media (any-hover: hover) {
         &:hover {
            opacity: 0.8;
            span {
               transform: translate(5px, 0);
            }
         }
      }
   }
}
.block-actions {
   display: flex;
   align-items: center;
   justify-content: space-between;
   &__info {
      font-size: 10px;
   }
   &__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 30px;
      font-size: 25px;
      margin-top: 50px;
      a {
         transition: all 0.3s ease 0s;
         width: 1.125rem;
         height: 1.5625rem;
         flex: 0 0 18px;
         @media (any-hover: hover) {
            &:hover {
               opacity: 0.5;
            }
         }
      }
      img {
         width: 1.125rem;
         height: 1.5625rem;
      }
   }
}
</style>
