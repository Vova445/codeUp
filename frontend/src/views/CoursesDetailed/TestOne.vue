<template>
   <div class="course-container">
      <h2 class="course-container__title title">Chose language you want to teach</h2>
      <div class="course-container__articles">
         <CoursesListArticles :course-list="coursesArticles.languagesList" />
      </div>
   </div>
</template>

<script setup>
import coursesArticles from '../../data/coursesList/index.json'
import CoursesListArticles from '../../components/courses/CoursesListArticles.vue'
</script>

<style lang="scss" scoped></style>
