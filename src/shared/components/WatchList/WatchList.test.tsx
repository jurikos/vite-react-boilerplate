import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';

import { useGlobalContext } from '@shared/hooks';
import { TestWrapper, useNavigateMock } from '@shared/test';
import { getScopedDataTestId } from '@shared/utils';

import WatchList from './WatchList';
import { testIdScope } from './constants';

const cryptoWatchListMock = [
  { symbol: 'BTC', id: 'bitcoin', name: 'Bitcoin', rank: 1 },
  { symbol: 'ETH', id: 'ethereum', name: 'Ethereum', rank: 2 },
];

describe('WatchList', () => {
  it('removes item from watchlist', () => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper: TestWrapper });

    act(() => {
      result.current.onCryptoWatchListItemToggle(cryptoWatchListMock[0]);
    });

    render(<WatchList />, { wrapper: TestWrapper });

    expect(screen.getByText(cryptoWatchListMock[0].symbol)).toBeInTheDocument();

    const buttonRemove = screen.getByTestId(getScopedDataTestId(testIdScope, 'buttonRemove'));

    act(() => {
      fireEvent.click(buttonRemove);
    });

    expect(screen.queryByText(cryptoWatchListMock[0].symbol)).not.toBeInTheDocument();
  });

  it('navigates to crypto detail page', () => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper: TestWrapper });

    act(() => {
      result.current.onCryptoWatchListItemToggle(cryptoWatchListMock[1]);
    });

    render(<WatchList />, { wrapper: TestWrapper });

    expect(screen.getByText(cryptoWatchListMock[1].symbol)).toBeInTheDocument();

    const buttonNavigate = screen.getByTestId(getScopedDataTestId(testIdScope, 'buttonNavigate'));

    act(() => {
      fireEvent.click(buttonNavigate);
    });

    expect(useNavigateMock).toHaveBeenCalledWith(`cryptocurrency/${cryptoWatchListMock[1].id}`);
  });
});
