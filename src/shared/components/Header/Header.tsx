import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useColorMode } from '@chakra-ui/react';

import { LinkWithRouter, MainContainer } from '@shared/components';
import { RouteDictionary } from '@shared/routes';

import styles from './Header.module.css';
import viteLogo from '/vite.svg';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header className={styles.root}>
      <MainContainer>
        <Flex minWidth="max-content" alignItems="center" justifyContent="space-between" gap={8}>
          <LinkWithRouter href={RouteDictionary.Home}>
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </LinkWithRouter>
          <Flex justifyContent="space-between" gap={2}>
            <LinkWithRouter href={RouteDictionary.Home}>Home</LinkWithRouter>
            <LinkWithRouter href={RouteDictionary.JsonPlaceholder}>JsonPlaceholder</LinkWithRouter>
            <LinkWithRouter href={RouteDictionary.Cryptocurrency}>Cryptocurrency</LinkWithRouter>
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
