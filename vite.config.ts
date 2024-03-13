/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

const configLocal = {
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components/index',
      '@hooks': '/src/hooks/index',
      '@modules': '/src/modules/index',
      '@pages': '/src/pages/index',
      '@test': '/src/test/index',
      '@types': '/src/types/index',
      '@utils': '/src/utils/index',
    },
  },
  test: {
    coverage: {
      exclude: ['src/main.tsx', 'src/test/*'],
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: configLocal.resolve.alias,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '/src/test/setup.ts',
    coverage: {
      ...configDefaults.coverage,
      exclude: [...(configDefaults.coverage.exclude ?? []), ...configLocal.test.coverage.exclude],
    },
  },
});
