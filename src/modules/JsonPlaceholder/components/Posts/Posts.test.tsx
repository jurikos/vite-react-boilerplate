import { render, screen } from '@testing-library/react';

import { DataTestId } from '@shared/constants';
import * as hooks from '@shared/hooks';
import { TestWrapper, queryResultMock } from '@shared/test';

import { postsMock } from '../../mocks';
import Posts from './Posts';

describe('Posts', () => {
  const useGetApiSpy = vi.spyOn(hooks, 'useGetApi');

  it('displays error state', () => {
    useGetApiSpy.mockReturnValue({ ...queryResultMock, isError: true });

    render(<Posts />, { wrapper: TestWrapper });

    expect(screen.getByTestId(DataTestId.isError)).toBeInTheDocument();
  });

  it('displays loading state', () => {
    useGetApiSpy.mockReturnValue({ ...queryResultMock, isLoading: true });

    render(<Posts />, { wrapper: TestWrapper });

    expect(screen.getByTestId(DataTestId.isLoading)).toBeInTheDocument();
  });

  it('displays empty state', () => {
    useGetApiSpy.mockReturnValue({ ...queryResultMock, data: [] });

    render(<Posts />, { wrapper: TestWrapper });

    expect(screen.getByTestId(DataTestId.isDataEmpty)).toBeInTheDocument();
  });

  it('displays success state', () => {
    useGetApiSpy.mockReturnValue({
      ...queryResultMock,
      data: postsMock,
    });

    render(<Posts />, { wrapper: TestWrapper });

    expect(screen.getByTestId(DataTestId.isDataPresent)).toBeInTheDocument();
  });
});
