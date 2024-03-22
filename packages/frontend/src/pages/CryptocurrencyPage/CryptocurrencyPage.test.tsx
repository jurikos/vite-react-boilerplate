import { render } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import CryptocurrencyPage from './CryptocurrencyPage';

describe('CryptocurrencyPage', () => {
  it('renders the CryptocurrencyPage component', () => {
    render(<CryptocurrencyPage />, { wrapper: TestWrapper });
  });
});
