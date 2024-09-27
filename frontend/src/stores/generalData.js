import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralDataStore = defineStore('generalData', () => {
   const dollarRate = ref(41.1)
   function convertUSDtoUAH(dollarCount) {
      return Math.round(dollarCount * dollarRate.value)
   }
   return { convertUSDtoUAH }
})
