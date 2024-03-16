import { Link as ReactRouterLink } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as ChakraLink, Flex, IconButton, LinkProps, useColorMode } from '@chakra-ui/react';

import { MainContainer } from '@shared/components';
import { RouteDictionary } from '@shared/routes';

import styles from './Header.module.css';
import viteLogo from '/vite.svg';

const Link = (props: LinkProps) => (
  <ChakraLink as={ReactRouterLink} to={props.href} {...props}>
    {props.children}
  </ChakraLink>
);

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header className={styles.root}>
      <MainContainer>
        <Flex minWidth="max-content" alignItems="center" justifyContent="space-between" gap={8}>
          <Link href={RouteDictionary.Home}>
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </Link>
          <Flex justifyContent="space-between" gap={2}>
            <Link href={RouteDictionary.Home}>Home</Link>
            <Link href={RouteDictionary.JsonPlaceholder}>JsonPlaceholder</Link>
            <Link href={RouteDictionary.Cryptocurrency}>Cryptocurrency</Link>
          </Flex>
          <IconButton
            size="sm"
            onClick={toggleColorMode}
            isRound
            aria-label="Toggle color mode"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          />
        </Flex>
      </MainContainer>
    </header>
  );
};

export default Header;
