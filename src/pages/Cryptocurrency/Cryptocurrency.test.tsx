import { render } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import Cryptocurrency from './Cryptocurrency';

describe('Cryptocurrency', () => {
  it('renders the Cryptocurrency component', () => {
    render(<Cryptocurrency />, { wrapper: TestWrapper });
  });
});
