import { render } from '@testing-library/react';

import Home from './Home';

describe('Home', () => {
  it.only('renders the Home component', () => {
    render(<Home />);
  });
});
