import { render } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import Header from './Header';

describe('Header', () => {
  it('renders the Header component', () => {
    render(<Header />, { wrapper: TestWrapper });
  });
});
