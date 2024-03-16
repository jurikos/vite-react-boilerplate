import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it.only('renders the App component', () => {
    render(<App />);
  });
});
