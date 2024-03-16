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

export { api, handleApiError, formatPrice, getScopedDataTestId, handleLocalStorage };
