import api from './api';
import handleApiError from './handleApiError/handleApiError';
import handleLocalStorage from './handleLocalStorage/handleLocalStorage';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: price < 0.01 && price !== 0 ? Math.max(2, -Math.floor(Math.log10(price)) + 2) : 2,
    maximumFractionDigits: price < 0.01 && price !== 0 ? Math.max(2, -Math.floor(Math.log10(price)) + 2) : 2,
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

const formatNameFromSlug = (slug: string): string =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export {
  api,
  handleApiError,
  formatPrice,
  getScopedDataTestId,
  handleLocalStorage,
  formatSlug,
  getCryptoImageUrl,
  getIsActive,
  formatNameFromSlug,
};
