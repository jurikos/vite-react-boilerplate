import { useQuery } from '@tanstack/react-query';

import { renderHook, waitFor } from '@testing-library/react';

import useGetApi from './useGetApi';

vi.mock('@tanstack/react-query', async () => {
  const originalModule = await vi.importActual('@tanstack/react-query');

  return {
    __esModule: true,
    ...originalModule,
    useQuery: vi.fn(),
  };
});

const useQueryMock = (returnValues: Partial<ReturnType<typeof useQuery>>) => {
  // TODO: fix casting
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (useQuery as any).mockImplementation(() => ({
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
    ...returnValues,
  }));
};

describe('useGetApi hook', () => {
  type MockType = {
    id: number;
    userName: string;
  };

  const mockData: MockType = {
    id: 1,
    userName: 'jhondoe',
  };

  const getApiData = vi.fn().mockResolvedValue(mockData);

  it('renders correctly and should return data', async () => {
    useQueryMock({ data: mockData });

    const { result } = renderHook(() => useGetApi<MockType>('endpoint', getApiData));

    await waitFor(() => {
      expect(result.current.data).toMatchObject(mockData);
    });
  });

  it('renders correctly with loading state', async () => {
    useQueryMock({ isLoading: true });

    const { result } = renderHook(() => useGetApi<MockType>('endpoint', getApiData));

    await waitFor(() => {
      expect(result.current.isLoading).toBeTruthy();
    });
  });

  it('renders correctly with error state', async () => {
    const errorMessageMock = 'Failed to fetch';
    useQueryMock({ isError: true, error: new Error(errorMessageMock) });

    const { result } = renderHook(() => useGetApi<MockType>('endpoint', getApiData));

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
      expect(result.current.error?.message).toEqual(errorMessageMock);
    });
  });
});
