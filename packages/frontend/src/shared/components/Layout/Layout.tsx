import { PropsWithChildren } from 'react';

import { Divider, Spacer, chakra } from '@chakra-ui/react';

import { Footer, Header, MainContainer, WatchList } from '@shared/components';
import { useGlobalContext } from '@shared/hooks';

const Layout = ({ children }: PropsWithChildren) => {
  const { isWatchListVisible } = useGlobalContext();

  return (
    <>
      <Spacer height={6} />
      <Header />
      <Spacer height={6} />
      <Divider />
      {isWatchListVisible && (
        <>
          <Spacer height={4} />
          <chakra.div overflow="auto hidden">
            <WatchList />
          </chakra.div>
          <Spacer height={4} />
          <Divider />
        </>
      )}
      <Spacer height={24} />
      <MainContainer as="main">{children}</MainContainer>
      <Spacer height={24} />
      <Divider />
      <Spacer height={6} />
      <Footer />
      <Spacer height={6} />
    </>
  );
};

export default Layout;
