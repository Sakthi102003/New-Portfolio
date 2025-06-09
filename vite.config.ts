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
      // Only expose specific environment variables that are safe for client-side
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || mode),
      'process.env.VITE_APP_TITLE': JSON.stringify(env.VITE_APP_TITLE || ''),
      // Add any other public env vars with VITE_ prefix that you need
      // Example: 'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || '')
    }
  }
})
