<template>
   <main-master-page>
      <div class="google-auth">
         <div class="google-auth__container">
            <h4 class="google-auth__title">{{ $t('twoFactorAuth.selectOneOfTwoAuth') }}</h4>
            <div class="google-auth__box">
               <div class="google-auth__sub-title">{{ $t('twoFactorAuth.byQRTitle') }}</div>
               <div class="google-auth__qr-code">
                  <img src="" alt="" />
               </div>
            </div>
            <div class="google-auth__box">
               <div class="google-auth__sub-title">{{ $t('twoFactorAuth.byGoogleCode') }}</div>
               <div class="google-auth__code"></div>
            </div>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue'
</script>

<style lang="scss" scoped></style>
