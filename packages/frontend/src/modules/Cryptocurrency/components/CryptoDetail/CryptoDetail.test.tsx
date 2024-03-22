import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

import { DataTestId } from '@shared/constants';
import { TestWrapper, createServerMock } from '@shared/test';
import { getScopedDataTestId } from '@shared/utils';

import CryptoDetail from './CryptoDetail';
import { apiEndpoint as apiEnpdointPartial, testIdScope } from './constants';

const { serverStart, server } = createServerMock();
serverStart();

const cryptoCurrencyMock = {
  id: 'bitcoin',
  rank: '1',
  symbol: 'BTC',
  name: 'Bitcoin',
  supply: '19655031.0000000000000000',
  maxSupply: '21000000.0000000000000000',
  marketCapUsd: '1346887043894.1853440992382258',
  volumeUsd24Hr: '27878838349.8051085711510978',
  priceUsd: '68526.3250866500970718',
  changePercent24Hr: '-4.4701401454604459',
  vwap24Hr: '69223.1009315670109714',
  explorer: 'https://blockchain.info/',
};

const apiEndpoint = `${apiEnpdointPartial}/${cryptoCurrencyMock.id}`;

describe('CryptoDetail', () => {
  it('displays error state', async () => {
    server.use(
      ...[
        http.get(apiEndpoint, () => {
          return HttpResponse.error();
        }),
      ],
    );

    render(<CryptoDetail onSetMetaTags={() => undefined} currencyName={cryptoCurrencyMock.id} />, {
      wrapper: TestWrapper,
    });

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

    render(<CryptoDetail onSetMetaTags={() => undefined} currencyName={cryptoCurrencyMock.id} />, {
      wrapper: TestWrapper,
    });

    await waitFor(() =>
      expect(screen.getByTestId(getScopedDataTestId(testIdScope, DataTestId.isLoading))).toBeInTheDocument(),
    );
  });

  it('displays empty state', async () => {
    server.use(
      ...[
        http.get(apiEndpoint, () => {
          return HttpResponse.json({
            error: 'Not found',
            timestamp: 1710696061105,
          });
        }),
      ],
    );

    render(<CryptoDetail onSetMetaTags={() => undefined} currencyName={cryptoCurrencyMock.id} />, {
      wrapper: TestWrapper,
    });

    await waitFor(() =>
      expect(screen.getByTestId(getScopedDataTestId(testIdScope, DataTestId.isDataEmpty))).toBeInTheDocument(),
    );
  });

  it('displays success state', async () => {
    server.use(
      ...[
        http.get(apiEndpoint, () => {
          return HttpResponse.json({
            data: cryptoCurrencyMock,
            timestamp: 1710696061105,
          });
        }),
      ],
    );

    render(<CryptoDetail onSetMetaTags={() => undefined} currencyName={cryptoCurrencyMock.id} />, {
      wrapper: TestWrapper,
    });

    await waitFor(() =>
      expect(screen.getByTestId(getScopedDataTestId(testIdScope, DataTestId.isDataPresent))).toBeInTheDocument(),
    );
  });
});
