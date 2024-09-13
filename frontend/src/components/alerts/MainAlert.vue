<template>
   <div class="alert-box" :class="[alertType, { active: isAlertActive }]">
      <span class="alert-box__icon">
         <font-awesome-icon v-if="alertType === 'success'" :icon="['fas', 'check']" />
         <font-awesome-icon v-else :icon="['fas', 'xmark']" />
      </span>
      <span v-if="alertText"> {{ $t(alertText) }} </span>
   </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAlertStore } from '../../stores/alert.js'
const { isAlertActive, alertText, alertType } = storeToRefs(useAlertStore())
import { useLocales } from '../../moduleHelpers/i18n.js'
const { t } = useLocales()
function getText(text) {
   console.log(text)
   return t(text)
}
</script>

<style lang="scss" scoped>
.alert-box {
   position: fixed;
   top: 0;
   left: 0;
   opacity: 0;
   visibility: hidden;
   z-index: 99;
   background-color: #139013;
   color: #fff;
   font-size: 12px;
   text-align: center;
   width: 100%;
   transition: all 1s ease 0s;
   padding: 10px 10px;
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 10px;
   &.active {
      opacity: 0.93;
      visibility: visible;
      top: 0;
   }
   &__icon {
      font-size: 11px;
      width: 20px;
      height: 20px;
      border: 1px solid #fff;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
   }
   &.success {
      background-color: #32c682;
   }
   &.problem {
      background-color: #ff5549;
   }
}
</style>
