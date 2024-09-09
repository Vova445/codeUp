<template>
   <div class="form-login">
      <div class="form-login__container">
         <div class="form-login__group">
            <input id="name" v-model="userData.name" type="text" class="form-login__input" autocomplete="off" />
            <label v-if="!userData.name" for="name" class="form-login__label">Name</label>
         </div>
         <div class="form-login__group">
            <input id="mail" v-model="userData.mail" type="email" class="form-login__input" />
            <label v-if="!userData.mail" for="mail" class="form-login__label">Email</label>
         </div>
         <div class="form-login__group form-login__group--password">
            <input :type="showPassword ? 'text' : 'password'" id="pass" v-model="userData.pass" class="form-login__input" />
            <label v-if="!userData.pass" for="pass" class="form-login__label">Password</label>
            <span class="password-toggle" @click="togglePassword"><font-awesome-icon :icon="['far', getEyeCode]" /></span>
         </div>
         <div class="form-login__group form-login__group--password">
            <input :type="showPassword ? 'text' : 'password'" id="passConfirm" v-model="userData.passConfirm" class="form-login__input" />
            <label v-if="!userData.passConfirm" for="passConfirm" class="form-login__label">Confirm Password</label>
            <span class="password-toggle" @click="togglePassword"><font-awesome-icon :icon="['far', getEyeCode]" /></span>
         </div>
         <button class="form-login__button" @click="registerAction">{{ $t('buttons.register') }}</button>
         <div class="form-login__box-link">
            <RouterLink :to="{ name: 'login' }" class="form-login__link">{{ $t('buttons.haveAccount') }}</RouterLink>
         </div>
      </div>
   </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import { useUsersStore } from '../../stores/users.js'
import { useAlertStore } from '../../stores/alert.js'
const { runAlert } = useAlertStore()
const usersStore = useUsersStore()
const { onRegister } = usersStore
const router = useRouter()

const userData = reactive({
   name: '',
   mail: '',
   pass: '',
   passConfirm: '',
})

const showPassword = ref(false)
const getEyeCode = computed(() => (showPassword.value ? 'eye-slash' : 'eye'))

function togglePassword() {
   showPassword.value = !showPassword.value
}

const registerAction = async () => {
   const passRegex = /^(?=.*[0-9])[A-Za-z\d]{8,}$/
   const nameRegex = /^[A-Za-z0-9]{3,}$/
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

   if (!nameRegex.test(userData.name)) {
      runAlert('twoFactorAuth.nameIncorrect', 'problem')
      return
   }
   if (!emailRegex.test(userData.mail)) {
      runAlert('twoFactorAuth.emailIncorrect', 'problem')
      return
   }
   if (!passRegex.test(userData.pass)) {
      runAlert('twoFactorAuth.passIncorrect', 'problem')
      return
   }
   if (userData.pass !== userData.passConfirm) {
      runAlert('twoFactorAuth.passNotMach', 'problem')
      return
   }

   const { success, message } = await usersStore.onRegister(userData)
   console.log('message', success)
   console.log(message)
   if (success) {
      runAlert('twoFactorAuth.loginedSuccessfully', 'success')
   } else {
      runAlert('twoFactorAuth.loginPassOrEmailProblem', 'problem')
   }

   if (success) {
      router.push({ name: 'user' })
   }
}
</script>

<style lang="scss" scoped></style>
