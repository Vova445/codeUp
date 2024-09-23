<template>
   <footer class="footer">
      <div class="footer__container">
         <div class="footer__header">
            <button class="footer__up" @click="goUp">
               {{ $t('footer.goUp') }} <span><font-awesome-icon :icon="['fas', 'arrow-up']" /></span>
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
                     <a href="tel:7777777777">+7777777777</a>
                  </li>
                  <li class="item-footer__item">
                     <a href="tel:666666666666">+666666666666</a>
                  </li>
                  <li class="item-footer__item item-footer__item--flex">
                     <span><font-awesome-icon :icon="['far', 'envelope']" /></span> <a href="mailto:mycodup@gmail.com">mycodup@gmail.com</a>
                  </li>
               </ul>
            </div>
         </div>
         <div class="footer__bottom bottom-footer">
            <div class="bottom-footer__image">
               <!--<img src="" alt="" />-->
               <font-awesome-icon :icon="['fab', 'cc-mastercard']" />
            </div>
            <button class="bottom-footer__button">
               {{ $t('header.educationalCourses') }} <span><font-awesome-icon :icon="['fas', 'arrow-right']" /></span>
            </button>
         </div>
         <div class="footer__action-block block-actions">
            <div class="block-actions__info">
               All rights reserved <br />
               CodeUp, {{ new Date().getFullYear() }}
            </div>
            <div class="block-actions__actions">
               <a href="#"><font-awesome-icon :icon="['fab', 'telegram']" /></a>
               <a href="#"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
               <a href="#"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
               <a href="#"></a>
            </div>
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
   background: linear-gradient(180deg, rgba(60, 119, 111, 1) 28%, rgba(45, 73, 69, 1) 100%);
   &__container {
   }
   &__header {
      text-align: right;
      &:not(:last-child) {
         margin-bottom: clamp(1.125rem, -0.001rem + 2.348vw, 1.875rem);
      }
   }
   &__up {
      transition: all 0.3s ease 0s;
      border: 1px solid #fff;
      padding: 7px;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      span {
         font-size: 12px;
      }
      @media (any-hover: hover) {
         &:hover {
            color: #3c776f;
            background-color: #fff;
         }
      }
   }
   &__content {
      display: grid;
      gap: 30px;
      justify-content: space-between;
      grid-template-columns: auto auto auto auto;
      border-bottom: 1px solid #fff;
      padding-bottom: 10px;
      margin-bottom: 10px;
      @media (max-width: 600px) {
         grid-template-columns: auto auto;
      }
   }
}
.item-footer {
   &__title {
      font-weight: 600;
      line-height: 1.25;
      &:not(:last-child) {
         margin-bottom: 7px;
      }
   }
   &__item {
      font-size: clamp(0.75rem, 0.562rem + 0.391vw, 0.875rem);
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
   gap: 10px;
   justify-content: space-between;
   &:not(:last-child) {
      margin-bottom: 20px;
   }
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
      gap: 15px;
      font-size: 25px;
      a {
         transition: all 0.3s ease 0s;
         @media (any-hover: hover) {
            &:hover {
               opacity: 0.8;
            }
         }
      }
   }
}
</style>
