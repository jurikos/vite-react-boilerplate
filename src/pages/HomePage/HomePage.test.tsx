import { render } from '@testing-library/react';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the Home component', () => {
    render(<HomePage />);
  });
});
