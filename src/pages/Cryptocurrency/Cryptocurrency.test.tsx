import { render } from '@testing-library/react';

import Cryptocurrency from './Cryptocurrency';

describe('Cryptocurrency', () => {
  it.only('renders the Cryptocurrency component', () => {
    render(<Cryptocurrency />);
  });
});
