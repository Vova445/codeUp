<template>
   <main-master-page>
      <div class="google-auth">
         <div class="google-auth__container">
            <h4 class="google-auth__title">{{ $t('twoFactorAuth.selectOneOfTwoAuth') }}</h4>
            <div class="google-auth__box">
               <div class="google-auth__sub-title">{{ $t('twoFactorAuth.byQRTitle') }}</div>
               <div class="google-auth__qr-code" v-if="qrCodeUrl">
                  <img :src="qrCodeUrl" alt="QR Code" />
               </div>
            </div>
            <div class="google-auth__box">
               <div class="google-auth__sub-title">{{ $t('twoFactorAuth.byGoogleCode') }}</div>
               <div class="google-auth__code">
                  <input v-model="code" placeholder="Enter code" />
                  <button @click="verifyCode">Verify</button>
               </div>
            </div>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import { ref } from 'vue';
import axios from 'axios';

const qrCodeUrl = ref('');
const code = ref('');
const secret = ref('');
const fetchQRCode = async () => {
   try {
      const response = await axios.post('/auth/generate-secret');
      qrCodeUrl.value = response.data.qrCodeUrl;
      secret.value = response.data.secret; 
   } catch (error) {
      console.error('Error fetching QR code:', error);
   }
};
const verifyCode = async () => {
   try {
      const response = await axios.post('/auth/verify-code', {
         secret: secret.value, 
         token: code.value
      });
      if (response.data.verified) {
         alert('Code verified successfully!');
      } else {
         alert('Invalid code.');
      }
   } catch (error) {
      console.error('Error verifying code:', error);
   }
};

fetchQRCode();
</script>

<style lang="scss" scoped></style>
