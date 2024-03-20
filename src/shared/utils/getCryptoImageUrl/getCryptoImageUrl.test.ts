import { getCryptoImageUrl } from '..';

describe('getCryptoImageUrl', () => {
  it('returns the correct URL for a typical cryptocurrency symbol', () => {
    const url = getCryptoImageUrl('btc');
    expect(url).toBe('https://assets.coincap.io/assets/icons/btc@2x.png');
  });

  it('correctly handles uppercase symbols', () => {
    const url = getCryptoImageUrl('ETH');
    expect(url).toBe('https://assets.coincap.io/assets/icons/eth@2x.png');
  });

  it('converts "IOTA" to "miota" in the URL', () => {
    const url = getCryptoImageUrl('IOTA');
    expect(url).toBe('https://assets.coincap.io/assets/icons/miota@2x.png');
  });

  it('converts lowercase "iota" to "miota" in the URL', () => {
    const url = getCryptoImageUrl('iota');
    expect(url).toBe('https://assets.coincap.io/assets/icons/miota@2x.png');
  });
});
