<template>
   <main-master-page>
      <div class="email-auth">
         <div class="email-auth__container email-auth__container--small">
            <div class="email-auth__title title">
               {{ $t('twoFactorAuth.sendEmailLetterTitle') }} <span><font-awesome-icon :icon="['fas', 'envelope']" /></span>
            </div>
            <button class="email-auth__button button button--big" @click="sendEmailLetter">
          {{ $t('twoFactorAuth.sendEmailLetterButton') }}
        </button>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../../masterPages/MainMasterPage.vue'
import axios from 'axios';
import { useAlertStore } from '../../stores/alert.js'

// const { runAlert } = useAlertStore()

async function sendEmailLetter() {
  console.log('Button clicked');
  let token = localStorage.getItem('authToken') || localStorage.getItem('tempAuthToken');
  
  if (token) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
      const response = await axios.post(
        `${apiUrl}/api/send-2fa-email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!localStorage.getItem('authToken') && localStorage.getItem('tempAuthToken')) {
        localStorage.setItem('authToken', localStorage.getItem('tempAuthToken'));
        localStorage.removeItem('tempAuthToken');
      }

      // runAlert('twoFactorAuth.emailSentSuccessfully', 'success');
    } catch (err) {
      console.error('Error sending email:', err);
      // runAlert('twoFactorAuth.emailSentFailed', 'problem');
    }
  } else {
   //  runAlert('twoFactorAuth.noAuthToken', 'problem');
  }
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
         font-size: 40px;
      }
   }
   &__button {
   }
}
</style>
