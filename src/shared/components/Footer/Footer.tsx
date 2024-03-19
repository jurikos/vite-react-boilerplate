import { chakra } from '@chakra-ui/react';

import { MainContainer } from '@shared/components';

const Footer = () => (
  <chakra.footer>
    <MainContainer>&copy; {new Date().getFullYear()}</MainContainer>
  </chakra.footer>
);

export default Footer;
