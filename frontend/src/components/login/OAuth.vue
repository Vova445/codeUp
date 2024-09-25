<template>
   <div class="form-login__socials">
      <button type="button" class="form-login__social form-login__social--google" @click="loginWithGoogle">
         <font-awesome-icon :icon="['fab', 'google']" />
      </button>
      <button type="button" class="form-login__social form-login__social--facebook"  @click="loginWithFacebook">
         <font-awesome-icon :icon="['fab', 'facebook-f']" />
      </button>
      <button type="button" class="form-login__social form-login__social--github" @click="loginWithGitHub">
         <font-awesome-icon :icon="['fab', 'github']" />
      </button>
      <button type="button" class="form-login__social form-login__social--linkedin-in">
         <font-awesome-icon :icon="['fab', 'linkedin-in']" />
      </button>
   </div>
</template>

<script setup>
// import Cookies from 'js-cookie'
// import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const loginWithGoogle = () => {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
   const googleAuthUrl = `${apiUrl}/api/auth/google`
   window.location.href = googleAuthUrl
}

const loginWithFacebook = () => {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
   const facebookAuthUrl = `${apiUrl}/api/auth/facebook`;
   window.location.href = facebookAuthUrl;
}
const loginWithGitHub = () => {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
   const githubAuthUrl = `${apiUrl}/api/auth/github`;
   window.location.href = githubAuthUrl;
}

</script>
