import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/SHARIF-IPTV/', // Set base to the exact GitHub repo name to prevent 404s on assets
    plugins: [
      react(), 
      tailwindcss(),
      legacy({
        targets: ['defaults', 'not IE 11', 'Chrome >= 49', 'Safari >= 10'],
        renderModernPolyfills: true,
        polyfills: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome49', // Older TVs use old Chromium
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_fnames: true,
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
