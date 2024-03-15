/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

const configOverrides = {
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components/index',
      '@constants': '/src/constants/index',
      '@hooks': '/src/hooks/index',
      '@modules': '/src/modules/index',
      '@pages': '/src/pages/index',
      '@routes': '/src/routes/index',
      '@test': '/src/test/index',
      '@types': '/src/types/index',
      '@utils': '/src/utils/index',
    },
  },
  test: {
    coverage: {
      exclude: ['src/main.tsx'],
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: configOverrides.resolve.alias,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '/src/test/setup.ts',
    coverage: {
      ...configDefaults.coverage,
      exclude: [...(configDefaults.coverage.exclude ?? []), ...configOverrides.test.coverage.exclude],
    },
    pool: 'forks',
  },
});
