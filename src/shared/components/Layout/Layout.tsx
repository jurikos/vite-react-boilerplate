import { PropsWithChildren } from 'react';

import { Divider, Spacer } from '@chakra-ui/react';

import { Footer, Header, MainContainer, WatchList } from '@shared/components';
import { useGlobalContext } from '@shared/hooks';

import styles from './Layout.module.css';

const Layout = ({ children }: PropsWithChildren) => {
  const { isWatchListVisible } = useGlobalContext();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      <Divider />
      {isWatchListVisible && (
        <>
          <Spacer height={4} />
          <WatchList />
          <Spacer height={4} />
          <Divider />
        </>
      )}
      <div className={styles.main}>
        <MainContainer>{children}</MainContainer>
      </div>
      <Divider />
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
