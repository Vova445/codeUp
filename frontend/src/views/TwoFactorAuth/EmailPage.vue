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
// const { runAlert } = useAlertStore();

async function sendEmailLetter() {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
      await axios.post(
        `${apiUrl}/api/send-2fa-email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
