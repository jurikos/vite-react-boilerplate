import { Heading, Spacer } from '@chakra-ui/react';

import { CryptoList } from '@modules';

import { useMetaTags } from '@shared/hooks';

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
      <CryptoList />
    </>
  );
};

export default Cryptocurrency;
