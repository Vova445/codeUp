<template>
    <div class="form-login__socials">
        <button @click="loginWithGoogle" type="button" class="form-login__social form-login__social--google">
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
 
 <script>
 import Cookies from 'js-cookie';
 
 export default {
     name: 'OAuth',
     created() {
         this.getAuthToken();
     },
     methods: {
         loginWithGoogle() {
             const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
             window.location.href = `${apiUrl}/api/auth/google`;
         },
         async getAuthToken() {
             const authToken = Cookies.get('authToken');
             if (authToken) {
                 console.log('Token отримано:', authToken);
                 window.location.href = 'https://code-up-omega.vercel.app/user';
             } else {
                 console.log('Token не знайдено');
             }
         }
     }
 };
 </script>