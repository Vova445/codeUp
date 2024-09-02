<template>
   <main-master-page>
      <div class="two-factor-auth__qr-section section-qr">
         <button @click="generateQRCode" class="section-qr__btn">Generate QR Code</button>
         <div class="section-qr__qr-code">
            <img id="qrCode" :src="qrCodeUrl" alt="QR Code" />
         </div>
         <input class="section-qr__input" v-model="qrCode" placeholder="Enter code from app" />
         <button class="section-qr__btn" @click="verifyQRCode">Verify QR Code</button>
      </div>
   </main-master-page>
</template>
 
<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const qrCode = ref('');
const qrCodeUrl = ref('');

async function generateQRCode() {
   const token = localStorage.getItem('authToken');
   try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
      const response = await axios.post(
         `${apiUrl}/api/generate-qr`,
         {},
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      qrCodeUrl.value = response.data.qrCodeUrl;
   } catch (err) {
      console.error('Error generating QR code:', err);
   }
}

onMounted(() => {
   generateQRCode();
});

async function verifyQRCode() {
   const token = localStorage.getItem('authToken');
   try {
      const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
      await axios.post(
         `${apiUrl}/api/verify-qr`,
         {
            code: qrCode.value,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      alert('QR Code verified successfully!');
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
   padding: 20px;
   border-radius: 10px;
   width: 100%;

   &__qr-code {
      width: 100px;
      height: 100px;
      border: 1px solid #fff;
      img {
         width: 100px;
         height: 100px;
         padding: 5px;
      }
   }

   &__input {
      color: #000;
      padding: 10px;
   }

   &__btn {
      background-color: #28a745;
      padding: 5px;
   }
}
</style>
