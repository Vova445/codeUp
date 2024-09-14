import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useAlertStore } from './alert.js'

export const useTwoFactorAuthStore = defineStore('twoFactorAuth', () => {
   const router = useRoute()
   const { runAlert } = useAlertStore()
   const token = localStorage.getItem('tempAuthToken') || localStorage.getItem('authToken')
   //const apiUrl = meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
   const qrCodeUrl = ref('')
   async function sendEmailLetter() {
      console.log('Button clicked')
      let token = localStorage.getItem('authToken') || localStorage.getItem('tempAuthToken')

      if (token) {
         try {
            const apiUrl = meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
            const response = await axios.post(
               `${apiUrl}/api/send-2fa-email`,
               {},
               {
                  headers: {
                     Authorization: token ? `Bearer ${token}` : '',
                  },
               },
            )

            if (!localStorage.getItem('authToken') && localStorage.getItem('tempAuthToken')) {
               localStorage.setItem('authToken', localStorage.getItem('tempAuthToken'))
               localStorage.removeItem('tempAuthToken')
            }

            // runAlert('twoFactorAuth.emailSentSuccessfully', 'success');
         } catch (err) {
            console.error('Error sending email:', err)
            // runAlert('twoFactorAuth.emailSentFailed', 'problem');
         }
      } else {
         //  runAlert('twoFactorAuth.noAuthToken', 'problem');
      }
   }

   async function generateQRCode() {
      const token = localStorage.getItem('tempAuthToken') || localStorage.getItem('authToken')
      try {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
         const response = await axios.post(
            `${apiUrl}/api/generate-qr`,
            {},
            {
               headers: {
                  Authorization: token ? `Bearer ${token}` : '',
               },
            },
         )
         qrCodeUrl.value = response.data.qrCodeUrl
      } catch (err) {
         console.error('Error generating QR code:', err)
      }
   }

   async function verifyQRCode(qrCode) {
      const token = localStorage.getItem('tempAuthToken') || localStorage.getItem('authToken')
      try {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
         console.log('apiUrl')
         console.log(apiUrl)
         const response = await axios.post(
            `${apiUrl}/api/verify-qr`,
            { code: qrCode },
            {
               headers: {
                  Authorization: token ? `Bearer ${token}` : '',
               },
            },
         )
         const tempAuthToken = localStorage.getItem('tempAuthToken')
         if (tempAuthToken) {
            localStorage.setItem('authToken', tempAuthToken)
            localStorage.removeItem('tempAuthToken')
         }

         runAlert('twoFactorAuth.qrcodeСonfirmationSuccess', 'success')
         router.push({ name: 'user' })
      } catch (err) {
         runAlert('twoFactorAuth.qrcodeСonfirmationProblem', 'problem')
      }
   }

   return { sendEmailLetter, verifyQRCode, generateQRCode, qrCodeUrl, qrCode }
})
