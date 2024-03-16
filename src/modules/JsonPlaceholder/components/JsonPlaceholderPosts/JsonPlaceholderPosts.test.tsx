import { render, screen } from '@testing-library/react';

import { DataTestId } from '@shared/constants';
import * as hooks from '@shared/hooks';
import { TestWrapper, queryResultMock } from '@shared/test';

import JsonPlaceholderPosts from './JsonPlaceholderPosts';

const postsMock = [
  {
    userId: 1,
    id: 1,
    title: 'title',
    body: 'body',
  },
];

describe('JsonPlaceholderPosts', () => {
  const useGetApiSpy = vi.spyOn(hooks, 'useGetApi');

  it('displays error state', () => {
    useGetApiSpy.mockReturnValue({ ...queryResultMock, isError: true });

    render(<JsonPlaceholderPosts />, { wrapper: TestWrapper });

    expect(screen.getByTestId(DataTestId.isError)).toBeInTheDocument();
  });

  it('displays loading state', () => {
    useGetApiSpy.mockReturnValue({ ...queryResultMock, isLoading: true });

    render(<JsonPlaceholderPosts />, { wrapper: TestWrapper });

    expect(screen.getByTestId(DataTestId.isLoading)).toBeInTheDocument();
  });

  it('displays empty state', () => {
    useGetApiSpy.mockReturnValue({ ...queryResultMock, data: [] });

    render(<JsonPlaceholderPosts />, { wrapper: TestWrapper });

    expect(screen.getByTestId(DataTestId.isDataEmpty)).toBeInTheDocument();
  });

  it('displays success state', () => {
    useGetApiSpy.mockReturnValue({
      ...queryResultMock,
      data: postsMock,
    });

    render(<JsonPlaceholderPosts />, { wrapper: TestWrapper });

    expect(screen.getByTestId(DataTestId.isDataPresent)).toBeInTheDocument();
  });
});
