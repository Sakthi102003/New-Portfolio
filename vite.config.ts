import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'styled-components'],
            animations: ['framer-motion'],
            icons: ['react-icons']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      minify: 'esbuild',
      target: 'esnext'
    },
    define: {
      'process.env': env
    }
  }
})
