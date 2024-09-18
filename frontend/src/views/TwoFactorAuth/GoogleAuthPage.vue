<template>
   <main-master-page>
      <div class="google-auth">
         <div class="google-auth__container">
            <h4 class="google-auth__title title">{{ $t('twoFactorAuth.selectOneOfTwoAuth') }}</h4>
            <div class="google-auth__box">
               <div class="google-auth__sub-title subtitile">{{ $t('twoFactorAuth.byQRTitle') }}</div>
               <div class="google-auth__qr-code">
                  <img :src="qrCodeUrl" alt="QR Code" v-if="qrCodeUrl" />
               </div>
               <button class="google-auth__button button" @click="generateQRCode">Generate QR Code</button>
            </div>
            <div class="google-auth__box">
               <div class="google-auth__sub-title subtitile">{{ $t('twoFactorAuth.byGoogleCode') }}</div>
               <v-otp-input
                  ref="inputCode"
                  class="google-auth__input"
                  v-model="googleCode"
                  focus-all
                  :length="8"
                  placeholder="0"
                  variant="underlined"
               ></v-otp-input>
               <button class="google-auth__button button" @click="verifyGoogleCode">Verify Code</button>
            </div>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import Cookies from 'js-cookie';

const qrCodeUrl = ref('')
const googleCode = ref('')

const generateQRCode = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
    const token = Cookies.get('authToken');
    const response = await axios.post(`${apiUrl}/api/generate-qr-code-google`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    qrCodeUrl.value = response.data.qrCodeUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

const verifyGoogleCode = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
    const token = Cookies.get('authToken'); 
    const response = await axios.post(`${apiUrl}/api/verify-google-code`, { code: googleCode.value }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (response.data.success) {
      alert('Code verified successfully!');
    } else {
      alert('Invalid code');
    }
  } catch (error) {
    console.error('Error verifying Google code:', error);
  }
}

</script>

<style lang="scss" scoped>
.google-auth {
   &:not(:last-child) {
      margin-bottom: 50px;
   }
   // .google-auth__container
   &__container {
      max-width: 900px;
      text-align: center;
   }
   // .google-auth__title
   &__title {
      &:not(:last-child) {
         margin-bottom: 40px;
      }
   }
   // .google-auth__box
   &__box {
      border-radius: 10px;
      padding: clamp(1.875rem, 1.473rem + 1.285vw, 2.5rem) clamp(0.938rem, 0.226rem + 2.847vw, 2.5rem);
      background-color: #222222;
      box-shadow: 0.5px 1px 10px #545454;
      &:not(:last-child) {
         margin-bottom: 30px;
      }
   }
   // .google-auth__sub-title
   &__sub-title {
      &:not(:last-child) {
         margin-bottom: 10px;
      }
   }
   // .google-auth__qr-code
   &__qr-code {
      width: 150px;
      height: 150px;
      img {
         width: 100px;
         height: 100px;
      }
   }
   &__input {
      &:not(:last-child) {
         margin-bottom: 10px;
      }
   }
   &__button {
      width: 100%;
      &:not(:last-child) {
         margin-bottom: 10px;
      }
   }
}
</style>
