import { Heading, Spacer } from '@chakra-ui/react';
import { CryptoCurrencyTable } from '@modules';

import { useMetaTags } from '@hooks';

const Cryptocurrency = () => {
  useMetaTags({
    title: 'Cryptocurrency',
    description: 'Cryptocurrency.',
  });

  return (
    <>
      <Heading as="h1" size="3xl">
        Cryptocurrency
      </Heading>
      <Spacer height={16} />
      <CryptoCurrencyTable />
    </>
  );
};

export default Cryptocurrency;
