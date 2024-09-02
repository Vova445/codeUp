<template>
   <main-master-page>
      <section class="user-page">
         <div class="user-page__container">
            <h1 class="user-page__title">{{ $t('titles.userProfile') }}</h1>
            <form enctype="multipart/form-data" class="user-page__form" @submit.prevent="updateProfile">
               <label class="user-page__label">
                  <span class="user-page__label-text">Change Name</span>
                  <input v-model="name" type="text" class="user-page__input" placeholder="Enter your name" />
               </label>

               <label class="user-page__label">
                  <span class="user-page__label-text">Change Email</span>
                  <input v-model="email" type="email" class="user-page__input" placeholder="Enter your email" />
               </label>

               <label class="user-page__label">
                  <span class="user-page__label-text">Phone Number</span>
                  <input
                     v-model="phoneNumber"
                     type="tel"
                     class="user-page__input"
                     :placeholder="phoneNumber ? '' : 'Enter your phone number'"
                     @focus="isEditingPhoneNumber = true"
                  />
               </label>
               <label class="user-page__label user-page__file-label">
                  <span class="user-page__label-text">{{ $t('buttons.changeAvatar') }}</span>
                  <input accept="image/*" class="user-page__file-input" type="file" @change="onFileSelected" />
                  <span class="user-page__file-label-text">{{ fileName || $t('buttons.chooseFile') }}</span>
               </label>

               <button type="submit" class="user-page__button">{{ $t('buttons.updateProfile') }}</button>
            </form>

            <button 
               :disabled="isTwoFAEnabled"
               class="user-page__button user-page__button--secondary" 
               @click="addTwoFactorAuth">
               {{ twoFactorAuthText }} 
            </button>
            <button class="user-page__button user-page__button--logout" @click="onLogout">
               {{ $t('buttons.logout') }}
            </button>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import { useRouter } from 'vue-router'
import { useLocales } from '../moduleHelpers/i18n.js';

const router = useRouter()
const { t } = useLocales();
const name = ref('')
const email = ref('')
const phoneNumber = ref('')
const avatar = ref('')
const selectedFile = ref(null)
const fileName = ref('')
const isTwoFAEnabled = ref(false);
const twoFactorAuthText = computed(() => {
   return isTwoFAEnabled.value ? t("buttons.alreadyAuth") : t("buttons.twoFactorAth");
})

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
         name.value = response.data.name || ''
         email.value = response.data.email || ''
         phoneNumber.value = response.data.phoneNumber || ''
         avatar.value = response.data.avatar || ''
         isTwoFAEnabled.value = response.data.isTwoFAEnabled;
      } catch (err) {
         if (err.response?.status === 401) {
            console.error('Session expired. Please log in again.')
            localStorage.removeItem('authToken')
            router.push({ name: 'home' })
         } else {
            console.error('Error fetching profile:', err)
         }
      }
   }
})

const onFileSelected = (event) => {
   selectedFile.value = event.target.files[0]
   fileName.value = event.target.files[0] ? event.target.files[0].name : ''
}
function addTwoFactorAuth() {
   router.push({ name: 'twoFactorAuth' })
}
const updateProfile = async () => {
   try {
      let token = localStorage.getItem('authToken');
      if (!token) return;

      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');

      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('email', email.value);
      
      formData.append('phoneNumber', phoneNumber.value || '');

      if (selectedFile.value) {
         formData.append('avatar', selectedFile.value);
      }

      await axios.post(`${apiUrl}/api/update-profile`, formData, {
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
         },
      });

      console.log('Profile updated successfully');
   } catch (err) {
      console.error('Error updating profile:', err);
   }
};


async function onLogout() {
   localStorage.removeItem('authToken')
   router.push({ name: 'home' })
}

async function refreshToken() {
   const refreshToken = localStorage.getItem('refreshToken')
   if (!refreshToken) return

   try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
      const response = await axios.post(`${apiUrl}/api/refresh-token`, { refreshToken })
      const { accessToken } = response.data
      localStorage.setItem('authToken', accessToken)
   } catch (err) {
      console.error('Error refreshing token:', err)
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
      router.push({ name: 'home' })
   }
}

