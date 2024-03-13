import { afterEach, beforeEach, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

import './mocks/matchMedia';

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});
