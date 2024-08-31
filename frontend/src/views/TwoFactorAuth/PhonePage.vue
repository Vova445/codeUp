<template>
   <main-master-page>
      <div class="phone-auth">
         <div class="phone-auth__container">
            <div class="phone-auth__header">
               <h4 class="phone-auth__title">enter code you have just got from phone</h4>
               <div class="phone-auth__image">
                  <font-awesome-icon :icon="['fas', 'mobile-screen']" />
               </div>
            </div>
            <div class="phone-auth__input-box">
               <v-otp-input variant="solo-filled"></v-otp-input>
            </div>
            <button class="phone-auth__button button">confirm</button>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
</script>

<style lang="scss" scoped>
.phone-auth {
   // .phone-auth__container
   &__container {
      text-align: center;
   }
   // .phone-auth__header
   &__header {
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: center;
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, -0.626rem + 3.914vw, 2rem);
      }
   }
   // .phone-auth__title
   &__title {
      font-weight: 500;
      letter-spacing: 1.5px;
      font-size: clamp(1rem, 0.625rem + 0.783vw, 1.25rem);
   }
   // .phone-auth__image
   &__image {
      color: #c2c2c2;
      font-size: clamp(1.875rem, 0.937rem + 1.957vw, 2.5rem);
      animation: phone-animation 1s infinite linear;
   }
   // .phone-auth__input-box
   &__input-box {
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, -0.47rem + 2.935vw, 1.875rem);
      }
   }
   // .phone-auth__button
   &__button {
      padding-left: 40px;
      padding-right: 40px;
      font-size: clamp(1rem, 0.812rem + 0.391vw, 1.125rem);
   }
}
.button {
}
</style>
