<template>
   <div class="loading-auth">
      <div class="loading-auth__box">
         <v-progress-circular :model-value="value" :rotate="0" :size="150" :width="10" color="#3c776f">
            {{ valueToShow }}
         </v-progress-circular>
         <h3 class="loading-auth__title">
            Ваш обліковий запис успішно підтверджено! Ви будете перенаправлені назад через <span> {{ valueToShow }} </span> секунд.
         </h3>
      </div>
   </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Cookies from 'js-cookie';
const value = ref(0)
const valueToShow = ref(5)

onMounted(() => {
   const totalTime = 5000
   const intervalDuration = 50
   let elapsed = 0

   const interval = setInterval(() => {
      elapsed += intervalDuration
      value.value = (elapsed / totalTime) * 100

      if (elapsed % 1000 === 0) {
         valueToShow.value -= 1
      }

      if (valueToShow.value === -1) {
         valueToShow.value = 5
         value.value = 0
         elapsed = 0
         const urlParams = new URLSearchParams(window.location.search);
         const token = urlParams.get('token');
         console.log('Token from URL:', token);
         if (token) {
            Cookies.set('authToken', token);
            console.log('Token saved in cookies:', token);
            Cookies.remove('tempAuthToken');
         }

         window.location.href = 'https://code-up-omega.vercel.app/user'
         clearInterval(interval)
      }
   }, intervalDuration)
})
</script>
<style lang="scss" scoped>
:deep() {
   .v-progress-circular__underlay {
      color: #8b8b8b;
   }
}

.v-progress-circular {
   margin: 1rem;
}
.loading-auth {
   text-align: center;
   max-width: 900px;
   margin: 0 auto;
   padding: 40px 15px;
   &__box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
   }
   &__title {
      line-height: 1.3;
      color: #cecece;
      font-size: clamp(0.875rem, -0.157rem + 2.153vw, 1.563rem);
      letter-spacing: 1.3px;
      word-spacing: 1.2px;
      text-shadow: 0.9px 1px 1px rgb(172, 172, 172),
      0.9px 1px 1px rgb(172, 172, 172);
   
      
      span {
         padding: 0 5px;
         font-weight: 600;
         color: #3c776f;
         text-shadow: none;
      }
   }
}
</style>
