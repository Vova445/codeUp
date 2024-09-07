import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', () => {
   const alertText = ref('')
   const isAlertActive = ref(false)
   function runAlert(message) {
      alertText.value = message
      isAlertActive.value = true
      setTimeout(() => {
         isAlertActive.value = false
      }, 3000)
   }

   return { alertText, isAlertActive, runAlert }
})
