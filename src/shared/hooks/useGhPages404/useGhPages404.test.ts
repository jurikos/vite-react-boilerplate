import { useNavigate } from 'react-router-dom';

import { renderHook } from '@testing-library/react';
import { Mock, beforeEach, vi } from 'vitest';

import useGhPages404 from './useGhPages404';

// Mock useNavigate
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useGhPages404 hook', () => {
  let navigateMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    navigateMock = vi.fn();
    (useNavigate as Mock).mockImplementation(() => navigateMock);

    navigateMock.mockClear();
  });

  it('navigates to the correct path when URL contains "/?/"', async () => {
    window.location = new URL('http://example.com/?/some/path') as unknown as Location;

    renderHook(() => useGhPages404());

    await new Promise((r) => setTimeout(r, 0));

    expect(navigateMock).toHaveBeenCalledWith('some/path', { replace: true });
  });

  it('does not navigate when URL does not contain "/?/"', async () => {
    window.location = new URL('http://example.com/another/path') as unknown as Location;

    renderHook(() => useGhPages404());

    await new Promise((r) => setTimeout(r, 0));

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
