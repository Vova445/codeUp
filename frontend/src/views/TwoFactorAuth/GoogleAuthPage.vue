<template>
   <main-master-page>
     <div class="google-auth">
       <div class="google-auth__container">
         <h4 class="google-auth__title">{{ $t('twoFactorAuth.selectOneOfTwoAuth') }}</h4>
         <div class="google-auth__box">
           <div class="google-auth__sub-title">{{ $t('twoFactorAuth.byQRTitle') }}</div>
           <div class="google-auth__qr-code">
             <img :src="qrCodeUrl" alt="QR Code" v-if="qrCodeUrl" />
           </div>
           <button @click="generateQRCode">Generate QR Code</button>
         </div>
         <div class="google-auth__box">
           <div class="google-auth__sub-title">{{ $t('twoFactorAuth.byGoogleCode') }}</div>
           <input v-model="googleCode" placeholder="Enter Google Authenticator Code" />
           <button @click="verifyGoogleCode">Verify Code</button>
         </div>
       </div>
     </div>
   </main-master-page>
 </template>
 
 <script setup>
 import { ref } from 'vue';
 import axios from 'axios';
 import MainMasterPage from '@/masterPages/MainMasterPage.vue';
 
 const qrCodeUrl = ref('');
 const googleCode = ref('');
 const userId = ref('');
 
 const generateQRCode = async () => {
   try {
     const response = await axios.post('/api/generate-qr-code', { userId: userId.value });
     qrCodeUrl.value = response.data.qrCodeUrl;
   } catch (error) {
     console.error('Error generating QR code:', error);
   }
 };
 
 const verifyGoogleCode = async () => {
   try {
     const response = await axios.post('/api/verify-google-code', {
       userId: userId.value,
       token: googleCode.value,
     });
     if (response.data.message === 'Code is valid') {
       alert('Code verified successfully!');
     } else {
       alert('Invalid code!');
     }
   } catch (error) {
     console.error('Error verifying code:', error);
   }
 };
 </script>
 
 <style lang="scss" scoped>
 .google-auth {
   &__container {
     max-width: 400px;
     margin: 0 auto;
     padding: 2rem;
     border: 1px solid #ccc;
     border-radius: 8px;
   }
   &__title, &__sub-title {
     text-align: center;
     margin-bottom: 1rem;
   }
   &__qr-code {
     text-align: center;
     margin-bottom: 1rem;
   }
 }
 </style>
 