<template>
   <div class="alert-box" :class="{ active: isActive }">
      {{ alertText }}
   </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
   alertText: {
      type: Array,
   },
   isActive: {
      type: Boolean,
      required: true,
   },
})
</script>

<style lang="scss" scoped>
.alert-box {
}
</style>
