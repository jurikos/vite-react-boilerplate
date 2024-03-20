const getCryptoImageUrl = (symbol: string) => {
  const symbolLowerCase = symbol.toLowerCase();

  return `https://assets.coincap.io/assets/icons/${symbolLowerCase === 'iota' ? 'miota' : symbolLowerCase}@2x.png`;
};

export default getCryptoImageUrl;
