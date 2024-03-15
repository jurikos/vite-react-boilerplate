import { Heading } from '@chakra-ui/react';

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
    </>
  );
};

export default Cryptocurrency;
