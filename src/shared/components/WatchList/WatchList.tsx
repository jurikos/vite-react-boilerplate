import { Button, Stack } from '@chakra-ui/react';

import { MainContainer } from '@shared/components';
import { useGlobalContext } from '@shared/hooks';

const WatchList = () => {
  const { cryptoWatchList, onCryptoWatchListItemToggle } = useGlobalContext();

  const sortedCryptoWatchList = [...cryptoWatchList].sort((a, b) => a.rank - b.rank);

  return (
    <MainContainer>
      <Stack direction="row" spacing={4} align="center">
        {sortedCryptoWatchList.map((item) => (
          <Button key={item.symbol} size="sm" onClick={() => onCryptoWatchListItemToggle(item)}>
            {item.symbol}
          </Button>
        ))}
      </Stack>
    </MainContainer>
  );
};

export default WatchList;
