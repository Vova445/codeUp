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
 
 <script>
import { onMounted } from 'vue';
import Cookies from 'js-cookie';

export default {
    name: 'OAuth',
    setup() {
        const loginWithGoogle = () => {
         const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
         const googleAuthUrl = `${apiUrl}/api/auth/google`
         window.location.href = googleAuthUrl
      }

        onMounted(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            console.log('Token from URL:', token);

            if (token) {
                Cookies.set('authToken', token, { secure: true, sameSite: 'None', path: '/'});
                console.log('Token set in cookies:', Cookies.get('authToken')); 
                setTimeout(() => {
                    window.location.href = 'https://code-up-omega.vercel.app/user';
                }, 2500); 
            } else {
                const authToken = Cookies.get('authToken');
                console.log('Auth Token from cookies:', authToken);
                if (authToken) {
                    window.location.href = 'https://code-up-omega.vercel.app/user';
                }
            }
        });

        return {
            loginWithGoogle,
        };
    }
};
</script>