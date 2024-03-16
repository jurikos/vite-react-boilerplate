import { api, handleApiError } from '@shared/utils';

import { CryptoCurrency, schemaCryptoCurrency } from '../types';

export const getCryptoCurrencies = async (endpoint: string): Promise<CryptoCurrency[]> => {
  try {
    const response = await api.get(endpoint).json<{ data: CryptoCurrency[] }>();

    const fetchedCryptoCurrencies = schemaCryptoCurrency.array().parse(response.data);

    return fetchedCryptoCurrencies;
  } catch (error) {
    return handleApiError(error);
  }
};
