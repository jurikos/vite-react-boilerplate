import { Heading } from '@chakra-ui/react';

import { useMetaTags } from '@hooks';

const Home = () => {
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

export default Home;
