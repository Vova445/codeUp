import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', () => {
   const alertText = ref('')
   const isAlertActive = ref(false)
   const alertType = ref('success')
   function runAlert(message, type) {
      alertType.value = type
      alertText.value = message
      isAlertActive.value = true
      setTimeout(() => {
         isAlertActive.value = false
         //alertText.value = ''
      }, 2000)
   }

   return { alertText, isAlertActive, runAlert, alertType }
})
