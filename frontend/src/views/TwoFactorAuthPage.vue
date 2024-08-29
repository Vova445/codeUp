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
            <button class="two-factor-auth__button two-factor-auth__button--number" @click="confirmByPhone">
               <span class="two-factor-auth__icon">
                  <font-awesome-icon :icon="['fas', 'phone-flip']" />
               </span>
               <span class="two-factor-auth__text">{{ $t('twoFactorAuth.byPhoneTitle') }}</span>
            </button>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'

function confirmByEmail(params) {}
function confirmByPhone(params) {}
</script>

<style lang="scss" scoped>
.two-factor-auth {
   &__container {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      max-width: 900px;
      @media (max-width: 700px) {
         flex-direction: column;
      }
   }

   &__button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: clamp(8.125rem, 4.332rem + 18.966vw, 15rem);
      padding: 10px;
      border-radius: 8px;
      position: relative;
      &--email {
         background-color: #e3974f;
         .two-factor-auth__icon {
            color: #b30000;
         }
      }

      &--number {
         background-color: #0066ff;
      }
   }

   &__icon {
      font-size: clamp(1.563rem, 0.96rem + 1.928vw, 2.5rem);
   }

   &__text {
      font-size: clamp(1rem, 0.839rem + 0.514vw, 1.25rem);
      position: absolute;
      bottom: 10px;
      text-align: center;
      width: 100%;
   }
}
</style>
