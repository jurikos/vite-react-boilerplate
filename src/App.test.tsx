import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);

    const h1 = screen.queryByText('Vite + React');
    expect(h1).not.toBeNull();
  });

  it('should show the button count set to 0', () => {
    render(<App />);

    const button = screen.queryByText('count is 0');
    expect(button).not.toBeNull();
  });

  it('should show the button count set to 3', () => {
    render(<App />);

    const button = screen.queryByText('count is 0');
    expect(button).not.toBeNull();

    const buttonWithCasting = button as HTMLElement;
    const clickCount = 7;

    for (let i = 0; i < clickCount; i++) {
      fireEvent.click(buttonWithCasting);
    }

    //screen.debug();

    expect(button?.innerHTML).toBe(`count is ${clickCount}`);
  });
});
