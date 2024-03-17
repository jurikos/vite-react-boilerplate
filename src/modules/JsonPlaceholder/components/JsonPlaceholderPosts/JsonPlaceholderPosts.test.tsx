import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

import { DataTestId } from '@shared/constants';
import { TestWrapper, createServerMock } from '@shared/test';
import { getScopedDataTestId } from '@shared/utils';

import JsonPlaceholderPosts from './JsonPlaceholderPosts';
import { apiEndpoint, testIdScope } from './constants';

const { serverStart, server } = createServerMock();
serverStart();

const postsMock = [
  {
    userId: 1,
    id: 1,
    title: 'title',
    body: 'body',
  },
];

describe('JsonPlaceholderPosts', () => {
  it('displays error state', async () => {
    server.use(
      ...[
        http.get(apiEndpoint, () => {
          return HttpResponse.error();
        }),
      ],
    );

    render(<JsonPlaceholderPosts />, { wrapper: TestWrapper });

    await waitFor(() =>
      expect(screen.getByTestId(getScopedDataTestId(testIdScope, DataTestId.isError))).toBeInTheDocument(),
    );
  });

  it('displays loading state', async () => {
    server.use(
      ...[
        http.get(apiEndpoint, () => {
          return HttpResponse.json(undefined);
        }),
      ],
    );

    render(<JsonPlaceholderPosts />, { wrapper: TestWrapper });

    await waitFor(() =>
      expect(screen.getByTestId(getScopedDataTestId(testIdScope, DataTestId.isLoading))).toBeInTheDocument(),
    );
  });

  it('displays empty state', async () => {
    server.use(
      ...[
        http.get(apiEndpoint, () => {
          return HttpResponse.json([]);
        }),
      ],
    );

    render(<JsonPlaceholderPosts />, { wrapper: TestWrapper });

    await waitFor(() =>
      expect(screen.getByTestId(getScopedDataTestId(testIdScope, DataTestId.isDataEmpty))).toBeInTheDocument(),
    );
  });

  it('displays success state', async () => {
    server.use(
      ...[
        http.get(apiEndpoint, () => {
          return HttpResponse.json(postsMock);
        }),
      ],
    );

    render(<JsonPlaceholderPosts />, { wrapper: TestWrapper });

    await waitFor(() =>
      expect(screen.getByTestId(getScopedDataTestId(testIdScope, DataTestId.isDataPresent))).toBeInTheDocument(),
    );
  });
});
