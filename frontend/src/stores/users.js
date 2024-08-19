import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')

if (!apiUrl) {
   console.error('API URL is not defined!')
}

export const useUsersStore = defineStore('users', () => {
   const isUserAuth = ref(false)
   console.log('API URL:', apiUrl)

   async function onRegister({ name, mail, pass }) {
      try {
         const response = await axios.post(`${apiUrl}/api/register`, {
            name,
            email: mail,
            password: pass,
         })
         const { token, message } = response.data
         localStorage.setItem('authToken', token)
         isUserAuth.value = true
         return { success: true, message }
      } catch (error) {
         const errorMessage = error.response?.data?.message || 'Registration failed: unknown error'
         return { success: false, message: errorMessage }
      }
   }

   async function onLogin({ mail, pass }) {
      try {
         const response = await axios.post(`${apiUrl}/api/login`, {
            email: mail,
            password: pass,
         })
         const { token } = response.data
         localStorage.setItem('authToken', token)
         isUserAuth.value = false
         return { success: true, message: 'Login successful!' }
      } catch (error) {
         const errorMessage = error.response?.data?.message || 'Login failed: unknown error'
         return { success: false, message: errorMessage }
      }
   }

   return { onRegister, onLogin, isUserAuth }
})
