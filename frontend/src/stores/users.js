import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
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
         Cookies.set('authToken', token)

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
         })
         
         const { token, user } = response.data
         return { success: true, token, user, message: 'Login successful' }
      } catch (error) {
         const errorMessage = error.response ? error.response.data.message : 'Login failed'
         return { success: false, message: errorMessage }
      }
   }

   async function onForgotPassword(email) {
      try {
         const response = await axios.post(`${apiUrl}/api/forgot-password`, { email }, {
            headers: {
               'Content-Type': 'application/json'
            }
         });
         return { success: true, message: response.data.message };
      } catch (error) {
         const errorMessage = error.response ? error.response.data.message : 'Failed to send reset email';
         return { success: false, message: errorMessage };
      }
   }

   return { onRegister, onLogin, onForgotPassword }
})
