import { render } from '@testing-library/react';

import MainContainer from './MainContainer';

describe('MainContainer', () => {
  it.only('renders the MainContainer component', () => {
    render(<MainContainer />);
  });
});
