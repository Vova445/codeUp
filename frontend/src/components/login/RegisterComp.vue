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
      <main-alert />
   </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { reactive } from 'vue'
import MainAlert from '../../components/alerts/MainAlert.vue'
import { useUsersStore } from '../../stores/users.js'

const usersStore = useUsersStore()
const { onRegister } = usersStore
const router = useRouter()

const userData = reactive({
   name: '',
   mail: '',
   pass: '',
   passConfirm: '',
})

const registerAction = async () => {
   if (userData.pass !== userData.passConfirm) {
      alert('Passwords do not match!')
      return
   }
   const { success, message } = await usersStore.onRegister(userData)
   alert(message)
   if (success) {
      router.push({ name: 'user' })
   }
}
</script>

<style lang="scss" scoped></style>
