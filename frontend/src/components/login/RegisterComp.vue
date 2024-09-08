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
         <div class="form-login__group">
            <input id="pass" v-model="userData.pass" type="password" class="form-login__input" />
            <label v-if="!userData.pass" for="pass" class="form-login__label">Password</label>
         </div>
         <div class="form-login__group">
            <input id="passConfirm" v-model="userData.passConfirm" type="password" class="form-login__input" />
            <label v-if="!userData.passConfirm" for="passConfirm" class="form-login__label">Confirm Password</label>
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
import { reactive } from 'vue'
import { useUsersStore } from '../../stores/users.js'
import { useAlertStore } from '../../stores/alert.js'
const usersStore = useUsersStore()
const { runAlert } = useAlertStore()
const { onRegister } = usersStore
const router = useRouter()

const userData = reactive({
   name: '',
   mail: '',
   pass: '',
   passConfirm: '',
})

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
      runAlert('twoFactorAuth.loginedSuccessfully', 'problem')
   }

   runAlert('twoFactorAuth.loginedSuccessfully', 'success')
   if (success) {
      router.push({ name: 'user' })
   }
}
</script>

<style lang="scss" scoped></style>
