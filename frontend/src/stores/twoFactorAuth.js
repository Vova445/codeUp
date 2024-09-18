import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAlertStore } from './alert.js'
import Cookies from 'js-cookie'

export const useTwoFactorAuthStore = defineStore('twoFactorAuth', () => {
   const qrCodeUrl = ref('')
   const qrCode = ref('')
   const { runAlert } = useAlertStore()

   const generateQRCode = async () => {
      const token = Cookies.get('tempAuthToken') || Cookies.get('authToken')
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

   const verifyQRCode = async (inputCode, router) => {
      const token = Cookies.get('tempAuthToken') || Cookies.get('authToken')
      try {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
         const response = await axios.post(
            `${apiUrl}/api/verify-qr`,
            { code: inputCode },
            {
               headers: {
                  Authorization: token ? `Bearer ${token}` : '',
               },
            },
         )

         const tempAuthToken = Cookies.get('tempAuthToken')
         if (tempAuthToken) {
            Cookies.set('authToken', tempAuthToken)
            Cookies.remove('tempAuthToken')
         }

         runAlert('twoFactorAuth.qrcodeСonfirmationSuccess', 'success')
         router.push({ name: 'user' })
      } catch (err) {
         runAlert('twoFactorAuth.qrcodeСonfirmationProblem', 'problem')
      }
   }
   const sendEmailLetter = async () => {
      let token = Cookies.get('authToken') || Cookies.get('tempAuthToken');
      console.log('Current token:', token);

      if (token) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
          const response = await axios.post(
            `${apiUrl}/api/send-2fa-email`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log('Send email response:', response.data);
    
          runAlert('twoFactorAuth.emailSentSuccessfully', 'success');
          checkTokenEmail(token);
        } catch (err) {
          console.error('Error sending email:', err);
          runAlert('twoFactorAuth.emailSentFailed', 'problem');
        }
      } else {
        runAlert('twoFactorAuth.emailSentFailed', 'problem');
      }
    };
    
    const checkTokenEmail = async (token) => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
        const response = await axios.get(`${apiUrl}/api/verify-token-email`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Verify token response:', response.data);
    
        if (response.data.isValid) {
         const oldToken = Cookies.get('tempAuthToken');
         if (oldToken) {
            Cookies.set('authToken', oldToken);
            Cookies.remove('tempAuthToken');
            console.log('Auth token has been updated');
          }
         }
         else {
            await axios.post(`${apiUrl}/api/update-token-email`, {}, {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             });
            }       
      } catch (err) {
        console.error('Error checking token email:', err);
      }
    };
    
    
    
   return {
      qrCodeUrl,
      qrCode,
      generateQRCode,
      verifyQRCode,
      sendEmailLetter,
   }
})
