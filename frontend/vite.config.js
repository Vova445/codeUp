import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
   plugins: [vue()],
   server: {
      historyApiFallback: true,
   },
   // Якщо ви використовуєте проксі для API запитів
   // proxy: {
   //   '/api': {
   //     target: 'http://localhost:5000',
   //     changeOrigin: true,
   //     rewrite: (path) => path.replace(/^\/api/, '')
   //   }
   // }
})
