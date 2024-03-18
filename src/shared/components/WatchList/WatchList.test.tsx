import { render } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import WatchList from './WatchList';

describe('WatchList', () => {
  it('renders the WatchList component', () => {
    render(<WatchList />, { wrapper: TestWrapper });
  });
});
