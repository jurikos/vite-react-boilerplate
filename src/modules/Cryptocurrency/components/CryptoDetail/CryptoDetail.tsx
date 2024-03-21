import { useEffect } from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  HStack,
  Image,
  SkeletonText,
  Spacer,
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react';
import { format as formatDateFns } from 'date-fns';

import { RootWrapper, TradingViewWidget } from '@shared/components';
import { DataTestId } from '@shared/constants';
import { useGetApi } from '@shared/hooks';
import { formatPrice, getCryptoImageUrl, getScopedDataTestId } from '@shared/utils';

import { cryptoCurrencyDetailApiValidationSchema } from '../../schemas';
import { apiEndpoint, testIdScope } from './constants';

type Props = {
  currencyName: string;
  onSetMetaTags: ({ title, description }: { title: string; description: string }) => void;
};

const CryptoDetail = ({ currencyName, onSetMetaTags }: Props) => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetApi({
    endpoint: `${apiEndpoint}/${currencyName}`,
    validationSchema: cryptoCurrencyDetailApiValidationSchema,
  });
  const data = responseData?.data;
  const currentDate = new Date();

  useEffect(() => {
    if (!data) {
      return;
    }

    onSetMetaTags({ title: `${data.name} (${data.symbol})`, description: `${data.name}.` });
  }, [data, onSetMetaTags]);

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

  if (isLoading) {
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

  if (!data) {
    return (
      <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isDataEmpty)}>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>No such cryptocurrency!</AlertTitle>
          There is no such cryptocurrency added yet.
        </Alert>
      </RootWrapper>
    );
  }

  const { symbol, name, priceUsd, changePercent24Hr } = data;
  const numberChangePercent24Hr = Number(changePercent24Hr);

  return (
    <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isDataPresent)}>
      <Flex minWidth="max-content" alignItems="center" gap={24}>
        <HStack gap={8} verticalAlign="middle">
          <Image borderRadius="full" boxSize="64px" src={getCryptoImageUrl(symbol)} alt={name} />
          <chakra.div>
            <Text as="strong" fontSize="xl">
              {name} ({symbol})
            </Text>
            <Text color="gray.500">{formatDateFns(currentDate, 'd MMMM yyyy')}</Text>
          </chakra.div>
        </HStack>
        <HStack gap={4}>
          <Text as="strong" fontSize="4xl">
            {formatPrice(Number(priceUsd))}
          </Text>
          <Text color={numberChangePercent24Hr < 0 ? 'var(--chakra-colors-red-500)' : 'var(--chakra-colors-green-500)'}>
            {numberChangePercent24Hr.toFixed(2)}% (1d)
          </Text>
        </HStack>
      </Flex>
      <Spacer height={16} />
      <TradingViewWidget exchange="BINANCE" symbol={symbol} currency="USDT" />
    </RootWrapper>
  );
};

export default CryptoDetail;
