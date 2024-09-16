<template>
   <main-master-page>
      <div class="email-auth">
         <div class="email-auth__container email-auth__container--small">
            <div class="email-auth__title title">
               {{ $t('twoFactorAuth.sendEmailLetterTitle') }} <span><font-awesome-icon :icon="['fas', 'envelope']" /></span>
            </div>
            <button class="email-auth__button button button--big" :disabled="countToSentAgain < 10" @click="sendEmail">
               {{ $t('twoFactorAuth.sendEmailLetterButton') }}
            </button>
            <div class="email-auth__info-in" v-if="countToSentAgain < 10">
               {{ $t('twoFactorAuth.sentLetterAgain') }} <span> {{ countToSentAgain }} </span>
            </div>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import { ref } from 'vue'
import MainMasterPage from '../../masterPages/MainMasterPage.vue'
import { useTwoFactorAuthStore } from '../../stores/twoFactorAuth.js'
const { sendEmailLetter } = useTwoFactorAuthStore()
const countToSentAgain = ref(10)
function sendEmail() {
   sendEmailLetter()
   const intervalToSent = setInterval(() => {
      if (countToSentAgain.value === 0) {
         countToSentAgain.value = 10
         clearInterval(intervalToSent)
         return 
      }
         countToSentAgain.value -= 1
   }, 1000)
}
</script>
<style lang="scss" scoped>
.email-auth {
   background-color: #1d1c1c;
   &__container {
      padding: 100px 15px 200px 15px;
      text-align: center;
   }
   &__title {
      display: flex;
      flex-direction: column;
      gap: 10px;
      &:not(:last-child) {
         margin-bottom: 30px;
      }
      span {
         color: #b8b8b8;
         font-size: 40px;
      }
   }
   &__button {
      &:not(:last-child) {
         margin-bottom: 15px;
      }
   }
   &__info-in {
      line-height: 1.2;
      color: #909090;
      font-size: 12px;
      span {
         color: #3c776f;
         font-weight: 600;
      }
   }
}
</style>
