import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainPageDataStore = defineStore('mainPageData', () => {
   const mainCourses = ref([
      {
         id: 'fmgkkemgn3io443',
         toName: 'home',
         title: 'Python',
         classAdd: 'python',
         image: 'python.svg',
         scale: '1',
         background: '#4a7393',
      },
      {
         id: 'rkeknrenl34knb3',
         toName: 'home',
         title: 'Vue.js',
         classAdd: 'vue',
         image: 'vue.svg',
         scale: '1.05',
         background: '#40b681',
      },
      {
         id: '3l4m39jglbmm4kbm04',
         toName: 'home',
         title: 'JavaScript',
         classAdd: 'js',
         image: 'js.svg',
         scale: '0.85',
         background: '#cfb903',
      },
      {
         id: '3l4m39jglbmm4kbm04',
         toName: 'home',
         title: 'React',
         classAdd: 'react',
         image: 'react.svg',
         scale: '0.8',
         background: '#61dafb',
      },
      {
         id: '3l4m39jglbmm4kbm04',
         toName: 'home',
         title: 'Node.js',
         classAdd: 'node',
         image: 'node-js.svg',
         scale: '1',
         background: '#539e43',
      },
      {
         id: '3l4m39jglbmm4kbm04',
         toName: 'web-interfaces',
         title: 'Html,Css',
         classAdd: 'html-css',
         image: 'html-css.svg',
         scale: '1.2',
         background: '#ff8000',
      },
      {
         id: '3l4m39jglbmm4kbm04',
         toName: 'home',
         title: 'C#',
         classAdd: 'c-sharp',
         image: 'c-sharp.svg',
         scale: '1.1',
         background: '#6d287e',
      },
      {
         id: '3l4m39jglbmm4kbm04',
         toName: 'home',
         title: 'C++',
         classAdd: 'c-plus',
         image: 'c-plus.svg',
         scale: '0.9',
         background: '#084a86',
      },
   ])
   const reasonsList = ref([
      {
         id: 'ldmmgdmg343g34hsgh',
         title: 'reasonsSection.dryTheory.title',
         description: 'reasonsSection.dryTheory.text',
      },
      {
         id: 'njb3o489oibvp3934',
         title: 'reasonsSection.realTasks.title',
         description: 'reasonsSection.realTasks.text',
      },
      {
         id: 'sbvji392bmbo4mc343vb',
         title: 'reasonsSection.uptoUpdate.title',
         description: 'reasonsSection.uptoUpdate.text',
      },
      {
         id: 'ndkfbn94inbmi94nmvk4i',
         title: 'reasonsSection.practicalVideo.title',
         description: 'reasonsSection.practicalVideo.text',
      },
      {
         id: 'kngklbervkklgvwpwklvwko943m',
         title: 'reasonsSection.stepByStep.title',
         description: 'reasonsSection.stepByStep.text',
      },
   ])
   const stepsList = ref([
      {
         id: 'dmgkln309bl39b3b',
         color: '#1b5a8d',
         title: 'stepsSection.familiarization.title',
         description: 'stepsSection.familiarization.description',
      },
      {
         id: 'kj5ndn345oeoor94n',
         color: '#1a4e61',
         title: 'stepsSection.videoExamples.title',
         description: 'stepsSection.videoExamples.description',
      },
      {
         id: 'ndi3i3nn5n4n5vi4j',
         color: '#1f7a78',
         title: 'stepsSection.practice.title',
         description: 'stepsSection.practice.description',
      },
      {
         id: 'eki393ngknkdlkl4n5',
         color: '#3366ff',
         title: 'stepsSection.nextTopics.title',
         description: 'stepsSection.nextTopics.description',
      },
   ])
   const questionsList = ref([
      {
         id: 'knkldvnl303nbkk3',
         title: 'questionsSection.schedule.title',
         textList: [
            {
               id: 'lkmdkgip34tn4j5gjnkl4n5l',
               text: 'questionsSection.schedule.text',
            },
         ],
      },
      {
         id: 'dbmldmlfmbo34m3dfll4',
         title: 'questionsSection.whenCourseStarts.title',
         textList: [
            {
               id: 'lkmdkgip34tn4j5gjnkl4n5l',
               text: 'questionsSection.whenCourseStarts.text',
            },
         ],
      },
      {
         id: 'fdmg30go3jgfjdek4k4ob04k0dfgk45',
         title: 'questionsSection.studingFormat.title',
         textList: [
            {
               id: 'lkmdkgip34tn4j5gjnkl4n5l',
               text: 'questionsSection.studingFormat.text',
            },
         ],
      },
      {
         id: 'dfmkmgop45jj4pnhpi4n435yh54h4',
         title: 'questionsSection.studingFormat.title',
         textList: [
            {
               id: 'kmdkngpo540dfgmi3pnjtkert',
               text: 'questionsSection.studingFormat.text',
            },
         ],
      },
      {
         id: 'kdfkt3k5340bn3n459pgnk3i5nk',
         title: 'questionsSection.studingFormat.title',
         textList: [
            {
               id: 'lkmdkgip34tn4j5gjnkl4n5l',
               text: 'questionsSection.studingFormat.text',
            },
         ],
      },
      {
         id: 'dfkgkl43m34m5nm35mm345',
         title: 'questionsSection.studingFormat.title',
         textList: [
            {
               id: 'lkmdkgip34tn4j5gjnkl4n5l',
               text: 'questionsSection.studingFormat.text',
            },
         ],
      },
   ])
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
   const purposeCourseList = ref([
      {
         id: 'knvljnfioi3sjdjfkjskdfjju',
         title: 'purposes.junior.title',
         text: 'purposes.junior.text',
         color: 'rgb(255, 255, 255)',
         bcColor: 'rgb(37, 37, 37)',
         numColor: 'rgb(255, 255, 255)',
      },
      {
         id: 'dnksfshfjshdjf43n3b4b5nbn34',
         title: 'purposes.jobRotation.title',
         text: 'purposes.jobRotation.text',
         color: 'rgb(255, 255, 255)',
         bcColor: '#000',
         numColor: 'rgb(2, 254, 86)',
      },
      {
         id: '345nbn34b5nb354n34534m5nn3mn5m',
         title: 'purposes.students.title',
         text: 'purposes.students.text',
         color: 'rgb(255, 255, 255)',
         bcColor: 'rgba(73, 73, 73, 0.27)',
         numColor: 'rgb(2, 254, 86)',
      },
      {
         id: '45n6mgfi93fnfudhg83kdfgdgk4berg3',
         title: 'purposes.onlineJob.title',
         text: 'purposes.onlineJob.text',
         color: '#000',
         bcColor: 'rgb(0, 255, 85)',
         numColor: '#000',
      },
      {
         id: 'djdjfbjbcabzncn37dg3bdkdnehuueheb',
         title: 'purposes.programers.title',
         text: 'purposes.programers.text',
         color: 'rgb(255, 255, 255)',
         bcColor: '#000',
         numColor: 'rgb(2, 254, 86)',
      },
      {
         id: '38374bfnwmfnfo394fmf494f4mf94flmo3',
         title: 'purposes.entrepreneurs.title',
         text: 'purposes.entrepreneurs.text',
         color: 'rgb(255, 255, 255)',
         bcColor: 'rgba(73, 73, 73, 0.27)',
         numColor: 'rgb(255, 255, 255)',
      },
   ])
   return { mainCourses, reasonsList, stepsList, questionsList, webCourseProgram, purposeCourseList }
})
