import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        test: /\.(jpe?g|png|gif|svg|webp|avif)$/i,
        includePublic: true,
        logStats: true,
        png: {
          quality: 80,
          compressionLevel: 8,
        },
        jpeg: {
          quality: 80,
        },
        webp: {
          quality: 80,
        },
        avif: {
          quality: 75,
        },
        svg: {
          multipass: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      minify: 'esbuild' as const,
      cssMinify: true,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            icons: ['lucide-react'],
            pdf: ['jspdf'],
            excel: ['xlsx'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
