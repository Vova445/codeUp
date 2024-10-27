import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
//======= old
//export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//      alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url)),
//      },
//      // 'process.env': {
//      //    VITE_BASE_URL: process.env.VITE_BASE_URL || 'https://main--mybestcodeup.netlify.app',
//      // },
//   },
//   build: {
//      outDir: 'dist',
//   },

//   define: {
//      'process.env': {
//         VITE_API_URL: process.env.VITE_API_URL,
//      },
//   },
//})
//==========
export default defineConfig({
   plugins: [vue()],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
   },
   'process.env': {
      VITE_BASE_URL: process.env.VITE_BASE_URL || 'https://main--mybestcodeup.netlify.app',
   },
   build: {
      outDir: 'dist',
   },
   define: {
      'process.env': {
         VITE_API_URL: process.env.VITE_API_URL,
      },
   },
   css: {
      preprocessorOptions: {
         scss: {
            additionalData: `
               @import "@/assets/styles/common/index.scss";
            `, // Import the common styles globally
         },
      },
   },
})

//export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//      alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url)),
//      },
//   },
//   build: {
//      outDir: 'dist',
//   },
//   base: '/codeup/',
//})
