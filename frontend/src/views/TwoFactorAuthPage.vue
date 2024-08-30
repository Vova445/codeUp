<template>
   <main-master-page>
      <div class="two-factor-auth">
         <div class="two-factor-auth__container">
            <button class="two-factor-auth__button two-factor-auth__button--email" @click="confirmByEmail">
               <span class="two-factor-auth__icon">
                  <font-awesome-icon :icon="['fas', 'envelope']" />
               </span>
               <span class="two-factor-auth__text">{{ $t('twoFactorAuth.byEmailTitle') }}</span>
            </button>
            <button class="two-factor-auth__button two-factor-auth__button--number" @click="confirmByQR">
               <span class="two-factor-auth__icon">
                  <font-awesome-icon :icon="['fas', 'qrcode']" />
               </span>
               <span class="two-factor-auth__text">{{ $t('twoFactorAuth.byQRTitle') }}</span>
            </button>
            <button
               v-if="phoneNumber"
               class="two-factor-auth__button two-factor-auth__button--phone"
               @click="confirmByPhone"
            >
               <span class="two-factor-auth__icon">
                  <font-awesome-icon :icon="['fas', 'phone']" />
               </span>
               <span class="two-factor-auth__text">{{ $t('twoFactorAuth.byPhoneTitle') }}</span>
            </button>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MainMasterPage from '@/masterPages/MainMasterPage.vue';

const phoneNumber = ref('');

onMounted(async () => {
   const token = localStorage.getItem('authToken');
   if (token) {
      try {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
         const response = await axios.get(`${apiUrl}/api/user-profile`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         phoneNumber.value = response.data.phoneNumber || '';
      } catch (err) {
         console.error('Error fetching profile:', err);
      }
   }
});

async function confirmByEmail() {
   const token = localStorage.getItem('authToken');
   if (token) {
      try {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
         const response = await axios.post(`${apiUrl}/api/send-2fa-email`, {}, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         if (response.data.token) {
            window.location.href = `${apiUrl}/api/verify-2fa/${response.data.token}`;
         } else {
            alert('Код підтвердження було надіслано на вашу електронну пошту.');
         }
      } catch (err) {
         console.error('Error sending 2FA email:', err);
         alert('Помилка при відправленні коду підтвердження на електронну пошту.');
      }
   }
}

function confirmByQR() {
}

function confirmByPhone() {
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;

   &__container {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      max-width: 1100px;
      width: 100%;
      background-color: #f0f0f0; 
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      @media (max-width: 700px) {
         flex-direction: column;
      }
   }

   &__button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: clamp(8.125rem, 4.332rem + 18.966vw, 15rem);
      padding: 10px;
      border-radius: 12px;
      position: relative;
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
         transform: translateY(-5px);
         box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
      }

      &--email {
         background-color: #6c757d;
         .two-factor-auth__icon {
            color: #ffffff;
         }
      }

      &--number {
         background-color: #17a2b8;
         .two-factor-auth__icon {
            color: #ffffff;
         }
      }

      &--phone {
         background-color: #28a745;
         .two-factor-auth__icon {
            color: #ffffff;
         }
      }
   }

   &__icon {
      font-size: clamp(1.563rem, 0.96rem + 1.928vw, 2.5rem);
   }

   &__text {
      font-size: clamp(1rem, 0.839rem + 0.514vw, 1.25rem);
      position: absolute;
      bottom: 10px;
      text-align: center;
      width: 100%;
   }
}
</style>
