import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Configuración base para GitHub Pages
  base: '/test_arquitectura/',  // Cambia esto por el nombre de tu repositorio
});
