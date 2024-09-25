<template>
   <main-master-page>
      <div>
         <button @click="setTypeCourse('tes1')">tes1</button>
         <button @click="setTypeCourse('tes2')">tes2</button>
         <component :is="currentComponent" />
      </div>
   </main-master-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import MainMasterPage from '../../masterPages/MainMasterPage.vue'
const typeCourse = ref('tes1')
import TestOne from './TestOne.vue'
import TestTwo from './TestTwo.vue'
function setTypeCourse(type) {
   typeCourse.value = type
}
const currentComponent = computed(() => {
   switch (typeCourse.value) {
      case 'tes1':
         return TestOne
         break
      case 'tes2':
         return TestTwo
         break
   }
})
</script>

<style lang="scss" scoped></style>
