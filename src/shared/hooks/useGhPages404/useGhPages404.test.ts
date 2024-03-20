import { renderHook } from '@testing-library/react';

import { useNavigateMock } from '@shared/test';

import useGhPages404 from './useGhPages404';

describe('useGhPages404 hook', () => {
  it('navigates to the correct path when URL contains "/?/"', async () => {
    window.location = new URL('http://example.com/?/some/path') as unknown as Location;

    renderHook(() => useGhPages404());

    await new Promise((r) => setTimeout(r, 0));

    expect(useNavigateMock).toHaveBeenCalledWith('some/path', { replace: true });
  });

  it('does not navigate when URL does not contain "/?/"', async () => {
    window.location = new URL('http://example.com/another/path') as unknown as Location;

    renderHook(() => useGhPages404());

    await new Promise((r) => setTimeout(r, 0));

    expect(useNavigateMock).not.toHaveBeenCalled();
  });
});
