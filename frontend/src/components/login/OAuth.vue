<template>
   <div class="form-login__socials">
      <button type="button" class="form-login__social form-login__social--google" @click="loginWithGoogle">
         <font-awesome-icon :icon="['fab', 'google']" />
      </button>
      <button type="button" class="form-login__social form-login__social--facebook">
         <font-awesome-icon :icon="['fab', 'facebook-f']" />
      </button>
      <button type="button" class="form-login__social form-login__social--github" @click="loginWithGitHub">
         <font-awesome-icon :icon="['fab', 'github']" />
      </button>
      <button type="button" class="form-login__social form-login__social--linkedin-in" @click="loginWithLinkedIn">
         <font-awesome-icon :icon="['fab', 'linkedin-in']" />
      </button>
   </div>
</template>

<script setup>
const loginWithGoogle = () => {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
   const googleAuthUrl = `${apiUrl}/api/auth/google`
   window.location.href = googleAuthUrl
}
const loginWithGitHub = () => {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
   const githubAuthUrl = `${apiUrl}/api/auth/github`
   window.location.href = githubAuthUrl
}
const loginWithLinkedIn = () => {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
   const linkedinAuthUrl = `${apiUrl}/api/auth/linkedin`
   window.location.href = linkedinAuthUrl
}
</script>
