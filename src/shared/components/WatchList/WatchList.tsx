import { useNavigate } from 'react-router-dom';

import { CloseIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, HStack, IconButton, Image, Stack } from '@chakra-ui/react';

import { MainContainer } from '@shared/components';
import { useGlobalContext } from '@shared/hooks';
import { RouteDictionary } from '@shared/routes';
import { getCryptoImageUrl } from '@shared/utils';

const WatchList = () => {
  const navigate = useNavigate();
  const { cryptoWatchList, onCryptoWatchListItemToggle } = useGlobalContext();

  const sortedCryptoWatchList = [...cryptoWatchList].sort((a, b) => a.rank - b.rank);

  return (
    <MainContainer>
      <Stack direction="row" spacing={4} align="center">
        {sortedCryptoWatchList.map((item) => {
          const { symbol, id, name } = item;

          return (
            <ButtonGroup key={item.symbol} size="sm" isAttached variant="outline">
              <HStack as={Button} onClick={() => navigate(`${RouteDictionary.Cryptocurrency}/${id}`)} size="sm">
                <Image borderRadius="full" boxSize="20px" src={getCryptoImageUrl(symbol)} alt={name} />
                <span>{symbol}</span>
              </HStack>
              <IconButton
                onClick={() => onCryptoWatchListItemToggle(item)}
                aria-label="Remove from watchlist"
                icon={<CloseIcon />}
              />
            </ButtonGroup>
          );
        })}
      </Stack>
    </MainContainer>
  );
};

export default WatchList;
