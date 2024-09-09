<template>
   <main-master-page>
      <div class="two-factor-auth__qr-section section-qr">
         <button @click="generateQRCode" class="section-qr__btn button">{{ $t('twoFactorAuth.generateQrCode') }}</button>
         <div class="section-qr__qr-code">
            <img v-if="qrCodeUrl" id="qrCode" :src="qrCodeUrl" alt="QR Code" />
            <font-awesome-icon v-else :icon="['fas', 'image']" />
         </div>
         <v-otp-input focus-all ref="inputCode" :length="8" v-model="qrCode" placeholder="0" variant="underlined"></v-otp-input>
         <button :disabled="qrCode.length < 8" class="section-qr__btn-verify button" @click="verifyQRCode">{{ $t('twoFactorAuth.verifyCode') }}</button>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const qrCode = ref('')
const qrCodeUrl = ref('')
const inputCode = ref()
const router = useRouter()

async function checkTwoFAStatus() {
   const token = localStorage.getItem('authToken')
   try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
      const response = await axios.get(`${apiUrl}/api/check-qr-verification`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      return response.data.isVerified
   } catch (err) {
      console.error('Error checking 2FA status:', err)
      return false
   }
}

async function generateQRCode() {
   const isTwoFAEnabled = await checkTwoFAStatus()
   const token = isTwoFAEnabled ? null : localStorage.getItem('authToken')
   
   try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
      const response = await axios.post(
         `${apiUrl}/api/generate-qr`,
         {},
         {
            headers: {
               Authorization: token ? `Bearer ${token}` : undefined,
            },
         },
      )
      qrCodeUrl.value = response.data.qrCodeUrl
   } catch (err) {
      console.error('Error generating QR code:', err)
   }
}

onMounted(() => {
   generateQRCode()
   if (inputCode.value) {
      inputCode.value.focus()
   }
})

async function verifyQRCode() {
  const token = localStorage.getItem('authToken');
  try {
    const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
    const response = await axios.post(
      `${apiUrl}/api/verify-qr`,
      {
        code: qrCode.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    alert('QR Code verified successfully!');
    router.push({ name: 'user' });
  } catch (err) {
    console.error('Error verifying QR code:', err);
  }
}

</script>

<style lang="scss" scoped>
.section-qr {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 20px;
   background-color: #1d1c1c;
   padding: 100px 0;
   border-radius: 10px;
   width: 100%;
   margin-bottom: 50px;
   &__btn {
      padding-left: 50px;
      padding-right: 50px;
   }
   &__qr-code {
      width: 200px;
      height: 200px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
         width: 200px;
         height: 200px;
      }
      .svg-inline--fa {
         font-size: 50px;
      }
   }

   &__input {
      color: #000;
      padding: 10px;
   }

   &__btn-verify {
      padding-left: 50px;
      padding-right: 50px;
      background-color: #d9534f;
      @media (any-hover: hover) {
         &:hover {
            background-color: #c9302c;
         }
      }
   }
}
</style>
