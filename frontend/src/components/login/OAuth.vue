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
import Cookies from 'js-cookie';

export default {
    name: 'OAuth',
    setup() {
        const loginWithGoogle = () => {
            const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
            const googleAuthUrl = `${apiUrl}/api/auth/google`;
            window.location.href = googleAuthUrl;
        };
        const checkAuthToken = () => {
            const token = Cookies.get('authToken');
            if (token) {
                console.log('Token is present:', token);
            } else {
                console.log('No token found');
            }
        };
        onMounted(() => {
            checkAuthToken();
        });


        return {
            loginWithGoogle,
        };
    },
};
</script>