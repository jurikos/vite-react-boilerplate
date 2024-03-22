import { ReactNode } from 'react';

import { act, renderHook } from '@testing-library/react';

import { GlobalProvider } from '@shared/context';

import useGlobalContext from './useGlobalContext';

const wrapperMock = ({ children }: { children: ReactNode }) => <GlobalProvider>{children}</GlobalProvider>;

const cryptoWatchListItemMock = {
  id: 'bitcoin',
  name: 'Bitcoin',
  rank: 1,
  symbol: 'BTC',
};

describe('useGlobalContext', () => {
  it('returns context value when used within a GlobalProvider', () => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper: wrapperMock });

    expect(result.current.cryptoWatchList).toEqual([]);
    expect(result.current.isWatchListVisible).toBe(false);

    act(() => {
      result.current.onCryptoWatchListItemToggle(cryptoWatchListItemMock);
    });

    expect(result.current.cryptoWatchList).toContainEqual(cryptoWatchListItemMock);
    expect(result.current.isWatchListVisible).toBe(true);
  });

  it('throws an error when used outside a GlobalProvider', () => {
    expect(() => {
      renderHook(() => useGlobalContext());
    }).toThrow('useGlobalContext must be used within a GlobalProvider');
  });
});
