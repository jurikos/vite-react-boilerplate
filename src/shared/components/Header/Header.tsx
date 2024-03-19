import { useLocation } from 'react-router-dom';

import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Show,
  VStack,
  chakra,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';

import { LinkWithRouter, MainContainer } from '@shared/components';
import { RouteDictionary } from '@shared/routes';
import { NavigationItemType } from '@shared/types';
import { getIsActive } from '@shared/utils';

import viteLogo from '/vite.svg';

const navigationItems: NavigationItemType[] = [
  {
    slug: RouteDictionary.Home as '/',
    title: 'Home',
  },
  {
    slug: `/${RouteDictionary.JsonPlaceholder}`,
    title: 'JsonPlaceholder',
  },
  {
    slug: `/${RouteDictionary.Cryptocurrency}`,
    title: 'Cryptocurrency',
  },
];

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  return (
    <>
      <chakra.header>
        <MainContainer>
          <Flex minWidth="max-content" alignItems="center" justifyContent="space-between" gap={8}>
            <LinkWithRouter href={RouteDictionary.Home}>
              <chakra.img src={viteLogo} width={10} height={10} alt="Vite logo" />
            </LinkWithRouter>
            <Show breakpoint="(min-width: 992px)">
              <Flex justifyContent="space-between" gap={8}>
                {navigationItems.map((item) => (
                  <NavigationItem key={item.slug} item={item} pathname={pathname} />
                ))}
              </Flex>
            </Show>
            <HStack gap={4}>
              <IconButton
                onClick={toggleColorMode}
                isRound
                aria-label="Toggle color mode"
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              />
              <IconButton onClick={onOpen} isRound aria-label="Open menu" icon={<HamburgerIcon />} />
            </HStack>
          </Flex>
        </MainContainer>
      </chakra.header>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack gap={4} align="flex-start">
              {navigationItems.map((item) => (
                <NavigationItem key={item.slug} item={item} pathname={pathname} onClick={onClose} width="100%" />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;

type NavigationItem = {
  item: NavigationItemType;
  pathname: string;
  onClick?: () => void;
  width?: string;
};

const NavigationItem = ({ item: { title, slug }, pathname, onClick, width }: NavigationItem) => (
  <LinkWithRouter
    href={slug}
    onClick={onClick}
    width={width}
    color={getIsActive(pathname, slug) ? undefined : 'gray.500'}
  >
    {title}
  </LinkWithRouter>
);
