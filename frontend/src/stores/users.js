import { defineStore } from 'pinia'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')

export const useUsersStore = defineStore('users', () => {
   async function onRegister({ name, mail, pass }) {
      try {
         const response = await axios.post(`${apiUrl}/api/register`, {
            name,
            email: mail,
            password: pass,
         }, {
            headers: {
                'Content-Type': 'application/json'
            }
         })
         const { token, message } = response.data
         localStorage.setItem('authToken', token)

         return { success: true, message }
      } catch (error) {
         const errorMessage = error.response ? error.response.data.message : 'Registration failed: unknown error'
         return { success: false, message: errorMessage }
      }
   }

   async function onLogin({ mail, pass }) {
      try {
         const response = await axios.post(`${apiUrl}/api/login`, {
            email: mail,
            password: pass,
         }, {
            headers: {
               'Content-Type': 'application/json'
            }
         });
   
         const { token, user } = response.data;
         if (user.isTwoFAEnabled) {
            return { success: true, token, user, message: 'Two-factor authentication required' };
         } else {
            localStorage.setItem('authToken', token);
            return { success: true, token, user, message: 'Login successful' };
         }
      } catch (error) {
         const errorMessage = error.response ? error.response.data.message : 'Login failed';
         return { success: false, message: errorMessage };
      }
   }
   

   return { onRegister, onLogin }
})
