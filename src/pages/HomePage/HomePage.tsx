import { Heading } from '@chakra-ui/react';

import { useMetaTags } from '@shared/hooks';

const HomePage = () => {
  useMetaTags({
    title: 'Home',
    description: 'Home.',
  });

  return (
    <>
      <Heading as="h1" size="3xl">
        Vite React Boilerplate
      </Heading>
    </>
  );
};

export default HomePage;
