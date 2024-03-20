/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

const configOverrides = {
  resolve: {
    alias: {
      '@modules': '/src/modules/index',
      '@pages': '/src/pages/index',
      //shared
      '@shared/assets': '/src/shared/assets',
      '@shared/components': '/src/shared/components/index',
      '@shared/constants': '/src/shared/constants/index',
      '@shared/context': '/src/shared/context/index',
      '@shared/hooks': '/src/shared/hooks/index',
      '@shared/routes': '/src/shared/routes/index',
      '@shared/test': '/src/shared/test/index',
      '@shared/types': '/src/shared/types/index',
      '@shared/utils': '/src/shared/utils/index',
    },
  },
  test: {
    coverage: {
      exclude: ['src/main.tsx', 'src/App.tsx', 'src/shared/types'],
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
    setupFiles: '/src/shared/test/setup.ts',
    coverage: {
      ...configDefaults.coverage,
      exclude: [...(configDefaults.coverage.exclude ?? []), ...configOverrides.test.coverage.exclude],
    },
    pool: 'forks',
  },
  base: '/vite-react-boilerplate',
});
