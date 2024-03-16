import { render } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import JsonPlaceholder from './JsonPlaceholder';

describe('JsonPlaceholder', () => {
  it.only('renders the JsonPlaceholder component', () => {
    render(<JsonPlaceholder />, { wrapper: TestWrapper });
  });
});
