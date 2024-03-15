import { CryptoCurrency } from './types';

const cryptoCurrenciesMock: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    supply: '19655031.0000000000000000',
    maxSupply: '21000000.0000000000000000',
    marketCapUsd: '1346887043894.1853440992382258',
    volumeUsd24Hr: '27878838349.8051085711510978',
    priceUsd: '68526.3250866500970718',
    changePercent24Hr: '-4.4701401454604459',
    vwap24Hr: '69223.1009315670109714',
    explorer: 'https://blockchain.info/',
  },
  {
    id: 'ethereum',
    rank: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    supply: '120082712.1568019100000000',
    maxSupply: null,
    marketCapUsd: '446133126113.8932946224448422',
    volumeUsd24Hr: '14644934596.3194284368558816',
    priceUsd: '3715.2152720479900879',
    changePercent24Hr: '-4.5150100280591679',
    vwap24Hr: '3762.0619934574880672',
    explorer: 'https://etherscan.io/',
  },
];

export { cryptoCurrenciesMock };