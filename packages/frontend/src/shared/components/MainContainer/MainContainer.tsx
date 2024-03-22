import { PropsWithChildren } from 'react';

import { Container } from '@chakra-ui/react';

type Props = {
  as?: 'div' | 'main';
};

const MainContainer = ({ as = 'div', children }: PropsWithChildren<Props>) => (
  <Container maxW="1600px" as={as}>
    {children}
  </Container>
);

export default MainContainer;
