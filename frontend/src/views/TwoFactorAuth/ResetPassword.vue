<template>
   <div class="reset-pass">
      <div class="form-login">
         <form v-if="!token" class="form-login__container" @submit.prevent="sentEmail">
            <div class="form-login__group">
               <input id="mail" v-model="userData.email" required type="email" class="form-login__input" />
               <label for="mail" class="form-login__label">Email</label>
            </div>
            <button type="submit" class="form-login__button button">send letter on Email to reset password</button>
         </form>
         <form v-else class="form-login__container">
            <div class="form-login__group form-login__group--password">
               <input id="pass" v-model="userData.pass" required :type="showPassword ? 'text' : 'password'" class="form-login__input" />
               <label v-if="!userData.pass" for="pass" class="form-login__label">Password</label>
               <span class="password-toggle" @click="togglePassword">
                  <font-awesome-icon :icon="['far', getEyeCode]" />
               </span>
            </div>
            <div class="form-login__group form-login__group--password">
               <input id="passConfirm" v-model="userData.passConfirm" required :type="showPassword ? 'text' : 'password'" class="form-login__input" />
               <label v-if="!userData.passConfirm" for="passConfirm" class="form-login__label">Confirm Password</label>
               <span class="password-toggle" @click="togglePassword">
                  <font-awesome-icon :icon="['far', getEyeCode]" />
               </span>
            </div>
            <button class="form-login__button button" type="button" @click="resetPassword">Reset password</button>
         </form>
      </div>
   </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import axios from 'axios';

const props = defineProps({
   token: {
      type: String,
      default: null,
   },
})
const userData = reactive({
   email: '',
   pass: '',
   passConfirm: '',
})
const getEyeCode = computed(() => (showPassword.value ? 'eye-slash' : 'eye'))
const showPassword = ref(false)
function togglePassword() {
   showPassword.value = !showPassword.value
}
async function sentEmail() {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
   try {
      const response = await axios.post(`${apiUrl}/api/forgot-password`, { email: userData.email }, {
         headers: {
            'Content-Type': 'application/json'
         }
      });
      alert(response.data.message);
   } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Failed to send reset email';
      alert(`Error: ${errorMessage}`);
   }
}
function resetPassword() {}
</script>

<style lang="scss" scoped>
.reset-pass {
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
}
.form-login {
   width: 100%;
}
</style>
