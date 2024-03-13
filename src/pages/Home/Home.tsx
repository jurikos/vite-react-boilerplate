import { Heading } from '@chakra-ui/react';

import styles from './Home.module.css';

const Home = () => (
  <div className={styles.root}>
    <Heading as="h1" size="3xl">
      Vite React Boilerplate
    </Heading>
  </div>
);

export default Home;
