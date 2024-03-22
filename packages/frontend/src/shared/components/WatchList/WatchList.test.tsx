import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  beforeEach(() => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper: TestWrapper });

    act(() => {
      result.current.onCryptoWatchListItemToggle(cryptoWatchListMock[0]);
    });
  });

  it('removes item from watchlist', async () => {
    render(<WatchList />, { wrapper: TestWrapper });

    expect(screen.getByText(cryptoWatchListMock[0].symbol)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(getScopedDataTestId(testIdScope, 'buttonRemove')));

    expect(screen.queryByText(cryptoWatchListMock[0].symbol)).not.toBeInTheDocument();
  });

  it('navigates to crypto detail page', async () => {
    render(<WatchList />, { wrapper: TestWrapper });

    expect(screen.getByText(cryptoWatchListMock[0].symbol)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(getScopedDataTestId(testIdScope, 'buttonNavigate')));

    expect(useNavigateMock).toHaveBeenCalledWith(`cryptocurrency/${cryptoWatchListMock[0].id}`);
  });
});
