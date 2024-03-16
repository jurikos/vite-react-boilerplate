import { render } from '@testing-library/react';

import RootWrapper from './RootWrapper';

describe('RootWrapper', () => {
  it.only('renders the RootWrapper component', () => {
    render(<RootWrapper />);
  });
});
