import { Link as ReactRouterLink } from 'react-router-dom';

import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

const LinkWithRouter = (props: LinkProps) => (
  <ChakraLink as={ReactRouterLink} to={props.href} {...props}>
    {props.children}
  </ChakraLink>
);

export default LinkWithRouter;
