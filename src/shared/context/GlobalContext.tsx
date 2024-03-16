import { PropsWithChildren, createContext, useMemo, useState } from 'react';

type CryptoWatchListItem = {
  symbol: string;
  rank: number;
};

type State = {
  cryptoWatchList: CryptoWatchListItem[];
  onCryptoWatchListItemToggle: (item: CryptoWatchListItem) => void;
  isWatchListVisible: boolean;
};

const initialState: State = {
  cryptoWatchList: [],
  onCryptoWatchListItemToggle: () => undefined,
  isWatchListVisible: false,
};

export const GlobalContext = createContext<State>(initialState);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [cryptoWatchList, setCryptoWatchList] = useState<CryptoWatchListItem[]>([]);

  const onCryptoWatchListItemToggle = (item: CryptoWatchListItem) =>
    setCryptoWatchList((prevState) =>
      prevState.some((crypto) => crypto.symbol === item.symbol)
        ? prevState.filter((crypto) => crypto.symbol !== item.symbol)
        : [...prevState, item],
    );

  const contextValue = useMemo(
    () => ({
      isWatchListVisible: !!cryptoWatchList.length,
      cryptoWatchList,
      onCryptoWatchListItemToggle,
    }),
    [cryptoWatchList],
  );

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
