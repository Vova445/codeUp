<template>
   <div class="course-container">
      <h2 class="course-container__title title">Chose language you want to teach</h2>
      <div class="course-container__articles">
         <!--<CoursesListArticles :course-list="languageList" />-->
      </div>
   </div>
</template>

<script setup>
import { useCoursesLisStore } from '../../stores/coursesList.js'
const { languageList } = storeToRefs(useCoursesLisStore())
import CoursesListArticles from '../../components/courses/CoursesListArticles.vue'
import { storeToRefs } from 'pinia'
</script>

<style lang="scss" scoped></style>
