<template>
   <div class="loading-auth">
      <v-progress-circular :model-value="value" :rotate="0" :size="100" :width="10" color="#3c776f">
         {{ valueToShow }}
      </v-progress-circular>
      <h3 class="loading-auth__title">
         Ваш обліковий запис успішно підтверджено! Ви будете перенаправлені назад через <span> {{ valueToShow }} </span> секунд.
      </h3>
   </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
const interval = reactive({})
const value = ref(0)
const valueToShow = ref(5)

onMounted(() => {
   interval.value = setInterval(() => {
      if (value.value === 100) {
         valueToShow.value = 5
         window.location.href = 'https://code-up-omega.vercel.app/user'
         return (value.value = 0)
      }
      valueToShow.value -= 1
      value.value += 20
   }, 1000)
})
</script>

<style lang="scss" scoped>
//.v-progress-circular {
//   margin: 1rem;
//}
.loading-auth {
   &__title {
      color: #fff;
      font-size: clamp(1.25rem, 0.312rem + 1.957vw, 1.875rem);
      span {
         color: #3c776f;
      }
   }
}
</style>
