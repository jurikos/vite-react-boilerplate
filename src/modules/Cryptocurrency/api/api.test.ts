import { HttpResponse, http } from 'msw';

import { createServerMock } from '@shared/test';

import { cryptoCurrenciesMock } from '../mocks';
import { getCryptoCurrencies } from './api';

const endpointMock = 'https://rest-endpoint.example/path/to/cryptocurrencies';

describe('getCryptoCurrencies ', () => {
  const { serverStart, server } = createServerMock();
  serverStart();

  it('should fetch and return cryptocurrencies correctly', async () => {
    server.use(http.get(endpointMock, () => HttpResponse.json({ data: cryptoCurrenciesMock })));
    const fetchedCryptoCurrencies = await getCryptoCurrencies(endpointMock);

    expect(fetchedCryptoCurrencies).toEqual(cryptoCurrenciesMock);
  });

  it('throws a validation error for incorrect data format', async () => {
    server.use(http.get(endpointMock, () => HttpResponse.json([{ ...cryptoCurrenciesMock[0], id: '1' }])));

    await expect(getCryptoCurrencies(endpointMock)).rejects.toThrow('Data validation failed');
  });

  it('handles fetch failure or API errors', async () => {
    server.use(http.get(endpointMock, () => HttpResponse.error()));

    await expect(getCryptoCurrencies(endpointMock)).rejects.toThrow(/^API call failed:/);
  });
});
