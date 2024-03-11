import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it.only('renders the Header component', () => {
    render(<Header />);
  });
});
