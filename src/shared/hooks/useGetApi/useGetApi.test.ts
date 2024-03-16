import { useQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { Mock } from 'vitest';

import { QueryResultMockType, queryResultMock } from '@shared/test';

import useGetApi from './useGetApi';

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const originalModule = await importOriginal<typeof import('@tanstack/react-query')>();

  return {
    ...originalModule,
    useQuery: vi.fn(),
  };
});

const useQueryMock = (returnValues: Partial<QueryResultMockType>) => {
  (useQuery as Mock).mockImplementation(
    (): QueryResultMockType => ({
      ...queryResultMock,
      ...returnValues,
    }),
  );
};

describe('useGetApi', () => {
  type DataMockType = {
    id: number;
    userName: string;
  };

  const dataMock: DataMockType = {
    id: 1,
    userName: 'test-user',
  };

  const getMockData: (endpoint: string) => Promise<DataMockType> = vi.fn().mockResolvedValue(dataMock);

  const endpointMock = '/api/v1/mock';

  it('renders correctly and should return data', () => {
    useQueryMock({ data: dataMock });

    const { result } = renderHook(() => useGetApi<DataMockType>(endpointMock, getMockData));

    expect(result.current.data).toMatchObject(dataMock);
  });

  it('renders correctly with loading state', () => {
    useQueryMock({ isLoading: true });

    const { result } = renderHook(() => useGetApi<DataMockType>(endpointMock, getMockData));

    expect(result.current.isLoading).toBeTruthy();
  });

  it('renders correctly with error state', () => {
    const errorMessageMock = 'Failed to fetch';
    useQueryMock({ isError: true, error: new Error(errorMessageMock) });

    const { result } = renderHook(() => useGetApi<DataMockType>(endpointMock, getMockData));

    expect(result.current.isError).toBeTruthy();
    expect(result.current.error?.message).toEqual(errorMessageMock);
  });
});
