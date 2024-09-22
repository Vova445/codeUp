<template>
   <div class="reset-pass">
      <button class="reset-pass__back" @click="onBack">
         <span><font-awesome-icon :icon="['fas', 'arrow-left']" /></span> {{ $t('buttons.back') }}
      </button>
      <div class="form-login">
         <form v-if="!token" class="form-login__container" @submit.prevent="sentEmail">
            <div class="form-login__group">
               <input id="mail" v-model="userData.email" required type="email" class="form-login__input" />
               <label for="mail" class="form-login__label">Email</label>
            </div>
            <button type="submit" class="form-login__button button">{{ $t('buttons.emailReset') }}</button>
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

            <button class="form-login__button button" type="button" @click="resetPassword">{{ $t('buttons.resetPass') }}</button>
         </form>
      </div>
   </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps({
   token: {
      type: String,
      default: null,
   },
})
const router = useRouter()
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
      const response = await axios.post(
         `${apiUrl}/api/forgot-password`,
         { email: userData.email },
         {
            headers: {
               'Content-Type': 'application/json',
            },
         },
      )
      alert(response.data.message)
   } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Failed to send reset email'
      alert(`Error: ${errorMessage}`)
   }
}
async function resetPassword() {
   const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
   const { pass, passConfirm } = userData

   if (pass !== passConfirm) {
      alert('Passwords do not match')
      return
   }

   try {
      const response = await axios.post(
         `${apiUrl}/api/reset-password`,
         {
            token: props.token,
            newPassword: pass,
         },
         {
            headers: {
               'Content-Type': 'application/json',
            },
         },
      )
      alert(response.data.message)
      router.push({ name: 'login' })
   } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Failed to reset password'
      alert(`Error: ${errorMessage}`)
   }
}
function onBack() {
   router.back()
}
</script>

<style lang="scss" scoped>
.reset-pass {
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 30px;
   &__back {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 20px;
      transition: opacity 0.3s ease;

      span {
         transition: transform 0.3s ease;
      }
      &:hover {
         opacity: 0.8;
         span {
            transform: translate(-5px, 0);
         }
      }
   }
}
.form-login {
   width: 100%;
}
</style>
