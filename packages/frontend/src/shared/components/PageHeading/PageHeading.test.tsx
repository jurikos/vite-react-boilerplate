import { render } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import PageHeading from './PageHeading';

describe('PageHeading', () => {
  it('renders the PageHeading component', () => {
    render(<PageHeading />, { wrapper: TestWrapper });
  });
});
