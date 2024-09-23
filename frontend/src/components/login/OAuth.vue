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
 export default {
   name: 'OAuth',
   methods: {
    loginWithGoogle() {
      window.location.href = '/api/auth/google';
    }
  }
};
 </script>
