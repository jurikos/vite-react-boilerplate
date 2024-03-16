import { PropsWithChildren, useState } from 'react';

import { StarIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  IconButton,
  Link,
  SkeletonText,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { DataTestId } from '@shared/constants';
import { useGetApi } from '@shared/hooks';
import { formatPrice } from '@shared/utils';

import { getCryptoCurrencies } from '../../api';

const endpoint = 'https://api.coincap.io/v2/assets';

const CryptoList = () => {
  const { data, isLoading, isError } = useGetApi(endpoint, getCryptoCurrencies);

  // TODO: move to context provider. Sort by rank. Display crypto images.
  const [cryptoWatchList, setCryptoWatchList] = useState<string[]>([]);
  const onWatchListItemToggle = (item: string) => {
    setCryptoWatchList((prevList) => {
      if (prevList.includes(item)) {
        return prevList.filter((crypto) => crypto !== item);
      }

      return [...prevList, item];
    });
  };

  if (isError) {
    return (
      <RootWrapper dataTestId={DataTestId.isError}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Something went wrong.</AlertDescription>
        </Alert>
      </RootWrapper>
    );
  }

  if (isLoading || !data) {
    return (
      <RootWrapper dataTestId={DataTestId.isLoading}>
        <Stack spacing={8}>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Stack key={index}>
                <SkeletonText noOfLines={1} spacing="2" skeletonHeight="32px" />
                <SkeletonText noOfLines={2} spacing="2" skeletonHeight="12px" />
              </Stack>
            ))}
        </Stack>
      </RootWrapper>
    );
  }

  if (!data.length) {
    return (
      <RootWrapper dataTestId={DataTestId.isDataEmpty}>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>No cryptocurrencies!</AlertTitle>
          There are no cryptocurrencies added yet.
        </Alert>
      </RootWrapper>
    );
  }

  return (
    <RootWrapper dataTestId={DataTestId.isDataPresent}>
      {cryptoWatchList.join(', ')}
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Top 100 Cryptocurrencies</TableCaption>
          <Thead>
            <TableHeading />
          </Thead>
          <Tbody>
            {data.map(({ id, rank, symbol, explorer, name, priceUsd, changePercent24Hr, marketCapUsd }) => {
              const numberChangePercent24Hr = Number(changePercent24Hr);

              return (
                <Tr key={id}>
                  <Td>
                    <IconButton
                      size="sm"
                      onClick={() => onWatchListItemToggle(symbol)}
                      isRound
                      aria-label="Add to watch list"
                      icon={
                        <StarIcon
                          color={cryptoWatchList.includes(symbol) ? 'var(--chakra-colors-yellow-400)' : undefined}
                        />
                      }
                    />
                  </Td>
                  <Td>{Number(rank)}</Td>
                  <Td>
                    {explorer ? (
                      <Link href={explorer} target="_blank">
                        {symbol}
                      </Link>
                    ) : (
                      symbol
                    )}
                  </Td>
                  <Td>{name}</Td>
                  <Td isNumeric>{formatPrice(Number(priceUsd))}</Td>
                  <Td
                    color={
                      numberChangePercent24Hr < 0 ? 'var(--chakra-colors-red-500)' : 'var(--chakra-colors-green-500)'
                    }
                    isNumeric
                  >
                    {numberChangePercent24Hr > 0 && '+'}
                    {numberChangePercent24Hr.toFixed(2)}%
                  </Td>
                  <Td isNumeric>{formatPrice(Number(marketCapUsd))}</Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <TableHeading />
          </Tfoot>
        </Table>
      </TableContainer>
    </RootWrapper>
  );
};

export default CryptoList;

const RootWrapper = ({ children, dataTestId }: PropsWithChildren<{ dataTestId: DataTestId }>) => (
  <div data-testid={dataTestId}>{children}</div>
);

const TableHeading = () => (
  <Tr>
    <Th />
    <Th>#</Th>
    <Th>Symbol</Th>
    <Th>Name</Th>
    <Th isNumeric>Price</Th>
    <Th isNumeric>Change 24h</Th>
    <Th isNumeric>Market Cap</Th>
  </Tr>
);
