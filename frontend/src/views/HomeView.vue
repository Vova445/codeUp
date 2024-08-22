<template>
   <main-master-page>
      <main-section :coursesList="coursesData.mainCourses" />
      <reasons-section :reasonsList="coursesData.reasonsList" />
      <steps-section />
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import MainSection from '../components/home/MainSection.vue'
import ReasonsSection from '../components/home/ReasonsSection.vue'
import StepsSection from '../components/home/StepsSection.vue'
import coursesData from '../data/mainSection/index'
</script>

<style lang="scss" scoped></style>
