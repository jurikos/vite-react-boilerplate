import { CryptoCurrencyTable } from '@modules';

import { useMetaTags } from '@hooks';

const Cryptocurrency = () => {
  useMetaTags({
    title: 'Cryptocurrency',
    description: 'Cryptocurrency.',
  });

  return <CryptoCurrencyTable />;
};

export default Cryptocurrency;