axios.interceptors.response.use(
   (response) => response,
   async (error) => {
      const { config, response } = error
      if (response?.status === 401 && !config.__isRetryRequest) {
         config.__isRetryRequest = true
         await refreshToken()
         return axios(config)
      }
      return Promise.reject(error)
   },
)
</script>

<style lang="scss" scoped>
.user-page {
   position: relative;
   color: #f0f0f0;
   max-width: 600px;
   margin: 50px auto;
   padding: clamp(1.875rem, 1.473rem + 1.285vw, 2.5rem) clamp(0.938rem, 0.226rem + 2.847vw, 2.5rem);
   background-color: #2b2b2b;
   border-radius: 10px;
   box-shadow: 0px 0px 0px #999cb0;

   animation: formLogin 0.6s ease forwards;

   &__container {
      position: relative;

      &::before {
         content: '';
         position: absolute;
         top: -5px;
         left: -5px;
         right: -5px;
         bottom: -5px;
         background: linear-gradient(45deg, #161313, #ffffff, #ffffff, #000000);
         border-radius: 20px;
         filter: blur(15px);
         z-index: -1;
      }
   }

   &__title {
      font-size: clamp(1.25rem, 1.089rem + 0.514vw, 1.5rem);
      line-height: 1.3;
      margin-bottom: 20px;
      text-align: center;
   }

   &__form {
      display: flex;
      flex-direction: column;
      gap: clamp(1.3rem, 0.616rem + 1.028vw, 1.438rem);
   }

   &__label {
      display: flex;
      flex-direction: column;
      gap: 3px;
      color: #bbb;
      font-size: clamp(0.75rem, 0.67rem + 0.257vw, 0.875rem);
      position: relative;

      &-text {
         margin-bottom: 2px;
      }
   }

   &__input {
      width: 100%;
      padding: clamp(0.63rem, 0.339rem + 0.514vw, 0.75rem) clamp(0.625rem, 0.424rem + 0.643vw, 0.938rem);
      font-size: clamp(0.875rem, 0.687rem + 0.391vw, 1rem);
      border: 1px solid #444;
      border-radius: 8px;
      outline: none;
      background-color: #1e1e1e;
      color: #f0f0f0;
      transition:
         border-color 0.3s,
         box-shadow 0.3s,
         background-color 0.3s;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

      &:focus {
         box-shadow: 0 0 7px #234c5c;
      }

      &:invalid {
         animation: shake 0.3s ease-out;
      }
   }

   &__file-label {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: clamp(0.63rem, 0.339rem + 0.514vw, 0.75rem);
      border: 1px solid #444;
      border-radius: 8px;
      background-color: #1e1e1e;
      cursor: pointer;

      &-text {
         color: #f0f0f0;
      }
   }

   &__file-input {
      display: none;
   }

   &__button {
      transition:
         background-color 0.3s ease,
         transform 0.3s,
         box-shadow 0.3s;
      width: 100%;
      padding: clamp(0.625rem, 0.424rem + 0.643vw, 0.938rem) 15px;
      font-size: 16px;
      color: #fff;
      border-radius: 8px;
      border: none;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
      background-color: #234c5c;
      @media (any-hover: hover) {
         &:hover {
            background-color: #203d48;
            transform: translate(0px, 1px);
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
         }
      }

      &--secondary {
         margin-top: 20px;
         background-color: #5a5a5a;
         @media (any-hover: hover) {
            &:hover {
               background-color: #494949;
            }
         }
      }

      &--logout {
         margin-top: 20px;
         background-color: #d9534f;

         &:hover {
            background-color: #c9302c;
         }
      }
      &--confirmed {
         margin-top: 20px;
         background-color: #28a745; 
         cursor: not-allowed;
      }
   }
}
@keyframes formLogin {
   0% {
      box-shadow: 0px 0px 0px #999cb0;
   }

   100% {
      box-shadow: 3px 3px 20px #999cb0;
   }
}
</style>
