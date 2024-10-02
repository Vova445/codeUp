<template>
   <main-master-page>
      <questions-section :questions-list="questionsList" />
   </main-master-page>
</template>
<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import QuestionsSection from '../components/home/QuestionsSection.vue'
import { useMainPageDataStore } from '../stores/mainPageData.js'
import { storeToRefs } from 'pinia'
const { questionsList } = storeToRefs(useMainPageDataStore())
</script>

<style lang="scss" scoped></style>
