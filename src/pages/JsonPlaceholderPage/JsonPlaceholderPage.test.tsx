import { render } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import JsonPlaceholderPage from './JsonPlaceholderPage';

describe('JsonPlaceholderPage', () => {
  it('renders the JsonPlaceholderPage component', () => {
    render(<JsonPlaceholderPage />, { wrapper: TestWrapper });
  });
});
