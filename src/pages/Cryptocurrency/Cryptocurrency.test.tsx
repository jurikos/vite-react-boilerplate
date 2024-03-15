import { render } from '@testing-library/react';

import { TestWrapper } from '@test';

import Cryptocurrency from './Cryptocurrency';

describe('Cryptocurrency', () => {
  it('renders the Cryptocurrency component', () => {
    render(<Cryptocurrency />, { wrapper: TestWrapper });
  });
});
