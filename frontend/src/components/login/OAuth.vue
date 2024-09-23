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
import axios from 'axios';

export default {
    name: 'OAuth',
    setup() {
        const loginWithGoogle = async () => {
            const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
            try {
                await axios.get(`${apiUrl}/api/auth/google`, { withCredentials: true });
                window.location.href = `${apiUrl}/api/auth/google`;
            } catch (error) {
                console.error('Error during Google login:', error);
            }
        };

        onMounted(() => {
            const authToken = Cookies.get('authToken');
            console.log('Auth Token:', authToken);
            if (authToken) {
                window.location.href = 'https://code-up-omega.vercel.app/user';
            }
        });

        return {
            loginWithGoogle,
        };
    }
};
</script>