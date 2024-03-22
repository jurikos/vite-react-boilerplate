import { render } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import LinkWithRouter from './LinkWithRouter';

describe('LinkWithRouter', () => {
  it('renders the LinkWithRouter component', () => {
    render(<LinkWithRouter />, { wrapper: TestWrapper });
  });
});
