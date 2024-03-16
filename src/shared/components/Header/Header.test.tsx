import { render, screen } from '@testing-library/react';

import { TestWrapper } from '@shared/test';

import Header from './Header';

vi.mock('@chakra-ui/react', async () => {
  const actualChakraUI = await vi.importActual('@chakra-ui/react');

  return {
    ...actualChakraUI,
    useColorMode: vi.fn(() => ({
      colorMode: 'light',
      toggleColorMode: vi.fn(),
    })),
  };
});

describe('Header', () => {
  it('renders the Header component with light mode initially', () => {
    render(<Header />, { wrapper: TestWrapper });
    const content = 'Toggle color mode';

    expect(screen.getByLabelText(content)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', content);
  });
});
