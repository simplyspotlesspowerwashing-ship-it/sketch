import { defineConfig } from 'vite';

// Preact via the automatic JSX runtime; no plugin needed.
export default defineConfig({
  base: './',
  oxc: { jsx: { runtime: 'automatic', importSource: 'preact' } },
});
