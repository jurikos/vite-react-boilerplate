import { render } from '@testing-library/react';

import { TestWrapper } from '@test';

import Api from './JsonPlaceholder';

describe('Api', () => {
  it.only('renders the Api component', () => {
    render(<Api />, { wrapper: TestWrapper });
  });
});