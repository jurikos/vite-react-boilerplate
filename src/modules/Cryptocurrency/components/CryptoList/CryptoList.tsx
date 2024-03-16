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

import { RootWrapper } from '@shared/components';
import { DataTestId } from '@shared/constants';
import { useGetApi, useGlobalContext } from '@shared/hooks';
import { formatPrice, getScopedDataTestId } from '@shared/utils';

import { cryptoCurrencyApiValidationSchema } from '../../schemas';
import { testIdScope } from './constants';

const endpoint = 'https://api.coincap.io/v2/assets';

const CryptoList = () => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetApi({ endpoint, validationSchema: cryptoCurrencyApiValidationSchema });
  const data = responseData?.data;
  const { cryptoWatchList, onCryptoWatchListItemToggle } = useGlobalContext();

  if (isError) {
    return (
      <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isError)}>
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
      <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isLoading)}>
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
      <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isDataEmpty)}>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>No cryptocurrencies!</AlertTitle>
          There are no cryptocurrencies added yet.
        </Alert>
      </RootWrapper>
    );
  }

  return (
    <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isDataPresent)}>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Top 100 Cryptocurrencies</TableCaption>
          <Thead>
            <TableHeading />
          </Thead>
          <Tbody>
            {data.map(({ id, rank, symbol, explorer, name, priceUsd, changePercent24Hr, marketCapUsd }) => {
              const numberChangePercent24Hr = Number(changePercent24Hr);
              const numberRank = Number(rank);

              return (
                <Tr key={id}>
                  <Td>
                    <IconButton
                      size="sm"
                      onClick={() => onCryptoWatchListItemToggle({ symbol, rank: numberRank })}
                      isRound
                      aria-label="Add to watch list"
                      icon={
                        <StarIcon
                          color={
                            cryptoWatchList.find((item) => item.symbol === symbol)
                              ? 'var(--chakra-colors-yellow-400)'
                              : undefined
                          }
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
