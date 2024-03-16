import { MainContainer } from '@shared/components';

import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.root}>
    <MainContainer>&copy; {new Date().getFullYear()}</MainContainer>
  </footer>
);

export default Footer;
