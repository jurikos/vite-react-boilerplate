import { useQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { Mock } from 'vitest';
import { z } from 'zod';

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
  const mockValidationSchema = z.object({
    id: z.number(),
    userName: z.string(),
  });

  const dataMock = {
    id: 1,
    userName: 'test-user',
  };

  const endpointMock = '/api/v1/mock';

  it('renders correctly and should return data', () => {
    useQueryMock({ data: dataMock });

    const { result } = renderHook(() => useGetApi({ endpoint: endpointMock, validationSchema: mockValidationSchema }));

    expect(result.current.data).toMatchObject(dataMock);
  });

  it('renders correctly with loading state', () => {
    useQueryMock({ isLoading: true });

    const { result } = renderHook(() => useGetApi({ endpoint: endpointMock, validationSchema: mockValidationSchema }));

    expect(result.current.isLoading).toBeTruthy();
  });

  it('renders correctly with error state', () => {
    const errorMessageMock = 'Failed to fetch';
    useQueryMock({ isError: true, error: new Error(errorMessageMock) });

    const { result } = renderHook(() => useGetApi({ endpoint: endpointMock, validationSchema: mockValidationSchema }));

    expect(result.current.isError).toBeTruthy();
    expect(result.current.error?.message).toEqual(errorMessageMock);
  });
});
