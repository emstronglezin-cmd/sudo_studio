import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root:'.',
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../dist', // Ensure alignment with Electron's dist folder
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
optimizeDeps: {
  include:['monaco-editor'],
  exclude: ['electron'], // Exclude Electron from optimized dependencies
},
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  define: {
    'process.env': {}, // Define an empty object to avoid process.env errors
  },
  worker: {
    plugins: [],
    rollupOptions: {
      output: {
        entryFileNames: 'workers/[name].js',
      },
    },
  },
});