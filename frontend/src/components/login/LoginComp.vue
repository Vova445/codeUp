<template>
   <div class="form-login">
      <form class="form-login__container" @submit.prevent="loginAction">
         <div class="form-login__group">
            <input id="mail" v-model="userData.mail" required type="email" class="form-login__input" />
            <label v-if="!userData.mail" for="mail" class="form-login__label">Email</label>
         </div>
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
         <div class="form-login__pass-reset-block">
            <button class="form-login__forgot-pass" type="button" @click="submitForgotPassword">{{ $t('buttons.forgotPass') }}</button>
         </div>
         <button type="submit" class="form-login__button">{{ $t('buttons.login') }}</button>
         <div class="form-login__socials">
            <button type="button" class="form-login__social form-login__social--google"><font-awesome-icon :icon="['fab', 'google']" /></button>
            <button type="button" class="form-login__social form-login__social--facebook"><font-awesome-icon :icon="['fab', 'facebook-f']" /></button>
            <button type="button" class="form-login__social form-login__social--github"><font-awesome-icon :icon="['fab', 'github']" /></button>
            <button type="button" class="form-login__social form-login__social--linkedin-in">
               <font-awesome-icon :icon="['fab', 'linkedin-in']" />
            </button>
         </div>
         <div class="form-login__box-link">
            <RouterLink :to="{ name: 'register' }" class="form-login__link">{{ $t('buttons.noAccount') }}</RouterLink>
         </div>
      </form>
   </div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useRouter } from 'vue-router'
import { useAlertStore } from '../../stores/alert.js'
import Cookies from 'js-cookie'
const { runAlert } = useAlertStore()
const usersStore = useUsersStore()
const router = useRouter()
const { onLogin } = usersStore
const userData = reactive({
   mail: '',
   pass: '',
   passConfirm: '',
})
const showPassword = ref(false)
const getEyeCode = computed(() => (showPassword.value ? 'eye-slash' : 'eye'))

function togglePassword() {
   showPassword.value = !showPassword.value
}

const loginAction = async () => {
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   if (!emailRegex.test(userData.mail)) {
      runAlert('twoFactorAuth.emailIncorrect', 'problem')
      return
   }
   if (userData.pass !== userData.passConfirm) {
      runAlert('twoFactorAuth.passNotMach', 'problem')
      return
   }
   const { success, token, user, message } = await onLogin(userData)
   console.log('Login response:', { success, message, user })
   if (success) {
      runAlert('twoFactorAuth.loginedSuccessfully', 'success')

      if (user.isTwoFAEnabled) {
         Cookies.set('tempAuthToken', token)
         if (user.twoFAMethod === 'email') {
            router.push({ name: 'email' })
         } else if (user.twoFAMethod === 'googleAuth') {
            router.push({ name: 'googleAuth' })
         } else if (user.twoFAMethod === 'qr') {
            router.push({ name: 'qrCode' })
         }
      } else {
         Cookies.set('authToken', token)
         router.push({ name: 'user' })
      }
   } else {
      runAlert('twoFactorAuth.loginPassOrEmailProblem', 'problem')
   }
}
const submitForgotPassword = async () => {
   router.push({ name: 'reset-password' })
}
</script>
<style lang="scss" scoped>
.form-login__pass-reset-block {
   &:not(:last-child) {
      margin-bottom: 20px;
   }
   text-align: right;
}
.form-login__forgot-pass {
   font-size: 14px;

   text-decoration: underline;
   &:hover {
      text-decoration: none;
   }
}
</style>
