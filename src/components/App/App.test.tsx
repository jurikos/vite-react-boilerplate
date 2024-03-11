import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it.only('renders the App component', () => {
    render(<App />);

    const h1 = screen.queryByText('Vite React Boilerplate');

    screen.debug();

    expect(h1).not.toBeNull();
  });
});
