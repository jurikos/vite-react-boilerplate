import { Divider, Heading } from '@chakra-ui/react';

import { Footer, Header, MainContainer } from '@components';

const App = () => {
  return (
    <>
      <Header />
      <Divider />
      <MainContainer>
        <Heading as="h1">Vite React Boilerplate</Heading>
      </MainContainer>
      <Divider />
      <Footer />
    </>
  );
};

export default App;
