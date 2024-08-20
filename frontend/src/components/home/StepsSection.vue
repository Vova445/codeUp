<template>
   <div class="steps">
      <div class="steps__container">

      </div>
   </div>
</template>
   

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
   stepsList: {
      type: Array,
      required: true,
   },
})
</script>

<style lang="scss" scoped>

</style>