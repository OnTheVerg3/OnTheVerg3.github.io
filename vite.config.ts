import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
//
// Base path is '/' because the repository is a GitHub Pages USER site
// (USERNAME.github.io), not a project site. Vite assets are served from
// the domain root rather than a sub-path.
//
// Manual chunks split React and React Router into their own bundles so
// the initial page payload stays minimal and these dependencies are
// long-term cacheable across content-only releases.
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: false,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    cssCodeSplit: true,
    cssMinify: true,
    minify: 'esbuild',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Function form. The Phase A object form
        //   manualChunks: { react: ['react', 'react-dom'], router: [...] }
        // generated an empty react chunk under Vite 7 because the modern
        // React JSX-runtime entry points (`react/jsx-runtime`, the
        // internal scheduler package, `react-dom/client`) are not literal
        // matches for the strings `'react'` / `'react-dom'`. The function
        // below matches any module path inside node_modules whose folder
        // starts with `react`, `react-dom`, or `scheduler` (React's
        // bundled scheduler) and routes it to the `react` chunk, and
        // routes `react-router*` modules to a separate `router` chunk so
        // routing internals stay cacheable across React upgrades.
        manualChunks(id: string): string | undefined {
          if (!id.includes('node_modules')) {
            return undefined;
          }
          if (id.includes('react-router') || id.includes('@remix-run')) {
            return 'router';
          }
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
});
