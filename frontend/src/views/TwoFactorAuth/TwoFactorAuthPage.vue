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
            <router-link :to="{ name: 'qrCode' }" class="two-factor-auth__button two-factor-auth__button--number">
               <span class="two-factor-auth__icon">
                  <font-awesome-icon :icon="['fas', 'qrcode']" />
               </span>
               <span class="two-factor-auth__text">{{ $t('twoFactorAuth.byQRTitle') }}</span>
            </router-link>
            <router-link v-if="phoneNumber" class="two-factor-auth__button two-factor-auth__button--phone" :to="{ name: 'phoneAuth' }">
               <span class="two-factor-auth__icon">
                  <font-awesome-icon :icon="['fas', 'phone']" />
               </span>
               <span class="two-factor-auth__text">{{ $t('twoFactorAuth.byPhoneTitle') }}</span>
            </router-link>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import { useAlertStore } from '../../stores/alert.js'
const { runAlert } = useAlertStore()
const phoneNumber = ref('')

onMounted(async () => {
   const token = localStorage.getItem('authToken')
   if (token) {
      try {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
         const response = await axios.get(`${apiUrl}/api/user-profile`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         phoneNumber.value = response.data.phoneNumber || ''
      } catch (err) {
         console.error('Error fetching profile:', err)
      }
   }
})

async function confirmByEmail() {
   const token = localStorage.getItem('authToken')
   if (token) {
      try {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
         const response = await axios.post(
            `${apiUrl}/api/send-2fa-email`,
            {},
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            },
         )
         if (response.data.token) {
            window.location.href = `${apiUrl}/api/verify-2fa/${response.data.token}`
         } else {
            runAlert('twoFactorAuth.codeSentOnEmail', 'success')
         }
      } catch (err) {
         console.error('Error sending 2FA email:', err)
         runAlert('twoFactorAuth.codeSentOnEmailProblem', 'problem')
      }
   }
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
   display: flex;
   flex-direction: column;
   align-items: center;
   //padding: clamp(0.625rem, -1.251rem + 3.914vw, 1.875rem);
   padding: 70px 0;
   margin-bottom: 200px;
   background-color: #2b2b2b;

   &__container {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      border-radius: 10px;
      @media (max-width: 700px) {
         flex-direction: column;
      }
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
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
      transition: all 0.3s ease 0s;

      &:hover {
         transform: translateY(-5px);
         box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
         opacity: 0.9;
      }

      &--email {
         background-color: #cc4400;
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
         background-color: #1f7a1f;
         .two-factor-auth__icon {
            color: #ffffff;
         }
      }
   }

   &__icon {
      font-size: clamp(1.875rem, -0.939rem + 5.871vw, 3.75rem);
   }

   &__text {
      font-size: clamp(0.75rem, 0.839rem + 0.514vw, 1.25rem);
      position: absolute;
      bottom: 10px;
      text-align: center;
      width: 100%;
   }
}
</style>
