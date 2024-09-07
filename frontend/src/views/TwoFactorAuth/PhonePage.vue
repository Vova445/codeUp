<template>
   <main-master-page>
      <div class="phone-auth">
         <div class="phone-auth__container">
            <div class="phone-auth__header">
               <h4 class="phone-auth__title">Enter the code you have just got from phone</h4>
               <div class="phone-auth__image">
                  <font-awesome-icon :icon="['fas', 'mobile-screen']" />
               </div>
            </div>
            <div class="phone-auth__input-box">
               <v-otp-input variant="solo-filled"></v-otp-input>
            </div>
            <button class="phone-auth__button button">Confirm</button>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import { onMounted } from 'vue';
import MainMasterPage from '@/masterPages/MainMasterPage.vue';

onMounted(async () => {
  const phoneNumber = '1234567890'; 

  try {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
    const response = await fetch(`${apiUrl}/api/send-2fa-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    if (response.ok) {
      console.log('SMS sent successfully');
    } else {
      console.error('Failed to send SMS');
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
});
</script>

<style lang="scss" scoped>
.phone-auth {
   &__container {
      text-align: center;
   }
   &__header {
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: center;
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, -0.626rem + 3.914vw, 2rem);
      }
   }
   &__title {
      font-weight: 500;
      letter-spacing: 1.5px;
      font-size: clamp(1rem, 0.625rem + 0.783vw, 1.25rem);
   }
   &__image {
      color: #c2c2c2;
      font-size: clamp(1.875rem, 0.937rem + 1.957vw, 2.5rem);
      animation: phone-animation 1s infinite linear;
   }
   &__input-box {
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, -0.47rem + 2.935vw, 1.875rem);
      }
   }
   &__button {
      padding-left: 40px;
      padding-right: 40px;
      font-size: clamp(1rem, 0.812rem + 0.391vw, 1.125rem);
   }
}
.button {
}
</style>
