<template>
   <common-course-page :imgSrc="'html-css.svg'" :course-program="webCourseProgram">
      <template #title>HTML + Css + JS-Start</template>
      <template #course-descr> {{ $t('courses.coursesDescriptions.htmlDercr') }} </template>
   </common-course-page>
</template>
<!--JavaScript - це мова програмуавння яка широко використовується в frontend при як розробці веб-сайтів так і веб додатків. До прикладу такі іменті фреймоврки як React , Vue , Angular використовуються JavaScript-->
<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import CommonCoursePage from '../../components/courses/CommonCoursePage.vue'
import { useMainPageDataStore } from '../../stores/mainPageData.js'
const { webCourseProgram } = storeToRefs(useMainPageDataStore())
</script>

<style lang="scss" scoped></style>
