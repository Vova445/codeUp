<template>
   <main-master-page>
      <div class="two-factor-auth__qr-section section-qr">
         <button @click="generateQRCode" class="section-qr__btn button">Generate QR Code</button>
         <div class="section-qr__qr-code">
            <img v-if="qrCodeUrl" id="qrCode" :src="qrCodeUrl" alt="QR Code" />
            <font-awesome-icon v-else :icon="['fas', 'image']" />
         </div>

         <button class="section-qr__btn-verify button" @click="verifyQRCode">Verify QR Code</button>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const qrCode = ref('')
const qrCodeUrl = ref('')

async function generateQRCode() {
   const token = localStorage.getItem('authToken')
   try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
      const response = await axios.post(
         `${apiUrl}/api/generate-qr`,
         {},
         {
            headers: {
               Authorization: `Bearer ${token}`,
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
})

async function verifyQRCode() {
   const token = localStorage.getItem('authToken')
   try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
      await axios.post(
         `${apiUrl}/api/verify-qr`,
         {
            code: qrCode.value,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         },
      )
      alert('QR Code verified successfully!')
   } catch (err) {
      console.error('Error verifying QR code:', err)
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
   &__qr-code {
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
         width: 150px;
         height: 150px;
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
