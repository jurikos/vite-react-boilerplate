import { render } from '@testing-library/react';

import WatchList from './WatchList';

describe('WatchList', () => {
  it.only('renders the WatchList component', () => {
    render(<WatchList />);
  });
});
