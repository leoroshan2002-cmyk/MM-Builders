import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development every request to /api is forwarded to the Express server,
// so the React code can simply call fetch('/api/...') with no CORS setup.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
});
