import { render, screen } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import Layout from './Layout';

describe('Layout', () => {
  it('renders the Layout component with children', () => {
    const content = 'Test Children';

    render(
      <Layout>
        <div>{content}</div>
      </Layout>,
      { wrapper: TestWrapper },
    );

    const childrenElement = screen.getByText(content);
    expect(childrenElement.innerHTML).toEqual(content);
  });
});
