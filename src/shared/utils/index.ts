import api from './api';
import handleApiError from './handleApiError/handleApiError';
import handleLocalStorage from './handleLocalStorage/handleLocalStorage';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

const getScopedDataTestId = (testIdScope: string, dataTestId: string) => `${testIdScope}-${dataTestId}`;

const formatSlug = (value: string): string => value.trim().toLowerCase().replace(/\s+/g, '-');

const getCryptoImageUrl = (symbol: string) => {
  const symbolLowerCase = symbol.toLowerCase();

  return `https://assets.coincap.io/assets/icons/${symbolLowerCase === 'iota' ? 'miota' : symbolLowerCase}@2x.png`;
};

const getIsActive = (pathname: string, slug: string): boolean => {
  if (slug === '/') {
    return pathname === '/';
  }

  const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const normalizedSlug = slug.endsWith('/') ? slug : `${slug}/`;

  return normalizedPathname.startsWith(normalizedSlug);
};

export {
  api,
  handleApiError,
  formatPrice,
  getScopedDataTestId,
  handleLocalStorage,
  formatSlug,
  getCryptoImageUrl,
  getIsActive,
};
