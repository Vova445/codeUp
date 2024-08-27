<template>
   <main-master-page>
      <questions-section :questions-list="coursesData.questionsList" />
   </main-master-page>
</template>
<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import QuestionsSection from '../components/home/QuestionsSection.vue'
import coursesData from '../data/mainSection/index'
</script>

<style lang="scss" scoped></style>
