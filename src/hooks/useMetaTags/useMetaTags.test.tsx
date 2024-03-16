import { renderHook } from '@testing-library/react';

import useMetaTags, { projectName } from './useMetaTags';

describe('useMetaTags', () => {
  const mockData = { title: 'Test Title', description: 'Test Description.' };

  beforeEach(() => {
    document.head.innerHTML = '';
  });

  afterEach(() => {
    document.title = '';
  });

  it('should add title and description', () => {
    const { unmount } = renderHook(() =>
      useMetaTags({
        title: mockData.title,
        description: mockData.description,
      }),
    );

    const title = document.head.querySelector('title') as HTMLElement;
    expect(title?.innerHTML).toBe(`${mockData.title} | ${projectName}`);

    const metaTag = document.head.querySelector('meta[name="description"]') as HTMLMetaElement;
    expect(metaTag?.content).toBe(mockData.description);

    unmount();
    const metaTagAfterUnmount = document.head.querySelector('meta[name="description"]');
    expect(metaTagAfterUnmount).toBeNull();
  });

  it('should not add meta tags with empty content', () => {
    const { unmount } = renderHook(() =>
      useMetaTags({
        title: mockData.title,
        description: '',
      }),
    );

    const title = document.head.querySelector('title') as HTMLElement;
    expect(title?.innerHTML).toBe(`${mockData.title} | ${projectName}`);

    const metaTag = document.head.querySelector('meta[name="description"]');
    expect(metaTag).toBeNull();
    unmount();
  });
});
