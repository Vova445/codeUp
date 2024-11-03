import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCoursesDataStore = defineStore('coursesData', () => {
   const webCourseProgram = ref([
      {
         title: 'Start',
         count: 1,
      },
      {
         title: 'Program , instruments',
         count: 2,
      },
      {
         title: 'Html tags. Tags for building',
         count: 3,
      },
      {
         title: 'Html tags. Tags for working with content',
         count: 3,
      },
      {
         title: 'Css acquaintance and syntax',
         count: 4,
      },
      {
         title: 'CSS font and text styles',
         count: 5,
      },
      {
         title: 'CSS font connection',
         count: 6,
      },
      {
         title: 'CSS block properties',
         count: 7,
      },
      {
         title: 'CSS block design properties',
         count: 8,
      },
      {
         title: 'CSS background property',
         count: 9,
      },
      {
         title: 'CSS pseudo-classes',
         count: 10,
      },
      {
         title: 'CSS pseudo-elements',
         count: 11,
      },
      {
         title: 'CSS positioning',
         count: 12,
      },
      {
         title: 'CSS FlexBox',
         count: 13,
      },
      {
         title: 'CSS animation',
         count: 14,
      },
      {
         title: 'Adaptive layout',
         count: 15,
      },
      {
         title: 'SCSS preprocessor',
         count: 15,
      },
      {
         title: 'Work with pictures',
         count: 16,
      },
      {
         title: 'CSS Grid Layout',
         count: 17,
      },
      {
         title: 'JS Introduction and Syntax',
         count: 18,
      },
      {
         title: 'JS Variables and Arrays',
         count: 19,
      },
      {
         title: 'JS work with DOM(JS HTML CSS interaction)',
         count: 20,
      },
      {
         title: 'Layout testing',
         count: 21,
      },
      {
         title: 'Own project practice',
         count: 22,
      },
   ])
   return { webCourseProgram }
})
