import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { z } from 'zod';

import { createServerMock } from '@shared/test';

import useGetApi from './useGetApi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const endpointMock = 'https://www.example.com';

const mockValidationSchema = z.object({
  id: z.number(),
  userName: z.string(),
});

const dataMock = {
  id: 1,
  userName: 'test-user',
};

const { serverStart, server } = createServerMock();
serverStart();

describe('useGetApi', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders correctly with loading state', async () => {
    server.use(
      ...[
        http.get(endpointMock, () => {
          return HttpResponse.json(dataMock);
        }),
      ],
    );

    const { result } = renderHook(() => useGetApi({ endpoint: endpointMock, validationSchema: mockValidationSchema }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBeTruthy());
  });

  it('renders correctly with error state', async () => {
    server.use(
      ...[
        http.get(endpointMock, () => {
          return HttpResponse.error();
        }),
      ],
    );

    const { result } = renderHook(() => useGetApi({ endpoint: endpointMock, validationSchema: mockValidationSchema }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
      expect(result.current.error?.message).toBe('API call failed: Failed to fetch');
    });
  });

  it('renders correctly and should return data', async () => {
    server.use(
      ...[
        http.get(endpointMock, () => {
          return HttpResponse.json(dataMock);
        }),
      ],
    );

    const { result } = renderHook(() => useGetApi({ endpoint: endpointMock, validationSchema: mockValidationSchema }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.data).toMatchObject(dataMock));
  });
});
