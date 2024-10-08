import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCoursesLisStore = defineStore('coursesLis', () => {
   const languageList = ref([
      {
         id: 'dfmgkebo45gjjjgndnmgndfgdfm3mgh4',
         title: 'HTML,CSS,JS-Start',
         dollarCurrentPrice: 175,
         imgSrc: 'html-css.svg',
         backgroundGrad:
            'linear-gradient(280deg, rgba(176,74,6,1) 0%, rgba(22,99,134,1) 25%, rgba(11,33,119,1) 50%, rgba(22,99,134,1) 75%, rgba(176,74,6,1) 100%)',
         routerName: 'web-interfaces',
      },
      {
         id: 'kskdjf39kk4m4j3kmgocm3mn5',
         title: 'JavaScript',
         dollarCurrentPrice: 135,
         dollarAldPrice: 150,
         percentDiscount: 10,
         imgSrc: 'js.svg',
         backgroundGrad:
            'linear-gradient(280deg, rgba(246,247,96,1) 0%, rgba(166,163,17,1) 25%, rgba(142,140,47,1) 50%, rgba(166,163,17,1) 75%, rgba(246,247,96,1) 100%)',
         routerName: 'home',
      },

      {
         id: 'dnnfdkgnkdkfgndnfkgldkdkgf',
         title: 'Python',
         dollarCurrentPrice: 135,
         dollarAldPrice: 150,
         percentDiscount: 10,
         imgSrc: 'python.svg',
         backgroundGrad:
            'linear-gradient(280deg, rgba(233,231,66,1) 0%, rgba(75,139,189,1) 25%, rgba(44,105,153,1) 50%, rgba(75,139,189,1) 75%, rgba(233,231,66,1) 100%)',
         routerName: 'home',
      },
      {
         id: 'mveilgn3ioh949h5i34n5j345j3j34',
         title: 'C#',
         dollarCurrentPrice: 150,
         imgSrc: 'c-sharp.svg',
         backgroundGrad:
            'linear-gradient(280deg, rgba(215,127,240,1) 0%, rgba(157,77,179,1) 25%, rgba(104,32,123,1) 50%, rgba(157,77,179,1) 75%, rgba(215,127,240,1) 100%)',
         routerName: 'home',
      },

      {
         id: 'erkgnk34i35l345nm3n5mn3n9gpdgjo3',
         title: 'Node.js',
         dollarCurrentPrice: 135,
         dollarAldPrice: 150,
         percentDiscount: 10,
         imgSrc: 'node-js.svg',
         backgroundGrad:
            'linear-gradient(280deg, rgba(3,48,2,1) 0%, rgba(59,147,57,1) 25%, rgba(52,112,51,1) 50%, rgba(59,147,57,1) 75%, rgba(3,48,2,1) 100%)',
         routerName: 'home',
      },
   ])

   const coursesNavigationList = ref([
      {
         id: '4355fg34m3m345gfp4lfgb554bllmdfl4o5',
         title: 'courses.navigation.languages',
         routeName: 'languages',
      },
      {
         id: '4m5knm4io5higlfnhilgfohjop;klnknhl5nl6hn5knk',
         title: 'courses.navigation.frameworks',
         routeName: 'frameworks',
      },
      {
         id: 'dmfknerghe5huthu5ku45hgkuh4u5huhkjjjtkr',
         title: 'courses.navigation.libraries',
         routeName: 'libraries',
      },
      {
         id: '45m6nmk54lk6ln546n4nk6lkngkjnrjngu4',
         title: 'courses.navigation.instruments',
         routeName: 'tools',
      },
      {
         id: 'kdghgh83958th45b4hu6h54uj6454b5n645n645n',
         title: 'courses.navigation.other',
         routeName: 'other',
      },
   ])

   return { languageList, coursesNavigationList }
})
