/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components/index',
      '@hooks': '/src/hooks/index',
      '@types': '/src/types/index',
      '@utils': '/src/utils/index',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      ...configDefaults.coverage,
      exclude: [...(configDefaults.coverage.exclude ?? []), 'src/main.tsx', 'src/components/index.ts'],
    },
  },
});
