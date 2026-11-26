
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The website is deployed at the root of the GitHub Pages domain.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
