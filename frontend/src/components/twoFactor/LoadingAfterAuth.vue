<template>
   <div class="loading-auth">
      <v-progress-circular :model-value="value" :rotate="0" :size="100" :width="10" color="#3c776f">
         {{ valueToShow }}
      </v-progress-circular>
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
         return (value.value = 0)
      }
      valueToShow.value -= 1
      value.value += 20
   }, 1000)
})
</script>

<style lang="scss" scoped>
.v-progress-circular {
   margin: 1rem;
}
</style>
