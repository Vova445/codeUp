<template>
   <common-course-page :imgSrc="'html-css.svg'" :course-program="webCourseProgram" course-descr="courses.coursesDescriptions.htmlDercr">
      <template #title>HTML + CSS</template>
      <template #course-descr> {{ $t('courses.coursesDescriptions.htmlDercr') }} </template>
   </common-course-page>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import CommonCoursePage from '../../components/courses/CommonCoursePage.vue'
import { useCoursesDataStore } from '../../stores/coursesData'
const { webCourseProgram } = storeToRefs(useCoursesDataStore())
</script>

<style lang="scss" scoped></style>
