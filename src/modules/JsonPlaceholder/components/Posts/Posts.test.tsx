import { render } from '@testing-library/react';

import { TestWrapper } from '@test';

import Posts from './Posts';

describe('Posts', () => {
  it.only('renders the Posts component', () => {
    render(<Posts />, { wrapper: TestWrapper });
  });
});
