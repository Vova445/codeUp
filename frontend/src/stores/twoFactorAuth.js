import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAlertStore } from './alert.js'

export const useTwoFactorAuthStore = defineStore('twoFactorAuth', () => {
   const qrCodeUrl = ref('')
   const qrCode = ref('')
   const { runAlert } = useAlertStore()

   const generateQRCode = async () => {
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

   const verifyQRCode = async (inputCode, router) => {
      const token = localStorage.getItem('tempAuthToken') || localStorage.getItem('authToken')
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
   const sendEmailLetter = async () => {
      let token = localStorage.getItem('authToken') || localStorage.getItem('tempAuthToken');
      
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
    
        if (response.data.isValid) {
          const newAuthToken = jwt.sign({ userId: response.data.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
          localStorage.setItem('authToken', newAuthToken);
          localStorage.removeItem('tempAuthToken');
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
