import { PropsWithChildren } from 'react';

import { Container } from '@chakra-ui/react';

const MainContainer = ({ children }: PropsWithChildren) => <Container maxW="1600px">{children}</Container>;

export default MainContainer;
