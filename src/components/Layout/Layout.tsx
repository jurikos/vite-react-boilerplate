import { PropsWithChildren } from 'react';

import { Divider } from '@chakra-ui/react';

import { Footer, Header, MainContainer } from '@components';

import styles from './Layout.module.css';

const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <Header />
    </div>
    <Divider />
    <div className={styles.main}>
      <MainContainer>{children}</MainContainer>
    </div>
    <Divider />
    <div className={styles.footer}>
      <Footer />
    </div>
  </div>
);

export default Layout;
