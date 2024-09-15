<template>
   <main-master-page>
      <div class="two-factor-auth__qr-section section-qr">
         <button class="section-qr__btn button" @click="generateQRCode">{{ $t('twoFactorAuth.generateGrCode') }}</button>
         <div class="section-qr__qr-code">
            <img v-if="qrCodeUrl" id="qrCode" :src="qrCodeUrl" alt="QR Code" />
            <font-awesome-icon v-else :icon="['fas', 'image']" />
         </div>
         <v-otp-input ref="inputCode" v-model="qrCode" focus-all :length="8" placeholder="0" variant="underlined"></v-otp-input>
         <button :disabled="qrCode.length < 8" class="section-qr__btn-verify button" @click="verifyQRCode(qrCode, router)">Verify QR Code</button>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const inputCode = ref()
const router = useRouter()
import { useTwoFactorAuthStore } from '../../stores/twoFactorAuth.js'
const { qrCodeUrl, qrCode } = storeToRefs(useTwoFactorAuthStore())
const { generateQRCode, verifyQRCode } = useTwoFactorAuthStore()
onMounted(() => {
   generateQRCode()
   inputCode.value.focus()
})
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
