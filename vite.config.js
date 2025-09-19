import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/e-house-configurator/',  // 👈 important for GitHub Pages
  server: { port: 5173, open: true }
});
