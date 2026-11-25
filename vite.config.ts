import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The website is deployed under the GitHub Pages subpath /eso-addons-manager/.
// During local development the base is set to '/' so assets resolve from root.
export default defineConfig({
  base: '/eso-addons-manager/',
  plugins: [react()],
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
