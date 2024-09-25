<template>
   <div class="form-login__socials">
      <button type="button" class="form-login__social form-login__social--google" @click="loginWithGoogle">
         <font-awesome-icon :icon="['fab', 'google']" />
      </button>
      <button type="button" class="form-login__social form-login__social--facebook">
         <font-awesome-icon :icon="['fab', 'facebook-f']" />
      </button>
      <button type="button" class="form-login__social form-login__social--github">
         <font-awesome-icon :icon="['fab', 'github']" />
      </button>
      <button type="button" class="form-login__social form-login__social--linkedin-in">
         <font-awesome-icon :icon="['fab', 'linkedin-in']" />
      </button>
   </div>
</template>

<script setup>
import Cookies from 'js-cookie'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const loginWithGoogle = () => {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
   const googleAuthUrl = `${apiUrl}/api/auth/google`
   window.location.href = googleAuthUrl
}
const storeTokenInCookie = (token) => {
   console.log('storeTokenInCookie function called');
   console.log('Token from URL:', token);
   if (token) {
      const isProduction = import.meta.env.NODE_ENV === 'production';
      Cookies.set('authToken', token, { expires: 1, secure: isProduction, sameSite: 'Lax' });
      console.log('Token saved in cookies:', token);
      router.push({ name: 'user' });
   } else {
      console.error('Token is missing');
   }
}

onMounted(() => {
   console.log('Component mounted');
   const urlParams = new URLSearchParams(window.location.search);
   const token = urlParams.get('token');
   console.log('Token in URL on mounted:', token);
   if (token) {
      storeTokenInCookie(token)
   }
})
</script>
